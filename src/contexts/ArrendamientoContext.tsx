import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ArrendamientoState, Expediente, Mensaje, FaseArrendamiento } from "@/types/arrendamiento";
import { expedienteMock } from "@/data/arrendamientoMockData";
import { contratosMock } from "@/data/arrendamientoMultiplesContratos";
import { botFlowMessages, fasesOrdenadas } from "@/data/arrendamientoBotFlow";

interface ArrendamientoContextType extends ArrendamientoState {
  cambiarVista: (vista: "consola" | "movil" | "dual") => void;
  cambiarUsuario: (usuario: "operador" | "arrendador" | "arrendatario") => void;
  cambiarFase: (fase: FaseArrendamiento) => void;
  enviarMensaje: (mensaje: Omit<Mensaje, "id" | "timestamp" | "certificado" | "hash" | "leido">) => void;
  actualizarExpediente: (expediente: Partial<Expediente>) => void;
  marcarComoLeido: (mensajeId: string) => void;
  confirmarMensaje: (mensajeId: string, usuario: "arrendador" | "arrendatario") => void;
  contratos: Expediente[];
  contratoSeleccionado: string;
  seleccionarContrato: (id: string) => void;
}

const ArrendamientoContext = createContext<ArrendamientoContextType | undefined>(undefined);

