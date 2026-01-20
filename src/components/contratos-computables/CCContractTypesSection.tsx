import React from 'react';
import { motion } from 'framer-motion';
import { Blocks, FileText, FileCode, Workflow, ArrowRight } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';

const contractTypes = [
  {
    icon: Blocks,
    name: 'Smart Contracts',
    subtitle: 'Blockchain',
    description: 'Automatizan cláusulas concretas en DLT. No equivalen por sí mismos a un "contrato legal completo".',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: FileText,
    name: 'Smart Legal Contracts',
    subtitle: 'Híbridos',
    description: 'Combinan texto legal tradicional con código ejecutable, manteniendo vinculación jurídica.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: FileCode,
    name: 'Contratos Ricardianos',
    subtitle: 'Puente',
    description: 'Conectan lenguaje humano legible con representación estructurada verificable por máquinas.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: Workflow,
    name: 'Contratos Computables',
    subtitle: 'Visión g-digital',
    description: 'El contrato como aplicación/proceso integral. No atado a DLT; puede ejecutarse en infra cloud con capa de confianza.',
    color: 'text-gdigital-green',
    bgColor: 'bg-gdigital-green/10',
    borderColor: 'border-gdigital-green/20',
    highlight: true,
  },
];

const contractStates = [
  { name: 'Negociación', description: 'Versionado y ajustes' },
  { name: 'Aceptación', description: 'Consentimiento formal' },
  { name: 'Firma', description: 'Vinculación legal' },
  { name: 'Ejecución', description: 'Obligaciones activas' },
  { name: 'Eventos', description: 'Pagos, hitos, alertas' },
  { name: 'Terminación', description: 'Cierre y archivo' },
];

export const CCContractTypesSection: React.FC = () => {
  return (
    <section className="py-24 bg-gdigital-navy relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-gdigital-lime/5 blur-[150px]" />

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
            Tipos de Contratos
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Qué es un <span className="font-normal text-gdigital-green">Contrato Computable</span> (y qué no es)
          </h2>
        </motion.div>

        {/* Contract types grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contractTypes.map((type, index) => (
            <GlowCard 
              key={type.name} 
              delay={0.1 * (index + 1)}
              className={type.highlight ? 'ring-2 ring-gdigital-green/30' : ''}
            >
              <div className={`p-3 rounded-xl ${type.bgColor} ${type.borderColor} border w-fit mb-4`}>
                <type.icon className={`h-6 w-6 ${type.color}`} />
              </div>
              <h3 className={`text-lg font-normal ${type.highlight ? 'text-gdigital-green' : 'text-white'} mb-1`}>
                {type.name}
              </h3>
              <span className="text-xs text-white/40 uppercase tracking-wider">{type.subtitle}</span>
              <p className="text-white/60 font-light text-sm leading-relaxed mt-3">
                {type.description}
              </p>
            </GlowCard>
          ))}
        </div>

        {/* Contract as automaton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-light text-white mb-2">
            El Contrato como <span className="text-gdigital-lime font-normal">Autómata</span>
          </h3>
          <p className="text-white/60 font-light max-w-2xl mx-auto">
            Un contrato computable "sabe" en qué estado está y qué acciones corresponden cuando ocurren eventos.
          </p>
        </motion.div>

        {/* States flow */}
        <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4">
          {contractStates.map((state, index) => (
            <React.Fragment key={state.name}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                className="flex flex-col items-center p-4 rounded-xl bg-gdigital-navy/80 border border-gdigital-green/20 min-w-[120px]"
              >
                <span className="text-white font-normal text-sm mb-1">{state.name}</span>
                <span className="text-white/40 text-xs">{state.description}</span>
              </motion.div>
              {index < contractStates.length - 1 && (
                <ArrowRight className="h-5 w-5 text-gdigital-green/50 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
