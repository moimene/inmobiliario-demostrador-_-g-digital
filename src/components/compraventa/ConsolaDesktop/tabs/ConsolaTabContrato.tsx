import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Hash } from "lucide-react";
import { faseLabelsCompraventa } from "@/data/compraventaBotFlow";

export const ConsolaTabContrato = () => {
  const { expediente } = useCompraventa();

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-orange-400" />
          <h2 className="text-xl font-bold text-slate-100">Datos del Contrato</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Fase actual:</p>
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                {faseLabelsCompraventa[expediente.fase]}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">Precio de Venta:</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.precioVenta.toLocaleString()}€
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-400 mb-1">Modalidad de Pago:</p>
              <p className="font-semibold text-slate-100 capitalize">
                {expediente.contrato.modalidadPago || "Pendiente"}
              </p>
            </div>

            {expediente.contrato.modalidadPago === "hipoteca" && (
              <>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Banco Financiador:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.bancoFinanciador || "No especificado"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Importe Hipoteca:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.importeHipoteca?.toLocaleString() || "0"}€
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Modalidad de Cierre:</p>
              <Badge
                variant="outline"
                className={
                  expediente.contrato.modalidadCierre === "directa"
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : expediente.contrato.modalidadCierre === "escalonada"
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                }
              >
                {expediente.contrato.modalidadCierre === "directa"
                  ? "🔵 Ruta A - Directa"
                  : expediente.contrato.modalidadCierre === "escalonada"
                  ? "🟣 Ruta B - Escalonada"
                  : "Pendiente de selección"}
              </Badge>
            </div>

            {expediente.contrato.modalidadCierre === "directa" && (
              <>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Fecha Escritura Directa:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.fechaEscrituraDirecta
                      ? new Date(expediente.contrato.fechaEscrituraDirecta).toLocaleDateString()
                      : "Pendiente"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Notaría Seleccionada:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.notariaSeleccionadaDirecta || "Pendiente"}
                  </p>
                </div>
              </>
            )}

            {expediente.contrato.modalidadCierre === "escalonada" && (
              <>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Monto Parcial (Señal):</p>
                  <p className="text-xl font-bold text-purple-300">
                    {expediente.contrato.montoParcialDocumentoPrivado?.toLocaleString() || "0"}€
                  </p>
                  <p className="text-xs text-slate-400">
                    ({expediente.contrato.porcentajeParcial || 0}% del precio total)
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Fecha Límite Elevación:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.fechaLimiteElevacion
                      ? new Date(expediente.contrato.fechaLimiteElevacion).toLocaleDateString()
                      : "Pendiente"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-400 mb-1">Notaría Seleccionada:</p>
                  <p className="font-semibold text-slate-100">
                    {expediente.contrato.notariaSeleccionadaEscalonada || "Pendiente"}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Metadata de Certificación */}
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">Certificación eIDAS</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Fecha de Creación:</p>
              <p className="text-sm text-slate-100">
                {new Date(expediente.fechaCreacion).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Hash className="h-4 w-4 text-slate-400" />
            <div>
              <p className="text-xs text-slate-400">Hash del Expediente:</p>
              <p className="text-sm font-mono text-slate-100">
                a8f3c...{expediente.id.slice(-8)}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
