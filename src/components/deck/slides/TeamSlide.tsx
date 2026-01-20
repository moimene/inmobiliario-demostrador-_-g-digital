import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { GlowCard } from '../GlowCard';

const team = [
  {
    name: 'Equipo Legal',
    role: 'Arquitectura Jurídica',
    bio: 'Diseño de marcos contractuales y cumplimiento normativo eIDAS.',
  },
  {
    name: 'Equipo Técnico',
    role: 'Desarrollo API',
    bio: 'Implementación de servicios RESTful y gestión de infraestructura cloud.',
  },
  {
    name: 'Equipo Producto',
    role: 'Experiencia Usuario',
    bio: 'Diseño de interfaces intuitivas para gestión documental.',
  },
  {
    name: 'Equipo Seguridad',
    role: 'Custodia y Cifrado',
    bio: 'Protección de datos y gestión de certificados cualificados.',
  },
];

export const TeamSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Equipos Especializados
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="font-body text-lg text-white/60 text-center mb-12"
        >
          Expertise multidisciplinar para confianza digital
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <GlowCard className="h-full text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gdigital-green to-gdigital-lime mx-auto mb-4 flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-gdigital-navy">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-gdigital-green mb-3">
                  {member.role}
                </p>
                <p className="font-body text-sm text-white/60">
                  {member.bio}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
};
