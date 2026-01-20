import { Mensaje, FaseArrendamiento } from "@/types/arrendamiento";

interface BotMessage {
  texto: string;
  requiereConfirmacion?: boolean;
  adjuntos?: any[];
}

export const botFlowMessages: Record<FaseArrendamiento, BotMessage[]> = {
  apertura_expediente: [
    {
      texto:
        "📋 APERTURA DEL EXPEDIENTE\n\nBienvenidos al Canal de Arrendamiento Certificado FaciliteCasas.\n\nSe ha creado un nuevo expediente para gestionar el proceso de arrendamiento.",
      requiereConfirmacion: false,
    },
    {
      texto:
        "Para continuar, cada parte debe confirmar que entiende el funcionamiento del canal certificado y el proceso que se va a seguir.\n\n🔵 Arrendador@: Confirme que entiende el proceso y desea continuar.\n\n🟢 Arrendatari@: Confirme que entiende el proceso y desea continuar.\n\nUna vez ambas partes confirmen, avanzaremos a la identificación detallada de las partes.",
      requiereConfirmacion: true,
    },
  ],
  
  identificacion_partes: [
    {
      texto:
        "👋 Bienvenidos al Canal de Arrendamiento Certificado FaciliteCasas.\n\nEstán accediendo a una plataforma de gestión del ciclo de vida completo de su contrato de arrendamiento (CLM), en la que cada hito contractual —mensajes, documentos, justificantes, acuerdos, notificaciones y eventos del proceso— será registrado, sellado y conservado con garantías reforzadas.\n\nEste canal está operado conjuntamente con **EADTrust**, Prestador Cualificado de Servicios de Confianza inscrito y supervisado conforme al Reglamento (UE) eIDAS. Esto significa que:\n\n• Todas las comunicaciones quedan certificadas con sello de tiempo cualificado.\n• Todo documento o mensaje queda protegido con garantía de integridad y trazabilidad.\n• El expediente electrónico generado goza de **plena validez jurídica** en toda la UE.\n• En caso de discrepancia, las evidencias producidas por el QTSP aplican el principio de **\"inversión de la carga de la prueba\"**, reforzando la seguridad jurídica tanto del Arrendador@ como del Arrendatari@.\n\nPodrán, en cualquier momento, **generar una evidencia certificada** del contenido del canal, así como descargar el **expediente probatorio íntegro**, que incluye contratos firmados, notificaciones certificadas, justificantes de pago y el historial completo de las interacciones realizadas.\n\nPara activar plenamente este canal certificado, cada parte debe ahora confirmar su identidad específica con sus datos personales:\n\n🔵 Arrendador@: Confirme su identidad como propietario del inmueble.\n\n🟢 Arrendatari@: Confirme su identidad como persona interesada en alquilar.\n\nEsta confirmación asocia cada identidad a las evidencias que se generen en el proceso. Una vez ambas partes confirmen, se procederá a identificar la vivienda y avanzar en la configuración del contrato.",
      requiereConfirmacion: true,
    },
  ],
  
  identificacion_inmueble: [
    {
      texto: "✅ Identidades confirmadas.\n\nAhora procedemos a registrar los datos completos del inmueble que será objeto del contrato.",
      requiereConfirmacion: false,
    },
    {
      texto: "🤖 Certy: Gestor CLM — Prestador Cualificado Servicios de Confianza\n📍 IDENTIFICACIÓN DEL INMUEBLE\n\nProcedemos a registrar los datos completos de la vivienda objeto de este contrato, que quedarán incorporados al expediente electrónico con certificación eIDAS:\n\n• Dirección: C/ Alcalá 455, 4ºA, 28027 Madrid\n• Tipo: Piso exterior\n• Superficie: 82 m²\n• Habitaciones: 2\n• Baños: 1\n• Plaza de garaje: Sí\n• Datos registrales:\n   – Finca registral nº: 18.225\n   – Tomo: 912\n   – Libro: 214\n   – Folio: 88\n   – Registro de la Propiedad: Madrid nº 23\n\nCon estos datos, podemos solicitar opcionalmente una **Nota Informativa del Registro de la Propiedad**, que permite conocer la situación jurídica del inmueble (titularidad, cargas, anotaciones, afecciones).\n\n🔵 Arrendador@: Puede indicar si desea aportar una Nota Informativa existente o solicitar una nueva.\n🟢 Arrendatari@: Puede solicitar que el Arrendador@ aporte dicha nota para mayor transparencia y seguridad jurídica.\n\n¿Confirman ambas partes la identificación del inmueble y desean solicitar o no la Nota Informativa Registral?",
      requiereConfirmacion: true,
    },
  ],
  
  extracto_informado: [
    {
      texto: "✅ Inmueble confirmado.\n\nA continuación se presenta el extracto informado del contrato. Debe ser revisado y aceptado por ambas partes antes de generar el contrato completo.",
      requiereConfirmacion: false,
    },
    {
      texto: "📋 TÉRMINOS ESENCIALES DEL ACUERDO\n\nAntes de generar el contrato electrónico definitivo, repasamos de forma clara los elementos esenciales ya acordados. Esta fase no es de negociación: solo busca asegurar transparencia y una comprensión inequívoca entre Arrendador@ (propietario) y Arrendatari@ (persona interesada en el alquiler).\n\n🏠 Objeto del arrendamiento\n• Vivienda habitual: C/ Alcalá 455, 4ºA, 28027 Madrid\n• Superficie: 82 m²\n• 2 habitaciones, 1 baño\n• Plaza de garaje incluida\n\n💶 Renta mensual\n• 1.250 €/mes\n• Actualización anual conforme al índice aplicable (IRAV).\n\n💼 Depósitos y garantías\n• Fianza legal: 1 mes (1.250 €)\n• Garantía adicional: 1 mes (1.250 €)\n\n📅 Duración y régimen legal (LAU – vivienda habitual)\n• Duración inicial: 12 meses\n• Prórroga legal obligatoria para el Arrendador@ hasta alcanzar 5 años en total\n• El Arrendatari@ puede NO renovar cada anualidad con preaviso mínimo de 30 días\n• Recuperación por necesidad del Arrendador@ solo si está pactada y con las garantías legales\n\n🔧 Mantenimiento\n• Reparaciones menores: Arrendatari@\n• Conservación y reparaciones estructurales: Arrendador@\n\n🏢 Gastos, suministros, comunidad e impuestos\n• Comunidad ordinaria: Arrendador@\n• Derramas, obras estructurales: Arrendador@\n• Suministros individualizados (luz, agua, gas, internet): Arrendatari@\n• IBI: Arrendador@\n• Tasa de basuras u otros tributos asociados al uso: Arrendatari@ si es individualizable\n• Cualquier cambio en estos conceptos deberá comunicarse por este canal certificado\n\n🚫 Subarriendo y cesiones\n• Subarriendo no permitido salvo acuerdo expreso\n\n📱 Comunicaciones oficiales\n• Todas las notificaciones, entregas de documentos, justificantes y comunicaciones se realizan por este canal certificado\n• Cada mensaje queda sellado conforme a eIDAS por el prestador cualificado EADTrust\n\n⚖ Seguridad jurídica reforzada\n• Cada confirmación genera evidencia con sello de tiempo cualificado\n• Las evidencias producidas aplican el principio de \"inversión de la carga de la prueba\"\n• Se genera un expediente electrónico probatorio con validez jurídica plena\n\nPor favor, Arrendador@ y Arrendatari@: confirmad que comprendéis estos términos esenciales para proceder a generar el contrato firmado digitalmente.",
      requiereConfirmacion: true,
    },
  ],
  
  firma_contrato: [
    {
      texto: "✅ Extracto confirmado por ambas partes.\n\nEl contrato completo ha sido generado y está disponible para su revisión.",
      requiereConfirmacion: false,
    },
    {
      texto: "📄 FIRMA DEL CONTRATO\n\nLa aceptación del contrato en este canal equivale a la firma, al estar certificado por un servicio de confianza cualificado.\n\n📎 Contrato disponible para revisión",
      requiereConfirmacion: false,
      adjuntos: [{
        tipo: "pdf",
        nombre: "Contrato_Arrendamiento_C_Alcala_455.pdf",
        url: "/contrato.pdf",
        hash: "c8f7d9e2a3b4"
      }]
    },
    {
      texto: "Por favor, cada parte debe declarar:\n\n'He leído el contrato y acepto sus términos. Firmo.'",
      requiereConfirmacion: true,
    },
  ],
  
  pagos_iniciales: [
    {
      texto: "✅ Contrato firmado por ambas partes.\n\nEl contrato queda firmado y entra en fase de formalización.\n\nAhora procedemos con la certificación de la fianza y primera renta.",
      requiereConfirmacion: false,
    },
    {
      texto: "💰 PAGOS REQUERIDOS Y DEPÓSITO LEGAL\n\n📋 El arrendatari@ debe subir:\n1️⃣ Justificante de fianza (1.250€)\n2️⃣ Justificante de primera renta (1.250€)\n\n🏛️ OBLIGACIÓN LEGAL DEL ARRENDADOR@:\n• Depositar la fianza en IVIMA (Comunidad de Madrid)\n• Plazo: 30 días naturales desde la firma del contrato\n• Incumplimiento: Multa de hasta 1.000€ (LAU)\n• Una vez depositada, el arrendador@ debe subir el resguardo oficial\n\n🔗 Más info: https://www.ivima.es/\n\n⚖️ El depósito de fianza es obligatorio en todas las CCAA y protege los derechos de ambas partes.\n\nUtilice los botones de acción rápida para adjuntar los documentos.",
      requiereConfirmacion: false,
    },
  ],
  
  estado_inicial: [
    {
      texto: "✅ Pagos recibidos y certificados.\n\nAhora procedemos con la recepción del inmueble por parte del arrendatario.",
      requiereConfirmacion: false,
    },
    {
      texto: "🏠 CONFORMIDAD CON EL ESTADO DEL INMUEBLE\n\nEl arrendatario debe revisar el estado del inmueble y declarar:\n\n✅ Si está conforme con el estado del inmueble tal como se entrega\n❌ Si NO está conforme, debe comunicar en este canal en qué aspectos no está conforme (desperfectos, faltas, etc.)\n\n📷 Opcionalmente, puede adjuntar fotos del estado inicial para el registro certificado.\n\nUtilice el botón de acción para confirmar la recepción o comunique cualquier no conformidad.",
      requiereConfirmacion: false,
    },
  ],
  
  canal_oficial: [
    {
      texto: "✅ Recepción del inmueble declarada y certificada.\n\nEl contrato queda activado desde el 15/01/2026.",
      requiereConfirmacion: false,
    },
    {
      texto: "📱 ACTIVACIÓN DEL CANAL COMO MEDIO OFICIAL\n\nEste canal queda establecido como medio exclusivo de comunicaciones y notificaciones entre las partes, certificado conforme a eIDAS.\n\nTodas las comunicaciones a través de este canal tendrán valor probatorio pleno.\n\n¿Confirman ambas partes que comprenden y aceptan esto?",
      requiereConfirmacion: true,
    },
  ],
  
  vida_contrato: [
    {
      texto: "🏠 CONTRATO EN VIGOR\n\nEl contrato de arrendamiento está activo desde el 15/01/2026.\n\nDurante la vigencia del contrato:\n\n💰 El arrendatario debe subir justificante de renta mensual antes del día 5 de cada mes\n🔧 Cualquier incidencia debe comunicarse en este canal certificado\n📊 La renta se actualizará anualmente según IRAV (Índice de Revisión de Arrendamientos)\n\nTodas las comunicaciones quedan certificadas con sello de tiempo cualificado.",
      requiereConfirmacion: false,
    },
  ],
  
  impago_evento: [
    {
      texto: "⚠️ REQUERIMIENTO CERTIFICADO DE PAGO\n\nEl arrendador ha reportado impago de renta correspondiente al mes en curso.\n\nSegún el artículo 27.2 LAU, el arrendador puede resolver el contrato por falta de pago de la renta.\n\n📌 PLAZO: 10 días hábiles desde esta notificación certificada\n\nEl arrendatario debe:\n✅ Realizar el pago pendiente\n✅ Subir justificante de pago en este canal\n\nEsta comunicación constituye notificación fehaciente certificada por EAD Trust con sello de tiempo cualificado eIDAS.",
      requiereConfirmacion: false,
    },
  ],
  
  prorroga_legal: [
    {
      texto: "⚠️ PRÓRROGA OBLIGATORIA LAU (Art. 9)\n\nEl contrato de arrendamiento de vivienda habitual está sujeto a prórroga legal obligatoria.\n\n📋 RÉGIMEN LEGAL APLICABLE:\n\n• El arrendador está obligado a prorrogar el contrato hasta completar un mínimo de 5 años si el arrendatario lo solicita (Art. 9.1 LAU)\n\n• El arrendatario puede NO renovar en cada anualidad comunicando su decisión con un mínimo de 30 días naturales de antelación al vencimiento (Art. 10 LAU)\n\n• El arrendador solo puede NO prorrogar transcurridos 5 años desde la celebración del contrato, comunicándolo al arrendatario con un mínimo de 2 meses de antelación (Art. 9.1 LAU)\n\n⚖️ Esta comunicación constituye notificación certificada con sello de tiempo cualificado conforme a eIDAS.",
      requiereConfirmacion: true,
    },
  ],
  
  decision_arrendatario: [
    {
      texto: "🟢 DECISIÓN DEL ARRENDATARIO (Art. 10 LAU)\n\nSe aproxima el vencimiento anual del contrato.\n\n📋 DERECHO DEL ARRENDATARIO:\n\n• Puede optar por NO renovar el contrato comunicándolo con un mínimo de 30 días naturales de antelación al vencimiento de cada anualidad (Art. 10 LAU)\n\n• Si no comunica su decisión de NO renovar, el contrato se prorroga automáticamente por anualidades hasta completar 5 años desde su inicio\n\n• Esta prórroga es obligatoria para el arrendador si no han transcurrido 5 años (Art. 9.1 LAU)\n\n¿Desea el arrendatario continuar con el contrato (prórroga automática) o ejercer su derecho de NO renovación?",
      requiereConfirmacion: false,
    },
  ],
  
  recuperacion_necesidad: [
    {
      texto: "🏛️ RECUPERACIÓN POR NECESIDAD (Art. 9.3 LAU)\n\n⚠️ VERIFICACIÓN PREVIA: Este derecho solo puede ejercerse si fue expresamente pactado en el contrato de arrendamiento.\n\nEl arrendador ha invocado el derecho de recuperación del inmueble para destinarlo a vivienda permanente para sí o sus familiares en primer grado de consanguinidad o por adopción, o para su cónyuge en los supuestos de sentencia firme de separación, divorcio o nulidad matrimonial.\n\n📋 REQUISITOS LEGALES (Art. 9.3 LAU):\n• Cláusula expresamente pactada en el contrato ✓\n• Transcurrido el primer año de duración del contrato\n• Comunicación fehaciente con un mínimo de 2 meses de antelación a la fecha en que el inmueble haya de quedar a disposición del arrendador\n• Destino exclusivo: vivienda permanente del beneficiario designado\n• Indemnización al arrendatario: 1 mensualidad de renta por cada año que reste hasta completar 5 años (Art. 9.3 LAU in fine)\n\n⚖️ Esta comunicación constituye notificación fehaciente certificada por EAD Trust con sello de tiempo cualificado eIDAS.\n\nEl contrato finalizará en la fecha indicada. Se procederá al cálculo de la indemnización legal y a la devolución de fianza.",
      requiereConfirmacion: false,
    },
  ],
  
  devolucion_fianza: [
    {
      texto: "💰 DEVOLUCIÓN DE FIANZA Y LIQUIDACIÓN FINAL\n\nEl contrato ha finalizado. Procedemos con la liquidación y devolución de la fianza depositada.\n\n⏰ PLAZO LEGAL IMPERATIVO:\n• LAU Art. 36: Plazo máximo de 30 días naturales desde la entrega de llaves\n• Transcurrido el plazo sin devolución: el arrendatario puede reclamar la fianza íntegra más intereses legales\n• El incumplimiento del plazo puede generar responsabilidad adicional del arrendador\n\n📋 PROCEDIMIENTO:\n1. El arrendador debe subir el informe de estado final del inmueble\n2. Se calculan las posibles compensaciones (desperfectos, impagos, gastos pendientes)\n3. El arrendatario debe confirmar su conformidad con el cálculo\n4. En caso de desacuerdo: se propone mediación previa antes de iniciar procedimiento judicial\n\n🔒 Toda la liquidación queda certificada con sello de tiempo cualificado eIDAS.",
      requiereConfirmacion: false,
    },
    {
      texto: "🧮 CÁLCULO DE LIQUIDACIÓN:\n\n💵 Fianza depositada: 1.250€\n🔍 Inspección final: conforme\n✅ Deducciones: 0€\n\n💰 TOTAL A DEVOLVER: 1.250€\n\n⚠️ Si existe desacuerdo con este cálculo, se propone iniciar mediación previa (Ley 5/2012) para resolver la disputa de forma rápida, económica y confidencial, evitando la vía judicial.\n\n¿Confirma el arrendatario su conformidad con este cálculo?",
      requiereConfirmacion: true,
    },
  ],
  
  cierre: [
    {
      texto: "📋 NOTIFICACIÓN DE NO RENOVACIÓN CERTIFICADA\n\nEl arrendador@ ha comunicado su decisión de no prorrogar el contrato.\n\nEsta comunicación constituye notificación fehaciente de no renovación, certificada por EAD Trust con sello de tiempo cualificado.",
      requiereConfirmacion: false,
    },
    {
      texto: "🏁 CONTRATO FINALIZADO\n\nEl contrato quedará finalizado el 14/01/2027.\n\nTodo el expediente completo está disponible:\n\n📄 Contrato firmado\n💰 Justificantes de pagos\n🏠 Declaración de recepción\n💬 Historial de comunicaciones certificadas\n📦 Registro probatorio exportable\n\nLas partes pueden exportar el expediente certificado en cualquier momento.",
      requiereConfirmacion: false,
    },
  ],
};

