import { Expediente, Parte, Vivienda, DatosContrato, InventarioItem, Mensaje, EventoTimeline } from "@/types/arrendamiento";

export const arrendador: Parte = {
  nombre: "Carlos Rodríguez Martín",
  nif: "07894521K",
  telefono: "+34 622 114 908",
  email: "carlos.rodriguez@ejemplo.com",
  direccion: "Torres de Colón 2, 28023 Madrid",
  tipo: "arrendador",
  iban: "ES12 0049 1500 72 2910395871",
};

export const arrendatario: Parte = {
  nombre: "Ana Méndez López",
  nif: "52411456L",
  telefono: "+34 691 002 887",
  email: "ana.mendez@ejemplo.com",
  direccion: "C/ Zurita 12, 3ºB, 28012 Madrid",
  tipo: "arrendatario",
  profesion: "Analista de datos",
  empresa: "DataWorks Consultoría S.L.",
  nomina: 2350,
};

export const agencia: Parte = {
  nombre: "Habitax Gestión Inmobiliaria",
  nif: "B82155667",
  telefono: "+34 911 445 908",
  email: "mgs@habitax.es",
  tipo: "agencia",
};

export const vivienda: Vivienda = {
  direccion: "C/ Alcalá 455, 4ºA, 28027 Madrid",
  tipo: "Piso exterior",
  superficie: 82,
  habitaciones: 2,
  banos: 1,
  comunidadAutonoma: "madrid", // Para requisitos de depósito IVIMA
  caracteristicas: {
    cocina: "Independiente",
    terraza: "6 m²",
    garaje: "1 plaza incluida",
    trastero: "No",
    anoConstructor: 2008,
    certificadoEnergetico: "Clase C",
  },
  datosRegistrales: {
    fincaRegistral: "18.225",
    tomo: "912",
    libro: "214",
    folio: "88",
    registroPropiedad: "Madrid nº 23",
  },
};

export const datosContrato: DatosContrato = {
  rentaMensual: 1250,
  deposito: 1250,
  fechaInicio: "2026-01-15",
  fechaFin: "2027-01-14",
  duracion: 12,
  diaPago: 1,
  politicas: {
    subarriendo: "No permitido",
    extension: "Opción de ampliar 6 meses",
    mantenimiento: "Menores < 150€ → Arrendatari@, Mayores → Arrendador@",
    incidencias: "Respuesta en 24-48 horas",
  },
  tieneClausulaRecuperacionNecesidad: true, // Art. 9.3 LAU expresamente pactada
};

export const inventarioMock: InventarioItem[] = [
  {
    id: "inv-salon-1",
    estancia: "Salón",
    descripcion: "Sofá 3 plazas gris",
    estado: "bien",
    fotos: [
      {
        id: "foto-1",
        url: "/placeholder.svg",
        hash: "9ae87c65e4fa53f2b109e2d3a13ac99e",
        timestamp: "2026-01-10T17:45:22Z",
        certificado: true,
      },
    ],
  },
  {
    id: "inv-salon-2",
    estancia: "Salón",
    descripcion: "TV Samsung 55\"",
    estado: "bien",
    fotos: [
      {
        id: "foto-2",
        url: "/placeholder.svg",
        hash: "9ae87c65e4fa53f2b109e2d3a13ac99e",
        timestamp: "2026-01-10T17:45:22Z",
        certificado: true,
      },
    ],
  },
  {
    id: "inv-cocina-1",
    estancia: "Cocina",
    descripcion: "Frigorífico Balay",
    estado: "bien",
    fotos: [
      {
        id: "foto-3",
        url: "/placeholder.svg",
        hash: "ff72bb118aa532aa09bb776d11fc7998",
        timestamp: "2026-01-10T17:45:53Z",
        certificado: true,
      },
    ],
  },
  {
    id: "inv-cocina-2",
    estancia: "Cocina",
    descripcion: "Vitrocerámica 3 fuegos",
    estado: "bien",
    fotos: [
      {
        id: "foto-4",
        url: "/placeholder.svg",
        hash: "ff72bb118aa532aa09bb776d11fc7998",
        timestamp: "2026-01-10T17:45:53Z",
        certificado: true,
      },
    ],
  },
  {
    id: "inv-dormitorio-1",
    estancia: "Dormitorio Principal",
    descripcion: "Cama 150 cm con colchón",
    estado: "bien",
    fotos: [
      {
        id: "foto-5",
        url: "/placeholder.svg",
        hash: "d88a9d2a24488de010bb5389be6e31a4",
        timestamp: "2026-01-10T17:46:12Z",
        certificado: true,
      },
    ],
  },
  {
    id: "inv-dormitorio-2",
    estancia: "Dormitorio Principal",
    descripcion: "Armario empotrado 3 puertas",
    estado: "bien",
    fotos: [],
  },
  {
    id: "inv-bano-1",
    estancia: "Baño",
    descripcion: "Plato de ducha con mampara",
    estado: "bien",
    fotos: [
      {
        id: "foto-6",
        url: "/placeholder.svg",
        hash: "1499aa87dbca1140e9c455fe9d3e67f1",
        timestamp: "2026-01-10T17:46:45Z",
        certificado: true,
      },
    ],
  },
];

