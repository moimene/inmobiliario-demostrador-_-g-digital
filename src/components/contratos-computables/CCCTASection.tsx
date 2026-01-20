import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GDigitalLogo } from '@/components/deck/GDigitalLogo';

export const CCCTASection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-b from-[#152238] to-gdigital-navy relative overflow-hidden">
      {/* Ambient lights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gdigital-green/10 blur-[200px]" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <GDigitalLogo size="md" />
          </div>

          {/* Pitch */}
          <h2 className="text-2xl md:text-3xl font-light text-white mb-6 leading-relaxed">
            Diseñamos la <span className="text-gdigital-green font-normal">seguridad jurídica "by design"</span> para 
            que el negocio opere a escala con trazabilidad, cumplimiento y prueba robusta.
          </h2>

          <p className="text-white/60 font-light mb-10 max-w-2xl mx-auto">
            Combina CLM, servicios de confianza cualificados (eIDAS) y automatización inteligente 
            para transformar documentos estáticos en procesos digitales verificables.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              onClick={() => navigate('/')}
              className="bg-gdigital-green hover:bg-gdigital-green/90 text-gdigital-navy font-medium px-6 py-3 h-auto gap-2"
            >
              Explorar Demostradores
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              onClick={() => navigate('/conceptos')}
              variant="outline"
              className="border-gdigital-green/30 text-gdigital-green hover:bg-gdigital-green/10 px-6 py-3 h-auto gap-2"
            >
              <BookOpen className="h-4 w-4" />
              Ver Arquitecturas CLM
            </Button>

            <Button
              asChild
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-white/10 px-6 py-3 h-auto gap-2"
            >
              <a href="https://g-digital.garrigues.com/es_ES/nosotros" target="_blank" rel="noopener noreferrer">
                Contactar g-digital
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span className="w-2 h-2 rounded-full bg-gdigital-green" />
              eIDAS Compliant
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span className="w-2 h-2 rounded-full bg-gdigital-lime" />
              QTSP Cualificado
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Garrigues + ICADE
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
