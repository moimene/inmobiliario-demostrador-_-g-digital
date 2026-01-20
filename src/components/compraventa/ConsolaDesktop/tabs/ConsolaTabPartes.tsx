import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, CreditCard, Building2 } from "lucide-react";

export const ConsolaTabPartes = () => {
  const { expediente } = useCompraventa();

  const ParteCard = ({ parte, tipo, color }: { parte: any; tipo: string; color: string }) => (
    <Card className="bg-slate-900 border-slate-800 p-6">
      <div className="flex items-center gap-3 mb-4">
        <User className={`h-6 w-6 ${color}`} />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-100">{tipo}</h3>
          <Badge variant="outline" className={`${color.replace("text-", "bg-")}/20 ${color} border-${color.replace("text-", "")}/30 text-xs`}>
            Verificado ✓
          </Badge>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-400 mb-1">Nombre Completo:</p>
          <p className="font-semibold text-slate-100">{parte.nombre}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-slate-400 mb-1">NIF/NIE:</p>
            <p className="text-sm text-slate-100 font-mono">{parte.nif}</p>
          </div>
          <div>
            <p className="text-xs text-slate-400 mb-1">Teléfono:</p>
            <div className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-slate-400" />
              <p className="text-sm text-slate-100">{parte.telefono}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-slate-400 mb-1">Email:</p>
          <div className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-slate-400" />
            <p className="text-sm text-slate-100">{parte.email}</p>
          </div>
        </div>

        {parte.direccion && (
          <div>
            <p className="text-xs text-slate-400 mb-1">Dirección:</p>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-slate-400" />
              <p className="text-sm text-slate-100">{parte.direccion}</p>
            </div>
          </div>
        )}

        {parte.iban && (
          <div>
            <p className="text-xs text-slate-400 mb-1">IBAN:</p>
            <div className="flex items-center gap-2">
              <CreditCard className="h-3 w-3 text-slate-400" />
              <p className="text-sm text-slate-100 font-mono">{parte.iban}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <div className="grid grid-cols-2 gap-6 mb-6">
        <ParteCard
          parte={expediente.partes.vendedor}
          tipo="Vendedor"
          color="text-blue-400"
        />
        <ParteCard
          parte={expediente.partes.comprador}
          tipo="Comprador"
          color="text-green-400"
        />
      </div>

      {expediente.partes.notaria && (
        <div className="mb-6">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-6 w-6 text-amber-400" />
              <h3 className="text-lg font-bold text-slate-100">Notaría</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-slate-100">{expediente.partes.notaria.nombre}</p>
              <p className="text-xs text-slate-400">{expediente.partes.notaria.direccion}</p>
            </div>
          </Card>
        </div>
      )}

      {expediente.partes.banco && (
        <Card className="bg-slate-900 border-slate-800 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-6 w-6 text-purple-400" />
            <h3 className="text-lg font-bold text-slate-100">Banco Financiador</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-100">{expediente.partes.banco.nombre}</p>
            <p className="text-xs text-slate-400">{expediente.partes.banco.email}</p>
          </div>
        </Card>
      )}
    </div>
  );
};
