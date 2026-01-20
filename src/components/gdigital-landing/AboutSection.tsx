import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from '@/components/deck/GlowCard';
import { Lightbulb, Scale, Code, Shield } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const highlights = [
    { icon: Lightbulb, text: 'Innovación' },
    { icon: Scale, text: 'Derecho' },
    { icon: Code, text: 'Tecnología' },
    { icon: Shield, text: 'Seguridad' },
  ];

  return (
    <section className="py-24 relative">
      {/* Ambient */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-gdigital-green/10 rounded-full blur-[100px]" />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-normal mb-6">
              <span className="text-white">¿Quiénes </span>
              <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
                somos?
              </span>
            </h2>

            <div className="space-y-5 text-white/80 leading-relaxed font-light">
              <p>
                <span className="text-gdigital-green">g-digital</span> es la división de innovación y negocio digital del 
                <span className="text-white"> Grupo Garrigues</span>. No somos solo un proveedor de software; somos una 
                <span className="text-gdigital-lime"> factoría de LegalTech</span> que integra ingeniería tecnológica y dirección jurídica para crear productos y servicios innovadores.
              </p>

              <p>
                Nuestra misión es liderar la era del <span className="text-gdigital-green">Derecho Computable</span>, 
                convirtiendo procesos legales complejos en sistemas digitales eficientes y seguros.
              </p>

              <p>
                Operamos bajo un modelo único donde la <span className="text-white">seguridad jurídica</span> y el 
                <span className="text-white"> cumplimiento normativo</span> se integran desde el diseño 
                <span className="text-gdigital-lime"> (compliance by design)</span>.
              </p>
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard className="p-8" hover={false}>
              <div className="grid grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex flex-col items-center gap-3 p-6 rounded-lg bg-gdigital-navy/50 border border-gdigital-green/10 hover:border-gdigital-green/30 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gdigital-green/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-gdigital-green" />
                    </div>
                    <span className="text-white font-normal">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative element */}
              <div className="mt-8 pt-6 border-t border-gdigital-green/20 text-center">
                <span className="text-sm text-white/60">
                  Respaldados por más de
                </span>
                <div className="text-3xl font-heading font-normal mt-2">
                  <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
                    80+ años
                  </span>
                </div>
                <span className="text-sm text-white/60">
                  de excelencia jurídica de Garrigues
                </span>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
