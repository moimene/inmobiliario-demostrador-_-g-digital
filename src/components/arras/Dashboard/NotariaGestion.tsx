import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, Calendar } from "lucide-react";
import eidasIcon from "@/assets/eidas-icon.png";

export const NotariaGestion = () => {
    return (
        <div className="space-y-6">
            {/* Header con logo eIDAS */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-3">
                    <Gavel className="h-6 w-6 text-primary" />
                    <div>
                        <h3 className="font-semibold">Gestión Notarial</h3>
                        <p className="text-sm text-muted-foreground">Proceso certificado bajo normativa eIDAS</p>
                    </div>
                </div>
                <img src={eidasIcon} alt="eIDAS Certified" className="h-12 w-auto" />
            </div>

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
        </div>
    );
};
