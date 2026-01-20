import { Expediente } from "@/types/arrendamiento";
import { expedienteMock } from "./arrendamientoMockData";

// Expediente 2: En fase de firma
const expediente2: Expediente = {
  id: "EXP-2026-002",
  vivienda: {
    direccion: "C/ Serrano 127, 2ºB, 28006 Madrid",
    tipo: "Piso interior",
    superficie: 95,
    habitaciones: 3,
    banos: 2,
    caracteristicas: {
      cocina: "Independiente",
      terraza: "No",
      garaje: "No",
      trastero: "Sí",
      anoConstructor: 2015,
      certificadoEnergetico: "Clase B",
    },
  },
  partes: {
    arrendador: {
      nombre: "María García Fernández",
      nif: "12345678A",
      telefono: "+34 611 223 344",
      email: "maria.garcia@ejemplo.com",
      direccion: "C/ Goya 85, 28009 Madrid",
      tipo: "arrendador",
      iban: "ES98 0049 0001 50 2012345678",
    },
    arrendatario: {
      nombre: "Pedro López Martínez",
      nif: "87654321B",
      telefono: "+34 622 334 455",
      email: "pedro.lopez@ejemplo.com",
      direccion: "C/ Atocha 45, 28012 Madrid",
      tipo: "arrendatario",
      profesion: "Ingeniero de software",
      empresa: "TechCorp S.L.",
      nomina: 3200,
    },
  },
  contrato: {
    rentaMensual: 1850,
    deposito: 1850,
    fechaInicio: "2026-02-01",
    fechaFin: "2027-02-01",
    duracion: 12,
    diaPago: 5,
    politicas: {
      subarriendo: "No permitido",
      extension: "Renovación automática",
      mantenimiento: "Menores < 200€ → Arrendatari@, Mayores → Arrendador@",
      incidencias: "Respuesta en 48 horas",
    },
  },
  fase: "firma_contrato",
  inventario: [],
  mensajes: [
    {
      id: "msg-2-1",
      tipo: "bot",
      remitente: "bot",
      texto: "👋 Bienvenidos al Canal de Arrendamiento Certificado.",
      timestamp: "2026-01-15T10:00:00Z",
      certificado: true,
      hash: "a1b2c3d4e5f6",
    },
    {
      id: "msg-2-2",
      tipo: "sistema",
      remitente: "sistema",
      texto: "📄 Contrato generado y listo para firma",
      timestamp: "2026-01-15T14:30:00Z",
      certificado: true,
      hash: "f6e5d4c3b2a1",
    },
  ],
  eventos: [
    {
      id: "ev-2-1",
      tipo: "inicio",
      fecha: "2026-01-15T10:00:00Z",
      mensaje: "Expediente creado",
    },
    {
      id: "ev-2-2",
      tipo: "fase_change",
      fecha: "2026-01-15T14:30:00Z",
      mensaje: "Fase: Firma de contrato",
    },
  ],
  fechaCreacion: "2026-01-15T10:00:00Z",
  estado: "pendiente",
};

// Expediente 3: En fase de pagos
const expediente3: Expediente = {
  id: "EXP-2026-003",
  vivienda: {
    direccion: "Av. América 88, 1ºC, 28002 Madrid",
    tipo: "Ático",
    superficie: 110,
    habitaciones: 3,
    banos: 2,
    caracteristicas: {
      cocina: "Americana",
      terraza: "15 m²",
      garaje: "2 plazas incluidas",
      trastero: "Sí",
      anoConstructor: 2018,
      certificadoEnergetico: "Clase A",
    },
  },
  partes: {
    arrendador: {
      nombre: "Luis Martínez Sánchez",
      nif: "11223344C",
      telefono: "+34 633 445 566",
      email: "luis.martinez@ejemplo.com",
      direccion: "C/ Bravo Murillo 200, 28020 Madrid",
      tipo: "arrendador",
      iban: "ES76 2100 0418 45 0200051332",
    },
    arrendatario: {
      nombre: "Carmen Ruiz Torres",
      nif: "44332211D",
      telefono: "+34 644 556 677",
      email: "carmen.ruiz@ejemplo.com",
      direccion: "C/ Princesa 12, 28008 Madrid",
      tipo: "arrendatario",
      profesion: "Médico",
      empresa: "Hospital La Paz",
      nomina: 4500,
    },
  },
  contrato: {
    rentaMensual: 2100,
    deposito: 2100,
    fechaInicio: "2026-02-15",
    fechaFin: "2028-02-14",
    duracion: 24,
    diaPago: 10,
    politicas: {
      subarriendo: "No permitido",
      extension: "Opción de ampliar 12 meses",
      mantenimiento: "Menores < 250€ → Arrendatari@, Mayores → Arrendador@",
      incidencias: "Respuesta en 24 horas",
    },
  },
  fase: "pagos_iniciales",
  inventario: [],
  mensajes: [
    {
      id: "msg-3-1",
      tipo: "bot",
      remitente: "bot",
      texto: "✅ Contrato firmado por ambas partes.",
      timestamp: "2026-01-12T11:00:00Z",
      certificado: true,
      hash: "9876543210ab",
    },
    {
      id: "msg-3-2",
      tipo: "bot",
      remitente: "bot",
      texto: "💰 Por favor, subir justificantes de fianza y primera renta.",
      timestamp: "2026-01-12T11:01:00Z",
      certificado: true,
      hash: "ba0123456789",
    },
  ],
  eventos: [
    {
      id: "ev-3-1",
      tipo: "inicio",
      fecha: "2026-01-12T10:00:00Z",
      mensaje: "Expediente creado",
    },
    {
      id: "ev-3-2",
      tipo: "fase_change",
      fecha: "2026-01-12T11:00:00Z",
      mensaje: "Fase: Pago de fianza y renta",
    },
  ],
  fechaCreacion: "2026-01-12T10:00:00Z",
  estado: "pendiente",
};

