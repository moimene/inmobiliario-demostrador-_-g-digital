import React from 'react';
import { HeroSection } from '@/components/gdigital-landing/HeroSection';
import { AboutSection } from '@/components/gdigital-landing/AboutSection';
import { SolutionsSection } from '@/components/gdigital-landing/SolutionsSection';
import { ValuePropositionSection } from '@/components/gdigital-landing/ValuePropositionSection';
import { CTASection } from '@/components/gdigital-landing/CTASection';
import { FooterSection } from '@/components/gdigital-landing/FooterSection';

const PresentacionGDigital: React.FC = () => {
  return (
    <div className="min-h-screen bg-gdigital-navy text-white overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <SolutionsSection />
      <ValuePropositionSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default PresentacionGDigital;
