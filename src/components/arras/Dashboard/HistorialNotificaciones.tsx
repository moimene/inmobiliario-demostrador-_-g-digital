import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  Send, 
  CheckCircle, 
  Clock, 
  Bell, 
  FileSignature,
  AlertCircle,
  PartyPopper
} from "lucide-react";

export interface Notificacion {
  id: string;
  tipo: "invitacion_firma" | "confirmacion_firma" | "todas_firmadas" | "recordatorio" | "documento";
  destinatario: string;
  email: string;
  asunto: string;
  timestamp: string;
  estado: "enviado" | "entregado" | "leido";
}

// Mock data para demostración
const notificacionesMock: Notificacion[] = [
  {
    id: "notif-001",
    tipo: "invitacion_firma",
    destinatario: "María García López",
    email: "maria.garcia@email.com",
    asunto: "Invitación a firmar contrato de arras",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    estado: "leido"
  },
  {
    id: "notif-002",
    tipo: "invitacion_firma",
    destinatario: "Carlos Rodríguez Martín",
    email: "carlos.rodriguez@email.com",
    asunto: "Invitación a firmar contrato de arras",
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    estado: "entregado"
  },
  {
    id: "notif-003",
    tipo: "confirmacion_firma",
    destinatario: "María García López",
    email: "maria.garcia@email.com",
    asunto: "Confirmación de firma electrónica cualificada",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    estado: "leido"
  },
  {
    id: "notif-004",
    tipo: "confirmacion_firma",
    destinatario: "Carlos Rodríguez Martín",
    email: "carlos.rodriguez@email.com",
    asunto: "Confirmación de firma electrónica cualificada",
    timestamp: new Date(Date.now() - 1800000).toISOString(),
    estado: "entregado"
  },
  {
    id: "notif-005",
    tipo: "todas_firmadas",
    destinatario: "Todas las partes",
    email: "todos@expediente",
    asunto: "Contrato firmado - Documento final disponible",
    timestamp: new Date(Date.now() - 900000).toISOString(),
    estado: "enviado"
  }
];

const getIconoTipo = (tipo: Notificacion["tipo"]) => {
  switch (tipo) {
    case "invitacion_firma":
      return <Send className="h-4 w-4 text-blue-600" />;
    case "confirmacion_firma":
      return <FileSignature className="h-4 w-4 text-green-600" />;
    case "todas_firmadas":
      return <PartyPopper className="h-4 w-4 text-purple-600" />;
    case "recordatorio":
      return <Bell className="h-4 w-4 text-amber-600" />;
    case "documento":
      return <Mail className="h-4 w-4 text-gray-600" />;
  }
};

const getEstadoBadge = (estado: Notificacion["estado"]) => {
  switch (estado) {
    case "enviado":
      return <Badge variant="outline" className="text-xs gap-1"><Clock className="h-3 w-3" />Enviado</Badge>;
    case "entregado":
      return <Badge variant="secondary" className="text-xs gap-1 bg-blue-100 text-blue-700"><CheckCircle className="h-3 w-3" />Entregado</Badge>;
    case "leido":
      return <Badge className="text-xs gap-1 bg-green-600"><CheckCircle className="h-3 w-3" />Leído</Badge>;
  }
};

const getTipoLabel = (tipo: Notificacion["tipo"]) => {
  switch (tipo) {
    case "invitacion_firma":
      return "Invitación";
    case "confirmacion_firma":
      return "Confirmación";
    case "todas_firmadas":
      return "Completado";
    case "recordatorio":
      return "Recordatorio";
    case "documento":
      return "Documento";
  }
};

interface HistorialNotificacionesProps {
  notificaciones?: Notificacion[];
}

export const HistorialNotificaciones = ({ notificaciones = notificacionesMock }: HistorialNotificacionesProps) => {
  const totalEnviadas = notificaciones.length;
  const totalLeidas = notificaciones.filter(n => n.estado === "leido").length;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Historial de Notificaciones
          </CardTitle>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{totalEnviadas} enviadas</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="text-green-600">{totalLeidas} leídas</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[320px] pr-4">
          <div className="space-y-3">
            {notificaciones.map((notif, index) => (
              <div key={notif.id}>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="p-2 rounded-full bg-background border">
                    {getIconoTipo(notif.tipo)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{notif.destinatario}</span>
                        <Badge variant="outline" className="text-[10px]">{getTipoLabel(notif.tipo)}</Badge>
                      </div>
                      {getEstadoBadge(notif.estado)}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{notif.asunto}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">{notif.email}</span>
                      <Separator orientation="vertical" className="h-3" />
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        {new Date(notif.timestamp).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                {index < notificaciones.length - 1 && (
                  <div className="flex justify-center my-1">
                    <div className="w-px h-3 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>

        {notificaciones.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No hay notificaciones registradas</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
