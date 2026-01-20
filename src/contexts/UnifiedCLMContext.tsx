import React, { createContext, useContext, useState, ReactNode } from "react";
import { useArrendamiento } from "./ArrendamientoContext";
import { useArras } from "./ArrasContext";
import { Expediente as ExpedienteArrendamiento } from "@/types/arrendamiento";
import { ExpedienteArras } from "@/types/arras";

type ContratoTipo = "arrendamiento" | "arras";

interface ContratoUnificado {
  tipo: ContratoTipo;
  id: string;
  direccion: string;
  fase: string;
  fechaCreacion: string;
  partes: {
    parte1: { nombre: string; tipo: string };
    parte2: { nombre: string; tipo: string };
  };
  data: ExpedienteArrendamiento | ExpedienteArras;
}

interface UnifiedCLMState {
  contratoSeleccionado: { tipo: ContratoTipo; id: string } | null;
  vistaActual: "lista" | "detalles";
  filtros: {
    tipo: "todos" | "arrendamiento" | "arras";
    fase: string;
    busqueda: string;
  };
}

interface UnifiedCLMContextType extends UnifiedCLMState {
  seleccionarContrato: (tipo: ContratoTipo, id: string) => void;
  obtenerTodosContratos: () => ContratoUnificado[];
  getContratoActual: () => ContratoUnificado | null;
  setFiltros: (filtros: Partial<UnifiedCLMState["filtros"]>) => void;
  cambiarVista: (vista: "lista" | "detalles") => void;
}

const UnifiedCLMContext = createContext<UnifiedCLMContextType | undefined>(undefined);

export const UnifiedCLMProvider = ({ children }: { children: ReactNode }) => {
  const arrendamientoCtx = useArrendamiento();
  const arrasCtx = useArras();

  const [state, setState] = useState<UnifiedCLMState>({
    contratoSeleccionado: null,
    vistaActual: "lista",
    filtros: {
      tipo: "todos",
      fase: "todas",
      busqueda: "",
    },
  });

  const obtenerTodosContratos = (): ContratoUnificado[] => {
    const contratosArrendamiento: ContratoUnificado[] = arrendamientoCtx.contratos.map((c) => ({
      tipo: "arrendamiento" as ContratoTipo,
      id: c.id,
      direccion: c.vivienda.direccion,
      fase: c.fase,
      fechaCreacion: c.fechaCreacion,
      partes: {
        parte1: { nombre: c.partes.arrendador.nombre, tipo: "Arrendador" },
        parte2: { nombre: c.partes.arrendatario.nombre, tipo: "Arrendatario" },
      },
      data: c,
    }));

    const contratosArras: ContratoUnificado[] = arrasCtx.contratos.map((c) => ({
      tipo: "arras" as ContratoTipo,
      id: c.id,
      direccion: c.inmueble.direccion,
      fase: c.fase,
      fechaCreacion: c.fechaCreacion,
      partes: {
        parte1: { nombre: c.partes.vendedor.nombre, tipo: "Vendedor" },
        parte2: { nombre: c.partes.comprador.nombre, tipo: "Comprador" },
      },
      data: c,
    }));

    return [...contratosArrendamiento, ...contratosArras];
  };

  const seleccionarContrato = (tipo: ContratoTipo, id: string) => {
    setState((prev) => ({
      ...prev,
      contratoSeleccionado: { tipo, id },
      vistaActual: "detalles",
    }));

    // Sincronizar con el contexto correspondiente
    if (tipo === "arrendamiento") {
      arrendamientoCtx.seleccionarContrato(id);
    } else {
      arrasCtx.seleccionarContrato(id);
    }
  };

  const getContratoActual = (): ContratoUnificado | null => {
    if (!state.contratoSeleccionado) return null;

    const todosContratos = obtenerTodosContratos();
    return (
      todosContratos.find(
        (c) =>
          c.tipo === state.contratoSeleccionado?.tipo &&
          c.id === state.contratoSeleccionado?.id
      ) || null
    );
  };

  const setFiltros = (filtros: Partial<UnifiedCLMState["filtros"]>) => {
    setState((prev) => ({
      ...prev,
      filtros: { ...prev.filtros, ...filtros },
    }));
  };

  const cambiarVista = (vista: "lista" | "detalles") => {
    setState((prev) => ({ ...prev, vistaActual: vista }));
  };

  return (
    <UnifiedCLMContext.Provider
      value={{
        ...state,
        seleccionarContrato,
        obtenerTodosContratos,
        getContratoActual,
        setFiltros,
        cambiarVista,
      }}
    >
      {children}
    </UnifiedCLMContext.Provider>
  );
};

export const useUnifiedCLM = () => {
  const context = useContext(UnifiedCLMContext);
  if (!context) {
    throw new Error("useUnifiedCLM must be used within UnifiedCLMProvider");
  }
  return context;
};
