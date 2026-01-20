import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    data: any;
}

export const Step2Inmueble = ({ onNext, onBack, data }: StepProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Datos del Inmueble</h2>

            <div className="space-y-4">
                <div>
                    <Label>Referencia Catastral</Label>
                    <div className="flex gap-2">
                        <Input defaultValue={data.inmueble?.refCatastral} placeholder="000000000AA0000" />
                        <Button variant="outline">Validar Catastro</Button>
                    </div>
                </div>

                <div>
                    <Label>Dirección Completa</Label>
                    <Input defaultValue={data.inmueble?.direccion} placeholder="Calle, Número, Piso, CP, Ciudad" />
                </div>

                <div>
                    <Label>Datos Registrales (IDUFIR/CRU)</Label>
                    <Input defaultValue={data.inmueble?.idufir} placeholder="Código Registral Único" />
                </div>
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Atrás</Button>
                <Button onClick={() => onNext({})}>Siguiente: Condiciones</Button>
            </div>
        </div>
    );
};
