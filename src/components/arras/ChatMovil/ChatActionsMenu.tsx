import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FileText, Upload, Download, AlertCircle, MessageSquare } from "lucide-react";
import { useArras } from "@/contexts/ArrasContext";
import { toast } from "sonner";

interface ChatActionsMenuProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatActionsMenu = ({ rolForzado }: ChatActionsMenuProps) => {
  const { usuarioActual } = useArras();
  const rolActivo = rolForzado || (usuarioActual as "vendedor" | "comprador");

  const getColorClasses = () => {
    if (rolActivo === "vendedor") {
      return {
        trigger: "bg-blue-500 hover:bg-blue-600 text-white",
        header: "bg-blue-500 text-white",
        button: "hover:bg-blue-50",
      };
    }
    return {
      trigger: "bg-green-500 hover:bg-green-600 text-white",
      header: "bg-green-500 text-white",
      button: "hover:bg-green-50",
    };
  };

  const colors = getColorClasses();

  const acciones = [
    {
      id: "ver-contrato",
      label: "Ver contrato de arras",
      icon: FileText,
      handler: () => toast.info("Abriendo contrato de arras..."),
    },
    {
      id: "subir-documento",
      label: "Subir documento",
      icon: Upload,
      handler: () => toast.info("Función de carga de documentos"),
    },
    {
      id: "ver-notificaciones",
      label: "Ver notificaciones",
      icon: AlertCircle,
      handler: () => toast.info("Panel de notificaciones"),
    },
    {
      id: "enviar-comunicacion",
      label: "Enviar comunicación certificada",
      icon: MessageSquare,
      handler: () => toast.info("Enviando comunicación certificada..."),
    },
    {
      id: "exportar",
      label: "Exportar expediente",
      icon: Download,
      handler: () => toast.success("Exportando expediente de arras..."),
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={colors.trigger} size="sm" variant="default">
          Menú de Acciones
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className={`${colors.header} -mx-6 -mt-6 px-6 py-4 mb-6`}>
          <SheetTitle className="text-white">
            Menú de Acciones - {rolActivo === "vendedor" ? "Vendedor" : "Comprador"}
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-2">
          {acciones.map((accion) => (
            <Button
              key={accion.id}
              onClick={accion.handler}
              variant="ghost"
              className={`w-full justify-start ${colors.button}`}
            >
              <accion.icon className="h-4 w-4 mr-2" />
              {accion.label}
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
