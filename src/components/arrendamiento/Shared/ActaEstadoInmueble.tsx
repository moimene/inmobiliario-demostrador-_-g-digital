import { Card } from "@/components/ui/card";
import { Check, FileText, Home, Camera, Clock } from "lucide-react";

import selloEidas from "@/assets/sello_eidas.png";
import selloEadTrust from "@/assets/sello_eadtrust.png";
import firmaEadTrust from "@/assets/firma_eadtrust.png";
import { QRCodeSVG } from "qrcode.react";
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
interface ActaEstadoInmuebleProps {
  parteEntregadora: Parte;
  parteReceptora: Parte;
  parteInteresada?: Parte;
  direccionInmueble: string;
  tipoActa: string;
  evidencias: EvidenciaArchivo[];
  firmadoPorEntregadora: boolean;
  firmadoPorReceptora: boolean;
}
export const ActaEstadoInmueble = ({
  parteEntregadora,
  parteReceptora,
  parteInteresada,
  direccionInmueble,
  tipoActa,
  evidencias,
  firmadoPorEntregadora,
  firmadoPorReceptora
}: ActaEstadoInmuebleProps) => {
  // Generate stable document ID based on acta data
  const documentoId = `acta-${parteEntregadora.nif}-${parteReceptora.nif}-${new Date().toISOString().split('T')[0]}`.toLowerCase().replace(/[^a-z0-9-]/g, '');

  return <Card className="p-8 space-y-8 border-2 border-accent/20 bg-background">

    {/* Header with Branding */}
    <div className="flex items-start justify-between border-b-2 border-accent/20 pb-6">
      <div className="flex-1">
        <div className="text-2xl font-bold text-primary mb-4">InmoServTech</div>
        <h2 className="text-2xl font-bold text-primary mb-1">
          ACTA DE ESTADO DEL INMUEBLE
        </h2>
        <p className="text-sm text-muted-foreground">
          Certificado expedido por EAD Trust en su condición de Prestador Cualificado de Servicios de Confianza Electrónicos inscrito en los Registros Administrativos correspondientes
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {tipoActa}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <img src={selloEidas} alt="Sello eIDAS" className="h-16" />
        <img src={selloEadTrust} alt="EAD Trust" className="h-8" />
      </div>
    </div>

    {/* Inmueble Info */}
    <div className="bg-accent/5 border border-accent/20 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <Home className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-foreground">Inmueble Objeto de Certificación</h3>
      </div>
      <p className="text-sm text-foreground">{direccionInmueble}</p>
    </div>

    {/* Parties Information */}
    <div className="grid md:grid-cols-2 gap-6">

      {/* Parte Entregadora */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <FileText className="h-4 w-4 text-primary" />
          </div>
          <h4 className="font-semibold text-foreground">Parte Entregadora</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Nombre:</span>
            <p className="font-medium text-foreground">{parteEntregadora.nombre}</p>
          </div>
          <div>
            <span className="text-muted-foreground">NIF:</span>
            <p className="font-medium text-foreground">{parteEntregadora.nif}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium text-foreground">{parteEntregadora.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Teléfono:</span>
            <p className="font-medium text-foreground">{parteEntregadora.telefono}</p>
          </div>
        </div>
      </div>

      {/* Parte Receptora */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center">
            <FileText className="h-4 w-4 text-accent" />
          </div>
          <h4 className="font-semibold text-foreground">Parte Receptora</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">Nombre:</span>
            <p className="font-medium text-foreground">{parteReceptora.nombre}</p>
          </div>
          <div>
            <span className="text-muted-foreground">NIF:</span>
            <p className="font-medium text-foreground">{parteReceptora.nif}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>
            <p className="font-medium text-foreground">{parteReceptora.email}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Teléfono:</span>
            <p className="font-medium text-foreground">{parteReceptora.telefono}</p>
          </div>
        </div>

        {/* Parte Interesada */}
        {parteInteresada && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <FileText className="h-4 w-4 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground">Parte Interesada (Testigo/Agente)</h4>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-muted-foreground">Nombre:</span>
                <p className="font-medium text-foreground">{parteInteresada.nombre}</p>
              </div>
              <div>
                <span className="text-muted-foreground">NIF:</span>
                <p className="font-medium text-foreground">{parteInteresada.nif}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span>
                <p className="font-medium text-foreground">{parteInteresada.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Teléfono:</span>
                <p className="font-medium text-foreground">{parteInteresada.telefono}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Certified Inventory */}
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Camera className="h-5 w-5 text-accent" />
        <h3 className="font-semibold text-foreground">Inventario Certificado de Evidencias</h3>
      </div>

      {/* Announcement Screenshot (if exists) */}
      {evidencias.some(e => e.estancia === "Anuncio Publicado") && (
        <div className="bg-accent/10 border-2 border-accent/30 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Camera className="h-5 w-5 text-accent" />
            <h4 className="font-semibold text-foreground">Captura Certificada del Anuncio Publicado</h4>
          </div>
          {evidencias.filter(e => e.estancia === "Anuncio Publicado").map((evidencia, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-muted/30 p-3 rounded border border-accent/20">
                <p className="text-sm font-medium text-foreground mb-1">📸 {evidencia.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  Hash: {evidencia.hash} • Timestamp: {new Date(evidencia.timestamp).toLocaleString("es-ES")}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Check className="h-4 w-4 text-trust-green" />
                  <span className="text-xs text-trust-green font-medium">Certificada con sello de tiempo cualificado</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {evidencias.filter(e => e.tipo === "foto" && e.estancia !== "Anuncio Publicado").map((evidencia, index) => <div key={index} className="relative group rounded-lg overflow-hidden border-2 border-accent/20 hover:border-accent transition-smooth">
          <img src={`/images/${evidencia.nombre}`} alt={`${evidencia.estancia} - ${evidencia.nombre}`} className="w-full h-32 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth">
            <div className="absolute bottom-0 left-0 right-0 p-2">
              <p className="text-white text-xs font-semibold">{evidencia.estancia}</p>
              <div className="flex items-center gap-1 mt-1">
                <Check className="h-3 w-3 text-trust-green" />
                <span className="text-white/80 text-[10px]">Certificada</span>
              </div>
            </div>
          </div>
        </div>)}
      </div>

      {/* Evidence Details List */}
      <div className="space-y-2">
        {evidencias.map((evidencia, index) => <div key={index} className="flex items-center justify-between bg-muted/30 p-3 rounded border border-border hover:border-accent/50 transition-smooth">
          <div className="flex items-center gap-3 flex-1">
            <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center">
              <Camera className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{evidencia.nombre}</p>
              <p className="text-xs text-muted-foreground">
                {evidencia.estancia} • Hash: {evidencia.hash.substring(0, 16)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(evidencia.timestamp).toLocaleString("es-ES")}
            </span>
            <Check className="h-4 w-4 text-trust-green ml-2" />
          </div>
        </div>)}
      </div>
    </div>

    {/* Digital Signatures Section */}
    <div className="space-y-4 border-t-2 border-accent/20 pt-6">
      <h3 className="font-semibold text-foreground">Firmas Realizadas en el Proceso                    </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className={`border-2 rounded-lg p-4 ${firmadoPorEntregadora ? "border-trust-green bg-trust-green/5" : "border-dashed border-muted-foreground"}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">{parteEntregadora.nombre}</p>
            {firmadoPorEntregadora && <Check className="h-5 w-5 text-trust-green" />}
          </div>
          {firmadoPorEntregadora ? <div className="space-y-2">
            <img src={firmaEadTrust} alt="Firma EAD Trust" className="h-12" />
            <p className="text-xs text-muted-foreground">
              Firmado: {new Date().toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground">
              Firma avanzada mediante OTP • Sello de tiempo cualificado EAD Trust
            </p>
          </div> : <p className="text-xs text-muted-foreground">Pendiente de firma</p>}
        </div>

        <div className={`border-2 rounded-lg p-4 ${firmadoPorReceptora ? "border-trust-green bg-trust-green/5" : "border-dashed border-muted-foreground"}`}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">{parteReceptora.nombre}</p>
            {firmadoPorReceptora && <Check className="h-5 w-5 text-trust-green" />}
          </div>
          {firmadoPorReceptora ? <div className="space-y-2">
            <img src={firmaEadTrust} alt="Firma EAD Trust" className="h-12" />
            <p className="text-xs text-muted-foreground">
              Firmado: {new Date().toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground">
              Firma avanzada mediante OTP • Sello de tiempo cualificado EAD Trust
            </p>
          </div> : <p className="text-xs text-muted-foreground">Pendiente de firma</p>}
        </div>
      </div>
    </div>

    {/* Legal Footer */}
    <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg text-xs text-muted-foreground space-y-2">
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="flex-1 space-y-2">
          <p className="font-semibold text-foreground">Efectos legales del documento y las evidencias generadas              </p>
          <p>
            Este Acta de Estado del Inmueble ha sido generada por <strong>EAD Trust</strong>, Proveedor de Servicios de Confianza,
            y certificada con sello de tiempo cualificado eIDAS por <strong>EAD Trust g-digital</strong>.
          </p>
          <p>
            Las firmas electrónicas avanzadas aplicadas mediante OTP, junto con las evidencias certificadas con sello de tiempo cualificado,
            tienen validez legal de conformidad con el Reglamento (UE) n.º 910/2014 (eIDAS) y la Ley 6/2020 de servicios electrónicos de confianza.
          </p>
          <p>
            El documento es admisible como prueba en procedimientos judiciales según el artículo 326.4 de la Ley de Enjuiciamiento Civil.
          </p>
        </div>

        {/* QR Code for verification */}
        <div className="flex flex-col items-center gap-2 bg-background p-3 rounded-lg border border-primary/20">
          <QRCodeSVG
            value={`${window.location.origin}/verificacion/${documentoId}`}
            size={120}
            level="H"
            includeMargin={true}
          />
          <p className="text-[10px] text-center font-semibold text-foreground">
            Verificar en EAD Trust
          </p>
          <p className="text-[9px] text-center text-muted-foreground">
            Escanea para descargar<br />desde el QTSP
          </p>
        </div>
      </div>

      {/* EAD Trust Signature */}
      <div className="flex justify-center mt-4 pt-4 border-t border-primary/20">
        <img src="/images/firma_eadtrust-2.png" alt="Firma EAD Trust con Sello de Tiempo Cualificado" className="h-20 object-contain" />
      </div>
    </div>
  </Card>;
};
