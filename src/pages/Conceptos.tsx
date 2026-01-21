import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileCode, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ConceptGrid } from "@/components/conceptos/ConceptGrid";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import diagramaEidasCompleto from "@/assets/diagrama-eidas-completo.png";
import infografiaCLM from "@/assets/infografia-clm-gdigital.jpeg";
import infografiaArrendamiento from "@/assets/infografia-canal-arrendamiento.jpeg";
import infografiaArras from "@/assets/infografia-canal-arras.jpeg";
import infografiaEstandarKtech from "@/assets/infografia-estandar-ktech-arras.jpeg";
import infografiaArrasComputable from "@/assets/infografia-arras-computable.jpeg";
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
            Conceptos clave que sustentan la plataforma g-digital: marco legal eIDAS,
            tecnologías de confianza, CLM inmobiliario y aplicaciones prácticas.
            Contexto educativo para comprender cómo la certificación digital transforma
            las transacciones inmobiliarias en operaciones legales seguras.
          </p>
        </div>
      </div>
    </section>

    {/* Card destacada: Contratos Computables */}
    <section className="py-8 bg-background">
      <div className="container px-6 mx-auto max-w-7xl">
        <Card 
          className="overflow-hidden cursor-pointer group bg-gradient-to-br from-[#1A2E4C] to-[#152238] border-2 border-[#0FE860]/30 hover:border-[#0FE860]/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(15,232,96,0.15)]"
          onClick={() => navigate('/contratos-computables')}
        >
          <div className="p-8 md:p-10">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0FE860]/10 border border-[#0FE860]/30 rounded-full mb-4">
                  <FileCode className="h-4 w-4 text-[#0FE860]" />
                  <span className="text-sm font-medium text-[#0FE860]">Nueva Frontera</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  g-digital & <span className="text-[#0FE860]">Contratos Computables</span>
                </h2>
                <p className="text-white/70 leading-relaxed mb-4">
                  Descubre cómo g-digital transforma documentos estáticos en procesos digitales 
                  verificables y ejecutables: Derecho Computable, las 4 capas de arquitectura, 
                  y la visión 2030 del futuro jurídico-digital.
                </p>
                <div className="flex items-center gap-2 text-[#C4F53B] group-hover:gap-4 transition-all">
                  <span className="font-medium">Explorar la Visión Completa</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>
              <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-2xl bg-[#0FE860]/10 border border-[#0FE860]/20">
                <FileCode className="h-16 w-16 text-[#0FE860]/60" />
              </div>
            </div>
          </div>
        </Card>
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
            Infografías generales de conceptos y flujos de Contract Lifecycle Management propuestas para procesos y transacciones inmobiliarias en el ecosistema g-digital: desde el concepto tecnológico general de un CLM,  hasta los workflows propuestos, integrando servicios y  certificados eIDAS.
          </p>
        </div>

        {/* Grid de 3 infografías */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Infografía 1: CLM General */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:shadow-xl transition-all group border-2 border-muted hover:border-primary/50">
                <div className="relative">
                  <img src={infografiaCLM} alt="El CLM: El Corazón Tecnológico de g-digital" className="w-full h-auto" />
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

    {/* Pactos de Arras y Contratos Computables */}
    <section className="py-16 bg-gradient-to-b from-[#1A2E4C] to-[#0F1A2A]">
      <div className="container px-6 mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#0FE860]/10 border border-[#0FE860]/30 rounded-full mb-4">
            <FileCode className="h-4 w-4 text-[#0FE860]" />
            <span className="text-sm font-medium text-[#0FE860]">Visión Computable</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pactos de Arras y <span className="text-[#0FE860]">Contratos Computables</span>
          </h2>
          <p className="text-lg text-white/70 max-w-4xl mx-auto leading-relaxed">
            Aterrizando la visión: cómo el contrato de arras tradicional se transforma en un 
            <strong className="text-[#C4F53B]"> autómata digital</strong> gobernado por estados, 
            reglas y confianza regulada. De un PDF estático a un proceso computable que "sabe" 
            en qué estado está y reacciona automáticamente a eventos.
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="overflow-hidden cursor-pointer hover:shadow-[0_0_40px_rgba(15,232,96,0.2)] transition-all group border-2 border-[#0FE860]/30 hover:border-[#0FE860]/60 bg-white/5">
              <div className="relative">
                <img 
                  src={infografiaArrasComputable} 
                  alt="Aterrizando la Visión: El Contrato de Arras como Proceso Computable" 
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0FE860]/90 text-[#1A2E4C] px-4 py-2 rounded-lg flex items-center gap-2 font-semibold">
                    <ZoomIn className="h-5 w-5" />
                    <span>Clic para ampliar</span>
                  </div>
                </div>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0">
            <div className="w-full h-full overflow-auto p-6 bg-[#1A2E4C]">
              <img 
                src={infografiaArrasComputable} 
                alt="Infografía Arras Computable - Vista ampliada" 
                className="w-full h-auto"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Beneficios estratégicos */}
        <div className="mt-10 grid md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-[#0FE860] text-2xl mb-2">📋</div>
            <h4 className="font-semibold text-white mb-1">Menos Ambigüedad</h4>
            <p className="text-sm text-white/60">Visión única de estado y reglas</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-[#C4F53B] text-2xl mb-2">✓</div>
            <h4 className="font-semibold text-white mb-1">Prueba por Defecto</h4>
            <p className="text-sm text-white/60">Evidencias automáticas</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-[#0FE860] text-2xl mb-2">💳</div>
            <h4 className="font-semibold text-white mb-1">Integración Contrato-Pago</h4>
            <p className="text-sm text-white/60">Movimiento de fondos nativo</p>
          </div>
          <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
            <div className="text-[#C4F53B] text-2xl mb-2">🚀</div>
            <h4 className="font-semibold text-white mb-1">Escalabilidad Industrial</h4>
            <p className="text-sm text-white/60">Arquitectura API y servicios regulados</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-white/50 italic">
            La arquitectura computable permite que el contrato reaccione automáticamente a eventos (pagos, tiempos, acciones) generando evidencia certificada
          </p>
        </div>
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