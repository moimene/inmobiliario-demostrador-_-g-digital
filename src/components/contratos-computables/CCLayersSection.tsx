import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Coins, Brain, Check } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';

const layers = [
  {
    letter: 'A',
    icon: Shield,
    title: 'Confianza Digital',
    subtitle: 'Infraestructura probatoria',
    description: 'Servicios que aportan la base probatoria y de cumplimiento para que el proceso contractual sea defendible ante auditoría o disputa.',
    features: [
      'Firma electrónica (AdES/QES)',
      'Sellado de tiempo cualificado',
      'Custodia y archivo a largo plazo',
      'Notificación certificada',
    ],
    note: 'EAD Factory: plataforma unificada (APIs + módulos) que industrializa los servicios de confianza.',
    color: 'text-gdigital-green',
    bgColor: 'bg-gdigital-green/10',
    borderColor: 'border-gdigital-green/30',
  },
  {
    letter: 'B',
    icon: FileText,
    title: 'CLM',
    subtitle: 'Contrato como proceso',
    description: 'Gestión contractual donde el contrato es un proceso orquestado a lo largo de todo su ciclo de vida.',
    features: [
      'Generación y plantillas',
      'Negociación y versionado',
      'Firma y vinculación',
      'Ejecución, alertas y renovaciones',
    ],
    note: 'El contrato "sabe" su estado y activa acciones automáticas ante eventos.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    letter: 'C',
    icon: Coins,
    title: 'Activos Digitales',
    subtitle: 'Cuando aplica tokenización/DLT',
    description: 'Para ciertos casos de uso se añaden componentes de tokenización y automatización en DLT.',
    features: [
      'Real World Assets (RWA)',
      'Préstamos sindicados',
      'Tokenización regulada',
      'Control jurídico mantenido',
    ],
    note: 'Automatización avanzada sin perder cumplimiento normativo.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    letter: 'D',
    icon: Brain,
    title: 'IA como Copiloto',
    subtitle: 'No como sustituto',
    description: 'La IA acelera análisis, extracción y experiencia de usuario, siempre con supervisión experta.',
    features: [
      'Análisis de cláusulas',
      'Extracción de datos',
      'Ayuda operativa',
      'Control de riesgo',
    ],
    note: 'IA con objetivos concretos: productividad, control y explicabilidad.',
    color: 'text-gdigital-lime',
    bgColor: 'bg-gdigital-lime/10',
    borderColor: 'border-gdigital-lime/30',
  },
];

export const CCLayersSection: React.FC = () => {
  return (
    <section className="py-24 bg-gdigital-navy relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] rounded-full bg-gdigital-green/5 blur-[150px]" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-gdigital-lime/5 blur-[150px]" />

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
            Arquitectura
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Las <span className="font-normal text-gdigital-green">4 Capas</span> de g-digital
          </h2>
          <p className="text-white/60 font-light max-w-3xl mx-auto">
            Los contratos computables requieren varias capas coordinadas. No basta con "firmar digitalmente".
          </p>
        </motion.div>

        {/* Layers grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {layers.map((layer, index) => (
            <GlowCard key={layer.title} delay={0.1 * (index + 1)} hover={false}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-xl ${layer.bgColor} ${layer.borderColor} border`}>
                  <layer.icon className={`h-6 w-6 ${layer.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold ${layer.color} uppercase`}>Capa {layer.letter}</span>
                  </div>
                  <h3 className="text-xl font-normal text-white">{layer.title}</h3>
                  <span className="text-white/40 text-sm">{layer.subtitle}</span>
                </div>
              </div>

              <p className="text-white/60 font-light text-sm mb-4 leading-relaxed">
                {layer.description}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {layer.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${layer.color} flex-shrink-0`} />
                    <span className="text-white/70 text-xs">{feature}</span>
                  </div>
                ))}
              </div>

              <div className={`p-3 rounded-lg ${layer.bgColor} ${layer.borderColor} border`}>
                <p className="text-white/80 text-xs font-light">{layer.note}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};
