import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Settings, Trash2, RotateCcw, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useArrasAssistant } from "@/hooks/useArrasAssistant";
import { ArrasAssistantOnboarding } from "./ArrasAssistantOnboarding";
import { ArrasAssistantMessage } from "./ArrasAssistantMessage";
import { ArrasAssistantButton } from "./ArrasAssistantButton";
import { SUGGESTED_QUESTIONS, PROFILES, DEPTHS } from "@/constants/arras-chat";
import eidasIcon from "@/assets/eidas-icon.png";

export const ArrasAssistantChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoading,
    settings,
    onboardingCompleted,
    sendMessage,
    updateSettings,
    completeOnboarding,
    clearMessages,
    resetOnboarding,
  } = useArrasAssistant();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
  };

  const currentProfile = PROFILES.find((p) => p.value === settings.userProfile);
  const currentDepth = DEPTHS.find((d) => d.value === settings.depth);

  return (
    <>
      <ArrasAssistantButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[400px] h-[600px] bg-background border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={eidasIcon} alt="eIDAS" className="h-8 w-8" />
                <div>
                  <h3 className="font-bold">Asistente Legal de Arras</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px] bg-white/20 text-white">
                      {currentProfile?.label || "General"}
                    </Badge>
                    <Badge variant="secondary" className="text-[10px] bg-white/20 text-white">
                      {currentDepth?.label || "Intermedio"}
                    </Badge>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                    <Settings className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Configuración</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={clearMessages}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Limpiar chat
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={resetOnboarding}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Cambiar perfil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Content */}
            {!onboardingCompleted ? (
              <ArrasAssistantOnboarding onComplete={completeOnboarding} />
            ) : (
              <>
                <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                  <div>
                    {messages.map((msg) => (
                      <ArrasAssistantMessage key={msg.id} message={msg} />
                    ))}

                    {isLoading && (
                      <div className="flex items-center gap-2 text-muted-foreground mb-4">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Pensando...</span>
                      </div>
                    )}

                    {messages.length <= 1 && !isLoading && (
                      <div className="mt-4">
                        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4" />
                          Preguntas sugeridas:
                        </p>
                        <div className="space-y-2">
                          {SUGGESTED_QUESTIONS.slice(0, 4).map((q, i) => (
                            <Button
                              key={i}
                              variant="outline"
                              size="sm"
                              className="w-full justify-start text-left h-auto py-2 text-xs"
                              onClick={() => handleSuggestionClick(q)}
                            >
                              {q}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="p-4 border-t bg-background">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu pregunta..."
                      disabled={isLoading}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !inputValue.trim()}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2 text-center">
                    Certificado por EAD Trust (eIDAS) · No sustituye asesoramiento legal profesional
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
