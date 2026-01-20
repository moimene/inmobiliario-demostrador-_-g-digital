import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Download, Eye, Loader2, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export const Step5Borrador = ({ onNext, onBack, data }: StepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsGenerated(true);
    setIsGenerating(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Borrador del Contrato</h2>
          <p className="text-muted-foreground text-sm">Genera y revisa el contrato</p>
        </div>
        <Badge variant="destructive" className="ml-auto">CRÍTICO</Badge>
      </div>

      <Card className="min-h-[300px] flex items-center justify-center">
        <CardContent className="text-center py-12">
          {!isGenerated ? (
            <div className="space-y-4">
              <FileCheck className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                El borrador se generará usando la plantilla ICADE
              </p>
              <Button size="lg" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Generando...</>
                ) : (
                  "Generar Borrador"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <p className="font-medium text-green-600">Borrador generado correctamente</p>
              <div className="flex gap-2 justify-center">
                <Button variant="outline"><Eye className="h-4 w-4 mr-2" />Previsualizar</Button>
                <Button variant="outline"><Download className="h-4 w-4 mr-2" />Descargar PDF</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button size="lg" onClick={() => onNext(data)} disabled={!isGenerated}>
          Siguiente: Firma
        </Button>
      </div>
    </motion.div>
  );
};
