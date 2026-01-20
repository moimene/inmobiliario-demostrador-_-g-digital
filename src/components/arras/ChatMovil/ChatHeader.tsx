import { Building2, Home, User } from "lucide-react";
import { useArras } from "@/contexts/ArrasContext";
import { Badge } from "@/components/ui/badge";
import certyLogo from "@/assets/certy-logo.png";

interface ChatHeaderProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatHeader = ({ rolForzado }: ChatHeaderProps) => {
  const { expediente, usuarioActual } = useArras();
  const rolActivo = rolForzado || (usuarioActual as "vendedor" | "comprador");

  const getTitulo = () => {
    if (rolActivo === "vendedor") {
      return "Canal de Arras - Vendedor";
    }
    return "Canal de Arras - Comprador";
  };

  const getIcon = () => {
    if (rolActivo === "vendedor") {
      return <Home className="h-5 w-5" />;
    }
    return <User className="h-5 w-5" />;
  };

  const getColorClasses = () => {
    if (rolActivo === "vendedor") {
      return "bg-blue-500 text-white";
    }
    return "bg-green-500 text-white";
  };

  return (
    <div className={`p-4 ${getColorClasses()} flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <div>
          <h1 className="font-bold text-lg">{getTitulo()}</h1>
          <p className="text-sm opacity-90">{expediente.inmueble.direccion}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant="outline" className="bg-white/20 text-white border-white/40 text-[10px]">
          {expediente.id}
        </Badge>
        <img src={certyLogo} alt="Certy" className="h-6" />
      </div>
    </div>
  );
};
