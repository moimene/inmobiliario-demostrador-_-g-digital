import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  delay?: number;
  onClick?: () => void;
}

export const ServiceCard = ({
  icon: Icon,
  title,
  description,
  badge,
  delay = 0,
  onClick,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      className={cn(
        "relative p-6 rounded-xl bg-gdigital-navy/60 border border-gdigital-green/20 backdrop-blur-sm",
        "transition-all duration-300 cursor-pointer",
        "hover:shadow-[0_0_30px_hsl(145_95%_52%/0.2)] hover:border-gdigital-green/40"
      )}
    >
      {badge && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-gdigital-lime text-gdigital-navy text-xs font-bold rounded-full">
          {badge}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gdigital-green/10 border border-gdigital-green/20">
          <Icon className="h-6 w-6 text-gdigital-green" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gdigital-green/5 to-gdigital-lime/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};
