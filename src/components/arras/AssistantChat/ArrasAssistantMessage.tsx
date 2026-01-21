import { ChatMessage } from "@/types/chat-assistant";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import eidasIcon from "@/assets/eidas-icon.png";

interface Props {
  message: ChatMessage;
}

export const ArrasAssistantMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent/20"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <img src={eidasIcon} alt="Asistente" className="h-5 w-5" />
        )}
      </div>

      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted rounded-bl-md"
        )}
      >
        <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
          {message.content.split("\n").map((line, i) => {
            // Handle markdown-style bold
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className={i > 0 ? "mt-2" : ""}>
                {parts.map((part, j) => {
                  if (part.startsWith("**") && part.endsWith("**")) {
                    return (
                      <strong key={j} className="font-semibold">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  // Handle bullet points
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
          "text-[10px] mt-2",
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
