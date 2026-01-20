import { motion } from "framer-motion";
import { Upload, Search, Hash, Award, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "pending" | "active" | "completed";
}

interface ProcessTimelineProps {
  currentStep: number;
}

const steps: TimelineStep[] = [
  {
    id: 1,
    title: "Subida",
    description: "Cargar documento",
    icon: Upload,
    status: "pending",
  },
  {
    id: 2,
    title: "Validación",
    description: "Verificar integridad",
    icon: Search,
    status: "pending",
  },
  {
    id: 3,
    title: "Hash",
    description: "Generar huella SHA-256",
    icon: Hash,
    status: "pending",
  },
  {
    id: 4,
    title: "Sello QTSP",
    description: "Certificación eIDAS",
    icon: Award,
    status: "pending",
  },
];

export const ProcessTimeline = ({ currentStep }: ProcessTimelineProps) => {
  return (
    <div className="w-full py-8">
      <div className="relative flex justify-between items-start">
        {/* Connection line */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gdigital-green/20">
          <motion.div
            className="h-full bg-gradient-to-r from-gdigital-green to-gdigital-lime"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;
          const StepIcon = step.icon;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative flex flex-col items-center z-10"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                  isCompleted
                    ? "bg-gdigital-green border-gdigital-green"
                    : isActive
                    ? "bg-gdigital-navy border-gdigital-green shadow-[0_0_20px_hsl(145_95%_52%/0.4)] animate-pulse"
                    : "bg-gdigital-navy/60 border-gdigital-green/30"
                )}
              >
                {isCompleted ? (
                  <Check className="h-5 w-5 text-gdigital-navy" />
                ) : (
                  <StepIcon
                    className={cn(
                      "h-5 w-5",
                      isActive ? "text-gdigital-green" : "text-gdigital-green/50"
                    )}
                  />
                )}
              </div>

              <div className="mt-3 text-center">
                <p
                  className={cn(
                    "text-sm font-heading font-semibold",
                    isCompleted || isActive ? "text-white" : "text-white/50"
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "text-xs mt-1",
                    isCompleted || isActive ? "text-white/60" : "text-white/30"
                  )}
                >
                  {step.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
