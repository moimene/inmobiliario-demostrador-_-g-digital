import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface StepProps {
    onNext: (data: any) => void;
    data: any;
}

export const Step1Identificacion = ({ onNext, data }: StepProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Identificación de Partes</h2>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold text-primary">Vendedor</h3>
                    <div>
                        <Label>Nombre Completo / Razón Social</Label>
                        <Input defaultValue={data.vendedor?.nombre} placeholder="Ej. Inmobiliaria Global S.L." />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input defaultValue={data.vendedor?.email} placeholder="contacto@inmo.com" />
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-lg">
                    <h3 className="font-semibold text-primary">Comprador</h3>
                    <div>
                        <Label>Nombre Completo</Label>
                        <Input defaultValue={data.comprador?.nombre} placeholder="Ej. Juan Pérez" />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input defaultValue={data.comprador?.email} placeholder="juan.perez@email.com" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={() => onNext({})}>Siguiente: Inmueble</Button>
            </div>
        </div>
    );
};
