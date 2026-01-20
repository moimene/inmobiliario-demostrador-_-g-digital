import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Building2 } from "lucide-react";

export const ConsolaTabPartes = () => {
  const { expediente } = useArrendamiento();

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      {/* Arrendador */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Arrendador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Nombre completo</p>
              <p className="text-sm font-semibold text-slate-100">
                {expediente.partes.arrendador.nombre}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">NIF</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.arrendador.nif}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.arrendador.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Teléfono</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.arrendador.telefono}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Dirección</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.arrendador.direccion || "No especificada"}
              </p>
            </div>

            {expediente.partes.arrendador.iban && (
              <div className="col-span-2">
                <p className="text-xs text-slate-400 mb-1">IBAN</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.arrendador.iban}
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Verificado
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              Arrendador
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Arrendatari@ */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <User className="h-5 w-5 text-green-400" />
            Arrendatari@
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Nombre completo</p>
              <p className="text-sm font-semibold text-slate-100">
                {expediente.partes.arrendatario.nombre}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">NIF</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.arrendatario.nif}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.arrendatario.email}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Teléfono</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.arrendatario.telefono}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Dirección</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.arrendatario.direccion || "No especificada"}
              </p>
            </div>

            {expediente.partes.arrendatario.profesion && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Profesión</p>
                <p className="text-sm text-slate-100">
                  {expediente.partes.arrendatario.profesion}
                </p>
              </div>
            )}

            {expediente.partes.arrendatario.empresa && (
              <div>
                <p className="text-xs text-slate-400 mb-1">Empresa</p>
                <p className="text-sm text-slate-100">
                  {expediente.partes.arrendatario.empresa}
                </p>
              </div>
            )}

            {expediente.partes.arrendatario.nomina && (
              <div className="col-span-2">
                <p className="text-xs text-slate-400 mb-1">Nómina mensual</p>
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.partes.arrendatario.nomina.toLocaleString('es-ES')}€
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Verificado
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              Arrendatari@
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Agencia (si existe) */}
      {expediente.partes.agencia && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-purple-400" />
              Agencia Inmobiliaria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Razón social</p>
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.partes.agencia.nombre}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">CIF</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.agencia.nif}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-100">
                  {expediente.partes.agencia.email}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Teléfono</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.agencia.telefono}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Agencia Mediadora
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