// Expediente 4: Finalizado
const expediente4: Expediente = {
  id: "EXP-2025-004",
  vivienda: {
    direccion: "C/ Velázquez 201, 6ºA, 28002 Madrid",
    tipo: "Piso exterior",
    superficie: 120,
    habitaciones: 4,
    banos: 2,
    caracteristicas: {
      cocina: "Office",
      terraza: "No",
      garaje: "1 plaza incluida",
      trastero: "No",
      anoConstructor: 2010,
      certificadoEnergetico: "Clase D",
    },
  },
  partes: {
    arrendador: {
      nombre: "Isabel Torres Gómez",
      nif: "55667788E",
      telefono: "+34 655 667 788",
      email: "isabel.torres@ejemplo.com",
      direccion: "C/ Castellana 150, 28046 Madrid",
      tipo: "arrendador",
      iban: "ES91 2100 5731 72 0200067890",
    },
    arrendatario: {
      nombre: "David Sánchez Pérez",
      nif: "88776655F",
      telefono: "+34 666 778 899",
      email: "david.sanchez@ejemplo.com",
      direccion: "C/ Bailén 22, 28005 Madrid",
      tipo: "arrendatario",
      profesion: "Arquitecto",
      empresa: "Estudio DS",
      nomina: 3800,
    },
  },
  contrato: {
    rentaMensual: 2200,
    deposito: 2200,
    fechaInicio: "2025-01-01",
    fechaFin: "2026-01-01",
    duracion: 12,
    diaPago: 1,
    politicas: {
      subarriendo: "No permitido",
      extension: "No renovado",
      mantenimiento: "Menores < 200€ → Arrendatari@, Mayores → Arrendador@",
      incidencias: "Respuesta en 48 horas",
    },
  },
  fase: "cierre",
  inventario: [],
  mensajes: [
    {
      id: "msg-4-1",
      tipo: "sistema",
      remitente: "sistema",
      texto: "🏁 Contrato finalizado. Expediente cerrado.",
      timestamp: "2026-01-01T00:00:00Z",
      certificado: true,
      hash: "final1234567",
    },
  ],
  eventos: [
    {
      id: "ev-4-1",
      tipo: "inicio",
      fecha: "2025-01-01T10:00:00Z",
      mensaje: "Expediente creado",
    },
    {
      id: "ev-4-2",
      tipo: "cierre",
      fecha: "2026-01-01T00:00:00Z",
      mensaje: "Contrato finalizado",
    },
  ],
  fechaCreacion: "2025-01-01T10:00:00Z",
  estado: "finalizado",
};

// Expediente 5: En identificación
const expediente5: Expediente = {
  id: "EXP-2026-005",
  vivienda: {
    direccion: "C/ Goya 75, 3ºD, 28001 Madrid",
    tipo: "Estudio",
    superficie: 45,
    habitaciones: 1,
    banos: 1,
    caracteristicas: {
      cocina: "Americana",
      terraza: "No",
      garaje: "No",
      trastero: "No",
      anoConstructor: 2020,
      certificadoEnergetico: "Clase B",
    },
  },
  partes: {
    arrendador: {
      nombre: "Antonio Díaz Moreno",
      nif: "99887766G",
      telefono: "+34 677 889 900",
      email: "antonio.diaz@ejemplo.com",
      direccion: "C/ Alcántara 88, 28006 Madrid",
      tipo: "arrendador",
      iban: "ES45 0128 0018 45 0100012345",
    },
    arrendatario: {
      nombre: "Laura Fernández Castro",
      nif: "66778899H",
      telefono: "+34 688 990 011",
      email: "laura.fernandez@ejemplo.com",
      direccion: "C/ Fuencarral 45, 28004 Madrid",
      tipo: "arrendatario",
      profesion: "Diseñadora gráfica",
      empresa: "Freelance",
      nomina: 1800,
    },
  },
  contrato: {
    rentaMensual: 950,
    deposito: 950,
    fechaInicio: "2026-03-01",
    fechaFin: "2027-03-01",
    duracion: 12,
    diaPago: 1,
    politicas: {
      subarriendo: "No permitido",
      extension: "Opción de renovar",
      mantenimiento: "Menores < 100€ → Arrendatari@, Mayores → Arrendador@",
      incidencias: "Respuesta en 72 horas",
    },
  },
  fase: "identificacion_partes",
  inventario: [],
  mensajes: [
    {
      id: "msg-5-1",
      tipo: "bot",
      remitente: "bot",
      texto: "👋 Bienvenidos al Canal de Arrendamiento Certificado.",
      timestamp: "2026-01-18T09:00:00Z",
      certificado: true,
      hash: "start9876543",
      requiereConfirmacion: true,
    },
  ],
  eventos: [
    {
      id: "ev-5-1",
      tipo: "inicio",
      fecha: "2026-01-18T09:00:00Z",
      mensaje: "Expediente creado",
    },
  ],
  fechaCreacion: "2026-01-18T09:00:00Z",
  estado: "pendiente",
};

export const contratosMock: Expediente[] = [
  expedienteMock,  // EXP-2026-001 (activo - canal_activo)
  expediente2,     // EXP-2026-002 (en firma)
  expediente3,     // EXP-2026-003 (en pagos)
  expediente4,     // EXP-2025-004 (finalizado)
  expediente5,     // EXP-2026-005 (identificación)
];