export const mensajesMock: Mensaje[] = [
  {
    id: "msg-1",
    tipo: "bot",
    remitente: "bot",
    texto:
      "📋 APERTURA DEL EXPEDIENTE\n\nBienvenidos al Canal de Arrendamiento Certificado FaciliteCasas.\n\nSe ha creado un nuevo expediente para gestionar el proceso de arrendamiento.",
    timestamp: "2025-12-20T10:00:00Z",
    certificado: true,
    hash: "a1b2c3d4e5f6",
    leido: true,
  },
  {
    id: "msg-2",
    tipo: "bot",
    remitente: "bot",
    texto:
      "Para continuar, cada parte debe confirmar que entiende el funcionamiento del canal certificado y el proceso que se va a seguir.\n\n🔵 Arrendador@: Confirme que entiende el proceso y desea continuar.\n\n🟢 Arrendatari@: Confirme que entiende el proceso y desea continuar.\n\nUna vez ambas partes confirmen, avanzaremos a la identificación detallada de las partes.",
    timestamp: "2025-12-20T10:00:30Z",
    certificado: true,
    hash: "b2c3d4e5f6a7",
    leido: true,
    requiereConfirmacion: true,
    confirmadoPor: [],
  },
];

export const eventosMock: EventoTimeline[] = [
  {
    id: "ev-1",
    tipo: "contrato_creado",
    fecha: "2025-12-20T10:22:00Z",
    mensaje: "Contrato creado",
    icono: "FileText",
  },
  {
    id: "ev-2",
    tipo: "firma_arrendador",
    fecha: "2026-01-05T19:14:00Z",
    mensaje: "Firma del arrendador@",
    icono: "CheckCircle",
  },
  {
    id: "ev-3",
    tipo: "firma_arrendatario",
    fecha: "2026-01-05T19:28:00Z",
    mensaje: "Firma del arrendatari@",
    icono: "CheckCircle",
  },
  {
    id: "ev-4",
    tipo: "inventario_aceptado",
    fecha: "2026-01-10T18:05:00Z",
    mensaje: "Inventario verificado",
    icono: "ClipboardCheck",
  },
  {
    id: "ev-5",
    tipo: "move_in",
    fecha: "2026-01-15T12:45:00Z",
    mensaje: "Move-in confirmado",
    icono: "Key",
  },
  {
    id: "ev-6",
    tipo: "pago_recibido",
    fecha: "2026-01-15T12:47:00Z",
    mensaje: "Primer pago recibido",
    icono: "CreditCard",
  },
];

export const expedienteMock: Expediente = {
  id: "EXP-2026-001",
  vivienda,
  partes: {
    arrendador,
    arrendatario,
    agencia,
  },
  contrato: datosContrato,
  fase: "apertura_expediente",
  inventario: inventarioMock,
  mensajes: mensajesMock,
  eventos: eventosMock,
  fechaCreacion: "2025-12-20T10:22:00Z",
  estado: "activo",
};
