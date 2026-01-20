import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ProblemSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Problema vs Oportunidad
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Before */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="p-8 rounded-2xl bg-red-950/30 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <h3 className="font-heading text-2xl font-semibold text-red-400">
                Antes
              </h3>
            </div>
            <ul className="space-y-4 font-body text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✕</span>
                Documentos sin valor probatorio
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✕</span>
                Firmas electrónicas sin garantías eIDAS
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✕</span>
                Evidencias dispersas sin custodia legal
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">✕</span>
                APIs fragmentadas y sin estándares
              </li>
            </ul>
          </motion.div>

          {/* After */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-8 rounded-2xl bg-gdigital-dark/30 border border-gdigital-green/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-gdigital-green" />
              <h3 className="font-heading text-2xl font-semibold text-gdigital-green">
                Después
              </h3>
            </div>
            <ul className="space-y-4 font-body text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-gdigital-green mt-1">✓</span>
                Custodia probatoria cualificada
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gdigital-green mt-1">✓</span>
                Firma digital con validez legal europea
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gdigital-green mt-1">✓</span>
                Expedientes electrónicos con trazabilidad
              </li>
              <li className="flex items-start gap-3">
                <span className="text-gdigital-green mt-1">✓</span>
                API RESTful unificada y documentada
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gdigital-green/10 border border-gdigital-green/30">
            <span className="text-gdigital-lime font-heading font-bold text-2xl">80%</span>
            <span className="font-body text-white/80">menos litigios gracias a custodia cualificada</span>
          </div>
        </motion.div>
      </div>
    </Slide>
  );
};
