import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileArchive, Download, X, Eye, Shield, CheckCircle2 } from "lucide-react";
import { generarActaCierreExpediente } from "@/utils/generarActaCierreExpediente";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { toast } from "sonner";

interface PreviewActaCierreModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PreviewActaCierreModal = ({ open, onOpenChange }: PreviewActaCierreModalProps) => {
  const { expediente, enviarMensaje } = useArrendamiento();
  const [downloading, setDownloading] = useState(false);

  const handleDescargar = () => {
    setDownloading(true);
    
    try {
      const fileName = generarActaCierreExpediente(expediente);
      
      toast.success(`✓ Acta de Cierre descargada: ${fileName}`, {
        description: "Documento oficial certificado con plena validez jurídica",
        duration: 5000,
      });

      // Enviar mensaje certificado del sistema
      enviarMensaje({
        tipo: "sistema",
        remitente: "certy",
        texto: `📋 ACTA DE CIERRE DEL EXPEDIENTE DESCARGADA\n\nSe ha generado y descargado el Acta de Cierre oficial del expediente ${expediente.id}.\n\nEste documento certifica el cierre definitivo del contrato de arrendamiento y constituye el registro probatorio final con plena validez jurídica.\n\n✓ Certificado con sello de tiempo cualificado eIDAS\n✓ Validez jurídica en toda la Unión Europea\n✓ Documento: ${fileName}`,
      });

      // Cerrar modal tras descarga exitosa
      setTimeout(() => {
        setDownloading(false);
        onOpenChange(false);
      }, 800);
    } catch (error) {
      setDownloading(false);
      toast.error("Error al generar el Acta de Cierre");
      console.error("Error generando Acta:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <FileArchive className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">
                  Acta de Cierre del Expediente
                </DialogTitle>
                <DialogDescription className="mt-2">
                  Previsualización del documento oficial certificado de cierre
                </DialogDescription>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Badge de certificación */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <h4 className="font-semibold text-red-900 text-sm">
                Documento Oficial Certificado
              </h4>
              <p className="text-xs text-red-700 leading-relaxed">
                Este Acta constituye el registro probatorio final del expediente de arrendamiento
                con plena validez jurídica conforme al Reglamento eIDAS (UE) 910/2014 y Ley 6/2020.
                Todos los eventos y comunicaciones han sido certificados con sellos de tiempo cualificados
                por EAD Trust como Prestador Cualificado de Servicios de Confianza.
              </p>
            </div>
          </div>
        </div>

        {/* Vista previa del contenido del Acta */}
        <div className="space-y-6 border border-border rounded-lg p-6 bg-muted/30">
          {/* Portada */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-lg">
            <div className="text-center space-y-3">
              <h2 className="text-2xl font-bold">EAD Trust g-digital</h2>
              <p className="text-sm text-slate-300">
                Proveedor de Servicios de Confianza Cualificado
              </p>
              <div className="inline-block bg-teal-500 px-4 py-1 rounded-full text-xs font-semibold mt-2">
                ✓ CERTIFICACIÓN eIDAS • VALIDEZ JURÍDICA PLENA EN LA UE
              </div>
            </div>
            
            <div className="mt-6 space-y-2 text-center">
              <h3 className="text-xl font-bold">ACTA DE CIERRE</h3>
              <p className="text-slate-300">Expediente de Arrendamiento Certificado</p>
            </div>

            <div className="mt-6 bg-slate-800/50 rounded-lg p-4 space-y-2 text-sm">
              <p><span className="font-semibold">Expediente Nº:</span> {expediente.id}</p>
              <p>
                <span className="font-semibold">Fecha de apertura:</span>{" "}
                {new Date(expediente.fechaCreacion).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p>
                <span className="font-semibold">Fecha de cierre:</span>{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p><span className="font-semibold">Estado final:</span> {expediente.estado.toUpperCase()}</p>
            </div>
          </div>

          {/* Resumen de las partes */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm border-b pb-2">1. Partes del Contrato</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="text-xs font-semibold text-blue-900 mb-2">🔵 ARRENDADOR</h5>
                <div className="text-xs space-y-1 text-blue-800">
                  <p className="font-semibold">{expediente.partes.arrendador.nombre}</p>
                  <p>NIF: {expediente.partes.arrendador.nif}</p>
                  <p className="text-blue-600">{expediente.partes.arrendador.email}</p>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h5 className="text-xs font-semibold text-green-900 mb-2">🟢 ARRENDATARIO</h5>
                <div className="text-xs space-y-1 text-green-800">
                  <p className="font-semibold">{expediente.partes.arrendatario.nombre}</p>
                  <p>NIF: {expediente.partes.arrendatario.nif}</p>
                  <p className="text-green-600">{expediente.partes.arrendatario.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resumen del inmueble */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm border-b pb-2">2. Inmueble Arrendado</h4>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="text-xs space-y-2 text-slate-700">
                <p><span className="font-semibold">Dirección:</span> {expediente.vivienda.direccion}</p>
                <p>
                  <span className="font-semibold">Características:</span> {expediente.vivienda.tipo} •{" "}
                  {expediente.vivienda.superficie}m² • {expediente.vivienda.habitaciones} hab. •{" "}
                  {expediente.vivienda.banos} baño(s)
                </p>
              </div>
            </div>
          </div>

          {/* Resumen económico */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm border-b pb-2">3. Condiciones Económicas</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                <p className="text-xs text-purple-600 mb-1">Renta mensual</p>
                <p className="text-lg font-bold text-purple-900">{expediente.contrato.rentaMensual}€</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                <p className="text-xs text-orange-600 mb-1">Fianza depositada</p>
                <p className="text-lg font-bold text-orange-900">{expediente.contrato.deposito}€</p>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 text-center">
                <p className="text-xs text-teal-600 mb-1">Duración</p>
                <p className="text-lg font-bold text-teal-900">{expediente.contrato.duracion} meses</p>
              </div>
            </div>
          </div>

          {/* Estadísticas del expediente */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm border-b pb-2">4. Resumen del Expediente Certificado</h4>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-slate-100 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-900">{expediente.mensajes.length}</p>
                <p className="text-xs text-slate-600 mt-1">Mensajes</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-900">{expediente.eventos.length}</p>
                <p className="text-xs text-slate-600 mt-1">Eventos</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-900">{expediente.inventario.length}</p>
                <p className="text-xs text-slate-600 mt-1">Inventario</p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-slate-900">
                  {expediente.inventario.flatMap((i) => i.fotos).length}
                </p>
                <p className="text-xs text-slate-600 mt-1">Fotos</p>
              </div>
            </div>
          </div>

          {/* Contenido incluido */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm border-b pb-2">📦 El Acta PDF completo incluye:</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Declaración oficial de cierre certificado",
                "Resumen ejecutivo completo del contrato",
                "Timeline detallada de eventos certificados",
                "Historial de comunicaciones certificadas",
                "Estado final y liquidación de fianza",
                "Certificación final con sello de tiempo cualificado",
                "Código QR de verificación independiente",
                "Firma digital EAD Trust como QTSP",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-row gap-2 sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            <X className="mr-2 h-4 w-4" />
            Cancelar
          </Button>
          <Button
            onClick={handleDescargar}
            disabled={downloading}
            className="flex-1 bg-red-600 hover:bg-red-700"
          >
            {downloading ? (
              <>
                <Download className="mr-2 h-4 w-4 animate-pulse" />
                Generando...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Descargar Acta de Cierre
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
