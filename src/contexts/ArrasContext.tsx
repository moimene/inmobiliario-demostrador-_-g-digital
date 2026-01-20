import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ArrasContextType,
  ArrasState,
  ExpedienteArras,
  ArrasFase,
  ArrasRol,
  Documento,
  Comunicacion
} from "@/types/arras";

// Mock Data Stub
const mockExpediente: ExpedienteArras = {
  id: "ARRAS-2026-STUB",
  referencia: "REF-001",
  fechaCreacion: new Date().toISOString(),
  faseActual: "apertura",
  partes: [
    { id: "p1", rol: "vendedor", nombre: "Juan Vendedor", email: "juan@example.com", kycAprobado: true },
    { id: "p2", rol: "comprador", nombre: "Ana Compradora", email: "ana@example.com", kycAprobado: true }
  ],
  inmueble: {
    direccion: "Calle Mayor 1, Madrid"
  },
  contrato: {
    precioVenta: 300000,
    importeArras: 30000,
    tipoArras: "penitenciales",
    fechaTopeEscritura: "2026-12-31"
  },
  inventarioDocumental: [],
  comunicaciones: [],
  timeline: [],
  bloqueado: false,
  alertas: []
};

const ArrasContext = createContext<ArrasContextType | undefined>(undefined);

export const ArrasProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ArrasState>({
    expediente: mockExpediente,
    usuarioActual: "vendedor",
    vista: "dashboard"
  });

  const setFase = (fase: ArrasFase) => {
    setState(prev => ({
      ...prev,
      expediente: { ...prev.expediente, faseActual: fase }
    }));
  };

  const setVista = (vista: "dashboard" | "wizard" | "documentos") => {
    setState(prev => ({ ...prev, vista }));
  };

  const setUsuario = (rol: ArrasRol) => {
    setState(prev => ({ ...prev, usuarioActual: rol }));
  };

  const addComunicacion = (msg: string, adjuntos?: Documento[]) => {
    const nuevaComunicacion: Comunicacion = {
      id: `msg-${Date.now()}`,
      remitente: state.usuarioActual,
      destinatarios: state.expediente.partes.filter(p => p.rol !== state.usuarioActual).map(p => p.rol),
      mensaje: msg,
      timestamp: new Date().toISOString(),
      tipo: "chat",
      leido: false,
      adjuntos,
      evidencia: {
        hash: "sha256-stub",
        tsa: "tsa-stub"
      }
    };

    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        comunicaciones: [...prev.expediente.comunicaciones, nuevaComunicacion]
      }
    }));
  };

  const uploadDocumento = (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => {
    // Stub implementation
    console.log("Uploading document:", doc);
  };

  const loadExpediente = (id: string) => {
    console.log("Loading expediente:", id);
  };

  return (
    <ArrasContext.Provider value={{
      ...state,
      setFase,
      setUsuario,
      setVista,
      addComunicacion,
      uploadDocumento,
      loadExpediente
    }}>
      {children}
    </ArrasContext.Provider>
  );
};

export const useArras = () => {
  const context = useContext(ArrasContext);
  if (!context) {
    throw new Error("useArras must be used within an ArrasProvider");
  }
  return context;
};
