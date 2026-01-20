import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  ArrasContextType,
  ArrasState,
  ExpedienteArras,
  ArrasFase,
  FaseArras,
  ArrasRol,
  Documento,
  MensajeArras,
  Comunicacion,
  EstadoContrato,
  Mandato,
  EstadoDocumento,
  TipoRolUsuario,
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

  const setEstado = (estado: EstadoContrato) => {
    setState(prev => ({
      ...prev,
      expediente: { ...prev.expediente, estado }
    }));
  };

  const setFase = (fase: ArrasFase) => {
    setState(prev => ({
      ...prev,
      expediente: { ...prev.expediente, faseActual: fase }
    }));
  };

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

  const setMandato = (mandato: Mandato | undefined) => {
    setState(prev => ({ ...prev, mandatoActivo: mandato }));
  };

  const addComunicacion = (comunicacion: Omit<Comunicacion, "id" | "timestamp" | "evidencia">) => {
    const nuevaCom: Comunicacion = {
      ...comunicacion,
      id: `com-${Date.now()}`,
      timestamp: new Date().toISOString(),
      evidencia: {
        hash: `hash-${Date.now().toString(16)}`,
        tsa: `TSA-${Date.now()}`,
        selloId: `sello-${Date.now()}`,
      },
    };
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        comunicaciones: [...(prev.expediente.comunicaciones || []), nuevaCom],
      },
    }));
  };

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
    }));
  };

  const confirmarMensaje = (msgId: string, rol: string) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: prev.expediente.mensajes.map(m =>
          m.id === msgId ? { ...m, confirmadoPor: [...(m.confirmadoPor || []), rol] } : m
        )
      },
    }));
  };

  const uploadDocumento = (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => {
    console.log("Uploading document:", doc);
  };

  const actualizarItemInventario = (itemId: string, estado: EstadoDocumento, archivoId?: string) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        inventarioDocumental: prev.expediente.inventarioDocumental.map(item =>
          item.id === itemId ? { ...item, estado, archivoId } : item
        )
      },
    }));
  };

  const validarDocumento = (itemId: string, validadoPor: string) => {
    actualizarItemInventario(itemId, "VALIDADO");
  };

  const rechazarDocumento = (itemId: string, motivo: string) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        inventarioDocumental: prev.expediente.inventarioDocumental.map(item =>
          item.id === itemId ? { ...item, estado: "RECHAZADO" as EstadoDocumento, motivoRechazo: motivo } : item
        )
      },
    }));
  };

  const firmarContrato = (rol: TipoRolUsuario) => {
    console.log("Firmando como:", rol);
  };

  const ratificarDocumento = (documentoId: string, rol: TipoRolUsuario) => {
    console.log("Ratificando:", documentoId, rol);
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

  const loadExpediente = (id: string) => seleccionarContrato(id);

  const puedeTransicionar = (nuevoEstado: EstadoContrato) => true;

  const getDocumentosFaltantes = () => 
    state.expediente.inventarioDocumental.filter(d => d.estado === "PENDIENTE");

  return (
    <ArrasContext.Provider value={{
      ...state,
      setEstado,
      setFase,
      cambiarFase,
      setUsuario,
      setMandato,
      setVista,
      addComunicacion,
      enviarMensaje,
      confirmarMensaje,
      uploadDocumento,
      actualizarItemInventario,
      validarDocumento,
      rechazarDocumento,
      firmarContrato,
      ratificarDocumento,
      seleccionarContrato,
      loadExpediente,
      puedeTransicionar,
      getDocumentosFaltantes,
    }}>
      {children}
    </ArrasContext.Provider>
  );
};

export const useArras = () => {
  const context = useContext(ArrasContext);
  if (!context) throw new Error("useArras must be used within an ArrasProvider");
  return context;
};
