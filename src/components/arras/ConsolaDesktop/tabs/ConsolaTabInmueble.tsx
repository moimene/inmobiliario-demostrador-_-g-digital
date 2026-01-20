import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Ruler, Bed, Bath, Building } from "lucide-react";

export const ConsolaTabInmueble = () => {
  const { expediente } = useArras();

  // Type guard for datosRegistrales
  const datosRegistrales = typeof expediente.inmueble.datosRegistrales === 'object' 
    ? expediente.inmueble.datosRegistrales 
    : null;

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
                {expediente.inmueble.direccion}
              </p>
            </div>

            {expediente.inmueble.tipo && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Tipo de inmueble</p>
                <p className="text-sm text-slate-100">{expediente.inmueble.tipo}</p>
              </div>
            )}

            {expediente.inmueble.superficie && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Superficie</p>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-100">
                    {expediente.inmueble.superficie} m²
                  </p>
                </div>
              </div>
            )}

            {expediente.inmueble.habitaciones && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Habitaciones</p>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-100">
                    {expediente.inmueble.habitaciones}
                  </p>
                </div>
              </div>
            )}

            {expediente.inmueble.banos && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Baños</p>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-slate-400" />
                  <p className="text-sm font-semibold text-slate-100">{expediente.inmueble.banos}</p>
                </div>
              </div>
            )}
          </div>

          {/* Características adicionales */}
          {expediente.inmueble.caracteristicas && (
            <div className="border-t border-slate-700 pt-4">
              <p className="text-sm font-semibold text-slate-100 mb-3">Características</p>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(expediente.inmueble.caracteristicas).map(([key, value]) => (
                  <div key={key} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                    <div className="flex-1">
                      <p className="text-xs text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </p>
                      <p className="text-sm text-slate-100">{String(value)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Datos registrales (si existen como objeto) */}
      {datosRegistrales && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Datos del Registro de la Propiedad
              </CardTitle>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                Verificado
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {datosRegistrales.fincaRegistral && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Finca registral</p>
                  <p className="text-sm font-mono text-slate-100">
                    {datosRegistrales.fincaRegistral}
                  </p>
                </div>
              )}

              {datosRegistrales.tomo && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Tomo</p>
                  <p className="text-sm font-mono text-slate-100">
                    {datosRegistrales.tomo}
                  </p>
                </div>
              )}

              {datosRegistrales.libro && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Libro</p>
                  <p className="text-sm font-mono text-slate-100">
                    {datosRegistrales.libro}
                  </p>
                </div>
              )}

              {datosRegistrales.folio && (
                <div>
                  <p className="text-xs text-slate-400 mb-1">Folio</p>
                  <p className="text-sm font-mono text-slate-100">
                    {datosRegistrales.folio}
                  </p>
                </div>
              )}

              {datosRegistrales.registroPropiedad && (
                <div className="col-span-2">
                  <p className="text-xs text-slate-400 mb-1">Registro de la Propiedad</p>
                  <p className="text-sm text-slate-100">
                    {datosRegistrales.registroPropiedad}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
