import { useState } from "react";
import { DemoLayout } from "@/components/DemoLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Clock, Check, Download, Eye, FileText, Home, Camera, PenTool, Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { ActaEstadoInmueble } from "@/components/arrendamiento/Shared/ActaEstadoInmueble";
import { generarActaEstadoInmueble } from "@/utils/generarActaEstadoInmueble";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
interface Parte {
  nombre: string;
  nif: string;
  email: string;
  telefono: string;
}
interface EvidenciaArchivo {
  nombre: string;
  tipo: "foto" | "video" | "documento";
  estancia: string;
  hash: string;
  timestamp: string;
}
const EstadoInmuebleDemo = () => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // State for parties
  const [parteEntregadora, setParteEntregadora] = useState<Parte>({
    nombre: "Carlos Rodríguez Martín",
    nif: "12345678A",
    email: "carlos.rodriguez@email.com",
    telefono: "+34 666 123 456"
  });
  const [parteReceptora, setParteReceptora] = useState<Parte>({
    nombre: "Ana García López",
    nif: "87654321B",
    email: "ana.garcia@email.com",
    telefono: "+34 666 654 321"
  });
  const [parteInteresada, setParteInteresada] = useState<Parte>({
    nombre: "Roberto Sánchez Ruiz",
    nif: "11223344C",
    email: "roberto.sanchez@email.com",
    telefono: "+34 666 789 012"
  });
  const [direccionInmueble, setDireccionInmueble] = useState("Calle Alcalá 455, 3º B, 28013 Madrid");
  const [tipoActa, setTipoActa] = useState<"entrega" | "devolucion" | "compraventa" | "otros">("entrega");
  const [urlAnuncio, setUrlAnuncio] = useState("");
  const [capturandoAnuncio, setCapturandoAnuncio] = useState(false);

  // State for signatures
  const [firmadoPorEntregadora, setFirmadoPorEntregadora] = useState(false);
  const [firmadoPorReceptora, setFirmadoPorReceptora] = useState(false);

  // Mock evidences after upload
  const [evidencias, setEvidencias] = useState<EvidenciaArchivo[]>([]);

  const handleCapturarAnuncio = async () => {
    if (!urlAnuncio) {
      toast.error("Por favor, introduce la URL del anuncio");
      return;
    }

    setCapturandoAnuncio(true);
    toast.info("Capturando pantalla del anuncio...", {
      description: "Esto puede tardar unos segundos"
    });

    try {
      // Simulate screenshot capture with hash generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const screenshotEvidence: EvidenciaArchivo = {
        nombre: `captura-anuncio-${Date.now()}.png`,
        tipo: "foto",
        estancia: "Anuncio Publicado",
        hash: `screenshot-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date().toISOString()
      };

      setEvidencias(prev => [screenshotEvidence, ...prev]);
      
      toast.success("✅ Captura certificada del anuncio", {
        description: `Hash: ${screenshotEvidence.hash.substring(0, 16)}... | Sello de tiempo cualificado aplicado`
      });
    } catch (error) {
      toast.error("Error al capturar el anuncio", {
        description: "Por favor, verifica la URL e inténtalo de nuevo"
      });
    } finally {
      setCapturandoAnuncio(false);
    }
  };
  const handleUploadFiles = () => {
    setIsProcessing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);

          // Generate mock evidences with hashes - 10 real property photos
          const mockEvidencias: EvidenciaArchivo[] = [{
            nombre: "evidencia-propiedad-01.png",
            tipo: "foto",
            estancia: "Salón",
            hash: "a3b5c8d9e2f1a4b6c7d8e9f0a1b2c3d4",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-02.png",
            tipo: "foto",
            estancia: "Cocina",
            hash: "f8e7d6c5b4a3c2d1e0f9a8b7c6d5e4f3",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-03.png",
            tipo: "foto",
            estancia: "Cocina",
            hash: "c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-04.png",
            tipo: "foto",
            estancia: "Dormitorio Principal",
            hash: "b9a8c7d6e5f4a3b2c1d0e9f8a7b6c5d4",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-05.png",
            tipo: "foto",
            estancia: "Baño Principal",
            hash: "e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-06.png",
            tipo: "foto",
            estancia: "Terraza",
            hash: "d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-07.png",
            tipo: "foto",
            estancia: "Terraza",
            hash: "c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-08.png",
            tipo: "foto",
            estancia: "Dormitorio Secundario",
            hash: "a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-09.png",
            tipo: "foto",
            estancia: "Pasillo",
            hash: "f7e6d5c4b3a2c1d0e9f8a7b6c5d4e3f2",
            timestamp: new Date().toISOString()
          }, {
            nombre: "evidencia-propiedad-10.png",
            tipo: "foto",
            estancia: "Recibidor",
            hash: "b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0",
            timestamp: new Date().toISOString()
          }];
          // Agregar evidencias del inmueble manteniendo las existentes (como captura de anuncio)
          setEvidencias(prev => [...prev, ...mockEvidencias]);
          setTimeout(() => setStep(5), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };
  const handleFirmar = (parte: "entregadora" | "receptora") => {
    if (parte === "entregadora") {
      setFirmadoPorEntregadora(true);
      toast.success(`✅ Firmado por ${parteEntregadora.nombre}`, {
        description: "Firma electrónica avanzada aplicada mediante OTP con sello de tiempo cualificado"
      });
    } else {
      setFirmadoPorReceptora(true);
      toast.success(`✅ Firmado por ${parteReceptora.nombre}`, {
        description: "Firma electrónica avanzada aplicada mediante OTP con sello de tiempo cualificado"
      });
    }
  };
  const getTipoActaLabel = () => {
    switch (tipoActa) {
      case "entrega":
        return "Entrega Inicial";
      case "devolucion":
        return "Devolución Final";
      case "compraventa":
        return "Compraventa";
      case "otros":
        return "Otros (Constancia en Anuncio/Plataforma)";
      default:
        return "";
    }
  };
  return <DemoLayout title="Acta de Estado del Inmueble Certificada" description="Certifica entregas y devoluciones con evidencias multimedia y firmas digitales eIDAS">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Step Progress Indicator with Icons */}
        <div className="grid grid-cols-7 gap-2 mb-8">
          {[{
          num: 1,
          icon: FileText,
          label: "Partes"
        }, {
          num: 2,
          icon: Home,
          label: "Contexto"
        }, {
          num: 3,
          icon: Camera,
          label: "Evidencias"
        }, {
          num: 4,
          icon: Clock,
          label: "Certificar"
        }, {
          num: 5,
          icon: Eye,
          label: "Revisar"
        }, {
          num: 6,
          icon: PenTool,
          label: "Firmar"
        }, {
          num: 7,
          icon: Download,
          label: "Descargar"
        }].map(({
          num,
          icon: Icon,
          label
        }) => <div key={num} className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center transition-all mb-1 ${num <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"} ${num === step ? "ring-2 ring-accent ring-offset-2" : ""}`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={`text-[10px] font-medium text-center ${num <= step ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>)}
        </div>

        {/* Step 1: Party Identification */}
        {step === 1 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                Identificación de las Partes
              </CardTitle>
              <CardDescription>
                Registra los datos de las personas que participan en la certificación del estado del inmueble
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Parte Entregadora */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">          
          
         
         
        
        
       
       
      
      
     
     
    
    
   
   
  
  
 
 




1
Parte Vendedora / Arrendadora                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">1</div>
                  Parte Entregadora
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <Input value={parteEntregadora.nombre} onChange={e => setParteEntregadora({
                  ...parteEntregadora,
                  nombre: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>NIF/NIE</Label>
                    <Input value={parteEntregadora.nif} onChange={e => setParteEntregadora({
                  ...parteEntregadora,
                  nif: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={parteEntregadora.email} onChange={e => setParteEntregadora({
                  ...parteEntregadora,
                  email: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input value={parteEntregadora.telefono} onChange={e => setParteEntregadora({
                  ...parteEntregadora,
                  telefono: e.target.value
                })} />
                  </div>
                </div>
              </div>

              {/* Parte Receptora */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">





2
Parte Receptora            <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent text-sm font-bold">2</div>
                  ​
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <Input value={parteReceptora.nombre} onChange={e => setParteReceptora({
                  ...parteReceptora,
                  nombre: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>NIF/NIE</Label>
                    <Input value={parteReceptora.nif} onChange={e => setParteReceptora({
                  ...parteReceptora,
                  nif: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={parteReceptora.email} onChange={e => setParteReceptora({
                  ...parteReceptora,
                  email: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input value={parteReceptora.telefono} onChange={e => setParteReceptora({
                  ...parteReceptora,
                  telefono: e.target.value
                })} />
                  </div>
                </div>
              </div>

              {/* Parte Interesada */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary text-sm font-bold">3</div>
                  Parte Interesada (Testigo/Agente)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nombre Completo</Label>
                    <Input value={parteInteresada.nombre} onChange={e => setParteInteresada({
                  ...parteInteresada,
                  nombre: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>NIF/NIE</Label>
                    <Input value={parteInteresada.nif} onChange={e => setParteInteresada({
                  ...parteInteresada,
                  nif: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={parteInteresada.email} onChange={e => setParteInteresada({
                  ...parteInteresada,
                  email: e.target.value
                })} />
                  </div>
                  <div>
                    <Label>Teléfono</Label>
                    <Input value={parteInteresada.telefono} onChange={e => setParteInteresada({
                  ...parteInteresada,
                  telefono: e.target.value
                })} />
                  </div>
                </div>
              </div>

              {/* Dirección del Inmueble */}
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  <Home className="h-5 w-5 text-accent" />
                  Dirección del Inmueble
                </h4>
                <Input value={direccionInmueble} onChange={e => setDireccionInmueble(e.target.value)} placeholder="Calle, número, piso, código postal, ciudad" />
              </div>

              <Button onClick={() => setStep(2)} className="w-full" size="lg">
                Continuar
              </Button>
            </CardContent>
          </Card>}

        {/* Step 2: Context Selection */}
        {step === 2 && <Card>
            <CardHeader>
              <CardTitle>Tipo de Acta</CardTitle>
              <CardDescription>
                Selecciona el contexto de la certificación del estado del inmueble
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={tipoActa} onValueChange={v => setTipoActa(v as any)}>
                <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 hover:border-accent transition-smooth cursor-pointer">
                  <RadioGroupItem value="entrega" id="entrega" />
                  <Label htmlFor="entrega" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-foreground">🏠 Entrega Inicial</div>
                    <div className="text-sm text-muted-foreground">Inicio de arrendamiento o cesión temporal</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 hover:border-accent transition-smooth cursor-pointer">
                  <RadioGroupItem value="devolucion" id="devolucion" />
                  <Label htmlFor="devolucion" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-foreground">🔄 Devolución Final</div>
                    <div className="text-sm text-muted-foreground">Finalización de arrendamiento o devolución del inmueble</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 hover:border-accent transition-smooth cursor-pointer">
                  <RadioGroupItem value="compraventa" id="compraventa" />
                  <Label htmlFor="compraventa" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-foreground">💼 Compraventa</div>
                    <div className="text-sm text-muted-foreground">Entrega en proceso de compraventa de inmueble</div>
                  </Label>
                </div>

                <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 hover:border-accent transition-smooth cursor-pointer">
                  <RadioGroupItem value="otros" id="otros" />
                  <Label htmlFor="otros" className="flex-1 cursor-pointer">
                    <div className="font-semibold text-foreground">📋 Otros</div>
                    <div className="text-sm text-muted-foreground">Constancia de información en anuncio o plataforma</div>
                  </Label>
                </div>
              </RadioGroup>

              {/* URL del Anuncio (solo para tipo "otros") */}
              {tipoActa === "otros" && (
                <div className="space-y-4 border-2 border-accent/30 rounded-lg p-4 bg-accent/5">
                  <h4 className="font-semibold text-foreground flex items-center gap-2">
                    <Camera className="h-5 w-5 text-accent" />
                    Captura Certificada del Anuncio
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Introduce la URL del anuncio publicado en la plataforma. Capturaremos automáticamente una imagen certificada con hash SHA-256 y sello de tiempo cualificado.
                  </p>
                  <div className="space-y-3">
                    <Input 
                      value={urlAnuncio} 
                      onChange={e => setUrlAnuncio(e.target.value)} 
                      placeholder="https://www.plataforma.inmobiliaria/inmueble/123456"
                      type="url"
                    />
                    <Button 
                      onClick={handleCapturarAnuncio} 
                      disabled={!urlAnuncio || capturandoAnuncio}
                      variant="outline"
                      className="w-full gap-2"
                    >
                      {capturandoAnuncio ? (
                        <>
                          <Clock className="h-4 w-4 animate-spin" />
                          Capturando y Certificando...
                        </>
                      ) : (
                        <>
                          <Camera className="h-4 w-4" />
                          Capturar Pantalla del Anuncio
                        </>
                      )}
                    </Button>
                    {evidencias.some(e => e.estancia === "Anuncio Publicado") && (
                      <div className="flex items-center gap-2 text-sm text-trust-green">
                        <Check className="h-4 w-4" />
                        Captura del anuncio certificada correctamente
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Atrás
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>}

        {/* Step 3: Evidence Capture */}
        {step === 3 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-accent" />
                Captura de Evidencias Multimedia
              </CardTitle>
              <CardDescription>
                Sube fotografías o captura con tu cámara el estado del inmueble
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Upload Box */}
              <div className="border-2 border-dashed border-accent/30 rounded-lg p-6 text-center hover:border-accent transition-smooth bg-accent/5">
                <input type="file" id="file-upload" multiple accept="image/*" className="hidden" onChange={e => {
              const files = e.target.files;
              if (files) {
                toast.success(`${files.length} archivos seleccionados`, {
                  description: "Las evidencias serán certificadas en el siguiente paso"
                });
              }
            }} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-accent" />
                <h4 className="font-semibold mb-2 text-foreground">Sube o Captura Evidencias</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Arrastra archivos aquí o usa los botones de abajo
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button variant="outline" onClick={() => document.getElementById('file-upload')?.click()} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Seleccionar Archivos
                  </Button>
                  
                  <Button variant="outline" onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.capture = 'environment';
                input.multiple = true;
                input.onchange = (e: any) => {
                  const files = e.target.files;
                  if (files) {
                    toast.success(`${files.length} fotos capturadas`, {
                      description: "Las evidencias serán certificadas en el siguiente paso"
                    });
                  }
                };
                input.click();
              }} className="gap-2">
                    <Camera className="h-4 w-4" />
                    Capturar con Cámara
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <h5 className="text-sm font-semibold mb-2 text-foreground">📱 Para esta demo, mostramos:</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  {tipoActa === "otros" && evidencias.some(e => e.estancia === "Anuncio Publicado") 
                    ? "Captura certificada del anuncio + " 
                    : ""}10 fotografías certificadas de ejemplo que representan un inmueble completo. 
                  En producción, tus fotos capturadas serán certificadas con hash SHA-256 y sello de tiempo cualificado.
                </p>
              </div>
              
              {/* Photo Gallery */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-01.png" alt="Salón" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Salón</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-02.png" alt="Cocina" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Cocina</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-03.png" alt="Cocina 2" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Cocina</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-04.png" alt="Dormitorio Principal" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Dormitorio Principal</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-05.png" alt="Baño Principal" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Baño Principal</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-06.png" alt="Terraza" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Terraza</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-07.png" alt="Terraza 2" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Terraza</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-08.png" alt="Dormitorio Secundario" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Dormitorio Secundario</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-09.png" alt="Pasillo" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Pasillo</p>
                  </div>
                </div>
                <div className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
                  <img src="/images/evidencia-propiedad-10.png" alt="Recibidor" className="w-full h-32 object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-white text-xs font-semibold">Recibidor</p>
                  </div>
                </div>
              </div>

              <div className="bg-accent/10 border border-accent/20 p-4 rounded-lg">
                <h5 className="text-sm font-semibold mb-2 text-foreground">📸 10 Evidencias Listas para Certificar</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Cobertura completa: salón, cocina, dormitorios, baños, terraza, pasillo y recibidor</li>
                  <li>• Cada fotografía recibirá un hash SHA-256 único</li>
                  <li>• Sello de tiempo cualificado eIDAS aplicado por EAD Trust g-digital</li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  Atrás
                </Button>
                <Button onClick={() => setStep(4)} className="flex-1">
                  Aplicar Sello Temporal Cualificado
                </Button>
              </div>
            </CardContent>
          </Card>}

        {/* Step 4: Qualified Timestamp Processing */}
        {step === 4 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 animate-spin text-accent" />
                Aplicando Sello de Tiempo Cualificado eIDAS
              </CardTitle>
              <CardDescription>
                Certificando evidencias con EAD Trust (Proveedor Cualificado)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isProcessing && progress === 0 && <Button onClick={handleUploadFiles} className="w-full" size="lg">
                  Iniciar Certificación
                </Button>}

              {(isProcessing || progress > 0) && <>
                  <Progress value={progress} className="w-full" />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-muted-foreground">1. Generando hash criptográfico SHA-256...</span>
                      <Check className="h-4 w-4 text-trust-green" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-muted-foreground">2. Enviando al QTSP (EAD Trust g-digital)...</span>
                      {progress > 40 && <Check className="h-4 w-4 text-trust-green" />}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-muted-foreground">3. Recibiendo sello de tiempo cualificado...</span>
                      {progress > 70 && <Check className="h-4 w-4 text-trust-green" />}
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                      <span className="text-muted-foreground">4. Vinculando evidencias al acta...</span>
                      {progress >= 100 && <Check className="h-4 w-4 text-trust-green" />}
                    </div>
                  </div>
                </>}
            </CardContent>
          </Card>}

        {/* Step 5: Act Review */}
        {step === 5 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                Revisión del Acta Pre-Firma
              </CardTitle>
              <CardDescription>
                Revisa toda la información antes de aplicar las firmas digitales cualificadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              <ActaEstadoInmueble parteEntregadora={parteEntregadora} parteReceptora={parteReceptora} parteInteresada={parteInteresada} direccionInmueble={direccionInmueble} tipoActa={getTipoActaLabel()} evidencias={evidencias} firmadoPorEntregadora={false} firmadoPorReceptora={false} />

              <div className="flex gap-3">
                <Button onClick={() => setStep(3)} variant="outline" className="flex-1">
                  Modificar Evidencias
                </Button>
                <Button onClick={() => setStep(6)} className="flex-1">
                  Proceder a Firmar
                </Button>
              </div>
            </CardContent>
          </Card>}

        {/* Step 6: Digital Signatures */}
        {step === 6 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PenTool className="h-5 w-5 text-accent" />
                Firma Digital de Ambas Partes
              </CardTitle>
              <CardDescription>
                Ambas partes firman digitalmente el acta con firma electrónica avanzada mediante OTP. Las evidencias se certifican con sello de tiempo cualificado.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Firma Parte Entregadora */}
              <div className={`border-2 rounded-lg p-6 ${firmadoPorEntregadora ? "border-trust-green bg-trust-green/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{parteEntregadora.nombre}</h4>
                    <p className="text-sm text-muted-foreground">Parte Entregadora • NIF: {parteEntregadora.nif}</p>
                  </div>
                  {firmadoPorEntregadora && <Check className="h-8 w-8 text-trust-green" />}
                </div>
                
                {!firmadoPorEntregadora ? <Button onClick={() => handleFirmar("entregadora")} className="w-full" variant="default">
                    <PenTool className="mr-2 h-4 w-4" />
                    Firmar como {parteEntregadora.nombre.split(" ")[0]}
                  </Button> : <div className="bg-trust-green/10 p-3 rounded text-sm text-foreground">
                    ✓ Firmado el {new Date().toLocaleString("es-ES")} mediante OTP 123456
                  </div>}
              </div>

              {/* Firma Parte Receptora */}
              <div className={`border-2 rounded-lg p-6 ${firmadoPorReceptora ? "border-trust-green bg-trust-green/5" : "border-border"}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-foreground">{parteReceptora.nombre}</h4>
                    <p className="text-sm text-muted-foreground">Parte Receptora • NIF: {parteReceptora.nif}</p>
                  </div>
                  {firmadoPorReceptora && <Check className="h-8 w-8 text-trust-green" />}
                </div>
                
                {!firmadoPorReceptora ? <Button onClick={() => handleFirmar("receptora")} className="w-full" variant="default">
                    <PenTool className="mr-2 h-4 w-4" />
                    Firmar como {parteReceptora.nombre.split(" ")[0]}
                  </Button> : <div className="bg-trust-green/10 p-3 rounded text-sm text-foreground">
                    ✓ Firmado el {new Date().toLocaleString("es-ES")} mediante OTP 123456
                  </div>}
              </div>

              {firmadoPorEntregadora && firmadoPorReceptora && <Button onClick={() => setStep(7)} className="w-full" size="lg">
                  Generar Acta Certificada Final
                </Button>}
            </CardContent>
          </Card>}

        {/* Step 7: Signed Act Final Version */}
        {step === 7 && <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-trust-green">
                <Check className="h-6 w-6" />
                Acta de Estado del Inmueble Firmada
              </CardTitle>
              <CardDescription>
                El documento ha sido firmado digitalmente por ambas partes con validez legal plena
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Signed Act Display */}
              <ActaEstadoInmueble parteEntregadora={parteEntregadora} parteReceptora={parteReceptora} parteInteresada={parteInteresada} direccionInmueble={direccionInmueble} tipoActa={getTipoActaLabel()} evidencias={evidencias} firmadoPorEntregadora={true} firmadoPorReceptora={true} />

              <div className="bg-trust-green/10 border-2 border-trust-green/30 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Check className="h-5 w-5 text-trust-green" />
                  <h4 className="font-semibold text-foreground">Documento Certificado y Firmado</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  El acta ha sido firmada por las personas que constan mediante OTP y certificada con sello de tiempo cualificado eIDAS por EAD Trust g-digital.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => {
              toast.success("Acta enviada a todas las partes", {
                description: `Email certificado enviado a ${parteEntregadora.email}, ${parteReceptora.email} y ${parteInteresada.email}`
              });
            }} variant="outline" className="flex-1">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar a Todas las Partes
                </Button>
                <Button variant="outline" onClick={() => {
              generarActaEstadoInmueble({
                parteEntregadora,
                parteReceptora,
                parteInteresada,
                direccionInmueble,
                tipoActa: getTipoActaLabel(),
                evidencias
              });
              toast.success("PDF generado correctamente", {
                description: "El acta certificada ha sido descargada"
              });
            }} className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF Certificado
                </Button>
              </div>
              <Button onClick={() => setStep(1)} variant="secondary" className="w-full">
                Crear Nueva Acta
              </Button>
            </CardContent>
          </Card>}
      </div>
    </DemoLayout>;
};
export default EstadoInmuebleDemo;