export const ArrendamientoProvider = ({ children }: { children: ReactNode }) => {
  const [contratos] = useState<Expediente[]>(contratosMock);
  const [contratoSeleccionado, setContratoSeleccionado] = useState<string>("EXP-2026-001");
  
  const [state, setState] = useState<ArrendamientoState>({
    expediente: expedienteMock,
    vistaActual: "dual",
    usuarioActual: "arrendador",
  });

  const cambiarVista = (vista: "consola" | "movil" | "dual") => {
    setState(prev => {
      let nuevoUsuario = prev.usuarioActual;
      
      // Si cambia a consola, forzar rol operador
      if (vista === "consola") {
        nuevoUsuario = "operador";
      }
      
      // Si cambia a móvil desde consola, cambiar a arrendador
      if (vista === "movil" && prev.usuarioActual === "operador") {
        nuevoUsuario = "arrendador";
      }
      
      return {
        ...prev,
        vistaActual: vista,
        usuarioActual: nuevoUsuario,
      };
    });
  };

  const cambiarUsuario = (usuario: "operador" | "arrendador" | "arrendatario") => {
    setState(prev => ({ ...prev, usuarioActual: usuario }));
  };

  const cambiarFase = (fase: FaseArrendamiento) => {
    // Evitar cambiar a la misma fase (protección contra duplicación)
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

    // Generar mensajes del bot para esta fase
    const mensajesBot = botFlowMessages[fase];
    
    mensajesBot.forEach((msgBot, index) => {
      setTimeout(() => {
        const nuevoMensaje: Mensaje = {
          id: `bot-${Date.now()}-${index}`,
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
      }, index * 1500); // Espaciar mensajes del bot
    });
  };

  const confirmarMensaje = (mensajeId: string, usuario: "arrendador" | "arrendatario") => {
    setState(prev => {
      const mensajes = prev.expediente.mensajes.map(msg => {
        if (msg.id === mensajeId && msg.requiereConfirmacion) {
          const yaConfirmado = msg.confirmadoPor?.includes(usuario);
          if (!yaConfirmado) {
            const nuevosConfirmados = [...(msg.confirmadoPor || []), usuario];
            
            // Si ambas partes han confirmado, avanzar a la siguiente fase
            if (nuevosConfirmados.length === 2) {
              setTimeout(() => {
                const faseActual = prev.expediente.fase;
                const indexActual = fasesOrdenadas.indexOf(faseActual);
                if (indexActual < fasesOrdenadas.length - 1) {
                  cambiarFase(fasesOrdenadas[indexActual + 1]);
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

  const enviarMensaje = (mensaje: Omit<Mensaje, "id" | "timestamp" | "certificado" | "hash" | "leido">) => {
    const nuevoMensaje: Mensaje = {
      ...mensaje,
      id: `msg-${Date.now()}`,
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

    // Simular que el mensaje se marca como leído después de 2 segundos
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

  const actualizarExpediente = (expediente: Partial<Expediente>) => {
    setState(prev => ({
      ...prev,
      expediente: {
        ...prev.expediente,
        ...expediente,
      },
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

  // Transición automática de identificacion_inmueble a extracto_informado
  // Solo depende de que ambas partes confirmen el inmueble (Nota Informativa es opcional)
  useEffect(() => {
    if (state.expediente.fase !== "identificacion_inmueble") return;

    const mensajes = state.expediente.mensajes;

    // OPCIÓN A: Confirmación explícita O implícita (cualquier acción de Nota)
    const arrendadorConfirmoInmueble = mensajes.some(
      (m) =>
        m.remitente === "arrendador" &&
        (m.texto.includes("Confirmo identificación del inmueble") ||
         m.texto.includes("Aporto Nota Informativa vigente del Registro de la Propiedad") ||
         m.texto.includes("Solicito Nota Informativa actualizada del Registro de la Propiedad") ||
         m.texto.includes("Decido continuar sin aportar Nota Informativa del Registro de la Propiedad"))
    );

    const arrendatarioConfirmoInmueble = mensajes.some(
      (m) =>
        m.remitente === "arrendatario" &&
        (m.texto.includes("Confirmo identificación del inmueble") ||
         m.texto.includes("Solicito al Arrendador@ que aporte una Nota Informativa actualizada del Registro de la Propiedad") ||
         m.texto.includes("Acepto continuar sin requerir la Nota Informativa del Registro de la Propiedad"))
    );

    const ambasPartesConfirmaronInmueble =
      arrendadorConfirmoInmueble && arrendatarioConfirmoInmueble;

    if (ambasPartesConfirmaronInmueble) {
      const timer = setTimeout(() => {
        console.log(
          "✅ [IDENTIFICACIÓN INMUEBLE] Ambas partes confirmaron el inmueble. Transición a extracto_informado."
        );
        cambiarFase("extracto_informado");
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Detectar automáticamente cuando todos los documentos de pago están subidos
  useEffect(() => {
    if (state.expediente.fase !== "pagos_iniciales") return;

    const mensajes = state.expediente.mensajes;

    // Patrones de detección más robustos y con logging
    const tieneFianza = mensajes.some(m =>
      m.remitente === "arrendatario" && 
      (m.texto.toLowerCase().includes("justificante de fianza") ||
       m.texto.toLowerCase().includes("fianza") && m.texto.toLowerCase().includes("subido"))
    );
    const tieneRenta = mensajes.some(m =>
      m.remitente === "arrendatario" && 
      (m.texto.toLowerCase().includes("justificante de primera renta") ||
       m.texto.toLowerCase().includes("primera renta") && m.texto.toLowerCase().includes("subido"))
    );
    const tieneResguardo = mensajes.some(m =>
      m.remitente === "arrendador" && 
      (m.texto.toLowerCase().includes("resguardo oficial del depósito") ||
       m.texto.toLowerCase().includes("resguardo") && m.texto.toLowerCase().includes("ivima"))
    );

    console.log("🔍 PAGOS_INICIALES | Detección documentos:", {
      fase: state.expediente.fase,
      tieneFianza,
      tieneRenta, 
      tieneResguardo,
      totalMensajes: mensajes.length
    });

    // Solo avanzar cuando AMBAS partes han completado sus obligaciones
    if (tieneFianza && tieneRenta && tieneResguardo) {
      console.log("✅ PAGOS_INICIALES | Todos los documentos detectados. Transicionando a estado_inicial en 2s...");
      const timer = setTimeout(() => {
        cambiarFase("estado_inicial");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // FASE 3: Transición automática de canal_oficial a vida_contrato tras confirmación doble
  useEffect(() => {
    if (state.expediente.fase !== "canal_oficial") return;

    // Buscar el último mensaje del bot que requiere confirmación en esta fase
    const mensajeConfirmacion = state.expediente.mensajes
      .filter(m => m.tipo === "bot" && m.requiereConfirmacion)
      .pop();

    if (mensajeConfirmacion) {
      const confirmadoPor = mensajeConfirmacion.confirmadoPor || [];
      const confirmaronAmbos = 
        confirmadoPor.includes("arrendador") && 
        confirmadoPor.includes("arrendatario");

      if (confirmaronAmbos) {
        // Ambas partes han confirmado, transicionar automáticamente a vida_contrato
        const timer = setTimeout(() => {
          console.log("✅ [FASE 3] Ambas partes confirmaron medio de notificaciones. Transición a vida_contrato.");
          cambiarFase("vida_contrato");
        }, 2000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática de impago_evento a vida_contrato cuando arrendatario paga
  useEffect(() => {
    if (state.expediente.fase !== "impago_evento") return;

    const mensajes = state.expediente.mensajes;
    
    // Buscar si el arrendatario subió justificante de pago tras el impago
    const haSubidoPago = mensajes.some(m =>
      m.remitente === "arrendatario" && 
      m.texto.toLowerCase().includes("justificante") &&
      m.texto.toLowerCase().includes("renta")
    );

    if (haSubidoPago) {
      const timer = setTimeout(() => {
        console.log("✅ [IMPAGO] Arrendatario subió justificante de pago. Transición a vida_contrato.");
        cambiarFase("vida_contrato");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática de devolucion_fianza a cierre tras confirmación del arrendatario
  useEffect(() => {
    if (state.expediente.fase !== "devolucion_fianza") return;

    const mensajes = state.expediente.mensajes;

    // Verificar que el arrendador subió el informe final
    const tieneInformeFinal = mensajes.some(m =>
      m.remitente === "arrendador" && 
      m.texto.toLowerCase().includes("informe de estado final")
    );

    // Buscar el último mensaje del bot que requiere confirmación del cálculo
    const mensajeConfirmacion = mensajes
      .filter(m => m.tipo === "bot" && m.requiereConfirmacion && m.texto.includes("CÁLCULO DE LIQUIDACIÓN"))
      .pop();

    if (tieneInformeFinal && mensajeConfirmacion) {
      const confirmadoPor = mensajeConfirmacion.confirmadoPor || [];
      const arrendatarioConfirmo = confirmadoPor.includes("arrendatario");

      if (arrendatarioConfirmo) {
        const timer = setTimeout(() => {
          console.log("✅ [DEVOLUCIÓN FIANZA] Arrendatario confirmó cálculo. Transición a cierre.");
          cambiarFase("cierre");
        }, 2000);

        return () => clearTimeout(timer);
      }
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática de vida_contrato a prorroga_legal tras subir renta mensual
  useEffect(() => {
    if (state.expediente.fase !== "vida_contrato") return;

    const mensajes = state.expediente.mensajes;

    // Verificar si el arrendatario subió justificante de renta mensual
    const tieneRentaMensual = mensajes.some(m =>
      m.remitente === "arrendatario" && 
      m.texto.toLowerCase().includes("justificante de renta mensual")
    );

    if (tieneRentaMensual) {
      const timer = setTimeout(() => {
        console.log("✅ [VIDA CONTRATO] Arrendatario subió justificante de renta mensual. Transición a prorroga_legal.");
        cambiarFase("prorroga_legal");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  // Transición automática de recuperacion_necesidad a devolucion_fianza
  useEffect(() => {
    if (state.expediente.fase !== "recuperacion_necesidad") return;

    const mensajes = state.expediente.mensajes;

    // Verificar si el arrendador invocó el Art. 9.3 LAU
    const haInvocadoArticulo = mensajes.some(m =>
      m.remitente === "arrendador" && 
      (m.texto.toLowerCase().includes("art. 9.3") || 
       m.texto.toLowerCase().includes("artículo 9.3") ||
       m.texto.includes("Confirmo como arrendador"))
    );

    if (haInvocadoArticulo) {
      const timer = setTimeout(() => {
        console.log("✅ [RECUPERACIÓN NECESIDAD] Arrendador invocó Art. 9.3 LAU. Transición a devolucion_fianza.");
        cambiarFase("devolucion_fianza");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.expediente.mensajes, state.expediente.fase]);

  return (
    <ArrendamientoContext.Provider
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
    </ArrendamientoContext.Provider>
  );
};

export const useArrendamiento = () => {
  const context = useContext(ArrendamientoContext);
  if (!context) {
    console.warn("useArrendamiento called outside ArrendamientoProvider. Using fallback mock state.");

    // Fallback de solo lectura para evitar que la demo se rompa en vistas aisladas (por ejemplo, Design/Preview)
    return {
      expediente: expedienteMock,
      vistaActual: "dual" as const,
      usuarioActual: "arrendador" as const,
      cambiarVista: () => {},
      cambiarUsuario: () => {},
      cambiarFase: () => {},
      enviarMensaje: () => {},
      actualizarExpediente: () => {},
      marcarComoLeido: () => {},
      confirmarMensaje: () => {},
      contratos: [expedienteMock],
      contratoSeleccionado: expedienteMock.id,
      seleccionarContrato: () => {},
    } satisfies ArrendamientoContextType;
  }
  return context;
};
