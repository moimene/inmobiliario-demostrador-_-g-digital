import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Scale, Users, CheckCircle, XCircle, FileText } from "lucide-react";
import { useState } from "react";

interface MediacionDossierProps {
  montoDisputa: number;
  conceptoDisputa: string;
  onAceptarMediacion: () => void;
  onRechazarMediacion: () => void;
  onAcuerdoAlcanzado: (montoAcordado: number) => void;
}

/**
 * Componente de gestión de mediación previa en disputas de fianza
 * 
 * VENTAJAS DE LA MEDIACIÓN:
 * - Evita procedimiento judicial costoso y largo
 * - Confidencialidad del proceso
 * - Flexibilidad en las soluciones
 * - Rapidez en la resolución (días vs. meses)
 * - Preserva la relación entre las partes
 * 
 * BASE LEGAL:
 * - Ley 5/2012 de mediación en asuntos civiles y mercantiles
 * - RD 980/2013 desarrollo de la ley de mediación
 */
export const MediacionDossier = ({
  montoDisputa,
  conceptoDisputa,
  onAceptarMediacion,
  onRechazarMediacion,
  onAcuerdoAlcanzado,
}: MediacionDossierProps) => {
  const [estadoMediacion, setEstadoMediacion] = useState<"propuesta" | "aceptada" | "rechazada" | "acuerdo">("propuesta");
  const [montoAcordado, setMontoAcordado] = useState<number>(montoDisputa);

  const handleAceptar = () => {
    setEstadoMediacion("aceptada");
    onAceptarMediacion();
  };

  const handleRechazar = () => {
    setEstadoMediacion("rechazada");
    onRechazarMediacion();
  };

  const handleAcuerdo = () => {
    setEstadoMediacion("acuerdo");
    onAcuerdoAlcanzado(montoAcordado);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border-purple-200 dark:border-purple-700">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Scale className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                  Propuesta de Mediación Previa
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Resolución extrajudicial de disputa sobre devolución de fianza
                </p>
              </div>
              <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                {estadoMediacion === "propuesta" && "Propuesta"}
                {estadoMediacion === "aceptada" && "En mediación"}
                {estadoMediacion === "rechazada" && "Rechazada"}
                {estadoMediacion === "acuerdo" && "✓ Acuerdo alcanzado"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-slate-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Concepto de la disputa:</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">{conceptoDisputa}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Monto en disputa:</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">{montoDisputa}€</span>
            </div>
          </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-indigo-800 dark:text-indigo-300 space-y-2">
              <p className="font-semibold">¿Por qué elegir mediación?</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li><strong>Rapidez:</strong> Resolución en días, no meses</li>
                <li><strong>Ahorro:</strong> Evita costes judiciales y abogados</li>
                <li><strong>Flexibilidad:</strong> Soluciones creativas y personalizadas</li>
                <li><strong>Confidencialidad:</strong> Proceso privado, no público</li>
                <li><strong>Control:</strong> Las partes deciden, no un juez</li>
              </ul>
            </div>
          </div>
        </div>

        {estadoMediacion === "propuesta" && (
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleAceptar}
              className="bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Aceptar mediación
            </Button>
            <Button
              onClick={handleRechazar}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
            >
              <XCircle className="h-4 w-4" />
              Rechazar
            </Button>
          </div>
        )}

        {estadoMediacion === "aceptada" && (
          <div className="space-y-3">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div className="text-xs text-green-800 dark:text-green-300">
                  <p className="font-semibold mb-1">✓ Mediación aceptada por ambas partes</p>
                  <p>
                    Se designará un mediador profesional certificado. El proceso de mediación comenzará 
                    en un plazo máximo de 5 días hábiles. Todas las comunicaciones quedarán certificadas 
                    en el expediente.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
              <label className="text-xs text-slate-600 dark:text-slate-400 block mb-2">
                Propuesta de acuerdo (monto a devolver):
              </label>
              <input
                type="number"
                value={montoAcordado}
                onChange={(e) => setMontoAcordado(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                min={0}
                max={montoDisputa}
              />
            </div>

            <Button
              onClick={handleAcuerdo}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2"
            >
              <FileText className="h-4 w-4" />
              Confirmar acuerdo de mediación
            </Button>
          </div>
        )}

        {estadoMediacion === "rechazada" && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <XCircle className="h-4 w-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-red-800 dark:text-red-300">
                <p className="font-semibold mb-1">Mediación rechazada</p>
                <p>
                  Al rechazar la mediación, la disputa deberá resolverse por vía judicial. 
                  Esto implica mayores costes, tiempos más largos (6-18 meses), y un resultado 
                  impuesto por el juez sin flexibilidad. Se recomienda reconsiderar la mediación.
                </p>
              </div>
            </div>
          </div>
        )}

        {estadoMediacion === "acuerdo" && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-green-800 dark:text-green-300">
                <p className="font-semibold mb-1">✓ Acuerdo de mediación alcanzado</p>
                <p>
                  Las partes han acordado una devolución de <strong>{montoAcordado}€</strong>. 
                  Este acuerdo tiene fuerza ejecutiva (Art. 25 Ley 5/2012) y pone fin a la disputa. 
                  El acuerdo queda certificado con sello de tiempo cualificado en el expediente.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <p><strong>Base legal:</strong> Ley 5/2012 de mediación en asuntos civiles y mercantiles</p>
            <p><strong>Eficacia:</strong> El acuerdo de mediación tiene fuerza ejecutiva (Art. 25)</p>
          </div>
        </div>
      </div>
    </Card>
  );
};
