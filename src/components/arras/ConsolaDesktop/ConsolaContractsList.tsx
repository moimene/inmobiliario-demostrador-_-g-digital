import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useArras } from "@/contexts/ArrasContext";
import { FaseArras } from "@/types/arras";
import { cn } from "@/lib/utils";

export const ConsolaContractsList = () => {
  const { contratos, contratoSeleccionado, seleccionarContrato } = useArras();
  const [busqueda, setBusqueda] = useState("");
  const [filtroFase, setFiltroFase] = useState<FaseArras | "todas">("todas");

  const getEstadoBadgeVariant = (fase: FaseArras) => {
    if (fase.includes("apertura") || fase.includes("identificacion")) return "secondary";
    if (fase.includes("firma") || fase.includes("generacion")) return "default";
    if (fase.includes("formalizacion") || fase.includes("cierre")) return "outline";
    return "secondary";
  };

  const getEstadoColor = (fase: FaseArras) => {
    if (fase.includes("apertura")) return "text-slate-400";
    if (fase.includes("identificacion")) return "text-blue-400";
    if (fase.includes("due_diligence")) return "text-purple-400";
    if (fase.includes("configuracion")) return "text-amber-400";
    if (fase.includes("firma") || fase.includes("generacion")) return "text-indigo-400";
    if (fase.includes("canal")) return "text-green-400";
    if (fase.includes("gestion")) return "text-teal-400";
    if (fase.includes("convocatoria")) return "text-orange-400";
    if (fase.includes("resultado")) return "text-blue-400";
    if (fase.includes("resolucion")) return "text-red-400";
    if (fase.includes("cierre")) return "text-slate-400";
    return "text-slate-400";
  };

  const contratosFiltrados = useMemo(() => {
    return contratos.filter((contrato) => {
      const matchBusqueda =
        busqueda === "" ||
        contrato.inmueble.direccion.toLowerCase().includes(busqueda.toLowerCase()) ||
        contrato.id.toLowerCase().includes(busqueda.toLowerCase()) ||
        contrato.partes.vendedor.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        contrato.partes.comprador.nombre.toLowerCase().includes(busqueda.toLowerCase());

      const matchFase = filtroFase === "todas" || contrato.fase === filtroFase;

      return matchBusqueda && matchFase;
    });
  }, [contratos, busqueda, filtroFase]);

  const calcularDias = (fechaCreacion: string) => {
    const fecha = new Date(fechaCreacion);
    const hoy = new Date();
    const diff = Math.floor((hoy.getTime() - fecha.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="w-96 bg-slate-900 border-r border-slate-800 flex flex-col">
      <div className="p-4 border-b border-slate-800 space-y-3">
        <h2 className="font-semibold text-sm">Contratos de Arras</h2>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por dirección, ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="pl-8 bg-slate-800 border-slate-700 text-slate-100"
          />
        </div>
        <Select value={filtroFase} onValueChange={(value) => setFiltroFase(value as FaseArras | "todas")}>
          <SelectTrigger className="bg-slate-800 border-slate-700 text-slate-100">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por fase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las fases</SelectItem>
            <SelectItem value="apertura_expediente_arras">Apertura</SelectItem>
            <SelectItem value="identificacion_partes_arras">Identificación</SelectItem>
            <SelectItem value="configuracion_deposito_arras">Depósito</SelectItem>
            <SelectItem value="generacion_y_firma_contrato_arras">Firma</SelectItem>
            <SelectItem value="gestion_eventos_pre_notaria">Pre-Notaría</SelectItem>
            <SelectItem value="resultado_formalizacion">Formalización</SelectItem>
            <SelectItem value="arbitraje_y_cierre">Cierre</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {contratosFiltrados.map((contrato) => (
            <Button
              key={contrato.id}
              onClick={() => seleccionarContrato(contrato.id)}
              variant="ghost"
              className={cn(
                "w-full p-4 h-auto flex flex-col items-start gap-2 hover:bg-slate-800",
                contratoSeleccionado === contrato.id && "bg-slate-800 border border-primary/50"
              )}
            >
              <div className="w-full flex items-start justify-between">
                <p className="font-semibold text-sm text-left">{contrato.inmueble.direccion}</p>
                <Badge variant={getEstadoBadgeVariant(contrato.fase)} className="text-[10px] ml-2">
                  {contrato.fase.split("_")[0]}
                </Badge>
              </div>

              <p className="text-xs text-slate-400">ID: {contrato.id}</p>

              <div className="w-full text-xs text-slate-400 space-y-1">
                <p>👤 Vendedor: {contrato.partes.vendedor.nombre}</p>
                <p>👤 Comprador: {contrato.partes.comprador.nombre}</p>
              </div>

              <div className="w-full flex items-center justify-between text-xs">
                <span className={getEstadoColor(contrato.fase)}>
                  {contrato.fase.replace(/_/g, " ")}
                </span>
                <span className="text-slate-500">{calcularDias(contrato.fechaCreacion)}d</span>
              </div>

              <div className="w-full text-xs text-slate-500">
                Arras: {contrato.contrato.cantidadArras.toLocaleString()}€ ({contrato.contrato.porcentajeArras}%)
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-400">
        {contratosFiltrados.length} de {contratos.length} contratos
      </div>
    </div>
  );
};
