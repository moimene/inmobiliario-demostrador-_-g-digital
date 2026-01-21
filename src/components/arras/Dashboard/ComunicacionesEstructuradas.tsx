import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comunicacion } from "@/types/arras";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, FileText, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Props {
    mensajes: Comunicacion[];
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
    const [mensaje, setMensaje] = useState("");
    const [formatoSeleccionado, setFormatoSeleccionado] = useState<string | null>(null);

    const handleSeleccionarFormato = (formato: typeof FORMATOS_MENSAJE[0]) => {
        setMensaje(formato.plantilla);
        setFormatoSeleccionado(formato.id);
        if (formato.id !== "texto_libre") {
            toast.info(`Plantilla "${formato.label}" cargada`);
        }
    };

    const handleEnviar = () => {
        if (!mensaje.trim()) {
            toast.warning("Escribe un mensaje antes de enviar");
            return;
        }
        toast.success("Mensaje enviado y certificado con sello eIDAS");
        setMensaje("");
        setFormatoSeleccionado(null);
    };

    return (
        <Card className="h-[600px] flex flex-col">
            <CardHeader>
                <CardTitle>Canal Seguro de Comunicaciones</CardTitle>
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
                                        <p className="text-sm">{msg.mensaje}</p>
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
            {/* Área de composición con menú desplegable */}
            <div className="p-4 border-t space-y-3">
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
