import { ChatMovil } from "./ChatMovil";

interface ChatMovilWrapperProps {
  rol: "vendedor" | "comprador";
}

export const ChatMovilWrapper = ({ rol }: ChatMovilWrapperProps) => {
  return (
    <div className="h-full">
      <ChatMovil rolForzado={rol} />
    </div>
  );
};
