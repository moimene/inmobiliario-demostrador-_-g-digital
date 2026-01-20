import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/deck/GlowCard';
import { ShieldCheck, Users, Blocks, Award } from 'lucide-react';

const valueProps = [
  {
    icon: ShieldCheck,
    title: 'Seguridad Jurídica y Técnica',
    description: 'Al contar con un QTSP propio (EADTrust) y el respaldo de Garrigues, nuestras soluciones ofrecen presunciones de veracidad y validez probatoria que pocas tecnológicas pueden igualar.',
    highlight: 'QTSP Propio',
  },
  {
    icon: Users,
    title: 'Cliente Cero',
    description: 'Garrigues es el primer usuario de todas las soluciones de g-digital. Probamos, validamos y perfeccionamos cada herramienta en nuestra propia operativa antes de llevarla al mercado.',
    highlight: 'Battle-tested',
  },
  {
    icon: Blocks,
    title: 'Neutralidad y Solidez',
    description: 'Construimos sobre arquitecturas tecnológicas flexibles y estándares abiertos, integrando capacidades avanzadas (Smart Contracts, DLT) con una gobernanza clara.',
    highlight: 'Interoperable',
  },
];

export const ValuePropositionSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gdigital-green/5 to-transparent" />

      {/* Ambient */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gdigital-green/10 rounded-full blur-[150px]" />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-gdigital-lime/30 bg-gdigital-lime/10">
            <Award className="w-4 h-4 text-gdigital-lime" />
            <span className="text-sm text-gdigital-lime font-medium">
              Innovación Pragmática
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            <span className="text-white">Metodología </span>
            <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
              "Garrigues Modo Cero"
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Lo que nos distingue en el mercado es nuestro modelo único de desarrollo e innovación.
          </p>
        </motion.div>

        {/* Value Props Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <GlowCard className="h-full p-8 text-center">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gdigital-green/20 to-gdigital-lime/10 border border-gdigital-green/30 flex items-center justify-center">
                  <prop.icon className="w-8 h-8 text-gdigital-green" />
                </div>

                {/* Badge */}
                <div className="inline-block px-3 py-1 mb-4 rounded-full text-xs font-medium bg-gdigital-green/10 text-gdigital-green border border-gdigital-green/20">
                  {prop.highlight}
                </div>

                {/* Title */}
                <h3 className="text-xl font-heading font-bold text-white mb-4">
                  {prop.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 leading-relaxed">
                  {prop.description}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gdigital-navy/60 border border-gdigital-green/20">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-gdigital-green to-gdigital-lime border-2 border-gdigital-navy"
                />
              ))}
            </div>
            <span className="text-white/80 text-sm">
              Más de <span className="text-gdigital-green font-semibold">50 proyectos</span> entregados con metodología Modo Cero
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
