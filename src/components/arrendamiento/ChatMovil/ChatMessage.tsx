import { Mensaje } from "@/types/arrendamiento";
import { CertifiedBadge } from "../Shared/CertifiedBadge";
import { ReadStatus } from "./ReadStatus";
import { cn } from "@/lib/utils";
import certyLogo from "@/assets/certy-logo.png";

interface ChatMessageProps {
  mensaje: Mensaje;
  esMio: boolean;
  colorScheme?: "arrendador" | "arrendatario";
}

export const ChatMessage = ({ mensaje, esMio, colorScheme }: ChatMessageProps) => {
  const esSistema = mensaje.tipo === "sistema";
  const esBot = mensaje.tipo === "bot";

  if (esSistema || esBot) {
    return (
      <div className="flex justify-center my-4 px-4">
        <div className="max-w-md bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 backdrop-blur-sm border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-3 shadow-md">
          <div className="flex items-start gap-2 mb-2">
            <img src={certyLogo} alt="Certy" className="w-8 h-8 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza</p>
              <p className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line">{mensaje.texto}</p>
            </div>
          </div>
          
          {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
            <div className="space-y-2 mt-3">
              {mensaje.adjuntos.map((adjunto, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 text-xs flex items-center gap-2"
                >
                  <span>📎</span>
                  <span className="text-slate-700 dark:text-slate-300">{adjunto.nombre}</span>
                </div>
              ))}
            </div>
          )}
          
          {mensaje.hash && (
            <div className="mt-3 flex justify-center">
              <CertifiedBadge hash={mensaje.hash} timestamp={mensaje.timestamp} compact showEidasLogo={true} />
            </div>
          )}
        </div>
      </div>
    );
  }

  const formatHora = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className={cn("flex mb-4 px-4", esMio ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 shadow-sm",
          esMio
            ? colorScheme === "arrendador"
              ? "bg-blue-500 dark:bg-blue-600 text-white rounded-br-sm"
              : colorScheme === "arrendatario"
              ? "bg-emerald-500 dark:bg-emerald-600 text-white rounded-br-sm"
              : "bg-primary/90 text-primary-foreground rounded-br-sm"
            : "bg-muted border border-border/40 rounded-bl-sm"
        )}
      >
        <p className="text-sm mb-2">{mensaje.texto}</p>

        {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
          <div className="space-y-2 mb-2">
            {mensaje.adjuntos.map((adjunto, idx) => (
              <div
                key={idx}
                className="p-2 bg-background/10 rounded-lg border border-border/20 text-xs"
              >
                📎 {adjunto.nombre}
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 text-xs opacity-70">
          <span className="font-mono">{formatHora(mensaje.timestamp)}</span>
          
          <div className="flex items-center gap-2">
            {mensaje.certificado && mensaje.hash && (
              <CertifiedBadge hash={mensaje.hash} compact showEidasLogo={true} />
            )}
            
            {esMio && (
              <ReadStatus leido={mensaje.leido || false} certificado={mensaje.certificado} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
