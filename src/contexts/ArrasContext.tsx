import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ArrasState, ExpedienteArras, MensajeArras, FaseArras, ArrasContextType } from "@/types/arras";
import { expedienteArrasMock } from "@/data/arrasMockData";
import { contratosArrasMock } from "@/data/arrasMultiplesContratos";
import { botFlowMessagesArras, fasesOrdenadasArras } from "@/data/arrasBotFlow";

const ArrasContext = createContext<ArrasContextType | undefined>(undefined);

export const ArrasProvider = ({ children }: { children: ReactNode }) => {
  const [contratos] = useState<ExpedienteArras[]>(contratosArrasMock);
  const [contratoSeleccionado, setContratoSeleccionado] = useState<string>("ARRAS-2026-001");
  
  const [state, setState] = useState<ArrasState>({
    expediente: expedienteArrasMock,
    vistaActual: "dual",
    usuarioActual: "vendedor",
  });

  const cambiarVista = (vista: "consola" | "movil" | "dual") => {
    setState(prev => {
      let nuevoUsuario = prev.usuarioActual;
      
      if (vista === "consola") {
        nuevoUsuario = "operador";
      }
      
      if (vista === "movil" && prev.usuarioActual === "operador") {
        nuevoUsuario = "vendedor";
      }
      
      return {
        ...prev,
        vistaActual: vista,
        usuarioActual: nuevoUsuario,
      };
    });
  };

  const cambiarUsuario = (usuario: "operador" | "vendedor" | "comprador") => {
    setState(prev => ({ ...prev, usuarioActual: usuario }));
  };

  const cambiarFase = (fase: FaseArras) => {
    setState(prev => {
      if (prev.expediente.fase === fase) {
        console.warn(`Ya estamos en la fase ${fase}, evitando duplicación`);
        return prev;
      }
      
      return {
        ...prev,
        expediente: {
          ...prev.expediente,
          fase,
        },
      };
    });

    const mensajesBot = botFlowMessagesArras[fase];
    
    mensajesBot.forEach((msgBot, index) => {
      setTimeout(() => {
        const nuevoMensaje: MensajeArras = {
          id: `bot-arras-${Date.now()}-${index}`,
          tipo: "bot",
          remitente: "bot",
          texto: msgBot.texto,
          timestamp: new Date().toISOString(),
          certificado: true,
          hash: Math.random().toString(36).substring(7),
          leido: true,
          requiereConfirmacion: msgBot.requiereConfirmacion,
          confirmadoPor: [],
          adjuntos: msgBot.adjuntos,
        };

        setState(prev => ({
          ...prev,
          expediente: {
            ...prev.expediente,
            mensajes: [...prev.expediente.mensajes, nuevoMensaje],
          },
        }));
      }, index * 1500);
    });
  };

  const confirmarMensaje = (mensajeId: string, usuario: "vendedor" | "comprador") => {
    setState(prev => {
      const mensajes = prev.expediente.mensajes.map(msg => {
        if (msg.id === mensajeId && msg.requiereConfirmacion) {
          const yaConfirmado = msg.confirmadoPor?.includes(usuario);
          if (!yaConfirmado) {
            const nuevosConfirmados = [...(msg.confirmadoPor || []), usuario];
            
            if (nuevosConfirmados.length === 2) {
              setTimeout(() => {
                const faseActual = prev.expediente.fase;
                const indexActual = fasesOrdenadasArras.indexOf(faseActual);
                if (indexActual < fasesOrdenadasArras.length - 1) {
                  cambiarFase(fasesOrdenadasArras[indexActual + 1]);
                }
              }, 1000);
            }
            
            return { ...msg, confirmadoPor: nuevosConfirmados };
          }
        }
        return msg;
      });

      return {
        ...prev,
        expediente: {
          ...prev.expediente,
          mensajes,
        },
      };
    });
  };

  const enviarMensaje = (mensaje: Omit<MensajeArras, "id" | "timestamp" | "certificado" | "hash" | "leido">) => {
    const nuevoMensaje: MensajeArras = {
      ...mensaje,
      id: `msg-arras-${Date.now()}`,
      timestamp: new Date().toISOString(),
      certificado: true,
      hash: Math.random().toString(36).substring(7),
      leido: false,
    };

    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: [...prev.expediente.mensajes, nuevoMensaje],
      },
    }));

    setTimeout(() => {
      marcarComoLeido(nuevoMensaje.id);
    }, 2000);
  };

  const marcarComoLeido = (mensajeId: string) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        mensajes: prev.expediente.mensajes.map(msg =>
          msg.id === mensajeId ? { ...msg, leido: true } : msg
        ),
      },
    }));
  };

  const actualizarExpediente = (expediente: ExpedienteArras) => {
    setState(prev => ({
      ...prev,
      expediente,
    }));
  };

  const seleccionarContrato = (id: string) => {
    setContratoSeleccionado(id);
    const contrato = contratos.find(c => c.id === id);
    if (contrato) {
      setState(prev => ({
        ...prev,
        expediente: contrato,
      }));
    }
  };

  // Transición automática: configuracion_deposito_arras → generacion_y_firma_contrato_arras
  useEffect(() => {
    if (state.expediente.fase !== "configuracion_deposito_arras") return;

    const mensajes = state.expediente.mensajes;

    const compradorEligioDeposito = mensajes.some(
      m => m.remitente === "comprador" && 
      (m.texto.includes("Depósito en notaría") || m.texto.includes("Depósito en escrow"))
    );

    const vendedorAceptoDeposito = mensajes.some(
      m => m.remitente === "vendedor" && 
      m.texto.includes("Acepto la opción de depósito")
    );

    if (compradorEligioDeposito && vendedorAceptoDeposito) {
      const timer = setTimeout(() => {
        console.log("✅ [DEPOSITO] Opción elegida y aceptada. Transición a generacion_y_firma_contrato_arras.");
        cambiarFase("generacion_y_firma_contrato_arras");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática: gestion_eventos_pre_notaria → convocatoria_y_comparecencia_notarial
  useEffect(() => {
    if (state.expediente.fase !== "gestion_eventos_pre_notaria") return;

    const mensajes = state.expediente.mensajes;

    const vendedorListo = mensajes.some(
      m => m.remitente === "vendedor" && m.texto.includes("Estoy listo para acudir a la notaría")
    );

    const compradorListo = mensajes.some(
      m => m.remitente === "comprador" && m.texto.includes("Estoy listo para acudir a la notaría")
    );

    if (vendedorListo && compradorListo) {
      const timer = setTimeout(() => {
        console.log("✅ [PRE-NOTARIA] Ambas partes listas. Transición a convocatoria_y_comparecencia_notarial.");
        cambiarFase("convocatoria_y_comparecencia_notarial");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática: convocatoria_y_comparecencia_notarial → resultado_formalizacion
  useEffect(() => {
    if (state.expediente.fase !== "convocatoria_y_comparecencia_notarial") return;

    const mensajes = state.expediente.mensajes;

    const vendedorConfirmo = mensajes.some(
      m => m.remitente === "vendedor" && m.texto.includes("Confirmo mi asistencia a la notaría")
    );

    const compradorConfirmo = mensajes.some(
      m => m.remitente === "comprador" && m.texto.includes("Confirmo mi asistencia a la notaría")
    );

    if (vendedorConfirmo && compradorConfirmo) {
      const timer = setTimeout(() => {
        console.log("✅ [CONVOCATORIA] Ambas partes confirmaron asistencia. Transición a resultado_formalizacion.");
        cambiarFase("resultado_formalizacion");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática: resolucion_arras → arbitraje_y_cierre
  useEffect(() => {
    if (state.expediente.fase !== "resolucion_arras") return;

    const mensajes = state.expediente.mensajes;

    const vendedorAcepto = mensajes.some(
      m => m.remitente === "vendedor" && m.texto.includes("Acepto la resolución de arras")
    );

    const compradorAcepto = mensajes.some(
      m => m.remitente === "comprador" && m.texto.includes("Acepto la resolución de arras")
    );

    if (vendedorAcepto && compradorAcepto) {
      const timer = setTimeout(() => {
        console.log("✅ [RESOLUCION] Ambas partes aceptaron resolución. Transición a arbitraje_y_cierre.");
        cambiarFase("arbitraje_y_cierre");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  return (
    <ArrasContext.Provider
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
    </ArrasContext.Provider>
  );
};

export const useArras = () => {
  const context = useContext(ArrasContext);
  if (!context) {
    console.warn("useArras called outside ArrasProvider. Using fallback mock state.");

    return {
      expediente: expedienteArrasMock,
      vistaActual: "dual" as const,
      usuarioActual: "vendedor" as const,
      cambiarVista: () => {},
      cambiarUsuario: () => {},
      cambiarFase: () => {},
      enviarMensaje: () => {},
      actualizarExpediente: () => {},
      marcarComoLeido: () => {},
      confirmarMensaje: () => {},
      contratos: [expedienteArrasMock],
      contratoSeleccionado: expedienteArrasMock.id,
      seleccionarContrato: () => {},
    } satisfies ArrasContextType;
  }
  return context;
};
