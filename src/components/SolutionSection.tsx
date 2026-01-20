import { Shield, FileCheck, MessageSquareText, Clock, Lock, BookOpen } from "lucide-react";
import eidasLogo from "@/assets/eidas-logo.png";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
export const SolutionSection = () => {
  const solutions = [{
    icon: Clock,
    title: "Todo convertido en evidencias legales",
    description: "Cada documento, foto o evento del contrato queda sellado con fecha y hora real por EAD Trust, garantizando integridad de la información  y su trazabilidad temporal."
  }, {
    icon: FileCheck,
    title: "Más allá de una firma electrónica",
    description: "La decisión de contratar se forma dinámicamente y con constancia de todos los elementos que hacen transparente y aseguran el consentimiento informado sobre cada extremo esencial del acuerdo. La seguridad jurídica, la transparencia, y la confianza para todos los actores se transforma de manera radical."
  }, {
    icon: MessageSquareText,
    title: "Única Fuente de la Verdad",
    description: "El canal se convierte en el gestor de las relaciones entre las partes durante todo el ciclo de vida contractual. Todo se registra con sellos de tiempo, reduciendo el litigio al convertirse en la fuente única de verdad verificable."
  }, {
    icon: Lock,
    title: "Simplificación y prevención de controversias",
    description: "Contratos, actas, justificantes y comunicaciones se conservan en archivo electrónico cualificado, íntegros y verificables durante años, listos para aportarse en auditorías o procedimientos. Hechos y documentos quedan certificados en un mismo lugar, su prueba se ha simplificado, la controversia queda acotada."
  }];
  return <section className="py-16 bg-background">
    <div className="container px-6 mx-auto max-w-6xl">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <img src={eidasLogo} alt="eIDAS" className="h-16" />
          <h2 className="text-3xl font-bold text-primary">
            Nuestra Solución
          </h2>
        </div>
        <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-2">
          <strong className="text-accent">InmoServTech + QTSP = Plataforma CLM Inmobiliaria con Seguridad Jurídica Digital Reforzada</strong>
        </p>
        <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
          La función del "QTSP in house" para la Plataforma: EAD Trust, como Prestador Cualificado de Servicios de Confianza, certifica tiempos, comunicaciones y custodia de evidencias, facilitando la operación del CLM.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
        {solutions.map((solution, index) => <div key={index} className="bg-gradient-card p-8 rounded-xl border-2 border-muted hover:border-accent/50 transition-all group">
          <div className="w-14 h-14 rounded-xl bg-primary/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-all">
            <solution.icon className="h-7 w-7 text-primary group-hover:text-accent transition-all" />
          </div>
          <h3 className="text-xl font-semibold text-primary mb-3">
            {solution.title}
          </h3>
          <p className="text-muted-foreground">
            {solution.description}
          </p>
        </div>)}
      </div>

      <div className="bg-gradient-to-br from-accent/10 to-primary/5 border-2 border-accent/20 rounded-2xl p-8 max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <Shield className="h-12 w-12 text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-primary mb-3">
              Seguridad Jurídica Reforzada
            </h3>
            <p className="text-lg text-foreground/90 mb-4">
              El modelo CLM certificado está diseñado para <strong className="text-accent">facilitar el cumplimiento, prevenir litigios</strong> y aportar evidencias claras en caso de discrepancia. Al ser un tercero independiente y cualificado, el QTSP garantiza integridad y autenticidad de los actos digitales. Cada acción en la plataforma queda respaldada por servicios regulados según eIDAS y Ley 6/2020, otorgando validez jurídica conforme a la normativa vigente.
            </p>
            <Link to="/conceptos">
              <Button variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Explorar Biblioteca de Conocimiento
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </section>;
};