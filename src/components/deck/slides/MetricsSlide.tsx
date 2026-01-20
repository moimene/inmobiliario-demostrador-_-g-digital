import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { GlowCard } from '../GlowCard';
import { Code, Globe, ShieldCheck, Zap } from 'lucide-react';

const standards = [
  {
    icon: Code,
    title: 'JSON Nativo',
    items: ['Request/Response en JSON', 'Header Accept: application/json', 'Content-Type: application/json'],
  },
  {
    icon: Globe,
    title: 'Métodos HTTP',
    items: ['GET: Lectura', 'POST: Crear', 'PATCH: Actualizar parcial', 'PUT: Crear/Actualizar', 'DELETE: Eliminar'],
  },
  {
    icon: ShieldCheck,
    title: 'Entornos',
    items: ['INT: api.int.gcloudfactory.com', 'PRE: api.pre.gcloudfactory.com', 'Rutas jerárquicas RESTful'],
  },
  {
    icon: Zap,
    title: 'Respuestas',
    items: ['2xx: Éxito (200, 201, 202)', '4xx: Error cliente (400, 401, 403, 404)', '5xx: Error servidor (500, 503)'],
  },
];

export const MetricsSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-4 text-center"
        >
          Estándares Técnicos
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="font-body text-lg text-white/60 text-center mb-12"
        >
          API RESTful con protocolos estandarizados
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((standard, index) => (
            <GlowCard key={index} delay={0.2 + index * 0.1}>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-gdigital-green/10 text-gdigital-green mb-4">
                  <standard.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-white mb-4">
                  {standard.title}
                </h3>
                <ul className="space-y-2">
                  {standard.items.map((item, i) => (
                    <li key={i} className="font-body text-sm text-white/60">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </GlowCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-12 p-4 rounded-lg bg-gdigital-navy/60 border border-gdigital-green/20"
        >
          <code className="font-mono text-sm text-gdigital-lime">
            /case-files/{'{caseFileId}'}/evidence-groups/{'{evidenceGroupId}'}/evidences/{'{evidenceId}'}
          </code>
        </motion.div>
      </div>
    </Slide>
  );
};
