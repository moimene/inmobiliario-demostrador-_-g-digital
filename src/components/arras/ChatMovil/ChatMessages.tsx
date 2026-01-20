import { useEffect, useRef } from "react";
import { useArras } from "@/contexts/ArrasContext";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatMessages = ({ rolForzado }: ChatMessagesProps) => {
  const { expediente, usuarioActual } = useArras();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rolActivo = rolForzado || (usuarioActual as "vendedor" | "comprador");

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [expediente.mensajes]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div ref={scrollRef} className="space-y-4">
        {expediente.mensajes.map((mensaje) => (
          <ChatMessage
            key={mensaje.id}
            mensaje={mensaje}
            rolActivo={rolActivo}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
