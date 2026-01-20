import { FaseCompraventa } from "@/types/compraventa";

interface BotMessage {
  texto: string;
  requiereConfirmacion?: boolean;
  adjuntos?: Array<{ tipo: "foto" | "pdf" | "documento"; url: string; nombre: string }>;
}

export const botFlowMessagesCompraventa: Record<FaseCompraventa, BotMessage[]> = {
  apertura_expediente_compraventa: [
    {
      texto: "¡Bienvenidos al Canal de Compraventa Directa Certificado! 🏠\n\nSoy Certy, vuestro asistente de Contract Lifecycle Management (CLM) y Prestador Cualificado de Servicios de Confianza bajo eIDAS.\n\nEste canal gestionará la compraventa desde la identificación de las partes hasta la entrega de llaves, con certificación completa de todos los pasos.\n\n¿Ambas partes confirman su intención de iniciar este proceso de compraventa certificado?",
      requiereConfirmacion: false,
    },
  ],

  identificacion_partes_compraventa: [
    {
      texto: "📋 FASE 2: IDENTIFICACIÓN DE LAS PARTES\n\nAhora procederemos a identificar formalmente al Vendedor y al Comprador.\n\nCada parte debe confirmar:\n✓ Su identidad completa (nombre, NIF, contacto)\n✓ Aceptación de los términos de uso del canal certificado\n✓ Aceptación de la política de privacidad\n\nPor favor, cada parte debe pulsar el botón 'Quiero unirme al canal' para confirmar su participación.",
      requiereConfirmacion: false,
    },
  ],

  identificacion_inmueble_compraventa: [
    {
      texto: "🏡 FASE 3: IDENTIFICACIÓN DEL INMUEBLE\n\nAhora identificaremos formalmente el inmueble objeto de compraventa:\n\n📍 Dirección completa\n📐 Características (superficie, habitaciones, baños)\n📝 Datos registrales (finca registral, tomo, libro, folio)\n\nEl Comprador puede solicitar una Nota Informativa del Registro de la Propiedad para verificar cargas y situación registral.\n\nPor favor, confirmen la identificación del inmueble cuando estén listos.",
      requiereConfirmacion: false,
    },
  ],

  financiacion_bancaria: [
    {
      texto: "💰 FASE 4: FINANCIACIÓN BANCARIA\n\nEs momento de definir la modalidad de pago de esta compraventa:\n\n🏦 OPCIÓN A: Financiación hipotecaria\n- El Comprador deberá aportar certificado de aprobación de hipoteca\n- Se registrará el banco financiador y el importe de la hipoteca\n\n💵 OPCIÓN B: Pago al contado\n- El Comprador declara disponer de fondos suficientes\n- No requiere financiación externa\n\n¿Qué modalidad de pago utilizará el Comprador?",
      requiereConfirmacion: false,
    },
  ],

  due_diligence_completa: [
    {
      texto: "📄 FASE 5: DUE DILIGENCE COMPLETA\n\nEl Comprador puede solicitar la siguiente documentación del inmueble:\n\n✓ Cédula de habitabilidad\n✓ Recibos IBI (últimos 3 años)\n✓ Certificado comunidad sin deudas\n✓ Certificado de eficiencia energética\n✓ Licencia de primera ocupación\n✓ Escritura de propiedad actual\n✓ Nota simple registral actualizada\n\nEl Vendedor aportará cada documento con certificación (hash + qualified timestamp).\n\nUna vez revisados todos los documentos, el Comprador confirmará conformidad para avanzar.",
      requiereConfirmacion: false,
    },
  ],

  configuracion_modalidad_cierre: [
    {
      texto: "🔀 FASE 6: CONFIGURACIÓN DE MODALIDAD DE CIERRE\n\nEs momento de decidir cómo se formalizará esta compraventa. Existen dos modalidades:\n\n📋 MODALIDAD A - DIRECTA (Escritura Pública Única):\n• Un solo acto notarial\n• Pago total en el momento de la escritura\n• Firma del contrato y escrituración simultáneos\n• Más rápido y directo\n\n📋 MODALIDAD B - ESCALONADA (Documento Privado + Elevación):\n• Paso 1: Firma de documento privado con pago parcial (señal/anticipo)\n• Paso 2: Elevación a escritura pública con pago del saldo\n• Permite escalonar pagos y asegurar financiación\n• Mayor flexibilidad temporal\n\n¿Qué modalidad prefieren las partes?",
      requiereConfirmacion: false,
    },
  ],

  // RUTA A: DIRECTA
  firma_contrato_compraventa_directa: [
    {
      texto: "📝 FASE 7a: FIRMA CONTRATO COMPRAVENTA (Modalidad Directa)\n\nHe generado el contrato de compraventa con las condiciones acordadas:\n\n• Precio de venta\n• Modalidad de pago (contado/hipoteca)\n• Fecha de escrituración prevista\n• Notaría seleccionada\n• Condiciones particulares\n\nAmbas partes deben revisar y firmar este contrato mediante firma electrónica avanzada (OTP + qualified timestamp).\n\nEste contrato será el documento base para la escritura pública.",
      requiereConfirmacion: false,
    },
  ],

  escrituracion_notarial_directa: [
    {
      texto: "⚖️ FASE 8a: ESCRITURACIÓN NOTARIAL (Modalidad Directa)\n\nSe ha convocado la cita notarial para formalizar la escritura pública de compraventa.\n\n📅 Fecha y hora confirmadas\n📍 Notaría seleccionada\n💰 Pago total a realizar en acto notarial\n\nAmbas partes deben:\n✓ Confirmar asistencia\n✓ Realizar el pago total según lo acordado\n✓ Firmar la escritura ante notario\n\nUna vez formalizada la escritura, el Vendedor subirá el documento certificado al canal.",
      requiereConfirmacion: false,
    },
  ],

  // RUTA B: ESCALONADA
  firma_documento_privado: [
    {
      texto: "📝 FASE 7b: FIRMA DOCUMENTO PRIVADO (Modalidad Escalonada)\n\nHe generado el documento privado de compraventa con las siguientes cláusulas:\n\n• Precio de venta total\n• Pago parcial acordado (señal/anticipo)\n• Compromiso de elevación a escritura pública\n• Fecha límite para escrituración\n• Condiciones particulares\n\nAmbas partes deben firmar este documento privado mediante firma electrónica avanzada (OTP + qualified timestamp).\n\nTras la firma, procederemos con el pago parcial.",
      requiereConfirmacion: false,
    },
  ],

  pago_parcial_documento_privado: [
    {
      texto: "💶 FASE 8b: PAGO PARCIAL (Modalidad Escalonada)\n\nEl Comprador debe realizar ahora el pago parcial acordado en el documento privado.\n\n📊 Monto parcial: Según lo pactado\n📧 Medio de pago: Transferencia bancaria\n\nPasos:\n1. El Comprador realiza la transferencia\n2. Sube el justificante bancario certificado\n3. El Vendedor confirma recepción del pago\n\nUna vez confirmado, procederemos a programar la elevación a escritura pública.",
      requiereConfirmacion: false,
    },
  ],

  elevacion_a_escritura_publica: [
    {
      texto: "⚖️ FASE 9b: ELEVACIÓN A ESCRITURA PÚBLICA (Modalidad Escalonada)\n\nSe ha convocado la cita notarial para elevar el documento privado a escritura pública definitiva.\n\n📅 Fecha y hora confirmadas\n📍 Notaría seleccionada\n💰 Pago del saldo pendiente a realizar en acto notarial\n\nAmbas partes deben:\n✓ Confirmar asistencia\n✓ Realizar el pago del saldo restante\n✓ Firmar la escritura ante notario\n\nUna vez formalizada la escritura definitiva, el Vendedor subirá el documento certificado al canal.",
      requiereConfirmacion: false,
    },
  ],

  // COMÚN A AMBAS RUTAS
  entrega_llaves: [
    {
      texto: "🔑 FASE 10: ENTREGA DE LLAVES\n\n¡La compraventa ha sido formalizada con éxito! Ahora procederemos con la entrega física del inmueble.\n\nSe generará un Acta de Entrega de Llaves certificada que incluirá:\n\n📸 Captura multimedia del estado del inmueble\n🔑 Inventario de llaves entregadas\n📋 Documentación complementaria (manuales, garantías, etc.)\n✍️ Firma electrónica avanzada de ambas partes\n\nEsta acta quedará certificada con sellos de tiempo cualificados y formará parte del expediente probatorio.\n\n¿Confirman ambas partes que están listos para la entrega?",
      requiereConfirmacion: false,
    },
  ],

  cierre_expediente_compraventa: [
    {
      texto: "✅ FASE 11: CIERRE DEL EXPEDIENTE\n\n¡Enhorabuena! La compraventa se ha completado exitosamente.\n\nEl expediente probatorio completo incluye:\n\n✓ Identificación certificada de las partes\n✓ Identificación del inmueble con datos registrales\n✓ Documentación de due diligence completa\n✓ Modalidad de cierre seleccionada\n✓ Contrato/documento privado firmado\n✓ Escritura pública formalizada\n✓ Acta de entrega de llaves certificada\n✓ Historial completo de comunicaciones certificadas\n\nTodo el expediente queda bajo custodia digital cualificada de EAD Trust, con validez legal plena bajo eIDAS y Ley 6/2020.\n\nPueden exportar el expediente completo en PDF en cualquier momento para conservación o presentación ante terceros.\n\n¡Muchas gracias por confiar en el Canal de Compraventa Directa Certificado!",
      requiereConfirmacion: false,
    },
  ],
};

