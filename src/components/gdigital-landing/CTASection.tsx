import React from 'react';
import { motion } from 'framer-motion';
import { ElectricButton } from '@/components/deck/ElectricButton';
import { GDigitalLogo } from '@/components/deck/GDigitalLogo';
import { ArrowRight, Mail, ExternalLink } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gdigital-green/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gdigital-lime/15 rounded-full blur-[120px]" />
      </div>

      {/* Border top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gdigital-green/50 to-transparent" />

      <div className="container px-6 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <GDigitalLogo size="md" className="justify-center" />
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-6">
            <span className="text-white">Lleve su organización a la </span>
            <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
              vanguardia de la confianza digital
            </span>
          </h2>

          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            Conéctese con nuestro equipo de expertos legales y tecnológicos para explorar cómo G-digital puede transformar sus procesos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ElectricButton
              size="lg"
              variant="primary"
              onClick={() => window.open('mailto:gdigital@garrigues.com', '_blank')}
              className="gap-2"
            >
              <Mail className="w-5 h-5" />
              Contactar con G-digital
              <ArrowRight className="w-5 h-5" />
            </ElectricButton>

            <ElectricButton
              size="lg"
              variant="secondary"
              onClick={() => window.open('https://www.g-digital.garrigues.com/', '_blank')}
              className="gap-2"
            >
              Visitar Portal
              <ExternalLink className="w-4 h-4" />
            </ElectricButton>
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t border-gdigital-green/20"
          >
            <p className="text-sm text-white/50 mb-4">Certificaciones y Acreditaciones</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {['eIDAS QTSP', 'ISO 27001', 'ENS Alto', 'AEPD Cumplimiento'].map((badge) => (
                <div
                  key={badge}
                  className="px-4 py-2 rounded-lg bg-gdigital-navy/60 border border-gdigital-green/20 text-sm text-white/70"
                >
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
