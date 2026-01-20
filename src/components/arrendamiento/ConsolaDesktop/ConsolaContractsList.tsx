import { useState, useMemo } from "react";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { faseLabels } from "@/data/arrendamientoBotFlow";
import { FaseArrendamiento } from "@/types/arrendamiento";
import { Search } from "lucide-react";

export const ConsolaContractsList = () => {
  const { contratos, contratoSeleccionado, seleccionarContrato } = useArrendamiento();
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroFase, setFiltroFase] = useState<string>("todas");

  const getEstadoBadgeVariant = (fase: FaseArrendamiento): "default" | "secondary" | "destructive" | "outline" => {
    if (fase === "canal_oficial") return "default";
    if (fase === "cierre") return "secondary";
    if (fase === "identificacion_partes") return "outline";
    return "default";
  };

  const getEstadoColor = (fase: FaseArrendamiento): string => {
    if (fase === "canal_oficial") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (fase === "cierre") return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    if (fase === "firma_contrato") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (fase === "pagos_iniciales") return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-blue-500/20 text-blue-400 border-blue-500/30";
  };

  const contratosFiltrados = useMemo(() => {
    return contratos.filter((contrato) => {
      const matchSearch = 
        searchTerm === "" ||
        contrato.vivienda.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.partes.arrendador.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.partes.arrendatario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contrato.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchFase = 
        filtroFase === "todas" ||
        (filtroFase === "activo" && contrato.fase === "canal_oficial") ||
        (filtroFase === "en_proceso" && contrato.fase !== "canal_oficial" && contrato.fase !== "cierre") ||
        (filtroFase === "finalizado" && contrato.fase === "cierre");

      return matchSearch && matchFase;
    });
  }, [contratos, searchTerm, filtroFase]);

  return (
    <div className="w-[400px] border-r border-slate-700 bg-slate-900/30 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <h2 className="text-lg font-semibold text-slate-100 mb-3">Gestión de Contratos</h2>
        
        {/* Buscador */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por dirección, nombre o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-slate-800/50 border-slate-700 text-slate-100"
          />
        </div>

        {/* Filtro por fase */}
        <Select value={filtroFase} onValueChange={setFiltroFase}>
          <SelectTrigger className="bg-slate-800/50 border-slate-700 text-slate-100">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las fases</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="en_proceso">En proceso</SelectItem>
            <SelectItem value="finalizado">Finalizados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de contratos */}
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {contratosFiltrados.map((contrato) => {
            const ultimoEvento = contrato.eventos[contrato.eventos.length - 1];
            const diasDesdeCreacion = Math.floor(
              (new Date().getTime() - new Date(contrato.fechaCreacion).getTime()) / (1000 * 60 * 60 * 24)
            );

            return (
              <button
                key={contrato.id}
                onClick={() => seleccionarContrato(contrato.id)}
                className={cn(
                  "w-full p-3 rounded-lg border text-left transition-all",
                  contratoSeleccionado === contrato.id
                    ? "bg-primary/20 border-primary shadow-lg shadow-primary/10"
                    : "bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:border-slate-600"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate text-slate-100">
                      {contrato.vivienda.direccion}
                    </p>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      {contrato.id}
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={cn("text-[10px] ml-2 flex-shrink-0", getEstadoColor(contrato.fase))}
                  >
                    {faseLabels[contrato.fase]}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div>
                    <span className="text-slate-400">Arrendador:</span>
                    <p className="font-medium text-slate-200 truncate">
                      {contrato.partes.arrendador.nombre.split(' ')[0]} {contrato.partes.arrendador.nombre.split(' ')[1]}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Arrendatario:</span>
                    <p className="font-medium text-slate-200 truncate">
                      {contrato.partes.arrendatario.nombre.split(' ')[0]} {contrato.partes.arrendatario.nombre.split(' ')[1]}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <p className="text-slate-400 truncate flex-1">
                    {ultimoEvento?.mensaje || "Sin actividad"}
                  </p>
                  <span className="text-slate-500 ml-2 flex-shrink-0">{diasDesdeCreacion}d</span>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Contador */}
      <div className="p-3 border-t border-slate-700 bg-slate-900/50">
        <p className="text-xs text-slate-400">
          Mostrando <span className="text-slate-200 font-semibold">{contratosFiltrados.length}</span> de{" "}
          <span className="text-slate-200 font-semibold">{contratos.length}</span> contratos
        </p>
      </div>
    </div>
  );
};
