import { AlertCircle, MessageSquareWarning, FileX, Users } from "lucide-react";

export const ProblemSection = () => {
  const problems = [
    {
      icon: AlertCircle,
      title: "Falta de confianza",
      description: "Dudas sobre el estado real del inmueble, la identidad de las partes y la trazabilidad de lo acordado."
    },
    {
      icon: MessageSquareWarning,
      title: "Comunicaciones inseguras",
      description: "WhatsApp, emails o llamadas sin valor probatorio. En caso de conflicto, todo se reduce a 'palabra contra palabra'."
    },
    {
      icon: FileX,
      title: "Trámites lentos y complejos",
      description: "Papel, desplazamientos y procesos manuales que encarecen y retrasan firmas, entregas y comunicaciones clave."
    },
    {
      icon: Users,
      title: "Riesgos legales",
      description: "Contratos informales, arras poco claras y falta de evidencias sólidas que alimentan litigios y reclamaciones."
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container px-6 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Desafíos de las Transacciones Tradicionales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Las transacciones inmobiliarias siguen apoyándose en canales dispersos y poco probatorios. Esto incrementa la inseguridad jurídica en compraventas y, sobre todo, en arrendamientos de larga duración.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="bg-background p-6 rounded-lg border-2 border-muted hover:border-accent/50 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <problem.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                {problem.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
