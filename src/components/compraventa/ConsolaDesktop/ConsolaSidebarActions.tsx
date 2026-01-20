import { Button } from "@/components/ui/button";
import { FileText, Download, Search, Filter } from "lucide-react";

export const ConsolaSidebarActions = () => {
  return (
    <div className="w-16 bg-slate-900 border-r border-slate-800 flex flex-col items-center gap-4 py-4">
      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
        <Search className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
        <Filter className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
        <FileText className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100">
        <Download className="h-5 w-5" />
      </Button>
    </div>
  );
};
