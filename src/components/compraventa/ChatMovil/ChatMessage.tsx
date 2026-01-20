import { MensajeCompraventa } from "@/types/compraventa";
import { Badge } from "@/components/ui/badge";
import { CheckCheck, FileText } from "lucide-react";
import certyLogo from "@/assets/certy-logo.png";

interface ChatMessageProps {
  mensaje: MensajeCompraventa;
  rolActivo: "operador" | "vendedor" | "comprador";
}

export const ChatMessage = ({ mensaje, rolActivo }: ChatMessageProps) => {
  const esMio = mensaje.remitente === rolActivo;
  const esBot = mensaje.remitente === "bot" || mensaje.remitente === "certy";
  const esSistema = mensaje.remitente === "sistema";

  if (esBot || esSistema) {
    return (
      <div className="flex flex-col items-center my-6">
        <div className="max-w-[90%] bg-slate-100 border border-slate-300 rounded-2xl p-4 shadow-sm">
          {esBot && (
            <div className="flex items-center gap-2 mb-2">
              <img src={certyLogo} alt="Certy" className="h-5 w-5" />
              <span className="text-xs font-semibold text-slate-700">
                Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza
              </span>
            </div>
          )}
          <p className="text-sm text-slate-800 whitespace-pre-line">{mensaje.texto}</p>
          {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
            <div className="mt-3 space-y-2">
              {mensaje.adjuntos.map((adj, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white p-2 rounded border">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-xs text-slate-700">{adj.nombre}</span>
                </div>
              ))}
            </div>
          )}
          {mensaje.certificado && (
            <div className="mt-3 pt-2 border-t border-slate-200">
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                ✓ Certificado eIDAS
              </Badge>
              {mensaje.hash && (
                <p className="text-xs text-slate-500 mt-1">Hash: {mensaje.hash.substring(0, 16)}...</p>
              )}
            </div>
          )}
        </div>
        <span className="text-xs text-slate-400 mt-1">
          {new Date(mensaje.timestamp).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    );
  }

  const getBubbleColor = () => {
    if (esMio) {
      return rolActivo === "vendedor" 
        ? "bg-blue-600 text-white" 
        : "bg-emerald-600 text-white";
    }
    return "bg-slate-200 text-slate-900";
  };

  return (
    <div className={`flex ${esMio ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%]">
        <div className={`rounded-2xl px-4 py-2 ${getBubbleColor()}`}>
          <p className="text-sm whitespace-pre-line">{mensaje.texto}</p>
          {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
            <div className="mt-2 space-y-1">
              {mensaje.adjuntos.map((adj, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-white/20 p-1 rounded text-xs">
                  <FileText className="h-3 w-3" />
                  <span>{adj.nombre}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1 px-2">
          <span className="text-xs text-slate-400">
            {new Date(mensaje.timestamp).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {esMio && mensaje.leido && <CheckCheck className="h-3 w-3 text-blue-600" />}
          {mensaje.certificado && (
            <Badge variant="outline" className="text-xs h-4 px-1">
              ✓ Certificado
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};
