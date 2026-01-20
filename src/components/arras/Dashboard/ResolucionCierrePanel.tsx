import React, { useState } from 'react';
import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Handshake, 
  Scale, 
  FileCheck, 
  ShieldAlert, 
  AlertTriangle,
  Lock,
  Download,
  CheckCircle2,
  XCircle,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";
import { generarCertificadoQTSP } from "@/utils/generarCertificadoQTSP";

type TipoCierre = 'mutuo_acuerdo' | 'litigio' | null;

export const ResolucionCierrePanel = () => {
  const { expediente } = useArras();
  const [tipoCierreSeleccionado, setTipoCierreSeleccionado] = useState<TipoCierre>(null);
  const [condicionesResolucion, setCondicionesResolucion] = useState('');
  const [procesando, setProcesando] = useState(false);

  const estadoActual = expediente.estado || 'EN_NEGOCIACION';
  const esEstadoTerminal = ['TERMINADO', 'LITIGIO'].includes(estadoActual);

  const handleMutuoAcuerdo = () => {
    if (!condicionesResolucion.trim()) {
      toast.error("Debe especificar las condiciones de la resolución");
      return;
    }
    
    setProcesando(true);
    
    // Simular proceso
    setTimeout(() => {
      toast.success("Contrato resuelto por mutuo acuerdo", {
        description: "El expediente ha sido cerrado y pasa a modo solo lectura"
      });
      setProcesando(false);
      setTipoCierreSeleccionado(null);
    }, 2000);
  };

  const handleDeclaraLitigio = () => {
    setProcesando(true);
    
    // Generar certificado QTSP real
    setTimeout(() => {
      try {
        const resultado = generarCertificadoQTSP({
          expediente,
          fechaDeclaracion: new Date().toISOString(),
          motivoDeclaracion: "Controversia declarada por una de las partes"
        });
        
        toast.success("Controversia declarada - Certificado QTSP generado", {
          description: `Archivo: ${resultado.fileName}`,
          duration: 5000
        });
      } catch (error) {
        toast.error("Error al generar el certificado", {
          description: "Por favor, inténtelo de nuevo"
        });
      }
      
      setProcesando(false);
      setTipoCierreSeleccionado(null);
    }, 1500);
  };

  if (esEstadoTerminal) {
    return (
      <Card className="border-2 border-muted">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Lock className="h-6 w-6 text-muted-foreground" />
            <div>
              <CardTitle>Expediente Cerrado</CardTitle>
              <CardDescription>
                Este expediente se encuentra en estado {estadoActual} y es de solo lectura
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant={estadoActual === 'TERMINADO' ? 'default' : 'destructive'}>
              {estadoActual === 'TERMINADO' ? (
                <><CheckCircle2 className="h-3 w-3 mr-1" /> Terminado</>
              ) : (
                <><XCircle className="h-3 w-3 mr-1" /> En Litigio</>
              )}
            </Badge>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Descargar Expediente Completo
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-primary" />
                Panel de Resolución y Cierre
              </CardTitle>
              <CardDescription>
                Gestione la finalización del contrato fuera del cauce ordinario (escritura pública notarial)
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="gap-2 shrink-0"
              onClick={() => window.open('https://www.comillas.edu/investigacion/observatorio-legaltech/foro-ktech/', '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
              Estándar Observatorio ICADE-Garrigues
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Opciones de Resolución */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Mutuo Acuerdo */}
        <Card className={`cursor-pointer transition-all ${tipoCierreSeleccionado === 'mutuo_acuerdo' ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Handshake className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Mutuo Acuerdo</CardTitle>
                  <CardDescription>Resolución amistosa (Disenso)</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">Amistoso</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ambas partes deciden no continuar con la compraventa pero pactan una salida amistosa.
            </p>
            
            <div className="text-sm space-y-2">
              <p className="font-medium">Cuándo usarlo:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>El comprador no consigue financiación</li>
                <li>Ambas partes desisten sin penalización</li>
                <li>Se renegocia sustancialmente el contrato</li>
              </ul>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Estado final: <span className="font-semibold">TERMINADO</span></p>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => setTipoCierreSeleccionado('mutuo_acuerdo')}
              >
                <Handshake className="h-4 w-4" />
                Resolver por Mutuo Acuerdo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Litigio */}
        <Card className={`cursor-pointer transition-all ${tipoCierreSeleccionado === 'litigio' ? 'ring-2 ring-destructive' : 'hover:border-destructive/50'}`}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
                  <ShieldAlert className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Declarar Controversia</CardTitle>
                  <CardDescription>Incumplimiento (Contencioso)</CardDescription>
                </div>
              </div>
              <Badge variant="destructive">Contencioso</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              La vía amistosa ha fracasado y una de las partes ha incumplido sus obligaciones.
            </p>
            
            <div className="text-sm space-y-2">
              <p className="font-medium">Cuándo usarlo:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1">
                <li>Incomparecencia injustificada a notaría</li>
                <li>Disputa sobre devolución de arras</li>
                <li>Defectos graves en el inmueble</li>
              </ul>
            </div>

            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">Estado final: <span className="font-semibold text-destructive">CONTROVERSIA</span></p>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    variant="destructive" 
                    className="w-full gap-2"
                    onClick={() => setTipoCierreSeleccionado('litigio')}
                  >
                    <ShieldAlert className="h-4 w-4" />
                    Declarar Controversia / Incumplimiento
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      ¿Declarar estado de controversia?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                      <p>Esta acción es <strong>irreversible</strong> y tendrá los siguientes efectos:</p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>El estado del contrato cambiará a <strong>CONTROVERSIA</strong></li>
                        <li>Se bloquearán todas las capacidades de edición</li>
                        <li>Se generará automáticamente el paquete de evidencias forenses</li>
                      </ul>
                      <div className="p-3 bg-muted rounded-lg mt-4">
                        <p className="text-sm font-medium flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-primary" />
                          Generación de Evidencia Forense
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Se recopilará el Audit Trail completo, documentos firmados con hashes SHA-256, 
                          y se generará un Certificado de Eventos sellado con QTSP.
                        </p>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeclaraLitigio}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={procesando}
                    >
                      {procesando ? "Generando evidencias..." : "Confirmar Controversia"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de Mutuo Acuerdo expandido */}
      {tipoCierreSeleccionado === 'mutuo_acuerdo' && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Handshake className="h-5 w-5" />
              Definir Términos del Mutuo Acuerdo
            </CardTitle>
            <CardDescription>
              Especifique las condiciones acordadas por ambas partes para la resolución del contrato
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Condiciones de la Resolución *
              </label>
              <Textarea
                placeholder="Ej: El VENDEDOR devuelve el 50% de las arras (1.500€) al COMPRADOR. Ambas partes renuncian a futuras reclamaciones derivadas de este contrato."
                value={condicionesResolucion}
                onChange={(e) => setCondicionesResolucion(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Estas condiciones quedarán registradas en el expediente con sello de tiempo cualificado
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setTipoCierreSeleccionado(null)}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleMutuoAcuerdo}
                disabled={procesando || !condicionesResolucion.trim()}
                className="gap-2"
              >
                {procesando ? (
                  "Procesando..."
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Ejecutar Resolución
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabla resumen de escenarios */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Resumen de Escenarios de Cierre</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Escenario</th>
                  <th className="text-left py-2 font-medium">Tipo de Cierre</th>
                  <th className="text-left py-2 font-medium">Estado Final</th>
                  <th className="text-left py-2 font-medium">Resultado Forense</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2">Escritura Pública</td>
                  <td className="py-2">Estándar (Éxito)</td>
                  <td className="py-2"><Badge variant="default">ESCRITURA_OTORGADA</Badge></td>
                  <td className="py-2">Acta Notarial (Externa)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Mutuo Acuerdo</td>
                  <td className="py-2">Amistoso (Disenso)</td>
                  <td className="py-2"><Badge variant="secondary">TERMINADO</Badge></td>
                  <td className="py-2">Registro de Condiciones</td>
                </tr>
                <tr>
                  <td className="py-2">Controversia</td>
                  <td className="py-2">Contencioso</td>
                  <td className="py-2"><Badge variant="destructive">CONTROVERSIA</Badge></td>
                  <td className="py-2">Certificado QTSP Completo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
