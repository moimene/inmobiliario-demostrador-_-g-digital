import { MensajeArras } from "@/types/arras";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useArras } from "@/contexts/ArrasContext";
import { CertifiedBadge } from "@/components/arrendamiento/Shared/CertifiedBadge";
import { ReadStatus } from "./ReadStatus";
import { cn } from "@/lib/utils";
import certyLogo from "@/assets/certy-logo.png";

interface ChatMessageProps {
  mensaje: MensajeArras;
  rolActivo: "vendedor" | "comprador";
}

export const ChatMessage = ({ mensaje, rolActivo }: ChatMessageProps) => {
  const { confirmarMensaje } = useArras();

  const esMio = mensaje.remitente === rolActivo;
  const esBot = mensaje.tipo === "bot" || mensaje.remitente === "bot" || mensaje.remitente === "certy";

  const getBubbleColor = () => {
    if (esBot) return "bg-slate-100 text-slate-900";
    if (esMio && rolActivo === "vendedor") return "bg-blue-500 text-white";
    if (esMio && rolActivo === "comprador") return "bg-green-500 text-white";
    return "bg-muted text-foreground";
  };

  const getAlignment = () => {
    if (esBot) return "justify-center";
    return esMio ? "justify-end" : "justify-start";
  };

  const handleConfirmar = () => {
    confirmarMensaje(mensaje.id, rolActivo);
  };

  const yaConfirmado = mensaje.confirmadoPor?.includes(rolActivo);

  return (
    <div className={cn("flex", getAlignment())}>
      <div className={cn("max-w-[80%] rounded-lg p-3 space-y-2", getBubbleColor())}>
        {esBot && (
          <div className="flex items-center gap-2 mb-2">
            <img src={certyLogo} alt="Certy" className="h-5 w-5" />
            <span className="text-xs font-semibold text-slate-700">
              Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza
            </span>
          </div>
        )}

        <p className="text-sm whitespace-pre-line">{mensaje.texto}</p>

        {mensaje.certificado && (
          <div className="pt-2 border-t border-current/20">
            <div className="text-[9px]">
              <CertifiedBadge 
                hash={mensaje.hash} 
                timestamp={mensaje.timestamp}
              />
            </div>
          </div>
        )}

        {mensaje.requiereConfirmacion && (
          <div className="pt-2">
            <Button
              onClick={handleConfirmar}
              disabled={yaConfirmado}
              size="sm"
              variant={yaConfirmado ? "secondary" : "default"}
              className={cn(
                "w-full text-xs",
                yaConfirmado && "bg-green-100 text-green-700 hover:bg-green-100"
              )}
            >
              {yaConfirmado ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Confirmado
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          </div>
        )}

        {!esBot && mensaje.leido !== undefined && (
          <div className="flex justify-end pt-1">
            <ReadStatus leido={mensaje.leido} certificado={mensaje.certificado} />
          </div>
        )}
      </div>
    </div>
  );
};
