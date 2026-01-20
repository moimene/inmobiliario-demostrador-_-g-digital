// ============================================
// CHRONO-FLARE: Sistema de Gestión de Contratos de Arras
// Conforme a eIDAS (Reglamento UE 910/2014)
// ============================================

// ============================================
// ESTADOS DEL CONTRATO - Máquina de Estados Extendida
// ============================================

/**
 * Estados principales del contrato según el README Chrono-Flare
 * 
 * Fase de Negociación:
 *   INICIADO → EN_NEGOCIACION → TERMINOS_ESENCIALES_ACEPTADOS → BORRADOR_GENERADO
 * 
 * Fase de Firma:
 *   BORRADOR_GENERADO → EN_FIRMA → FIRMADO
 * 
 * Fase de Notaría:
 *   FIRMADO → CONVOCATORIA_NOTARIAL → CONVOCATORIA_ESCRITURA → NOTARIA
 * 
 * Estados Finales:
 *   NOTARIA → TERMINADO
 *   NOTARIA → NO_COMPARECENCIA → LITIGIO
 *   (cualquier estado) → LITIGIO (por incumplimiento)
 */
export type EstadoContrato =
  | "INICIADO"
  | "EN_NEGOCIACION"
  | "TERMINOS_ESENCIALES_ACEPTADOS"
  | "BORRADOR_GENERADO"
  | "EN_FIRMA"
  | "FIRMADO"
  | "CONVOCATORIA_NOTARIAL"
  | "CONVOCATORIA_ESCRITURA"
  | "NOTARIA"
  | "NO_COMPARECENCIA"
  | "TERMINADO"
  | "LITIGIO";

export type FaseContrato = "negociacion" | "firma" | "notaria" | "terminal";

// Estado info para UI
export interface EstadoInfo {
  id: EstadoContrato;
  fase: FaseContrato;
  label: string;
  descripcion: string;
  accionesDisponibles: string[];
}

export const ESTADOS_CONTRATO: Record<EstadoContrato, EstadoInfo> = {
  INICIADO: {
    id: "INICIADO",
    fase: "negociacion",
    label: "Iniciado",
    descripcion: "Alta inicial del expediente",
    accionesDisponibles: ["Editar datos", "Invitar partes"],
  },
  EN_NEGOCIACION: {
    id: "EN_NEGOCIACION",
    fase: "negociacion",
    label: "En Negociación",
    descripcion: "Partes revisando términos",
    accionesDisponibles: ["Proponer cambios"],
  },
  TERMINOS_ESENCIALES_ACEPTADOS: {
    id: "TERMINOS_ESENCIALES_ACEPTADOS",
    fase: "negociacion",
    label: "Términos Aceptados",
    descripcion: "Términos acordados",
    accionesDisponibles: ["Generar borrador"],
  },
  BORRADOR_GENERADO: {
    id: "BORRADOR_GENERADO",
    fase: "firma",
    label: "Borrador Generado",
    descripcion: "Borrador PDF disponible",
    accionesDisponibles: ["Revisar", "Invitar a firma"],
  },
  EN_FIRMA: {
    id: "EN_FIRMA",
    fase: "firma",
    label: "En Firma",
    descripcion: "Proceso de firma iniciado",
    accionesDisponibles: ["Firmar (cada parte)"],
  },
  FIRMADO: {
    id: "FIRMADO",
    fase: "firma",
    label: "Firmado",
    descripcion: "Documento firmado",
    accionesDisponibles: ["Gestionar pagos", "Convocar notaría"],
  },
  CONVOCATORIA_NOTARIAL: {
    id: "CONVOCATORIA_NOTARIAL",
    fase: "notaria",
    label: "Convocatoria Notarial",
    descripcion: "Cita notarial solicitada",
    accionesDisponibles: ["Preparar documentación"],
  },
  CONVOCATORIA_ESCRITURA: {
    id: "CONVOCATORIA_ESCRITURA",
    fase: "notaria",
    label: "Convocatoria Escritura",
    descripcion: "Fecha de escritura fijada",
    accionesDisponibles: ["Subir documentos notariales"],
  },
  NOTARIA: {
    id: "NOTARIA",
    fase: "notaria",
    label: "En Notaría",
    descripcion: "En trámite de escritura",
    accionesDisponibles: ["Subir escritura", "Marcar comparecencia"],
  },
  NO_COMPARECENCIA: {
    id: "NO_COMPARECENCIA",
    fase: "terminal",
    label: "No Comparecencia",
    descripcion: "Alguna parte no compareció",
    accionesDisponibles: ["Generar acta", "Iniciar alegaciones"],
  },
  TERMINADO: {
    id: "TERMINADO",
    fase: "terminal",
    label: "Terminado",
    descripcion: "Compraventa completada",
    accionesDisponibles: ["Solo consulta (inmutable)"],
  },
  LITIGIO: {
    id: "LITIGIO",
    fase: "terminal",
    label: "En Litigio",
    descripcion: "En disputa",
    accionesDisponibles: ["Gestionar alegaciones", "Arbitraje"],
  },
};

