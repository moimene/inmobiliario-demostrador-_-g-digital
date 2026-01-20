import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  PenTool, 
  Upload, 
  CheckCircle, 
  Clock, 
  User, 
  Shield, 
  FileCheck,
  Send,
  AlertCircle,
  Mail,
  Phone,
  Smartphone,
  Lock,
  ExternalLink,
  Download,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArras } from "@/contexts/ArrasContext";
import { generarCertificadoFirmasPDF } from "@/utils/generarCertificadoFirmasPDF";
import { toast } from "@/hooks/use-toast";
import eadTrustLogo from "@/assets/ead-trust-logo.png";
import selloEidas from "@/assets/sello_eidas.png";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

interface FirmanteFirma {
  id: string;
  nombre: string;
  nif: string;
  email: string;
  telefono: string;
  rol: "vendedor" | "comprador";
  estado: "pendiente" | "invitado" | "verificando" | "firmado";
  metodoVerificacion?: "sms" | "email" | "certificado";
  timestampInvitacion?: string;
  timestampFirma?: string;
  hashFirma?: string;
}

// Simulated data for demo
const firmantesSimulados: FirmanteFirma[] = [
  {
    id: "firm-001",
    nombre: "María García López",
    nif: "12345678A",
    email: "maria.garcia@email.com",
    telefono: "+34 612 345 678",
    rol: "vendedor",
    estado: "pendiente"
  },
  {
    id: "firm-002",
    nombre: "Carlos Rodríguez Martín",
    nif: "87654321B",
    email: "carlos.rodriguez@email.com",
    telefono: "+34 698 765 432",
    rol: "comprador",
    estado: "pendiente"
  }
];

