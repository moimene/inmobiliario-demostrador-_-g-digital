import { motion } from "framer-motion";
import { CheckCircle, Copy, Download, Shield, Clock } from "lucide-react";
import { useState } from "react";
import { ElectricButton } from "@/components/deck/ElectricButton";
import selloEidas from "@/assets/sello_eidas.png";

interface CertificationResultProps {
  hash: string;
  timestamp: string;
  fileName: string;
}

export const CertificationResult = ({
  hash,
  timestamp,
  fileName,
}: CertificationResultProps) => {
  const [copied, setCopied] = useState(false);

  const copyHash = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full p-6 rounded-xl bg-gradient-to-br from-gdigital-green/10 to-gdigital-lime/5 border border-gdigital-green/30"
    >
      {/* Success header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-gdigital-green/20">
          <CheckCircle className="h-6 w-6 text-gdigital-green" />
        </div>
        <div>
          <h3 className="text-lg font-heading font-semibold text-white">
            ¡Documento Certificado!
          </h3>
          <p className="text-sm text-white/60">
            Certificación completada con éxito
          </p>
        </div>
        <img src={selloEidas} alt="Sello eIDAS" className="h-12 ml-auto" />
      </div>

      {/* Document info */}
      <div className="space-y-4 mb-6">
        <div className="p-4 rounded-lg bg-gdigital-navy/60 border border-gdigital-green/20">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Shield className="h-4 w-4" />
            <span>Huella Digital SHA-256</span>
          </div>
          <div className="flex items-center gap-2">
            <code className="flex-1 text-xs text-gdigital-lime font-mono break-all">
              {hash}
            </code>
            <button
              onClick={copyHash}
              className="p-2 rounded hover:bg-white/10 transition-colors"
            >
              {copied ? (
                <CheckCircle className="h-4 w-4 text-gdigital-green" />
              ) : (
                <Copy className="h-4 w-4 text-white/50" />
              )}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gdigital-navy/60 border border-gdigital-green/20">
          <div className="flex items-center gap-2 text-white/50 text-sm mb-1">
            <Clock className="h-4 w-4" />
            <span>Sello de Tiempo Cualificado</span>
          </div>
          <p className="text-white font-mono">{timestamp}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <ElectricButton size="md" className="flex-1 flex items-center justify-center gap-2">
          <Download className="h-4 w-4" />
          Descargar Certificado
        </ElectricButton>
        <ElectricButton
          variant="secondary"
          size="md"
          className="flex-1 flex items-center justify-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Ver Evidencia
        </ElectricButton>
      </div>

      {/* Legal notice */}
      <p className="mt-4 text-xs text-white/40 text-center">
        Este certificado tiene validez legal conforme al Reglamento eIDAS (UE 910/2014) 
        y la Ley 6/2020 de servicios electrónicos de confianza.
      </p>
    </motion.div>
  );
};
