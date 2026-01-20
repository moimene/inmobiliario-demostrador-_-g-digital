import { FileSignature } from "lucide-react";
import { useArras } from "@/contexts/ArrasContext";
import { Badge } from "@/components/ui/badge";
import eadTrustLogo from "@/assets/ead-trust-logo.png";

export const ConsolaHeader = () => {
  const { expediente } = useArras();

  return (
    <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileSignature className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-bold">Consola CLM - Canal de Arras</h1>
            <p className="text-sm text-slate-400">{expediente.inmueble.direccion}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <Badge variant="outline" className="bg-slate-800 text-slate-100 border-slate-700">
              {expediente.id}
            </Badge>
            <p className="text-xs text-slate-400 mt-1">
              Precio: {expediente.contrato.precioVenta.toLocaleString()}€
            </p>
          </div>
          <img src={eadTrustLogo} alt="EAD Trust" className="h-10" />
        </div>
      </div>
    </div>
  );
};
