import { Check, CheckCheck } from "lucide-react";

interface ReadStatusProps {
  leido?: boolean;
}

export const ReadStatus = ({ leido }: ReadStatusProps) => {
  if (leido) {
    return <CheckCheck className="h-3 w-3 text-blue-600" />;
  }
  return <Check className="h-3 w-3 text-slate-400" />;
};
