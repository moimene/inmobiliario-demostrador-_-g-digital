import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { ViewSelector } from "@/components/arrendamiento/ViewSelector";
import { ConsolaDesktop } from "@/components/arrendamiento/ConsolaDesktop/ConsolaDesktop";
import { ChatMovil } from "@/components/arrendamiento/ChatMovil/ChatMovil";
import { DualMobileView } from "@/components/arrendamiento/DualMobileView";
import { DemoLayout } from "@/components/DemoLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Monitor } from "lucide-react";
export const CanalArrendamientoDemoPage = () => {
  const {
    vistaActual,
    usuarioActual,
    cambiarUsuario
  } = useArrendamiento();
  return <DemoLayout title="(Q:CLM) Gestor Contractual Certificado para Arrendamientos" description="Plataforma (CLM cualificado) para la gestión del ciclo de vida del contrato de alquiler, dando soporte a todas las fases de la relación contractual (preparación, formalización, desarrollo/ejecución y terminación), certificando todos los eventos, como firmas, notificaciones o acciones que las partes hayan acordado. En cualquier momento, cualquiera de las partes podrá solicitar la emisión de un certificado emitido por el Tercero de Confianza sobre todo o cualquier contenido del canal, con los efectos legales otorgados a los documentos intervenidos por un servicio cualificado de confianza digital (eIDAS, Ley 6/2020, art. 326.4 LEC)">
      {/* Header con selector de vista y usuario */}
      <div className="mb-6 space-y-4">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">Canal de Arrendamiento Certificado</CardTitle>
                  <CardDescription>
                    Demostrador interactivo: Vista Consola (administrador), Vista Móvil (usuario), o Vista Dual (ambos usuarios)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                Certificado eIDAS
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="space-y-4">
          {/* Selector de Vista - MÁS PROMINENTE */}
          <div className="flex flex-col items-center gap-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Seleccionar Vista
            </h3>
            <ViewSelector />
          </div>

          {/* Selector de Rol - Solo visible en vistas relevantes */}
          {(vistaActual === "movil" || vistaActual === "consola") && <div className="flex items-center justify-center gap-3 p-3 bg-muted/30 rounded-lg">
              <span className="text-sm font-semibold text-muted-foreground">
                {vistaActual === "consola" ? "Rol:" : "Ver como:"}
              </span>
              <div className="flex gap-2">
                {vistaActual === "consola" ? <Badge variant="outline" className="bg-primary/10 text-primary px-4 py-2">
                    <Monitor className="h-4 w-4 mr-2" />
                    Operador
                  </Badge> : <>
                    <Button variant={usuarioActual === "arrendador" ? "default" : "outline"} size="sm" onClick={() => cambiarUsuario("arrendador" as any)}>
                      Arrendador
                    </Button>
                    <Button variant={usuarioActual === "arrendatario" ? "default" : "outline"} size="sm" onClick={() => cambiarUsuario("arrendatario" as any)}>
                      Arrendatario
                    </Button>
                  </>}
              </div>
            </div>}
        </div>
      </div>

      {/* Vista dual o individual según selector */}
      <div className="border border-border rounded-lg overflow-hidden shadow-lg bg-background">
        {vistaActual === "dual" && <DualMobileView />}

        {vistaActual === "consola" && <div className="h-[700px]">
            <ConsolaDesktop />
          </div>}

        {vistaActual === "movil" && <div className="h-[700px] max-w-md mx-auto border-x border-border">
            <ChatMovil rolForzado={usuarioActual as "arrendador" | "arrendatario"} />
          </div>}
      </div>

      {/* Información adicional */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                🖥️ Vista Consola
              </h4>
              <p className="text-muted-foreground text-xs">
                Panel de control del operador: gestión del pipeline, fases del bot, y supervisión del expediente completo.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                📱 Vista Móvil
              </h4>
              <p className="text-muted-foreground text-xs">
                Experiencia de usuario final: chat certificado desde la perspectiva del arrendador@ o arrendatari@.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                📱📱 Vista Dual
              </h4>
              <p className="text-muted-foreground text-xs">
                Vista de demostración: observe cómo evoluciona el proceso jurídico simultáneamente para ambas partes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DemoLayout>;
};