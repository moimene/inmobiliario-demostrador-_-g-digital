import { useState } from "react";
import { useCompraventa } from "@/contexts/CompraventaContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatInput = ({ rolForzado }: ChatInputProps) => {
  const { enviarMensaje, usuarioActual } = useCompraventa();
  const [mensaje, setMensaje] = useState("");
  const rol = rolForzado || usuarioActual;

  const handleEnviar = () => {
    if (mensaje.trim()) {
      enviarMensaje({
        tipo: "usuario",
        remitente: rol as "vendedor" | "comprador",
        texto: mensaje,
      });
      setMensaje("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex gap-2">
        <Textarea
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje certificado..."
          className="resize-none"
          rows={2}
        />
        <Button onClick={handleEnviar} size="icon" className="shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
