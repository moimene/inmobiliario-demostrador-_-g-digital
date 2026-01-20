import { DemoLayout } from "@/components/DemoLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const ArrasCompraventaDemo = () => {
  return (
    <DemoLayout
      title="Arras y Compraventa Segura"
      description="Formaliza el acuerdo de compraventa con señal digital certificada y dinero protegido"
    >
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Construction className="h-6 w-6 text-primary" />
            Demostrador en Construcción
          </CardTitle>
          <CardDescription>
            Estamos desarrollando este demostrador interactivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Próximamente podrás explorar el proceso completo de firma de contrato de arras, 
            depósito seguro y gestión de la señal con garantías legales.
          </p>
          <Button onClick={() => window.location.href = "/"}>
            Volver a la Landing
          </Button>
        </CardContent>
      </Card>
    </DemoLayout>
  );
};

export default ArrasCompraventaDemo;
