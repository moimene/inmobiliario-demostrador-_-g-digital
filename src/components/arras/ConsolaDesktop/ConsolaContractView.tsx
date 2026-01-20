import { Card } from "@/components/ui/card";
import { useArras } from "@/contexts/ArrasContext";
import { faseLabelsArras } from "@/data/arrasBotFlow";

export const ConsolaContractView = () => {
  const { expediente } = useArras();

  return (
    <div className="flex-1 bg-slate-950 p-6 overflow-y-auto">
      <Card className="bg-slate-900 border-slate-800 p-6">
        <h2 className="text-lg font-bold mb-4 text-slate-100">Expediente de Arras</h2>
        
        <div className="space-y-4 text-slate-300">
          <div>
            <p className="text-sm text-slate-400">Fase actual:</p>
            <p className="font-semibold text-primary">{faseLabelsArras[expediente.fase]}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Inmueble:</p>
            <p className="font-semibold">{expediente.inmueble.direccion}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-400">Precio de venta:</p>
              <p className="font-semibold">{expediente.contrato.precioVenta.toLocaleString()}€</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Arras:</p>
              <p className="font-semibold">{expediente.contrato.cantidadArras.toLocaleString()}€ ({expediente.contrato.porcentajeArras}%)</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400">Tipo de depósito:</p>
            <p className="font-semibold capitalize">{expediente.contrato.tipoDeposito}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Plazo escritura:</p>
            <p className="font-semibold">{expediente.contrato.plazoEscritura} días (hasta {new Date(expediente.contrato.fechaLimiteEscritura).toLocaleDateString()})</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
