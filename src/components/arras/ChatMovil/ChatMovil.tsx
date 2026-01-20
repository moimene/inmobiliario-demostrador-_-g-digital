import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatActions } from "./ChatActions";
import { ChatActionsMenu } from "./ChatActionsMenu";
import { ChatInput } from "./ChatInput";

interface ChatMovilProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatMovil = ({ rolForzado }: ChatMovilProps) => {
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
