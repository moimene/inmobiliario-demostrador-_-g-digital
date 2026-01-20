import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    data: any;
}

export const Step3Condiciones = ({ onNext, onBack, data }: StepProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Condiciones Económicas</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <Label>Precio de Venta (€)</Label>
                    <Input type="number" defaultValue={data.contrato?.precio} placeholder="300000" />
                </div>
                <div>
                    <Label>Importe Señal/Arras (€)</Label>
                    <Input type="number" defaultValue={data.contrato?.arras} placeholder="30000" />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <Label>Tipo de Arras</Label>
                    <Select defaultValue={data.contrato?.tipo || "penitenciales"}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccione tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="penitenciales">Penitenciales (Art. 1454 CC)</SelectItem>
                            <SelectItem value="confirmatorias">Confirmatorias</SelectItem>
                            <SelectItem value="penales">Penales</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Fecha Límite Escrituración</Label>
                    <Input type="date" defaultValue={data.contrato?.fechaLimite} />
                </div>
            </div>

            <div className="flex justify-between">
                <Button variant="outline" onClick={onBack}>Atrás</Button>
                <Button onClick={() => onNext({})}>Siguiente: Configuración</Button>
            </div>
        </div>
    );
};