export const faseLabelsCompraventa: Record<FaseCompraventa, string> = {
  apertura_expediente_compraventa: "Apertura Expediente",
  identificacion_partes_compraventa: "Identificación Partes",
  identificacion_inmueble_compraventa: "Identificación Inmueble",
  financiacion_bancaria: "Financiación Bancaria",
  due_diligence_completa: "Due Diligence Completa",
  configuracion_modalidad_cierre: "Modalidad de Cierre",
  firma_contrato_compraventa_directa: "Firma Contrato (Directa)",
  escrituracion_notarial_directa: "Escrituración (Directa)",
  firma_documento_privado: "Documento Privado",
  pago_parcial_documento_privado: "Pago Parcial",
  elevacion_a_escritura_publica: "Elevación a Escritura",
  entrega_llaves: "Entrega de Llaves",
  cierre_expediente_compraventa: "Cierre Expediente",
};

export const fasesOrdenadasCompraventa: FaseCompraventa[] = [
  "apertura_expediente_compraventa",
  "identificacion_partes_compraventa",
  "identificacion_inmueble_compraventa",
  "financiacion_bancaria",
  "due_diligence_completa",
  "configuracion_modalidad_cierre",
  // Nota: Las fases 7-9 varían según modalidad, pero se muestran todas en el pipeline
  "firma_contrato_compraventa_directa",
  "escrituracion_notarial_directa",
  "firma_documento_privado",
  "pago_parcial_documento_privado",
  "elevacion_a_escritura_publica",
  "entrega_llaves",
  "cierre_expediente_compraventa",
];
