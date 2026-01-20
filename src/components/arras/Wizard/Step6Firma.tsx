import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Upload, CheckCircle, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useArras } from "@/contexts/ArrasContext";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export const Step6Firma = ({ onNext, onBack, data }: StepProps) => {
  const { setVista } = useArras();
  const [firmaMode, setFirmaMode] = useState<"plataforma" | "externo">("plataforma");

  const handleFinish = () => {
    onNext(data);
    setVista("dashboard");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <PenTool className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Firma del Contrato</h2>
          <p className="text-muted-foreground text-sm">Perfeccionamiento legal del contrato</p>
        </div>
        <Badge variant="destructive" className="ml-auto">CRÍTICO</Badge>
      </div>

      <Tabs value={firmaMode} onValueChange={(v) => setFirmaMode(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plataforma">Firma en Plataforma</TabsTrigger>
          <TabsTrigger value="externo">Documento Externo</TabsTrigger>
        </TabsList>

        <TabsContent value="plataforma" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estado de Firmas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Parte Vendedora</p>
                    <p className="text-sm text-muted-foreground">Pendiente de firma</p>
                  </div>
                </div>
                <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Parte Compradora</p>
                    <p className="text-sm text-muted-foreground">Pendiente de firma</p>
                  </div>
                </div>
                <Badge variant="outline"><Clock className="h-3 w-3 mr-1" />Pendiente</Badge>
              </div>
              <Button className="w-full">Invitar a Firmar</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="externo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Subir Documento Firmado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-4">
                  Sube el PDF firmado externamente para ratificación
                </p>
                <Button variant="outline">Seleccionar Archivo</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button size="lg" className="bg-green-600 hover:bg-green-700" onClick={handleFinish}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Crear Expediente
        </Button>
      </div>
    </motion.div>
  );
};
