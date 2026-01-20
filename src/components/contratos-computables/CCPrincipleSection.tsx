import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Package, FileSearch } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';

export const CCPrincipleSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#152238] to-gdigital-navy relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] rounded-full bg-gdigital-green/5 blur-[120px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gdigital-lime text-sm font-medium tracking-wider uppercase mb-4 block">
            Principio Operativo
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Tecnología para la <span className="font-normal text-gdigital-green">Regla</span>, 
            no para la <span className="font-normal text-white/60">Excepción</span>
          </h2>
        </motion.div>

        {/* Proportion visualization */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Today */}
          <GlowCard delay={0.1} className="text-center">
            <span className="text-white/40 text-sm uppercase tracking-wider mb-4 block">Hoy</span>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 bg-white/20 rounded" style={{ width: '80%' }} />
              <div className="h-8 bg-gdigital-green/30 rounded" style={{ width: '20%' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/60">80% Manual</span>
              <span className="text-gdigital-green/60">20% Tecnología</span>
            </div>
            <p className="text-white/40 text-xs mt-4">
              La tecnología como "parche" o para supuestos aislados
            </p>
          </GlowCard>

          {/* Vision */}
          <GlowCard delay={0.2} className="text-center ring-2 ring-gdigital-green/20">
            <span className="text-gdigital-green text-sm uppercase tracking-wider mb-4 block">Visión g-digital</span>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-8 bg-gdigital-green/50 rounded" style={{ width: '80%' }} />
              <div className="h-8 bg-white/20 rounded" style={{ width: '20%' }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gdigital-green">80% Automatizado</span>
              <span className="text-white/60">20% Artesanal</span>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Digital por defecto, intervención experta en casos singulares
            </p>
          </GlowCard>
        </div>

        {/* Two implications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-xl font-light text-white mb-2">
            Dos Implicaciones Prácticas
          </h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <GlowCard delay={0.3}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gdigital-lime/10 border border-gdigital-lime/20">
                <Package className="h-6 w-6 text-gdigital-lime" />
              </div>
              <div>
                <h4 className="text-white font-normal mb-2">Productivización del Conocimiento</h4>
                <p className="text-white/60 font-light text-sm">
                  Convertir know-how jurídico en producto/plataforma escalable, no solo servicio.
                </p>
              </div>
            </div>
          </GlowCard>

          <GlowCard delay={0.4}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gdigital-green/10 border border-gdigital-green/20">
                <FileSearch className="h-6 w-6 text-gdigital-green" />
              </div>
              <div>
                <h4 className="text-white font-normal mb-2">Diseño de Evidencias</h4>
                <p className="text-white/60 font-light text-sm">
                  Cada paso relevante genera prueba robusta: quién, qué, cuándo, con qué versión.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};
