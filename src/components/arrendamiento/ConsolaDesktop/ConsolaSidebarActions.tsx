import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  FileText,
  Upload,
  Bell,
  DollarSign,
  Send,
  Download,
  Activity,
  Wrench,
  CheckCircle,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { FaseArrendamiento } from "@/types/arrendamiento";
import { fasesOrdenadas } from "@/data/arrendamientoBotFlow";
import { toast } from "sonner";
import { exportarExpedientePDF } from "@/utils/exportarExpedientePDF";

interface AccionMenuPermanente {
  id: string;
  label: string;
  descripcion: string;
  icon: LucideIcon;
  handler: () => void;
  rol: "arrendador" | "arrendatario" | "operador";
  requiereFaseMinima?: FaseArrendamiento;
  tooltipDisabled?: string;
}

export const ConsolaSidebarActions = () => {
  const { expediente, enviarMensaje } = useArrendamiento();

  // Validar si una acción está disponible según la fase actual
  const isAccionDisponible = (accion: AccionMenuPermanente): boolean => {
    if (!accion.requiereFaseMinima) return true;

    const faseActualIndex = fasesOrdenadas.indexOf(expediente.fase);
    const faseMinimaIndex = fasesOrdenadas.indexOf(accion.requiereFaseMinima);

    return faseActualIndex >= faseMinimaIndex;
  };

  // Verificar si una acción ya fue completada
  const isAccionCompletada = (accionId: string): boolean => {
    switch (accionId) {
      case "ver-contrato":
        return expediente.mensajes.some((m) =>
          m.adjuntos?.some((a) => a.nombre.includes("Contrato"))
        );
      case "registrar-pago":
        return expediente.mensajes.some(
          (m) =>
            m.remitente === "arrendador" &&
            m.texto.toLowerCase().includes("recepción del pago")
        );
      case "reportar-incidencia":
        return expediente.mensajes.some(
          (m) =>
            m.remitente === "arrendatario" &&
            m.texto.toLowerCase().includes("incidencia")
        );
      case "exportar-expediente":
        return true; // Siempre disponible
      default:
        return false;
    }
  };

  // Handler: Ver contrato y documentos
  const handleVerContrato = () => {
    toast.success("Abriendo vista de contrato y documentos...");
  };

  // Handler: Subir documento genérico
  const handleSubirDocumentoGenerico = () => {
    toast.success("Funcionalidad de subida de documento disponible en chat móvil");
  };

  // Handler: Ver notificaciones certificadas
  const handleVerNotificaciones = () => {
    const notificaciones = expediente.mensajes.filter(
      (m) => m.tipo === "sistema" || m.tipo === "bot"
    );
    toast.success(`${notificaciones.length} notificaciones certificadas disponibles`);
  };

  // Handler: Registrar pago recibido (arrendador)
  const handleRegistrarPago = () => {
    toast.success("Registro de pago disponible en chat móvil del arrendador");
  };

  // Handler: Reportar incidencia (arrendatario)
  const handleReportarIncidencia = () => {
    toast.success("Reporte de incidencias disponible en chat móvil del arrendatario");
  };

  // Handler: Exportar expediente certificado
  const handleExportarExpediente = () => {
    exportarExpedientePDF(expediente);
    toast.success("Expediente certificado exportado correctamente");
  };

  // Handler: Ver estado del contrato (pipeline CLM)
  const handleVerEstadoContrato = () => {
    const faseActualIndex = fasesOrdenadas.indexOf(expediente.fase);
    const progreso = Math.round(((faseActualIndex + 1) / fasesOrdenadas.length) * 100);
    toast.success(`Estado: Fase ${faseActualIndex + 1}/15 (${progreso}% completado)`);
  };

  // Definir acciones globales para operador/consola
  const accionesConsola: AccionMenuPermanente[] = [
    {
      id: "ver-contrato",
      label: "Contrato y Docs",
      descripcion: "Ver contrato firmado y documentos anexos",
      icon: FileText,
      handler: handleVerContrato,
      rol: "operador",
      requiereFaseMinima: "firma_contrato",
      tooltipDisabled: "Disponible desde Fase 5",
    },
    {
      id: "subir-documento",
      label: "Subir Documento",
      descripcion: "Cargar documento al expediente",
      icon: Upload,
      handler: handleSubirDocumentoGenerico,
      rol: "operador",
    },
    {
      id: "ver-notificaciones",
      label: "Notificaciones",
      descripcion: "Ver todas las notificaciones certificadas",
      icon: Bell,
      handler: handleVerNotificaciones,
      rol: "operador",
      requiereFaseMinima: "canal_oficial",
      tooltipDisabled: "Disponible desde Fase 8",
    },
    {
      id: "registrar-pago",
      label: "Registrar Pago",
      descripcion: "Confirmar recepción de renta",
      icon: DollarSign,
      handler: handleRegistrarPago,
      rol: "operador",
      requiereFaseMinima: "vida_contrato",
      tooltipDisabled: "Disponible desde Fase 9",
    },
    {
      id: "reportar-incidencia",
      label: "Incidencias",
      descripcion: "Gestionar incidencias del inmueble",
      icon: Wrench,
      handler: handleReportarIncidencia,
      rol: "operador",
      requiereFaseMinima: "vida_contrato",
      tooltipDisabled: "Disponible desde Fase 9",
    },
    {
      id: "exportar-expediente",
      label: "Exportar Expediente",
      descripcion: "Descargar expediente probatorio completo",
      icon: Download,
      handler: handleExportarExpediente,
      rol: "operador",
    },
    {
      id: "ver-estado",
      label: "Estado del Contrato",
      descripcion: "Ver pipeline CLM (15 fases)",
      icon: Activity,
      handler: handleVerEstadoContrato,
      rol: "operador",
    },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200 mb-1">
          ⚡ Acciones Rápidas
        </h3>
        <p className="text-xs text-slate-400">
          Acciones CLM permanentes
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <TooltipProvider>
          {accionesConsola.map((accion) => {
            const disponible = isAccionDisponible(accion);
            const completada = isAccionCompletada(accion.id);

            return (
              <Tooltip key={accion.id}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    onClick={accion.handler}
                    disabled={!disponible}
                    className={cn(
                      "w-full justify-start text-left h-auto py-3 px-3",
                      disponible
                        ? "hover:bg-slate-800 text-slate-200"
                        : "opacity-40 cursor-not-allowed text-slate-500"
                    )}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <accion.icon
                        className={cn(
                          "h-4 w-4 flex-shrink-0 mt-0.5",
                          disponible ? "text-blue-400" : "text-slate-600"
                        )}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-medium">{accion.label}</p>
                          {completada && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight">
                          {accion.descripcion}
                        </p>
                      </div>
                    </div>
                  </Button>
                </TooltipTrigger>
                {!disponible && accion.tooltipDisabled && (
                  <TooltipContent side="right" className="max-w-xs">
                    <p className="text-xs">{accion.tooltipDisabled}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </TooltipProvider>
      </div>

      <div className="p-3 border-t border-slate-800">
        <Badge variant="outline" className="w-full text-[10px] text-slate-400 border-slate-700">
          🔒 eIDAS Certified
        </Badge>
      </div>
    </div>
  );
};
