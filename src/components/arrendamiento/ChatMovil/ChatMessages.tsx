import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { ChatMessage } from "./ChatMessage";
import { useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatMessages = ({ rolForzado }: ChatMessagesProps) => {
  const { expediente, usuarioActual } = useArrendamiento();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(true);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      setIsNearBottom(distanceFromBottom < 100); // Umbral de 100px
    }
  };

  useEffect(() => {
    if (isNearBottom) {
      scrollToBottom();
    }
  }, [expediente.mensajes, isNearBottom]);

  const determinarSiEsMio = (remitente: string) => {
    if (remitente === "sistema" || remitente === "bot") return false;
    
    // En vista dual, usar rolForzado; en vista móvil, usar usuarioActual
    const rolActivo = rolForzado || usuarioActual;
    
    // Si el rol activo es operador, ningún mensaje es "mío"
    if (rolActivo === "operador") return false;
    
    // Un mensaje es "mío" si el remitente coincide con mi rol activo
    return remitente === rolActivo;
  };

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto py-4 bg-gradient-to-b from-background to-muted/20"
    >
      {expediente.mensajes.map((mensaje) => (
        <ChatMessage
          key={mensaje.id}
          mensaje={mensaje}
          esMio={determinarSiEsMio(mensaje.remitente)}
          colorScheme={rolForzado}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