export const Step6Firma = ({ onNext, onBack, data }: StepProps) => {
  const { setVista } = useArras();
  const [firmaMode, setFirmaMode] = useState<"plataforma" | "externo">("plataforma");
  const [firmantes, setFirmantes] = useState<FirmanteFirma[]>(firmantesSimulados);
  const [metodoVerificacion, setMetodoVerificacion] = useState<"sms" | "email">("sms");
  const [isInviting, setIsInviting] = useState<string | null>(null);
  const [showEADTrustInfo, setShowEADTrustInfo] = useState(false);

  const handleInvitarFirma = async (firmanteId: string) => {
    setIsInviting(firmanteId);
    const firmante = firmantes.find(f => f.id === firmanteId);
    
    // Simulate API call to EADTrust
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFirmantes(prev => prev.map(f => 
      f.id === firmanteId 
        ? { 
            ...f, 
            estado: "invitado", 
            metodoVerificacion,
            timestampInvitacion: new Date().toISOString()
          } 
        : f
    ));
    setIsInviting(null);

    // Simulated email notification
    toast({
      title: "📧 Email de invitación enviado",
      description: (
        <div className="mt-2 space-y-2 text-sm">
          <p><strong>Para:</strong> {firmante?.email}</p>
          <p><strong>Asunto:</strong> Invitación a firmar contrato de arras</p>
          <div className="p-2 bg-muted rounded text-xs mt-2">
            <p>Estimado/a {firmante?.nombre},</p>
            <p className="mt-1">Ha sido invitado a firmar un contrato de arras penitenciales mediante firma electrónica cualificada.</p>
            <p className="mt-1">Acceda al enlace seguro para verificar su identidad y proceder con la firma.</p>
            <p className="mt-2 text-primary">[Enlace de firma seguro - EADTrust]</p>
          </div>
        </div>
      ),
      duration: 8000,
    });
  };

  const handleSimularFirma = async (firmanteId: string) => {
    const firmante = firmantes.find(f => f.id === firmanteId);
    
    setFirmantes(prev => prev.map(f => 
      f.id === firmanteId ? { ...f, estado: "verificando" } : f
    ));
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const hashFirma = `SHA256:${crypto.randomUUID().replace(/-/g, '').substring(0, 64)}`;
    const timestampFirma = new Date().toISOString();
    
    setFirmantes(prev => prev.map(f => 
      f.id === firmanteId 
        ? { 
            ...f, 
            estado: "firmado",
            timestampFirma,
            hashFirma
          } 
        : f
    ));

    // Simulated confirmation email to signer
    toast({
      title: "✅ Firma completada - Email de confirmación enviado",
      description: (
        <div className="mt-2 space-y-2 text-sm">
          <p><strong>Para:</strong> {firmante?.email}</p>
          <p><strong>Asunto:</strong> Confirmación de firma electrónica cualificada</p>
          <div className="p-2 bg-green-50 rounded text-xs mt-2 border border-green-200">
            <p>Estimado/a {firmante?.nombre},</p>
            <p className="mt-1">Su firma electrónica cualificada ha sido registrada correctamente.</p>
            <p className="mt-1 font-mono text-[10px] break-all">Hash: {hashFirma}</p>
            <p className="mt-1">Timestamp: {new Date(timestampFirma).toLocaleString("es-ES")}</p>
            <p className="mt-2">Recibirá el documento firmado una vez todas las partes completen la firma.</p>
          </div>
        </div>
      ),
      duration: 8000,
    });

    // Check if all have signed after this one
    const updatedFirmantes = firmantes.map(f => 
      f.id === firmanteId ? { ...f, estado: "firmado" as const } : f
    );
    
    if (updatedFirmantes.every(f => f.estado === "firmado")) {
      // Delay the "all signed" notification
      setTimeout(() => {
        toast({
          title: "🎉 Todas las firmas completadas",
          description: (
            <div className="mt-2 space-y-2 text-sm">
              <p><strong>Notificación enviada a todas las partes</strong></p>
              <div className="p-2 bg-primary/5 rounded text-xs mt-2 border">
                <p>El contrato ha sido firmado por todas las partes.</p>
                <p className="mt-1">Se ha generado el documento final con todas las firmas y sellos temporales cualificados.</p>
                <p className="mt-2 text-primary font-medium">📎 Adjunto: Contrato firmado + Certificado de evidencias</p>
              </div>
            </div>
          ),
          duration: 10000,
        });
      }, 1500);
    }
  };

  const todosHanFirmado = firmantes.every(f => f.estado === "firmado");
  const algunoHaFirmado = firmantes.some(f => f.estado === "firmado");

  const handleDescargarCertificado = () => {
    const datosContrato = {
      idExpediente: `EXP-${Date.now().toString(36).toUpperCase()}`,
      tituloContrato: "Contrato de Arras Penitenciales - Estándar Observatorio Legaltech",
      hashDocumento: `SHA256:${crypto.randomUUID().replace(/-/g, '')}${crypto.randomUUID().replace(/-/g, '').substring(0, 32)}`,
      timestampCreacion: new Date().toISOString(),
      inmueble: {
        direccion: "Calle Gran Vía 45, 3º A, 28013 Madrid",
        referenciaCatastral: "9872301VK4797S0001WX"
      },
      importeArras: 25000
    };
    
    generarCertificadoFirmasPDF(firmantes, datosContrato);
  };

  const handleFinish = () => {
    onNext({ ...data, firmantes });
    setVista("dashboard");
  };

  const getEstadoBadge = (estado: FirmanteFirma["estado"]) => {
    switch (estado) {
      case "pendiente":
        return <Badge variant="outline" className="gap-1"><Clock className="h-3 w-3" />Pendiente</Badge>;
      case "invitado":
        return <Badge variant="secondary" className="gap-1 bg-amber-100 text-amber-800"><Mail className="h-3 w-3" />Invitación enviada</Badge>;
      case "verificando":
        return <Badge variant="secondary" className="gap-1 bg-blue-100 text-blue-800 animate-pulse"><Lock className="h-3 w-3" />Verificando identidad...</Badge>;
      case "firmado":
        return <Badge className="gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />Firmado eIDAS</Badge>;
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <PenTool className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold">Firma Electrónica Cualificada</h2>
          <p className="text-muted-foreground text-sm">Perfeccionamiento legal del contrato con validez eIDAS</p>
        </div>
        <Badge variant="destructive" className="ml-auto">CRÍTICO</Badge>
      </div>

      {/* EADTrust Integration Banner */}
      <Card className="border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-transparent">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img src={eadTrustLogo} alt="EADTrust" className="h-10 object-contain" />
              <Separator orientation="vertical" className="h-10" />
              <div>
                <p className="font-semibold text-sm">Firma Electrónica Cualificada</p>
                <p className="text-xs text-muted-foreground">Proveedor de Servicios de Confianza Cualificado (QTSP)</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img src={selloEidas} alt="eIDAS" className="h-12 object-contain" />
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 text-xs"
                onClick={() => window.open("https://www.eadtrust.eu", "_blank")}
              >
                <ExternalLink className="h-3 w-3" />
                Más info
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info expandible sobre EADTrust */}
      <Card className="bg-muted/30">
        <CardHeader className="pb-2 cursor-pointer" onClick={() => setShowEADTrustInfo(!showEADTrustInfo)}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">¿Por qué usamos EADTrust?</CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {showEADTrustInfo ? "Ocultar" : "Ver más"}
            </Badge>
          </div>
        </CardHeader>
        <AnimatePresence>
          {showEADTrustInfo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <CardContent className="pt-0 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Validez Legal</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Firma electrónica cualificada con el mismo valor legal que la firma manuscrita (Art. 25.2 eIDAS)
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Identidad Verificada</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Verificación biométrica de identidad mediante video-identificación certificada
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-background border">
                    <div className="flex items-center gap-2 mb-1">
                      <Lock className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Sellado Temporal</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Timestamp cualificado que certifica la fecha y hora exacta de la firma
                    </p>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <Tabs value={firmaMode} onValueChange={(v) => setFirmaMode(v as any)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plataforma" className="gap-2">
            <Shield className="h-4 w-4" />
            Firma en Plataforma
          </TabsTrigger>
          <TabsTrigger value="externo" className="gap-2">
            <Upload className="h-4 w-4" />
            Documento Externo
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plataforma" className="mt-4 space-y-4">
          {/* Método de verificación */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Smartphone className="h-4 w-4" />
                Método de Verificación de Identidad
              </CardTitle>
              <CardDescription className="text-xs">
                Selecciona cómo recibirán los firmantes el código OTP de verificación
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button
                  variant={metodoVerificacion === "sms" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMetodoVerificacion("sms")}
                  className="flex-1 gap-2"
                >
                  <Phone className="h-4 w-4" />
                  SMS al móvil
                </Button>
                <Button
                  variant={metodoVerificacion === "email" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMetodoVerificacion("email")}
                  className="flex-1 gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Email certificado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Estado de firmas */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Estado de Firmas</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {firmantes.filter(f => f.estado === "firmado").length} / {firmantes.length} completadas
                </div>
              </div>
              <Progress 
                value={(firmantes.filter(f => f.estado === "firmado").length / firmantes.length) * 100} 
                className="h-2"
              />
            </CardHeader>
            <CardContent className="space-y-4">
              {firmantes.map((firmante) => (
                <motion.div 
                  key={firmante.id}
                  layout
                  className={`p-4 border rounded-lg transition-colors ${
                    firmante.estado === "firmado" 
                      ? "bg-green-50 border-green-200" 
                      : firmante.estado === "verificando"
                      ? "bg-blue-50 border-blue-200"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        firmante.rol === "vendedor" 
                          ? "bg-orange-100 text-orange-600" 
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{firmante.nombre}</p>
                        <p className="text-xs text-muted-foreground">
                          NIF: {firmante.nif} • {firmante.rol === "vendedor" ? "Parte Vendedora" : "Parte Compradora"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {firmante.email}
                          <Separator orientation="vertical" className="h-3" />
                          <Phone className="h-3 w-3" />
                          {firmante.telefono}
                        </div>
                        
                        {firmante.timestampFirma && (
                          <div className="mt-2 p-2 bg-green-100 rounded text-xs">
                            <p className="font-medium text-green-800">✓ Firma completada</p>
                            <p className="text-green-700 font-mono text-[10px] mt-1">
                              {firmante.hashFirma}
                            </p>
                            <p className="text-green-600 mt-1">
                              {new Date(firmante.timestampFirma).toLocaleString("es-ES")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {getEstadoBadge(firmante.estado)}
                      
                      {firmante.estado === "pendiente" && (
                        <Button
                          size="sm"
                          onClick={() => handleInvitarFirma(firmante.id)}
                          disabled={isInviting === firmante.id}
                          className="gap-1"
                        >
                          {isInviting === firmante.id ? (
                            <>
                              <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              <Send className="h-3 w-3" />
                              Invitar a firmar
                            </>
                          )}
                        </Button>
                      )}
                      
                      {firmante.estado === "invitado" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleSimularFirma(firmante.id)}
                          className="gap-1"
                        >
                          <PenTool className="h-3 w-3" />
                          Simular firma (demo)
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Aviso cuando todos han firmado */}
          <AnimatePresence>
          {todosHanFirmado && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-green-300 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-green-600 text-white">
                        <CheckCircle className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-800">¡Todas las firmas completadas!</p>
                        <p className="text-sm text-green-700">
                          El contrato ha sido firmado electrónicamente por todas las partes con validez eIDAS
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={handleDescargarCertificado}
                      className="gap-2 bg-green-700 hover:bg-green-800"
                    >
                      <Award className="h-4 w-4" />
                      Descargar Certificado
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="externo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Subir Documento Firmado Externamente
              </CardTitle>
              <CardDescription>
                Si el contrato ha sido firmado fuera de la plataforma, puedes subirlo para su ratificación y certificación
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary/50 hover:bg-muted/30 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">
                  Arrastra el PDF firmado o haz clic para seleccionar
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Se calculará el hash SHA-256 y se sellará con timestamp cualificado
                </p>
                <Button variant="outline">Seleccionar Archivo</Button>
              </div>
              
              <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-800">Importante sobre documentos externos</p>
                  <p className="text-amber-700 text-xs mt-1">
                    Los documentos firmados externamente serán ratificados y sellados, pero la verificación 
                    de identidad de los firmantes dependerá de la evidencia aportada con el documento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Footer actions */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>Atrás</Button>
        <Button 
          size="lg" 
          className="bg-green-600 hover:bg-green-700 gap-2" 
          onClick={handleFinish}
          disabled={firmaMode === "plataforma" && !algunoHaFirmado}
        >
          <CheckCircle className="h-4 w-4" />
          {todosHanFirmado ? "Crear Expediente Firmado" : "Crear Expediente"}
        </Button>
      </div>
    </motion.div>
  );
};
