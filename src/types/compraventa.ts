export type FaseCompraventa = 
  | "apertura_expediente_compraventa"
  | "identificacion_partes_compraventa"
  | "identificacion_inmueble_compraventa"
  | "financiacion_bancaria"
  | "due_diligence_completa"
  | "configuracion_modalidad_cierre"
  // Ruta A (Directa)
  | "firma_contrato_compraventa_directa"
  | "escrituracion_notarial_directa"
  // Ruta B (Escalonada)
  | "firma_documento_privado"
  | "pago_parcial_documento_privado"
  | "elevacion_a_escritura_publica"
  // Común
  | "entrega_llaves"
  | "cierre_expediente_compraventa";

export type ModalidadCierre = "directa" | "escalonada";

export interface ParteCompraventa {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  direccion?: string;
  tipo: "vendedor" | "comprador" | "notaria" | "banco";
  iban?: string;
}

export interface InmuebleCompraventa {
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

export interface DatosContratoCompraventa {
  precioVenta: number;
  modalidadPago: "contado" | "hipoteca";
  bancoFinanciador?: string;
  importeHipoteca?: number;
  
  // Modalidad de cierre seleccionada
  modalidadCierre?: ModalidadCierre;
  
  // Ruta Directa
  fechaEscrituraDirecta?: string;
  notariaSeleccionadaDirecta?: string;
  
  // Ruta Escalonada
  montoParcialDocumentoPrivado?: number;
  porcentajeParcial?: number;
  fechaDocumentoPrivado?: string;
  fechaLimiteElevacion?: string;
  fechaEscrituraDefinitiva?: string;
  notariaSeleccionadaEscalonada?: string;
}

export interface AdjuntoCompraventa {
  tipo: "foto" | "pdf" | "documento";
  url: string;
  nombre: string;
  hash: string;
}

export interface MensajeCompraventa {
  id: string;
  tipo: "usuario" | "sistema" | "bot";
  remitente: "vendedor" | "comprador" | "sistema" | "bot" | "certy";
  texto: string;
  timestamp: string;
  certificado: boolean;
  hash?: string;
  adjuntos?: AdjuntoCompraventa[];
  leido?: boolean;
  requiereConfirmacion?: boolean;
  confirmadoPor?: ("vendedor" | "comprador")[];
}

export interface EventoTimelineCompraventa {
  id: string;
  tipo: string;
  fecha: string;
  mensaje: string;
  icono?: string;
}

export interface ExpedienteCompraventa {
  id: string;
  inmueble: InmuebleCompraventa;
  partes: {
    vendedor: ParteCompraventa;
    comprador: ParteCompraventa;
    notaria?: ParteCompraventa;
    banco?: ParteCompraventa;
  };
  contrato: DatosContratoCompraventa;
  fase: FaseCompraventa;
  mensajes: MensajeCompraventa[];
  eventos: EventoTimelineCompraventa[];
  fechaCreacion: string;
  estado: "pendiente" | "activo" | "finalizado";
}

export interface CompraventaState {
  expediente: ExpedienteCompraventa;
  vistaActual: "consola" | "movil" | "dual";
  usuarioActual: "operador" | "vendedor" | "comprador";
}

export interface CompraventaContextType extends CompraventaState {
  cambiarVista: (vista: "consola" | "movil" | "dual") => void;
  cambiarUsuario: (usuario: "operador" | "vendedor" | "comprador") => void;
  cambiarFase: (fase: FaseCompraventa) => void;
  enviarMensaje: (mensaje: Omit<MensajeCompraventa, "id" | "timestamp" | "certificado" | "hash" | "leido">) => void;
  actualizarExpediente: (expediente: Partial<ExpedienteCompraventa>) => void;
  marcarComoLeido: (mensajeId: string) => void;
  confirmarMensaje: (mensajeId: string, remitente: "vendedor" | "comprador") => void;
  contratos: ExpedienteCompraventa[];
  contratoSeleccionado: string;
  seleccionarContrato: (id: string) => void;
}
