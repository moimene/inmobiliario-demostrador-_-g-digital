import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
    Gavel, 
    Calendar, 
    FileText, 
    Phone, 
    Mail, 
    MapPin, 
    Upload, 
    CheckCircle2, 
    Clock, 
    Send,
    Building2,
    User,
    MessageSquare,
    FileCheck,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import eidasIcon from "@/assets/eidas-icon.png";

// Mock de datos de notaría
const notariaMock = {
    nombre: "D. José María Fernández López",
    notaria: "Notaría Fernández & Asociados",
    direccion: "Calle Gran Vía 45, 3º Izq. 28013 Madrid",
    telefono: "+34 91 523 4567",
    email: "notaria@fernandez-asociados.es",
    colegiado: "Nº 1.234 del Colegio Notarial de Madrid",
};

// Mock de documentos requeridos por notaría
const documentosNotariales = [
    { id: "doc-1", nombre: "Nota Simple Actualizada", estado: "pendiente", requerido: true },
    { id: "doc-2", nombre: "Certificado de Eficiencia Energética", estado: "subido", requerido: true },
    { id: "doc-3", nombre: "Último recibo de IBI", estado: "validado", requerido: true },
    { id: "doc-4", nombre: "Certificado de Comunidad (derramas)", estado: "pendiente", requerido: true },
    { id: "doc-5", nombre: "Cédula de Habitabilidad", estado: "subido", requerido: false },
];

export const NotariaGestion = () => {
    const [mensajeNotaria, setMensajeNotaria] = useState("");
    const [notariaAsignada, setNotariaAsignada] = useState(false);

    const handleEnviarMensaje = () => {
        if (!mensajeNotaria.trim()) {
            toast.warning("Escribe un mensaje antes de enviar");
            return;
        }
        toast.success("Mensaje enviado a la notaría", {
            description: "Recibirás respuesta en un plazo de 24-48h"
        });
        setMensajeNotaria("");
    };

    const handleAsignarNotaria = () => {
        setNotariaAsignada(true);
        toast.success("Notaría asignada correctamente", {
            description: notariaMock.notaria
        });
    };

    const getEstadoBadge = (estado: string) => {
        switch (estado) {
            case "validado":
                return <Badge className="bg-green-600 text-white gap-1"><CheckCircle2 className="h-3 w-3" />Validado</Badge>;
            case "subido":
                return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />En revisión</Badge>;
            default:
                return <Badge variant="outline" className="gap-1"><AlertCircle className="h-3 w-3" />Pendiente</Badge>;
        }
    };

    const docsPendientes = documentosNotariales.filter(d => d.estado === "pendiente").length;
    const docsValidados = documentosNotariales.filter(d => d.estado === "validado").length;

    return (
        <div className="space-y-6">
            {/* Header con logo eIDAS */}
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center gap-3">
                    <Gavel className="h-6 w-6 text-primary" />
                    <div>
                        <h3 className="font-semibold">Gestión Notarial</h3>
                        <p className="text-sm text-muted-foreground">Proceso certificado bajo normativa eIDAS</p>
                    </div>
                </div>
                <img src={eidasIcon} alt="eIDAS Certified" className="h-12 w-auto" />
            </div>

            {/* Primera fila: Notaría Asignada + Cita de Firma */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Gavel className="w-5 h-5 text-primary" />
                            Notaría Asignada
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {!notariaAsignada ? (
                            <div className="text-center py-6">
                                <p className="font-semibold text-lg">Pendiente de Asignación</p>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Elige una notaría de la red de confianza o invita a una nueva.
                                </p>
                                <Button variant="outline" onClick={handleAsignarNotaria}>
                                    Seleccionar Notaría
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-primary/10 rounded-full">
                                        <User className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{notariaMock.nombre}</p>
                                        <p className="text-sm text-muted-foreground">{notariaMock.colegiado}</p>
                                    </div>
                                </div>
                                <Separator />
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <span>{notariaMock.notaria}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground" />
                                        <span>{notariaMock.direccion}</span>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm" className="w-full">
                                    Cambiar Notaría
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-primary" />
                            Cita de Firma
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-6">
                            <p className="text-muted-foreground text-sm mb-4">
                                La fecha de firma debe ser acordada una vez validada la documentación.
                            </p>
                            <Button disabled={!notariaAsignada || docsPendientes > 0}>
                                {docsPendientes > 0 ? `${docsPendientes} docs pendientes` : "Solicitar Cita"}
                            </Button>
                            {docsPendientes > 0 && notariaAsignada && (
                                <p className="text-xs text-muted-foreground mt-2">
                                    Completa la documentación para solicitar cita
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Segunda fila: Documentación Notarial + Contacto */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Panel de Documentación Notarial */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileCheck className="w-5 h-5 text-primary" />
                                    Documentación Notarial
                                </CardTitle>
                                <CardDescription>
                                    Documentos requeridos para la escritura pública
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-xs">
                                {docsValidados}/{documentosNotariales.length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {documentosNotariales.map((doc) => (
                                <div 
                                    key={doc.id} 
                                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm font-medium">{doc.nombre}</p>
                                            {doc.requerido && (
                                                <span className="text-[10px] text-red-500">Obligatorio</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getEstadoBadge(doc.estado)}
                                        {doc.estado === "pendiente" && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <Upload className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-4" />
                        <Button variant="outline" className="w-full gap-2">
                            <Upload className="h-4 w-4" />
                            Subir Documento Adicional
                        </Button>
                    </CardContent>
                </Card>

                {/* Panel de Contacto con Notaría */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-primary" />
                            Contacto con Notaría
                        </CardTitle>
                        <CardDescription>
                            Comunicación directa y certificada
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {notariaAsignada ? (
                            <>
                                {/* Datos de contacto */}
                                <div className="p-3 bg-muted/30 rounded-lg space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="h-4 w-4 text-primary" />
                                        <a href={`tel:${notariaMock.telefono}`} className="hover:underline">
                                            {notariaMock.telefono}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="h-4 w-4 text-primary" />
                                        <a href={`mailto:${notariaMock.email}`} className="hover:underline">
                                            {notariaMock.email}
                                        </a>
                                    </div>
                                </div>

                                <Separator />

                                {/* Formulario de mensaje */}
                                <div className="space-y-3">
                                    <p className="text-sm font-medium">Enviar mensaje certificado</p>
                                    <Textarea
                                        value={mensajeNotaria}
                                        onChange={(e) => setMensajeNotaria(e.target.value)}
                                        placeholder="Escribe tu consulta o solicitud..."
                                        className="min-h-[100px] resize-none"
                                    />
                                    <div className="flex gap-2">
                                        <Button 
                                            onClick={handleEnviarMensaje}
                                            className="flex-1 gap-2"
                                        >
                                            <Send className="h-4 w-4" />
                                            Enviar Mensaje
                                        </Button>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground text-center">
                                        Los mensajes quedan certificados con sello de tiempo eIDAS
                                    </p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-8">
                                <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                                <p className="text-sm text-muted-foreground">
                                    Asigna una notaría para habilitar el canal de comunicación
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};