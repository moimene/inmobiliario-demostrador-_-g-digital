import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, FileCheck, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface PreviewContratoFirmadoModalProps {
  trigger: React.ReactNode;
  rolActivo: "arrendador" | "arrendatario" | "operador";
}

export const PreviewContratoFirmadoModal = ({
  trigger,
  rolActivo,
}: PreviewContratoFirmadoModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Normalizar rol para estilos (operador usa estilos de arrendador)
  const rolParaEstilos = rolActivo === "operador" ? "arrendador" : rolActivo;

  const handleDescargar = () => {
    try {
      const link = document.createElement("a");
      link.href = "/documents/contrato-arrendamiento-firmado.pdf";
      link.download = "Contrato_Arrendamiento_Firmado_Certificado_eIDAS.pdf";
      
      // Intentar descarga estándar
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Contrato firmado descargado correctamente", {
        description: "El documento incluye firmas certificadas eIDAS",
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error al descargar contrato:", error);
      
      // Fallback: abrir en nueva ventana si la descarga falla
      try {
        window.open("/documents/contrato-arrendamiento-firmado.pdf", "_blank");
        toast.info("Abriendo contrato en nueva ventana", {
          description: "Puedes descargarlo desde el navegador",
        });
      } catch (fallbackError) {
        toast.error("Error al acceder al documento", {
          description: "Por favor, intenta de nuevo o contacta soporte",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent
        className={cn(
          "max-w-[95vw] w-[1200px] h-[90vh] flex flex-col p-0 gap-0",
          rolParaEstilos === "arrendador"
            ? "border-t-4 border-blue-500"
            : "border-t-4 border-emerald-500"
        )}
      >
        <DialogHeader
          className={cn(
            "px-6 py-4 border-b",
            rolParaEstilos === "arrendador"
              ? "bg-blue-50 border-blue-200"
              : "bg-emerald-50 border-emerald-200"
          )}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <FileCheck
                  className={cn(
                    "h-6 w-6",
                    rolParaEstilos === "arrendador" ? "text-blue-600" : "text-emerald-600"
                  )}
                />
                <DialogTitle className="text-xl font-bold">
                  Vista Previa - Contrato de Arrendamiento Firmado
                </DialogTitle>
              </div>
              <DialogDescription className="text-sm">
                Documento certificado con firmas electrónicas cualificadas eIDAS
              </DialogDescription>
              <div className="flex items-center gap-2 pt-1">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-300"
                >
                  ✓ Firmas Certificadas eIDAS
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-300"
                >
                  🔒 Validez Jurídica Plena
                </Badge>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-700 border-amber-300"
                >
                  📋 EAD Trust Cualificado
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden bg-muted/20 p-4">
          <div className="w-full h-full rounded-lg overflow-hidden border-2 border-border shadow-lg bg-white">
            <iframe
              src="/documents/contrato-arrendamiento-firmado.pdf"
              className="w-full h-full"
              title="Contrato de Arrendamiento Firmado"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t bg-background flex items-center justify-between gap-4">
          <div className="flex-1 text-sm text-muted-foreground">
            <p className="font-medium">
              📄 Contrato_Arrendamiento_Firmado_Certificado_eIDAS.pdf
            </p>
            <p className="text-xs mt-1">
              Este documento contiene firmas electrónicas cualificadas con plena validez legal
              conforme al Reglamento eIDAS (UE) 910/2014
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cerrar
            </Button>
            <Button
              onClick={handleDescargar}
              className={cn(
                "gap-2 shadow-md",
                rolParaEstilos === "arrendador"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white"
              )}
            >
              <Download className="h-4 w-4" />
              Descargar Contrato Firmado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
