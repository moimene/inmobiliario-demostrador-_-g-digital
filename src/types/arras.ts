// Chrono-Flare State Machine Types for Arras
// Compatible with both new Chrono-Flare architecture and legacy Bot Flow

// ============================================
// FASES: Dual system for compatibility
// ============================================

// 11-State Chrono-Flare Standard (new architecture)
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

// 12-Phase Bot Flow (legacy - used by arrasBotFlow.ts)
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

// ============================================
// ROLES
// ============================================

export type ArrasRol = "vendedor" | "comprador" | "agente" | "notaria" | "admin" | "bot" | "certy";

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

// Extended party type for mock data
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

// Extended inmueble type for mock data
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
// DOCUMENTOS
// ============================================

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

// Simplified attachment for messages
export interface AdjuntoMensaje {
  tipo: string;
  nombre: string;
  url: string;
  hash?: string;
}

// ============================================
// COMUNICACIONES Y MENSAJES
// ============================================

export interface Comunicacion {
  id: string;
  remitente: ArrasRol;
  destinatarios: ArrasRol[];
  mensaje: string;
  timestamp: string;
  tipo: "chat" | "notificacion" | "alerta" | "sistema";
  leido: boolean;
  adjuntos?: Documento[];
  evidencia?: {
    hash: string;
    tsa: string;
  };
}

// Extended message type for chat (legacy compatibility)
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
// CONTRATO
// ============================================

export interface ContratoData {
  precioVenta: number;
  importeArras: number;
  tipoArras: "penitenciales" | "confirmatorias" | "penales";
  fechaTopeEscritura: string;
  clausulasAdicionales?: string[];
  ibanDeposito?: string;
}

// Extended contract data for mock
export interface DatosContratoArras {
  precioVenta: number;
  cantidadArras: number;
  porcentajeArras: number;
  tipoDeposito: "notaria" | "escrow" | "tokenizado";
  notariaSeleccionada?: string;
  fechaContrato?: string;
  plazoEscritura: number;
  fechaLimiteEscritura: string;
}

// ============================================
// EVENTOS Y TIMELINE
// ============================================

export interface Evento {
  id: string;
  fase: ArrasFase | FaseArras;
  descripcion: string;
  actor: ArrasRol | "sistema";
  timestamp: string;
  tipo: "cambio_fase" | "documento" | "firma" | "pago" | "info";
  hash?: string;
}

// Timeline event for mock data
export interface EventoTimelineArras {
  id: string;
  tipo: string;
  fecha: string;
  mensaje: string;
  icono?: string;
}

// ============================================
// EXPEDIENTE (Main Entity)
// ============================================

// New Chrono-Flare expediente structure
export interface ExpedienteArrasChronoFlare {
  id: string;
  referencia: string;
  fechaCreacion: string;
  faseActual: ArrasFase;
  partes: Parte[];
  inmueble: {
    direccion: string;
    referenciaCatastral?: string;
    datosRegistrales?: string;
  };
  contrato: ContratoData;
  inventarioDocumental: Documento[];
  comunicaciones: Comunicacion[];
  timeline: Evento[];
  bloqueado: boolean;
  alertas: string[];
}

// Legacy expediente structure (used by mock data and components)
export interface ExpedienteArras {
  id: string;
  fechaCreacion: string;
  estado?: "activo" | "cerrado" | "resuelto";
  
  // Phase - supports both systems
  fase: FaseArras;
  faseActual?: ArrasFase;
  
  // Parties - object structure for compatibility
  partes: {
    vendedor: ParteArras;
    comprador: ParteArras;
  };
  
  // Property
  inmueble: InmuebleArras;
  
  // Contract
  contrato: DatosContratoArras;
  
  // Messages (legacy)
  mensajes: MensajeArras[];
  
  // Events timeline
  eventos: EventoTimelineArras[];
  
  // Optional Chrono-Flare fields
  referencia?: string;
  inventarioDocumental?: Documento[];
  comunicaciones?: Comunicacion[];
  timeline?: Evento[];
  bloqueado?: boolean;
  alertas?: string[];
}

// ============================================
// CONTEXT STATE
// ============================================

export interface ArrasState {
  expediente: ExpedienteArras;
  usuarioActual: ArrasRol | "vendedor" | "comprador";
  vista: "dashboard" | "wizard" | "documentos";
  contratos: ExpedienteArras[];
  contratoSeleccionado: string | null;
}

export interface ArrasContextType extends ArrasState {
  // Phase management
  setFase: (fase: ArrasFase) => void;
  cambiarFase: (fase: FaseArras) => void;
  
  // User management
  setUsuario: (rol: ArrasRol) => void;
  setVista: (vista: "dashboard" | "wizard" | "documentos") => void;
  
  // Communication
  addComunicacion: (msg: string, adjuntos?: Documento[]) => void;
  enviarMensaje: (msg: Partial<MensajeArras>) => void;
  confirmarMensaje: (msgId: string, rol: string) => void;
  
  // Documents
  uploadDocumento: (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => void;
  
  // Contract management
  seleccionarContrato: (id: string) => void;
  loadExpediente: (id: string) => void;
}