// Legacy aliases for backward compatibility
export type ArrasFase =
  | "apertura"
  | "kyc_partes"
  | "inmueble_dd"
  | "borrador_contrato"
  | "firma_digital"
  | "custodia_fondos"
  | "cumplimiento_condiciones"
  | "preparacion_notarial"
  | "formalizacion_escritura"
  | "liquidacion_impuestos"
  | "cierre_expediente";

export type FaseArras =
  | "apertura_expediente_arras"
  | "identificacion_partes_arras"
  | "identificacion_inmueble_arras"
  | "due_diligence_basica"
  | "configuracion_deposito_arras"
  | "generacion_y_firma_contrato_arras"
  | "canal_certificado_pre_escritura"
  | "gestion_eventos_pre_notaria"
  | "convocatoria_y_comparecencia_notarial"
  | "resultado_formalizacion"
  | "resolucion_arras"
  | "arbitraje_y_cierre";

// Mapeo EstadoContrato ↔ FaseArras (legacy)
export const MAPEO_ESTADO_FASE: Record<EstadoContrato, FaseArras> = {
  INICIADO: "apertura_expediente_arras",
  EN_NEGOCIACION: "identificacion_partes_arras",
  TERMINOS_ESENCIALES_ACEPTADOS: "identificacion_inmueble_arras",
  BORRADOR_GENERADO: "generacion_y_firma_contrato_arras",
  EN_FIRMA: "generacion_y_firma_contrato_arras",
  FIRMADO: "canal_certificado_pre_escritura",
  CONVOCATORIA_NOTARIAL: "convocatoria_y_comparecencia_notarial",
  CONVOCATORIA_ESCRITURA: "convocatoria_y_comparecencia_notarial",
  NOTARIA: "resultado_formalizacion",
  NO_COMPARECENCIA: "arbitraje_y_cierre",
  TERMINADO: "arbitraje_y_cierre",
  LITIGIO: "arbitraje_y_cierre",
};

// ============================================
// ROLES Y MANDATOS
// ============================================

export type TipoRolUsuario =
  | "ADMIN"
  | "COMPRADOR"
  | "VENDEDOR"
  | "TERCERO"
  | "NOTARIO"
  | "OBSERVADOR";

export type TipoMandato =
  | "PARTE_COMPRADORA"
  | "PARTE_VENDEDORA"
  | "AMBAS_PARTES"
  | "NOTARIA"
  | "OBSERVADOR_TECNICO";

export type PermisoUsuario =
  | "puede_subir_documentos"
  | "puede_invitar"
  | "puede_validar_documentos"
  | "puede_firmar"
  | "puede_enviar_comunicaciones";

export type EstadoMiembro = "MIEMBRO_ACTIVO" | "INVITACION_PENDIENTE" | "NO_INVITADO";
export type EstadoFirma = "PENDIENTE" | "FIRMADO" | "RECHAZADO";

// Legacy role alias
export type ArrasRol = "vendedor" | "comprador" | "agente" | "notaria" | "admin" | "bot" | "certy";

