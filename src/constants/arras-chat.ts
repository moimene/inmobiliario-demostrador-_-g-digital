import { ProfileConfig, DepthConfig } from "@/types/chat-assistant";

export const WELCOME_MESSAGE = `¡Bienvenido al **Asistente de Soporte** del Canal de Arras! 🏠

Estoy aquí para ayudarte con:

- **Uso de la plataforma**: Cómo navegar y usar GDigital
- **Dudas sobre arras**: Tipos, consecuencias y proceso
- **Documentación**: Qué documentos necesitas subir
- **Proceso de firma**: Cómo funciona la firma electrónica
- **Resolución de problemas**: Incidencias técnicas

¿En qué puedo ayudarte?`;

export const PROFILES: ProfileConfig[] = [
  {
    value: "comprador",
    label: "Comprador",
    description: "Estoy comprando una propiedad",
  },
  {
    value: "vendedor",
    label: "Vendedor",
    description: "Estoy vendiendo mi propiedad",
  },
  {
    value: "agente",
    label: "Agente Inmobiliario",
    description: "Gestiono operaciones para clientes",
  },
  {
    value: "abogado",
    label: "Abogado / Asesor",
    description: "Asesoro en operaciones inmobiliarias",
  },
  {
    value: "general",
    label: "Consulta General",
    description: "Solo tengo curiosidad o dudas generales",
  },
];

export const DEPTHS: DepthConfig[] = [
  {
    value: "basic",
    label: "Básico",
    description: "Respuestas simples y directas",
  },
  {
    value: "intermediate",
    label: "Intermedio",
    description: "Balance entre detalle y claridad",
  },
  {
    value: "expert",
    label: "Experto",
    description: "Máximo detalle técnico",
  },
];

export const SUGGESTED_QUESTIONS: string[] = [
  "¿Cómo creo un nuevo expediente de arras?",
  "¿Qué documentos necesito subir?",
  "¿Cómo funciona la firma electrónica?",
  "¿Qué son las arras penitenciales?",
  "¿Cómo contacto con la notaría?",
  "¿Cómo exporto el expediente?",
];

export const STORAGE_KEYS = {
  settings: "arras-chat-settings",
  messages: "arras-chat-messages",
  onboardingCompleted: "arras-chat-onboarding-completed",
};
