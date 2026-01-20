import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Users, Home, Archive, MessageSquare, GitBranch, Download } from "lucide-react";
import { ConsolaTabContrato } from "./tabs/ConsolaTabContrato";
import { ConsolaTabPartes } from "./tabs/ConsolaTabPartes";
import { ConsolaTabInmueble } from "./tabs/ConsolaTabInmueble";
import { ConsolaTabEvidencias } from "./tabs/ConsolaTabEvidencias";
import { ConsolaTabChat } from "./tabs/ConsolaTabChat";
import { ConsolaPipeline } from "./ConsolaPipeline";
import { ConsolaTabExportar } from "./tabs/ConsolaTabExportar";

export const ConsolaContractView = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-slate-950">
      <Tabs defaultValue="flujo" className="h-full flex flex-col">
        <TabsList className="border-b border-slate-700 w-full justify-start rounded-none h-14 bg-slate-900/50 px-4">
          <TabsTrigger value="flujo" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <GitBranch className="h-4 w-4" />
            <span className="hidden sm:inline">Flujo del Contrato</span>
          </TabsTrigger>
          <TabsTrigger value="contrato" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Contrato</span>
          </TabsTrigger>
          <TabsTrigger value="partes" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Partes</span>
          </TabsTrigger>
          <TabsTrigger value="inmueble" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Inmueble</span>
          </TabsTrigger>
          <TabsTrigger value="evidencias" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <Archive className="h-4 w-4" />
            <span className="hidden sm:inline">Evidencias</span>
          </TabsTrigger>
          <TabsTrigger value="chat" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Chat Certificado</span>
          </TabsTrigger>
          <TabsTrigger value="exportar" className="gap-2 data-[state=active]:bg-slate-800 data-[state=active]:text-slate-100">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="flujo" className="flex-1 overflow-auto m-0">
          <ConsolaPipeline />
        </TabsContent>

        <TabsContent value="contrato" className="flex-1 overflow-auto m-0">
          <ConsolaTabContrato />
        </TabsContent>

        <TabsContent value="partes" className="flex-1 overflow-auto m-0">
          <ConsolaTabPartes />
        </TabsContent>

        <TabsContent value="inmueble" className="flex-1 overflow-auto m-0">
          <ConsolaTabInmueble />
        </TabsContent>

        <TabsContent value="evidencias" className="flex-1 overflow-auto m-0">
          <ConsolaTabEvidencias />
        </TabsContent>

        <TabsContent value="chat" className="flex-1 overflow-auto m-0">
          <ConsolaTabChat />
        </TabsContent>

        <TabsContent value="exportar" className="flex-1 overflow-auto m-0">
          <ConsolaTabExportar />
        </TabsContent>
      </Tabs>
    </div>
  );
};
