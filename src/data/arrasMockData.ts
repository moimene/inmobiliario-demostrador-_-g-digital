import { ExpedienteArras, ParteArras, InmuebleArras, DatosContratoArras, MensajeArras, EventoTimelineArras } from "@/types/arras";

export const vendedor: ParteArras = {
  nombre: "María González Pérez",
  nif: "45123789B",
  telefono: "+34 654 887 221",
  email: "maria.gonzalez@ejemplo.com",
  direccion: "Paseo de la Castellana 95, 28046 Madrid",
  tipo: "vendedor",
  iban: "ES89 2100 0418 45 0200051332",
};

export const comprador: ParteArras = {
  nombre: "Roberto Martínez Sánchez",
  nif: "38654712M",
  telefono: "+34 622 334 556",
  email: "roberto.martinez@ejemplo.com",
  direccion: "C/ Bravo Murillo 38, 2ºC, 28015 Madrid",
  tipo: "comprador",
  profesion: "Ingeniero de software",
  empresa: "TechCorp Solutions S.L.",
};

export const inmueble: InmuebleArras = {
  direccion: "C/ Serrano 128, 3ºB, 28006 Madrid",
  tipo: "Piso exterior",
  superficie: 95,
  habitaciones: 3,
  banos: 2,
  caracteristicas: {
    cocina: "Americana integrada",
    terraza: "8 m²",
    garaje: "1 plaza incluida",
    trastero: "Sí, 6 m²",
    anoConstructor: 2015,
    certificadoEnergetico: "Clase B",
    reformado: true,
  },
  datosRegistrales: {
    fincaRegistral: "25.887",
    tomo: "1.245",
    libro: "389",
    folio: "142",
    registroPropiedad: "Madrid nº 7",
  },
};

export const datosContrato: DatosContratoArras = {
  precioVenta: 285000,
  cantidadArras: 28500,
  porcentajeArras: 10,
  tipoDeposito: "notaria",
  notariaSeleccionada: "José María Ruiz Gallardón - Madrid Centro",
  fechaContrato: "2026-02-15",
  plazoEscritura: 60,
  fechaLimiteEscritura: "2026-04-16",
};

export const mensajesMock: MensajeArras[] = [
  {
    id: "msg-arras-1",
    tipo: "bot",
    remitente: "bot",
    texto:
      "👋 APERTURA DEL EXPEDIENTE DE ARRAS\n\nBienvenidos al Canal de Arras Certificado g-digital.\n\nEste canal está operado por EAD Trust, prestador cualificado de servicios de confianza electrónica.\n\nA partir de este momento:\n• Todas las comunicaciones relevantes sobre estas arras se realizarán por este canal.\n• Cada mensaje y documento quedará asociado a un sello de tiempo cualificado y a un expediente certificado.\n• El canal funciona como gestor del ciclo de vida del contrato, y como única fuente de verdad en caso de duda o conflicto.\n\nAntes de continuar, cada parte debe confirmar que entiende cómo funciona el canal y que desea seguir adelante.",
    timestamp: "2026-02-01T10:00:00Z",
    certificado: true,
    hash: "a1b2c3d4e5f6",
    leido: true,
    requiereConfirmacion: false,
    confirmadoPor: [],
  },
];

export const eventosMock: EventoTimelineArras[] = [
  {
    id: "ev-arras-1",
    tipo: "expediente_creado",
    fecha: "2026-02-01T10:00:00Z",
    mensaje: "Expediente de arras creado",
    icono: "FileSignature",
  },
];

export const expedienteArrasMock: ExpedienteArras = {
  id: "ARRAS-2026-001",
  inmueble,
  partes: {
    vendedor,
    comprador,
  },
  contrato: datosContrato,
  fase: "apertura_expediente_arras",
  mensajes: mensajesMock,
  eventos: eventosMock,
  fechaCreacion: "2026-02-01T10:00:00Z",
  estado: "activo",
};

// Multiple contracts for list view
export const contratosArrasMock: ExpedienteArras[] = [
  expedienteArrasMock,
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-002",
    fase: "identificacion_partes_arras",
    inmueble: {
      ...inmueble,
      direccion: "Av. Diagonal 456, 5ºA, 08006 Barcelona",
    },
    partes: {
      vendedor: { ...vendedor, nombre: "Carlos Ruiz López" },
      comprador: { ...comprador, nombre: "Elena Torres Martín" },
    },
    contrato: {
      ...datosContrato,
      precioVenta: 420000,
      cantidadArras: 42000,
    },
    fechaCreacion: "2026-01-28T14:30:00Z",
  },
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-003",
    fase: "generacion_y_firma_contrato_arras",
    inmueble: {
      ...inmueble,
      direccion: "C/ Gran Vía 78, 2ºB, 28013 Madrid",
    },
    partes: {
      vendedor: { ...vendedor, nombre: "Ana Fernández García" },
      comprador: { ...comprador, nombre: "Pedro Jiménez Ruiz" },
    },
    contrato: {
      ...datosContrato,
      precioVenta: 195000,
      cantidadArras: 19500,
    },
    fechaCreacion: "2026-01-20T09:15:00Z",
  },
];
