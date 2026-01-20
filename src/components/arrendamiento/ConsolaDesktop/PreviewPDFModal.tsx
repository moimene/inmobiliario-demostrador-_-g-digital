import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, X } from "lucide-react";
import { Expediente } from "@/types/arrendamiento";
import { faseLabels } from "@/data/arrendamientoBotFlow";

interface PreviewPDFModalProps {
  expediente: Expediente;
  open: boolean;
  onClose: () => void;
  onExport: () => void;
}

export const PreviewPDFModal = ({ expediente, open, onClose, onExport }: PreviewPDFModalProps) => {
  const eventosOrdenados = [...expediente.eventos].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-background">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">Previsualización del Expediente PDF</DialogTitle>
              <DialogDescription className="mt-1">
                Vista previa del documento certificado que se generará
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex gap-2 mt-4">
            <Button onClick={onExport} className="flex-1 bg-primary">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF Ahora
            </Button>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1">
          <div className="p-8 bg-white text-black" style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* ==================== PORTADA ==================== */}
            <div className="bg-blue-600 text-white p-8 -mx-8 -mt-8 mb-8">
              <h1 className="text-3xl font-bold text-center mb-2">EAD Trust g-digital</h1>
              <p className="text-center text-sm">Proveedor de Servicios de Confianza Cualificado</p>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">EXPEDIENTE CERTIFICADO</h2>
              <h3 className="text-xl mb-6">Canal de Arrendamiento Digital</h3>

              <div className="text-left space-y-2 text-sm">
                <p><strong>Expediente:</strong> {expediente.id}</p>
                <p><strong>Fecha de creación:</strong> {new Date(expediente.fechaCreacion).toLocaleString("es-ES")}</p>
                <p><strong>Fase actual:</strong> {faseLabels[expediente.fase]}</p>
                <p><strong>Estado:</strong> {expediente.estado}</p>
              </div>
            </div>

            <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-8">
              <p className="font-bold text-sm text-green-800 mb-2">
                ✓ CERTIFICADO SEGÚN REGLAMENTO eIDAS (UE) 910/2014
              </p>
              <p className="text-xs text-green-700">
                Todos los eventos, mensajes y documentos incluyen sello de tiempo cualificado.
                Este expediente tiene plena validez probatoria jurídica.
              </p>
            </div>

            {/* ==================== DATOS DE LAS PARTES ==================== */}
            <div className="mb-8 page-break">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
                1. DATOS DE LAS PARTES
              </h2>

              <div className="mb-6">
                <h3 className="font-bold text-base mb-2 text-blue-600">🔵 ARRENDADOR</h3>
                <div className="pl-4 text-sm space-y-1">
                  <p><strong>Nombre:</strong> {expediente.partes.arrendador.nombre}</p>
                  <p><strong>NIF:</strong> {expediente.partes.arrendador.nif}</p>
                  <p><strong>Email:</strong> {expediente.partes.arrendador.email}</p>
                  <p><strong>Teléfono:</strong> {expediente.partes.arrendador.telefono}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2 text-green-600">🟢 ARRENDATARIO</h3>
                <div className="pl-4 text-sm space-y-1">
                  <p><strong>Nombre:</strong> {expediente.partes.arrendatario.nombre}</p>
                  <p><strong>NIF:</strong> {expediente.partes.arrendatario.nif}</p>
                  <p><strong>Email:</strong> {expediente.partes.arrendatario.email}</p>
                  <p><strong>Teléfono:</strong> {expediente.partes.arrendatario.telefono}</p>
                </div>
              </div>
            </div>

            {/* ==================== DATOS DEL INMUEBLE Y CONTRATO ==================== */}
            <div className="mb-8 page-break">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
                2. DATOS DEL INMUEBLE Y CONTRATO
              </h2>

              <div className="mb-6">
                <h3 className="font-bold text-base mb-2">🏠 INMUEBLE</h3>
                <div className="pl-4 text-sm space-y-1">
                  <p><strong>Dirección:</strong> {expediente.vivienda.direccion}</p>
                  <p><strong>Tipo:</strong> {expediente.vivienda.tipo}</p>
                  <p><strong>Superficie:</strong> {expediente.vivienda.superficie} m²</p>
                  <p><strong>Habitaciones:</strong> {expediente.vivienda.habitaciones}</p>
                  <p><strong>Baños:</strong> {expediente.vivienda.banos}</p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-base mb-2">📄 CONTRATO</h3>
                <div className="pl-4 text-sm space-y-1">
                  <p><strong>Fecha de inicio:</strong> {new Date(expediente.contrato.fechaInicio).toLocaleDateString("es-ES")}</p>
                  <p><strong>Fecha de fin:</strong> {new Date(expediente.contrato.fechaFin).toLocaleDateString("es-ES")}</p>
                  <p><strong>Renta mensual:</strong> {expediente.contrato.rentaMensual}€/mes</p>
                  <p><strong>Depósito:</strong> {expediente.contrato.deposito}€</p>
                  <p><strong>Duración:</strong> {expediente.contrato.duracion} meses</p>
                </div>
              </div>
            </div>

            {/* ==================== TIMELINE DE EVENTOS ==================== */}
            <div className="mb-8 page-break">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
                3. TIMELINE DE EVENTOS CERTIFICADOS
              </h2>

              <div className="space-y-4 text-sm">
                {eventosOrdenados.slice(0, 10).map((evento, index) => (
                  <div key={evento.id} className="border-l-2 border-blue-400 pl-3">
                    <p className="font-bold">
                      {index + 1}. {new Date(evento.fecha).toLocaleString("es-ES")}
                    </p>
                    <p className="text-gray-700 mt-1">{evento.mensaje}</p>
                    <p className="text-xs text-gray-500 mt-1">Tipo: {evento.tipo}</p>
                    <p className="text-xs text-gray-500">ID: {evento.id}</p>
                  </div>
                ))}
                {eventosOrdenados.length > 10 && (
                  <p className="text-center text-gray-500 text-sm italic">
                    ... y {eventosOrdenados.length - 10} eventos más en el PDF completo
                  </p>
                )}
              </div>
            </div>

            {/* ==================== HISTORIAL DE MENSAJES ==================== */}
            <div className="mb-8 page-break">
              <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
                4. HISTORIAL COMPLETO DE COMUNICACIONES CERTIFICADAS
              </h2>

              <div className="space-y-4 text-sm">
                {expediente.mensajes.slice(0, 15).map((mensaje, index) => {
                  const remitenteLabel =
                    mensaje.remitente === "bot"
                      ? "🤖 Certy (Bot Certificador)"
                      : mensaje.remitente === "arrendador"
                      ? "🔵 Arrendador"
                      : "🟢 Arrendatario";

                  return (
                    <div key={mensaje.id} className="bg-gray-50 p-3 rounded border border-gray-200">
                      <p className="font-bold mb-1">
                        {index + 1}. {remitenteLabel} - {new Date(mensaje.timestamp).toLocaleString("es-ES")}
                      </p>
                      <p className="text-gray-700 mb-2">{mensaje.texto}</p>
                      <div className="text-xs text-green-600 font-semibold">✓ CERTIFICADO</div>
                      <p className="text-xs text-gray-500">Hash: {mensaje.hash}</p>
                      <p className="text-xs text-gray-500">Timestamp: {mensaje.timestamp}</p>
                      {mensaje.requiereConfirmacion && mensaje.confirmadoPor && (
                        <p className="text-xs text-gray-500">
                          Confirmado por: {mensaje.confirmadoPor.join(", ")}
                        </p>
                      )}
                      {mensaje.adjuntos && mensaje.adjuntos.length > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          📎 Adjuntos: {mensaje.adjuntos.length} archivo(s)
                        </p>
                      )}
                    </div>
                  );
                })}
                {expediente.mensajes.length > 15 && (
                  <p className="text-center text-gray-500 text-sm italic">
                    ... y {expediente.mensajes.length - 15} mensajes más en el PDF completo
                  </p>
                )}
              </div>
            </div>

            {/* ==================== INVENTARIO ==================== */}
            {expediente.inventario.length > 0 && (
              <div className="mb-8 page-break">
                <h2 className="text-xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
                  5. INVENTARIO CERTIFICADO DEL INMUEBLE
                </h2>

                <div className="space-y-4 text-sm">
                  {expediente.inventario.map((item, index) => (
                    <div key={item.id} className="border-l-2 border-purple-400 pl-3">
                      <p className="font-bold">{index + 1}. {item.estancia}</p>
                      <p className="text-gray-700 mt-1">{item.descripcion}</p>
                      <p className="text-xs text-gray-500 mt-1">Estado: {item.estado}</p>
                      <p className="text-xs text-gray-500">Fotos certificadas: {item.fotos.length}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== PIE DE PÁGINA ==================== */}
            <div className="text-center text-xs text-gray-400 mt-12 pt-4 border-t border-gray-300">
              <p>Expediente {expediente.id}</p>
              <p>Generado por EAD Trust g-digital - {new Date().toLocaleString("es-ES")}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
