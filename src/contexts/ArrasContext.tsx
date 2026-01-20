import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ArrasContextType,
  ArrasState,
  ExpedienteArras,
  ArrasFase,
  FaseArras,
  ArrasRol,
  Documento,
  MensajeArras
} from "@/types/arras";
import { expedienteArrasMock, contratosArrasMock } from "@/data/arrasMockData";

const ArrasContext = createContext<ArrasContextType | undefined>(undefined);

export const ArrasProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<ArrasState>({
    expediente: expedienteArrasMock,
    usuarioActual: "vendedor",
    vista: "dashboard",
    contratos: contratosArrasMock,
    contratoSeleccionado: expedienteArrasMock.id,
  });

  // Set Chrono-Flare phase (new architecture)
  const setFase = (fase: ArrasFase) => {
    setState(prev => ({
      ...prev,
      expediente: { ...prev.expediente, faseActual: fase }
    }));
  };

  // Change Bot Flow phase (legacy - used by components)
  const cambiarFase = (fase: FaseArras) => {
    setState(prev => ({
      ...prev,
      expediente: { ...prev.expediente, fase },
      contratos: prev.contratos.map(c => 
        c.id === prev.contratoSeleccionado ? { ...c, fase } : c
      )
    }));
  };

  const setVista = (vista: "dashboard" | "wizard" | "documentos") => {
    setState(prev => ({ ...prev, vista }));
  };

  const setUsuario = (rol: ArrasRol) => {
    setState(prev => ({ ...prev, usuarioActual: rol }));
  };

  // Add communication (Chrono-Flare style)
  const addComunicacion = (msg: string, adjuntos?: Documento[]) => {
    const nuevoMensaje: MensajeArras = {
      id: `msg-${Date.now()}`,
      tipo: "usuario",
      remitente: state.usuarioActual as string,
      texto: msg,
      timestamp: new Date().toISOString(),
      certificado: true,
      hash: `hash-${Date.now().toString(16)}`,
      leido: false,
      adjuntos: adjuntos?.map(d => ({
        tipo: d.tipo,
        nombre: d.nombre,
        url: d.url,
        hash: d.hash,
      })),
    };

    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: [...prev.expediente.mensajes, nuevoMensaje]
      },
      contratos: prev.contratos.map(c => 
        c.id === prev.contratoSeleccionado 
          ? { ...c, mensajes: [...c.mensajes, nuevoMensaje] }
          : c
      )
    }));
  };

  // Send message (legacy style - used by ChatInput and ChatActions)
  const enviarMensaje = (msg: Partial<MensajeArras>) => {
    const nuevoMensaje: MensajeArras = {
      id: `msg-${Date.now()}`,
      tipo: msg.tipo || "usuario",
      remitente: msg.remitente || state.usuarioActual as string,
      texto: msg.texto || "",
      timestamp: new Date().toISOString(),
      certificado: true,
      hash: `hash-${Date.now().toString(16)}`,
      leido: false,
      adjuntos: msg.adjuntos,
    };

    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: [...prev.expediente.mensajes, nuevoMensaje]
      },
      contratos: prev.contratos.map(c => 
        c.id === prev.contratoSeleccionado 
          ? { ...c, mensajes: [...c.mensajes, nuevoMensaje] }
          : c
      )
    }));
  };

  // Confirm message (used by ChatActions)
  const confirmarMensaje = (msgId: string, rol: string) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: prev.expediente.mensajes.map(m =>
          m.id === msgId
            ? { ...m, confirmadoPor: [...(m.confirmadoPor || []), rol] }
            : m
        )
      },
      contratos: prev.contratos.map(c => 
        c.id === prev.contratoSeleccionado 
          ? {
              ...c,
              mensajes: c.mensajes.map(m =>
                m.id === msgId
                  ? { ...m, confirmadoPor: [...(m.confirmadoPor || []), rol] }
                  : m
              )
            }
          : c
      )
    }));
  };

  const uploadDocumento = (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => {
    console.log("Uploading document:", doc);
  };

  const seleccionarContrato = (id: string) => {
    const contrato = state.contratos.find(c => c.id === id);
    if (contrato) {
      setState(prev => ({
        ...prev,
        contratoSeleccionado: id,
        expediente: contrato,
      }));
    }
  };

  const loadExpediente = (id: string) => {
    seleccionarContrato(id);
  };

  return (
    <ArrasContext.Provider value={{
      ...state,
      setFase,
      cambiarFase,
      setUsuario,
      setVista,
      addComunicacion,
      enviarMensaje,
      confirmarMensaje,
      uploadDocumento,
      seleccionarContrato,
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
