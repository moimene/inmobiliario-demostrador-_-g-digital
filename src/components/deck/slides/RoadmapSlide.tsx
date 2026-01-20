import React from 'react';
import { motion } from 'framer-motion';
import { Slide } from '../SlideContainer';
import { CheckCircle2, Clock, Rocket } from 'lucide-react';

const roadmapItems = [
  {
    status: 'done',
    icon: CheckCircle2,
    title: 'Evidence Manager',
    description: 'Gestión probatoria completa',
    tag: 'En producción',
  },
  {
    status: 'done',
    icon: CheckCircle2,
    title: 'Signature Manager',
    description: 'Firma electrónica cualificada',
    tag: 'En producción',
  },
  {
    status: 'progress',
    icon: Clock,
    title: 'Notification Manager',
    description: 'Notificaciones certificadas',
    tag: 'En desarrollo',
  },
  {
    status: 'planned',
    icon: Rocket,
    title: 'Chat Manager',
    description: 'Comunicaciones seguras',
    tag: 'Planificado',
  },
];

export const RoadmapSlide: React.FC = () => {
  return (
    <Slide>
      <div className="max-w-5xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-5xl font-bold text-white mb-12 text-center"
        >
          Roadmap
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-gdigital-green/20 hidden md:block" />

          <div className="grid md:grid-cols-4 gap-6">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className={`hidden md:flex w-4 h-4 rounded-full mx-auto mb-6 ${
                    item.status === 'done'
                      ? 'bg-gdigital-green shadow-[0_0_12px_hsl(145_95%_52%/0.6)]'
                      : item.status === 'progress'
                      ? 'bg-gdigital-lime animate-pulse'
                      : 'bg-gdigital-green/30'
                  }`}
                />

                <div className="p-6 rounded-xl bg-gdigital-navy/40 border border-gdigital-green/10 text-center">
                  <item.icon
                    className={`w-8 h-8 mx-auto mb-3 ${
                      item.status === 'done'
                        ? 'text-gdigital-green'
                        : item.status === 'progress'
                        ? 'text-gdigital-lime'
                        : 'text-white/40'
                    }`}
                  />
                  <h3 className="font-heading text-lg font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-white/60 mb-4">
                    {item.description}
                  </p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-body ${
                      item.status === 'done'
                        ? 'bg-gdigital-green/20 text-gdigital-green'
                        : item.status === 'progress'
                        ? 'bg-gdigital-lime/20 text-gdigital-lime'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
};
