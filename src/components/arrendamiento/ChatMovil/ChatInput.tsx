import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import { useState } from "react";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";

interface ChatInputProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatInput = ({ rolForzado }: ChatInputProps) => {
  const [mensaje, setMensaje] = useState("");
  const { enviarMensaje, usuarioActual } = useArrendamiento();
  const rolActivo = rolForzado || usuarioActual;

  const handleEnviar = () => {
    if (!mensaje.trim()) return;

    const remitente = rolActivo === "arrendador" ? "arrendador" : "arrendatario";

    enviarMensaje({
      tipo: "usuario",
      remitente,
      texto: mensaje,
    });

    setMensaje("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEnviar();
    }
  };

  return (
    <div className="border-t border-border/40 bg-background p-3">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
          <Paperclip className="h-5 w-5" />
        </Button>
        <Input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          className="flex-1"
        />
        <Button onClick={handleEnviar} size="icon" className="h-9 w-9 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