export interface Mandato {
  id: string;
  tipo: TipoMandato;
  otorgadoPor: string; // userId
  otorgadoA: string; // userId
  permisos: PermisoUsuario[];
  fechaOtorgamiento: string;
  fechaRevocacion?: string;
  selloQTSP?: string;
  activo: boolean;
}

export interface MiembroContrato {
  id: string;
  usuarioId: string;
  contratoId: string;
  rol: TipoRolUsuario;
  estado: EstadoMiembro;
  mandato?: Mandato;
  estadoFirma: EstadoFirma;
  fechaInvitacion?: string;
  fechaAceptacion?: string;
}

// ============================================
// PARTES (Parties)
// ============================================

export interface Parte {
  id: string;
  rol: ArrasRol;
  nombre: string;
  email: string;
  telefono?: string;
  kycAprobado: boolean;
  avatar?: string;
}

export interface ParteArras {
  nombre: string;
  nif: string;
  telefono?: string;
  email: string;
  direccion?: string;
  tipo: "vendedor" | "comprador";
  iban?: string;
  profesion?: string;
  empresa?: string;
}

// ============================================
// INMUEBLE (Property)
// ============================================

export interface InmuebleArras {
  direccion: string;
  tipo?: string;
  superficie?: number;
  habitaciones?: number;
  banos?: number;
  referenciaCatastral?: string;
  caracteristicas?: {
    cocina?: string;
    terraza?: string;
    garaje?: string;
    trastero?: string;
    anoConstructor?: number;
    certificadoEnergetico?: string;
    reformado?: boolean;
  };
  datosRegistrales?: {
    fincaRegistral?: string;
    tomo?: string;
    libro?: string;
    folio?: string;
    registroPropiedad?: string;
  } | string;
}

// ============================================
// INVENTARIO DINÁMICO DE DOCUMENTOS
// ============================================

export type TipoDocumento =
  // Bloque Inmueble
  | "NOTA_SIMPLE"
  | "ESCRITURA_ANTERIOR"
  | "RECIBO_IBI"
  | "CERTIFICADO_COMUNIDAD"
  | "CEE"
  // Bloque Identidad
  | "DNI_NIE_COMPRADOR"
  | "DNI_NIE_VENDEDOR"
  | "PODERES"
  // Bloque Contractual
  | "CONTRATO_ARRAS_BORRADOR"
  | "CONTRATO_ARRAS_FIRMADO"
  | "JUSTIFICANTE_PAGO_ARRAS"
  // Bloque Notaría
  | "MINUTA_ESCRITURA"
  | "ESCRITURA_COMPRAVENTA"
  | "ACTA_NO_COMPARECENCIA"
  // Condicionales
  | "CERTIFICADO_HIPOTECA_CANCELADA"
  | "CONTRATO_ARRENDAMIENTO"
  | "INVENTARIO_MOBILIARIO";

export type EstadoDocumento = "PENDIENTE" | "SUBIDO" | "VALIDADO" | "RECHAZADO";

export type CategoriaDocumento = "inmueble" | "identidad" | "contractual" | "notaria";

export interface ItemInventario {
  id: string;
  contratoId: string;
  tipo: TipoDocumento;
  estado: EstadoDocumento;
  responsableRol: TipoRolUsuario;
  categoria: CategoriaDocumento;
  obligatorio: boolean;
  archivoId?: string;
  nombreArchivo?: string;
  fechaSubida?: string;
  validadoPor?: string;
  fechaValidacion?: string;
  motivoRechazo?: string;
  metadatos?: {
    caducidad?: string;
    csvRegistro?: string;
    numeroFinca?: string;
  };
}

