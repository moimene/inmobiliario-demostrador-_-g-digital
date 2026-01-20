import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Shield, Clock } from "lucide-react";
import { toast } from "sonner";

export const ConsolaTabExportar = () => {
  const { expediente } = useCompraventa();

  const handleExportExpediente = () => {
    toast.info("Generando expediente probatorio completo...", {
      description: "Esta función estará disponible en la siguiente fase de implementación",
    });
  };

  const handleExportContrato = () => {
    toast.info("Descargando contrato certificado...", {
      description: "Esta función estará disponible en la siguiente fase de implementación",
    });
  };

  const handleExportComunicaciones = () => {
    toast.info("Exportando historial de comunicaciones...", {
      description: "Esta función estará disponible en la siguiente fase de implementación",
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Download className="h-6 w-6 text-orange-400" />
          <h2 className="text-xl font-bold text-slate-100">Exportar Expediente Probatorio</h2>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          El expediente probatorio incluye todos los documentos, comunicaciones y eventos
          certificados con sellos de tiempo cualificados por EAD Trust. Este expediente tiene
          validez legal plena según normativa eIDAS.
        </p>

        <div className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-slate-100 mb-1">Expediente Completo PDF</h3>
                <p className="text-xs text-slate-400">
                  Incluye contrato, partes, inmueble, due diligence, comunicaciones y timeline
                </p>
              </div>
              <Button onClick={handleExportExpediente} className="gap-2">
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge variant="outline" className="bg-green-500/20 text-green-300">
                <Shield className="h-3 w-3 mr-1" />
                Certificado eIDAS
              </Badge>
              <Badge variant="outline" className="bg-blue-500/20 text-blue-300">
                <Clock className="h-3 w-3 mr-1" />
                Sellos de Tiempo
              </Badge>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-100 mb-1">Contrato de Compraventa</h3>
                <p className="text-xs text-slate-400">Contrato firmado con certificación digital</p>
              </div>
              <Button onClick={handleExportContrato} variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Descargar
              </Button>
            </div>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-semibold text-slate-100 mb-1">Historial de Comunicaciones</h3>
                <p className="text-xs text-slate-400">
                  Todas las comunicaciones certificadas del canal
                </p>
              </div>
              <Button onClick={handleExportComunicaciones} variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                Descargar
              </Button>
            </div>
          </Card>
        </div>
      </Card>

      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Información Legal</h3>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            📋 Los documentos exportados incluyen sellos de tiempo cualificados emitidos por EAD
            Trust como Prestador Cualificado de Servicios de Confianza (QTSP).
          </p>
          <p>
            ⚖️ Estos documentos tienen validez legal plena según Reglamento eIDAS (UE 910/2014) y
            Ley 6/2020 de regulación de servicios de confianza.
          </p>
          <p>
            🔐 Cada documento incluye un código QR de verificación que permite validar su
            autenticidad en cualquier momento.
          </p>
        </div>
      </Card>
    </div>
  );
};
