import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  delay = 0,
  hover = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      whileHover={hover ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        "relative p-6 rounded-xl bg-gdigital-navy/60 border border-gdigital-green/20 backdrop-blur-sm",
        "transition-shadow duration-300",
        hover && "hover:shadow-[0_0_30px_hsl(145_95%_52%/0.2)] hover:border-gdigital-green/40",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