// Definición de bloques de documentación
export const BLOQUES_INVENTARIO: Record<CategoriaDocumento, { tipos: TipoDocumento[]; responsable: TipoRolUsuario }> = {
  inmueble: {
    tipos: ["NOTA_SIMPLE", "ESCRITURA_ANTERIOR", "RECIBO_IBI", "CERTIFICADO_COMUNIDAD", "CEE"],
    responsable: "VENDEDOR",
  },
  identidad: {
    tipos: ["DNI_NIE_COMPRADOR", "DNI_NIE_VENDEDOR", "PODERES"],
    responsable: "COMPRADOR", // Cada parte sube el suyo
  },
  contractual: {
    tipos: ["CONTRATO_ARRAS_BORRADOR", "CONTRATO_ARRAS_FIRMADO", "JUSTIFICANTE_PAGO_ARRAS"],
    responsable: "COMPRADOR",
  },
  notaria: {
    tipos: ["MINUTA_ESCRITURA", "ESCRITURA_COMPRAVENTA", "ACTA_NO_COMPARECENCIA"],
    responsable: "NOTARIO",
  },
};

// Gating de transiciones
export const GATING_TRANSICIONES: Record<string, TipoDocumento[]> = {
  "FIRMADO→NOTARIA": ["NOTA_SIMPLE", "RECIBO_IBI", "CEE", "JUSTIFICANTE_PAGO_ARRAS"],
  "NOTARIA→TERMINADO": ["ESCRITURA_COMPRAVENTA"],
};

// Legacy document type
export interface Documento {
  id: string;
  nombre: string;
  tipo: "identidad" | "propiedad" | "contrato" | "justificante" | "certificacion" | "otro" | "pdf";
  url: string;
  hash: string;
  timestamp: string;
  subidoPor?: ArrasRol;
  estado?: "pendiente" | "validado" | "rechazado";
  metadatos?: Record<string, any>;
}

export interface AdjuntoMensaje {
  tipo: string;
  nombre: string;
  url: string;
  hash?: string;
}

// ============================================
// COMUNICACIONES ESTRUCTURADAS
// ============================================

export type TipoComunicacion =
  | "MENSAJE_GENERAL"
  | "RECLAMACION"
  | "ENTREGA_DOCUMENTACION"
  | "SOLICITUD_DOCUMENTACION"
  | "SOLICITUD_MODIFICACION_TERMINOS"
  | "RESPUESTA_RECLAMACION"
  | "AVISO_PLAZO"
  | "ACEPTACION_TERMINOS"
  | "CONVOCATORIA_NOTARIA"
  | "ALEGACION_NO_COMPARECENCIA";

export interface Comunicacion {
  id: string;
  contratoId: string;
  tipo: TipoComunicacion;
  remitente: TipoRolUsuario;
  destinatarios: TipoRolUsuario[];
  asunto?: string;
  mensaje: string;
  timestamp: string;
  leido: boolean;
  relevante: boolean; // Para marcar como relevante para el expediente
  adjuntos?: Documento[];
  evidencia?: {
    hash: string;
    tsa: string; // Token RFC3161
    selloId: string;
  };
  // Para respuestas
  respondeA?: string;
}

// Legacy message type
export interface MensajeArras {
  id: string;
  tipo: "bot" | "usuario" | "sistema";
  remitente: string;
  texto: string;
  timestamp: string;
  certificado?: boolean;
  hash?: string;
  leido?: boolean;
  requiereConfirmacion?: boolean;
  confirmadoPor?: string[];
  adjuntos?: AdjuntoMensaje[];
}

// ============================================
// TIPO DE ARRAS
// ============================================

export type TipoArras = "PENITENCIALES" | "CONFIRMATORIAS" | "PENALES";

export interface ConsecuenciasArras {
  siCompradorIncumple: string;
  siVendedorIncumple: string;
}

export const CONSECUENCIAS_ARRAS: Record<TipoArras, ConsecuenciasArras> = {
  PENITENCIALES: {
    siCompradorIncumple: "Pérdida de arras entregadas",
    siVendedorIncumple: "Devolución por duplicado",
  },
  CONFIRMATORIAS: {
    siCompradorIncumple: "Cumplimiento forzoso o resolución + daños",
    siVendedorIncumple: "Cumplimiento forzoso o resolución + daños",
  },
  PENALES: {
    siCompradorIncumple: "Penalización pactada (sin resolver)",
    siVendedorIncumple: "Penalización pactada (sin resolver)",
  },
};

