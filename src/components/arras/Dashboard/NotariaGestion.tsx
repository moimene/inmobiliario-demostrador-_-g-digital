import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calendar } from "lucide-react";

export const NotariaGestion = () => {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Gavel className="w-5 h-5 text-primary" />
                        Notaría Asignada
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-6">
                        <p className="font-semibold text-lg">Pendiente de Asignación</p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Elige una notaría de la red de confianza o invita a una nueva.
                        </p>
                        <Button variant="outline">Seleccionar Notaría</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        Cita de Firma
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-6">
                        <p className="text-muted-foreground text-sm mb-4">
                            La fecha de firma debe ser acordada una vez validada la documentación.
                        </p>
                        <Button disabled>Solicitar Cita</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
