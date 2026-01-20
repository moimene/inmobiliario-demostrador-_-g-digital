import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useArras } from "@/contexts/ArrasContext";

interface ChatInputProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatInput = ({ rolForzado }: ChatInputProps) => {
  const { enviarMensaje, usuarioActual } = useArras();
  const [mensaje, setMensaje] = useState("");

  const rolActivo = rolForzado || (usuarioActual as "vendedor" | "comprador");

  const handleEnviar = () => {
    if (!mensaje.trim()) return;

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo,
      texto: mensaje,
    });

    setMensaje("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEnviar();
    }
  };

  return (
    <div className="p-4 border-t bg-background">
      <div className="flex gap-2">
        <Input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe un mensaje..."
          className="flex-1"
        />
        <Button 
          onClick={handleEnviar}
          size="icon"
          className={rolActivo === "vendedor" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