// ============================================
// MOTOR DE PLANTILLAS CONTRACTUALES
// ============================================

export interface CondicionesContrato {
  tipoArras: TipoArras;
  objeto: "VIVIENDA" | "LOCAL" | "OTRO";
  derecho: "COMUN" | "FORAL";
  sinHipoteca: boolean;
  sinArrendatarios: boolean;
  formaPagoArras: "TRANSFERENCIA" | "ESCROW" | "CHEQUE";
  retenciones: number;
  mobiliarioEquipamiento: boolean;
}

// Determina si aplica "Modo Estándar Observatorio"
export const esModoEstandarObservatorio = (condiciones: CondicionesContrato): boolean => {
  return (
    condiciones.objeto === "VIVIENDA" &&
    condiciones.derecho === "COMUN" &&
    condiciones.sinHipoteca &&
    condiciones.sinArrendatarios &&
    condiciones.tipoArras === "PENITENCIALES"
  );
};

// ============================================
// CONTRATO DATA
// ============================================

export interface ContratoData {
  precioVenta: number;
  importeArras: number;
  tipoArras: TipoArras;
  fechaTopeEscritura: string;
  clausulasAdicionales?: string[];
  ibanDeposito?: string;
}

export interface DatosContratoArras {
  precioVenta: number;
  cantidadArras: number;
  porcentajeArras: number;
  tipoArras: TipoArras;
  tipoDeposito: "notaria" | "escrow" | "tokenizado";
  notariaSeleccionada?: string;
  fechaContrato?: string;
  plazoEscritura: number;
  fechaLimiteEscritura: string;
  condiciones?: CondicionesContrato;
}

// ============================================
// EVENTOS Y AUDITORÍA
// ============================================

export type TipoEvento =
  | "CONTRATO_CREADO"
  | "ACEPTACION_TERMINOS"
  | "FIRMA_ELECTRONICA"
  | "DOCUMENTO_SUBIDO"
  | "DOCUMENTO_VALIDADO"
  | "DOCUMENTO_RECHAZADO"
  | "MANDATO_OTORGADO"
  | "MANDATO_REVOCADO"
  | "CONVOCATORIA_NOTARIAL"
  | "ACTA_NO_COMPARECENCIA"
  | "ESCRITURA_OTORGADA"
  | "CONTRATO_CERRADO"
  | "CONTRATO_FIRMADO_EXTERNO_SUBIDO"
  | "CONTRATO_FIRMADO_EXTERNO_RATIFICADO"
  | "CONTRATO_FIRMADO_FINALIZADO"
  | "CAMBIO_ESTADO"
  | "COMUNICACION_ENVIADA";

export interface EventoAuditoria {
  id: string;
  contratoId: string;
  tipo: TipoEvento;
  actorUsuarioId: string;
  actorTipo: TipoRolUsuario;
  actorMandatoId?: string;
  actorMandatoTipo?: TipoMandato;
  payloadJson: Record<string, any>;
  hashSha256: string;
  prevHashSha256?: string;
  selloId: string;
  fechaHora: string;
}

export interface SelloTiempo {
  proveedor: string;
  marca: string;
  hashSha256: string;
  rfc3161TstBase64: string;
  fechaSello: string;
}

// Legacy event type
export interface Evento {
  id: string;
  fase: ArrasFase | FaseArras;
  descripcion: string;
  actor: ArrasRol | "sistema";
  timestamp: string;
  tipo: "cambio_fase" | "documento" | "firma" | "pago" | "info";
  hash?: string;
}

export interface EventoTimelineArras {
  id: string;
  tipo: string;
  fecha: string;
  mensaje: string;
  icono?: string;
  hash?: string;
  actor?: string;
}

// ============================================
// FLUJO DE RATIFICACIÓN (Documento Externo)
// ============================================

export interface Ratificacion {
  id: string;
  contratoId: string;
  documentoId: string;
  rol: TipoRolUsuario;
  usuarioId: string;
  textoLegal: string;
  hashDocumento: string;
  selloQTSP: string;
  fechaRatificacion: string;
}

