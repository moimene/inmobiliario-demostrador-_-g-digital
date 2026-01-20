import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ElectricButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const ElectricButton: React.FC<ElectricButtonProps> = ({
  children,
  onClick,
  className,
  size = 'md',
  variant = 'primary',
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const variantClasses = {
    primary: 'bg-gdigital-green text-gdigital-navy hover:bg-gdigital-lime',
    secondary: 'bg-transparent border-2 border-gdigital-green text-gdigital-green hover:bg-gdigital-green/10',
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative font-heading font-semibold rounded-lg transition-all duration-300",
        "shadow-[0_0_20px_hsl(145_95%_52%/0.3)] hover:shadow-[0_0_30px_hsl(145_95%_52%/0.5)]",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};
