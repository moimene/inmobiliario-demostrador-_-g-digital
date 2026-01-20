import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { faseLabelsCompraventa } from "@/data/compraventaBotFlow";

export const ConsolaContractsList = () => {
  const { contratos, contratoSeleccionado, seleccionarContrato } = useCompraventa();

  return (
    <div className="w-80 bg-slate-900/50 border-r border-slate-800 overflow-y-auto">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-slate-100 mb-1">
          Expedientes Compraventa
        </h2>
        <p className="text-xs text-slate-400">{contratos.length} activos</p>
      </div>

      <div className="p-2 space-y-2">
        {contratos.map((contrato) => (
          <Card
            key={contrato.id}
            className={cn(
              "p-3 cursor-pointer transition-all border-slate-700",
              contratoSeleccionado === contrato.id
                ? "bg-orange-500/10 border-orange-500/50"
                : "bg-slate-800/50 hover:bg-slate-800"
            )}
            onClick={() => seleccionarContrato(contrato.id)}
          >
            <div className="flex items-start gap-2 mb-2">
              <Building2 className="h-4 w-4 text-orange-400 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-100 truncate">
                  {contrato.inmueble.direccion}
                </p>
                <p className="text-xs text-slate-400">ID: {contrato.id}</p>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Vendedor:</span>
                <span className="text-slate-300">{contrato.partes.vendedor.nombre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Comprador:</span>
                <span className="text-slate-300">{contrato.partes.comprador.nombre}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <Badge variant="outline" className="text-[10px] bg-orange-500/20 text-orange-300 border-orange-500/30">
                  {faseLabelsCompraventa[contrato.fase]}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
