import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/deck/GlowCard';
import { 
  ShieldCheck, 
  FileSignature, 
  Camera, 
  Bell, 
  Archive,
  FileText,
  Coins,
  Bot,
  Scale,
  Brain
} from 'lucide-react';

interface Solution {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  features: { icon: React.ElementType; title: string; description: string }[];
  gradient: string;
}

const solutions: Solution[] = [
  {
    id: 1,
    title: 'Confianza Digital',
    subtitle: 'Digital Trust',
    description: 'Aportamos seguridad jurídica a las transacciones electrónicas a través de EADTrust, nuestro propio Prestador de Servicios de Confianza Cualificado (QTSP) acreditado en Europa.',
    icon: ShieldCheck,
    gradient: 'from-gdigital-green to-emerald-500',
    features: [
      { icon: FileSignature, title: 'Firma Electrónica', description: 'Firmas digitales cualificadas con la máxima validez legal en la UE' },
      { icon: Camera, title: 'Certificación de Evidencias', description: 'Certificación de fotos, vídeos y archivos con sello de tiempo cualificado' },
      { icon: Bell, title: 'Notificaciones Certificadas', description: 'El equivalente digital al burofax, con trazabilidad completa' },
      { icon: Archive, title: 'Archivo y Custodia', description: 'Preservación de activos digitales a largo plazo' },
    ],
  },
  {
    id: 2,
    title: 'Contratos Digitales',
    subtitle: 'CLM',
    description: 'Digitalizamos el ciclo de vida completo de los contratos (Contract Lifecycle Management). Transformamos documentos estáticos en flujos de trabajo inteligentes.',
    icon: FileText,
    gradient: 'from-gdigital-lime to-yellow-400',
    features: [
      { icon: FileText, title: 'Redacción Automatizada', description: 'Generación de contratos con cláusulas validadas' },
      { icon: FileSignature, title: 'Negociación Digital', description: 'Flujos de aprobación y versionado inteligente' },
      { icon: ShieldCheck, title: 'Firma Integrada', description: 'Circuitos de firma con validez eIDAS' },
      { icon: Scale, title: 'Contrato Computable', description: 'Acuerdos que se autoejecutan y verifican su cumplimiento' },
    ],
  },
  {
    id: 3,
    title: 'Activos Digitales',
    subtitle: 'Tokenización RWA',
    description: 'Somos pioneros en la tokenización de activos del mundo real (Real World Assets) en entornos regulados. Desarrollamos infraestructuras para emitir y gestionar valores tokenizados.',
    icon: Coins,
    gradient: 'from-amber-400 to-orange-500',
    features: [
      { icon: Coins, title: 'Valores Tokenizados', description: 'Bonos, participaciones e inmuebles en blockchain' },
      { icon: Scale, title: 'Régimen Piloto UE', description: 'Cumplimiento con MiCA y normativa financiera' },
      { icon: ShieldCheck, title: 'DLT Empresarial', description: 'Transparencia, liquidación inmediata y seguridad' },
      { icon: Archive, title: 'Custodia Digital', description: 'Infraestructura regulada para activos tokenizados' },
    ],
  },
  {
    id: 4,
    title: 'LegalTech e IA',
    subtitle: 'Inteligencia Artificial',
    description: 'Productivizamos el conocimiento jurídico mediante IA aplicada y responsable. Smart Hubs y Bots entrenados con el know-how de Garrigues.',
    icon: Brain,
    gradient: 'from-violet-500 to-purple-600',
    features: [
      { icon: Bot, title: 'Smart Hubs y Bots', description: 'Asistentes virtuales para secretariado societario' },
      { icon: Scale, title: 'IA Compliance', description: 'Auditoría algorítmica y cumplimiento del AI Act' },
      { icon: Brain, title: 'Know-how Garrigues', description: 'IA entrenada con décadas de experiencia legal' },
      { icon: ShieldCheck, title: 'IA Responsable', description: 'Sistemas auditables, explicables y seguros' },
    ],
  },
];

export const SolutionsSection: React.FC = () => {
  return (
    <section className="py-24 relative">
      {/* Ambient */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-gdigital-lime/10 rounded-full blur-[120px]" />
      <div className="absolute left-0 bottom-1/4 w-80 h-80 bg-gdigital-green/10 rounded-full blur-[100px]" />

      <div className="container px-6 mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            <span className="text-white">Nuestras </span>
            <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
              4 Líneas de Soluciones
            </span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            Estructuramos nuestra oferta en cuatro ejes estratégicos interconectados para cubrir todas las necesidades de la economía digital.
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="space-y-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <GlowCard className="p-0 overflow-hidden" hover={false}>
                <div className="grid lg:grid-cols-3 gap-0">
                  {/* Left - Main Info */}
                  <div className="p-8 lg:border-r border-gdigital-green/20">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center shrink-0`}>
                        <solution.icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <div className="text-xs text-gdigital-lime uppercase tracking-wider mb-1">
                          {solution.subtitle}
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-white">
                          {solution.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Right - Features */}
                  <div className="lg:col-span-2 p-8 bg-gdigital-navy/30">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {solution.features.map((feature, idx) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          className="flex gap-3 p-4 rounded-lg bg-gdigital-navy/50 border border-gdigital-green/10 hover:border-gdigital-green/30 transition-colors group"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gdigital-green/10 flex items-center justify-center shrink-0 group-hover:bg-gdigital-green/20 transition-colors">
                            <feature.icon className="w-5 h-5 text-gdigital-green" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white mb-1">{feature.title}</h4>
                            <p className="text-sm text-white/60">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
