import { DemoLayout } from "@/components/DemoLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useArras } from "@/contexts/ArrasContext";
import { ViewSelectorArras } from "@/components/arras/ViewSelectorArras";
import { DualMobileViewArras } from "@/components/arras/DualMobileViewArras";
import { ConsolaDesktop } from "@/components/arras/ConsolaDesktop/ConsolaDesktop";
import { ChatMovil } from "@/components/arras/ChatMovil/ChatMovil";
import diagramaArras from "@/assets/diagrama-canal-arras.png";

export const CanalArrasDemoPage = () => {
  const { vistaActual, usuarioActual, cambiarUsuario } = useArras();

  return (
    <DemoLayout
      title="Canal de Arras Certificado"
      description="Demostrador del ciclo completo de contrato de arras penitenciales con certificación eIDAS"
    >
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <img 
              src={diagramaArras} 
              alt="Diagrama explicativo del Canal de Arras Certificado: arquitectura de 12 fases, modelo legal K-TECH Garrigues-ICADE, y motor de confianza eIDAS"
              className="w-full h-auto"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">(Q:CLM) Gestor de Arras Certificado</h2>
            <p className="text-muted-foreground mb-4">
              Plataforma CLM cualificada para compraventas: gestión completa desde firma de arras hasta escritura con eIDAS
            </p>
            <ViewSelectorArras />
          </CardContent>
        </Card>

        {vistaActual === "movil" && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => cambiarUsuario("vendedor")}
                  variant={usuarioActual === "vendedor" ? "default" : "outline"}
                  size="sm"
                >
                  Ver como: Vendedor
                </Button>
                <Button
                  onClick={() => cambiarUsuario("comprador")}
                  variant={usuarioActual === "comprador" ? "default" : "outline"}
                  size="sm"
                >
                  Ver como: Comprador
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div style={{ height: "700px" }}>
          {vistaActual === "dual" && <DualMobileViewArras />}
          {vistaActual === "consola" && <ConsolaDesktop />}
          {vistaActual === "movil" && <ChatMovil />}
        </div>
      </div>
    </DemoLayout>
  );
};
