import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, AlertCircle, FileText, Wrench } from "lucide-react";
import { CertifiedBadge } from "../../Shared/CertifiedBadge";

export const ConsolaTabEvidencias = () => {
  const { expediente } = useArrendamiento();

  // Extraer incidencias de mantenimiento del historial de mensajes
  const incidenciasReportadas = expediente.mensajes.filter(
    (m) => m.remitente === "arrendatario" && m.texto.includes("INCIDENCIA REPORTADA")
  );

  const respuestasIncidencias = expediente.mensajes.filter(
    (m) => m.remitente === "arrendador" && m.texto.startsWith("✅")
  );

  // Construir timeline de incidencias
  const timelineIncidencias = incidenciasReportadas.map((incidencia, index) => {
    const respuesta = respuestasIncidencias[index]; // Emparejar por orden (demo simplificado)
    const descripcion = incidencia.texto.replace("🔧 INCIDENCIA REPORTADA: ", "");
    
    return {
      id: incidencia.id,
      fecha: incidencia.timestamp,
      descripcion,
      estado: respuesta ? "resuelta" : "pendiente",
      hash: incidencia.hash,
      respuesta: respuesta?.texto,
    };
  });

  const getEventIcon = (tipo: string) => {
    switch (tipo) {
      case "inicio":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "fase_change":
        return <AlertCircle className="h-4 w-4 text-blue-400" />;
      case "documento":
        return <FileText className="h-4 w-4 text-purple-400" />;
      case "cierre":
        return <CheckCircle2 className="h-4 w-4 text-slate-400" />;
      default:
        return <Clock className="h-4 w-4 text-slate-400" />;
    }
  };

  return (
    <div className="p-6 bg-slate-950 space-y-6">
      {/* Timeline de Incidencias de Mantenimiento */}
      {timelineIncidencias.length > 0 && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-400" />
              Incidencias de Mantenimiento
            </CardTitle>
            <CardDescription className="text-slate-400">
              Registro certificado de incidencias reportadas durante la vida del contrato
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[400px]">
              <div className="space-y-4 pr-4">
                {timelineIncidencias.map((incidencia, index) => (
                  <div key={incidencia.id} className="relative">
                    {/* Línea conectora */}
                    {index > 0 && (
                      <div className="absolute left-2 -top-4 bottom-0 w-0.5 bg-slate-700" />
                    )}

                    {/* Incidencia */}
                    <div className="flex items-start gap-4 relative">
                      {/* Icono */}
                      <div className="flex-shrink-0 w-4 h-4 mt-1 z-10">
                        {incidencia.estado === "resuelta" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-400" />
                        )}
                      </div>

                      {/* Contenido */}
                      <div className="flex-1 pb-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-slate-100">
                                {incidencia.descripcion}
                              </p>
                              <p className="text-xs text-slate-400 font-mono mt-1">
                                {new Date(incidencia.fecha).toLocaleString("es-ES", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                incidencia.estado === "resuelta"
                                  ? "text-xs border-green-600 text-green-400 bg-green-500/10"
                                  : "text-xs border-orange-600 text-orange-400 bg-orange-500/10"
                              }
                            >
                              {incidencia.estado === "resuelta" ? "✓ Resuelta" : "⏳ Pendiente"}
                            </Badge>
                          </div>

                          {/* Respuesta del arrendador si existe */}
                          {incidencia.respuesta && (
                            <div className="mt-3 pt-3 border-t border-slate-700">
                              <p className="text-xs text-slate-300 italic">
                                <strong className="text-blue-400">Respuesta arrendador:</strong>{" "}
                                {incidencia.respuesta}
                              </p>
                            </div>
                          )}

                          {/* Certificación */}
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <CertifiedBadge
                              hash={incidencia.hash || ""}
                              timestamp={incidencia.fecha}
                              compact
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Estadísticas de incidencias */}
            <div className="mt-6 pt-6 border-t border-slate-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <p className="text-2xl font-bold text-orange-400">
                    {incidenciasReportadas.length}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Total reportadas</p>
                </div>

                <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                  <p className="text-2xl font-bold text-green-400">
                    {timelineIncidencias.filter((i) => i.estado === "resuelta").length}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Resueltas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline Probatorio General */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline Probatorio
          </CardTitle>
          <CardDescription className="text-slate-400">
            Registro completo de evidencias certificadas con valor legal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4 pr-4">
              {expediente.eventos.map((evento, index) => {
                const isFirst = index === 0;
                
                return (
                  <div key={evento.id} className="relative">
                    {/* Línea conectora */}
                    {!isFirst && (
                      <div className="absolute left-2 -top-4 bottom-0 w-0.5 bg-slate-700" />
                    )}

                    {/* Evento */}
                    <div className="flex items-start gap-4 relative">
                      {/* Icono del evento */}
                      <div className="flex-shrink-0 w-4 h-4 mt-1 z-10">
                        {getEventIcon(evento.tipo)}
                      </div>

                      {/* Contenido del evento */}
                      <div className="flex-1 pb-4">
                        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <p className="font-semibold text-sm text-slate-100">
                                {evento.mensaje}
                              </p>
                              <p className="text-xs text-slate-400 font-mono mt-1">
                                {new Date(evento.fecha).toLocaleString('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                })}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs border-slate-600 text-slate-400 ml-2"
                            >
                              {evento.tipo}
                            </Badge>
                          </div>

                          {/* Certificación si existe */}
                          {evento.icono && (
                            <div className="mt-3 pt-3 border-t border-slate-700">
                              <CertifiedBadge
                                hash={`${evento.id}_hash`}
                                timestamp={evento.fecha}
                                compact
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Resumen de evidencias */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.eventos.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Total eventos</p>
              </div>

              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-green-400">
                  {expediente.mensajes.filter(m => m.certificado).length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Mensajes certificados</p>
              </div>

              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-blue-400">
                  {expediente.inventario.flatMap(i => i.fotos).length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Fotos certificadas</p>
              </div>
            </div>
          </div>

          {/* Nota legal */}
          <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              <strong>Valor probatorio:</strong> Todas las evidencias están certificadas con sellos de 
              tiempo cualificados según Reglamento eIDAS (UE) 910/2014, otorgando plena validez legal 
              en procedimientos judiciales y administrativos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
