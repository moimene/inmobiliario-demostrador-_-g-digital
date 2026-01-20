import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Globe2, Coins, Bot } from 'lucide-react';

const visionItems = [
  {
    icon: Activity,
    year: '2025',
    title: 'Contratos "Vivos"',
    description: 'Interactivos, con estados, eventos y evidencias continuas a lo largo de todo su ciclo.',
  },
  {
    icon: Globe2,
    year: '2027',
    title: 'Ecosistema Interoperable',
    description: 'Identidad y servicios de confianza transfronterizos dentro del Mercado Único Digital europeo.',
  },
  {
    icon: Coins,
    year: '2028',
    title: 'Tokenización Extendida',
    description: 'Derechos y activos tokenizados en entornos regulados, con pleno cumplimiento normativo.',
  },
  {
    icon: Bot,
    year: '2030',
    title: 'IA Omnipresente',
    description: 'Asistente de interpretación, cumplimiento y operación del contrato, con control y ética.',
  },
];

export const CCVisionSection: React.FC = () => {
  return (
    <section className="py-24 bg-gdigital-navy relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gdigital-lime/5 blur-[150px]" />

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
            Horizonte
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Visión <span className="font-normal text-gdigital-green">2030</span>
          </h2>
          <p className="text-white/60 font-light max-w-3xl mx-auto">
            Relaciones jurídico-computables: la hoja de ruta hacia el futuro del derecho digital.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gdigital-green/30 to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {visionItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gdigital-green border-4 border-gdigital-navy z-10" />

                {/* Card */}
                <div className="p-6 rounded-xl bg-gdigital-navy/80 border border-gdigital-green/20 backdrop-blur-sm text-center md:mt-16">
                  <div className="inline-flex p-3 rounded-xl bg-gdigital-green/10 border border-gdigital-green/20 mb-4">
                    <item.icon className="h-6 w-6 text-gdigital-green" />
                  </div>
                  <span className="block text-gdigital-lime text-sm font-medium mb-2">{item.year}</span>
                  <h3 className="text-lg font-normal text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 font-light text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
