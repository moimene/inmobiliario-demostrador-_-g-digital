import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Bot } from "lucide-react";
import { CertifiedBadge } from "@/components/arrendamiento/Shared/CertifiedBadge";

export const ConsolaTabChat = () => {
  const { expediente } = useArras();

  const getRemitenteIcon = (remitente: string) => {
    if (remitente === "bot" || remitente === "certy") return Bot;
    return User;
  };

  const getRemitenteColor = (remitente: string) => {
    switch (remitente) {
      case "vendedor":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "comprador":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "bot":
      case "certy":
        return "bg-slate-700/50 text-slate-300 border-slate-600";
      default:
        return "bg-slate-700/50 text-slate-300 border-slate-600";
    }
  };

  const getRemitenteLabel = (remitente: string) => {
    switch (remitente) {
      case "vendedor":
        return "Vendedor";
      case "comprador":
        return "Comprador";
      case "bot":
      case "certy":
        return "Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza";
      default:
        return "Sistema";
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Historial de Comunicaciones Certificadas
            </CardTitle>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {expediente.mensajes.length} mensajes
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {expediente.mensajes.map((mensaje) => {
              const Icon = getRemitenteIcon(mensaje.remitente);
              const colorClass = getRemitenteColor(mensaje.remitente);
              const label = getRemitenteLabel(mensaje.remitente);

              return (
                <div
                  key={mensaje.id}
                  className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Icon className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className={colorClass}>
                          {label}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {new Date(mensaje.timestamp).toLocaleString("es-ES")}
                        </span>
                        {mensaje.certificado && <CertifiedBadge hash={mensaje.hash || ""} compact />}
                      </div>

                      <p className="text-sm text-slate-200 whitespace-pre-wrap">{mensaje.texto}</p>

                      {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {mensaje.adjuntos.map((adj, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="bg-slate-700/30 text-slate-300 border-slate-600"
                            >
                              📎 {adj.nombre}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.filter((m) => m.remitente === "vendedor").length}
                </p>
                <p className="text-xs text-slate-400">Vendedor</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.filter((m) => m.remitente === "comprador").length}
                </p>
                <p className="text-xs text-slate-400">Comprador</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">
                  {
                    expediente.mensajes.filter((m) => m.remitente === "bot" || m.remitente === "certy")
                      .length
                  }
                </p>
                <p className="text-xs text-slate-400">Certy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.filter((m) => m.certificado).length}
                </p>
                <p className="text-xs text-slate-400">Certificados</p>
              </div>
            </div>
          </div>

          {/* Disclaimer legal */}
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-xs text-amber-400/90">
              ⚖️ <strong>Valor probatorio:</strong> Todas las comunicaciones en este canal están
              certificadas con sellos de tiempo cualificados emitidos por EAD Trust (Prestador
              Cualificado de Servicios de Confianza). Este historial tiene validez legal conforme a
              eIDAS y Ley 6/2020.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
