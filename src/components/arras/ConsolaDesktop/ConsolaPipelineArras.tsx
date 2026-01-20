import { useArras } from "@/contexts/ArrasContext";
import { PipelineCard } from "@/components/arrendamiento/ConsolaDesktop/PipelineCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { faseLabelsArras, fasesOrdenadasArras } from "@/data/arrasBotFlow";
import { FaseArras } from "@/types/arras";
import { cn } from "@/lib/utils";

export const ConsolaPipelineArras = () => {
  const { expediente, cambiarFase } = useArras();

  const fases = fasesOrdenadasArras.map((id) => ({
    id,
    label: faseLabelsArras[id],
  }));

  const calcularDias = () => {
    const inicio = new Date(expediente.fechaCreacion);
    const ahora = new Date();
    return Math.floor((ahora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-1">
          Pipeline de Arras de Compraventa
        </h2>
        <p className="text-sm text-slate-400">
          Proceso guiado por Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {fases.map((fase, index) => (
          <div key={fase.id} className="flex items-center gap-4 flex-shrink-0">
            <PipelineCard
              fase={fase.id as any}
              titulo={fase.label}
              cantidad={1}
              activo={expediente.fase === fase.id}
              completado={fasesOrdenadasArras.indexOf(expediente.fase) > index}
              dias={calcularDias()}
            />
            {index < fases.length - 1 && (
              <ChevronRight className="h-6 w-6 text-slate-600 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">⚡ Control Manual (Solo Demo)</h3>
        <p className="text-xs text-slate-400 mb-3">
          Avanza manualmente entre fases para probar el flujo del bot
        </p>
        <div className="flex flex-wrap gap-2">
          {fases.map((fase) => (
            <Button
              key={fase.id}
              variant={expediente.fase === fase.id ? "default" : "secondary"}
              size="sm"
              onClick={() => cambiarFase(fase.id as FaseArras)}
              className={cn(
                "text-xs",
                expediente.fase === fase.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              )}
            >
              {fase.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
