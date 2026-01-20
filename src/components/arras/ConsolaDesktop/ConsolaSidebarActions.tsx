import { Button } from "@/components/ui/button";
import { FileText, Upload, Calendar, FileSignature, Download, TrendingUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export const ConsolaSidebarActions = () => {
  const acciones = [
    {
      id: "ver-contrato",
      label: "Ver contrato",
      icon: FileText,
      handler: () => toast.info("Abriendo contrato de arras..."),
    },
    {
      id: "subir-documento",
      label: "Subir documento",
      icon: Upload,
      handler: () => toast.info("Subir nota registral, acta notarial, etc."),
    },
    {
      id: "registrar-prorroga",
      label: "Registrar prórroga",
      icon: Calendar,
      handler: () => toast.info("Registrar prórroga del plazo..."),
    },
    {
      id: "registrar-comparecencia",
      label: "Registrar comparecencia",
      icon: FileSignature,
      handler: () => toast.info("Registrar resultado notarial..."),
    },
    {
      id: "exportar-expediente",
      label: "Exportar expediente",
      icon: Download,
      handler: () => toast.success("Exportando expediente completo..."),
    },
    {
      id: "estado-contrato",
      label: "Estado del contrato",
      icon: TrendingUp,
      handler: () => toast.info("Visualizando pipeline de fases..."),
    },
  ];

  return (
    <div className="w-20 bg-slate-900 border-r border-slate-800 py-4 flex flex-col items-center gap-3">
      <TooltipProvider>
        {acciones.map((accion) => (
          <Tooltip key={accion.id}>
            <TooltipTrigger asChild>
              <Button
                onClick={accion.handler}
                variant="ghost"
                size="icon"
                className="hover:bg-slate-800 text-slate-300 hover:text-white"
              >
                <accion.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{accion.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>

      <div className="mt-auto">
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[8px]">
          eIDAS
        </Badge>
      </div>
    </div>
  );
};
