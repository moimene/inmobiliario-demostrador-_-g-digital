import { Button } from "@/components/ui/button";
import { Monitor, Smartphone, Users } from "lucide-react";
import { useState } from "react";

type VistaArras = "consola" | "movil" | "dual";

export const ViewSelectorArras = () => {
  const [vistaActual, setVistaActual] = useState<VistaArras>("consola");

  const cambiarVista = (vista: VistaArras) => {
    setVistaActual(vista);
  };

  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => cambiarVista("consola")}
        variant={vistaActual === "consola" ? "default" : "outline"}
        size="sm"
      >
        <Monitor className="h-4 w-4 mr-2" />
        Consola
      </Button>
      <Button
        onClick={() => cambiarVista("movil")}
        variant={vistaActual === "movil" ? "default" : "outline"}
        size="sm"
      >
        <Smartphone className="h-4 w-4 mr-2" />
        Móvil
      </Button>
      <Button
        onClick={() => cambiarVista("dual")}
        variant={vistaActual === "dual" ? "default" : "outline"}
        size="sm"
      >
        <Users className="h-4 w-4 mr-2" />
        Dual
      </Button>
    </div>
  );
};
