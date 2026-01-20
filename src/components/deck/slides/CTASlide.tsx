import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { GDigitalLogo } from '../GDigitalLogo';
import { ElectricButton } from '../ElectricButton';
import { useDeck } from '@/contexts/DeckContext';

export const CTASlide: React.FC = () => {
  const { config } = useDeck();

  return (
    <Slide className="relative overflow-hidden">
      {/* Animated glow background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-[600px] h-[600px] bg-gdigital-green/20 rounded-full blur-[150px]"
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <GDigitalLogo size="md" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
        >
          Confianza, cumplimiento y tecnología
          <br />
          <span className="text-gdigital-green">en un solo entorno</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="font-body text-xl text-white/70 mb-12"
        >
          Firma digital cualificada. Custodia electrónica con garantías.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ElectricButton size="lg">
            {config.cta_text}
          </ElectricButton>
          <ElectricButton size="lg" variant="secondary">
            Más información
          </ElectricButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-16 font-body text-sm text-white/40"
        >
          El operador tecnológico del Grupo Garrigues
        </motion.p>
      </div>
    </Slide>
  );
};
