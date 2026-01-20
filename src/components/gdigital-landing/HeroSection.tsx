import React from 'react';
import { motion } from 'framer-motion';
import { GDigitalLogo } from '@/components/deck/GDigitalLogo';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gdigital-green/15 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gdigital-lime/10 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gdigital-green/5 rounded-full blur-[150px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--gdigital-green)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--gdigital-green)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container px-6 mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-8"
          >
            <GDigitalLogo size="lg" className="justify-center" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-gdigital-green/30 bg-gdigital-green/10"
          >
            <span className="w-2 h-2 rounded-full bg-gdigital-green animate-pulse" />
            <span className="text-sm text-gdigital-green font-medium">
              La división de negocios digitales de Garrigues
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-medium leading-tight mb-6"
          >
            <span className="text-white">Transformamos el derecho en </span>
            <span className="bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
              soluciones digitales
            </span>
            <br />
            <span className="text-white">seguras, escalables y con </span>
            <span className="bg-gradient-to-r from-gdigital-lime to-gdigital-green bg-clip-text text-transparent">
              plena validez jurídica
            </span>
          </motion.h1>

          {/* H2 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Combinamos el conocimiento legal de Garrigues con tecnología punta para 
            <span className="text-gdigital-green font-medium"> digitalizar la confianza</span>, 
            <span className="text-gdigital-lime font-medium"> automatizar contratos</span> y 
            <span className="text-gdigital-green font-medium"> tokenizar activos</span> en entornos regulados.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-16"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-6 h-10 mx-auto rounded-full border-2 border-gdigital-green/40 flex items-start justify-center p-1"
            >
              <div className="w-1.5 h-3 bg-gdigital-green rounded-full" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
