import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import { FaseArrendamiento } from "@/types/arrendamiento";
import { cn } from "@/lib/utils";

interface PipelineCardProps {
  fase: FaseArrendamiento;
  titulo: string;
  cantidad: number;
  activo: boolean;
  completado: boolean;
  dias: number;
}

export const PipelineCard = ({
  fase,
  titulo,
  cantidad,
  activo,
  completado,
  dias,
}: PipelineCardProps) => {
  const faseColors: Record<FaseArrendamiento, string> = {
    apertura_expediente: "bg-slate-500/20 text-slate-300",
    identificacion_partes: "bg-slate-500/20 text-slate-300",
    identificacion_inmueble: "bg-blue-500/20 text-blue-300",
    extracto_informado: "bg-purple-500/20 text-purple-300",
    firma_contrato: "bg-indigo-500/20 text-indigo-300",
    pagos_iniciales: "bg-amber-500/20 text-amber-300",
    estado_inicial: "bg-orange-500/20 text-orange-300",
    canal_oficial: "bg-green-500/20 text-green-300",
    vida_contrato: "bg-teal-500/20 text-teal-300",
    impago_evento: "bg-red-500/20 text-red-300",
    prorroga_legal: "bg-yellow-500/20 text-yellow-300",
    decision_arrendatario: "bg-yellow-500/20 text-yellow-300",
    recuperacion_necesidad: "bg-orange-500/20 text-orange-300",
    devolucion_fianza: "bg-blue-500/20 text-blue-300",
    cierre: "bg-red-500/20 text-red-300",
  };

  return (
    <Card
      className={cn(
        "p-4 w-48 flex-shrink-0 transition-all border-slate-700",
        activo ? "bg-slate-100 text-slate-900" : "bg-slate-900/40 text-slate-100",
        activo && "border-primary/50 shadow-lg shadow-primary/20",
        completado && !activo && "opacity-60",
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className={cn("text-[10px]", faseColors[fase])}>
          {completado ? "✓" : cantidad}
        </Badge>
        <span className={cn("text-xs", activo ? "text-slate-500" : "text-slate-400")}>{dias}d</span>
      </div>

      <h3
        className={cn(
          "text-sm font-semibold mb-1",
          activo ? "text-slate-900" : "text-slate-100",
        )}
      >
        {titulo}
      </h3>
      <p className={cn("text-[10px]", activo ? "text-slate-500" : "text-slate-400")}>
        {activo ? "En proceso" : completado ? "Completado" : "Pendiente"}
      </p>
    </Card>
  );
};
