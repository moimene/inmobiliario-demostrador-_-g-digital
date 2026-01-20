import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
  Menu,
  CheckCircle,
  FileCheck,
  FileArchive,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { FaseArrendamiento } from "@/types/arrendamiento";
import { fasesOrdenadas } from "@/data/arrendamientoBotFlow";
import { toast } from "sonner";
import { exportarExpedientePDF } from "@/utils/exportarExpedientePDF";
import { generarActaCierreExpediente } from "@/utils/generarActaCierreExpediente";
import { useState } from "react";
import { PreviewContratoFirmadoModal } from "./PreviewContratoFirmadoModal";
import { PreviewActaCierreModal } from "./PreviewActaCierreModal";

interface AccionMenuPermanente {
  id: string;
  label: string;
  descripcion: string;
  icon: LucideIcon;
  handler: () => void;
  rol: "arrendador" | "arrendatario";
  requiereFaseMinima?: FaseArrendamiento;
  tooltipDisabled?: string;
}

interface ChatActionsMenuProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatActionsMenu = ({ rolForzado }: ChatActionsMenuProps) => {
  const { expediente, enviarMensaje, usuarioActual } = useArrendamiento();
  const rolActivo = rolForzado || usuarioActual;
  const [isOpen, setIsOpen] = useState(false);
  const [actaCierreModalOpen, setActaCierreModalOpen] = useState(false);

  // Validar si una acción está disponible según la fase actual
  const isAccionDisponible = (accion: AccionMenuPermanente): boolean => {
    if (!accion.requiereFaseMinima) return true;

    const faseActualIndex = fasesOrdenadas.indexOf(expediente.fase);
    const faseMinimaIndex = fasesOrdenadas.indexOf(accion.requiereFaseMinima);

    return faseActualIndex >= faseMinimaIndex;
  };

  // Handler: Ver contrato y documentos
  const handleVerContrato = () => {
    const tieneContrato = expediente.mensajes.some(
      (m) => m.adjuntos?.some((a) => a.nombre.includes("Contrato"))
    );

    if (!tieneContrato) {
      toast.info("El contrato aún no ha sido generado. Disponible desde Fase 5.");
      return;
    }

    toast.success("Abriendo vista de contrato y documentos...");
    setIsOpen(false);
  };