export const TEXTO_RATIFICACION = `Declaro que he revisado el documento PDF que se muestra como "Contrato de arras firmado" y reconozco que corresponde al contrato que he firmado fuera de esta plataforma.

Confirmo que:
1. Reconozco como propio el contenido íntegro de dicho documento
2. Ratifico su validez y eficacia a todos los efectos legales
3. Acepto que esta ratificación electrónica quede registrada con sellado de tiempo cualificado
4. Entiendo que esta actuación refuerza probatoriamente la firma original`;

// ============================================
// EXPEDIENTE (Main Entity)
// ============================================

export interface ExpedienteArras {
  id: string;
  referencia?: string;
  fechaCreacion: string;
  
  // Estado según máquina Chrono-Flare
  estado: EstadoContrato;
  faseActual?: ArrasFase; // Legacy compatibility
  fase: FaseArras; // Legacy compatibility
  
  // Partes
  partes: {
    vendedor: ParteArras;
    comprador: ParteArras;
  };
  miembros?: MiembroContrato[];
  
  // Inmueble
  inmueble: InmuebleArras;
  
  // Contrato
  contrato: DatosContratoArras;
  
  // Inventario dinámico
  inventarioDocumental: ItemInventario[];
  
  // Comunicaciones estructuradas
  comunicaciones: Comunicacion[];
  
  // Legacy messages (for chat compatibility)
  mensajes: MensajeArras[];
  
  // Timeline de auditoría
  eventos: EventoTimelineArras[];
  eventosAuditoria?: EventoAuditoria[];
  
  // Firmas y ratificaciones
  firmas?: {
    comprador?: { firmado: boolean; fecha?: string; selloQTSP?: string };
    vendedor?: { firmado: boolean; fecha?: string; selloQTSP?: string };
  };
  ratificaciones?: Ratificacion[];
  
  // Notaría
  notaria?: {
    id?: string;
    nombre?: string;
    direccion?: string;
    fechaCita?: string;
    minutaGenerada?: boolean;
    escrituraOtorgada?: boolean;
  };
  
  // Flags
  bloqueado?: boolean;
  alertas?: string[];
  modoEstandar?: boolean; // Modo Estándar Observatorio
}

// ============================================
// CONTEXT STATE
// ============================================

export interface ArrasState {
  expediente: ExpedienteArras;
  usuarioActual: ArrasRol | TipoRolUsuario | "vendedor" | "comprador";
  mandatoActivo?: Mandato;
  vista: "dashboard" | "wizard" | "documentos";
  contratos: ExpedienteArras[];
  contratoSeleccionado: string | null;
}

export interface ArrasContextType extends ArrasState {
  // Estado management
  setEstado: (estado: EstadoContrato) => void;
  setFase: (fase: ArrasFase) => void;
  cambiarFase: (fase: FaseArras) => void;
  
  // User management
  setUsuario: (rol: ArrasRol) => void;
  setMandato: (mandato: Mandato | undefined) => void;
  setVista: (vista: "dashboard" | "wizard" | "documentos") => void;
  
  // Communication
  addComunicacion: (comunicacion: Omit<Comunicacion, "id" | "timestamp" | "evidencia">) => void;
  enviarMensaje: (msg: Partial<MensajeArras>) => void;
  confirmarMensaje: (msgId: string, rol: string) => void;
  
  // Documents
  uploadDocumento: (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => void;
  actualizarItemInventario: (itemId: string, estado: EstadoDocumento, archivoId?: string) => void;
  validarDocumento: (itemId: string, validadoPor: string) => void;
  rechazarDocumento: (itemId: string, motivo: string) => void;
  
  // Signatures
  firmarContrato: (rol: TipoRolUsuario) => void;
  ratificarDocumento: (documentoId: string, rol: TipoRolUsuario) => void;
  
  // Contract management
  seleccionarContrato: (id: string) => void;
  loadExpediente: (id: string) => void;
  
  // Helpers
  puedeTransicionar: (nuevoEstado: EstadoContrato) => boolean;
  getDocumentosFaltantes: () => ItemInventario[];
}
