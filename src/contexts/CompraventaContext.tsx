import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  ExpedienteCompraventa,
  CompraventaState,
  CompraventaContextType,
  MensajeCompraventa,
  FaseCompraventa,
} from "@/types/compraventa";
import { expedienteCompraventaMock } from "@/data/compraventaMockData";
import { compraventaMultiplesContratos } from "@/data/compraventaMultiplesContratos";
import { botFlowMessagesCompraventa } from "@/data/compraventaBotFlow";

const CompraventaContext = createContext<CompraventaContextType | undefined>(undefined);

export const CompraventaProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<CompraventaState>({
    expediente: expedienteCompraventaMock,
    vistaActual: "movil",
    usuarioActual: "vendedor",
  });

  const [contratos] = useState<ExpedienteCompraventa[]>(compraventaMultiplesContratos);
  const [contratoSeleccionado, setContratoSeleccionado] = useState<string>(compraventaMultiplesContratos[0]?.id || "");

  const cambiarVista = (vista: "consola" | "movil" | "dual") => {
    setState((prev) => ({ ...prev, vistaActual: vista }));
  };

  const cambiarUsuario = (usuario: "operador" | "vendedor" | "comprador") => {
    setState((prev) => ({ ...prev, usuarioActual: usuario }));
  };

  const cambiarFase = (fase: FaseCompraventa) => {
    console.log(`🔄 Cambiando fase a: ${fase}`);
    setState((prev) => {
      const nuevoExpediente = { ...prev.expediente, fase };
      
      // Agregar evento al timeline
      const nuevoEvento = {
        id: `evt-${Date.now()}`,
        tipo: "cambio_fase",
        fecha: new Date().toISOString(),
        mensaje: `Fase actualizada: ${fase}`,
        icono: "ArrowRight",
      };

      // Agregar mensaje del bot para la nueva fase
      const mensajesBot = botFlowMessagesCompraventa[fase] || [];
      const nuevosMensajes = mensajesBot.map((msg, idx) => ({
        id: `msg-${Date.now()}-${idx}`,
        tipo: "bot" as const,
        remitente: "certy" as const,
        texto: msg.texto,
        timestamp: new Date().toISOString(),
        certificado: true,
        hash: Math.random().toString(36).substring(2, 15),
        leido: false,
        requiereConfirmacion: msg.requiereConfirmacion,
        adjuntos: msg.adjuntos?.map((adj) => ({
          ...adj,
          hash: Math.random().toString(36).substring(2, 15),
        })),
      }));

      return {
        ...prev,
        expediente: {
          ...nuevoExpediente,
          eventos: [...nuevoExpediente.eventos, nuevoEvento],
          mensajes: [...nuevoExpediente.mensajes, ...nuevosMensajes],
        },
      };
    });
  };

  const enviarMensaje = (mensaje: Omit<MensajeCompraventa, "id" | "timestamp" | "certificado" | "hash" | "leido">) => {
    const nuevoMensaje: MensajeCompraventa = {
      ...mensaje,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toISOString(),
      certificado: true,
      hash: Math.random().toString(36).substring(2, 15),
      leido: false,
    };

    setState((prev) => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: [...prev.expediente.mensajes, nuevoMensaje],
      },
    }));

    // Agregar evento al timeline
    const nuevoEvento = {
      id: `evt-${Date.now()}`,
      tipo: "mensaje",
      fecha: new Date().toISOString(),
      mensaje: `${mensaje.remitente} envió un mensaje`,
      icono: "MessageSquare",
    };

    setState((prev) => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        eventos: [...prev.expediente.eventos, nuevoEvento],
      },
    }));
  };

  const actualizarExpediente = (expediente: Partial<ExpedienteCompraventa>) => {
    setState((prev) => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        ...expediente,
      },
    }));
  };

  const marcarComoLeido = (mensajeId: string) => {
    setState((prev) => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: prev.expediente.mensajes.map((m) =>
          m.id === mensajeId ? { ...m, leido: true } : m
        ),
      },
    }));
  };

  const confirmarMensaje = (mensajeId: string, remitente: "vendedor" | "comprador") => {
    setState((prev) => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: prev.expediente.mensajes.map((m) =>
          m.id === mensajeId
            ? {
                ...m,
                confirmadoPor: [...(m.confirmadoPor || []), remitente],
              }
            : m
        ),
      },
    }));
  };

  const seleccionarContrato = (id: string) => {
    const contrato = contratos.find((c) => c.id === id);
    if (contrato) {
      setState((prev) => ({ ...prev, expediente: contrato }));
      setContratoSeleccionado(id);
    }
  };

  // ==================== TRANSICIONES AUTOMÁTICAS ====================

  // 1. apertura_expediente → identificacion_partes (manual via button)
  
  // 2. identificacion_partes → identificacion_inmueble
  useEffect(() => {
    if (state.expediente.fase === "identificacion_partes_compraventa") {
      const vendedorConfirmado = state.expediente.mensajes.some(m => 
        m.remitente === "vendedor" && m.texto.toLowerCase().includes("quiero unirme al canal")
      );
      const compradorConfirmado = state.expediente.mensajes.some(m => 
        m.remitente === "comprador" && m.texto.toLowerCase().includes("quiero unirme al canal")
      );
      
      console.log(`📊 IDENTIFICACION_PARTES | Vendedor: ${vendedorConfirmado}, Comprador: ${compradorConfirmado}`);
      
      if (vendedorConfirmado && compradorConfirmado) {
        setTimeout(() => cambiarFase("identificacion_inmueble_compraventa"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 2. identificacion_inmueble → financiacion_bancaria
  useEffect(() => {
    if (state.expediente.fase === "identificacion_inmueble_compraventa") {
      const vendedorConfirmado = state.expediente.mensajes.some(m => 
        m.remitente === "vendedor" && 
        (m.texto.toLowerCase().includes("confirmar identificación del inmueble") ||
         m.texto.toLowerCase().includes("nota informativa"))
      );
      const compradorConfirmado = state.expediente.mensajes.some(m => 
        m.remitente === "comprador" && 
        (m.texto.toLowerCase().includes("confirmar identificación del inmueble") ||
         m.texto.toLowerCase().includes("nota informativa"))
      );
      
      console.log(`📊 IDENTIFICACION_INMUEBLE | Vendedor: ${vendedorConfirmado}, Comprador: ${compradorConfirmado}`);
      
      if (vendedorConfirmado && compradorConfirmado) {
        setTimeout(() => cambiarFase("financiacion_bancaria"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 3. financiacion_bancaria → due_diligence_completa
  useEffect(() => {
    if (state.expediente.fase === "financiacion_bancaria") {
      const compradorModalidad = state.expediente.mensajes.some(m => 
        m.remitente === "comprador" && 
        (m.texto.toLowerCase().includes("contado") || m.texto.toLowerCase().includes("hipoteca"))
      );
      const vendedorConfirmado = state.expediente.mensajes.some(m => 
        m.remitente === "vendedor" && 
        m.texto.toLowerCase().includes("confirmo conocimiento")
      );
      
      console.log(`📊 FINANCIACION | Comprador modalidad: ${compradorModalidad}, Vendedor: ${vendedorConfirmado}`);
      
      if (compradorModalidad && vendedorConfirmado) {
        setTimeout(() => cambiarFase("due_diligence_completa"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 4. due_diligence_completa → configuracion_modalidad_cierre
  useEffect(() => {
    if (state.expediente.fase === "due_diligence_completa") {
      const documentosRequeridos = [
        "cédula de habitabilidad",
        "ibi",
        "comunidad",
        "certificado energético",
        "licencia",
        "escritura de propiedad",
        "nota simple"
      ];
      
      const documentosSubidos = documentosRequeridos.filter(doc =>
        state.expediente.mensajes.some(m =>
          m.remitente === "vendedor" &&
          m.texto.toLowerCase().includes(doc)
        )
      );
      
      const compradorRevisado = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("confirmo recepción")
      );
      
      console.log(`📊 DUE_DILIGENCE | Docs: ${documentosSubidos.length}/7, Comprador revisado: ${compradorRevisado}`);
      
      if (documentosSubidos.length >= 3 && compradorRevisado) {
        setTimeout(() => cambiarFase("configuracion_modalidad_cierre"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 5. configuracion_modalidad_cierre → Bifurcación (7a o 7b)
  useEffect(() => {
    if (state.expediente.fase === "configuracion_modalidad_cierre") {
      const modalidadSeleccionada = state.expediente.contrato.modalidadCierre;
      
      const vendedorAcepta = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("acepto modalidad") &&
        m.texto.toLowerCase().includes(modalidadSeleccionada === "directa" ? "directa" : "escalonada")
      );

      const compradorAcepta = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("acepto modalidad") &&
        m.texto.toLowerCase().includes(modalidadSeleccionada === "directa" ? "directa" : "escalonada")
      );
      
      console.log(`📊 MODALIDAD_CIERRE | Modalidad: ${modalidadSeleccionada}, Vendedor: ${vendedorAcepta}, Comprador: ${compradorAcepta}`);
      
      if (modalidadSeleccionada && vendedorAcepta && compradorAcepta) {
        setTimeout(() => {
          if (modalidadSeleccionada === "directa") {
            cambiarFase("firma_contrato_compraventa_directa");
          } else if (modalidadSeleccionada === "escalonada") {
            cambiarFase("firma_documento_privado");
          }
        }, 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase, state.expediente.contrato.modalidadCierre]);

  // 6a. Ruta Directa: firma_contrato_compraventa_directa → escrituracion_notarial_directa
  useEffect(() => {
    if (state.expediente.fase === "firma_contrato_compraventa_directa") {
      const vendedorFirmado = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("acepto los términos")
      );
      const compradorFirmado = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("acepto los términos")
      );
      
      console.log(`📊 FIRMA_CONTRATO_DIRECTA | Vendedor: ${vendedorFirmado}, Comprador: ${compradorFirmado}`);
      
      if (vendedorFirmado && compradorFirmado) {
        setTimeout(() => cambiarFase("escrituracion_notarial_directa"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 6b. Ruta Escalonada: firma_documento_privado → pago_parcial_documento_privado
  useEffect(() => {
    if (state.expediente.fase === "firma_documento_privado") {
      const vendedorFirmado = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("acepto documento privado")
      );
      const compradorFirmado = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("acepto documento privado")
      );
      
      console.log(`📊 FIRMA_DOC_PRIVADO | Vendedor: ${vendedorFirmado}, Comprador: ${compradorFirmado}`);
      
      if (vendedorFirmado && compradorFirmado) {
        setTimeout(() => cambiarFase("pago_parcial_documento_privado"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 7b. pago_parcial_documento_privado → elevacion_a_escritura_publica
  useEffect(() => {
    if (state.expediente.fase === "pago_parcial_documento_privado") {
      const compradorPago = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("justificante de pago parcial")
      );
      const vendedorConfirmado = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("confirmo recepción")
      );
      
      console.log(`📊 PAGO_PARCIAL | Comprador pago: ${compradorPago}, Vendedor confirmado: ${vendedorConfirmado}`);
      
      if (compradorPago && vendedorConfirmado) {
        setTimeout(() => cambiarFase("elevacion_a_escritura_publica"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 8a. escrituracion_notarial_directa → entrega_llaves
  useEffect(() => {
    if (state.expediente.fase === "escrituracion_notarial_directa") {
      const escrituraSubida = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("escritura pública")
      );
      
      console.log(`📊 ESCRITURACION_DIRECTA | Escritura subida: ${escrituraSubida}`);
      
      if (escrituraSubida) {
        setTimeout(() => cambiarFase("entrega_llaves"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 8b. elevacion_a_escritura_publica → entrega_llaves
  useEffect(() => {
    if (state.expediente.fase === "elevacion_a_escritura_publica") {
      const escrituraSubida = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("escritura pública definitiva")
      );
      
      console.log(`📊 ELEVACION_ESCRITURA | Escritura subida: ${escrituraSubida}`);
      
      if (escrituraSubida) {
        setTimeout(() => cambiarFase("entrega_llaves"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // 9. entrega_llaves → cierre_expediente_compraventa
  useEffect(() => {
    if (state.expediente.fase === "entrega_llaves") {
      const vendedorEntrega = state.expediente.mensajes.some(m =>
        m.remitente === "vendedor" &&
        m.texto.toLowerCase().includes("entrego las llaves")
      );
      const compradorConfirmado = state.expediente.mensajes.some(m =>
        m.remitente === "comprador" &&
        m.texto.toLowerCase().includes("confirmo recepción")
      );
      
      console.log(`📊 ENTREGA_LLAVES | Vendedor entrega: ${vendedorEntrega}, Comprador confirma: ${compradorConfirmado}`);
      
      if (vendedorEntrega && compradorConfirmado) {
        setTimeout(() => cambiarFase("cierre_expediente_compraventa"), 2000);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  return (
    <CompraventaContext.Provider
      value={{
        ...state,
        cambiarVista,
        cambiarUsuario,
        cambiarFase,
        enviarMensaje,
        actualizarExpediente,
        marcarComoLeido,
        confirmarMensaje,
        contratos,
        contratoSeleccionado,
        seleccionarContrato,
      }}
    >
      {children}
    </CompraventaContext.Provider>
  );
};

export const useCompraventa = (): CompraventaContextType => {
  const context = useContext(CompraventaContext);
  if (!context) {
    console.warn("⚠️ useCompraventa usado fuera de CompraventaProvider, usando mock data");
    return {
      expediente: expedienteCompraventaMock,
      vistaActual: "movil",
      usuarioActual: "vendedor",
      cambiarVista: () => {},
      cambiarUsuario: () => {},
      cambiarFase: () => {},
      enviarMensaje: () => {},
      actualizarExpediente: () => {},
      marcarComoLeido: () => {},
      confirmarMensaje: () => {},
      contratos: compraventaMultiplesContratos,
      contratoSeleccionado: compraventaMultiplesContratos[0]?.id || "",
      seleccionarContrato: () => {},
    };
  }
  return context;
};
