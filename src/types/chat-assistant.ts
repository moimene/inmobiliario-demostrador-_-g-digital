export type UserProfile = "comprador" | "vendedor" | "agente" | "abogado" | "general";
export type DepthLevel = "basic" | "intermediate" | "expert";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface ChatSettings {
  userProfile: UserProfile;
  depth: DepthLevel;
}

export interface ProfileConfig {
  value: UserProfile;
  label: string;
  description: string;
}

export interface DepthConfig {
  value: DepthLevel;
  label: string;
  description: string;
}
