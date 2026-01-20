import { ArrowLeft, MoreVertical, FileText, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { faseLabels, fasesOrdenadas } from "@/data/arrendamientoBotFlow";
import { PreviewContratoFirmadoModal } from "./PreviewContratoFirmadoModal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ChatHeaderProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatHeader = ({ rolForzado }: ChatHeaderProps) => {
  const { expediente, usuarioActual } = useArrendamiento();
  const rolActivo = rolForzado || usuarioActual;

  const otroUsuario =
    rolActivo === "arrendador"
      ? expediente.partes.arrendatario.nombre
      : expediente.partes.arrendador.nombre;

  // Calcular el número de fase actual
  const faseActualIndex = fasesOrdenadas.indexOf(expediente.fase);
  const numeroFase = faseActualIndex + 1;
  const totalFases = fasesOrdenadas.length;
  const labelFase = faseLabels[expediente.fase];
  
  // Verificar si el contrato firmado está disponible
  const contratoFirmadoDisponible = faseActualIndex >= fasesOrdenadas.indexOf("firma_contrato");

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-3 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h3 className="font-semibold text-sm text-foreground">{otroUsuario}</h3>
            <p className="text-xs text-muted-foreground">{expediente.vivienda.direccion}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Botón de acceso rápido al contrato firmado */}
          {contratoFirmadoDisponible && (
            <TooltipProvider>
              <PreviewContratoFirmadoModal
                rolActivo={rolActivo}
                trigger={
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "h-8 w-8 transition-colors",
                          rolActivo === "arrendador"
                            ? "hover:bg-blue-100 hover:text-blue-700"
                            : "hover:bg-emerald-100 hover:text-emerald-700"
                        )}
                      >
                        <FileCheck className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs">Ver contrato firmado</p>
                    </TooltipContent>
                  </Tooltip>
                }
              />
            </TooltipProvider>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Indicador de fase jurídica actual */}
      <div className="flex items-center gap-2 mt-2">
        <Badge 
          variant="outline" 
          className="text-xs bg-primary/20 border-primary/30 text-primary font-medium flex items-center gap-1.5"
        >
          <FileText className="h-3 w-3" />
          Fase {numeroFase}/{totalFases}: {labelFase}
        </Badge>
      </div>
      
      {/* Indicador de rol simulado - solo visible en vista dual */}
      {rolForzado && (
        <div className="mt-2 pt-2 border-t border-primary/20">
          <Badge 
            variant="outline" 
          className={cn(
            "text-xs font-medium",
            rolForzado === "arrendador"
                ? "bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300"
                : "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300"
            )}
          >
            {rolForzado === "arrendador" ? "🧑‍💼 Arrendador" : "👤 Arrendatario"} (Simulado)
          </Badge>
        </div>
      )}
    </div>
  );
};
