import { DemoLayout } from "@/components/DemoLayout";
import { useArras } from "@/contexts/ArrasContext";
import { ExpedienteArrasDashboard } from "@/components/arras/Dashboard/ExpedienteArrasDashboard";
import { ArrasWizard } from "@/components/arras/Wizard/ArrasWizard";
import { ArrasAssistantChat } from "@/components/arras/AssistantChat/ArrasAssistantChat";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export const CanalArrasDemoPage = () => {
  const { vista, setVista } = useArras();

  return (
    <DemoLayout
      title="Canal de Arras Certificado - Chrono-Flare"
      description="Demostrador del ciclo completo de contrato de arras penitenciales con certificación eIDAS y Observatorio Legaltech"
    >
      <div className="space-y-6">

        {/* Helper Controls for Demo */}
        <div className="flex justify-end gap-2 p-2 bg-muted/20 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVista("dashboard")}
            className={vista === "dashboard" ? "bg-primary/10" : ""}
          >
            Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setVista("wizard")}
            className={vista === "wizard" ? "bg-primary/10" : ""}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Expediente
          </Button>
        </div>

        {/* Content Area */}
        {vista === "wizard" && <ArrasWizard />}
        {vista === "dashboard" && <ExpedienteArrasDashboard />}
        {vista === "documentos" && (
          <div className="p-12 text-center border-2 border-dashed rounded-xl">
            Vista de Documentos Full-Screen (Stub)
            <Button variant="link" onClick={() => setVista("dashboard")}>Volver</Button>
          </div>
        )}

      </div>

      {/* Asistente AI flotante */}
      <ArrasAssistantChat />
    </DemoLayout>
  );
};