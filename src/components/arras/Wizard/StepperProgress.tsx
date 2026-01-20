import { motion } from "framer-motion";
import { Check, Home, FileText, Users, ClipboardList, FileCheck, PenTool, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StepperProgressProps {
  currentStep: number;
  totalSteps: number;
}

const STEPS = [
  { id: 1, label: "Inmueble", icon: Home },
  { id: 2, label: "Acuerdo", icon: FileText },
  { id: 3, label: "Partes", icon: Users },
  { id: 4, label: "Resumen", icon: ClipboardList },
  { id: 5, label: "Borrador", icon: FileCheck },
  { id: 6, label: "Firma", icon: PenTool },
];

export const StepperProgress = ({ currentStep, totalSteps }: StepperProgressProps) => {
  return (
    <div className="w-full px-2 space-y-3">
      {/* Enlace al Observatorio */}
      <div className="flex justify-center">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-xs text-muted-foreground hover:text-primary"
          onClick={() => window.open('https://www.comillas.edu/investigacion/observatorio-legaltech/foro-ktech/', '_blank')}
        >
          <ExternalLink className="h-3 w-3" />
          Estándar Observatorio Legaltech ICADE-Garrigues
        </Button>
      </div>

      <div className="relative flex justify-between items-center">
        {/* Connection line background */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        
        {/* Progress line */}
        <motion.div
          className="absolute top-5 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1.1 : 1 }}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                  isCompleted
                    ? "bg-primary border-primary text-primary-foreground"
                    : isActive
                    ? "bg-background border-primary text-primary shadow-lg shadow-primary/20"
                    : "bg-muted border-muted-foreground/20 text-muted-foreground"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <Icon className="h-4 w-4" />
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium text-center",
                  isActive ? "text-primary" : isCompleted ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
