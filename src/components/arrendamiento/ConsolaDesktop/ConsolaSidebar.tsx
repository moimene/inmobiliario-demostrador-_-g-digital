import { Folder, Clock, ClipboardCheck, FileSignature, CreditCard, AlertCircle, Search, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const ConsolaSidebar = () => {
  const [menuActivo, setMenuActivo] = useState("expedientes");

  const menuItems = [
    { id: "expedientes", label: "Expedientes", icon: Folder },
    { id: "pendientes", label: "Pendientes", icon: Clock },
    { id: "inventarios", label: "Inventarios", icon: ClipboardCheck },
    { id: "firmas", label: "Firmas", icon: FileSignature },
    { id: "pagos", label: "Pagos", icon: CreditCard },
    { id: "incidencias", label: "Incidencias", icon: AlertCircle },
    { id: "auditoria", label: "Auditoría", icon: Search },
    { id: "ajustes", label: "Ajustes", icon: Settings },
  ];

  return (
    <div className="w-60 border-r border-border/40 bg-slate-900/30 flex flex-col">
      <div className="p-4 border-b border-border/40">
        <h3 className="text-sm font-semibold text-foreground mb-1">
          Consola de Administración
        </h3>
        <p className="text-xs text-muted-foreground">
          Vista operador
        </p>
      </div>

      <nav className="flex-1 p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setMenuActivo(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors mb-1",
                menuActivo === item.id
                  ? "bg-primary/20 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border/40">
        <div className="text-xs text-muted-foreground">
          <p className="font-mono">Sistema: Online</p>
          <p className="font-mono">Versión: 2.1.4</p>
        </div>
      </div>
    </div>
  );
};