export const faseLabels: Record<FaseArrendamiento, string> = {
  apertura_expediente: "Apertura del Expediente",
  identificacion_partes: "Identificación de las Partes",
  identificacion_inmueble: "Identificación del Inmueble",
  extracto_informado: "Términos Básicos del Contrato",
  firma_contrato: "Firma del Contrato",
  pagos_iniciales: "Pago de Fianza y Primera Renta",
  estado_inicial: "Recepción del Inmueble",
  canal_oficial: "Medio de Notificaciones",
  vida_contrato: "Vida del Contrato",
  impago_evento: "Impago",
  prorroga_legal: "Prórroga Legal",
  decision_arrendatario: "Decisión del Arrendatario",
  recuperacion_necesidad: "Recuperación por Necesidad",
  devolucion_fianza: "Devolución de Fianza",
  cierre: "Cierre del Contrato",
};

export const fasesOrdenadas: FaseArrendamiento[] = [
  "apertura_expediente",
  "identificacion_partes",
  "identificacion_inmueble",
  "extracto_informado",
  "firma_contrato",
  "pagos_iniciales",
  "estado_inicial",
  "canal_oficial",
  "vida_contrato",
  "impago_evento",
  "prorroga_legal",
  "decision_arrendatario",
  "recuperacion_necesidad",
  "devolucion_fianza",
  "cierre",
];
