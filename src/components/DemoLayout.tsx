import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eadTrustLogo from "@/assets/ead-trust-logo.png";
interface DemoLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  infographic?: string;
}
export const DemoLayout = ({
  children,
  title,
  description,
  infographic
}: DemoLayoutProps) => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            
            <div className="flex items-center gap-2">
              <img src={eadTrustLogo} alt="EAD Trust g-digital" className="h-8" />
              
            </div>
          </div>
        </div>
      </header>

      {/* Demo Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-3">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-foreground font-medium">
              Demo Interactiva - Todos los procesos quedan certificados con sellos de tiempo cualificado eIDAS
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container px-4 py-8 mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">{title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        {infographic && (
          <div className="mb-8">
            <img 
              src={infographic} 
              alt="Diagrama del demostrador" 
              className="w-full max-w-5xl mx-auto rounded-lg shadow-lg border border-border"
            />
          </div>
        )}
        
        {children}
      </main>
    </div>;
};