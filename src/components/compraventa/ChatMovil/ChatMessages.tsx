import { useCompraventa } from "@/contexts/CompraventaContext";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";

interface ChatMessagesProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatMessages = ({ rolForzado }: ChatMessagesProps) => {
  const { expediente, usuarioActual } = useCompraventa();
  const scrollRef = useRef<HTMLDivElement>(null);
  const rol = rolForzado || usuarioActual;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [expediente.mensajes]);

  return (
    <ScrollArea className="flex-1 px-4" ref={scrollRef}>
      <div className="space-y-4 py-4">
        {expediente.mensajes.map((mensaje) => (
          <ChatMessage
            key={mensaje.id}
            mensaje={mensaje}
            rolActivo={rol}
          />
        ))}
      </div>
    </ScrollArea>
  );
};
