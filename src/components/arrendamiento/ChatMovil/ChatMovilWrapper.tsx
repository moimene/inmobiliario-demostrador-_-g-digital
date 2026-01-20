import { ChatMovil } from "./ChatMovil";

interface ChatMovilWrapperProps {
  rol: "arrendador" | "arrendatario";
}

export const ChatMovilWrapper = ({ rol }: ChatMovilWrapperProps) => {
  return (
    <div className="h-full">
      <ChatMovil rolForzado={rol} />
    </div>
  );
};
