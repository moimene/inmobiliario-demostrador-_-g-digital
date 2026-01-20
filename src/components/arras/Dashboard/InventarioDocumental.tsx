import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemInventario, CategoriaDocumento, BLOQUES_INVENTARIO } from "@/types/arras";
import { FileText, Download, ShieldCheck, Clock, XCircle, Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
    inventario: ItemInventario[];
}

const estadoConfig = {
    PENDIENTE: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", label: "Pendiente" },
    SUBIDO: { icon: Upload, color: "text-blue-600", bg: "bg-blue-100", label: "Subido" },
    VALIDADO: { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-100", label: "Validado" },
    RECHAZADO: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Rechazado" },
};

const categoriaLabels: Record<CategoriaDocumento, string> = {
    inmueble: "Inmueble",
    identidad: "Identidad",
    contractual: "Contractual",
    notaria: "Notaría",
};

export const InventarioDocumental = ({ inventario }: Props) => {
    const porCategoria = inventario.reduce((acc, item) => {
        if (!acc[item.categoria]) acc[item.categoria] = [];
        acc[item.categoria].push(item);
        return acc;
    }, {} as Record<CategoriaDocumento, ItemInventario[]>);

    const totalDocs = inventario.length;
    const validados = inventario.filter(d => d.estado === "VALIDADO").length;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Inventario Documental</span>
                    <Badge variant="outline" className="text-xs">
                        {validados}/{totalDocs} Validados
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {inventario.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        No hay documentos en el inventario.
                    </div>
                ) : (
                    <div className="space-y-6">
                        {(Object.keys(categoriaLabels) as CategoriaDocumento[]).map(cat => {
                            const items = porCategoria[cat] || [];
                            if (items.length === 0) return null;
                            
                            return (
                                <div key={cat}>
                                    <h4 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wide">
                                        {categoriaLabels[cat]}
                                    </h4>
                                    <div className="space-y-2">
                                        {items.map((item) => {
                                            const config = estadoConfig[item.estado];
                                            const Icon = config.icon;
                                            
                                            return (
                                                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="h-5 w-5 text-muted-foreground" />
                                                        <div>
                                                            <p className="font-medium text-sm">{item.tipo.replace(/_/g, " ")}</p>
                                                            <div className="flex items-center gap-2">
                                                                <Badge variant="secondary" className={`text-[10px] h-5 ${config.bg} ${config.color}`}>
                                                                    <Icon className="h-3 w-3 mr-1" />
                                                                    {config.label}
                                                                </Badge>
                                                                {item.fechaSubida && (
                                                                    <span className="text-xs text-muted-foreground">
                                                                        {new Date(item.fechaSubida).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {item.estado === "PENDIENTE" ? (
                                                            <Button variant="outline" size="sm">Subir</Button>
                                                        ) : (
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <Download className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
