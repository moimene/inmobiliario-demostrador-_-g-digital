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

export interface ParteArras {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  direccion?: string;
  tipo: "vendedor" | "comprador" | "notaria" | "escrow";
  iban?: string;
  profesion?: string;
  empresa?: string;
}

export interface InmuebleArras {
  direccion: string;
  tipo: string;
  superficie: number;
  habitaciones: number;
  banos: number;
  caracteristicas: Record<string, any>;
  datosRegistrales?: {
    fincaRegistral: string;
    tomo: string;
    libro: string;
    folio: string;
    registroPropiedad: string;
  };
  notaRegistral?: {
    fecha: string;
    url: string;
    hash: string;
  };
}

export interface DatosContratoArras {
  precioVenta: number;
  cantidadArras: number;
  porcentajeArras: number;
  tipoDeposito: "notaria" | "escrow";
  notariaSeleccionada?: string;
  fechaContrato: string;
  plazoEscritura: number; // días
  fechaLimiteEscritura: string;
}

export interface DeclaracionVendedor {
  titularidadCompleta: boolean;
  cargas: string;
  arrendamientos: boolean;
  licencias: boolean;
  deudas: boolean;
  observaciones?: string;
}

export interface MensajeArras {
  id: string;
  tipo: "usuario" | "sistema" | "bot";
  remitente: "vendedor" | "comprador" | "sistema" | "bot" | "certy";
  texto: string;
  timestamp: string;
  certificado: boolean;
  hash?: string;
  adjuntos?: AdjuntoArras[];
  leido?: boolean;
  requiereConfirmacion?: boolean;
  confirmadoPor?: ("vendedor" | "comprador")[];
}

export interface AdjuntoArras {
  tipo: "foto" | "pdf" | "documento";
  url: string;
  nombre: string;
  hash: string;
}

export interface EventoTimelineArras {
  id: string;
  tipo: string;
  fecha: string;
  mensaje: string;
  icono?: string;
}

export interface ResultadoFormalizacion {
  tipo: "escritura_formalizada" | "no_comparecencia_vendedor" | "no_comparecencia_comprador" | "mutuo_acuerdo";
  fecha: string;
  documento?: string;
  observaciones?: string;
}

export interface ResolucionArras {
  tipo: "imputadas_precio" | "perdida_comprador" | "devolucion_doblada" | "devolucion_simple";
  monto: number;
  fecha: string;
  justificacion: string;
}

export interface ExpedienteArras {
  id: string;
  inmueble: InmuebleArras;
  partes: {
    vendedor: ParteArras;
    comprador: ParteArras;
    notaria?: ParteArras;
    escrow?: ParteArras;
  };
  contrato: DatosContratoArras;
  declaraciones?: DeclaracionVendedor;
  fase: FaseArras;
  mensajes: MensajeArras[];
  eventos: EventoTimelineArras[];
  fechaCreacion: string;
  estado: "pendiente" | "activo" | "finalizado";
  resultado?: ResultadoFormalizacion;
  resolucion?: ResolucionArras;
}

export interface ArrasState {
  expediente: ExpedienteArras;
  vistaActual: "consola" | "movil" | "dual";
  usuarioActual: "operador" | "vendedor" | "comprador";
}

export interface ArrasContextType extends ArrasState {
  cambiarVista: (vista: "consola" | "movil" | "dual") => void;
  cambiarUsuario: (usuario: "operador" | "vendedor" | "comprador") => void;
  cambiarFase: (fase: FaseArras) => void;
  enviarMensaje: (mensaje: Omit<MensajeArras, "id" | "timestamp" | "certificado" | "hash" | "leido">) => void;
  actualizarExpediente: (expediente: ExpedienteArras) => void;
  marcarComoLeido: (mensajeId: string) => void;
  confirmarMensaje: (mensajeId: string, remitente: "vendedor" | "comprador") => void;
  contratos: ExpedienteArras[];
  contratoSeleccionado: string;
  seleccionarContrato: (id: string) => void;
}
