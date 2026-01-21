import { useState, useEffect, useCallback, useRef } from "react";
import { STORAGE_KEYS, WELCOME_MESSAGE } from "@/constants/arras-chat";
import type { ChatMessage, ChatSettings, UserProfile, DepthLevel } from "@/types/chat-assistant";

const DEFAULT_SETTINGS: ChatSettings = {
  userProfile: "general",
  depth: "intermediate",
};

const THREAD_STORAGE_KEY = "arras-chat-thread-id";

export function useArrasAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULT_SETTINGS);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const threadIdRef = useRef<string | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEYS.settings);
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      const savedMessages = localStorage.getItem(STORAGE_KEYS.messages);
      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        setMessages(
          parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        );
      }

      const savedThreadId = localStorage.getItem(THREAD_STORAGE_KEY);
      if (savedThreadId) {
        threadIdRef.current = savedThreadId;
      }

      const onboarding = localStorage.getItem(STORAGE_KEYS.onboardingCompleted);
      setOnboardingCompleted(onboarding === "true");
    } catch (e) {
      console.error("Error loading state:", e);
    }
  }, []);

  // Persist messages
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages));
    }
  }, [messages]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = useCallback((newSettings: Partial<ChatSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const completeOnboarding = useCallback((profile: UserProfile, depth: DepthLevel) => {
    setSettings({ userProfile: profile, depth });
    setOnboardingCompleted(true);
    localStorage.setItem(STORAGE_KEYS.onboardingCompleted, "true");
    
    const welcomeMsg: ChatMessage = {
      id: `assistant-welcome-${Date.now()}`,
      role: "assistant",
      content: WELCOME_MESSAGE,
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      setError(null);
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const chatUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/arras-assistant`;
        
        const messagesToSend = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const resp = await fetch(chatUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            messages: messagesToSend,
            threadId: threadIdRef.current,
            userProfile: settings.userProfile,
            depth: settings.depth,
          }),
        });

        if (!resp.ok || !resp.body) {
          if (resp.status === 429) {
            throw new Error("Rate limit exceeded. Please try again later.");
          }
          throw new Error("Failed to get response from assistant");
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let textBuffer = "";
        let assistantSoFar = "";
        let streamDone = false;

        const assistantId = `assistant-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: "", timestamp: new Date() },
        ]);

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith("\r")) line = line.slice(0, -1);
            if (line.startsWith(":") || line.trim() === "") continue;
            if (!line.startsWith("data: ")) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === "[DONE]") {
              streamDone = true;
              break;
            }

            try {
              const parsed = JSON.parse(jsonStr);
              
              if (parsed.threadId && !threadIdRef.current) {
                threadIdRef.current = parsed.threadId;
                localStorage.setItem(THREAD_STORAGE_KEY, parsed.threadId);
              }
              
              const deltaContent = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (deltaContent) {
                assistantSoFar += deltaContent;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: assistantSoFar } : m
                  )
                );
              }
            } catch {
              textBuffer = line + "\n" + textBuffer;
              break;
            }
          }
        }

        // Final flush
        if (textBuffer.trim()) {
          for (let raw of textBuffer.split("\n")) {
            if (!raw) continue;
            if (raw.endsWith("\r")) raw = raw.slice(0, -1);
            if (raw.startsWith(":") || raw.trim() === "") continue;
            if (!raw.startsWith("data: ")) continue;
            const jsonStr = raw.slice(6).trim();
            if (jsonStr === "[DONE]") continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const deltaContent = parsed.choices?.[0]?.delta?.content as string | undefined;
              if (deltaContent) {
                assistantSoFar += deltaContent;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: assistantSoFar } : m
                  )
                );
              }
            } catch {
              /* ignore parse errors */
            }
          }
        }
      } catch (e) {
        console.error("Error sending message:", e);
        setError(e instanceof Error ? e.message : "Error desconocido");
        
        const errorMessage: ChatMessage = {
          id: `assistant-error-${Date.now()}`,
          role: "assistant",
          content: "Lo siento, ocurrió un error al procesar tu pregunta. Por favor, intenta de nuevo.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, settings]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    threadIdRef.current = null;
    localStorage.removeItem(STORAGE_KEYS.messages);
    localStorage.removeItem(THREAD_STORAGE_KEY);
  }, []);

  const resetOnboarding = useCallback(() => {
    setOnboardingCompleted(false);
    setMessages([]);
    threadIdRef.current = null;
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.onboardingCompleted);
    localStorage.removeItem(STORAGE_KEYS.messages);
    localStorage.removeItem(STORAGE_KEYS.settings);
    localStorage.removeItem(THREAD_STORAGE_KEY);
  }, []);

  return {
    messages,
    isLoading,
    settings,
    onboardingCompleted,
    error,
    sendMessage,
    updateSettings,
    completeOnboarding,
    clearMessages,
    resetOnboarding,
  };
}
