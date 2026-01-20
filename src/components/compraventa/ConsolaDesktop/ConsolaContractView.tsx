import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConsolaPipelineCompraventa } from "./ConsolaPipelineCompraventa";
import { ConsolaTabContrato } from "./tabs/ConsolaTabContrato";
import { ConsolaTabPartes } from "./tabs/ConsolaTabPartes";
import { ConsolaTabInmueble } from "./tabs/ConsolaTabInmueble";
import { ConsolaTabDueDiligence } from "./tabs/ConsolaTabDueDiligence";
import { ConsolaTabChat } from "./tabs/ConsolaTabChat";
import { ConsolaTabExportar } from "./tabs/ConsolaTabExportar";
import { FileText, Users, Building2, FileCheck, MessageSquare, Download, GitBranch } from "lucide-react";

export const ConsolaContractView = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-950">
      <Tabs defaultValue="flujo" className="flex-1 flex flex-col">
        <div className="border-b border-slate-800 bg-slate-900/50 px-6">
          <TabsList className="bg-transparent h-12">
            <TabsTrigger value="flujo" className="gap-2 data-[state=active]:bg-slate-800">
              <GitBranch className="h-4 w-4" />
              Flujo del Contrato
            </TabsTrigger>
            <TabsTrigger value="contrato" className="gap-2 data-[state=active]:bg-slate-800">
              <FileText className="h-4 w-4" />
              Contrato
            </TabsTrigger>
            <TabsTrigger value="partes" className="gap-2 data-[state=active]:bg-slate-800">
              <Users className="h-4 w-4" />
              Partes
            </TabsTrigger>
            <TabsTrigger value="inmueble" className="gap-2 data-[state=active]:bg-slate-800">
              <Building2 className="h-4 w-4" />
              Inmueble
            </TabsTrigger>
            <TabsTrigger value="due-diligence" className="gap-2 data-[state=active]:bg-slate-800">
              <FileCheck className="h-4 w-4" />
              Due Diligence
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-slate-800">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="exportar" className="gap-2 data-[state=active]:bg-slate-800">
              <Download className="h-4 w-4" />
              Exportar
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="flujo" className="flex-1 mt-0">
          <ConsolaPipelineCompraventa />
        </TabsContent>
        <TabsContent value="contrato" className="flex-1 mt-0">
          <ConsolaTabContrato />
        </TabsContent>
        <TabsContent value="partes" className="flex-1 mt-0">
          <ConsolaTabPartes />
        </TabsContent>
        <TabsContent value="inmueble" className="flex-1 mt-0">
          <ConsolaTabInmueble />
        </TabsContent>
        <TabsContent value="due-diligence" className="flex-1 mt-0">
          <ConsolaTabDueDiligence />
        </TabsContent>
        <TabsContent value="chat" className="flex-1 mt-0">
          <ConsolaTabChat />
        </TabsContent>
        <TabsContent value="exportar" className="flex-1 mt-0">
          <ConsolaTabExportar />
        </TabsContent>
      </Tabs>
    </div>
  );
};
