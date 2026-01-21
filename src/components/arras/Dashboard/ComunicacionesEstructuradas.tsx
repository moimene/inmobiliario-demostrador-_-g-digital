import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comunicacion, TipoComunicacion, TipoRolUsuario, Documento } from "@/types/arras";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileText, ChevronDown, Paperclip, X, File } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useArras } from "@/contexts/ArrasContext";
import { Badge } from "@/components/ui/badge";
import eidasIcon from "@/assets/eidas-icon.png";

interface Props {
    mensajes: Comunicacion[];
}

interface ArchivoAdjunto {
    id: string;
    nombre: string;
    tipo: string;
    tamaño: number;
}

const FORMATOS_MENSAJE = [
    {
        id: "solicitud_doc",
        label: "Solicitud de Documentación",
        plantilla: "Estimado/a,\n\nPor la presente, le solicitamos la siguiente documentación requerida para continuar con el proceso de arras:\n\n- [Documento 1]\n- [Documento 2]\n\nQuedamos a la espera de su respuesta.\n\nAtentamente,"
    },
    {
        id: "envio_doc",
        label: "Envío de Documentación",
        plantilla: "Estimado/a,\n\nAdjuntamos la documentación solicitada:\n\n- [Documento 1]\n- [Documento 2]\n\nQuedamos a su disposición para cualquier aclaración.\n\nAtentamente,"
    },
    {
        id: "cambios_novaciones",
        label: "Cambios y Novaciones",
        plantilla: "Estimado/a,\n\nLe comunicamos los siguientes cambios propuestos en las condiciones del contrato de arras:\n\n1. [Descripción del cambio]\n2. [Motivo del cambio]\n\nSolicitamos su conformidad o comentarios al respecto.\n\nAtentamente,"
    },
    {
        id: "reclamaciones",
        label: "Reclamaciones",
        plantilla: "Estimado/a,\n\nPor la presente, deseamos manifestar nuestra reclamación respecto a:\n\n[Descripción de la reclamación]\n\nSolicitamos una respuesta formal en el plazo establecido.\n\nAtentamente,"
    },
    {
        id: "texto_libre",
        label: "Texto Libre",
        plantilla: ""
    },
    {
        id: "solicitud_reunion",
        label: "Solicitud de Reunión",
        plantilla: "Estimado/a,\n\nSolicitamos la convocatoria de una reunión para tratar los siguientes puntos:\n\n- [Tema 1]\n- [Tema 2]\n\nFechas propuestas:\n- [Fecha y hora 1]\n- [Fecha y hora 2]\n\nQuedamos a la espera de confirmación.\n\nAtentamente,"
    },
];

