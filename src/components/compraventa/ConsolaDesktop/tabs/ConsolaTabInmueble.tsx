import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Home, Ruler, BedDouble, Bath, FileCheck } from "lucide-react";

export const ConsolaTabInmueble = () => {
  const { expediente } = useCompraventa();
  const { inmueble } = expediente;

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-6 w-6 text-orange-400" />
          <h2 className="text-xl font-bold text-slate-100">Datos del Inmueble</h2>
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-400 mb-1">Dirección:</p>
            <p className="text-lg font-semibold text-slate-100">{inmueble.direccion}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <Home className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Tipo</p>
                <p className="font-semibold text-slate-100 capitalize">{inmueble.tipo}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <Ruler className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Superficie</p>
                <p className="font-semibold text-slate-100">{inmueble.superficie}m²</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <BedDouble className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Habitaciones</p>
                <p className="font-semibold text-slate-100">{inmueble.habitaciones}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg">
              <Bath className="h-5 w-5 text-slate-400" />
              <div>
                <p className="text-xs text-slate-400">Baños</p>
                <p className="font-semibold text-slate-100">{inmueble.banos}</p>
              </div>
            </div>
          </div>

          {Object.keys(inmueble.caracteristicas).length > 0 && (
            <div>
              <p className="text-sm text-slate-400 mb-3">Características adicionales:</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(inmueble.caracteristicas).map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="outline"
                    className="bg-slate-800/50 text-slate-300 border-slate-700"
                  >
                    {String(value)}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {inmueble.datosRegistrales && (
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <FileCheck className="h-6 w-6 text-green-400" />
            <h3 className="text-lg font-bold text-slate-100">Datos Registrales</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Finca Registral:</p>
              <p className="font-mono text-slate-100">{inmueble.datosRegistrales.fincaRegistral}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Tomo:</p>
              <p className="font-mono text-slate-100">{inmueble.datosRegistrales.tomo}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Libro:</p>
              <p className="font-mono text-slate-100">{inmueble.datosRegistrales.libro}</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Folio:</p>
              <p className="font-mono text-slate-100">{inmueble.datosRegistrales.folio}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-slate-400 mb-1">Registro de la Propiedad:</p>
            <p className="text-slate-100">{inmueble.datosRegistrales.registroPropiedad}</p>
          </div>

          {inmueble.notaRegistral && (
            <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-xs text-green-300 mb-1">✓ Nota Registral Certificada</p>
              <p className="text-xs text-slate-400">
                Fecha: {new Date(inmueble.notaRegistral.fecha).toLocaleDateString()}
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
