import React from 'react';
import { Link } from 'react-router-dom';
import { GDigitalLogo } from '@/components/deck/GDigitalLogo';

export const FooterSection: React.FC = () => {
  return (
    <footer className="py-12 border-t border-gdigital-green/20">
      <div className="container px-6 mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <GDigitalLogo size="sm" />

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <a 
              href="https://g-digital.garrigues.com/es_ES/nosotros" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gdigital-green transition-colors"
            >
              Portal g-digital
            </a>
            <a 
              href="https://www.garrigues.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gdigital-green transition-colors"
            >
              Garrigues
            </a>
            <a 
              href="https://www.eadtrust.eu/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-gdigital-green transition-colors"
            >
              EADTrust
            </a>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/40">
            <span>© {new Date().getFullYear()} g-digital · Grupo Garrigues</span>
            <Link 
              to="/aviso-legal" 
              className="text-white/60 hover:text-gdigital-green transition-colors"
            >
              Aviso Legal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
