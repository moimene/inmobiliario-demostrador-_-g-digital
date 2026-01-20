import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, MessageSquare, User, Bot } from "lucide-react";
import { CertifiedBadge } from "../../Shared/CertifiedBadge";

export const ConsolaTabChat = () => {
  const { expediente } = useArrendamiento();

  const handleExportChat = () => {
    console.log("Exportando conversación certificada...");
    // Simulación de exportación
  };

  const getRemitenteIcon = (remitente: string) => {
    if (remitente === "bot" || remitente === "sistema") {
      return <Bot className="h-4 w-4" />;
    }
    return <User className="h-4 w-4" />;
  };

  const getRemitenteColor = (remitente: string) => {
    switch (remitente) {
      case "arrendador":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "arrendatario":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "bot":
      case "certy":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "sistema":
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  const getRemitenteLabel = (remitente: string) => {
    switch (remitente) {
      case "arrendador":
        return "Arrendador";
      case "arrendatario":
        return "Arrendatario";
      case "bot":
      case "certy":
        return "Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza";
      case "sistema":
        return "Sistema";
      default:
        return remitente;
    }
  };

  return (
    <div className="p-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Historial de Chat Certificado
              </CardTitle>
              <CardDescription className="text-slate-400">
                Vista read-only de todas las comunicaciones con valor probatorio
              </CardDescription>
            </div>
            <Button onClick={handleExportChat} variant="outline" className="border-slate-600">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-3 pr-4">
              {expediente.mensajes.map((mensaje) => (
                <div
                  key={mensaje.id}
                  className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
                >
                  {/* Header del mensaje */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs flex items-center gap-1 ${getRemitenteColor(mensaje.remitente)}`}
                      >
                        {getRemitenteIcon(mensaje.remitente)}
                        {getRemitenteLabel(mensaje.remitente)}
                      </Badge>
                      
                      {mensaje.leido && (
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                          ✓✓ Leído
                        </Badge>
                      )}
                    </div>

                    <span className="text-xs text-slate-400 font-mono">
                      {new Date(mensaje.timestamp).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Contenido del mensaje */}
                  <p className="text-sm text-slate-100 whitespace-pre-wrap mb-3">
                    {mensaje.texto}
                  </p>

                  {/* Adjuntos */}
                  {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
                    <div className="mb-3 space-y-2">
                      {mensaje.adjuntos.map((adjunto, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-slate-900/50 rounded border border-slate-700"
                        >
                          <span className="text-xs">📎</span>
                          <span className="text-xs text-slate-300 flex-1">{adjunto.nombre}</span>
                          <Badge variant="outline" className="text-[10px] border-slate-600 text-slate-400">
                            {adjunto.tipo}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Certificación */}
                  {mensaje.certificado && mensaje.hash && (
                    <div className="pt-3 border-t border-slate-700">
                      <CertifiedBadge
                        hash={mensaje.hash}
                        timestamp={mensaje.timestamp}
                        compact
                      />
                    </div>
                  )}

                  {/* Confirmaciones */}
                  {mensaje.requiereConfirmacion && mensaje.confirmadoPor && (
                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <p className="text-xs text-slate-400 mb-2">Confirmado por:</p>
                      <div className="flex gap-2">
                        {mensaje.confirmadoPor.map((parte) => (
                          <Badge
                            key={parte}
                            variant="outline"
                            className="text-xs bg-green-500/10 border-green-500/30 text-green-400"
                          >
                            ✓ {parte === "arrendador" ? "Arrendador" : "Arrendatario"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Resumen */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-xl font-bold text-slate-100">
                  {expediente.mensajes.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Total mensajes</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-xl font-bold text-blue-400">
                  {expediente.mensajes.filter(m => m.remitente === "arrendador").length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Arrendador</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-xl font-bold text-green-400">
                  {expediente.mensajes.filter(m => m.remitente === "arrendatario").length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Arrendatario</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-xl font-bold text-purple-400">
                  {expediente.mensajes.filter(m => m.remitente === "bot" || m.remitente === "sistema").length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Bot/Sistema</p>
              </div>
            </div>
          </div>

          {/* Nota legal */}
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-300">
              <strong>Canal certificado:</strong> Esta conversación constituye el medio de notificaciones 
              oficial del contrato, con plena validez legal según eIDAS. Cada mensaje está 
              certificado con sello de tiempo cualificado.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
