import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
import { HistorialNotificaciones } from "./HistorialNotificaciones";
import { AccionesRapidasPanel } from "./AccionesRapidasPanel";

export const FirmasRatificaciones = () => {
  return (
    <div className="space-y-6">
      {/* Firmas Pendientes */}
      <Card>
        <CardHeader>
          <CardTitle>Firmas Pendientes</CardTitle>
          <CardDescription>Documentos que requieren tu atención</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg bg-background">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <PenTool className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Contrato de Arras Penitenciales</p>
                <p className="text-xs text-muted-foreground">Pendiente de firma Comprador</p>
              </div>
            </div>
            <Button size="sm">Firmar</Button>
          </div>
        </CardContent>
      </Card>

      {/* Grid con Acciones Rápidas e Historial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccionesRapidasPanel />
        <HistorialNotificaciones />
      </div>
    </div>
  );
};