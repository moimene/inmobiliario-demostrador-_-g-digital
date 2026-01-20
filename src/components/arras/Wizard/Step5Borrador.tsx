import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FileCheck, Download, Eye, Loader2, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { ContratoObservatorioPreview } from "./ContratoObservatorioPreview";
import { generarContratoObservatorioPDF } from "@/utils/generarContratoObservatorioPDF";
import { toast } from "sonner";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

// Datos simulados realistas para la transacción
const datosContratoSimulados = {
  vendedor: {
    nombre: "María González Pérez",
    nif: "45123789B",
    estadoCivil: "Casada en régimen de gananciales",
    domicilio: "Paseo de la Castellana 95, 5ºA, 28046 Madrid",
    email: "maria.gonzalez@ejemplo.com",
  },
  comprador: {
    nombre: "Roberto Martínez Sánchez",
    nif: "38654712M",
    estadoCivil: "Soltero",
    domicilio: "C/ Bravo Murillo 38, 2ºC, 28015 Madrid",
    email: "roberto.martinez@ejemplo.com",
  },
  inmueble: {
    direccion: "C/ Serrano 128, 3ºB, 28006 Madrid",
    tituloAdquisicion:
      "Notario D. Antonio López García, fecha 15 de marzo de 2015, protocolo nº 1.847",
    datosRegistrales:
      "Registro de la Propiedad nº 7 de Madrid, CRU: 28077000725887",
    notaSimple: "Fecha 10/01/2026, CSV: RQPW-8472-XYZK-3891",
    referenciaCatastral: "9872023 VK4792C 0001 WX",
  },
  condiciones: {
    precioCompra: 285000,
    importeArras: 28500,
    formaPagoArras: "momento_firma" as const,
    ibanVendedor: "ES89 2100 0418 45 0200051332",
    bancoVendedor: "CaixaBank, S.A.",
    fechaLimiteEscritura: "2026-04-16",
    notarioDesignado:
      "D. José María Ruiz Gallardón, C/ Velázquez 34, 28001 Madrid",
    distribucionGastos: "ley" as const,
    resolucionConflictos: "tribunales" as const,
    tipoFirma: "electronica" as const,
  },
};

export const Step5Borrador = ({ onNext, onBack, data }: StepProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsGenerated(true);
    setIsGenerating(false);
    toast.success("Borrador generado según el estándar Observatorio ICADE-Garrigues");
  };

  const handleDownloadPDF = () => {
    try {
      generarContratoObservatorioPDF(datosContratoSimulados);
      toast.success("PDF descargado correctamente");
    } catch (error) {
      toast.error("Error al generar el PDF");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileCheck className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Borrador del Contrato</h2>
          <p className="text-muted-foreground text-sm">
            Modelo Estándar Observatorio Legaltech Garrigues-ICADE v2.0
          </p>
        </div>
        <Badge variant="secondary" className="ml-auto gap-1">
          <CheckCircle className="h-3 w-3" />
          Modo Estándar
        </Badge>
      </div>

      {/* Info del estándar */}
      <Card className="bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900">
              <FileCheck className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 dark:text-amber-200">
                Contrato basado en el Estándar del Observatorio
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Este contrato cumple con los requisitos del Modo Estándar Observatorio 
                (modelo Garrigues-ICADE v2.0) para compraventa de vivienda con arras 
                penitenciales bajo derecho civil común.
              </p>
              <a
                href="https://www.comillas.edu/investigacion/observatorio-legaltech/foro-ktech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-amber-600 hover:text-amber-700 mt-2"
              >
                <ExternalLink className="h-3 w-3" />
                Ver estándar completo
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen de datos */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Precio de compra</p>
          <p className="text-xl font-bold">
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(datosContratoSimulados.condiciones.precioCompra)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Importe arras (10%)</p>
          <p className="text-xl font-bold text-amber-600">
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(datosContratoSimulados.condiciones.importeArras)}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Fecha límite escritura</p>
          <p className="text-xl font-bold">
            {new Date(datosContratoSimulados.condiciones.fechaLimiteEscritura).toLocaleDateString(
              "es-ES",
              { day: "2-digit", month: "short", year: "numeric" }
            )}
          </p>
        </Card>
      </div>

      {/* Generador */}
      <Card className="min-h-[200px] flex items-center justify-center">
        <CardContent className="text-center py-8">
          {!isGenerated ? (
            <div className="space-y-4">
              <FileCheck className="h-16 w-16 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">
                El borrador se generará usando la plantilla oficial del Observatorio Legaltech
              </p>
              <Button size="lg" onClick={handleGenerate} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generando borrador...
                  </>
                ) : (
                  "Generar Borrador Estándar"
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <p className="font-medium text-green-600">
                Borrador generado según el Estándar Observatorio ICADE-Garrigues
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Previsualizar Contrato
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-amber-600" />
                        Contrato de Arras Penitenciales
                        <Badge variant="secondary" className="ml-2">
                          Observatorio v2.0
                        </Badge>
                      </DialogTitle>
                    </DialogHeader>
                    <ContratoObservatorioPreview {...datosContratoSimulados} />
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button size="lg" onClick={() => onNext(data)} disabled={!isGenerated}>
          Siguiente: Firma
        </Button>
      </div>
    </motion.div>
  );
};