export const ComunicacionesEstructuradas = ({ mensajes }: Props) => {
    const { addComunicacion, usuarioActual } = useArras();
    const [mensaje, setMensaje] = useState("");
    const [formatoSeleccionado, setFormatoSeleccionado] = useState<string | null>(null);
    const [adjuntos, setAdjuntos] = useState<ArchivoAdjunto[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSeleccionarFormato = (formato: typeof FORMATOS_MENSAJE[0]) => {
        setMensaje(formato.plantilla);
        setFormatoSeleccionado(formato.id);
        if (formato.id !== "texto_libre") {
            toast.info(`Plantilla "${formato.label}" cargada`);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const nuevosAdjuntos: ArchivoAdjunto[] = Array.from(files).map(file => ({
            id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            nombre: file.name,
            tipo: file.type,
            tamaño: file.size,
        }));

        setAdjuntos(prev => [...prev, ...nuevosAdjuntos]);
        toast.success(`${files.length} archivo(s) adjuntado(s)`);
        
        // Reset input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleRemoveAdjunto = (id: string) => {
        setAdjuntos(prev => prev.filter(a => a.id !== id));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const handleEnviar = () => {
        if (!mensaje.trim() && adjuntos.length === 0) {
            toast.warning("Escribe un mensaje o adjunta archivos antes de enviar");
            return;
        }

        // Mapear formato seleccionado a TipoComunicacion
        const getTipoComunicacion = (): TipoComunicacion => {
            switch (formatoSeleccionado) {
                case "reclamaciones": return "RECLAMACION";
                case "solicitud_doc": return "SOLICITUD_DOCUMENTACION";
                case "envio_doc": return "ENTREGA_DOCUMENTACION";
                case "cambios_novaciones": return "SOLICITUD_MODIFICACION_TERMINOS";
                case "solicitud_reunion": return "CONVOCATORIA_NOTARIA";
                default: return "MENSAJE_GENERAL";
            }
        };

        // Mapear usuario actual a TipoRolUsuario
        const getRemitente = (): TipoRolUsuario => {
            return usuarioActual.toUpperCase() as TipoRolUsuario;
        };

        // Añadir comunicación al contexto
        addComunicacion({
            contratoId: "arras-001", // ID del contrato actual
            tipo: getTipoComunicacion(),
            remitente: getRemitente(),
            destinatarios: [getRemitente() === "VENDEDOR" ? "COMPRADOR" : "VENDEDOR"] as TipoRolUsuario[],
            mensaje: mensaje,
            leido: false,
            relevante: true,
        });

        toast.success("Mensaje enviado y certificado con sello eIDAS", {
            description: adjuntos.length > 0 ? `${adjuntos.length} archivo(s) adjuntado(s)` : undefined
        });
        
        setMensaje("");
        setFormatoSeleccionado(null);
        setAdjuntos([]);
    };

    return (
        <Card className="h-[600px] flex flex-col">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Canal Seguro de Comunicaciones</CardTitle>
                    <img src={eidasIcon} alt="eIDAS Certified" className="h-10 w-auto" />
                </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full p-4">
                    <div className="space-y-4">
                        {mensajes.length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">
                                Inicia una conversación segura.
                            </p>
                        ) : (
                            mensajes.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.remitente === 'VENDEDOR' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg p-3 ${msg.remitente === 'VENDEDOR'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-muted'
                                        }`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.mensaje}</p>
                                        {msg.adjuntos && msg.adjuntos.length > 0 && (
                                            <div className="mt-2 space-y-1">
                                                {msg.adjuntos.map((adj, idx) => (
                                                    <div key={idx} className="flex items-center gap-1 text-xs opacity-80">
                                                        <Paperclip className="h-3 w-3" />
                                                        <span>{typeof adj === 'string' ? adj : adj.nombre || 'Documento'}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <div className="flex items-center justify-between mt-2 gap-4">
                                            <span className="text-[10px] opacity-70">
                                                {format(new Date(msg.timestamp), "HH:mm", { locale: es })}
                                            </span>
                                            {msg.evidencia && (
                                                <span className="text-[10px] font-mono bg-black/10 px-1 rounded" title="Hash Certificado">
                                                    #TSA
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            
            {/* Área de composición con menú desplegable y adjuntos */}
            <div className="p-4 border-t space-y-3">
                {/* Adjuntos seleccionados */}
                {adjuntos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {adjuntos.map((adjunto) => (
                            <Badge 
                                key={adjunto.id} 
                                variant="secondary" 
                                className="flex items-center gap-1 pr-1"
                            >
                                <File className="h-3 w-3" />
                                <span className="max-w-[120px] truncate">{adjunto.nombre}</span>
                                <span className="text-[10px] opacity-70">({formatFileSize(adjunto.tamaño)})</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-4 w-4 ml-1 hover:bg-destructive/20"
                                    onClick={() => handleRemoveAdjunto(adjunto.id)}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                {formatoSeleccionado 
                                    ? FORMATOS_MENSAJE.find(f => f.id === formatoSeleccionado)?.label 
                                    : "Seleccionar formato"}
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56 bg-popover z-50">
                            {FORMATOS_MENSAJE.map((formato) => (
                                <DropdownMenuItem
                                    key={formato.id}
                                    onClick={() => handleSeleccionarFormato(formato)}
                                    className="cursor-pointer"
                                >
                                    {formato.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Botón de adjuntar archivos */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xls,.xlsx"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        title="Adjuntar archivos"
                    >
                        <Paperclip className="h-4 w-4" />
                    </Button>
                </div>
                
                <div className="flex gap-2">
                    <Textarea
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        placeholder="Escribe tu mensaje o selecciona un formato..."
                        className="min-h-[80px] resize-none"
                    />
                    <Button 
                        onClick={handleEnviar}
                        size="icon"
                        className="h-auto"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};