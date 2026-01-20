import React from 'react';
import { motion } from 'framer-motion';
import { FileCode, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export const CCHeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gdigital-navy">
      {/* Background effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gdigital-green/10 blur-[120px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gdigital-lime/10 blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          variant="ghost"
          onClick={() => navigate('/conceptos')}
          className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Conceptos
        </Button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gdigital-green/10 border border-gdigital-green/30 mb-8"
        >
          <FileCode className="h-4 w-4 text-gdigital-green" />
          <span className="text-sm font-medium text-gdigital-green">Derecho Computable</span>
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6"
        >
          De{' '}
          <span className="font-normal bg-gradient-to-r from-gdigital-green to-gdigital-lime bg-clip-text text-transparent">
            Documento
          </span>
          {' '}a{' '}
          <span className="font-normal bg-gradient-to-r from-gdigital-lime to-gdigital-green bg-clip-text text-transparent">
            Proceso
          </span>
        </motion.h1>

        {/* Subtitle - 30 second pitch */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-white/70 font-light leading-relaxed max-w-4xl mx-auto"
        >
          <span className="text-gdigital-green font-normal">g-digital</span> impulsa el Derecho Computable 
          para que los contratos dejen de ser documentos estáticos y pasen a ser{' '}
          <span className="text-white">procesos digitales verificables y ejecutables</span>. 
          Diseñamos la seguridad jurídica "by design" combinando CLM, servicios de confianza 
          (firma, sello de tiempo, notificación, archivo) y automatización/IA, de modo que el negocio 
          pueda operar a escala con{' '}
          <span className="text-gdigital-lime">trazabilidad, cumplimiento y prueba robusta</span>.
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-gdigital-green" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
