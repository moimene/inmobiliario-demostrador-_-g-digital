import { Building2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";

export const ConsolaHeader = () => {
  const { expediente } = useArrendamiento();

  const faseLabels = {
    registro: "Registro",
    datos: "Datos",
    inventario: "Inventario",
    contrato: "Contrato",
    firma: "Firma",
    move_in: "Move-in",
    activo: "Activo",
    finalizacion: "Finalización",
  };

  return (
    <div className="border-b border-border/40 bg-slate-900/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                {expediente.vivienda.direccion}
              </h2>
              <p className="text-xs text-muted-foreground">
                Expediente {expediente.id}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="gap-1">
            <User className="h-3 w-3" />
            {expediente.partes.arrendatario.nombre}
          </Badge>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {faseLabels[expediente.fase]}
          </Badge>
        </div>
      </div>
    </div>
  );
};
