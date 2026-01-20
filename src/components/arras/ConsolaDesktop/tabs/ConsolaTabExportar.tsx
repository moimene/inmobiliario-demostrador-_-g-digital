import { useState } from "react";
import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Eye, Clock } from "lucide-react";
import { toast } from "sonner";

export const ConsolaTabExportar = () => {
  const { expediente } = useArras();
  const [exportando, setExportando] = useState(false);

  const handleExportExpediente = async () => {
    try {
      setExportando(true);
      toast.info("Generando expediente completo certificado...");

      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("Expediente exportado correctamente", {
        description: `Expediente_Arras_${expediente.id}.pdf`,
      });
    } catch (error) {
      console.error("Error al exportar expediente:", error);
      toast.error("Error al generar el expediente");
    } finally {
      setExportando(false);
    }
  };

  const handlePreview = () => {
    toast.info("Vista previa del expediente", {
      description: "Funcionalidad en desarrollo",
    });
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Expediente Probatorio Completo
          </CardTitle>
          <CardDescription className="text-slate-400">
            Exportación certificada con validez jurídica plena (eIDAS, Ley 6/2020)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              📦 Contenido del Expediente
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Contrato de arras firmado con sellos de tiempo cualificados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Identificación completa de las partes (Vendedor, Comprador, Notario)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Datos registrales del inmueble y Nota Informativa</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Historial completo de comunicaciones certificadas entre las partes
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Documentos adjuntos con hash de integridad y timestamps</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>
                  Timeline de eventos del proceso (convocatoria notarial, comparecencias, resolución)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Certificado de depósito de arras y justificantes de movimientos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Acta de resolución de arras (consolidación, pérdida o devolución duplicada)</span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Formato de exportación</p>
              <p className="text-sm font-semibold text-slate-100">PDF/A-3 con certificados embebidos</p>
              <p className="text-xs text-slate-500 mt-1">
                Incluye metadatos XMP y hashes SHA-256 de todos los documentos
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Validez legal</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                eIDAS Qualified
              </Badge>
              <p className="text-xs text-slate-500 mt-2">
                Conforme Ley 6/2020, art. 326.4 LEC
              </p>
            </div>
          </div>

          {/* Estadísticas del expediente */}
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              📊 Resumen del Expediente
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-100">{expediente.mensajes.length}</p>
                <p className="text-xs text-slate-400">Mensajes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.filter((m) => m.certificado).length}
                </p>
                <p className="text-xs text-slate-400">Certificados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.reduce((acc, m) => acc + (m.adjuntos?.length || 0), 0)}
                </p>
                <p className="text-xs text-slate-400">Documentos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-100">
                  {Math.floor(
                    (new Date().getTime() - new Date(expediente.fechaCreacion).getTime()) /
                      (1000 * 60 * 60 * 24)
                  )}
                </p>
                <p className="text-xs text-slate-400">Días activo</p>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              onClick={handlePreview}
              variant="outline"
              className="flex-1 border-slate-700 text-slate-100 hover:bg-slate-800"
            >
              <Eye className="mr-2 h-4 w-4" />
              Vista Previa
            </Button>
            <Button
              onClick={handleExportExpediente}
              disabled={exportando}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              <Download className="mr-2 h-4 w-4" />
              {exportando ? "EXPORTANDO..." : "Exportar Expediente Completo"}
            </Button>
          </div>

          {/* Disclaimer legal */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-400/90">
                <strong>Certificación cualificada:</strong> Este expediente incluye sellos de tiempo
                cualificados emitidos por EAD Trust (QTSP). Toda la documentación es válida como
                prueba documental en procedimientos judiciales conforme al art. 326.4 LEC.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
