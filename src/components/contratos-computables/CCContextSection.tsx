import React from 'react';
import { motion } from 'framer-motion';
import { Globe, AlertTriangle } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';

export const CCContextSection: React.FC = () => {
  return (
    <section className="py-24 bg-gdigital-navy relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-gdigital-teal/5 blur-[150px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gdigital-green text-sm font-medium tracking-wider uppercase mb-4 block">
            El Punto de Partida
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            La <span className="font-normal text-gdigital-green">Condición Digital</span> de las Relaciones Jurídicas
          </h2>
        </motion.div>

        {/* Two cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Digital native relationships */}
          <GlowCard delay={0.1}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-gdigital-green/10 border border-gdigital-green/20">
                <Globe className="h-6 w-6 text-gdigital-green" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-normal text-white mb-3">
                  Relaciones que Nacen Digitales
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  Gran parte de las relaciones jurídico-económicas ya <span className="text-white">nacen, viven y se prueban 
                  en entornos digitales</span>: plataformas, canales, logs, APIs. No en papel. 
                  Esto obliga a replantear cómo se diseña la seguridad jurídica cuando el 
                  "medio natural" de la relación es la plataforma.
                </p>
              </div>
            </div>
          </GlowCard>

          {/* Card 2: The gap */}
          <GlowCard delay={0.2}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <AlertTriangle className="h-6 w-6 text-amber-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-normal text-white mb-3">
                  La Brecha del Derecho Clásico
                </h3>
                <p className="text-white/60 font-light leading-relaxed">
                  El Derecho clásico —procesos, formalismos y prueba pensados para papel y ejecución 
                  manual— muestra una <span className="text-amber-400">brecha creciente</span> frente a la economía digital: 
                  lentitud, ambigüedad y fricción operativa. La respuesta no es "digitalizar papeles", 
                  sino <span className="text-white">diseñar relaciones jurídicas digitales de extremo a extremo</span>.
                </p>
              </div>
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
};
