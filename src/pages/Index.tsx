import { DemoBanner } from "@/components/DemoBanner";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { SolutionSection } from "@/components/SolutionSection";
import { DemoSelector } from "@/components/DemoSelector";
import { EcosistemaSection } from "@/components/EcosistemaSection";
import { GDigitalEmbed } from "@/components/GDigitalEmbed";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import impactoLegalImage from "@/assets/impacto-legal-eidas.png";
const Index = () => {
  return <div className="min-h-screen bg-background">
    <DemoBanner />
    <Hero />
    <ProblemSection />
    <SolutionSection />
    <DemoSelector />
    <EcosistemaSection />
    

    {/* Legal Impact Section */}


    <Footer />
  </div>;
};
export default Index;