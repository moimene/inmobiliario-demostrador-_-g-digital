import { UnifiedCLMProvider } from "@/contexts/UnifiedCLMContext";
import { ArrendamientoProvider } from "@/contexts/ArrendamientoContext";
import { ArrasProvider } from "@/contexts/ArrasContext";
import { ConsolaUnified } from "@/components/unified/ConsolaUnified";

const GestionAvanzadaDemo = () => {
  return (
    <ArrendamientoProvider>
      <ArrasProvider>
        <UnifiedCLMProvider>
          <div className="h-screen">
            <ConsolaUnified />
          </div>
        </UnifiedCLMProvider>
      </ArrasProvider>
    </ArrendamientoProvider>
  );
};

export default GestionAvanzadaDemo;
