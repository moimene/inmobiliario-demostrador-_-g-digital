import { useState, useMemo } from "react";
import { useUnifiedCLM } from "@/contexts/UnifiedCLMContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export const ConsolaUnifiedContractsList = () => {
  const { obtenerTodosContratos, seleccionarContrato, contratoSeleccionado, filtros, setFiltros } = useUnifiedCLM();
  const [busqueda, setBusqueda] = useState("");

  const contratos = obtenerTodosContratos();

  const contratosFiltrados = useMemo(() => {
    return contratos.filter((contrato) => {
      // Filtro por tipo
      if (filtros.tipo !== "todos" && contrato.tipo !== filtros.tipo) return false;

      // Filtro por búsqueda
      if (busqueda) {
        const searchLower = busqueda.toLowerCase();
        return (
          contrato.direccion.toLowerCase().includes(searchLower) ||
          contrato.id.toLowerCase().includes(searchLower) ||
          contrato.partes.parte1.nombre.toLowerCase().includes(searchLower) ||
          contrato.partes.parte2.nombre.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [contratos, filtros.tipo, busqueda]);

  const calcularDias = (fechaCreacion: string) => {
    const inicio = new Date(fechaCreacion);
    const ahora = new Date();
    return Math.floor((ahora.getTime() - inicio.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="w-80 border-r border-slate-800 bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-sm font-semibold text-slate-100 mb-3">Contratos</h2>
        
        {/* Búsqueda */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-9 bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-500"
          />
        </div>

        {/* Filtro por tipo */}
        <Select
          value={filtros.tipo}
          onValueChange={(value: any) => setFiltros({ tipo: value })}
        >
          <SelectTrigger className="bg-slate-900 border-slate-700 text-slate-100">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los contratos</SelectItem>
            <SelectItem value="arrendamiento">🏠 Arrendamientos</SelectItem>
            <SelectItem value="arras">🤝 Arras</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de contratos */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {contratosFiltrados.map((contrato) => {
            const isSelected =
              contratoSeleccionado?.tipo === contrato.tipo &&
              contratoSeleccionado?.id === contrato.id;

            return (
              <button
                key={`${contrato.tipo}-${contrato.id}`}
                onClick={() => seleccionarContrato(contrato.tipo, contrato.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors",
                  "border-l-4",
                  contrato.tipo === "arrendamiento"
                    ? "border-l-blue-500"
                    : "border-l-emerald-500",
                  isSelected
                    ? "bg-slate-800 border-r border-t border-b border-slate-700"
                    : "bg-slate-900/50 hover:bg-slate-800/50"
                )}
              >
                <div className="flex items-start justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      contrato.tipo === "arrendamiento"
                        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                        : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                    )}
                  >
                    {contrato.tipo === "arrendamiento" ? "🏠" : "🤝"}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {calcularDias(contrato.fechaCreacion)}d
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-100 mb-1 line-clamp-1">
                  {contrato.direccion}
                </p>

                <p className="text-xs text-slate-400 mb-2">{contrato.id}</p>

                <div className="text-xs text-slate-500 space-y-0.5">
                  <p>
                    <span className="text-slate-400">{contrato.partes.parte1.tipo}:</span>{" "}
                    {contrato.partes.parte1.nombre.split(" ")[0]}
                  </p>
                  <p>
                    <span className="text-slate-400">{contrato.partes.parte2.tipo}:</span>{" "}
                    {contrato.partes.parte2.nombre.split(" ")[0]}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Footer con contador */}
      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-400">
          {contratosFiltrados.length} de {contratos.length} contratos
        </p>
      </div>
    </div>
  );
};
