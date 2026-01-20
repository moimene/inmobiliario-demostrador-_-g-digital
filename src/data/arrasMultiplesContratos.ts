import { ExpedienteArras } from "@/types/arras";
import { expedienteArrasMock } from "./arrasMockData";

export const contratosArrasMock: ExpedienteArras[] = [
  expedienteArrasMock,
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-002",
    inmueble: {
      ...expedienteArrasMock.inmueble,
      direccion: "Av. América 15, 5ºA, 28002 Madrid",
    },
    fase: "generacion_y_firma_contrato_arras",
    estado: "BORRADOR_GENERADO",
    fechaCreacion: "2026-01-15T09:30:00Z",
  },
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-003",
    inmueble: {
      ...expedienteArrasMock.inmueble,
      direccion: "C/ Velázquez 88, 2ºC, 28001 Madrid",
    },
    fase: "gestion_eventos_pre_notaria",
    estado: "FIRMADO",
    fechaCreacion: "2026-01-10T11:45:00Z",
  },
  {
    ...expedienteArrasMock,
    id: "ARRAS-2026-004",
    inmueble: {
      ...expedienteArrasMock.inmueble,
      direccion: "C/ Goya 42, 4ºD, 28009 Madrid",
    },
    fase: "resultado_formalizacion",
    estado: "TERMINADO",
    fechaCreacion: "2025-12-20T14:20:00Z",
  },
];
