import React from 'react';
import { motion } from 'framer-motion';

interface GDigitalLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const GDigitalLogo: React.FC<GDigitalLogoProps> = ({
  size = 'md',
  animated = true,
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  const Logo = (
    <div className={`font-heading font-bold ${sizeClasses[size]} flex items-center gap-2`}>
      <span className="text-gdigital-green">g</span>
      <span className="text-white">-</span>
      <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
        digital
      </span>
    </div>
  );

  if (!animated) return Logo;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {Logo}
    </motion.div>
  );
};
