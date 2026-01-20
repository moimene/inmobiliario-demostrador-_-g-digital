import { ExpedienteCompraventa } from "@/types/compraventa";

export const expedienteCompraventaMock: ExpedienteCompraventa = {
  id: "CV-2025-001",
  fechaCreacion: "2025-01-15T10:00:00Z",
  estado: "activo",
  fase: "apertura_expediente_compraventa",
  
  inmueble: {
    direccion: "Calle Gran Vía 45, 3°B, 28013 Madrid",
    tipo: "Piso",
    superficie: 95,
    habitaciones: 3,
    banos: 2,
    caracteristicas: {
      ascensor: true,
      terraza: true,
      garaje: true,
      trastero: true,
      orientacion: "Sur",
      estadoConservacion: "Bueno",
      anosConstruccion: 15,
    },
    datosRegistrales: {
      fincaRegistral: "12345",
      tomo: "2890",
      libro: "456",
      folio: "123",
      registroPropiedad: "Madrid nº 1",
    },
  },

  partes: {
    vendedor: {
      nombre: "María González Pérez",
      nif: "12345678A",
      telefono: "+34 600 111 222",
      email: "maria.gonzalez@email.com",
      direccion: "Calle Serrano 88, 28006 Madrid",
      tipo: "vendedor",
      iban: "ES91 2100 0418 4502 0005 1332",
    },
    comprador: {
      nombre: "Juan Martínez López",
      nif: "87654321B",
      telefono: "+34 600 333 444",
      email: "juan.martinez@email.com",
      direccion: "Avenida América 12, 28002 Madrid",
      tipo: "comprador",
    },
  },

  contrato: {
    precioVenta: 385000,
    modalidadPago: "hipoteca",
    bancoFinanciador: "Banco Santander",
    importeHipoteca: 300000,
  },

  mensajes: [
    {
      id: "msg-001",
      tipo: "bot",
      remitente: "certy",
      texto: "¡Bienvenidos al Canal de Compraventa Directa Certificado! 🏠\n\nSoy Certy, vuestro asistente de Contract Lifecycle Management (CLM) y Prestador Cualificado de Servicios de Confianza bajo eIDAS.\n\nEste canal gestionará la compraventa desde la identificación de las partes hasta la entrega de llaves, con certificación completa de todos los pasos.\n\n¿Ambas partes confirman su intención de iniciar este proceso de compraventa certificado?",
      timestamp: "2025-01-15T10:00:00Z",
      certificado: true,
      hash: "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
      leido: true,
    },
  ],

  eventos: [
    {
      id: "evt-001",
      tipo: "apertura",
      fecha: "2025-01-15T10:00:00Z",
      mensaje: "Expediente de compraventa abierto",
      icono: "FileText",
    },
  ],
};
