import { motion } from "framer-motion";
import { Shield, Sparkles } from "lucide-react";

interface CertificationHeroProps {
  title: string;
  subtitle: string;
}

export const CertificationHero = ({ title, subtitle }: CertificationHeroProps) => {
  return (
    <div className="relative text-center py-12 overflow-hidden">
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gdigital-green/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gdigital-lime/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-gdigital-green" />
          <span className="text-gdigital-green text-sm font-medium uppercase tracking-wider">
            Certificación eIDAS
          </span>
          <Sparkles className="h-5 w-5 text-gdigital-lime" />
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
          <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};
