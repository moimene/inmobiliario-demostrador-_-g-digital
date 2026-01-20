import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Comunicacion } from "@/types/arras";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Props {
    mensajes: Comunicacion[];
}

export const ComunicacionesEstructuradas = ({ mensajes }: Props) => {
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
                                <div key={msg.id} className={`flex ${msg.remitente === 'vendedor' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg p-3 ${msg.remitente === 'vendedor'
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
            {/* Input area stub */}
            <div className="p-4 border-t">
                <div className="h-10 bg-muted/20 rounded border-2 border-dashed flex items-center justify-center text-muted-foreground text-sm">
                    Área de composición de mensaje (Stub)
                </div>
            </div>
        </Card>
    );
};
