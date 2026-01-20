import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { CertifiedBadge } from "../Shared/CertifiedBadge";
import { Badge } from "@/components/ui/badge";
import { FileText, Users, ClipboardCheck, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ConsolaExpediente = () => {
  const { expediente } = useArrendamiento();

  return (
    <div className="w-96 border-l border-border/40 bg-slate-900/30 overflow-auto">
      <div className="p-4 border-b border-border/40">
        <h3 className="text-sm font-semibold text-foreground mb-1">Detalle del Expediente</h3>
        <p className="text-xs text-muted-foreground font-mono">{expediente.id}</p>
      </div>

      <Tabs defaultValue="resumen" className="p-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="resumen" className="text-xs">Resumen</TabsTrigger>
          <TabsTrigger value="partes" className="text-xs">Partes</TabsTrigger>
          <TabsTrigger value="inventario" className="text-xs">Inventario</TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Datos del Contrato
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Renta mensual:</span>
                <span className="font-semibold">{expediente.contrato.rentaMensual}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Depósito:</span>
                <span className="font-semibold">{expediente.contrato.deposito}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duración:</span>
                <span>{expediente.contrato.duracion} meses</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inicio:</span>
                <span>{new Date(expediente.contrato.fechaInicio).toLocaleDateString("es-ES")}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Timeline de Eventos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 max-h-64 overflow-y-auto">
              {expediente.eventos.slice().reverse().map((evento) => (
                <div key={evento.id} className="flex items-start gap-2">
                  <div className="min-w-[4px] h-4 w-1 bg-primary rounded-full mt-1" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">{evento.mensaje}</p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {new Date(evento.fecha).toLocaleString("es-ES")}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Historial de Comunicaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {expediente.mensajes.slice().reverse().map((mensaje) => (
                <div key={mensaje.id} className="p-2 bg-muted/30 rounded-md">
                  <p className="text-xs text-foreground mb-1">{mensaje.texto}</p>
                  <CertifiedBadge hash={mensaje.hash || ""} compact />
                </div>
              ))}
            </CardContent>
          </Card>

          <Button className="w-full gap-2" variant="outline">
            <Download className="h-4 w-4" />
            Exportar Expediente
          </Button>
        </TabsContent>

        <TabsContent value="partes" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4" />
                Arrendador
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div>
                <p className="font-semibold">{expediente.partes.arrendador.nombre}</p>
                <p className="text-muted-foreground">{expediente.partes.arrendador.nif}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p>{expediente.partes.arrendador.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Teléfono:</p>
                <p className="font-mono">{expediente.partes.arrendador.telefono}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Arrendatario</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div>
                <p className="font-semibold">{expediente.partes.arrendatario.nombre}</p>
                <p className="text-muted-foreground">{expediente.partes.arrendatario.nif}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email:</p>
                <p>{expediente.partes.arrendatario.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Teléfono:</p>
                <p className="font-mono">{expediente.partes.arrendatario.telefono}</p>
              </div>
              {expediente.partes.arrendatario.profesion && (
                <div>
                  <p className="text-muted-foreground">Profesión:</p>
                  <p>{expediente.partes.arrendatario.profesion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventario" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" />
                Inventario Certificado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {["Salón", "Cocina", "Dormitorio Principal", "Baño"].map((estancia) => {
                const items = expediente.inventario.filter((i) => i.estancia === estancia);
                return (
                  <div key={estancia} className="border-b border-border/30 pb-2 last:border-0">
                    <p className="text-xs font-semibold text-foreground mb-1">{estancia}</p>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{item.descripcion}</span>
                          <Badge variant="outline" className="text-[10px]">
                            {item.estado}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
