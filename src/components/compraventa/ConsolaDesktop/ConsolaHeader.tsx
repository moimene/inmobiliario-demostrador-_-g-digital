import { useCompraventa } from "@/contexts/CompraventaContext";
import { Building2 } from "lucide-react";
import eadTrustLogo from "@/assets/ead-trust-logo.png";

export const ConsolaHeader = () => {
  const { expediente } = useCompraventa();

  return (
    <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <img src={eadTrustLogo} alt="EAD Trust" className="h-8" />
        <div className="h-8 w-px bg-slate-700" />
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-orange-400" />
          <h1 className="text-lg font-semibold text-slate-100">
            Consola CLM - Compraventa Directa
          </h1>
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm text-slate-400">
        <span>Expediente: {expediente.id}</span>
        <span className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs">
          {expediente.inmueble.direccion}
        </span>
      </div>
    </div>
  );
};
