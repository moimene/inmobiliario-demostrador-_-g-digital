import { ChatMessage } from "@/types/chat-assistant";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  message: ChatMessage;
}

export const ArrasAssistantMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-2 mb-3",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent/20"
        )}
      >
        {isUser ? (
          <User className="h-3.5 w-3.5" />
        ) : (
          <Bot className="h-3.5 w-3.5 text-accent" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <div className="text-sm leading-relaxed">
          {message.content.split("\n").map((line, i) => {
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className={i > 0 ? "mt-1.5" : ""}>
                {parts.map((part, j) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={j} className="font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  if (part.startsWith("- ")) {
                    return <span key={j}>• {part.slice(2)}</span>;
                  }
                  return <span key={j}>{part}</span>;
                })}
              </p>
            );
          })}
        </div>
        <p className={cn(
          "text-[9px] mt-1",
          isUser ? "text-primary-foreground/60" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
};
