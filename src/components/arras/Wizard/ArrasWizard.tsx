import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArras } from "@/contexts/ArrasContext";
import { StepperProgress } from "./StepperProgress";
import { Step1Inmueble } from "./Step1Inmueble";
import { Step2Acuerdo } from "./Step2Acuerdo";
import { Step3Partes } from "./Step3Partes";
import { Step4Resumen } from "./Step4Resumen";
import { Step5Borrador } from "./Step5Borrador";
import { Step6Firma } from "./Step6Firma";
import { AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 6;

export const ArrasWizard = () => {
  const { setVista } = useArras();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleNext = (stepData: any) => {
    setFormData((prev) => ({ ...prev, ...stepData }));
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      console.log("Wizard Completed", { ...formData, ...stepData });
      setVista("dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="shadow-2xl border-2 border-primary/10">
        <CardHeader className="border-b bg-muted/20">
          <CardTitle className="text-xl text-primary mb-4">
            Nuevo Expediente de Arras
          </CardTitle>
          <StepperProgress currentStep={step} totalSteps={TOTAL_STEPS} />
        </CardHeader>
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {step === 1 && <Step1Inmueble key="step1" onNext={handleNext} data={formData} />}
            {step === 2 && <Step2Acuerdo key="step2" onNext={handleNext} onBack={handleBack} data={formData} />}
            {step === 3 && <Step3Partes key="step3" onNext={handleNext} onBack={handleBack} data={formData} />}
            {step === 4 && <Step4Resumen key="step4" onNext={handleNext} onBack={handleBack} data={formData} />}
            {step === 5 && <Step5Borrador key="step5" onNext={handleNext} onBack={handleBack} data={formData} />}
            {step === 6 && <Step6Firma key="step6" onNext={handleNext} onBack={handleBack} data={formData} />}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};
