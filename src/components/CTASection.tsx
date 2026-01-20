import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="bg-[var(--gradient-hero)] rounded-3xl p-12 md:p-16 text-center text-primary-foreground shadow-[var(--shadow-elevated)]">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            ¿Te interesa llevar estas soluciones a tus operaciones?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Contacta con nosotros para conocer más sobre nuestras soluciones certificadas
          </p>
          <div className="flex justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/30 border-white/50 hover:border-white border-3 text-white font-bold px-10 py-7 text-xl backdrop-blur-sm shadow-2xl hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <Mail className="mr-3 h-6 w-6" />
              Contactar
            </Button>
          </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm opacity-75 max-w-2xl mx-auto">
              InmoServTech es una plataforma tecnológica que integra servicios de confianza cualificados según el reglamento eIDAS.
              No sustituye el asesoramiento legal personalizado, sino que proporciona herramientas certificadas
              para mejorar la seguridad jurídica de tus transacciones inmobiliarias.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .transition-smooth {
          transition: var(--transition-smooth);
        }
        .shadow-elevated {
          box-shadow: var(--shadow-elevated);
        }
      `}</style>
    </section>
  );
};
