import { useUnifiedCLM } from "@/contexts/UnifiedCLMContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Home, Image, MessageSquare, Download, GitBranch } from "lucide-react";

// Arrendamiento tabs
import { ConsolaTabContrato as ConsolaTabContratoArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabContrato";
import { ConsolaTabPartes as ConsolaTabPartesArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabPartes";
import { ConsolaTabInmueble as ConsolaTabInmuebleArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabInmueble";
import { ConsolaTabEvidencias as ConsolaTabEvidenciasArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabEvidencias";
import { ConsolaTabChat as ConsolaTabChatArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabChat";
import { ConsolaTabExportar as ConsolaTabExportarArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/tabs/ConsolaTabExportar";
import { ConsolaPipeline as ConsolaPipelineArrendamiento } from "@/components/arrendamiento/ConsolaDesktop/ConsolaPipeline";

// Arras tabs
import { ConsolaTabContrato as ConsolaTabContratoArras } from "@/components/arras/ConsolaDesktop/tabs/ConsolaTabContrato";
import { ConsolaTabPartes as ConsolaTabPartesArras } from "@/components/arras/ConsolaDesktop/tabs/ConsolaTabPartes";
import { ConsolaTabInmueble as ConsolaTabInmuebleArras } from "@/components/arras/ConsolaDesktop/tabs/ConsolaTabInmueble";
import { ConsolaTabChat as ConsolaTabChatArras } from "@/components/arras/ConsolaDesktop/tabs/ConsolaTabChat";
import { ConsolaTabExportar as ConsolaTabExportarArras } from "@/components/arras/ConsolaDesktop/tabs/ConsolaTabExportar";
import { ConsolaPipelineArras } from "@/components/arras/ConsolaDesktop/ConsolaPipelineArras";

export const ConsolaUnifiedContractView = () => {
  const { contratoSeleccionado } = useUnifiedCLM();

  if (!contratoSeleccionado) {
    return (
      <div className="flex-1 bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">Selecciona un contrato para ver detalles</p>
          <p className="text-slate-500 text-sm mt-2">
            Gestión unificada de arrendamientos y compraventas con arras
          </p>
        </div>
      </div>
    );
  }

  if (contratoSeleccionado.tipo === "arrendamiento") {
    return (
      <div className="flex-1 bg-slate-950 overflow-hidden">
        <Tabs defaultValue="flujo" className="h-full flex flex-col">
          <div className="border-b border-slate-800 px-6">
            <TabsList className="bg-slate-900/50">
              <TabsTrigger value="flujo" className="gap-2">
                <GitBranch className="h-4 w-4" />
                Flujo
              </TabsTrigger>
              <TabsTrigger value="contrato" className="gap-2">
                <FileText className="h-4 w-4" />
                Contrato
              </TabsTrigger>
              <TabsTrigger value="partes" className="gap-2">
                <Users className="h-4 w-4" />
                Partes
              </TabsTrigger>
              <TabsTrigger value="inmueble" className="gap-2">
                <Home className="h-4 w-4" />
                Inmueble
              </TabsTrigger>
              <TabsTrigger value="evidencias" className="gap-2">
                <Image className="h-4 w-4" />
                Evidencias
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="exportar" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="flujo" className="m-0 h-full">
              <ConsolaPipelineArrendamiento />
            </TabsContent>
            <TabsContent value="contrato" className="m-0">
              <ConsolaTabContratoArrendamiento />
            </TabsContent>
            <TabsContent value="partes" className="m-0">
              <ConsolaTabPartesArrendamiento />
            </TabsContent>
            <TabsContent value="inmueble" className="m-0">
              <ConsolaTabInmuebleArrendamiento />
            </TabsContent>
            <TabsContent value="evidencias" className="m-0">
              <ConsolaTabEvidenciasArrendamiento />
            </TabsContent>
            <TabsContent value="chat" className="m-0">
              <ConsolaTabChatArrendamiento />
            </TabsContent>
            <TabsContent value="exportar" className="m-0">
              <ConsolaTabExportarArrendamiento />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    );
  }

  // Arras tabs
  return (
    <div className="flex-1 bg-slate-950 overflow-hidden">
      <Tabs defaultValue="flujo" className="h-full flex flex-col">
        <div className="border-b border-slate-800 px-6">
          <TabsList className="bg-slate-900/50">
            <TabsTrigger value="flujo" className="gap-2">
              <GitBranch className="h-4 w-4" />
              Flujo
            </TabsTrigger>
            <TabsTrigger value="contrato" className="gap-2">
              <FileText className="h-4 w-4" />
              Contrato
            </TabsTrigger>
            <TabsTrigger value="partes" className="gap-2">
              <Users className="h-4 w-4" />
              Partes
            </TabsTrigger>
            <TabsTrigger value="inmueble" className="gap-2">
              <Home className="h-4 w-4" />
              Inmueble
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="exportar" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-y-auto">
          <TabsContent value="flujo" className="m-0 h-full">
            <ConsolaPipelineArras />
          </TabsContent>
          <TabsContent value="contrato" className="m-0">
            <ConsolaTabContratoArras />
          </TabsContent>
          <TabsContent value="partes" className="m-0">
            <ConsolaTabPartesArras />
          </TabsContent>
          <TabsContent value="inmueble" className="m-0">
            <ConsolaTabInmuebleArras />
          </TabsContent>
          <TabsContent value="chat" className="m-0">
            <ConsolaTabChatArras />
          </TabsContent>
          <TabsContent value="exportar" className="m-0">
            <ConsolaTabExportarArras />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
