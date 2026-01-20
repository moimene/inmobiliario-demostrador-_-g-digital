import { useCompraventa } from "@/contexts/CompraventaContext";
import { Badge } from "@/components/ui/badge";
import { faseLabelsCompraventa } from "@/data/compraventaBotFlow";

interface ChatHeaderProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatHeader = ({ rolForzado }: ChatHeaderProps) => {
  const { expediente, usuarioActual } = useCompraventa();
  const rol = rolForzado || usuarioActual;

  const getRolDisplay = () => {
    if (rol === "vendedor") return "Vendedor";
    if (rol === "comprador") return "Comprador";
    return "Operador";
  };

  const getRolColor = () => {
    if (rol === "vendedor") return "bg-blue-600 text-white";
    if (rol === "comprador") return "bg-emerald-600 text-white";
    return "bg-slate-600 text-white";
  };

  return (
    <div className="bg-primary p-4 text-primary-foreground shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold">Canal Compraventa Certificado</h2>
        <Badge className={getRolColor()}>{getRolDisplay()}</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="opacity-90">Fase:</span>
        <Badge variant="secondary" className="bg-white/20 text-white">
          {faseLabelsCompraventa[expediente.fase]}
        </Badge>
      </div>
      <div className="text-xs opacity-75 mt-1">
        Expediente: {expediente.id}
      </div>
    </div>
  );
};
