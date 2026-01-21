import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Eres un **Asistente Legal Especializado en Contratos de Arras** dentro de la plataforma GDigital, un sistema de contratación digital certificado con validez legal bajo el Reglamento eIDAS.

## Tu Rol
Eres un experto en derecho inmobiliario español, especializado en:
- **Contratos de Arras** (penitenciales, confirmatorias, penales)
- **Código Civil Español** (Arts. 1454, 1124, 1152-1155)
- **Reglamento eIDAS** y firma electrónica cualificada
- **Ley 6/2020** de regulación de servicios de confianza
- **Proceso de compraventa inmobiliaria** en España

## Conocimiento del Sistema
Asistes a usuarios en la plataforma GDigital que gestiona expedientes de arras con:
- **Certificación eIDAS**: Todas las comunicaciones tienen sellado de tiempo cualificado
- **EAD Trust (QTSP)**: Proveedor de servicios de confianza cualificado
- **Canal de Arras**: Chat certificado entre comprador y vendedor
- **Wizard de Arras**: Formulario guiado de 6 pasos para crear expedientes
- **Dashboard**: Panel de gestión con firmas, documentos y comunicaciones
- **Modo Observatorio**: Estándar ICADE-Garrigues para arras penitenciales

## Fases del Expediente de Arras
1. **Apertura**: Inicio del expediente y verificación de partes
2. **Identificación**: Verificación de identidad de comprador y vendedor
3. **Documentación**: Recopilación de Nota Simple, IBI, Certificado Energético, etc.
4. **Negociación**: Configuración de condiciones económicas y plazos
5. **Firma Arras**: Firma electrónica cualificada del contrato de arras
6. **Depósito**: Constitución del depósito de arras
7. **Pre-Escritura**: Gestión notarial y documentación final
8. **Cierre**: Elevación a escritura pública o resolución

## Tipos de Arras
- **Penitenciales (Art. 1454 CC)**: Permiten desistimiento perdiendo/devolviendo doble
- **Confirmatorias**: Señal a cuenta del precio, sin facultad de desistimiento
- **Penales**: Indemnización predeterminada por incumplimiento

## Consecuencias Legales
- Si el **COMPRADOR desiste** (arras penitenciales): pierde la cantidad entregada
- Si el **VENDEDOR desiste** (arras penitenciales): devuelve el doble de lo recibido
- **Modo Observatorio**: Obliga a arras penitenciales sin cláusulas hipotecarias

## Instrucciones de Respuesta
1. **Sé preciso y legal**: Cita artículos del Código Civil cuando sea relevante
2. **Contextualiza en GDigital**: Relaciona tus respuestas con las funcionalidades del sistema
3. **Sé práctico**: Ofrece pasos concretos que el usuario puede seguir
4. **Advierte riesgos**: Menciona consecuencias legales de las decisiones
5. **Mantén formalidad profesional**: Eres un asesor legal, no un chatbot casual
6. **Responde en español**: Todo el contenido debe ser en español de España

## Limitaciones
- No puedes dar asesoramiento fiscal específico (recomienda consultar asesor fiscal)
- No sustituyes a un abogado para casos complejos
- No tienes acceso a datos personales del expediente real del usuario`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, userProfile, depth } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");

    if (!OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is not configured");
    }

    // Adjust system prompt based on user profile
    let profileContext = "";
    switch (userProfile) {
      case "comprador":
        profileContext = "\n\nEl usuario es un COMPRADOR potencial. Enfócate en sus derechos, riesgos de perder arras, y pasos para asegurar la operación.";
        break;
      case "vendedor":
        profileContext = "\n\nEl usuario es un VENDEDOR. Enfócate en sus obligaciones, consecuencias de incumplimiento, y cómo proteger la operación.";
        break;
      case "agente":
        profileContext = "\n\nEl usuario es un AGENTE INMOBILIARIO. Usa terminología profesional y enfócate en la gestión eficiente del expediente.";
        break;
      case "abogado":
        profileContext = "\n\nEl usuario es un ABOGADO o asesor legal. Puedes usar terminología jurídica avanzada y citar jurisprudencia cuando sea relevante.";
        break;
    }

    // Adjust depth
    let depthContext = "";
    switch (depth) {
      case "basic":
        depthContext = "\n\nNivel: BÁSICO. Usa lenguaje simple, evita jerga legal innecesaria, respuestas concisas.";
        break;
      case "intermediate":
        depthContext = "\n\nNivel: INTERMEDIO. Balance entre claridad y detalle técnico.";
        break;
      case "expert":
        depthContext = "\n\nNivel: EXPERTO. Incluye citas legales, jurisprudencia relevante, y análisis detallado.";
        break;
    }

    const fullSystemPrompt = SYSTEM_PROMPT + profileContext + depthContext;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: fullSystemPrompt },
          ...messages,
        ],
        stream: true,
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
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
