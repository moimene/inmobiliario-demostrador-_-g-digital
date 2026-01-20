// Chrono-Flare State Machine Types for Arras
// 11-State Standard

export type ArrasFase =
  | "apertura"                // 1. Inicio
  | "kyc_partes"              // 2. Identificación
  | "inmueble_dd"             // 3. Inmueble + Due Diligence básica
  | "borrador_contrato"       // 4. Negociación/Configuración
  | "firma_digital"           // 5. Firma del contrato
  | "custodia_fondos"         // 6. Depósito/Escrow
  | "cumplimiento_condiciones"// 7. Periodo de vigencia (Pre-Escritura)
  | "preparacion_notarial"    // 8. Convocatoria
  | "formalizacion_escritura" // 9. Firma ante notario
  | "liquidacion_impuestos"   // 10. Post-firma / Plusvalía
  | "cierre_expediente";      // 11. Archivo certificadodu

// New Chrono-Flare Core Types

export type ArrasRol = "vendedor" | "comprador" | "agente" | "notaria" | "admin";

export interface Documento {
  id: string;
  nombre: string;
  tipo: "identidad" | "propiedad" | "contrato" | "justificante" | "certificacion" | "otro";
  url: string;
  hash: string;
  timestamp: string;
  subidoPor: ArrasRol;
  estado: "pendiente" | "validado" | "rechazado";
  metadatos?: Record<string, any>;
}

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
    tsa: string; // Timestamp Authority token stub
  };
}

export interface Evento {
  id: string;
  fase: ArrasFase;
  descripcion: string;
  actor: ArrasRol | "sistema";
  timestamp: string;
  tipo: "cambio_fase" | "documento" | "firma" | "pago" | "info";
  hash?: string;
}

export interface Parte {
  id: string;
  rol: ArrasRol;
  nombre: string;
  email: string;
  telefono?: string;
  kycAprobado: boolean;
  avatar?: string;
}

export interface ContratoData {
  precioVenta: number;
  importeArras: number;
  tipoArras: "penitenciales" | "confirmatorias" | "penales";
  fechaTopeEscritura: string;
  clausulasAdicionales?: string[];
  ibanDeposito?: string;
}

// Expediente Aggregates

export interface ExpedienteArras {
  id: string;
  referencia: string;
  fechaCreacion: string;
  faseActual: ArrasFase;

  // Entities
  partes: Parte[];
  inmueble: {
    direccion: string;
    referenciaCatastral?: string;
    datosRegistrales?: string;
  };
  contrato: ContratoData;

  // Collections
  inventarioDocumental: Documento[];
  comunicaciones: Comunicacion[];
  timeline: Evento[];

  // Status
  bloqueado: boolean; // Si está en espera de firma o validación
  alertas: string[];
}

// Context State

export interface ArrasState {
  expediente: ExpedienteArras;
  usuarioActual: ArrasRol;
  vista: "dashboard" | "wizard" | "documentos";
}

export interface ArrasContextType extends ArrasState {
  setFase: (fase: ArrasFase) => void;
  setUsuario: (rol: ArrasRol) => void;
  setVista: (vista: "dashboard" | "wizard" | "documentos") => void;
  addComunicacion: (msg: string, adjuntos?: Documento[]) => void;
  uploadDocumento: (doc: Omit<Documento, "id" | "timestamp" | "hash" | "estado">) => void;
  loadExpediente: (id: string) => void;
}
