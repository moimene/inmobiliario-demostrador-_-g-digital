import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu, FileText, Upload, Bell, MessageSquare, Download, Info } from "lucide-react";
import { toast } from "sonner";

interface ChatActionsMenuProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatActionsMenu = ({ rolForzado }: ChatActionsMenuProps) => {
  const [open, setOpen] = useState(false);

  const getRolColor = () => {
    if (rolForzado === "vendedor") return "bg-blue-600 hover:bg-blue-700";
    if (rolForzado === "comprador") return "bg-emerald-600 hover:bg-emerald-700";
    return "bg-slate-600 hover:bg-slate-700";
  };

  const getSheetColor = () => {
    if (rolForzado === "vendedor") return "border-t-4 border-blue-600";
    if (rolForzado === "comprador") return "border-t-4 border-emerald-600";
    return "border-t-4 border-slate-600";
  };

  const accionesVendedor = [
    {
      icon: FileText,
      label: "Ver Contrato",
      description: "Revisar contrato de compraventa",
      onClick: () => {
        toast.info("Vista de contrato");
        setOpen(false);
      },
    },
    {
      icon: Upload,
      label: "Subir Documentos",
      description: "Documentación del inmueble",
      onClick: () => {
        toast.info("Función de subida de documentos");
        setOpen(false);
      },
    },
    {
      icon: Bell,
      label: "Ver Notificaciones",
      description: "Alertas y avisos del proceso",
      onClick: () => {
        toast.info("Notificaciones");
        setOpen(false);
      },
    },
    {
      icon: MessageSquare,
      label: "Comunicación Certificada",
      description: "Enviar mensaje certificado",
      onClick: () => {
        toast.info("Comunicación certificada");
        setOpen(false);
      },
    },
    {
      icon: Download,
      label: "Exportar Expediente",
      description: "Descargar expediente completo",
      onClick: () => {
        toast.success("Expediente exportado");
        setOpen(false);
      },
    },
    {
      icon: Info,
      label: "Estado del Proceso",
      description: "Ver estado actual y próximos pasos",
      onClick: () => {
        toast.info("Estado del proceso");
        setOpen(false);
      },
    },
  ];

  const accionesComprador = [
    {
      icon: FileText,
      label: "Ver Contrato",
      description: "Revisar contrato de compraventa",
      onClick: () => {
        toast.info("Vista de contrato");
        setOpen(false);
      },
    },
    {
      icon: Upload,
      label: "Subir Documentos",
      description: "Certificados y justificantes",
      onClick: () => {
        toast.info("Función de subida de documentos");
        setOpen(false);
      },
    },
    {
      icon: Bell,
      label: "Ver Notificaciones",
      description: "Alertas y avisos del proceso",
      onClick: () => {
        toast.info("Notificaciones");
        setOpen(false);
      },
    },
    {
      icon: MessageSquare,
      label: "Solicitar Información",
      description: "Comunicación certificada",
      onClick: () => {
        toast.info("Solicitud de información");
        setOpen(false);
      },
    },
    {
      icon: Download,
      label: "Exportar Expediente",
      description: "Descargar expediente completo",
      onClick: () => {
        toast.success("Expediente exportado");
        setOpen(false);
      },
    },
    {
      icon: Info,
      label: "Estado del Proceso",
      description: "Ver estado actual y próximos pasos",
      onClick: () => {
        toast.info("Estado del proceso");
        setOpen(false);
      },
    },
  ];

  const acciones = rolForzado === "vendedor" ? accionesVendedor : accionesComprador;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <Menu className="h-4 w-4 mr-2" />
          Menú de Acciones
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className={`h-[70vh] ${getSheetColor()}`}>
        <SheetHeader>
          <SheetTitle>
            Acciones Disponibles - {rolForzado === "vendedor" ? "Vendedor" : "Comprador"}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {acciones.map((accion, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start h-auto py-4 px-4"
              onClick={accion.onClick}
            >
              <div className="flex items-start gap-4">
                <accion.icon className={`h-5 w-5 mt-0.5 ${rolForzado === "vendedor" ? "text-blue-600" : "text-emerald-600"}`} />
                <div className="text-left">
                  <div className="font-semibold">{accion.label}</div>
                  <div className="text-xs text-muted-foreground">{accion.description}</div>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
