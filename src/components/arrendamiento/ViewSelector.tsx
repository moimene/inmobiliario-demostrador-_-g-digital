import { Monitor, Smartphone, Users } from "lucide-react";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ViewSelector = () => {
  const { vistaActual, cambiarVista } = useArrendamiento();

  return (
    <Tabs value={vistaActual} onValueChange={(value) => cambiarVista(value as "consola" | "movil" | "dual")}>
      <TabsList className="grid w-full grid-cols-3 h-14 bg-muted">
        <TabsTrigger value="consola" className="text-base font-bold gap-2">
          <Monitor className="h-5 w-5" />
          <span className="hidden sm:inline">Consola</span>
        </TabsTrigger>
        <TabsTrigger value="movil" className="text-base font-bold gap-2">
          <Smartphone className="h-5 w-5" />
          <span className="hidden sm:inline">Móvil</span>
        </TabsTrigger>
        <TabsTrigger value="dual" className="text-base font-bold gap-2">
          <Users className="h-5 w-5" />
          <span className="hidden sm:inline">Dual</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
