import { DemoLayout } from "@/components/DemoLayout";
import { useCompraventa } from "@/contexts/CompraventaContext";
import { ViewSelectorCompraventa } from "@/components/compraventa/ViewSelectorCompraventa";
import { ChatMovil } from "@/components/compraventa/ChatMovil/ChatMovil";
import { DualMobileView } from "@/components/compraventa/DualMobileView";
import { ConsolaDesktop } from "@/components/compraventa/ConsolaDesktop/ConsolaDesktop";
import { Button } from "@/components/ui/button";
import diagramaCompraventa from "@/assets/diagrama-canal-compraventa.png";

export const CanalCompraventaDemoPage = () => {
  const { vistaActual, usuarioActual, cambiarUsuario } = useCompraventa();

  return (
    <DemoLayout
      title="Canal de Compraventa Directa Certificado"
      description="Soporte al Comprador y Vendedor en la gestión de su relación jurídica durante todo el proceso de compraventa directa, desde identificación hasta entrega de llaves, con dos modalidades de cierre: escritura pública única o documento privado con elevación posterior."
      infographic={diagramaCompraventa}
    >
      <div className="space-y-6">
        <ViewSelectorCompraventa />

        {vistaActual === "movil" && (
          <div className="space-y-4">
            <div className="flex gap-2 justify-center">
              <Button
                variant={usuarioActual === "vendedor" ? "default" : "outline"}
                onClick={() => cambiarUsuario("vendedor")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                🏠 Vendedor
              </Button>
              <Button
                variant={usuarioActual === "comprador" ? "default" : "outline"}
                onClick={() => cambiarUsuario("comprador")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                🔑 Comprador
              </Button>
            </div>
            <div className="max-w-md mx-auto border-4 border-slate-300 rounded-3xl overflow-hidden shadow-2xl h-[600px]">
              <ChatMovil />
            </div>
          </div>
        )}

        {vistaActual === "dual" && <DualMobileView />}

        {vistaActual === "consola" && (
          <div className="h-[800px] bg-slate-950 rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
            <ConsolaDesktop />
          </div>
        )}
      </div>
    </DemoLayout>
  );
};
