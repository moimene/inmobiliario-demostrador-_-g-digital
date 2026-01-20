import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText } from "lucide-react";
import { CertifiedBadge } from "../../Shared/CertifiedBadge";
import { descargarContratoArrendamiento } from "@/utils/descargarContratoArrendamiento";
import { toast } from "sonner";
import { useState } from "react";

export const ConsolaTabContrato = () => {
  const { expediente } = useArrendamiento();
  const [descargando, setDescargando] = useState(false);

  const handleExportContrato = async () => {
    try {
      setDescargando(true);
      toast.info("Generando borrador del contrato...");
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const nombreArchivo = descargarContratoArrendamiento(expediente);
      
      toast.success(`Contrato descargado: ${nombreArchivo}`);
    } catch (error) {
      console.error("Error al exportar contrato:", error);
      toast.error("Error al generar el contrato");
    } finally {
      setDescargando(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contrato de Arrendamiento
              </CardTitle>
              <CardDescription className="text-slate-400">
                Documento certificado con sello de tiempo cualificado eIDAS
              </CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Certificado
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simulación de visor PDF */}
          <div className="border border-slate-700 rounded-lg bg-slate-800/30 aspect-[1/1.414] flex flex-col items-center justify-center p-8">
            <FileText className="h-16 w-16 text-slate-600 mb-4" />
            <p className="text-slate-400 text-center">
              Visor de PDF del contrato
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Contrato_Arrendamiento_{expediente.vivienda.direccion.split(',')[0].replace(/\s/g, '_')}.pdf
            </p>
          </div>

          {/* Metadatos del contrato */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Hash del documento</p>
              <p className="font-mono text-xs text-slate-200 break-all">
                a3f8c92d5e7b4a1c9d2e8f5a3b7c1d4e
              </p>
              <div className="mt-2">
                <CertifiedBadge hash="a3f8c92d5e7b4a1c" compact />
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Sello temporal cualificado</p>
              <p className="font-mono text-xs text-slate-200">
                {new Date(expediente.fechaCreacion).toISOString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(expediente.fechaCreacion).toLocaleString('es-ES')}
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Firmado por</p>
              <p className="text-sm text-slate-200 font-semibold">
                {expediente.partes.arrendador.nombre}
              </p>
              <p className="text-sm text-slate-200 font-semibold mt-1">
                {expediente.partes.arrendatario.nombre}
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Estado del contrato</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ✓ Firmado digitalmente
              </Badge>
              <p className="text-xs text-slate-500 mt-2">
                Validez jurídica conforme eIDAS
              </p>
            </div>
          </div>

          {/* Datos principales */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Renta mensual</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.rentaMensual.toLocaleString('es-ES')}€
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Depósito/Fianza</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.deposito.toLocaleString('es-ES')}€
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Duración</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.duracion} meses
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Fecha de inicio</p>
              <p className="text-sm font-semibold text-slate-100">
                {new Date(expediente.contrato.fechaInicio).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Fecha de fin</p>
              <p className="text-sm font-semibold text-slate-100">
                {new Date(expediente.contrato.fechaFin).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Botón de exportación */}
          <Button 
            onClick={handleExportContrato}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            disabled={descargando}
          >
            <Download className="mr-2 h-5 w-5" />
            {descargando ? "GENERANDO PDF..." : "Descargar Borrador del Contrato (PDF)"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
