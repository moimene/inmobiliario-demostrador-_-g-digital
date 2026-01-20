import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, User, Bot } from "lucide-react";
import certifiedBadge from "@/assets/sello_eadtrust.png";

export const ConsolaTabChat = () => {
  const { expediente } = useCompraventa();

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <Card className="bg-slate-900 border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="h-6 w-6 text-orange-400" />
          <h2 className="text-xl font-bold text-slate-100">Historial de Comunicaciones Certificadas</h2>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          Todas las comunicaciones están certificadas con sellos de tiempo cualificados (eIDAS).
          Este historial es de solo lectura y forma parte del expediente probatorio.
        </p>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-4">
            {expediente.mensajes.map((mensaje) => (
              <Card
                key={mensaje.id}
                className={`p-4 border ${
                  mensaje.tipo === "bot"
                    ? "bg-slate-800/50 border-slate-700"
                    : mensaje.remitente === "vendedor"
                    ? "bg-blue-500/10 border-blue-500/30"
                    : "bg-green-500/10 border-green-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {mensaje.tipo === "bot" ? (
                      <Bot className="h-5 w-5 text-slate-400" />
                    ) : (
                      <User
                        className={`h-5 w-5 ${
                          mensaje.remitente === "vendedor" ? "text-blue-400" : "text-green-400"
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-slate-100 capitalize">
                        {mensaje.remitente === "bot" ? "Certy Bot" : mensaje.remitente}
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(mensaje.timestamp).toLocaleString()}
                      </span>
                      {mensaje.certificado && (
                        <img
                          src={certifiedBadge}
                          alt="Certificado"
                          className="h-4 w-auto"
                          title="Mensaje certificado con sello de tiempo cualificado"
                        />
                      )}
                    </div>

                    <p className="text-sm text-slate-300 whitespace-pre-wrap">
                      {mensaje.texto}
                    </p>

                    {mensaje.hash && (
                      <p className="text-xs text-slate-500 font-mono mt-2">
                        Hash: {mensaje.hash}
                      </p>
                    )}

                    {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {mensaje.adjuntos.map((adj, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs bg-slate-800/50 text-slate-300"
                          >
                            📎 {adj.nombre}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {mensaje.leido !== undefined && (
                      <p className="text-xs text-slate-500 mt-2">
                        {mensaje.leido ? "✓✓ Leído" : "✓ Enviado"}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};
