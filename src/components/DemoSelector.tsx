import { Camera, MessageSquare, Home, FileCheck, Archive, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DemoSelector = () => {
  const navigate = useNavigate();

  const demos = [
    {
      id: "estado-inmueble",
      icon: Camera,
      title: "Acta de Estado del Inmueble",
      description: "Certifica el Estado del Inmueble en diferentes momentos (entrega, devolución, otros), así como captura información publicada o de anuncios (con o sin intervención usuarios)",
      route: "/demo/estado-inmueble"
    },
    {
      id: "canal-arrendamiento",
      icon: MessageSquare,
      title: "Canal de Arrendamiento Certificado",
      description: "Soporte al arrendador y arrendatario en la gestión de su relación contractual durante todo el ciclo de vida del contrato, desde su formalización al momento de su terminación, permitiendo la gestión de todas las comunicaciones en un solo lugar.",
      route: "/demo/canal-arrendamiento"
    },
    {
      id: "canal-arras",
      icon: Home,
      title: "Canal de Arras Certificado",
      description: "Soporte al Comprador y Vendedor en la gestión de su relación jurídica desde el momento en que se formaliza el pacto de arras, con soporte a todas las comunicaciones y gestión de la Escritura de Compraventa",
      route: "/demo/canal-arras"
    },
    {
      id: "canal-compraventa",
      icon: Home,
      title: "Canal de Compraventa Directa Certificado",
      description: "Soporte al Comprador y Vendedor en la gestión de todo el proceso de compraventa directa, con dos modalidades de cierre: escritura pública única o documento privado con elevación posterior, desde identificación hasta entrega de llaves",
      route: "/demo/canal-compraventa"
    },
    {
      id: "certificacion-documentos",
      icon: FileCheck,
      title: "Gestión Documentación",
      description: "Gestión de los procesos de documentación, autenticando documentos, facilitando la comunicación certificada de las partes en las transacciones originadas en la Plataforma, integrando servicios de depósito legal de información clave",
      route: "/demo/certificacion-documentos"
    },
    {
      id: "gestion-avanzada",
      icon: Archive,
      title: "El Q:CLM",
      description: "Gestor Contractual Cualificado que centraliza y certifica la gestión completa del ciclo de vida de todos los contratos del sector inmobiliario (arrendamientos, arras, compraventas). Primera infraestructura CLM profesional con certificación eIDAS integrada, ofrecida como servicio estratégico a los usuarios de la Plataforma.",
      route: "/demo/gestion-avanzada"
    }
  ];

  return (
    <section id="demos" className="py-16 bg-secondary">
      <div className="container px-6 mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Explora Nuestros Demostradores
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-2">
            Cada demostrador simula un escenario real de certificación digital en el sector inmobiliario.
          </p>
          <p className="text-sm font-medium text-accent">
            Todo el proceso queda certificado con sellos de tiempo cualificado eIDAS
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {demos.map((demo) => (
            <Card
              key={demo.id}
              className="group hover:shadow-[var(--shadow-elevated)] transition-all cursor-pointer border-2 border-muted hover:border-primary"
              onClick={() => navigate(demo.route)}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center mb-4 transition-all group-hover:scale-110">
                  <demo.icon className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl">{demo.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base mb-4">
                  {demo.description}
                </CardDescription>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 hover:shadow-lg transition-all duration-200 font-semibold py-6 text-base group cursor-pointer"
                >
                  Ver Demostrador
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full border-2 border-accent/30">
            <span className="h-2 w-2 bg-trust-green rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">
              Entorno eIDAS - Todas las acciones quedan certificadas con validez legal
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
