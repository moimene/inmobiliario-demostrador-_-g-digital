import { useCompraventa } from "@/contexts/CompraventaContext";
import { PipelineCard } from "@/components/arrendamiento/ConsolaDesktop/PipelineCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, GitBranch } from "lucide-react";
import { faseLabelsCompraventa, fasesOrdenadasCompraventa } from "@/data/compraventaBotFlow";
import { FaseCompraventa } from "@/types/compraventa";
import { cn } from "@/lib/utils";

export const ConsolaPipelineCompraventa = () => {
  const { expediente, cambiarFase } = useCompraventa();

  // Dividir fases en base, bifurcación y comunes
  const fasesBase = fasesOrdenadasCompraventa.slice(0, 6); // hasta configuracion_modalidad_cierre
  const fasesDirecta = [
    "firma_contrato_compraventa_directa",
    "escrituracion_notarial_directa",
  ] as FaseCompraventa[];
  const fasesEscalonada = [
    "firma_documento_privado",
    "pago_parcial_documento_privado",
    "elevacion_a_escritura_publica",
  ] as FaseCompraventa[];
  const fasesComunes = ["entrega_llaves", "cierre_expediente_compraventa"] as FaseCompraventa[];

  const calcularDias = () => {
    const inicio = new Date(expediente.fechaCreacion);
    const ahora = new Date();
    return Math.floor((ahora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  };

  const esFaseDirecta = fasesDirecta.includes(expediente.fase);
  const esFaseEscalonada = fasesEscalonada.includes(expediente.fase);
  const modalidadSeleccionada = expediente.contrato.modalidadCierre;

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-100 mb-1">Pipeline de Compraventa Directa con Bifurcación</h2>
        <p className="text-sm text-slate-400">
          Proceso guiado por Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza
        </p>
      </div>

      {/* Fases Base (1-6) */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">📋 Fases Base (1-6)</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {fasesBase.map((fase, index) => (
            <div key={fase} className="flex items-center gap-4 flex-shrink-0">
              <PipelineCard
                fase={fase as any}
                titulo={faseLabelsCompraventa[fase]}
                cantidad={1}
                activo={expediente.fase === fase}
                completado={fasesOrdenadasCompraventa.indexOf(expediente.fase) > fasesOrdenadasCompraventa.indexOf(fase)}
                dias={calcularDias()}
              />
              {index < fasesBase.length - 1 && (
                <ChevronRight className="h-6 w-6 text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Punto de Bifurcación */}
      <div className="mb-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch className="h-5 w-5 text-orange-400" />
          <h3 className="text-sm font-semibold text-orange-300">
            Punto de Bifurcación: Modalidad de Cierre
          </h3>
        </div>
        <p className="text-xs text-slate-300">
          {modalidadSeleccionada
            ? `Modalidad seleccionada: ${modalidadSeleccionada === "directa" ? "Ruta A - Directa" : "Ruta B - Escalonada"}`
            : "Las partes deben acordar la modalidad de cierre (Directa o Escalonada)"}
        </p>
      </div>

      {/* Rutas Bifurcadas */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Ruta A - Directa */}
        <div className={cn(
          "p-4 rounded-lg border",
          esFaseDirecta || modalidadSeleccionada === "directa"
            ? "bg-blue-500/10 border-blue-500/30"
            : "bg-slate-800/30 border-slate-700 opacity-50"
        )}>
          <h3 className="text-sm font-semibold text-blue-300 mb-4">🔵 Ruta A: Modalidad Directa (Fases 7a-8a)</h3>
          <div className="space-y-4">
            {fasesDirecta.map((fase) => (
              <PipelineCard
                key={fase}
                fase={fase as any}
                titulo={faseLabelsCompraventa[fase]}
                cantidad={1}
                activo={expediente.fase === fase}
                completado={fasesOrdenadasCompraventa.indexOf(expediente.fase) > fasesOrdenadasCompraventa.indexOf(fase)}
                dias={calcularDias()}
              />
            ))}
          </div>
        </div>

        {/* Ruta B - Escalonada */}
        <div className={cn(
          "p-4 rounded-lg border",
          esFaseEscalonada || modalidadSeleccionada === "escalonada"
            ? "bg-purple-500/10 border-purple-500/30"
            : "bg-slate-800/30 border-slate-700 opacity-50"
        )}>
          <h3 className="text-sm font-semibold text-purple-300 mb-4">🟣 Ruta B: Modalidad Escalonada (Fases 7b-9b)</h3>
          <div className="space-y-4">
            {fasesEscalonada.map((fase) => (
              <PipelineCard
                key={fase}
                fase={fase as any}
                titulo={faseLabelsCompraventa[fase]}
                cantidad={1}
                activo={expediente.fase === fase}
                completado={fasesOrdenadasCompraventa.indexOf(expediente.fase) > fasesOrdenadasCompraventa.indexOf(fase)}
                dias={calcularDias()}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Fases Comunes (10-11) */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold text-slate-300 mb-4">🎯 Fases Comunes (10-11)</h3>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {fasesComunes.map((fase, index) => (
            <div key={fase} className="flex items-center gap-4 flex-shrink-0">
              <PipelineCard
                fase={fase as any}
                titulo={faseLabelsCompraventa[fase]}
                cantidad={1}
                activo={expediente.fase === fase}
                completado={fasesOrdenadasCompraventa.indexOf(expediente.fase) > fasesOrdenadasCompraventa.indexOf(fase)}
                dias={calcularDias()}
              />
              {index < fasesComunes.length - 1 && (
                <ChevronRight className="h-6 w-6 text-slate-600 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Control Manual */}
      <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
        <h3 className="text-sm font-semibold text-slate-200 mb-3">⚡ Control Manual (Solo Demo)</h3>
        <p className="text-xs text-slate-400 mb-3">
          Avanza manualmente entre fases para probar el flujo del bot con bifurcación
        </p>
        <div className="flex flex-wrap gap-2">
          {fasesOrdenadasCompraventa.map((fase) => (
            <Button
              key={fase}
              variant={expediente.fase === fase ? "default" : "secondary"}
              size="sm"
              onClick={() => cambiarFase(fase)}
              className={cn(
                "text-xs",
                expediente.fase === fase
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600"
              )}
            >
              {faseLabelsCompraventa[fase]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
