import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StepProps {
    onNext: (data: any) => void;
    onBack: () => void;
    data: any;
}

export const Step5Resumen = ({ onNext, onBack, data }: StepProps) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Resumen del Expediente</h2>

            <div className="space-y-4">
                <Card className="p-4">
                    <h3 className="font-semibold mb-2">Partes</h3>
                    <p className="text-sm text-muted-foreground">Vendedor: {data.vendedor?.nombre || "No especificado"}</p>
                    <p className="text-sm text-muted-foreground">Comprador: {data.comprador?.nombre || "No especificado"}</p>
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold mb-2">Inmueble</h3>
                    <p className="text-sm text-muted-foreground">{data.inmueble?.direccion || "Dirección pendiente"}</p>
                </Card>

                <Card className="p-4">
                    <h3 className="font-semibold mb-2">Operación</h3>
                    <p className="text-sm text-muted-foreground">Precio: {data.contrato?.precio || 0} €</p>
                    <p className="text-sm text-muted-foreground">Arras: {data.contrato?.arras || 0} €</p>
                </Card>
            </div>

            <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={onBack}>Atrás</Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={() => onNext({})}>
                    Crear Expediente (Blockchain)
                </Button>
            </div>
        </div>
    );
};
