import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ASSISTANT_ID = "asst_NghzrYSl2JU0dBntmxZ7oyxZ";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, threadId, userProfile, depth } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    const headers = {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
      "OpenAI-Beta": "assistants=v2",
    };

    // Create or use existing thread
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const threadResponse = await fetch("https://api.openai.com/v1/threads", {
        method: "POST",
        headers,
        body: JSON.stringify({}),
      });

      if (!threadResponse.ok) {
        const error = await threadResponse.text();
        console.error("Thread creation error:", error);
        throw new Error("Failed to create thread");
      }

      const thread = await threadResponse.json();
      currentThreadId = thread.id;
    }

    // Get the last user message
    const lastUserMessage = messages[messages.length - 1];
    if (!lastUserMessage || lastUserMessage.role !== "user") {
      throw new Error("No user message provided");
    }

    // Add context about user profile and depth
    let contextPrefix = "";
    if (userProfile && userProfile !== "general") {
      const profileLabels: Record<string, string> = {
        comprador: "El usuario es un COMPRADOR potencial",
        vendedor: "El usuario es un VENDEDOR",
        agente: "El usuario es un AGENTE INMOBILIARIO",
        abogado: "El usuario es un ABOGADO o asesor legal",
      };
      contextPrefix += `[${profileLabels[userProfile] || "Usuario general"}] `;
    }
    if (depth === "basic") {
      contextPrefix += "[Responder de forma simple y directa] ";
    } else if (depth === "expert") {
      contextPrefix += "[Responder con máximo detalle técnico y citas legales] ";
    }

    const messageContent = contextPrefix + lastUserMessage.content;

    // Add message to thread
    const messageResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/messages`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          role: "user",
          content: messageContent,
        }),
      }
    );

    if (!messageResponse.ok) {
      const error = await messageResponse.text();
      console.error("Message creation error:", error);
      throw new Error("Failed to add message");
    }

    // Run the assistant with streaming
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/runs`,
      {
        method: "POST",
        headers,
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID,
          stream: true,
        }),
      }
    );

    if (!runResponse.ok) {
      const error = await runResponse.text();
      console.error("Run creation error:", error);
      
      if (runResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded" }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error("Failed to run assistant");
    }

    // Transform the SSE stream to extract text deltas
    const reader = runResponse.body?.getReader();
    const encoder = new TextEncoder();
    
    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                
                // Handle thread.run events
                if (parsed.object === "thread.run") {
                  // Send thread ID in first message
                  if (parsed.status === "queued" || parsed.status === "in_progress") {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ threadId: currentThreadId })}\n\n`)
                    );
                  }
                }

                // Handle message delta events (the actual text)
                if (parsed.object === "thread.message.delta") {
                  const delta = parsed.delta;
                  if (delta?.content?.[0]?.text?.value) {
                    const text = delta.content[0].text.value;
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ 
                        choices: [{ delta: { content: text } }] 
                      })}\n\n`)
                    );
                  }
                }

                // Handle completion
                if (parsed.object === "thread.run" && parsed.status === "completed") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                }

                // Handle errors
                if (parsed.object === "thread.run" && parsed.status === "failed") {
                  console.error("Run failed:", parsed.last_error);
                  controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify({ 
                      choices: [{ delta: { content: "Lo siento, hubo un error procesando tu consulta." } }] 
                    })}\n\n`)
                  );
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                }
              } catch {
                // Ignore parse errors for non-JSON lines
              }
            }
          }

          // Final flush
          if (buffer.trim()) {
            const lines = buffer.split("\n");
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;
              
              try {
                const parsed = JSON.parse(data);
                if (parsed.object === "thread.message.delta") {
                  const delta = parsed.delta;
                  if (delta?.content?.[0]?.text?.value) {
                    controller.enqueue(
                      encoder.encode(`data: ${JSON.stringify({ 
                        choices: [{ delta: { content: delta.content[0].text.value } }] 
                      })}\n\n`)
                    );
                  }
                }
              } catch {
                // Ignore
              }
            }
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (e) {
          console.error("Stream error:", e);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("arras-assistant error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
