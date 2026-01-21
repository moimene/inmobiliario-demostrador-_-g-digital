import React from 'react';
import { motion } from 'framer-motion';
import { Code, CheckCircle, ShieldCheck, Info } from 'lucide-react';
import { GlowCard } from '@/components/deck/GlowCard';
const pillars = [{
  icon: Code,
  title: 'Lógica Formal',
  description: 'Reglas y cláusulas representadas con lógica formal, datos estructurados y/o código ejecutable.'
}, {
  icon: CheckCircle,
  title: 'Sin Ambigüedad',
  description: 'Reducción de ambigüedades operativas: "¿se cumple o no?" tiene respuesta clara y verificable.'
}, {
  icon: ShieldCheck,
  title: 'Seguridad by Design',
  description: 'La ejecución sigue fielmente lo acordado y queda evidencia técnica trazable desde el origen.'
}];
export const CCDefinitionSection: React.FC = () => {
  return <section className="py-24 bg-gradient-to-b from-gdigital-navy to-[#152238] relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-gdigital-green/5 blur-[120px]" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        {/* Section header */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-16">
          <span className="text-gdigital-lime text-sm font-medium tracking-wider uppercase mb-4 block">
            Definición
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
            Qué entiende <span className="font-normal text-gdigital-green">g-digital</span> por Derecho Computable
          </h2>
          <p className="text-white/60 font-light max-w-3xl mx-auto">
            Traducir normas y contratos a formatos que una computadora pueda interpretar, 
            verificar y ejecutar (total o parcialmente) de forma fiable.
          </p>
        </motion.div>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, index) => <GlowCard key={pillar.title} delay={0.1 * (index + 1)}>
              <div className="text-center">
                <div className="inline-flex p-4 rounded-2xl bg-gdigital-green/10 border border-gdigital-green/20 mb-4">
                  <pillar.icon className="h-8 w-8 text-gdigital-green" />
                </div>
                <h3 className="text-lg font-normal text-white mb-2">{pillar.title}</h3>
                <p className="text-white/60 font-light text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </GlowCard>)}
        </div>

        {/* Important note */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6,
        delay: 0.4
      }} className="flex items-start gap-4 p-6 rounded-xl bg-gdigital-teal/10 border border-gdigital-teal/20 max-w-4xl mx-auto">
          <Info className="h-6 w-6 text-gdigital-teal flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-white font-normal mb-2">Evolución de las relaciones jurídicass </h4>
            <p className="text-white/60 font-light text-sm leading-relaxed">Esto es genuina transformación del desarrollo de los negocios jurídicos, por la integración en tecnología para los casos donde tiene sentido (alto volumen, estandarización, necesidad de trazabilidad), manteniendo coexistencia con el marco clásico y con supervisión jurídica experta.<span className="text-white">es genuina transformación del desarrollo de los negocios jurídicos</span>, 
              sino que lo implementa en tecnología para los casos donde tiene sentido 
              (alto volumen, estandarización, necesidad de trazabilidad), manteniendo 
              coexistencia con el marco clásico y con <span className="text-gdigital-lime">supervisión jurídica experta</span>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>;
};