import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EventoTimelineArras } from "@/types/arras";
import { ShieldAlert, Activity } from "lucide-react";
interface Props {
  events: EventoTimelineArras[];
}
export const CertificadoEventos = ({
  events
}: Props) => {
  return (
    <Card className="bg-muted/10 border-l-4 border-l-accent">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-accent">
          <Activity className="h-4 w-4" />
          Eventos Certificados — Auditoría en Tiempo Real
        </CardTitle>
      </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {events.length === 0 ? <p className="text-xs text-muted-foreground">
                            No hay eventos registrados en el expediente.
                        </p> : <div className="relative border-l border-muted ml-2 pl-4 space-y-4">
                            {events.slice(0, 5).map(evt => <div key={evt.id} className="relative">
                                    <div className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-accent" />
                                    <p className="text-xs font-semibold">{evt.mensaje}</p>
                                    <p className="text-[10px] text-muted-foreground font-mono">
                                        {new Date(evt.fecha).toLocaleString()}
                                    </p>
                                </div>)}
                        </div>}

                    <div className="pt-2 border-t flex items-center gap-2">
                        <ShieldAlert className="h-3 w-3 text-green-600" />
                        <span className="text-[10px] font-medium text-muted-foreground">
                            Certificado por EAD Trust (QTSP)
                        </span>
                    </div>
        </div>
      </CardContent>
    </Card>
  );
};