import { ConsolaUnifiedHeader } from "./ConsolaUnifiedHeader";
import { ConsolaUnifiedSidebarActions } from "./ConsolaUnifiedSidebarActions";
import { ConsolaUnifiedContractsList } from "./ConsolaUnifiedContractsList";
import { ConsolaUnifiedContractView } from "./ConsolaUnifiedContractView";

export const ConsolaUnified = () => {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100">
      <ConsolaUnifiedHeader />
      <div className="flex-1 flex overflow-hidden">
        <ConsolaUnifiedSidebarActions />
        <ConsolaUnifiedContractsList />
        <ConsolaUnifiedContractView />
      </div>
    </div>
  );
};
