import { ReactNode } from "react";
import { ArrowLeft, Shield, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ElectricButton } from "@/components/deck/ElectricButton";
import eadTrustLogo from "@/assets/ead-trust-logo.png";

interface DemoLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  infographic?: string;
  variant?: "light" | "dark";
  showHeader?: boolean;
}

export const DemoLayout = ({
  children,
  title,
  description,
  infographic,
  variant = "light",
  showHeader = true,
}: DemoLayoutProps) => {
  const navigate = useNavigate();
  const isDark = variant === "dark";

  return (
    <div className={isDark ? "min-h-screen bg-gdigital-navy" : "min-h-screen bg-muted/30"}>
      {/* Header g-digital */}
      <header
        className={
          isDark
            ? "bg-gdigital-navy/95 border-b border-gdigital-green/20 sticky top-0 z-50 backdrop-blur-md"
            : "bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95"
        }
      >
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <ElectricButton
              variant="secondary"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </ElectricButton>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <img src={eadTrustLogo} alt="EAD Trust g-digital" className="h-8" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div
        className={
          isDark
            ? "bg-gradient-to-r from-gdigital-green/10 to-gdigital-lime/5 border-b border-gdigital-green/20 py-3"
            : "bg-primary/10 border-b border-primary/20 py-3"
        }
      >
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Shield className={isDark ? "h-4 w-4 text-gdigital-green" : "h-4 w-4 text-primary"} />
            <span className={isDark ? "text-white font-medium" : "text-foreground font-medium"}>
              Demo Interactiva - Todos los procesos quedan certificados con sellos de tiempo
              cualificado eIDAS
            </span>
            {isDark && <Sparkles className="h-4 w-4 text-gdigital-lime" />}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container px-4 py-8 mx-auto max-w-5xl relative">
        {/* Ambient light for dark mode */}
        {isDark && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-20 left-1/4 w-96 h-96 bg-gdigital-green/5 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gdigital-lime/5 rounded-full blur-3xl" />
          </div>
        )}

        {showHeader && title && (
          <div className="mb-8 text-center relative z-10">
            <h1
              className={
                isDark
                  ? "text-3xl md:text-4xl font-heading font-bold mb-3 bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent"
                  : "text-3xl md:text-4xl font-bold mb-3 text-foreground"
              }
            >
              {title}
            </h1>
            {description && (
              <p
                className={
                  isDark
                    ? "text-lg text-white/70 max-w-2xl mx-auto"
                    : "text-lg text-muted-foreground max-w-2xl mx-auto"
                }
              >
                {description}
              </p>
            )}
          </div>
        )}

        {infographic && (
          <div className="mb-8 relative z-10">
            <img
              src={infographic}
              alt="Diagrama del demostrador"
              className={
                isDark
                  ? "w-full max-w-5xl mx-auto rounded-lg shadow-lg border border-gdigital-green/20"
                  : "w-full max-w-5xl mx-auto rounded-lg shadow-lg border border-border"
              }
            />
          </div>
        )}

        <div className="relative z-10">{children}</div>
      </main>
    </div>
  );
};