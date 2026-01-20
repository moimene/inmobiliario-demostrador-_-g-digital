import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatActions } from "./ChatActions";
import { ChatActionsMenu } from "./ChatActionsMenu";
import { ChatInput } from "./ChatInput";
import { usePhaseNotifications } from "@/hooks/usePhaseNotifications";

interface ChatMovilProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const ChatMovil = ({ rolForzado }: ChatMovilProps) => {
  // Sistema de notificaciones push para alertar acciones requeridas
  usePhaseNotifications({ rolForzado });

  return (
    <div className="h-full flex flex-col bg-background">
      <ChatHeader rolForzado={rolForzado} />
      <ChatMessages rolForzado={rolForzado} />
      <ChatActions rolForzado={rolForzado} />
      <div className="px-4 pb-2">
        <ChatActionsMenu rolForzado={rolForzado} />
      </div>
      <ChatInput rolForzado={rolForzado} />
    </div>
  );
};
