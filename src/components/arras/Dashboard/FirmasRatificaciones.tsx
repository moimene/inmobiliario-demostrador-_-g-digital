import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";

export const FirmasRatificaciones = () => {
    return (
        <div className="space-y-6">
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

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Ratificaciones</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground text-center py-4">
                        No hay ratificaciones registradas.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
