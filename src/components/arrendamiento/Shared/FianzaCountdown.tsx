import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface FianzaCountdownProps {
  fechaFinalizacionContrato: string;
  montoFianza: number;
}

/**
 * Componente de cuenta regresiva legal para devolución de fianza
 * 
 * BASE LEGAL:
 * - LAU Art. 36: Plazo de 1 mes (30 días) desde entrega de llaves
 * - Plazo legal para devolución de fianza y liquidación de gastos
 * - Transcurrido el plazo sin devolución: posible reclamación judicial
 */
export const FianzaCountdown = ({ fechaFinalizacionContrato, montoFianza }: FianzaCountdownProps) => {
  const [diasRestantes, setDiasRestantes] = useState<number>(0);
  const [estado, setEstado] = useState<"normal" | "alerta" | "vencido">("normal");

  useEffect(() => {
    const calcularDiasRestantes = () => {
      const fechaFin = new Date(fechaFinalizacionContrato);
      const fechaLimite = new Date(fechaFin);
      fechaLimite.setDate(fechaLimite.getDate() + 30); // +30 días desde finalización

      const ahora = new Date();
      const diferenciaMilisegundos = fechaLimite.getTime() - ahora.getTime();
      const dias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

      setDiasRestantes(dias);

      // Determinar estado según días restantes
      if (dias <= 0) {
        setEstado("vencido");
      } else if (dias <= 7) {
        setEstado("alerta");
      } else {
        setEstado("normal");
      }
    };

    calcularDiasRestantes();
    const interval = setInterval(calcularDiasRestantes, 1000 * 60 * 60); // Actualizar cada hora

    return () => clearInterval(interval);
  }, [fechaFinalizacionContrato]);

  const getColorClasses = () => {
    switch (estado) {
      case "vencido":
        return {
          bg: "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20",
          border: "border-red-300 dark:border-red-700",
          icon: "text-red-600 dark:text-red-400",
          badge: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
        };
      case "alerta":
        return {
          bg: "bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-800/20",
          border: "border-amber-300 dark:border-amber-700",
          icon: "text-amber-600 dark:text-amber-400",
          badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900",
          border: "border-blue-200 dark:border-slate-700",
          icon: "text-blue-600 dark:text-blue-400",
          badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
        };
    }
  };

  const colors = getColorClasses();

  return (
    <Card className={`p-4 ${colors.bg} ${colors.border}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            {estado === "vencido" ? (
              <AlertTriangle className={`h-5 w-5 ${colors.icon} mt-0.5`} />
            ) : estado === "alerta" ? (
              <Clock className={`h-5 w-5 ${colors.icon} mt-0.5 animate-pulse`} />
            ) : (
              <CheckCircle className={`h-5 w-5 ${colors.icon} mt-0.5`} />
            )}
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                Plazo Legal de Devolución de Fianza
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                LAU Art. 36 - Plazo máximo: 30 días naturales desde la entrega de llaves
              </p>
            </div>
          </div>
          <Badge className={colors.badge}>
            {diasRestantes > 0 ? `${diasRestantes} días` : "Vencido"}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monto fianza</div>
            <div className="font-bold text-slate-900 dark:text-slate-100">{montoFianza}€</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Estado</div>
            <div className={`font-semibold ${
              estado === "vencido" 
                ? "text-red-600 dark:text-red-400" 
                : estado === "alerta"
                ? "text-amber-600 dark:text-amber-400"
                : "text-green-600 dark:text-green-400"
            }`}>
              {estado === "vencido" ? "Plazo vencido" : estado === "alerta" ? "Urgente" : "Dentro de plazo"}
            </div>
          </div>
        </div>

        {estado === "vencido" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-red-800 dark:text-red-300">
                <p className="font-semibold mb-1">⚠️ Plazo legal vencido</p>
                <p>
                  El plazo de 30 días desde la finalización del contrato ha expirado. 
                  El arrendatario puede reclamar la devolución íntegra de la fianza más intereses legales 
                  y, en su caso, iniciar procedimiento judicial de reclamación.
                </p>
              </div>
            </div>
          </div>
        )}

        {estado === "alerta" && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800 dark:text-amber-300">
                <p className="font-semibold mb-1">⏰ Plazo próximo a vencer</p>
                <p>
                  Quedan menos de 7 días para finalizar el plazo legal de devolución. 
                  Es necesario realizar la liquidación y transferencia de la fianza antes del vencimiento 
                  para evitar reclamaciones y posibles intereses de demora.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <p><strong>Base legal:</strong> Ley 29/1994 (LAU) Art. 36</p>
            <p><strong>Plazo:</strong> 1 mes (30 días naturales) desde la entrega de llaves</p>
            <p><strong>Consecuencias del incumplimiento:</strong> Devolución íntegra + intereses legales + posible indemnización</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
