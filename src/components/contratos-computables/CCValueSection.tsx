import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Eye, TrendingUp, Sparkles } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';

const values = [
  {
    icon: Zap,
    title: 'Eficiencia Operacional',
    description: 'Menos tiempos muertos, menos trabajo manual, menos errores humanos.',
    metric: '-70%',
    metricLabel: 'Tiempo de gestión',
  },
  {
    icon: ShieldCheck,
    title: 'Reducción de Riesgo',
    description: 'Menos ambigüedad operativa, trazabilidad completa, evidencias consistentes.',
    metric: '100%',
    metricLabel: 'Trazabilidad',
  },
  {
    icon: Eye,
    title: 'Mejor Gobernanza',
    description: 'Auditoría y e-discovery más rápidos; cumplimiento más demostrable.',
    metric: '10x',
    metricLabel: 'Velocidad auditoría',
  },
  {
    icon: TrendingUp,
    title: 'Escalabilidad',
    description: 'Capacidad de ejecutar con garantías grandes volúmenes de contratos estándar.',
    metric: '∞',
    metricLabel: 'Contratos/mes',
  },
  {
    icon: Sparkles,
    title: 'Mejor Experiencia',
    description: 'Contratación y formalización más ágiles y coherentes con el canal digital.',
    metric: 'UX',
    metricLabel: 'Digital-first',
  },
];

export const CCValueSection: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gdigital-navy to-[#152238] relative overflow-hidden">
      {/* Ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gdigital-green/5 blur-[150px]" />

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
            Propuesta de Valor
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Qué <span className="font-normal text-gdigital-green">Aporta</span> al Cliente
          </h2>
          <p className="text-white/60 font-light max-w-3xl mx-auto">
            El salto de "documento" a "proceso computable" genera resultados medibles.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <GlowCard key={value.title} delay={0.1 * (index + 1)}>
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl bg-gdigital-green/10 border border-gdigital-green/20">
                  <value.icon className="h-6 w-6 text-gdigital-green" />
                </div>
                <div className="text-right">
                  <span className="text-2xl font-light text-gdigital-lime">{value.metric}</span>
                  <p className="text-white/40 text-xs">{value.metricLabel}</p>
                </div>
              </div>
              <h3 className="text-lg font-normal text-white mb-2">{value.title}</h3>
              <p className="text-white/60 font-light text-sm leading-relaxed">
                {value.description}
              </p>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
