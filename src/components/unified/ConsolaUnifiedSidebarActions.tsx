import { Button } from "@/components/ui/button";
import { PlusCircle, BarChart3, Bell, Download } from "lucide-react";
import { useUnifiedCLM } from "@/contexts/UnifiedCLMContext";
import { toast } from "sonner";

export const ConsolaUnifiedSidebarActions = () => {
  const { contratoSeleccionado } = useUnifiedCLM();

  const handleNuevoContrato = () => {
    toast.info("Funcionalidad en desarrollo", {
      description: "Próximamente: crear nuevo expediente desde la consola",
    });
  };

  const handleEstadisticas = () => {
    toast.info("Estadísticas del sistema", {
      description: "Vista de análisis de contratos activos y cerrados",
    });
  };

  const handleNotificaciones = () => {
    toast.info("Centro de notificaciones", {
      description: "Alertas de vencimientos y eventos importantes",
    });
  };

  const handleExportarLote = () => {
    toast.info("Exportación masiva", {
      description: "Exportar múltiples expedientes seleccionados",
    });
  };

  return (
    <div className="w-16 border-r border-slate-800 bg-slate-950 flex flex-col items-center py-4 gap-3">
      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        title="Nuevo contrato"
        onClick={handleNuevoContrato}
      >
        <PlusCircle className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        title="Estadísticas"
        onClick={handleEstadisticas}
      >
        <BarChart3 className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        title="Notificaciones"
        onClick={handleNotificaciones}
      >
        <Bell className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        title="Exportar lote"
        onClick={handleExportarLote}
        disabled={!contratoSeleccionado}
      >
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};
