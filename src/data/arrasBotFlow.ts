import { FaseArras } from "@/types/arras";

interface BotMessage {
  texto: string;
  requiereConfirmacion?: boolean;
  adjuntos?: any[];
}

export const botFlowMessagesArras: Record<FaseArras, BotMessage[]> = {
  apertura_expediente_arras: [
    {
      texto:
        "👋 APERTURA DEL EXPEDIENTE DE ARRAS\n\nBienvenidos al Canal de Arras Certificado g-digital.\n\nEste canal está operado por EAD Trust, prestador cualificado de servicios de confianza electrónica.\n\nA partir de este momento:\n• Todas las comunicaciones relevantes sobre estas arras se realizarán por este canal.\n• Cada mensaje y documento quedará asociado a un sello de tiempo cualificado y a un expediente certificado.\n• El canal funciona como gestor del ciclo de vida del contrato, y como única fuente de verdad en caso de duda o conflicto.\n\nAntes de continuar, cada parte debe confirmar que entiende cómo funciona el canal y que desea seguir adelante.",
      requiereConfirmacion: false,
    },
  ],

  identificacion_partes_arras: [
    {
      texto:
        "🧾 IDENTIFICACIÓN DE LAS PARTES\n\nAhora vamos a identificar a las partes que intervienen en el contrato de arras:\n• Vendedor: titular que transmite la vivienda.\n• Comprador: persona interesada en adquirirla.\n\nLos datos que se declaren en este paso quedarán vinculados al expediente y al contrato de arras.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Por favor, cada parte debe confirmar sus datos de identificación.",
      requiereConfirmacion: false,
    },
  ],

  identificacion_inmueble_arras: [
    {
      texto:
        "🏠 IDENTIFICACIÓN DEL INMUEBLE\n\nVamos a identificar la vivienda objeto del contrato de arras.\n\nDatos declarados del inmueble:\n• Dirección: C/ Serrano 128, 3ºB, 28006 Madrid\n• Tipo: Piso exterior\n• Superficie aproximada: 95 m²\n• Habitaciones: 3\n• Baños: 2\n• Garaje: 1 plaza\n• Trastero: Sí, 6 m²\n\nAdemás, este expediente puede incorporar una Nota Informativa del Registro de la Propiedad para verificar titularidad y cargas.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "¿Confirma cada parte que estos datos del inmueble son correctos?\n\nEl Vendedor puede añadir o actualizar la Nota Registral asociada a este expediente.",
      requiereConfirmacion: false,
    },
  ],

  due_diligence_basica: [
    {
      texto:
        "🔎 DECLARACIONES BÁSICAS DEL VENDEDOR\n\nAntes de firmar las arras, el Vendedor realiza una serie de declaraciones sobre la situación de la vivienda:\n• Titularidad y facultades para vender.\n• Situación de cargas registrales.\n• Existencia o no de arrendamientos vigentes.\n• Estado de ocupación y licencias básicas.\n\nEstas declaraciones se incorporan al contrato estándar de arras y quedan certificadas en el expediente.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Vendedor: por favor, confirme que las declaraciones incorporadas al cuestionario son correctas y completas.\n\nComprador: confirme que ha tenido acceso a la información y que, con base en ella, desea seguir adelante con la firma de arras.",
      requiereConfirmacion: false,
    },
  ],

  configuracion_deposito_arras: [
    {
      texto:
        "💰 CONFIGURACIÓN DEL DEPÓSITO DE ARRAS\n\nEl importe de la señal (arras) quedará depositado de forma segura hasta la firma de la escritura o hasta que se produzca el resultado previsto en el contrato.\n\nOpciones disponibles en este demostrador:\n\n1. Depósito ante notaría elegida por el Comprador.\n2. Depósito \"on hold\" mediante dinero tokenizado / stable‑coin en la entidad emisora.\n\nEn ambos casos, el canal certifica las instrucciones y los movimientos relacionados con el depósito.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Comprador: selecciona la opción de depósito que prefieres.\n\nVendedor: confirma que aceptas la opción elegida para estas arras.",
      requiereConfirmacion: false,
    },
  ],

  generacion_y_firma_contrato_arras: [
    {
      texto:
        "📄 GENERACIÓN DEL CONTRATO DE ARRAS\n\nCon la información ya incorporada (partes, inmueble, arras, depósito y declaraciones), se ha generado el Contrato de Compraventa con Arras Penitenciales conforme al modelo estándar del Observatorio Legaltech Garrigues‑ICADE.\n\nEl contrato se incorpora al expediente con sello de tiempo y hash de integridad.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "✍️ FIRMA ELECTRÓNICA AVANZADA EN EL CANAL\n\nLa aceptación del contrato en este canal se articula mediante firma electrónica avanzada:\n• Cada parte revisa el contrato PDF.\n• A continuación, declara expresamente que ha leído y acepta sus términos.\n• La aceptación queda vinculada a su identidad y certificada por EAD Trust.\n\nLa suma de contrato PDF + evidencias del canal constituye la prueba de firma.",
      requiereConfirmacion: false,
    },
  ],

  canal_certificado_pre_escritura: [
    {
      texto:
        "📱 ACTIVACIÓN DEL CANAL CERTIFICADO DE ARRAS\n\nA partir de ahora, este canal se considera el medio oficial de comunicaciones y notificaciones entre Vendedor y Comprador durante toda la vigencia de las arras y hasta la escritura.\n\n• Las solicitudes de prórroga, incidencias y comunicaciones relevantes deben realizarse por aquí.\n• Cada mensaje queda asociado a un sello de tiempo cualificado.\n• El expediente resultante puede certificarse y descargarse en cualquier momento.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "¿Confirma cada parte que comprende y acepta que este canal será el medio oficial de comunicaciones durante el proceso de arras?",
      requiereConfirmacion: false,
    },
  ],

  gestion_eventos_pre_notaria: [
    {
      texto:
        "⏳ PERIODO ENTRE ARRAS Y ESCRITURA\n\nEl contrato de arras establece un plazo para otorgar la escritura de compraventa.\n\nHasta la fecha prevista de firma, este canal permite:\n• Solicitar y registrar prórrogas justificadas del plazo.\n• Comunicar incidencias que puedan afectar a la operación (ej. estado de la finca, financiación, documentación).\n• Documentar acuerdos de resolución anticipada por mutuo acuerdo.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Cuando ambas partes estén preparadas, deben confirmar que están listas para acudir a la notaría en la fecha prevista.",
      requiereConfirmacion: false,
    },
  ],

  convocatoria_y_comparecencia_notarial: [
    {
      texto:
        "📅 CONVOCATORIA A NOTARÍA\n\nSe ha convocado a las partes para otorgar la escritura de compraventa en la notaría designada.\n\nDatos de la convocatoria (a efectos de demostrador):\n• Notaría: José María Ruiz Gallardón - Madrid Centro\n• Fecha y hora previstas: 16/04/2026 a las 12:00h\n• Referencia interna de la cita: NOT-2026-042",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Por favor, cada parte debe confirmar su asistencia a la convocatoria notarial en la fecha y hora indicadas.",
      requiereConfirmacion: false,
    },
  ],

  resultado_formalizacion: [
    {
      texto:
        "✅ COMPRAVENTA FORMALIZADA EN NOTARÍA\n\nSegún la información registrada, la escritura de compraventa se ha otorgado en la notaría prevista.\n\nLas arras se imputan al precio final según el contrato, y la operación pasa a estado de formalizada.\n\nSe puede incorporar al expediente:\n• Copia simple de la escritura.\n• Justificante de liberación del depósito de arras.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "He leído el resultado y comprendo que se aplicará el régimen de arras previsto en el contrato.",
      requiereConfirmacion: false,
    },
  ],

  resolucion_arras: [
    {
      texto:
        "⚖️ RESOLUCIÓN DE LAS ARRAS\n\nEn función del resultado registrado, se aplicará el régimen de las arras penitenciales pactado en el contrato:\n• Si la compraventa se ha formalizado, la señal se imputa al precio.\n• Si el incumplimiento se atribuye al Comprador, puede consolidarse la pérdida de las arras.\n• Si el incumplimiento se atribuye al Vendedor, puede corresponder la devolución duplicada de la señal.\n• Si se ha resuelto por mutuo acuerdo, se aplicarán las condiciones de devolución pactadas.\n\nEl detalle concreto se reflejará en esta fase y en el Acta de Resolución de Arras que se genera desde la consola.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Por favor, cada parte debe confirmar que acepta la resolución de arras según lo establecido en el contrato, o solicitar arbitraje si existe desacuerdo.",
      requiereConfirmacion: false,
    },
  ],

  arbitraje_y_cierre: [
    {
      texto:
        "🧩 ARBITRAJE Y CIERRE DEL EXPEDIENTE\n\nEn la apertura del canal se configuró el mecanismo de resolución de controversias aplicable a estas arras (judicial, arbitraje institucional, mediación, etc.).\n\nEste demostrador permite:\n• Registrar la activación del procedimiento elegido.\n• Incorporar el laudo o acuerdo final al expediente.\n• Generar el Acta de Resolución de Arras y el Acta de Cierre del Expediente, ambas certificadas.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "🏁 EXPEDIENTE DE ARRAS CERRADO\n\nEl expediente ha quedado cerrado con toda la documentación relevante:\n• Contrato de arras firmado.\n• Comunicaciones certificadas en el canal.\n• Documentos y actas asociadas (notaría, resoluciones, arbitraje).\n• Acta de Resolución de Arras.\n• Acta de Cierre y Expediente completo certificado.\n\nEn cualquier momento, Vendedor y Comprador pueden descargar el expediente para su aportación en otros procedimientos.",
      requiereConfirmacion: false,
    },
  ],
};

