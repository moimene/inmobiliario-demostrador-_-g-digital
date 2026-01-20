import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';

const agendaItems = [
  'Problema y Oportunidad',
  'Arquitectura Legal App Factory',
  'Módulos Principales',
  'Estándares Técnicos',
  'Métricas y Validación',
  'Próximos Pasos',
];

export const AgendaSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-3xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Agenda
        </motion.h2>

        <div className="space-y-4">
          {agendaItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              className="flex items-center gap-6 p-4 rounded-lg bg-gdigital-navy/40 border border-gdigital-green/10 hover:border-gdigital-green/30 transition-colors"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gdigital-green/20 text-gdigital-green font-heading font-bold">
                {index + 1}
              </span>
              <span className="font-body text-lg md:text-xl text-white/90">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
