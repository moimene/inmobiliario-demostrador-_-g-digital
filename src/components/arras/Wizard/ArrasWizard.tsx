import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArras } from "@/contexts/ArrasContext";
import { Step1Identificacion } from "./Step1Identificacion";
import { Step2Inmueble } from "./Step2Inmueble";
import { Step3Condiciones } from "./Step3Condiciones";
import { Step4Configuracion } from "./Step4Configuracion";
import { Step5Resumen } from "./Step5Resumen";

export const ArrasWizard = () => {
    const { setVista } = useArras();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (stepData: any) => {
        setFormData({ ...formData, ...stepData });
        if (step < 5) {
            setStep(step + 1);
        } else {
            console.log("Wizard Completed", formData);
            setVista("dashboard");
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <Card className="shadow-2xl border-2 border-primary/10">
                <CardHeader className="border-b bg-muted/20">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-primary">
                            Nuevo Expediente de Arras
                        </CardTitle>
                        <div className="text-sm font-medium text-muted-foreground">
                            Paso {step} de 5
                        </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2 bg-muted rounded-full mt-4 overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out"
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    {step === 1 && <Step1Identificacion onNext={handleNext} data={formData} />}
                    {step === 2 && <Step2Inmueble onNext={handleNext} onBack={handleBack} data={formData} />}
                    {step === 3 && <Step3Condiciones onNext={handleNext} onBack={handleBack} data={formData} />}
                    {step === 4 && <Step4Configuracion onNext={handleNext} onBack={handleBack} data={formData} />}
                    {step === 5 && <Step5Resumen onNext={handleNext} onBack={handleBack} data={formData} />}
                </CardContent>
            </Card>
        </div>
    );
};