  // Handler: Subir documento genérico
  const handleSubirDocumentoGenerico = () => {
    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: `He subido un documento relevante para el expediente`,
      adjuntos: [
        {
          tipo: "pdf",
          nombre: `Documento_${Date.now()}.pdf`,
          url: "/documento.pdf",
          hash: Math.random().toString(36).substring(7),
        },
      ],
    });

    toast.success("Documento subido correctamente");
    setIsOpen(false);
  };

  // Handler: Ver notificaciones certificadas
  const handleVerNotificaciones = () => {
    const notificaciones = expediente.mensajes.filter(
      (m) => m.tipo === "sistema" || m.tipo === "bot"
    );

    if (notificaciones.length === 0) {
      toast.info("No hay notificaciones certificadas disponibles");
      return;
    }

    toast.success(`${notificaciones.length} notificaciones certificadas disponibles`);
    setIsOpen(false);
  };

  // Handler: Registrar pago recibido (solo arrendador)
  const handleRegistrarPago = () => {
    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Confirmo recepción del pago de renta mensual correspondiente",
    });

    toast.success("Pago registrado con certificación eIDAS");
    setIsOpen(false);
  };

  // Handler: Enviar comunicación certificada (arrendador)
  const handleEnviarComunicacion = () => {
    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Comunicación oficial certificada: [Indique el motivo de la comunicación]",
    });

    toast.success("Comunicación certificada enviada");
    setIsOpen(false);
  };

  // Handler: Reportar incidencia (solo arrendatario)
  const handleReportarIncidencia = () => {
    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendatario",
      texto: "Reporto la siguiente incidencia en el inmueble: [Describa el problema]",
    });

    toast.success("Incidencia reportada con certificación eIDAS");
    setIsOpen(false);
  };

  // Handler: Solicitar comunicación certificada (arrendatario)
  const handleSolicitarComunicacion = () => {
    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendatario",
      texto: "Solicito comunicación oficial certificada del arrendador sobre: [Indique el motivo]",
    });

    toast.success("Solicitud de comunicación enviada");
    setIsOpen(false);
  };

  // Handler: Exportar expediente certificado
  const handleExportarExpediente = () => {
    exportarExpedientePDF(expediente);
    toast.success("Expediente certificado exportado correctamente");
    setIsOpen(false);
  };

  // Handler: Descargar Acta de Cierre (solo en fase cierre)
  const handleDescargarActaCierre = () => {
    setIsOpen(false); // Cerrar el menú
    setActaCierreModalOpen(true); // Abrir modal de previsualización
  };

  // Handler: Vista previa contrato firmado (ahora usa modal)
  // La lógica de descarga está dentro del PreviewContratoFirmadoModal

  // Handler: Ver estado del contrato (pipeline CLM)
  const handleVerEstadoContrato = () => {
    const faseActualIndex = fasesOrdenadas.indexOf(expediente.fase);
    const progreso = Math.round(((faseActualIndex + 1) / fasesOrdenadas.length) * 100);

    toast.success(`Estado del contrato: Fase ${faseActualIndex + 1}/15 (${progreso}% completado)`);
    setIsOpen(false);
  };

  // Definir acciones para ARRENDADOR (azul)
  const accionesArrendador: AccionMenuPermanente[] = [
    {
      id: "ver-contrato",
      label: "Ver contrato y documentos",
      descripcion: "Contrato, anexos, inventario, Nota Registral",
      icon: FileText,
      handler: handleVerContrato,
      rol: "arrendador",
      requiereFaseMinima: "firma_contrato",
      tooltipDisabled: "Disponible desde Fase 5 (Firma del Contrato)",
    },
    {
      id: "ver-contrato-firmado",
      label: "Ver contrato firmado",
      descripcion: "Vista previa y descarga del PDF con firmas certificadas",
      icon: FileCheck,
      handler: () => {}, // El handler está en el modal
      rol: "arrendador",
      requiereFaseMinima: "firma_contrato",
      tooltipDisabled: "Disponible desde Fase 5 (Firma del Contrato)",
    },
    {
      id: "subir-documento",
      label: "Subir documento",
      descripcion: "Fotos, informes, justificantes, actas",
      icon: Upload,
      handler: handleSubirDocumentoGenerico,
      rol: "arrendador",
    },
    {
      id: "ver-notificaciones",
      label: "Ver notificaciones certificadas",
      descripcion: "IRAV (límite 2%), impagos, comunicaciones oficiales",
      icon: Bell,
      handler: handleVerNotificaciones,
      rol: "arrendador",
      requiereFaseMinima: "canal_oficial",
      tooltipDisabled: "Disponible desde Fase 8 (Canal Oficial)",
    },
    {
      id: "registrar-pago",
      label: "Registrar un pago recibido",
      descripcion: "Marca una renta como cobrada",
      icon: DollarSign,
      handler: handleRegistrarPago,
      rol: "arrendador",
      requiereFaseMinima: "vida_contrato",
      tooltipDisabled: "Disponible desde Fase 9 (Vida del Contrato)",
    },
    {
      id: "enviar-comunicacion",
      label: "Enviar comunicación certificada",
      descripcion: "Notificación fehaciente equivalente a email certificado",
      icon: Send,
      handler: handleEnviarComunicacion,
      rol: "arrendador",
      requiereFaseMinima: "canal_oficial",
      tooltipDisabled: "Disponible desde Fase 8 (Canal Oficial)",
    },
    {
      id: "exportar-expediente",
      label: "Exportar expediente certificado",
      descripcion: "ZIP final con toda la evidencia",
      icon: Download,
      handler: handleExportarExpediente,
      rol: "arrendador",
    },
    {
      id: "descargar-acta-cierre",
      label: "Descargar Acta de Cierre",
      descripcion: "Documento oficial certificado de cierre del expediente",
      icon: FileArchive,
      handler: handleDescargarActaCierre,
      rol: "arrendador",
      requiereFaseMinima: "cierre",
      tooltipDisabled: "Disponible solo en Fase 15 (Cierre del Contrato)",
    },
    {
      id: "ver-estado",
      label: "Ver estado del contrato",
      descripcion: "Acceso al pipeline CLM (15 fases)",
      icon: Activity,
      handler: handleVerEstadoContrato,
      rol: "arrendador",
    },
  ];

  // Definir acciones para ARRENDATARIO (verde)
  const accionesArrendatario: AccionMenuPermanente[] = [
    {
      id: "ver-contrato",
      label: "Ver contrato y documentos",
      descripcion: "Contrato, Nota Registral, inventario, fotos",
      icon: FileText,
      handler: handleVerContrato,
      rol: "arrendatario",
      requiereFaseMinima: "firma_contrato",
      tooltipDisabled: "Disponible desde Fase 5 (Firma del Contrato)",
    },
    {
      id: "ver-contrato-firmado",
      label: "Ver contrato firmado",
      descripcion: "Vista previa y descarga del PDF con firmas certificadas",
      icon: FileCheck,
      handler: () => {}, // El handler está en el modal
      rol: "arrendatario",
      requiereFaseMinima: "firma_contrato",
      tooltipDisabled: "Disponible desde Fase 5 (Firma del Contrato)",
    },
    {
      id: "subir-justificante",
      label: "Subir justificante o documento",
      descripcion: "Rentas, incidencias, fotos, comprobantes",
      icon: Upload,
      handler: handleSubirDocumentoGenerico,
      rol: "arrendatario",
    },
    {
      id: "ver-notificaciones",
      label: "Ver notificaciones certificadas",
      descripcion: "IRAV (límite 2%), requerimientos, avisos de prórroga",
      icon: Bell,
      handler: handleVerNotificaciones,
      rol: "arrendatario",
      requiereFaseMinima: "canal_oficial",
      tooltipDisabled: "Disponible desde Fase 8 (Canal Oficial)",
    },
    {
      id: "reportar-incidencia",
      label: "Reportar incidencia",
      descripcion: "Notifica daño, avería o discrepancia",
      icon: Wrench,
      handler: handleReportarIncidencia,
      rol: "arrendatario",
      requiereFaseMinima: "vida_contrato",
      tooltipDisabled: "Disponible desde Fase 9 (Vida del Contrato)",
    },
    {
      id: "solicitar-comunicacion",
      label: "Solicitar comunicación certificada",
      descripcion: "Pide notificación oficial del arrendador",
      icon: Send,
      handler: handleSolicitarComunicacion,
      rol: "arrendatario",
      requiereFaseMinima: "canal_oficial",
      tooltipDisabled: "Disponible desde Fase 8 (Canal Oficial)",
    },
    {
      id: "exportar-expediente",
      label: "Exportar expediente certificado",
      descripcion: "Acceso inmediato al expediente completo eIDAS",
      icon: Download,
      handler: handleExportarExpediente,
      rol: "arrendatario",
    },
    {
      id: "descargar-acta-cierre",
      label: "Descargar Acta de Cierre",
      descripcion: "Documento oficial certificado de cierre del expediente",
      icon: FileArchive,
      handler: handleDescargarActaCierre,
      rol: "arrendatario",
      requiereFaseMinima: "cierre",
      tooltipDisabled: "Disponible solo en Fase 15 (Cierre del Contrato)",
    },
    {
      id: "ver-estado",
      label: "Ver estado del contrato",
      descripcion: "Dónde estamos en el proceso jurídico",
      icon: Activity,
      handler: handleVerEstadoContrato,
      rol: "arrendatario",
    },
  ];

  // Seleccionar acciones según rol activo
  const accionesActuales =
    rolActivo === "arrendador" ? accionesArrendador : accionesArrendatario;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className={cn(
            "w-full gap-2 shadow-lg",
            rolActivo === "arrendador"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-emerald-600 hover:bg-emerald-700 text-white"
          )}
        >
          <Menu className="h-4 w-4" />
          <span className="font-semibold">⚡ Menú de Acciones</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className={cn(
          "h-[85vh] overflow-y-auto",
          rolActivo === "arrendador" ? "border-t-4 border-blue-500" : "border-t-4 border-emerald-500"
        )}
      >
        <SheetHeader
          className={cn(
            "border-b pb-4",
            rolActivo === "arrendador"
              ? "bg-blue-50 border-blue-200"
              : "bg-emerald-50 border-emerald-200"
          )}
        >
          <SheetTitle
            className={cn(
              "text-lg font-bold",
              rolActivo === "arrendador" ? "text-blue-900" : "text-emerald-900"
            )}
          >
            {rolActivo === "arrendador" ? "🔵 Menú Arrendador" : "🟢 Menú Arrendatario"}
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Acciones permanentes disponibles durante todo el ciclo de vida del contrato
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-3">
          <TooltipProvider>
            {accionesActuales.map((accion) => {
              const disponible = isAccionDisponible(accion);

              return accion.id === "ver-contrato-firmado" ? (
                <PreviewContratoFirmadoModal
                  key={accion.id}
                  rolActivo={rolActivo}
                  trigger={
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={!disponible}
                          onClick={() => disponible && setIsOpen(false)}
                          className={cn(
                            "w-full justify-start text-left h-auto py-4 px-4 transition-all",
                            disponible
                              ? rolActivo === "arrendador"
                                ? "hover:bg-blue-50 hover:border-blue-300"
                                : "hover:bg-emerald-50 hover:border-emerald-300"
                              : "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <div className="flex items-start gap-3 w-full">
                            <accion.icon
                              className={cn(
                                "h-5 w-5 flex-shrink-0 mt-0.5",
                                disponible
                                  ? rolActivo === "arrendador"
                                    ? "text-blue-600"
                                    : "text-emerald-600"
                                  : "text-muted-foreground"
                              )}
                            />
                            <div className="flex-1 space-y-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-sm">{accion.label}</p>
                                {disponible && (
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {accion.descripcion}
                              </p>
                            </div>
                          </div>
                        </Button>
                      </TooltipTrigger>
                      {!disponible && accion.tooltipDisabled && (
                        <TooltipContent side="top" className="max-w-xs">
                          <p className="text-xs">{accion.tooltipDisabled}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  }
                />
              ) : (
                <Tooltip key={accion.id}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={accion.handler}
                      disabled={!disponible}
                      className={cn(
                        "w-full justify-start text-left h-auto py-4 px-4 transition-all",
                        disponible
                          ? rolActivo === "arrendador"
                            ? "hover:bg-blue-50 hover:border-blue-300"
                            : "hover:bg-emerald-50 hover:border-emerald-300"
                          : "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-start gap-3 w-full">
                        <accion.icon
                          className={cn(
                            "h-5 w-5 flex-shrink-0 mt-0.5",
                            disponible
                              ? rolActivo === "arrendador"
                                ? "text-blue-600"
                                : "text-emerald-600"
                              : "text-muted-foreground"
                          )}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{accion.label}</p>
                            {disponible && (
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {accion.descripcion}
                          </p>
                        </div>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  {!disponible && accion.tooltipDisabled && (
                    <TooltipContent side="top" className="max-w-xs">
                      <p className="text-xs">{accion.tooltipDisabled}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg border">
          <p className="text-xs text-muted-foreground">
            ℹ️ <strong>Certificación eIDAS:</strong> Todas las acciones ejecutadas desde este
            menú quedan certificadas con sello de tiempo cualificado por EAD Trust, garantizando
            plena validez jurídica y principio de inversión de carga de prueba.
          </p>
        </div>
      </SheetContent>

      {/* Modal de previsualización del Acta de Cierre */}
      <PreviewActaCierreModal
        open={actaCierreModalOpen}
        onOpenChange={setActaCierreModalOpen}
      />
    </Sheet>
  );
};
