import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileArchive, FileText, Users, Home, MessageSquare, Archive, BarChart3, Shield, Eye } from "lucide-react";
import { exportarExpedientePDF } from "@/utils/exportarExpedientePDF";
import { generarActaCierreExpediente } from "@/utils/generarActaCierreExpediente";
import { toast } from "sonner";
import { useState } from "react";
import { PreviewPDFModal } from "../PreviewPDFModal";
import { PreviewActaCierreModal } from "../../ChatMovil/PreviewActaCierreModal";
import { cn } from "@/lib/utils";

export const ConsolaTabExportar = () => {
  const { expediente } = useArrendamiento();
  const [exportando, setExportando] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [actaCierreModalOpen, setActaCierreModalOpen] = useState(false);

  const handleExportComplete = () => {
    setExportando(true);
    toast.info("Generando expediente certificado...");
    
    try {
      // Simular un breve delay para mostrar el proceso
      setTimeout(() => {
        const fileName = exportarExpedientePDF(expediente);
        setExportando(false);
        setPreviewOpen(false); // Cerrar preview si está abierto
        toast.success(`✓ Expediente exportado: ${fileName}`, {
          description: "El PDF incluye todos los datos certificados con hashes y timestamps eIDAS.",
          duration: 5000,
        });
      }, 1000);
    } catch (error) {
      setExportando(false);
      toast.error("Error al exportar el expediente");
      console.error("Error en exportación:", error);
    }
  };

  const handleDescargarActaCierre = () => {
    setActaCierreModalOpen(true);
  };

  const elementosIncluidos = [
    {
      icon: FileText,
      titulo: "Contrato",
      descripcion: "PDF certificado con firmas digitales de ambas partes",
      color: "text-blue-400",
    },
    {
      icon: Users,
      titulo: "Identificaciones",
      descripcion: "Datos verificados del arrendador@ e arrendatari@",
      color: "text-green-400",
    },
    {
      icon: Home,
      titulo: "Inventario",
      descripcion: "Fotos y descripción certificada del estado del inmueble",
      color: "text-purple-400",
    },
    {
      icon: MessageSquare,
      titulo: "Chat Completo",
      descripcion: "Historial íntegro de comunicaciones certificadas",
      color: "text-yellow-400",
    },
    {
      icon: Archive,
      titulo: "Evidencias",
      descripcion: "Timeline y documentos probatorios con sellos de tiempo",
      color: "text-orange-400",
    },
    {
      icon: BarChart3,
      titulo: "Audit Trail",
      descripcion: "Registro completo de actividad y cambios de estado",
      color: "text-pink-400",
    },
  ];

  return (
    <div className="p-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <FileArchive className="h-6 w-6 text-primary" />
            <CardTitle className="text-slate-100 text-xl">
              Exportación de Expediente Completo
            </CardTitle>
          </div>
          <CardDescription className="text-slate-400">
            Genera un archivo comprimido con todas las evidencias certificadas del expediente {expediente.id}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Información del expediente */}
          <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Expediente</p>
                <p className="text-sm font-mono text-slate-100">{expediente.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Inmueble</p>
                <p className="text-sm text-slate-100">{expediente.vivienda.direccion}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Fecha de creación</p>
                <p className="text-sm text-slate-100">
                  {new Date(expediente.fechaCreacion).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-400 mb-1">Estado</p>
                <p className="text-sm text-slate-100 capitalize">{expediente.estado}</p>
              </div>
            </div>
          </div>

          {/* Elementos incluidos */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-4">
              📦 Contenido del expediente certificado
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {elementosIncluidos.map((elemento, idx) => (
                <div
                  key={idx}
                  className="p-4 border border-slate-700 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <elemento.icon className={`h-5 w-5 ${elemento.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h4 className="font-semibold text-sm text-slate-100 mb-1">
                        {elemento.titulo}
                      </h4>
                      <p className="text-xs text-slate-400">{elemento.descripcion}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formato de exportación */}
          <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-blue-300 mb-2">
                  Formato de exportación
                </h4>
                <ul className="text-xs text-blue-200 space-y-1">
                  <li>• Archivo ZIP con estructura organizada por categorías</li>
                  <li>• Todos los documentos en formato PDF/A (archivo a largo plazo)</li>
                  <li>• Cada archivo incluye metadatos de certificación eIDAS</li>
                  <li>• Manifest.json con índice completo y hashes SHA-256</li>
                  <li>• Certificado de autenticidad del proveedor de confianza</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estadísticas del expediente */}
          <div>
            <h3 className="text-sm font-semibold text-slate-100 mb-3">
              📊 Resumen del expediente
            </h3>
            <div className="grid grid-cols-4 gap-3">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.mensajes.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Mensajes</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.eventos.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Eventos</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.inventario.length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Items inventario</p>
              </div>

              <div className="text-center p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                <p className="text-2xl font-bold text-slate-100">
                  {expediente.inventario.flatMap(i => i.fotos).length}
                </p>
                <p className="text-xs text-slate-400 mt-1">Fotos</p>
              </div>
            </div>
          </div>

          {/* Botones de exportación */}
          <div className={cn(
            "grid gap-3",
            expediente.fase === "cierre" ? "grid-cols-3" : "grid-cols-2"
          )}>
            <Button
              onClick={() => setPreviewOpen(true)}
              size="lg"
              variant="outline"
              className="h-14 text-base border-primary text-primary hover:bg-primary/10"
            >
              <Eye className="mr-2 h-6 w-6" />
              PREVISUALIZAR PDF
            </Button>

            <Button
              onClick={handleExportComplete}
              size="lg"
              className="bg-primary hover:bg-primary/90 h-14 text-base"
              disabled={exportando}
            >
              <Download className="mr-2 h-6 w-6" />
              {exportando ? "GENERANDO..." : "EXPORTAR AHORA"}
            </Button>

            {/* Botón de Acta de Cierre (solo visible en fase cierre) */}
            {expediente.fase === "cierre" && (
              <Button
                onClick={handleDescargarActaCierre}
                size="lg"
                className="bg-red-600 hover:bg-red-700 h-14 text-base"
                disabled={exportando}
              >
                <FileArchive className="mr-2 h-6 w-6" />
                {exportando ? "GENERANDO..." : "ACTA DE CIERRE"}
              </Button>
            )}
          </div>

          <p className="text-xs text-slate-400 text-center">
            El expediente se exportará en formato PDF con certificación eIDAS.
            Tiempo estimado: ~2 segundos
          </p>

          {/* Nota legal */}
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-xs text-green-300">
              <strong>Validez legal:</strong> El expediente exportado constituye una carpeta probatoria 
              completa con validez jurídica. Todos los elementos están certificados con sellos de tiempo 
              cualificados según Reglamento eIDAS (UE) 910/2014, siendo admisibles como prueba en 
              procedimientos judiciales y administrativos.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de previsualización */}
      <PreviewPDFModal
        expediente={expediente}
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        onExport={handleExportComplete}
      />

      {/* Modal de previsualización del Acta de Cierre */}
      <PreviewActaCierreModal
        open={actaCierreModalOpen}
        onOpenChange={setActaCierreModalOpen}
      />
    </div>
  );
};
