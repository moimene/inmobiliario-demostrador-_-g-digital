import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Conceptos from "./pages/Conceptos";
import EstadoInmuebleDemo from "./pages/demos/EstadoInmuebleDemo";
import CanalArrendamientoDemo from "./pages/demos/CanalArrendamientoDemo";
import CanalArrasDemo from "./pages/demos/CanalArrasDemo";
import CanalCompraventaDemo from "./pages/demos/CanalCompraventaDemo";
import CertificacionDocumentosDemo from "./pages/demos/CertificacionDocumentosDemo";
import GestionAvanzadaDemo from "./pages/demos/GestionAvanzadaDemo";
import VerificacionDocumento from "./pages/VerificacionDocumento";
import PresentacionGDigital from "./pages/PresentacionGDigital";
import ContratosComputables from "./pages/ContratosComputables";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/conceptos" element={<Conceptos />} />
          <Route path="/presentacion-gdigital" element={<PresentacionGDigital />} />
          <Route path="/contratos-computables" element={<ContratosComputables />} />
          <Route path="/demo/estado-inmueble" element={<EstadoInmuebleDemo />} />
          <Route path="/demo/canal-arrendamiento" element={<CanalArrendamientoDemo />} />
          <Route path="/demo/canal-arras" element={<CanalArrasDemo />} />
          <Route path="/demo/canal-compraventa" element={<CanalCompraventaDemo />} />
          <Route path="/demo/certificacion-documentos" element={<CertificacionDocumentosDemo />} />
          <Route path="/demo/gestion-avanzada" element={<GestionAvanzadaDemo />} />
          <Route path="/verificacion/:id" element={<VerificacionDocumento />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
