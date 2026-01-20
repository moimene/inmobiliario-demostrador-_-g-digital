import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FirmasRatificaciones } from "./FirmasRatificaciones";
import { InventarioDocumental } from "./InventarioDocumental";
import { ComunicacionesEstructuradas } from "./ComunicacionesEstructuradas";
import { NotariaGestion } from "./NotariaGestion";
import { CertificadoEventos } from "./CertificadoEventos";
import { faseLabelsArras } from "@/data/arrasBotFlow";

export const ExpedienteArrasDashboard = () => {
    const { expediente, usuarioActual } = useArras();
    const { id, fase, partes, inmueble } = expediente;

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl animate-fade-in">
            {/* Header del Expediente */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-muted-foreground">Expediente {id}</Badge>
                        <Badge variant="secondary">{faseLabelsArras[fase]}</Badge>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary">
                        {inmueble.direccion}
                    </h1>
                    <p className="text-muted-foreground">
                        {partes.vendedor.nombre} • {partes.comprador.nombre}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Actions related to current user */}
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Vista actual</p>
                        <p className="font-semibold capitalize">{usuarioActual}</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Timeline & Certifications */}
                <div className="lg:col-span-1 space-y-6">
                    <CertificadoEventos events={expediente.eventos} />

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Próximos Pasos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Dynamic Next Steps Logic could go here */}
                            <p className="text-sm text-muted-foreground">
                                Esperando confirmación de {faseLabelsArras[fase]}...
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Workflows */}
                <div className="lg:col-span-2">
                    <Tabs defaultValue="gestion" className="w-full">
                        <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="gestion">Gestión</TabsTrigger>
                            <TabsTrigger value="docs">Documentos</TabsTrigger>
                            <TabsTrigger value="comms">Comunicaciones</TabsTrigger>
                            <TabsTrigger value="notaria">Notaría</TabsTrigger>
                        </TabsList>

                        <TabsContent value="gestion" className="mt-6">
                            <FirmasRatificaciones />
                        </TabsContent>

                        <TabsContent value="docs" className="mt-6">
                            <InventarioDocumental documentos={expediente.inventarioDocumental || []} />
                        </TabsContent>

                        <TabsContent value="comms" className="mt-6">
                            <ComunicacionesEstructuradas mensajes={expediente.comunicaciones || []} />
                        </TabsContent>

                        <TabsContent value="notaria" className="mt-6">
                            <NotariaGestion />
                        </TabsContent>
                    </Tabs>
                </div>

            </div>
        </div>
    );
};
