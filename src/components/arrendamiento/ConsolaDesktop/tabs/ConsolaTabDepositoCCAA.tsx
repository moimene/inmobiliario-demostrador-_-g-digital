import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calendar, AlertTriangle, ExternalLink } from "lucide-react";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { getDepositoInfo, type DepositoFianzaCCAA } from "@/data/depositoFianzaCCAA";

/**
 * Tab de información de depósito de fianza según Comunidad Autónoma
 * 
 * Muestra los requisitos legales específicos de cada CCAA:
 * - Organismo competente
 * - Plazos de depósito y devolución
 * - Sanciones por incumplimiento
 * - Enlaces a organismos oficiales
 */
export const ConsolaTabDepositoCCAA = () => {
  const { expediente } = useArrendamiento();
  const ccaa = expediente.vivienda.comunidadAutonoma || "madrid";
  const depositoInfo: DepositoFianzaCCAA | null = getDepositoInfo(ccaa);

  if (!depositoInfo) {
    return (
      <div className="p-6 text-center text-slate-500 dark:text-slate-400">
        <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No se encontró información de depósito para esta Comunidad Autónoma</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Requisitos de Depósito de Fianza
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Información específica para {depositoInfo.comunidad}
          </p>
        </div>
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
          {depositoInfo.comunidad}
        </Badge>
      </div>

      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <CardTitle className="text-base">Organismo Competente</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {depositoInfo.organismo}
          </p>
          {depositoInfo.enlaceWeb && (
            <a
              href={depositoInfo.enlaceWeb}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mt-2"
            >
              <ExternalLink className="h-3 w-3" />
              Visitar web oficial
            </a>
          )}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              <CardTitle className="text-base">Plazo de Depósito</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {depositoInfo.plazoDeposito}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Desde la firma del contrato
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              <CardTitle className="text-base">Plazo de Devolución</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              {depositoInfo.plazoDevolucion}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Desde la finalización del contrato (LAU Art. 36)
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <CardTitle className="text-base text-red-900 dark:text-red-200">
              Sanción por Incumplimiento
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-800 dark:text-red-300 font-semibold">
            {depositoInfo.sancionIncumplimiento}
          </p>
          <p className="text-xs text-red-700 dark:text-red-400 mt-2">
            El depósito de la fianza es OBLIGATORIO en todas las Comunidades Autónomas
          </p>
        </CardContent>
      </Card>

      {depositoInfo.observaciones && (
        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
          <CardContent className="pt-4">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-amber-900 dark:text-amber-200 mb-1">
                  Observaciones
                </p>
                <p className="text-xs text-amber-800 dark:text-amber-300">
                  {depositoInfo.observaciones}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-200 dark:border-slate-700">
        <CardContent className="pt-4">
          <div className="text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p><strong>Base legal general:</strong> LAU (Ley 29/1994) Art. 36</p>
            <p><strong>Fianza obligatoria:</strong></p>
            <ul className="ml-4 list-disc space-y-1">
              <li>Vivienda habitual: 1 mensualidad de renta</li>
              <li>Local comercial: 2 mensualidades de renta</li>
              <li>El depósito protege los derechos de ambas partes</li>
              <li>Se devuelve al arrendador tras finalización (descontadas posibles compensaciones)</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
              💡 Datos del expediente actual
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-600 dark:text-slate-400">Fianza depositada:</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  {expediente.contrato.deposito}€
                </p>
              </div>
              <div>
                <span className="text-slate-600 dark:text-slate-400">Comunidad Autónoma:</span>
                <p className="font-bold text-slate-900 dark:text-slate-100">
                  {depositoInfo.comunidad}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
