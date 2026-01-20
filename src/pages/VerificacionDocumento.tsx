import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ShieldCheck, FileText, Home, Calendar, User, Hash, Download, ArrowLeft } from "lucide-react";
import logoFaciliteCasa from "@/assets/logofaciliteaCasa.webp";
import selloEidas from "@/assets/sello_eidas.png";
import selloEadTrust from "@/assets/sello_eadtrust.png";
import firmaEadTrust from "@/assets/firma_eadtrust.png";

const VerificacionDocumento = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data basado en el ID (en producción vendría de base de datos)
  const documentoVerificado = {
    id: id || "unknown",
    tipo: "Acta de Estado del Inmueble",
    tipoActa: "Entrega Inicial",
    estado: "Firmado y Certificado",
    fechaCertificacion: new Date().toLocaleString("es-ES"),
    inmueble: "Calle Alcalá 455, 3º B, 28013 Madrid",
    parteEntregadora: {
      nombre: "Carlos Rodríguez Martín",
      nif: "12345678A"
    },
    parteReceptora: {
      nombre: "Ana García López",
      nif: "87654321B"
    },
    evidencias: 10,
    hashDocumento: "a3b5c8d9e2f1a4b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0",
    sellosTemporales: [
      {
        parte: "Parte Entregadora",
        fecha: new Date().toLocaleString("es-ES"),
        timestamp: "2025-11-22T10:30:45.123Z"
      },
      {
        parte: "Parte Receptora",
        fecha: new Date().toLocaleString("es-ES"),
        timestamp: "2025-11-22T10:32:18.456Z"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoFaciliteCasa} alt="FaciliteCasas" className="h-10" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Verificación de Documentos</span>
              </div>
            </div>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Verification Status */}
        <Card className="mb-6 border-2 border-trust-green bg-trust-green/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-trust-green/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-trust-green" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
                  Documento Verificado
                  <Badge variant="secondary" className="bg-trust-green text-white">
                    Válido
                  </Badge>
                </h2>
                <p className="text-muted-foreground">
                  Este documento ha sido verificado correctamente en el registro de EAD Trust como Proveedor Cualificado de Servicios de Confianza (QTSP).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Document Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-accent" />
                  Detalles del Documento
                </CardTitle>
                <CardDescription>Información certificada con sello de tiempo cualificado eIDAS</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <img src={selloEidas} alt="Sello eIDAS" className="h-12" />
                <img src={selloEadTrust} alt="EAD Trust" className="h-6" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Document Type */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Tipo de Documento
                </div>
                <p className="font-semibold text-foreground">{documentoVerificado.tipo}</p>
                <Badge variant="outline">{documentoVerificado.tipoActa}</Badge>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Fecha de Certificación
                </div>
                <p className="font-semibold text-foreground">{documentoVerificado.fechaCertificacion}</p>
              </div>
            </div>

            {/* Property */}
            <div className="bg-accent/5 border border-accent/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Home className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-foreground">Inmueble</h3>
              </div>
              <p className="text-sm text-foreground">{documentoVerificado.inmueble}</p>
            </div>

            {/* Parties */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-foreground">Parte Entregadora</h4>
                </div>
                <p className="text-sm font-medium text-foreground">{documentoVerificado.parteEntregadora.nombre}</p>
                <p className="text-xs text-muted-foreground">NIF: {documentoVerificado.parteEntregadora.nif}</p>
              </div>

              <div className="border border-border p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <User className="h-4 w-4 text-accent" />
                  <h4 className="font-semibold text-foreground">Parte Receptora</h4>
                </div>
                <p className="text-sm font-medium text-foreground">{documentoVerificado.parteReceptora.nombre}</p>
                <p className="text-xs text-muted-foreground">NIF: {documentoVerificado.parteReceptora.nif}</p>
              </div>
            </div>

            {/* Evidence Count */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Evidencias Multimedia Certificadas</p>
                  <p className="text-2xl font-bold text-foreground">{documentoVerificado.evidencias}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-trust-green" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Digital Signatures */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Firmas Electrónicas Avanzadas</CardTitle>
            <CardDescription>Certificadas con sello de tiempo cualificado eIDAS</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {documentoVerificado.sellosTemporales.map((sello, index) => (
              <div key={index} className="border-2 border-trust-green bg-trust-green/5 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-trust-green flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{sello.parte}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Firmado: {sello.fecha}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Firma avanzada mediante OTP • Sello de tiempo cualificado: {sello.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* EAD Trust Signature */}
            <div className="flex justify-center pt-4 border-t border-border">
              <img src={firmaEadTrust} alt="Firma EAD Trust" className="h-16 object-contain" />
            </div>
          </CardContent>
        </Card>

        {/* Cryptographic Hash */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              Hash Criptográfico del Documento
            </CardTitle>
            <CardDescription>SHA-256 - Garantiza la integridad del documento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/50 p-4 rounded-lg font-mono text-xs break-all border border-border">
              {documentoVerificado.hashDocumento}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Este hash garantiza que el documento no ha sido modificado desde su certificación. Cualquier alteración cambiaría el hash completamente.
            </p>
          </CardContent>
        </Card>

        {/* Legal Notice */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-foreground">Validez Legal del Documento</p>
                <p className="text-muted-foreground">
                  Este documento ha sido certificado por <strong>EAD Trust</strong>, Proveedor Cualificado de Servicios de Confianza inscrito en los registros administrativos correspondientes.
                </p>
                <p className="text-muted-foreground">
                  Las firmas electrónicas avanzadas y los sellos de tiempo cualificados aplicados tienen validez legal de conformidad con el Reglamento (UE) n.º 910/2014 (eIDAS) y la Ley 6/2020 de servicios electrónicos de confianza.
                </p>
                <p className="text-muted-foreground">
                  El documento es admisible como prueba en procedimientos judiciales según el artículo 326.4 de la Ley de Enjuiciamiento Civil.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button className="flex-1" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Descargar Documento Certificado
          </Button>
          <Link to="/" className="flex-1">
            <Button variant="outline" className="w-full" size="lg">
              Volver al Inicio
            </Button>
          </Link>
        </div>

        {/* Document ID */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            ID de Verificación: <span className="font-mono font-semibold">{documentoVerificado.id}</span>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background/95 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <img src={selloEadTrust} alt="EAD Trust" className="h-6" />
              <p className="text-sm text-muted-foreground">
                Verificación proporcionada por EAD Trust - QTSP
              </p>
            </div>
            <div className="flex items-center gap-2">
              <img src={selloEidas} alt="eIDAS" className="h-8" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VerificacionDocumento;
