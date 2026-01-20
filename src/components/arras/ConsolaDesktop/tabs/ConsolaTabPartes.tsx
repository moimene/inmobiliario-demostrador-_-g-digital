import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, FileSignature, Landmark } from "lucide-react";

export const ConsolaTabPartes = () => {
  const { expediente } = useArras();

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      {/* Vendedor */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <User className="h-5 w-5 text-blue-400" />
            Vendedor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Nombre completo</p>
              <p className="text-sm font-semibold text-slate-100">
                {expediente.partes.vendedor.nombre}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">NIF</p>
              <p className="text-sm font-mono text-slate-100">{expediente.partes.vendedor.nif}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-sm text-slate-100">{expediente.partes.vendedor.email}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Teléfono</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.vendedor.telefono}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Dirección</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.vendedor.direccion || "No especificada"}
              </p>
            </div>

            {expediente.partes.vendedor.iban && (
              <div className="col-span-2">
                <p className="text-xs text-slate-400 mb-1">IBAN</p>
                <p className="text-sm font-mono text-slate-100">{expediente.partes.vendedor.iban}</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Verificado</Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              Vendedor
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Comprador */}
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <User className="h-5 w-5 text-emerald-400" />
            Comprador
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-slate-400 mb-1">Nombre completo</p>
              <p className="text-sm font-semibold text-slate-100">
                {expediente.partes.comprador.nombre}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">NIF</p>
              <p className="text-sm font-mono text-slate-100">{expediente.partes.comprador.nif}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Email</p>
              <p className="text-sm text-slate-100">{expediente.partes.comprador.email}</p>
            </div>

            <div>
              <p className="text-xs text-slate-400 mb-1">Teléfono</p>
              <p className="text-sm font-mono text-slate-100">
                {expediente.partes.comprador.telefono}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-xs text-slate-400 mb-1">Dirección</p>
              <p className="text-sm text-slate-100">
                {expediente.partes.comprador.direccion || "No especificada"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              Verificado
            </Badge>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              Comprador
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Notaría (si existe) */}
      {expediente.partes.notaria && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <FileSignature className="h-5 w-5 text-purple-400" />
              Notaría
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Nombre</p>
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.partes.notaria.nombre}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-100">{expediente.partes.notaria.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-100">{expediente.partes.notaria.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Teléfono</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.notaria.telefono}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                Fedatario Público
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Escrow (si existe) */}
      {expediente.partes.escrow && (
        <Card className="border-slate-700 bg-slate-900/50">
          <CardHeader>
            <CardTitle className="text-slate-100 flex items-center gap-2">
              <Landmark className="h-5 w-5 text-amber-400" />
              Entidad Depositaria (Escrow)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-slate-400 mb-1">Entidad</p>
                <p className="text-sm font-semibold text-slate-100">
                  {expediente.partes.escrow.nombre}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">CIF</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.escrow.nif}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Email</p>
                <p className="text-sm text-slate-100">{expediente.partes.escrow.email}</p>
              </div>

              <div>
                <p className="text-xs text-slate-400 mb-1">Teléfono</p>
                <p className="text-sm font-mono text-slate-100">
                  {expediente.partes.escrow.telefono}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                Entidad Depositaria
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
