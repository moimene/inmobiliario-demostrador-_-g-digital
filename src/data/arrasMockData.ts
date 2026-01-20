import {
  ExpedienteArras,
  ParteArras,
  InmuebleArras,
  DatosContratoArras,
  MensajeArras,
  EventoTimelineArras,
  ItemInventario,
  Comunicacion,
  MiembroContrato,
  TipoArras,
} from "@/types/arras";

// ============================================
// PARTES
// ============================================

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

// ============================================
// INMUEBLE
// ============================================

export const inmueble: InmuebleArras = {
  direccion: "C/ Serrano 128, 3ºB, 28006 Madrid",
  tipo: "Piso exterior",
  superficie: 95,
  habitaciones: 3,
  banos: 2,
  referenciaCatastral: "9872023 VK4792C 0001 WX",
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

// ============================================
// CONTRATO
// ============================================

export const datosContrato: DatosContratoArras = {
  precioVenta: 285000,
  cantidadArras: 28500,
  porcentajeArras: 10,
  tipoArras: "PENITENCIALES" as TipoArras,
  tipoDeposito: "notaria",
  notariaSeleccionada: "José María Ruiz Gallardón - Madrid Centro",
  fechaContrato: "2026-02-15",
  plazoEscritura: 60,
  fechaLimiteEscritura: "2026-04-16",
  condiciones: {
    tipoArras: "PENITENCIALES",
    objeto: "VIVIENDA",
    derecho: "COMUN",
    sinHipoteca: true,
    sinArrendatarios: true,
    formaPagoArras: "TRANSFERENCIA",
    retenciones: 0,
    mobiliarioEquipamiento: false,
  },
};

// ============================================
// MIEMBROS DEL CONTRATO
// ============================================

export const miembrosMock: MiembroContrato[] = [
  {
    id: "miembro-1",
    usuarioId: "user-vendedor-1",
    contratoId: "ARRAS-2026-001",
    rol: "VENDEDOR",
    estado: "MIEMBRO_ACTIVO",
    estadoFirma: "PENDIENTE",
    fechaAceptacion: "2026-02-01T10:00:00Z",
  },
  {
    id: "miembro-2",
    usuarioId: "user-comprador-1",
    contratoId: "ARRAS-2026-001",
    rol: "COMPRADOR",
    estado: "MIEMBRO_ACTIVO",
    estadoFirma: "PENDIENTE",
    fechaAceptacion: "2026-02-01T10:15:00Z",
  },
  {
    id: "miembro-3",
    usuarioId: "user-notario-1",
    contratoId: "ARRAS-2026-001",
    rol: "NOTARIO",
    estado: "INVITACION_PENDIENTE",
    estadoFirma: "PENDIENTE",
    fechaInvitacion: "2026-02-01T11:00:00Z",
  },
];

// ============================================
// INVENTARIO DOCUMENTAL
// ============================================

export const inventarioMock: ItemInventario[] = [
  // Bloque Inmueble
  {
    id: "inv-1",
    contratoId: "ARRAS-2026-001",
    tipo: "NOTA_SIMPLE",
    estado: "VALIDADO",
    responsableRol: "VENDEDOR",
    categoria: "inmueble",
    obligatorio: true,
    nombreArchivo: "nota_simple_serrano_128.pdf",
    fechaSubida: "2026-02-02T09:30:00Z",
    validadoPor: "comprador",
    fechaValidacion: "2026-02-02T14:00:00Z",
    metadatos: {
      caducidad: "2026-05-02",
      numeroFinca: "25.887",
    },
  },
  {
    id: "inv-2",
    contratoId: "ARRAS-2026-001",
    tipo: "ESCRITURA_ANTERIOR",
    estado: "VALIDADO",
    responsableRol: "VENDEDOR",
    categoria: "inmueble",
    obligatorio: true,
    nombreArchivo: "escritura_propiedad_2015.pdf",
    fechaSubida: "2026-02-02T09:45:00Z",
    validadoPor: "comprador",
    fechaValidacion: "2026-02-02T14:15:00Z",
  },
  {
    id: "inv-3",
    contratoId: "ARRAS-2026-001",
    tipo: "RECIBO_IBI",
    estado: "SUBIDO",
    responsableRol: "VENDEDOR",
    categoria: "inmueble",
    obligatorio: true,
    nombreArchivo: "ibi_2025.pdf",
    fechaSubida: "2026-02-03T10:00:00Z",
  },
  {
    id: "inv-4",
    contratoId: "ARRAS-2026-001",
    tipo: "CERTIFICADO_COMUNIDAD",
    estado: "PENDIENTE",
    responsableRol: "VENDEDOR",
    categoria: "inmueble",
    obligatorio: true,
  },
  {
    id: "inv-5",
    contratoId: "ARRAS-2026-001",
    tipo: "CEE",
    estado: "VALIDADO",
    responsableRol: "VENDEDOR",
    categoria: "inmueble",
    obligatorio: true,
    nombreArchivo: "certificado_energetico_B.pdf",
    fechaSubida: "2026-02-02T10:00:00Z",
    validadoPor: "comprador",
    fechaValidacion: "2026-02-02T15:00:00Z",
  },
  // Bloque Identidad
  {
    id: "inv-6",
    contratoId: "ARRAS-2026-001",
    tipo: "DNI_NIE_VENDEDOR",
    estado: "VALIDADO",
    responsableRol: "VENDEDOR",
    categoria: "identidad",
    obligatorio: true,
    nombreArchivo: "dni_maria_gonzalez.pdf",
    fechaSubida: "2026-02-01T12:00:00Z",
    validadoPor: "sistema",
    fechaValidacion: "2026-02-01T12:00:00Z",
  },
  {
    id: "inv-7",
    contratoId: "ARRAS-2026-001",
    tipo: "DNI_NIE_COMPRADOR",
    estado: "VALIDADO",
    responsableRol: "COMPRADOR",
    categoria: "identidad",
    obligatorio: true,
    nombreArchivo: "dni_roberto_martinez.pdf",
    fechaSubida: "2026-02-01T12:30:00Z",
    validadoPor: "sistema",
    fechaValidacion: "2026-02-01T12:30:00Z",
  },
  // Bloque Contractual
  {
    id: "inv-8",
    contratoId: "ARRAS-2026-001",
    tipo: "CONTRATO_ARRAS_BORRADOR",
    estado: "VALIDADO",
    responsableRol: "VENDEDOR",
    categoria: "contractual",
    obligatorio: true,
    nombreArchivo: "contrato_arras_borrador_v1.pdf",
    fechaSubida: "2026-02-05T09:00:00Z",
    validadoPor: "ambos",
    fechaValidacion: "2026-02-06T16:00:00Z",
  },
  {
    id: "inv-9",
    contratoId: "ARRAS-2026-001",
    tipo: "CONTRATO_ARRAS_FIRMADO",
    estado: "PENDIENTE",
    responsableRol: "COMPRADOR",
    categoria: "contractual",
    obligatorio: true,
  },
  {
    id: "inv-10",
    contratoId: "ARRAS-2026-001",
    tipo: "JUSTIFICANTE_PAGO_ARRAS",
    estado: "PENDIENTE",
    responsableRol: "COMPRADOR",
    categoria: "contractual",
    obligatorio: true,
  },
  // Bloque Notaría
  {
    id: "inv-11",
    contratoId: "ARRAS-2026-001",
    tipo: "MINUTA_ESCRITURA",
    estado: "PENDIENTE",
    responsableRol: "NOTARIO",
    categoria: "notaria",
    obligatorio: true,
  },
  {
    id: "inv-12",
    contratoId: "ARRAS-2026-001",
    tipo: "ESCRITURA_COMPRAVENTA",
    estado: "PENDIENTE",
    responsableRol: "NOTARIO",
    categoria: "notaria",
    obligatorio: true,
  },
];

// ============================================
// COMUNICACIONES ESTRUCTURADAS
// ============================================

export const comunicacionesMock: Comunicacion[] = [
  {
    id: "com-1",
    contratoId: "ARRAS-2026-001",
    tipo: "MENSAJE_GENERAL",
    remitente: "VENDEDOR",
    destinatarios: ["COMPRADOR"],
    asunto: "Bienvenida al expediente",
    mensaje: "Bienvenido al expediente de arras. He subido la documentación inicial del inmueble. Por favor, revísela y valídela cuando pueda.",
    timestamp: "2026-02-02T10:30:00Z",
    leido: true,
    relevante: true,
    evidencia: {
      hash: "a1b2c3d4e5f6789012345678901234567890abcdef",
      tsa: "TSA-2026-001-001",
      selloId: "sello-qtsp-001",
    },
  },
  {
    id: "com-2",
    contratoId: "ARRAS-2026-001",
    tipo: "ENTREGA_DOCUMENTACION",
    remitente: "VENDEDOR",
    destinatarios: ["COMPRADOR"],
    asunto: "Documentación inmueble subida",
    mensaje: "He subido la nota simple, escritura anterior y certificado energético. El certificado de comunidad lo tendré en los próximos días.",
    timestamp: "2026-02-02T10:35:00Z",
    leido: true,
    relevante: true,
    evidencia: {
      hash: "b2c3d4e5f6789012345678901234567890abcdef01",
      tsa: "TSA-2026-001-002",
      selloId: "sello-qtsp-002",
    },
  },
  {
    id: "com-3",
    contratoId: "ARRAS-2026-001",
    tipo: "ACEPTACION_TERMINOS",
    remitente: "COMPRADOR",
    destinatarios: ["VENDEDOR"],
    asunto: "Documentación revisada",
    mensaje: "He revisado la documentación del inmueble y todo parece correcto. Valido la nota simple y la escritura. Quedo a la espera del certificado de comunidad.",
    timestamp: "2026-02-02T15:00:00Z",
    leido: true,
    relevante: true,
    evidencia: {
      hash: "c3d4e5f6789012345678901234567890abcdef0123",
      tsa: "TSA-2026-001-003",
      selloId: "sello-qtsp-003",
    },
  },
  {
    id: "com-4",
    contratoId: "ARRAS-2026-001",
    tipo: "SOLICITUD_DOCUMENTACION",
    remitente: "COMPRADOR",
    destinatarios: ["VENDEDOR"],
    asunto: "Solicitud certificado comunidad",
    mensaje: "Por favor, necesito el certificado de comunidad de propietarios indicando que está al corriente de pago antes de proceder a la firma del contrato.",
    timestamp: "2026-02-03T09:00:00Z",
    leido: true,
    relevante: true,
    evidencia: {
      hash: "d4e5f6789012345678901234567890abcdef012345",
      tsa: "TSA-2026-001-004",
      selloId: "sello-qtsp-004",
    },
  },
];

// ============================================
// MENSAJES LEGACY (Chat)
// ============================================

export const mensajesMock: MensajeArras[] = [
  {
    id: "msg-arras-1",
    tipo: "bot",
    remitente: "bot",
    texto: `👋 APERTURA DEL EXPEDIENTE DE ARRAS

Bienvenidos al Canal de Arras Certificado g-digital.

Este canal está operado por EAD Trust, prestador cualificado de servicios de confianza electrónica conforme al Reglamento eIDAS (UE 910/2014).

A partir de este momento:
• Todas las comunicaciones relevantes sobre estas arras se realizarán por este canal.
• Cada mensaje y documento quedará asociado a un sello de tiempo cualificado.
• El canal funciona como gestor del ciclo de vida del contrato.

El sistema ha detectado que este contrato cumple los requisitos del **Modo Estándar Observatorio** (modelo Garrigues-ICADE):
✓ Objeto: Vivienda
✓ Derecho: Común
✓ Sin hipoteca pendiente
✓ Sin arrendatarios
✓ Arras: Penitenciales`,
    timestamp: "2026-02-01T10:00:00Z",
    certificado: true,
    hash: "a1b2c3d4e5f6",
    leido: true,
    requiereConfirmacion: false,
    confirmadoPor: [],
  },
  {
    id: "msg-arras-2",
    tipo: "sistema",
    remitente: "sistema",
    texto: "✅ María González Pérez (VENDEDOR) se ha unido al expediente.",
    timestamp: "2026-02-01T10:05:00Z",
    certificado: true,
    hash: "b2c3d4e5f6a7",
    leido: true,
  },
  {
    id: "msg-arras-3",
    tipo: "sistema",
    remitente: "sistema",
    texto: "✅ Roberto Martínez Sánchez (COMPRADOR) se ha unido al expediente.",
    timestamp: "2026-02-01T10:15:00Z",
    certificado: true,
    hash: "c3d4e5f6a7b8",
    leido: true,
  },
  {
    id: "msg-arras-4",
    tipo: "usuario",
    remitente: "vendedor",
    texto: "Buenos días. He subido la documentación del inmueble: nota simple, escritura anterior y certificado energético. El certificado de comunidad lo tendré en los próximos días.",
    timestamp: "2026-02-02T10:35:00Z",
    certificado: true,
    hash: "d4e5f6a7b8c9",
    leido: true,
  },
  {
    id: "msg-arras-5",
    tipo: "usuario",
    remitente: "comprador",
    texto: "Gracias María. He revisado la documentación y todo parece correcto. Valido la nota simple y la escritura. Quedo a la espera del certificado de comunidad para proceder.",
    timestamp: "2026-02-02T15:00:00Z",
    certificado: true,
    hash: "e5f6a7b8c9d0",
    leido: true,
  },
];

// ============================================
// EVENTOS TIMELINE
// ============================================

export const eventosMock: EventoTimelineArras[] = [
  {
    id: "ev-1",
    tipo: "CONTRATO_CREADO",
    fecha: "2026-02-01T10:00:00Z",
    mensaje: "Expediente de arras creado",
    icono: "FileSignature",
    hash: "hash-001",
    actor: "sistema",
  },
  {
    id: "ev-2",
    tipo: "MANDATO_OTORGADO",
    fecha: "2026-02-01T10:05:00Z",
    mensaje: "Vendedor se ha unido al expediente",
    icono: "UserPlus",
    hash: "hash-002",
    actor: "vendedor",
  },
  {
    id: "ev-3",
    tipo: "MANDATO_OTORGADO",
    fecha: "2026-02-01T10:15:00Z",
    mensaje: "Comprador se ha unido al expediente",
    icono: "UserPlus",
    hash: "hash-003",
    actor: "comprador",
  },
  {
    id: "ev-4",
    tipo: "DOCUMENTO_SUBIDO",
    fecha: "2026-02-02T09:30:00Z",
    mensaje: "Nota simple subida por vendedor",
    icono: "FileUp",
    hash: "hash-004",
    actor: "vendedor",
  },
  {
    id: "ev-5",
    tipo: "DOCUMENTO_SUBIDO",
    fecha: "2026-02-02T09:45:00Z",
    mensaje: "Escritura anterior subida por vendedor",
    icono: "FileUp",
    hash: "hash-005",
    actor: "vendedor",
  },
  {
    id: "ev-6",
    tipo: "DOCUMENTO_SUBIDO",
    fecha: "2026-02-02T10:00:00Z",
    mensaje: "Certificado energético subido por vendedor",
    icono: "FileUp",
    hash: "hash-006",
    actor: "vendedor",
  },
  {
    id: "ev-7",
    tipo: "DOCUMENTO_VALIDADO",
    fecha: "2026-02-02T14:00:00Z",
    mensaje: "Nota simple validada por comprador",
    icono: "CheckCircle",
    hash: "hash-007",
    actor: "comprador",
  },
  {
    id: "ev-8",
    tipo: "DOCUMENTO_VALIDADO",
    fecha: "2026-02-02T14:15:00Z",
    mensaje: "Escritura anterior validada por comprador",
    icono: "CheckCircle",
    hash: "hash-008",
    actor: "comprador",
  },
  {
    id: "ev-9",
    tipo: "CAMBIO_ESTADO",
    fecha: "2026-02-05T09:00:00Z",
    mensaje: "Estado cambiado a EN_NEGOCIACION",
    icono: "ArrowRight",
    hash: "hash-009",
    actor: "sistema",
  },
];

// ============================================
// EXPEDIENTE PRINCIPAL
// ============================================

export const expedienteArrasMock: ExpedienteArras = {
  id: "ARRAS-2026-001",
  referencia: "ARR-2026-001-SERRANO128",
  fechaCreacion: "2026-02-01T10:00:00Z",
  
  // Estado Chrono-Flare
  estado: "EN_NEGOCIACION",
  fase: "identificacion_partes_arras", // Legacy
  faseActual: "kyc_partes", // Legacy
  
  // Partes
  partes: {
    vendedor,
    comprador,
  },
  miembros: miembrosMock,
  
  // Inmueble
  inmueble,
  
  // Contrato
  contrato: datosContrato,
  
  // Inventario documental
  inventarioDocumental: inventarioMock,
  
  // Comunicaciones
  comunicaciones: comunicacionesMock,
  
  // Legacy messages
  mensajes: mensajesMock,
  
  // Eventos
  eventos: eventosMock,
  
  // Firmas
  firmas: {
    comprador: { firmado: false },
    vendedor: { firmado: false },
  },
  
  // Notaría
  notaria: {
    nombre: datosContrato.notariaSeleccionada,
  },
  
  // Flags
  bloqueado: false,
  alertas: ["Pendiente: Certificado de comunidad"],
  modoEstandar: true, // Modo Estándar Observatorio
};

// ============================================
// MÚLTIPLES CONTRATOS PARA LISTADO
// ============================================

export const contratosArrasMock: ExpedienteArras[] = [
  expedienteArrasMock,
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-002",
    referencia: "ARR-2026-002-DIAGONAL456",
    estado: "TERMINOS_ESENCIALES_ACEPTADOS",
    fase: "identificacion_inmueble_arras",
    faseActual: "inmueble_dd",
    inmueble: {
      ...inmueble,
      direccion: "Av. Diagonal 456, 5ºA, 08006 Barcelona",
      referenciaCatastral: "8234567 DF3892A 0001 XY",
    },
    partes: {
      vendedor: { ...vendedor, nombre: "Carlos Ruiz López", nif: "52789123K" },
      comprador: { ...comprador, nombre: "Elena Torres Martín", nif: "41852963L" },
    },
    contrato: {
      ...datosContrato,
      precioVenta: 420000,
      cantidadArras: 42000,
    },
    fechaCreacion: "2026-01-28T14:30:00Z",
    inventarioDocumental: inventarioMock.map(item => ({
      ...item,
      contratoId: "ARRAS-2026-002",
      estado: item.estado === "VALIDADO" ? "SUBIDO" : item.estado,
    })),
    comunicaciones: [],
    mensajes: [],
    eventos: eventosMock.slice(0, 3),
    alertas: [],
  },
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-003",
    referencia: "ARR-2026-003-GRANVIA78",
    estado: "BORRADOR_GENERADO",
    fase: "generacion_y_firma_contrato_arras",
    faseActual: "borrador_contrato",
    inmueble: {
      ...inmueble,
      direccion: "C/ Gran Vía 78, 2ºB, 28013 Madrid",
      referenciaCatastral: "7123456 VK4892D 0001 ZZ",
    },
    partes: {
      vendedor: { ...vendedor, nombre: "Ana Fernández García", nif: "63147852Y" },
      comprador: { ...comprador, nombre: "Pedro Jiménez Ruiz", nif: "74258963H" },
    },
    contrato: {
      ...datosContrato,
      precioVenta: 195000,
      cantidadArras: 19500,
    },
    fechaCreacion: "2026-01-20T09:15:00Z",
    inventarioDocumental: inventarioMock.map(item => ({
      ...item,
      contratoId: "ARRAS-2026-003",
      estado: "VALIDADO",
    })),
    comunicaciones: comunicacionesMock,
    mensajes: mensajesMock,
    eventos: eventosMock,
    alertas: [],
    modoEstandar: true,
  },
];
