import { Button } from "@/components/ui/button";
import { Shield, ChevronDown, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import eadTrustLogo from "@/assets/ead-trust-logo.png";
import heroMarketplace from "@/assets/hero-marketplace.png";
export const Hero = () => {
  const navigate = useNavigate();
  const scrollToDemos = () => {
    document.getElementById("demos")?.scrollIntoView({
      behavior: "smooth"
    });
  };
  return <section className="relative min-h-[85vh] flex items-center bg-background">
    <div className="container px-6 py-16 mx-auto max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">

        {/* Columna izquierda: Contenido */}
        <div className="space-y-6">
          {/* Badge contexto demostración */}
          <div className="inline-flex flex-col gap-1 px-4 py-3 bg-primary/10 border-2 border-primary/30 rounded-xl shadow-sm">
            <span className="text-xs text-muted-foreground font-medium">
              Presentación-Demostración preparada por
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary">g-digital</span>
              <span className="text-xs text-muted-foreground">modelo</span>
              <span className="text-sm font-bold text-accent">InmoServTech</span>
            </div>
          </div>

          {/* Título principal con jerarquía de 3 niveles */}
          <h1 className="space-y-3 leading-tight">
            {/* Nivel 1: Etiqueta/Contexto */}
            <div className="text-2xl md:text-3xl text-muted-foreground font-semibold">
              Nuestra propuesta
            </div>

            {/* Nivel 2: El QUÉ (Propuesta concreta) */}
            <div className="text-4xl md:text-5xl text-primary font-bold">
              Servicios eIDAS integrados (+CLM)
            </div>

            {/* Nivel 3: El VALOR (Beneficio) */}
            <div className="text-xl md:text-2xl text-accent font-medium">
              Reforzando, transparencia, confianza y la seguridad jurídica del ecosistema.
            </div>
          </h1>

          {/* Subtítulo descriptivo */}


          {/* Badges de valor estratégico */}
          <div className="flex flex-wrap gap-3">


            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 border border-secondary/20 rounded-lg">
              <span className="text-xs font-semibold text-secondary-foreground">
              </span>
            </div>
          </div>

          {/* CTAs principales */}
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => navigate('/demo/canal-arras')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 ring-2 ring-offset-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200 cursor-pointer">
              <Shield className="mr-2 h-6 w-6" />
              Contrato de Arras (Observatorio)
            </Button>

            <Button size="lg" onClick={() => navigate('/conceptos')} className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg shadow-xl hover:shadow-2xl hover:scale-105 hover:-translate-y-1 ring-2 ring-offset-2 ring-primary/20 hover:ring-primary/40 transition-all duration-200 cursor-pointer">
              <BookOpen className="mr-2 h-6 w-6" />
              Explorar Tecnología y Derecho
            </Button>
          </div>

          {/* Badge certificación eIDAS */}

        </div>

        {/* Columna derecha: Elemento visual */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
            <img src={heroMarketplace} alt="Marketplace inmobiliario certificado" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-muted-foreground/60" />
      </div>
    </div>
  </section>;
};