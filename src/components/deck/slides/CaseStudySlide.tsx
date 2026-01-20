import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { Quote } from 'lucide-react';

export const CaseStudySlide: React.FC = () => {
  return (
    <Slide gradient>
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Quote className="w-16 h-16 text-gdigital-lime/40 mx-auto" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-heading text-2xl md:text-4xl lg:text-5xl font-medium text-white leading-relaxed mb-12"
        >
          "Más allá de una firma: un entorno de{' '}
          <span className="text-gdigital-green">confianza regulado</span>"
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-gdigital-green/20 flex items-center justify-center">
            <span className="font-heading text-2xl font-bold text-gdigital-green">G</span>
          </div>
          <div>
            <p className="font-heading text-lg font-semibold text-white">Garrigues Digital Factory</p>
            <p className="font-body text-white/60">El operador tecnológico del Grupo Garrigues</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-16 grid grid-cols-3 gap-8"
        >
          {[
            { value: 'eIDAS', label: 'Cumplimiento' },
            { value: '24/7', label: 'Disponibilidad' },
            { value: '100%', label: 'Trazabilidad' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-heading text-3xl md:text-4xl font-bold text-gdigital-lime">{stat.value}</p>
              <p className="font-body text-sm text-white/60 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
};
