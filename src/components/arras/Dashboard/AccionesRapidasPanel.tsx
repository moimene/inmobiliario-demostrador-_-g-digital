import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import eidasIcon from "@/assets/eidas-icon.png";

export const AccionesRapidasPanel = () => {
  const handleConvocarNotaria = () => {
    toast.success("Solicitud de cita notarial enviada", {
      description: "Se ha notificado a todas las partes para coordinar la fecha de escrituración."
    });
  };

  const handleEnviarRecordatorio = () => {
    toast.info("Recordatorio enviado", {
      description: "Se ha enviado un recordatorio a las partes pendientes de firma."
    });
  };

  const handleSolicitarDocumento = () => {
    toast.info("Solicitud de documento iniciada", {
      description: "Se ha abierto el formulario de solicitud de documentación."
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold flex items-center gap-2">
            Acciones Rápidas
          </CardTitle>
          <img src={eidasIcon} alt="eIDAS" className="h-10 w-auto" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button
          variant="default"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={handleConvocarNotaria}
        >
          <Building2 className="h-4 w-4" />
          Convocar Cita Notaría
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={handleEnviarRecordatorio}
        >
          <Send className="h-4 w-4" />
          Enviar Recordatorio
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2"
          onClick={handleSolicitarDocumento}
        >
          <FileText className="h-4 w-4" />
          Solicitar Documento
        </Button>
      </CardContent>
    </Card>
  );
};
