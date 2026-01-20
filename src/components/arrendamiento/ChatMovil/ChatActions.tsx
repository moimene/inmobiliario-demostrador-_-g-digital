import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle, FileText, Upload, AlertCircle, Check, Wrench, MessageSquare, CheckCircle2, Scale, Download } from "lucide-react";
import { toast } from "sonner";
import { PreviewContratoFirmadoModal } from "./PreviewContratoFirmadoModal";
import { PreviewActaCierreModal } from "./PreviewActaCierreModal";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChatActionsProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatActions = ({ rolForzado }: ChatActionsProps) => {
  const { expediente, cambiarFase, enviarMensaje, confirmarMensaje, usuarioActual, actualizarExpediente } = useArrendamiento();
  const rolActivo = rolForzado || usuarioActual;
  const [actaCierreModalOpen, setActaCierreModalOpen] = useState(false);

  // DEBUG: Trazas para verificar fase y rol activo
  console.log("[ChatActions] fase:", expediente.fase, "| rolActivo:", rolActivo);

  const handleConfirmar = () => {
    if (rolActivo === "operador") {
      toast.error("El operador no puede confirmar. Cambie a vista de Arrendador o Arrendatario.");
      return;
    }

    // Buscar el último mensaje que requiere confirmación (más reciente de la fase actual)
    const mensajePendiente = [...expediente.mensajes]
      .reverse()
      .find((msg) => msg.requiereConfirmacion && !(msg.confirmadoPor?.includes(rolActivo)));

    if (!mensajePendiente) {
      return;
    }

    // Determinar texto según fase actual
    let texto = "";
    if (expediente.fase === "identificacion_partes") {
      if (rolActivo === "arrendador") {
        const arrendador = expediente.partes.arrendador;
        texto = `Como arrendador del inmueble, ${arrendador.nombre} (NIF: ${arrendador.nif}), declaro que quiero unirme a este canal certificado para gestionar mi contrato de arrendamiento y acepto los términos de uso del canal, así como su política de privacidad`;
      } else {
        const arrendatario = expediente.partes.arrendatario;
        texto = `Como arrendatario, ${arrendatario.nombre} (NIF: ${arrendatario.nif}), declaro que quiero unirme a este canal certificado para gestionar mi contrato de arrendamiento y acepto los términos de uso del canal, así como su política de privacidad`;
      }
    } else if (expediente.fase === "identificacion_inmueble") {
      // Texto específico y consistente para detección de confirmación de inmueble
      texto = "Confirmo identificación del inmueble";
    } else {
      texto =
        rolActivo === "arrendador"
          ? "Confirmo como arrendador del inmueble"
          : "Confirmo como arrendatario interesado";
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo,
      texto,
    });

    confirmarMensaje(mensajePendiente.id, rolActivo as "arrendador" | "arrendatario");
    toast.success("Confirmación enviada");
  };

  const handleSubirDocumento = (tipo: string) => {
    // Validación por tipo de documento y rol
    if (tipo === "resguardo" && rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede subir el resguardo del depósito.");
      return;
    }

    if ((tipo === "fianza" || tipo === "primera renta" || tipo === "renta mensual") && rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede subir justificantes de pago.");
      return;
    }

    if (tipo === "informe final" && rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede subir el informe de estado final.");
      return;
    }

    const textoMensaje =
      tipo === "resguardo"
        ? "He subido el resguardo oficial del depósito (IVIMA u organismo competente)"
        : tipo === "informe final"
        ? "He subido el informe de estado final del inmueble"
        : `He subido el justificante de ${tipo}`;

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: textoMensaje,
      adjuntos: [
        {
          tipo: "pdf",
          nombre: `Justificante_${tipo}.pdf`,
          url: "/documento.pdf",
          hash: Math.random().toString(36).substring(7),
        },
      ],
    });

    toast.success(`Documento de ${tipo} enviado`);
  };

  const handleSubirFotos = () => {
    if (rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede subir fotos del estado inicial.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: "He adjuntado fotos del estado inicial del inmueble para el registro.",
    });

    toast.success("Fotos del estado inicial enviadas");
  };

  const handleConfirmarRecepcion = () => {
    if (rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede confirmar la recepción del inmueble.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: "Declaro que he recibido el inmueble y que su estado es conforme a lo acordado.",
    });

    toast.success("Recepción del inmueble confirmada");

    // Avanzar automáticamente a canal_oficial
    setTimeout(() => {
      cambiarFase("canal_oficial");
    }, 2000);
  };

  const handleDecisionProrroga = (decision: boolean) => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede tomar esta decisión.");
      return;
    }

    const texto = decision ? "Confirmo que deseo prorrogar el contrato" : "Decido no prorrogar el contrato";

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto,
    });

    if (decision) {
      // Si acepta prórroga, el contrato continúa activo → volver a vida_contrato
      toast.success("Prórroga aceptada. El contrato continúa activo.");
      setTimeout(() => cambiarFase("vida_contrato"), 2000);
    } else {
      // Si rechaza prórroga, el arrendatario puede invocar derecho LAU
      toast.success("Decisión registrada. Consultando al arrendatario.");
      setTimeout(() => cambiarFase("decision_arrendatario"), 2000);
    }
  };

  const handleInvocarRecuperacionNecesidad = () => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede invocar la recuperación por necesidad.");
      return;
    }

    // VALIDACIÓN CRÍTICA: Verificar que existe cláusula Art. 9.3 LAU en el contrato
    if (!expediente.contrato.tieneClausulaRecuperacionNecesidad) {
      toast.error(
        "❌ No es posible invocar recuperación por necesidad: El contrato NO contiene la cláusula expresa del Art. 9.3 LAU. Este derecho debe estar expresamente pactado en el contrato.",
        {
          duration: 8000,
          description: "Base legal: Art. 9.3 LAU - Se requiere pacto expreso",
        }
      );
      return;
    }

    // Validación adicional: Han transcurrido más de 12 meses
    const fechaInicio = new Date(expediente.contrato.fechaInicio);
    const ahora = new Date();
    const mesesTranscurridos = (ahora.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24 * 30);
    
    if (mesesTranscurridos < 12) {
      toast.error(
        "❌ No es posible invocar recuperación por necesidad: Deben haber transcurrido al menos 12 meses desde el inicio del contrato.",
        {
          duration: 6000,
          description: `Han transcurrido ${Math.floor(mesesTranscurridos)} meses`,
        }
      );
      return;
    }

    // Todo validado ✓ Proceder con la invocación
    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Invoco el derecho de recuperación del inmueble por necesidad (Art. 9.3 LAU) para destinarlo a vivienda permanente.",
    });

    toast.success("Recuperación por necesidad invocada conforme a Art. 9.3 LAU", {
      description: "El arrendatario tiene derecho a indemnización",
    });

    // Transición automática a devolucion_fianza
    setTimeout(() => {
      cambiarFase("devolucion_fianza");
    }, 3000);
  };

  const handleDescargarActaCierre = () => {
    setActaCierreModalOpen(true);
  };

  const handleReportarIncidencia = () => {
    if (rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede reportar incidencias de mantenimiento.");
      return;
    }

    // Evitar múltiples incidencias en el flujo de demostración
    const yaHayIncidencia = expediente.mensajes.some(
      (m) => m.remitente === "arrendatario" && m.texto.includes("INCIDENCIA REPORTADA")
    );

    if (yaHayIncidencia) {
      toast.info("Ya hay una incidencia de mantenimiento reportada en este expediente.");
      return;
    }

    // Generar un mensaje certificado con la incidencia reportada
    const incidencias = [
      "🔧 INCIDENCIA REPORTADA: Fuga de agua en el baño principal. Se requiere revisión urgente de fontanería.",
      "🔧 INCIDENCIA REPORTADA: Caldera no enciende. El inmueble no tiene calefacción. Se solicita revisión del técnico autorizado.",
      "🔧 INCIDENCIA REPORTADA: Persiana del dormitorio principal no sube. Se requiere reparación del mecanismo.",
      "🔧 INCIDENCIA REPORTADA: Electrodoméstico (horno) presenta fallo eléctrico. Se necesita revisión del servicio técnico.",
      "🔧 INCIDENCIA REPORTADA: Grietas en techo del salón tras lluvias recientes. Revisar posible filtración desde cubierta.",
    ];

    const incidenciaAleatoria = incidencias[Math.floor(Math.random() * incidencias.length)];

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendatario",
      texto: incidenciaAleatoria,
    });

    toast.success("Incidencia reportada y certificada");
  };

  const handleResponderIncidencia = () => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede responder a incidencias.");
      return;
    }

    // Verificar si hay incidencias reportadas por el arrendatario
    const hayIncidencias = expediente.mensajes.some(
      (m) => m.remitente === "arrendatario" && m.texto.includes("INCIDENCIA REPORTADA")
    );

    if (!hayIncidencias) {
      toast.info("No hay incidencias pendientes de respuesta");
      return;
    }

    // Evitar múltiples respuestas en el flujo de demostración
    const yaHayRespuesta = expediente.mensajes.some(
      (m) => m.remitente === "arrendador" && m.texto.startsWith("✅")
    );

    if (yaHayRespuesta) {
      toast.info("La incidencia ya tiene una respuesta registrada.");
      return;
    }

    const respuestas = [
      "✅ He contactado con el fontanero. Vendrá mañana entre las 10:00 y 12:00 para revisar la fuga.",
      "✅ Confirmo recepción. Coordinaré revisión del técnico oficial de la marca esta semana.",
      "✅ Entendido. Me pondré en contacto con el servicio de reparaciones y le informaré de la fecha de intervención.",
      "✅ He gestionado cita con el especialista. Le enviaré confirmación de día y hora en las próximas 24 horas.",
      "✅ Tomaré las medidas necesarias. Coordinaré con profesional cualificado y mantendré informado del proceso.",
    ];

    const respuestaAleatoria = respuestas[Math.floor(Math.random() * respuestas.length)];

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: respuestaAleatoria,
    });

    toast.success("Respuesta a incidencia enviada y certificada");
  };

  // ============= HANDLERS PARA MEDIACIÓN Y DEVOLUCIÓN FIANZA =============

  const handleProponerMediacion = () => {
    if (rolActivo !== "arrendador" && rolActivo !== "arrendatario") {
      toast.error("Solo el arrendador o arrendatario pueden proponer mediación.");
      return;
    }

    enviarMensaje({
      tipo: "sistema",
      remitente: "certy",
      texto: "⚖️ PROPUESTA DE MEDIACIÓN PREVIA\n\nSe propone resolver la disputa sobre la devolución de fianza mediante mediación extrajudicial (Ley 5/2012).\n\nVentajas:\n✓ Resolución rápida (días, no meses)\n✓ Ahorro de costes judiciales\n✓ Confidencialidad\n✓ Control de las partes sobre el resultado\n✓ Preservación de la relación\n\n¿Aceptan ambas partes iniciar el proceso de mediación?",
    });

    toast.success("Propuesta de mediación registrada", {
      description: "Esperando respuesta de la otra parte",
    });
  };

  const handleAceptarMediacion = () => {
    if (rolActivo !== "arrendador" && rolActivo !== "arrendatario") {
      toast.error("Solo las partes pueden aceptar la mediación.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: "Acepto la propuesta de mediación para resolver la disputa de forma extrajudicial.",
    });

    toast.success("Mediación aceptada", {
      description: "Se designará un mediador profesional certificado",
    });
  };

  const handleRechazarMediacion = () => {
    if (rolActivo !== "arrendador" && rolActivo !== "arrendatario") {
      toast.error("Solo las partes pueden rechazar la mediación.");
      return;
    }

    // 1) Mensaje de rechazo de la mediación
    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo as "arrendador" | "arrendatario",
      texto: "Rechazo la propuesta de mediación. Procederé por vía judicial si no se resuelve la disputa.",
    });

    // 2) Generación automática de oferta vinculante previa a la vía judicial
    enviarMensaje({
      tipo: "sistema",
      remitente: "certy",
      texto:
        "📜 OFERTA VINCULANTE PREVIA A LA VÍA JUDICIAL\n\n" +
        "Ante el rechazo de la mediación, Certy: Gestor CLM - Prestador Cualificado Servicios de Confianza deja constancia de:\n\n" +
        "• Se ha generado una OFERTA VINCULANTE previa al inicio de acciones judiciales, basada en todo el contenido certificado del canal.\n" +
        "• Todos los mensajes, documentos y evidencias incorporados en este canal quedan sellados con sello de tiempo cualificado eIDAS.\n" +
        "• Esta certificación configura un expediente probatorio completo para su eventual aportación en vía judicial (art. 326.4 LEC y Ley 6/2020).\n\n" +
        "La parte que recibe esta oferta puede aceptarla en el canal antes de acudir a la vía judicial. La presente comunicación queda incorporada al expediente como prueba electrónica certificada.",
    });

    toast.warning("Mediación rechazada", {
      description: "Se ha generado una oferta vinculante previa a la vía judicial y se certifica todo el canal",
      duration: 6000,
    });

    // 3) Cierre del ciclo de vida del expediente tras la generación de la oferta vinculante
    setTimeout(() => {
      cambiarFase("cierre");
    }, 3000);
  };

  const handleConfirmarAcuerdoMediacion = () => {
    if (rolActivo !== "arrendador" && rolActivo !== "arrendatario") {
      toast.error("Solo las partes pueden confirmar el acuerdo.");
      return;
    }

    const montoAcordado = 1000; // En producción, esto sería dinámico

    enviarMensaje({
      tipo: "sistema",
      remitente: "certy",
      texto: `✅ ACUERDO DE MEDIACIÓN ALCANZADO\n\nLas partes han acordado:\n\n💰 Devolución de fianza: ${montoAcordado}€\n⚖️ Eficacia: El acuerdo tiene fuerza ejecutiva (Art. 25 Ley 5/2012)\n🔒 Certificación: Sellado con timestamp cualificado eIDAS\n\nEste acuerdo pone fin a la disputa y queda incorporado al expediente probatorio con plena validez jurídica.`,
    });

    toast.success("Acuerdo de mediación certificado", {
      description: `Monto acordado: ${montoAcordado}€`,
    });

    // Transición a cierre tras acuerdo
    setTimeout(() => {
      cambiarFase("cierre");
    }, 3000);
  };
  
  const handleAportarNotaInformativa = () => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede aportar la Nota Informativa.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Aporto Nota Informativa vigente del Registro de la Propiedad.",
      adjuntos: [
        {
          tipo: "pdf",
          nombre: "Nota_Informativa_Registro.pdf",
          url: "/nota-informativa.pdf",
          hash: Math.random().toString(36).substring(7),
        },
      ],
    });

    // Mensaje automático de Certy certificando la incorporación
    setTimeout(() => {
      enviarMensaje({
        tipo: "sistema",
        remitente: "certy",
        texto: "📄 Nota Informativa Registral incorporada y certificada en el expediente.\n\nLa información registral queda asociada al contrato y protegida con sello de tiempo cualificado.",
      });
    }, 1000);

    toast.success("Nota Informativa aportada y certificada");
  };

  const handleSolicitarNotaInformativa = () => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede solicitar la Nota Informativa.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Solicito Nota Informativa actualizada del Registro de la Propiedad.",
    });

    // Mensaje automático de Certy registrando la solicitud
    setTimeout(() => {
      enviarMensaje({
        tipo: "sistema",
        remitente: "certy",
        texto: "📬 Solicitud registrada.\n\nUna vez disponible la Nota Informativa, podrá ser subida a este canal para su certificación y conservación en el expediente electrónico.",
      });
    }, 1000);

    toast.success("Solicitud de Nota Informativa registrada");
  };

  const handleContinuarSinNotaArrendador = () => {
    if (rolActivo !== "arrendador") {
      toast.error("Solo el arrendador puede tomar esta decisión.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendador",
      texto: "Decido continuar sin aportar Nota Informativa del Registro de la Propiedad.",
    });

    toast.success("Decisión registrada");
  };

  const handleSolicitarNotaArrendatario = () => {
    if (rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede solicitar la Nota Informativa.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendatario",
      texto: "Solicito al Arrendador@ que aporte una Nota Informativa actualizada del Registro de la Propiedad.",
    });

    // Mensaje automático de Certy registrando la solicitud
    setTimeout(() => {
      enviarMensaje({
        tipo: "sistema",
        remitente: "certy",
        texto: "🔎 Solicitud de Nota Informativa registrada.\n\nSe solicita al Arrendador@ que aporte o gestione la Nota Registral correspondiente.",
      });
    }, 1000);

    toast.success("Solicitud enviada al arrendador");
  };

  const handleContinuarSinNotaArrendatario = () => {
    if (rolActivo !== "arrendatario") {
      toast.error("Solo el arrendatario puede tomar esta decisión.");
      return;
    }

    enviarMensaje({
      tipo: "usuario",
      remitente: "arrendatario",
      texto: "Acepto continuar sin requerir la Nota Informativa del Registro de la Propiedad.",
    });

    toast.success("Decisión registrada");
  };

  // Determinar color de botón según rol que puede ejecutar la acción
  const getButtonColorClass = (accion: any) => {
    if (accion.rol === "arrendatario") {
      return rolActivo === "arrendatario"
        ? "bg-green-600 hover:bg-green-700 text-white"
        : "bg-slate-600 hover:bg-slate-700 text-white opacity-60";
    }

    if (accion.rol === "arrendador") {
      return rolActivo === "arrendador"
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-slate-600 hover:bg-slate-700 text-white opacity-60";
    }

    // Acciones genéricas → default
    return "bg-primary hover:bg-primary/90 text-primary-foreground";
  };

  // ============= FLAGS DE CONTROL DE ESTADO =============
  
  // Flags simplificados para Nota Informativa (una acción = un flag)
  const arrendadorYaAportoNota = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && 
           m.texto.includes("Aporto Nota Informativa vigente del Registro de la Propiedad")
  );

  const arrendadorYaSolicitoNota = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && 
           m.texto.includes("Solicito Nota Informativa actualizada del Registro de la Propiedad")
  );

  const arrendadorYaContinuoSinNota = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && 
           m.texto.includes("Decido continuar sin aportar Nota Informativa del Registro de la Propiedad")
  );

  const arrendatarioYaSolicitoNota = expediente.mensajes.some(
    (m) => m.remitente === "arrendatario" && 
           m.texto.includes("Solicito al Arrendador@ que aporte una Nota Informativa actualizada del Registro de la Propiedad")
  );

  const arrendatarioYaContinuoSinNota = expediente.mensajes.some(
    (m) => m.remitente === "arrendatario" && 
           m.texto.includes("Acepto continuar sin requerir la Nota Informativa del Registro de la Propiedad")
  );

  // OPCIÓN A: Flags de confirmación implícita del inmueble (cualquier acción de Nota cuenta)
  const arrendadorYaConfirmoInmueble = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendador" &&
      (m.texto.includes("Confirmo identificación del inmueble") ||
       m.texto.includes("Aporto Nota Informativa vigente del Registro de la Propiedad") ||
       m.texto.includes("Solicito Nota Informativa actualizada del Registro de la Propiedad") ||
       m.texto.includes("Decido continuar sin aportar Nota Informativa del Registro de la Propiedad"))
  );

  const arrendatarioYaConfirmoInmueble = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendatario" &&
      (m.texto.includes("Confirmo identificación del inmueble") ||
       m.texto.includes("Solicito al Arrendador@ que aporte una Nota Informativa actualizada del Registro de la Propiedad") ||
       m.texto.includes("Acepto continuar sin requerir la Nota Informativa del Registro de la Propiedad"))
  );

  // Flags de documentos subidos en pagos_iniciales
  const tieneFianza = expediente.mensajes.some(
    (m) => m.remitente === "arrendatario" && m.texto.toLowerCase().includes("justificante de fianza")
  );
  const tieneRenta = expediente.mensajes.some(
    (m) => m.remitente === "arrendatario" && m.texto.toLowerCase().includes("justificante de primera renta")
  );
  const puedeSubirResguardo = tieneFianza && tieneRenta;

  // Flags para otras fases
  const tieneInformeFinal = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && m.texto.toLowerCase().includes("informe de estado final")
  );

  const haSubidoPagoImpago = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendatario" &&
      m.texto.toLowerCase().includes("justificante") &&
      m.texto.toLowerCase().includes("renta")
  );

  const haDecididoProrroga = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendador" &&
      (m.texto.includes("prorrogar el contrato") || m.texto.includes("no prorrogar"))
  );

  const haDecididoArrendatario = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendatario" &&
      (m.texto.includes("renovar el contrato") || m.texto.includes("No deseo renovar"))
  );

  const haInvocadoRecuperacion = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && m.texto.includes("Confirmo como arrendador")
  );

  // Flags para incidencias en vida_contrato (solo una vuelta en el flujo)
  const tieneIncidenciaReportada = expediente.mensajes.some(
    (m) => m.remitente === "arrendatario" && m.texto.includes("INCIDENCIA REPORTADA")
  );

  const tieneRespuestaIncidencia = expediente.mensajes.some(
    (m) => m.remitente === "arrendador" && m.texto.startsWith("✅")
  );

  // Flag para limitar subida de renta mensual a un único evento en vida_contrato (demo)
  const tieneRentaMensualVidaContrato = expediente.mensajes.some(
    (m) =>
      m.remitente === "arrendatario" &&
      m.texto.toLowerCase().includes("justificante de renta mensual") &&
      expediente.fase === "vida_contrato"
  );

  // Flag para limitar actualización IRAV a un único evento en vida_contrato (demo)
  const tieneActualizacionIRAV = expediente.mensajes.some(
    (m) =>
      m.remitente === "certy" &&
      m.tipo === "sistema" &&
      m.texto.includes("ACTUALIZACIÓN AUTOMÁTICA DE RENTA (IRAV)")
  );

  // Función para calcular actualización IRAV con cálculo pedagógico real
  const simularIRAV = () => {
    // Protección: si ya se ha calculado IRAV una vez, no volver a ejecutar
    if (tieneActualizacionIRAV) {
      toast.info("La actualización IRAV ya se ha calculado y certificado en este expediente.");
      return;
    }
    const rentaActual = expediente.contrato.rentaMensual;
    
    // Cálculo IRAV real conforme a LAU Art. 18 + Ley 12/2023
    // IPC general anual: 3.5% (simulado, en producción consultaría INE)
    // Límite legal: 2% (zona no tensionada según Ley 12/2023)
    const ipcGeneral = 3.5;
    const limiteActualizacion = 2.0;
    const porcentajeAplicado = Math.min(ipcGeneral, limiteActualizacion); // El MENOR
    
    const incrementoEuros = Math.round(rentaActual * (porcentajeAplicado / 100));
    const nuevaRenta = rentaActual + incrementoEuros;

    // Actualizar el contrato con la nueva renta
    actualizarExpediente({
      contrato: {
        ...expediente.contrato,
        rentaMensual: nuevaRenta,
      },
    });

    // Enviar mensaje certificado del sistema con desglose pedagógico
    enviarMensaje({
      tipo: "sistema",
      remitente: "certy",
      texto: `📊 ACTUALIZACIÓN AUTOMÁTICA DE RENTA (IRAV)\n\n🔢 CÁLCULO SEGÚN NORMATIVA VIGENTE:\n\n• IPC general interanual (INE): ${ipcGeneral.toFixed(2)}%\n• Límite legal aplicable (Ley 12/2023): ${limiteActualizacion.toFixed(2)}%\n• Porcentaje aplicado (el MENOR): ${porcentajeAplicado.toFixed(2)}%\n\n💰 RESULTADO:\n• Renta anterior: ${rentaActual}€/mes\n• Incremento: +${incrementoEuros}€ (+${porcentajeAplicado.toFixed(2)}%)\n• Nueva renta: ${nuevaRenta}€/mes\n\n⚖️ Base legal: LAU Art. 18 + Ley 12/2023 (límite temporal 2% zona no tensionada)\n\n🔒 Esta actualización queda certificada con sello de tiempo cualificado eIDAS y se incorpora al expediente probatorio con plena validez jurídica.`,
    });

    toast.success(`Renta actualizada: ${rentaActual}€ → ${nuevaRenta}€ (+${porcentajeAplicado.toFixed(2)}%)`, {
      description: `IPC real ${ipcGeneral}% limitado a ${limiteActualizacion}% (Ley 12/2023)`,
      duration: 6000,
    });
  };

  // Definir acciones contextuales por fase
  const accionesPorFase: Record<
    string,
    Array<{ icon: any; label: string; action: () => void; rol?: any }>
  > = {
    apertura_expediente: [
      { icon: Check, label: "Arrendador: entiendo el proceso", action: handleConfirmar, rol: "arrendador" },
      { icon: Check, label: "Arrendatario: entiendo el proceso", action: handleConfirmar, rol: "arrendatario" },
    ],
    identificacion_partes: [
      { icon: Check, label: "Quiero unirme al canal", action: handleConfirmar, rol: "arrendador" },
      { icon: Check, label: "Quiero unirme al canal", action: handleConfirmar, rol: "arrendatario" },
    ],
    identificacion_inmueble: [
      // 🔵 Arrendador: Confirmación explícita (solo visible si NO ha hecho ninguna acción aún)
      ...(!arrendadorYaConfirmoInmueble
        ? [
            {
              icon: Check,
              label: "Confirmar identificación del inmueble",
              action: handleConfirmar,
              rol: "arrendador",
            },
          ]
        : []),

      // 🟢 Arrendatario: Confirmación explícita (solo visible si NO ha hecho ninguna acción aún)
      ...(!arrendatarioYaConfirmoInmueble
        ? [
            {
              icon: Check,
              label: "Confirmar identificación del inmueble",
              action: handleConfirmar,
              rol: "arrendatario",
            },
          ]
        : []),

      // 🔵 Arrendador: Acciones de Nota (visibles solo si NO ha confirmado aún)
      ...(!arrendadorYaConfirmoInmueble && !arrendadorYaAportoNota
        ? [
            {
              icon: Upload,
              label: "Aportar Nota Informativa existente",
              action: handleAportarNotaInformativa,
              rol: "arrendador",
            },
          ]
        : []),
      ...(!arrendadorYaConfirmoInmueble && !arrendadorYaSolicitoNota
        ? [
            {
              icon: FileText,
              label: "Solicitar nueva Nota Informativa",
              action: handleSolicitarNotaInformativa,
              rol: "arrendador",
            },
          ]
        : []),
      ...(!arrendadorYaConfirmoInmueble && !arrendadorYaContinuoSinNota
        ? [
            {
              icon: AlertCircle,
              label: "Continuar sin Nota Informativa",
              action: handleContinuarSinNotaArrendador,
              rol: "arrendador",
            },
          ]
        : []),

      // 🟢 Arrendatario: Acciones de Nota (visibles solo si NO ha confirmado aún)
      ...(!arrendatarioYaConfirmoInmueble && !arrendatarioYaSolicitoNota
        ? [
            {
              icon: FileText,
              label: "Solicitar que arrendador aporte Nota",
              action: handleSolicitarNotaArrendatario,
              rol: "arrendatario",
            },
          ]
        : []),
      ...(!arrendatarioYaConfirmoInmueble && !arrendatarioYaContinuoSinNota
        ? [
            {
              icon: Check,
              label: "Aceptar continuar sin Nota Informativa",
              action: handleContinuarSinNotaArrendatario,
              rol: "arrendatario",
            },
          ]
        : []),
    ],
    extracto_informado: [
      { icon: Check, label: "Conforme con las Condiciones Básicas del Contrato", action: handleConfirmar, rol: "arrendador" },
      { icon: Check, label: "Conforme con las Condiciones Básicas del Contrato", action: handleConfirmar, rol: "arrendatario" },
    ],
    firma_contrato: [
      { icon: FileText, label: "Arrendador: leo y acepto. Firmo.", action: handleConfirmar, rol: "arrendador" },
      { icon: FileText, label: "Arrendatario: leo y acepto. Firmo.", action: handleConfirmar, rol: "arrendatario" },
    ],
    pagos_iniciales: [
      { icon: Upload, label: "Subir justificante de fianza", action: () => handleSubirDocumento("fianza"), rol: "arrendatario" },
      {
        icon: Upload,
        label: "Subir justificante de primera renta",
        action: () => handleSubirDocumento("primera renta"),
        rol: "arrendatario",
      },
      // El arrendador solo puede subir el resguardo cuando ya existen fianza y primera renta
      ...(
        puedeSubirResguardo
          ? [
              {
                icon: Upload,
                label: "Arrendador: subir resguardo IVIMA",
                action: () => handleSubirDocumento("resguardo"),
                rol: "arrendador",
              },
            ]
          : []
      ),
    ],
    estado_inicial: [
      { icon: Camera, label: "Subir fotos del estado inicial", action: handleSubirFotos, rol: "arrendatario" },
      { icon: CheckCircle, label: "Confirmar recepción del inmueble", action: handleConfirmarRecepcion, rol: "arrendatario" },
    ],
    canal_oficial: [
      { icon: Check, label: "Arrendador: entiendo que este es el medio de notificaciones", action: handleConfirmar, rol: "arrendador" },
      { icon: Check, label: "Arrendatario: entiendo que este es el medio de notificaciones", action: handleConfirmar, rol: "arrendatario" },
    ],
    vida_contrato: [
      ...(
        !tieneRentaMensualVidaContrato
          ? [
              {
                icon: Upload,
                label: "Subir justificante de renta mensual",
                action: () => handleSubirDocumento("renta mensual"),
                rol: "arrendatario",
              },
            ]
          : []
      ),
      ...(
        !tieneActualizacionIRAV
          ? [
              {
                icon: FileText,
                label: "Calcular actualización IRAV (límite legal 2%)",
                action: simularIRAV,
                rol: "arrendador",
              },
            ]
          : []
      ),
      ...(
        !tieneIncidenciaReportada
          ? [
              {
                icon: Wrench,
                label: "Reportar incidencia de mantenimiento",
                action: handleReportarIncidencia,
                rol: "arrendatario",
              },
            ]
          : []
      ),
      ...(
        tieneIncidenciaReportada && !tieneRespuestaIncidencia
          ? [
              {
                icon: MessageSquare,
                label: "Responder a incidencia",
                action: handleResponderIncidencia,
                rol: "arrendador",
              },
            ]
          : []
      ),
    ],
    impago_evento: [
      ...(
        !haSubidoPagoImpago
          ? [
              {
                icon: Upload,
                label: "Subir justificante de pago",
                action: () => handleSubirDocumento("renta mensual"),
                rol: "arrendatario",
              },
            ]
          : []
      ),
    ],
    prorroga_legal: [
      { icon: Check, label: "Entiendo el régimen de prórroga obligatoria", action: handleConfirmar },
    ],
    decision_arrendatario: [
      ...(
        !haDecididoArrendatario
          ? [
              { icon: Check, label: "Deseo renovar el contrato", action: handleConfirmar, rol: "arrendatario" },
              {
                icon: AlertCircle,
                label: "No deseo renovar",
                action: () => {
                  enviarMensaje({
                    tipo: "usuario",
                    remitente: "arrendatario",
                    texto: "No deseo renovar el contrato. Acepto la finalización en la fecha acordada.",
                  });
                  toast.success("Decisión registrada y certificada");
                  setTimeout(() => cambiarFase("devolucion_fianza"), 2000);
                },
                rol: "arrendatario",
              },
            ]
          : []
      ),
    ],
    recuperacion_necesidad: [
      ...(
        !haInvocadoRecuperacion
          ? [
              { 
                icon: FileText, 
                label: "Arrendador: invocar Art. 9.3 LAU", 
                action: handleInvocarRecuperacionNecesidad, 
                rol: "arrendador" 
              },
            ]
          : []
      ),
    ],
    devolucion_fianza: [
      ...(
        !tieneInformeFinal
          ? [
              {
                icon: Upload,
                label: "Arrendador: subir informe estado final",
                action: () => handleSubirDocumento("informe final"),
                rol: "arrendador",
              },
            ]
          : []
      ),
      ...(
        tieneInformeFinal
          ? [
              {
                icon: Check,
                label: "Arrendatario: acepto cálculo de devolución",
                action: handleConfirmar,
                rol: "arrendatario",
              },
              {
                icon: Scale,
                label: "Arrendatario: proponer mediación por desacuerdo",
                action: handleProponerMediacion,
                rol: "arrendatario",
              },
            ]
          : []
      ),
      // Opciones de mediación (cuando se ha propuesto)
      ...(
        expediente.mensajes.some(m => m.texto.includes("PROPUESTA DE MEDIACIÓN PREVIA"))
          ? [
              {
                icon: CheckCircle,
                label: "Aceptar mediación extrajudicial",
                action: handleAceptarMediacion,
              },
              {
                icon: AlertCircle,
                label: "Rechazar mediación (vía judicial)",
                action: handleRechazarMediacion,
              },
            ]
          : []
      ),
      // Opción de confirmar acuerdo de mediación (cuando ambos han aceptado)
      ...(
        expediente.mensajes.some(m => m.texto.includes("Acepto la propuesta de mediación")) &&
        expediente.mensajes.filter(m => m.texto.includes("Acepto la propuesta de mediación")).length >= 2
          ? [
              {
                icon: FileText,
                label: "Confirmar acuerdo de mediación alcanzado",
                action: handleConfirmarAcuerdoMediacion,
              },
            ]
          : []
      ),
    ],
    cierre: [
      { icon: Check, label: "Entiendo que el expediente está cerrado", action: handleConfirmar },
      { icon: Download, label: "Descargar Acta de Cierre del Expediente", action: handleDescargarActaCierre },
    ],
  };

  // Función para determinar si una acción está completada
  const isAccionCompletada = (accion: any): boolean => {
    const label = accion.label.toLowerCase();
    const mensajes = expediente.mensajes;

    // OPCIÓN A: Confirmaciones de inmueble (explícitas O implícitas)
    if (label.includes("confirmar identificación del inmueble")) {
      if (accion.rol === "arrendador") {
        return mensajes.some(
          (m) =>
            m.remitente === "arrendador" &&
            (m.texto.includes("Confirmo identificación del inmueble") ||
             m.texto.includes("Aporto Nota Informativa vigente del Registro de la Propiedad") ||
             m.texto.includes("Solicito Nota Informativa actualizada del Registro de la Propiedad") ||
             m.texto.includes("Decido continuar sin aportar Nota Informativa del Registro de la Propiedad"))
        );
      }
      if (accion.rol === "arrendatario") {
        return mensajes.some(
          (m) =>
            m.remitente === "arrendatario" &&
            (m.texto.includes("Confirmo identificación del inmueble") ||
             m.texto.includes("Solicito al Arrendador@ que aporte una Nota Informativa actualizada del Registro de la Propiedad") ||
             m.texto.includes("Acepto continuar sin requerir la Nota Informativa del Registro de la Propiedad"))
        );
      }
    }

    // Confirmaciones genéricas
    if (label.includes("quiero unirme al canal")) {
      return mensajes.some(
        m => m.remitente === accion.rol && m.texto.includes("quiero unirme a este canal certificado")
      );
    }

    // Notas informativas
    if (label.includes("aportar nota informativa")) return arrendadorYaAportoNota;
    if (label.includes("solicitar nueva nota")) return arrendadorYaSolicitoNota;
    if (label.includes("continuar sin nota") && accion.rol === "arrendador") return arrendadorYaContinuoSinNota;
    if (label.includes("solicitar que arrendador aporte")) return arrendatarioYaSolicitoNota;
    if (label.includes("aceptar continuar sin nota")) return arrendatarioYaContinuoSinNota;

    // Documentos de pagos_iniciales
    if (label.includes("justificante de fianza")) return tieneFianza;
    if (label.includes("primera renta")) return tieneRenta;
    if (label.includes("resguardo ivima")) {
      return mensajes.some(m => m.remitente === "arrendador" && m.texto.includes("resguardo oficial del depósito"));
    }

    // Estado inicial
    if (label.includes("fotos del estado inicial")) {
      return mensajes.some(m => m.remitente === "arrendatario" && m.texto.includes("fotos del estado inicial"));
    }
    if (label.includes("confirmar recepción del inmueble")) {
      return mensajes.some(m => m.remitente === "arrendatario" && m.texto.includes("recibido el inmueble"));
    }

    // Medio de notificaciones confirmaciones
    if (label.includes("medio de notificaciones")) {
      return mensajes.some(
        m => m.remitente === accion.rol && m.texto.includes("medio de notificaciones")
      );
    }

    // Vida contrato
    if (label.includes("renta mensual")) return tieneRentaMensualVidaContrato;
    if (label.includes("reportar incidencia")) return tieneIncidenciaReportada;
    if (label.includes("responder a incidencia")) return tieneRespuestaIncidencia;

    // Impago
    if (label.includes("justificante de pago") && expediente.fase === "impago_evento") return haSubidoPagoImpago;

    // Devolución fianza
    if (label.includes("informe estado final")) return tieneInformeFinal;

    return false;
  };

  // Obtener las acciones de la fase actual
  const acciones = accionesPorFase[expediente.fase];

  if (!acciones || acciones.length === 0) {
    return null;
  }

  // RELAJADO: Filtrar acciones según rol con fallback
  const accionesFiltradasBase = acciones.filter((accion) => {
    // Acciones con rol específico solo se muestran para ese rol
    if (accion.rol) {
      return rolActivo === accion.rol;
    }

    // Acciones genéricas (sin rol) disponibles para todos
    return true;
  });

  // Si el filtro por rol deja 0 acciones, mostrar todas (evita que desaparezcan completamente)
  const accionesFiltradas = accionesFiltradasBase.length > 0 ? accionesFiltradasBase : acciones;

  if (accionesFiltradas.length === 0) {
    return null;
  }

  // Calcular progreso de la fase
  const accionesCompletadas = accionesFiltradas.filter(isAccionCompletada).length;
  const totalAcciones = accionesFiltradas.length;
  const progresoPercentage = totalAcciones > 0 ? Math.round((accionesCompletadas / totalAcciones) * 100) : 0;

  return (
    <div className="px-4 py-3 border-t border-border/40 bg-background space-y-3">
      {/* Indicador de progreso de fase */}
      {totalAcciones > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground pb-2">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Progreso de fase: {accionesCompletadas}/{totalAcciones}
          </span>
          <Badge variant="outline" className="text-xs">
            {progresoPercentage}%
          </Badge>
        </div>
      )}

      {/* Acciones con indicadores de completado */}
      <div className="flex flex-wrap gap-2">
        {accionesFiltradas.map((accion, index) => {
          const completada = isAccionCompletada(accion);
          
          return (
            <div key={index} className="relative">
              <Button
                onClick={accion.action}
                size="sm"
                disabled={completada}
                className={`${getButtonColorClass(accion)} ${
                  completada ? "opacity-60 cursor-not-allowed" : ""
                } transition-all duration-200`}
              >
                {completada ? (
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <accion.icon className="h-4 w-4 mr-2" />
                )}
                {accion.label}
              </Button>
              
              {/* Badge de completado */}
              {completada && (
                <Badge 
                  variant="secondary" 
                  className="absolute -top-2 -right-2 h-5 px-1.5 text-[10px] bg-green-500/20 text-green-700 border-green-500/30 animate-scale-in"
                >
                  ✓
                </Badge>
              )}
            </div>
          );
        })}
        
        {/* Sección separada: Documentos Disponibles (desde pagos_iniciales en adelante) */}
        {["pagos_iniciales", "estado_inicial", "canal_oficial", "vida_contrato", "impago_evento", "prorroga_legal", "decision_arrendatario", "recuperacion_necesidad", "devolucion_fianza", "cierre"].includes(expediente.fase) && (
          <div className="mt-4 pt-4 border-t border-border/40">
            <p className="text-xs text-muted-foreground mb-2 font-medium">
              📄 Documentos Disponibles
            </p>
            <PreviewContratoFirmadoModal
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full text-xs",
                    getButtonColorClass("generic")
                  )}
                >
                  <Download className="h-3.5 w-3.5 mr-2" />
                  Ver y Descargar Contrato Firmado
                </Button>
              }
              rolActivo={rolActivo}
            />
          </div>
        )}
      </div>

      {/* Modal de previsualización del Acta de Cierre */}
      <PreviewActaCierreModal
        open={actaCierreModalOpen}
        onOpenChange={setActaCierreModalOpen}
      />
    </div>
  );
};
