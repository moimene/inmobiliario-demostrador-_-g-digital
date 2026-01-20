import { DemoLayout } from "@/components/DemoLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

const CertificacionDocumentosDemo = () => {
  return (
    <DemoLayout
      title="Certificación de Documentación"
      description="Verifica identidad, solvencia y documentos del inmueble de forma digital y segura"
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
            Próximamente podrás explorar cómo verificar identidades, certificados de solvencia 
            y documentación del inmueble con validez legal.
          </p>
          <Button onClick={() => window.location.href = "/"}>
            Volver a la Landing
          </Button>
        </CardContent>
      </Card>
    </DemoLayout>
  );
};

export default CertificacionDocumentosDemo;
