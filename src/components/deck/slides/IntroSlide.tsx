import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { GDigitalLogo } from '../GDigitalLogo';
import { ElectricButton } from '../ElectricButton';
import { useDeck } from '@/contexts/DeckContext';

export const IntroSlide: React.FC = () => {
  const { config, nextSlide } = useDeck();

  return (
    <Slide className="relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gdigital-green/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gdigital-lime/10 rounded-full blur-[100px]" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="mb-8"
        >
          <GDigitalLogo size="lg" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-gdigital-green/80 font-body text-sm uppercase tracking-widest mb-4"
        >
          Garrigues Digital Factory
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {config.product_name}
          <br />
          <span className="text-gdigital-green">para {config.client_name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="font-body text-xl md:text-2xl text-white/70 mb-12"
        >
          Tecnología real para contextos críticos
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <ElectricButton size="lg" onClick={nextSlide}>
            {config.cta_text}
          </ElectricButton>
        </motion.div>
      </div>
    </Slide>
  );
};
