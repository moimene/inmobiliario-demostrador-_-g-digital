import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface DeckConfig {
  client_name: string;
  industry: string;
  pain_point: string;
  product_name: string;
  unique_value: string;
  cta_text: string;
}

interface DeckContextType {
  currentSlide: number;
  totalSlides: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  config: DeckConfig;
  updateConfig: (newConfig: Partial<DeckConfig>) => void;
}

const defaultConfig: DeckConfig = {
  client_name: "Tu Empresa",
  industry: "Sector Legal / Inmobiliario",
  pain_point: "Gestión documental sin garantías legales",
  product_name: "Legal App Factory",
  unique_value: "CLM + eIDAS + Confianza Digital",
  cta_text: "Agenda tu demostración",
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

export const DeckProvider: React.FC<{
  children: React.ReactNode;
  totalSlides: number;
}> = ({ children, totalSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [config, setConfig] = useState<DeckConfig>(defaultConfig);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const updateConfig = useCallback((newConfig: Partial<DeckConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <DeckContext.Provider
      value={{
        currentSlide,
        totalSlides,
        goToSlide,
        nextSlide,
        prevSlide,
        config,
        updateConfig,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error('useDeck must be used within a DeckProvider');
  }
  return context;
};
