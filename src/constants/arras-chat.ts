import { ProfileConfig, DepthConfig } from "@/types/chat-assistant";

export const WELCOME_MESSAGE = `¡Bienvenido al **Asistente Legal de Arras**! 🏠⚖️

Soy tu experto en contratos de arras y compraventa inmobiliaria. Puedo ayudarte con:

- **Tipos de arras**: Penitenciales, confirmatorias y penales
- **Consecuencias legales**: Qué pasa si comprador o vendedor desiste
- **Documentación**: Qué documentos necesitas para el expediente
- **Proceso de firma**: Cómo funciona la firma electrónica eIDAS
- **Uso del sistema**: Cómo utilizar GDigital para tu operación

¿En qué puedo ayudarte hoy?`;

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
    description: "Máximo detalle técnico y legal",
  },
];

export const SUGGESTED_QUESTIONS: string[] = [
  "¿Qué son las arras penitenciales?",
  "¿Qué pasa si el comprador no puede conseguir la hipoteca?",
  "¿Cuánto se suele dar de arras?",
  "¿Qué documentos necesito para vender mi piso?",
  "¿Cómo funciona la firma electrónica en GDigital?",
  "¿Puedo recuperar las arras si el vendedor incumple?",
];

export const STORAGE_KEYS = {
  settings: "arras-chat-settings",
  messages: "arras-chat-messages",
  onboardingCompleted: "arras-chat-onboarding-completed",
};
