import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Documento } from "@/types/arras";
import { FileText, Download, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
    documentos: Documento[];
}

export const InventarioDocumental = ({ documentos }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Inventario Documental Certificado</span>
                    <Badge variant="outline" className="text-xs">
                        {documentos.length} Documentos
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {documentos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        No hay documentos en el inventario.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {documentos.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-sm">{doc.nombre}</p>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className="text-[10px] h-5">{doc.tipo}</Badge>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(doc.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="h-4 w-4 text-green-600" />
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <Download className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};
