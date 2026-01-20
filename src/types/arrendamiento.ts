export type FaseArrendamiento = 
  | "apertura_expediente"
  | "identificacion_partes"
  | "identificacion_inmueble"
  | "extracto_informado"
  | "firma_contrato"
  | "pagos_iniciales"
  | "estado_inicial"
  | "canal_oficial"
  | "vida_contrato"
  | "impago_evento"
  | "prorroga_legal"
  | "decision_arrendatario"
  | "recuperacion_necesidad"
  | "devolucion_fianza"
  | "cierre";

export interface Parte {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  direccion?: string;
  tipo: "arrendador" | "arrendatario" | "agencia";
  iban?: string;
  profesion?: string;
  empresa?: string;
  nomina?: number;
}

export interface Vivienda {
  direccion: string;
  tipo: string;
  superficie: number;
  habitaciones: number;
  banos: number;
  caracteristicas: Record<string, any>;
  comunidadAutonoma?: string; // Para requisitos de depósito de fianza por CCAA
  datosRegistrales?: {
    fincaRegistral: string;
    tomo: string;
    libro: string;
    folio: string;
    registroPropiedad: string;
  };
}

export interface DatosContrato {
  rentaMensual: number;
  deposito: number;
  fechaInicio: string;
  fechaFin: string;
  duracion: number;
  diaPago: number;
  politicas: Record<string, string>;
  tieneClausulaRecuperacionNecesidad?: boolean; // Art. 9.3 LAU
}

export interface InventarioItem {
  id: string;
  estancia: string;
  descripcion: string;
  estado: "bien" | "deterioro" | "falta";
  observaciones?: string;
  fotos: FotoInventario[];
}

export interface FotoInventario {
  id: string;
  url: string;
  hash: string;
  timestamp: string;
  certificado: boolean;
}

export interface Mensaje {
  id: string;
  tipo: "usuario" | "sistema" | "bot";
  remitente: "arrendador" | "arrendatario" | "sistema" | "bot" | "certy";
  texto: string;
  timestamp: string;
  certificado: boolean;
  hash?: string;
  adjuntos?: Adjunto[];
  leido?: boolean;
  requiereConfirmacion?: boolean;
  confirmadoPor?: ("arrendador" | "arrendatario")[];
}

export interface Adjunto {
  tipo: "foto" | "pdf" | "documento";
  url: string;
  nombre: string;
  hash: string;
}

export interface EventoTimeline {
  id: string;
  tipo: string;
  fecha: string;
  mensaje: string;
  icono?: string;
}

export interface Expediente {
  id: string;
  vivienda: Vivienda;
  partes: {
    arrendador: Parte;
    arrendatario: Parte;
    agencia?: Parte;
  };
  contrato: DatosContrato;
  fase: FaseArrendamiento;
  inventario: InventarioItem[];
  mensajes: Mensaje[];
  eventos: EventoTimeline[];
  fechaCreacion: string;
  estado: "pendiente" | "activo" | "finalizado";
}

export interface ArrendamientoState {
  expediente: Expediente;
  vistaActual: "consola" | "movil" | "dual";
  usuarioActual: "operador" | "arrendador" | "arrendatario";
}

export interface ArrendamientoContextType extends ArrendamientoState {
  cambiarVista: (vista: "consola" | "movil" | "dual") => void;
  cambiarUsuario: (usuario: "operador" | "arrendador" | "arrendatario") => void;
  cambiarFase: (fase: FaseArrendamiento) => void;
  enviarMensaje: (mensaje: Omit<Mensaje, "id" | "timestamp" | "certificado" | "hash">) => void;
  actualizarExpediente: (expediente: Expediente) => void;
  marcarComoLeido: (mensajeId: string) => void;
  confirmarMensaje: (mensajeId: string, remitente: "arrendador" | "arrendatario") => void;
  contratos: Expediente[];
  contratoSeleccionado: string;
  seleccionarContrato: (id: string) => void;
}
