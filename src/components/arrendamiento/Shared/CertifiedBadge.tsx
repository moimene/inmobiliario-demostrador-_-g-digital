import { Shield } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import eidasLogo from "@/assets/eidas-logo.png";

interface CertifiedBadgeProps {
  hash: string;
  timestamp?: string;
  compact?: boolean;
  showEidasLogo?: boolean;
}

export const CertifiedBadge = ({ hash, timestamp, compact = false, showEidasLogo = false }: CertifiedBadgeProps) => {
  const formatTimestamp = (ts: string) => {
    const date = new Date(ts);
    return date.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (compact) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-900/20 border border-blue-700/30 rounded text-xs">
              {showEidasLogo ? (
                <img src={eidasLogo} alt="eIDAS" className="h-3.5 w-3.5 rounded-full" />
              ) : (
                <Shield className="h-3 w-3 text-blue-400" />
              )}
              <span className="text-blue-300 font-mono">{hash.slice(0, 6)}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-xs space-y-1">
              <p className="font-semibold">Certificado EAD Trust</p>
              <p className="font-mono text-muted-foreground">Hash: {hash}</p>
              {timestamp && <p>{formatTimestamp(timestamp)}</p>}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="inline-flex flex-col gap-0.5 px-3 py-1.5 bg-blue-900/20 border border-blue-700/30 rounded-md">
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4 text-blue-400" />
        <span className="text-xs font-medium text-blue-300">Certificado EAD Trust</span>
      </div>
      <span className="text-[10px] font-mono text-blue-400/70">Hash: {hash}</span>
      {timestamp && (
        <span className="text-[10px] text-blue-300/60">{formatTimestamp(timestamp)}</span>
      )}
    </div>
  );
};
