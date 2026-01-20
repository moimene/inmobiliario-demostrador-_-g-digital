import { LayoutDashboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useUnifiedCLM } from "@/contexts/UnifiedCLMContext";
import eadTrustLogo from "@/assets/ead-trust-logo.png";

export const ConsolaUnifiedHeader = () => {
  const { getContratoActual } = useUnifiedCLM();
  const contratoActual = getContratoActual();

  return (
    <div className="border-b border-slate-800 bg-slate-900 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-lg font-bold text-slate-100">
              Consola Unificada CLM - Gestión Multi-Contrato
            </h1>
            {contratoActual ? (
              <p className="text-sm text-slate-400">
                {contratoActual.direccion}
              </p>
            ) : (
              <p className="text-sm text-slate-400">
                Arrendamientos y Compraventas con Arras
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {contratoActual && (
            <div className="text-right">
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={
                    contratoActual.tipo === "arrendamiento"
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                  }
                >
                  {contratoActual.tipo === "arrendamiento" ? "🏠 Arrendamiento" : "🤝 Arras"}
                </Badge>
                <Badge variant="outline" className="bg-slate-800 text-slate-100 border-slate-700">
                  {contratoActual.id}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {contratoActual.partes.parte1.nombre} • {contratoActual.partes.parte2.nombre}
              </p>
            </div>
          )}
          <img src={eadTrustLogo} alt="EAD Trust" className="h-10" />
        </div>
      </div>
    </div>
  );
};
