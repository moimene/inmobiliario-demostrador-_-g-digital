import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { GlowCard } from '../GlowCard';
import { FileCheck, PenTool, Bell, MessageSquare } from 'lucide-react';

const modules = [
  {
    icon: FileCheck,
    title: 'Evidence Manager',
    description: 'Gestión probatoria: Expedientes, Grupos de Evidencias y Evidencias individuales con reportes.',
    color: 'text-gdigital-green',
  },
  {
    icon: PenTool,
    title: 'Signature Manager',
    description: 'Firma electrónica: Solicitudes, documentos, participantes, firmantes y validadores con webhooks.',
    color: 'text-gdigital-lime',
  },
  {
    icon: Bell,
    title: 'Notification Manager',
    description: 'Notificaciones certificadas: Envío seguro y gestión de usuarios con trazabilidad completa.',
    color: 'text-gdigital-green',
  },
  {
    icon: MessageSquare,
    title: 'Chat Manager',
    description: 'Comunicaciones seguras: Chat integrado, gestión de mensajes y reportes asociados.',
    color: 'text-gdigital-lime',
  },
];

export const SolutionSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Arquitectura Modular
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="font-body text-lg text-white/60 text-center mb-12"
        >
          4 Managers especializados para confianza digital completa
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => (
            <GlowCard key={index} delay={0.2 + index * 0.1}>
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-gdigital-navy ${module.color}`}>
                  <module.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-white mb-2">
                    {module.title}
                  </h3>
                  <p className="font-body text-white/70">
                    {module.description}
                  </p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </Slide>
  );
};
