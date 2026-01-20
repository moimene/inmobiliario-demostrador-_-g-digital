import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDeck } from '@/contexts/DeckContext';
import { cn } from '@/lib/utils';

interface SlideContainerProps {
  children: React.ReactNode[];
}

export const SlideContainer: React.FC<SlideContainerProps> = ({ children }) => {
  const { currentSlide } = useDeck();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gdigital-navy">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: -20 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {children[currentSlide]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface SlideProps {
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export const Slide: React.FC<SlideProps> = ({ children, className, gradient }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col items-center justify-center p-8 md:p-16",
        gradient && "bg-gradient-to-br from-gdigital-dark to-gdigital-navy",
        className
      )}
    >
      {children}
    </div>
  );
};
