import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

interface StepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    data: any;
}

export const Step4Configuracion = ({ onNext, onBack, data }: StepProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Configuración de Seguridad</h2>

            <Card className="p-6 border-2 border-accent/20 bg-accent/5">
                <div className="flex items-center gap-4 mb-4">
                    <ShieldCheck className="h-8 w-8 text-accent" />
                    <div>
                        <h3 className="text-lg font-bold text-primary">Modo Estándar Observatorio</h3>
                        <p className="text-sm text-muted-foreground">Configuración recomendada para máxima seguridad jurídica</p>
                    </div>
                    <Switch defaultChecked={true} className="ml-auto" />
                </div>

                <div className="space-y-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                        <Label>Certificación eIDAS de Eventos</Label>
                        <Switch defaultChecked={true} disabled />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Custodia Notarial de Arras (Recomendado)</Label>
                        <Switch defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Generación Automática de Contrato</Label>
                        <Switch defaultChecked={true} />
                    </div>
                </div>
            </Card>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Atrás</Button>
                <Button onClick={() => onNext({})}>Siguiente: Resumen</Button>
            </div>
        </div>
    );
};
