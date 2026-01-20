import React from 'react';
import { CCHeroSection } from '@/components/contratos-computables/CCHeroSection';
import { CCContextSection } from '@/components/contratos-computables/CCContextSection';
import { CCDefinitionSection } from '@/components/contratos-computables/CCDefinitionSection';
import { CCContractTypesSection } from '@/components/contratos-computables/CCContractTypesSection';
import { CCPrincipleSection } from '@/components/contratos-computables/CCPrincipleSection';
import { CCLayersSection } from '@/components/contratos-computables/CCLayersSection';
import { CCValueSection } from '@/components/contratos-computables/CCValueSection';
import { CCVisionSection } from '@/components/contratos-computables/CCVisionSection';
import { CCCTASection } from '@/components/contratos-computables/CCCTASection';

const ContratosComputables: React.FC = () => {
  return (
    <div className="min-h-screen bg-gdigital-navy">
      <CCHeroSection />
      <CCContextSection />
      <CCDefinitionSection />
      <CCContractTypesSection />
      <CCPrincipleSection />
      <CCLayersSection />
      <CCValueSection />
      <CCVisionSection />
      <CCCTASection />
    </div>
  );
};

export default ContratosComputables;