export const faseLabelsArras: Record<FaseArras, string> = {
  apertura_expediente_arras: "Apertura del Expediente",
  identificacion_partes_arras: "Identificación de Partes",
  identificacion_inmueble_arras: "Identificación del Inmueble",
  due_diligence_basica: "Due Diligence Básica",
  configuracion_deposito_arras: "Configuración Depósito",
  generacion_y_firma_contrato_arras: "Firma del Contrato",
  canal_certificado_pre_escritura: "Canal Certificado",
  gestion_eventos_pre_notaria: "Gestión Pre-Notaría",
  convocatoria_y_comparecencia_notarial: "Convocatoria Notarial",
  resultado_formalizacion: "Resultado Formalización",
  resolucion_arras: "Resolución de Arras",
  arbitraje_y_cierre: "Cierre del Expediente",
};

export const fasesOrdenadasArras: FaseArras[] = [
  "apertura_expediente_arras",
  "identificacion_partes_arras",
  "identificacion_inmueble_arras",
  "due_diligence_basica",
  "configuracion_deposito_arras",
  "generacion_y_firma_contrato_arras",
  "canal_certificado_pre_escritura",
  "gestion_eventos_pre_notaria",
  "convocatoria_y_comparecencia_notarial",
  "resultado_formalizacion",
  "resolucion_arras",
  "arbitraje_y_cierre",
];
