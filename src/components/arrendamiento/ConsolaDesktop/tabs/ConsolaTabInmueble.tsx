import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Ruler, Bed, Bath, Car, Building } from "lucide-react";
import { CertifiedBadge } from "../../Shared/CertifiedBadge";

export const ConsolaTabInmueble = () => {
  const { expediente } = useArrendamiento();

  const estanciasPorTipo = expediente.inventario.reduce((acc, item) => {
    if (!acc[item.estancia]) {
      acc[item.estancia] = [];
    }
    acc[item.estancia].push(item);
    return acc;
  }, {} as Record<string, typeof expediente.inventario>);

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      {/* Datos del inmueble */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Home className="h-5 w-5" />
            Datos del Inmueble
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Dirección completa</p>
              <p className="text-lg font-semibold text-slate-100">
                {expediente.vivienda.direccion}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Tipo de vivienda</p>
              <p className="text-sm text-slate-100">{expediente.vivienda.tipo}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Superficie</p>
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.vivienda.superficie} m²
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Habitaciones</p>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.vivienda.habitaciones}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Baños</p>
              <div className="flex items-center gap-2">
                <Bath className="h-4 w-4 text-slate-400" />
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.vivienda.banos}
                </p>
              </div>
            </div>
          </div>

          {/* Características adicionales */}
          <div className="border-t border-slate-700 pt-4">
            <p className="text-sm font-semibold text-slate-100 mb-3">Características</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(expediente.vivienda.caracteristicas).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p className="text-sm text-slate-100">{String(value)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inventario certificado */}
      {expediente.inventario.length > 0 && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Inventario Certificado
              </CardTitle>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {expediente.inventario.length} elementos
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(estanciasPorTipo).map(([estancia, items]) => (
                <div key={estancia} className="border border-slate-700 rounded-lg p-4 bg-slate-800/30">
                  <h4 className="font-semibold text-slate-100 mb-3">{estancia}</h4>
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-2 bg-slate-900/50 rounded"
                      >
                        <div className="flex-1">
                          <p className="text-sm text-slate-200">{item.descripcion}</p>
                          {item.observaciones && (
                            <p className="text-xs text-slate-400 mt-1">{item.observaciones}</p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="outline"
                            className={
                              item.estado === "bien"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : item.estado === "deterioro"
                                ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {item.estado === "bien" ? "✓ Bien" : item.estado === "deterioro" ? "⚠ Deterioro" : "✗ Falta"}
                          </Badge>
                          {item.fotos.length > 0 && (
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {item.fotos.length} 📷
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Galería de fotos certificadas */}
            {expediente.inventario.some(item => item.fotos.length > 0) && (
              <div className="mt-6 border-t border-slate-700 pt-4">
                <p className="text-sm font-semibold text-slate-100 mb-3">
                  Fotografías Certificadas
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {expediente.inventario
                    .flatMap(item => item.fotos)
                    .map((foto) => (
                      <div key={foto.id} className="relative group">
                        <img
                          src={foto.url}
                          alt="Inventario"
                          className="w-full aspect-square object-cover rounded-lg border border-slate-700"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <CertifiedBadge hash={foto.hash} compact />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
