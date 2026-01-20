import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConceptGrid } from "@/components/conceptos/ConceptGrid";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import diagramaEidasCompleto from "@/assets/diagrama-eidas-completo.png";
import infografiaCLM from "@/assets/infografia-clm-facilitea.jpeg";
import infografiaArrendamiento from "@/assets/infografia-canal-arrendamiento.jpeg";
import infografiaArras from "@/assets/infografia-canal-arras.jpeg";
import infografiaEstandarKtech from "@/assets/infografia-estandar-ktech-arras.jpeg";
const Conceptos = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      {/* Header con navegación */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Inicio
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span className="font-medium">Fundamentos Legales</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero de la página */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Biblioteca de Conocimiento
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-primary">
              Derecho + Tecnología
            </h1>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              Conceptos clave que sustentan la plataforma Facilitea Casa: marco legal eIDAS, 
              tecnologías de confianza, CLM inmobiliario y aplicaciones prácticas. 
              Contexto educativo para comprender cómo la certificación digital transforma 
              las transacciones inmobiliarias en operaciones legales seguras.
            </p>
          </div>
        </div>
      </section>

      {/* Diagrama eIDAS completo */}
      <section className="py-12 bg-background border-y border-border">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-primary mb-3">
              REGLAMENTO eIDAS: La Infraestructura Digital Europea de Seguridad Jurídica
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Visión completa de cómo eIDAS transforma Internet en una plataforma transaccional segura, 
              reduciendo el riesgo operativo y legal para empresas y ciudadanos en el Mercado Único Digital europeo.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-2 border-muted hover:border-primary/50">
                <div className="relative">
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                      <ZoomIn className="h-5 w-5" />
                      <span className="font-medium">Clic para ampliar</span>
                    </div>
                  </div>
                </div>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
              <div className="w-full h-full overflow-auto p-6">
                <img src={diagramaEidasCompleto} alt="Diagrama completo del Reglamento eIDAS - Vista ampliada" className="w-full h-auto" />
              </div>
            </DialogContent>
          </Dialog>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground italic">
              eIDAS facilita el despliegue de relaciones y contratos vinculantes con máxima seguridad jurídica
            </p>
          </div>
        </div>
      </section>

      {/* Grid de conceptos */}
      <section className="py-16 bg-background">
        <div className="container px-6 mx-auto max-w-7xl">
          <ConceptGrid />
        </div>
      </section>

      {/* Infografías de Arquitecturas CLM Implementadas */}
      <section className="py-16 bg-secondary/10 border-y border-border">
        <div className="container px-6 mx-auto max-w-7xl">
          
          {/* Título de la sección */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Arquitecturas CLM Implementadas
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto">
              Infografías generales de conceptos y flujos de Contract Lifecycle Management propuestas para procesos y transacciones inmobiliarias en el ecosistema de Facilitea Casa: desde el concepto tecnológico general de un CLM,  hasta los workflows propuestos, integrando servicios y  certificados eIDAS.
            </p>
          </div>

          {/* Grid de 3 infografías */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Infografía 1: CLM General */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-2 border-muted hover:border-primary/50">
                  <div className="relative">
                    <img src={infografiaCLM} alt="El CLM: El Corazón Tecnológico de Facilitea Casa" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2">
                        <ZoomIn className="h-5 w-5" />
                        <span className="font-medium">Ampliar</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold text-lg text-primary mb-2">
                      El CLM: Corazón Tecnológico
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Concepto y beneficios del Contract Lifecycle Management aplicado al sector inmobiliario
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
                <div className="w-full h-full overflow-auto p-6 bg-background">
                  <img src={infografiaCLM} alt="El CLM - Vista ampliada" className="w-full h-auto" />
                </div>
              </DialogContent>
            </Dialog>

            {/* Infografía 2: Canal de Arrendamiento */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-2 border-muted hover:border-blue-500/50">
                  <div className="relative">
                    <img src={infografiaArrendamiento} alt="Canal de Arrendamiento Certificado - 15 Fases" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <ZoomIn className="h-5 w-5" />
                        <span className="font-medium">Ampliar</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold text-lg text-blue-600 mb-2">
                      Canal de Arrendamiento Certificado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Workflow completo de 15 fases certificadas para contratos de alquiler con eIDAS
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
                <div className="w-full h-full overflow-auto p-6 bg-background">
                  <img src={infografiaArrendamiento} alt="Canal de Arrendamiento - Vista ampliada" className="w-full h-auto" />
                </div>
              </DialogContent>
            </Dialog>

            {/* Infografía 3: Canal de Arras */}
            <Dialog>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-2 border-muted hover:border-green-500/50">
                  <div className="relative">
                    <img src={infografiaArras} alt="Canal de Arras Certificado - 12 Fases" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-green-600/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                        <ZoomIn className="h-5 w-5" />
                        <span className="font-medium">Ampliar</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-card">
                    <h3 className="font-semibold text-lg text-green-600 mb-2">
                      Canal de Arras Certificado
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Workflow completo de 12 fases para contratos de arras con modelo K-TECH
                    </p>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
                <div className="w-full h-full overflow-auto p-6 bg-background">
                  <img src={infografiaArras} alt="Canal de Arras - Vista ampliada" className="w-full h-auto" />
                </div>
              </DialogContent>
            </Dialog>

          </div>

          {/* Nota al pie de la sección */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground italic">
              Cada arquitectura implementa certificación eIDAS completa con EAD Trust como QTSP (Prestador Cualificado de Servicios de Confianza)
            </p>
          </div>

        </div>
      </section>

      {/* Estándar K-TECH */}
      <section className="py-16 bg-background">
        <div className="container px-6 mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              El Estándar de Arras del Foro K-TECH
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Implementamos el modelo de arras penitenciales del Observatorio Legaltech Garrigues-ICADE: 
              un estándar neutral, transparente y claro que favorece la seguridad jurídica y la confianza 
              de todas las partes en el proceso de compraventa inmobiliaria.
            </p>
          </div>
          
          <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={infografiaEstandarKtech} alt="Modelo de Arras del Foro K-TECH - Observatorio Legaltech Garrigues-ICADE" className="w-full h-auto" />
          </Card>
        </div>
      </section>

      {/* Sección final con llamada a la acción */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-6 mx-auto max-w-4xl text-center space-y-6">
          <h2 className="text-2xl font-bold text-primary">
            ¿Listo para ver estos conceptos en acción?
          </h2>
          <p className="text-base text-muted-foreground">
            Explora nuestros demostradores interactivos para entender cómo la certificación 
            eIDAS, los sellos de tiempo y la gestión CLM se aplican a casos reales de 
            arrendamiento, arras y compraventa inmobiliaria.
          </p>
          <Button size="lg" onClick={() => navigate('/')} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Explorar Demostradores
          </Button>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Conceptos;