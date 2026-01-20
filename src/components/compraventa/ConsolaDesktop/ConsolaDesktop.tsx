import { ConsolaHeader } from "./ConsolaHeader";
import { ConsolaContractsList } from "./ConsolaContractsList";
import { ConsolaContractView } from "./ConsolaContractView";
import { ConsolaSidebarActions } from "./ConsolaSidebarActions";

export const ConsolaDesktop = () => {
  return (
    <div className="h-full flex flex-col bg-slate-950 text-slate-100">
      <ConsolaHeader />
      <div className="flex-1 flex overflow-hidden">
        <ConsolaSidebarActions />
        <ConsolaContractsList />
        <ConsolaContractView />
      </div>
    </div>
  );
};
