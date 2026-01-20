import { Check, CheckCheck } from "lucide-react";

interface ReadStatusProps {
  leido: boolean;
  certificado: boolean;
}

export const ReadStatus = ({ leido, certificado }: ReadStatusProps) => {
  if (leido && certificado) {
    return <CheckCheck className="h-4 w-4 text-blue-400" />;
  }
  
  return <Check className="h-4 w-4 text-gray-400" />;
};
