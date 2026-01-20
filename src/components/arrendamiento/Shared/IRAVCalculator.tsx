import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, Info } from "lucide-react";

interface IRAVCalculatorProps {
  rentaActual: number;
  fechaActualizacion: string;
  onCalcular: (nuevaRenta: number, desglose: IRAVDesglose) => void;
}

export interface IRAVDesglose {
  ipcGeneral: number;
  limiteActualizacion: number;
  porcentajeAplicado: number;
  incrementoEuros: number;
  nuevaRenta: number;
  baseLegal: string;
}

/**
 * Componente pedagógico que muestra el cálculo real del IRAV
 * conforme a LAU Art. 18 y límites legales vigentes.
 * 
 * IRAV = Índice de Revisión de Arrendamientos
 * Fórmula actual: IPC general anual con tope del 2% (Ley 12/2023)
 */
export const IRAVCalculator = ({ rentaActual, fechaActualizacion, onCalcular }: IRAVCalculatorProps) => {
  
  /**
   * Calcular actualización IRAV conforme a normativa vigente
   * 
   * NORMATIVA APLICABLE:
   * - LAU Art. 18: Actualización anual de renta según variación IPC
   * - Ley 12/2023: Límite temporal del 2% (zona no tensionada) o 3% (zona tensionada)
   * - RDL 7/2019: Introducción del límite del IPC
   * 
   * Para este cálculo pedagógico usamos:
   * - IPC general anual real: 3.5% (simulado, normalmente se consulta INE)
   * - Límite legal aplicable: 2% (zona no tensionada según Ley 12/2023)
   * - Porcentaje aplicado: el MENOR entre IPC real y límite legal
   */
  const calcularIRAV = () => {
    // IPC general anual (en producción: consultar INE API)
    const ipcGeneral = 3.5; // Simulado: 3.5% IPC interanual
    
    // Límite legal vigente según Ley 12/2023 (zona no tensionada)
    const limiteActualizacion = 2.0; // 2% máximo
    
    // Aplicar el MENOR entre IPC real y límite legal
    const porcentajeAplicado = Math.min(ipcGeneral, limiteActualizacion);
    
    // Calcular nueva renta
    const incrementoEuros = Math.round(rentaActual * (porcentajeAplicado / 100));
    const nuevaRenta = rentaActual + incrementoEuros;
    
    const desglose: IRAVDesglose = {
      ipcGeneral,
      limiteActualizacion,
      porcentajeAplicado,
      incrementoEuros,
      nuevaRenta,
      baseLegal: "LAU Art. 18 + Ley 12/2023 (límite 2% zona no tensionada)",
    };
    
    onCalcular(nuevaRenta, desglose);
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900 border-blue-200 dark:border-slate-700">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
              Cálculo IRAV (Índice de Revisión de Arrendamientos)
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Actualización anual de renta conforme a LAU Art. 18 y límites legales vigentes
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Renta actual</div>
            <div className="font-bold text-slate-900 dark:text-slate-100">{rentaActual}€/mes</div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Fecha actualización
            </div>
            <div className="font-semibold text-slate-900 dark:text-slate-100">{fechaActualizacion}</div>
          </div>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-800 dark:text-amber-300 space-y-2">
              <p className="font-semibold">Normativa aplicable:</p>
              <ul className="space-y-1 ml-4 list-disc">
                <li>
                  <strong>LAU Art. 18:</strong> Actualización anual según variación porcentual IPC
                </li>
                <li>
                  <strong>Ley 12/2023:</strong> Límite temporal del 2% en zonas no tensionadas, 3% en zonas tensionadas
                </li>
                <li>
                  <strong>IPC real (INE):</strong> 3.5% interanual (simulado)
                </li>
                <li>
                  <strong>Porcentaje aplicado:</strong> El MENOR entre IPC real y límite legal
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={calcularIRAV}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <TrendingUp className="h-4 w-4" />
            Calcular actualización IRAV
          </button>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
          <Badge variant="outline" className="text-xs">
            🔒 Certificado eIDAS
          </Badge>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            El cálculo quedará registrado con sello de tiempo cualificado
          </span>
        </div>
      </div>
    </Card>
  );
};
