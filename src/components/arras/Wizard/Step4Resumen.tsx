import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ClipboardList, Building, Scale, Users, CheckCircle, 
  AlertCircle, Home, Calendar, Banknote, FileText 
} from "lucide-react";
import { motion } from "framer-motion";

interface StepProps {
  onNext: (data: any) => void;
  onBack: () => void;
  data: any;
}

export const Step4Resumen = ({ onNext, onBack, data }: StepProps) => {
  const getCompradorNombre = () => {
    const compradores = data.compradores || [];
    if (compradores.length === 0) return "No especificado";
    const primero = compradores[0];
    const nombre = primero.tipo === "fisica" ? primero.nombre : primero.razonSocial;
    return compradores.length > 1 ? `${nombre} (+${compradores.length - 1})` : nombre;
  };

  const getVendedorNombre = () => {
    const vendedores = data.vendedores || [];
    if (vendedores.length === 0) return "No especificado";
    const primero = vendedores[0];
    const nombre = primero.tipo === "fisica" ? primero.nombre : primero.razonSocial;
    return vendedores.length > 1 ? `${nombre} (+${vendedores.length - 1})` : nombre;
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
    }).format(value || 0);
  };

  const formatDate = (date: string) => {
    if (!date) return "No especificada";
    return new Date(date).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const tipoArrasLabel = {
    PENITENCIALES: "Penitenciales",
    CONFIRMATORIAS: "Confirmatorias",
    PENALES: "Penales",
  };

  const isComplete = data.direccion && data.precioVenta && data.fechaLimiteEscritura;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <ClipboardList className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Resumen del Expediente</h2>
          <p className="text-muted-foreground text-sm">
            Revisa todos los datos antes de generar el borrador
          </p>
        </div>
        {data.modoEstandar && (
          <Badge className="ml-auto bg-accent">Modo Estándar</Badge>
        )}
      </div>

      {/* Inmueble */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Home className="h-4 w-4" />
            Inmueble
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Dirección</p>
              <p className="font-medium">{data.direccion || "No especificada"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Referencia Catastral</p>
              <p className="font-medium font-mono text-sm">
                {data.referenciaCatastral || "No especificada"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Nº Finca Registral</p>
              <p className="font-medium">{data.numeroFinca || "No especificado"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Superficie</p>
              <p className="font-medium">
                {data.m2Construidos ? `${data.m2Construidos} m² construidos` : "No especificada"}
              </p>
            </div>
          </div>
          {data.anexos && data.anexos.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Anexos</p>
              <div className="flex flex-wrap gap-2">
                {data.anexos.map((anexo: any, i: number) => (
                  <Badge key={i} variant="secondary">
                    {anexo.tipo === "garaje" ? "🚗" : "📦"} {anexo.ubicacion || `Anexo ${i + 1}`}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Partes */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-4 w-4" />
            Partes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Parte Vendedora</p>
              <p className="font-medium">{getVendedorNombre()}</p>
              {data.vendedores && data.vendedores.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {data.vendedores[0].email}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Parte Compradora</p>
              <p className="font-medium">{getCompradorNombre()}</p>
              {data.compradores && data.compradores.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {data.compradores[0].email}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condiciones Económicas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            Condiciones Económicas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Precio de Venta</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(data.precioVenta)}
              </p>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Importe Arras</p>
              <p className="text-2xl font-bold">
                {formatCurrency(data.importeArras)}
              </p>
              {data.precioVenta > 0 && (
                <p className="text-xs text-muted-foreground">
                  ({((data.importeArras / data.precioVenta) * 100).toFixed(1)}%)
                </p>
              )}
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">Resto a Escritura</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency((data.precioVenta || 0) - (data.importeArras || 0))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Términos del Contrato */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Scale className="h-4 w-4" />
            Términos del Contrato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tipo de Arras</p>
                <p className="font-medium">
                  {tipoArrasLabel[data.tipoArras as keyof typeof tipoArrasLabel] || "Penitenciales"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Fecha Límite Escritura</p>
                <p className="font-medium">{formatDate(data.fechaLimiteEscritura)}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex flex-wrap gap-2">
            {data.modoEstandar && (
              <Badge variant="default" className="bg-accent">
                <CheckCircle className="h-3 w-3 mr-1" />
                Modo Estándar Observatorio
              </Badge>
            )}
            <Badge variant="outline">
              Pago: {data.formaPagoArras === "posterior" ? "Posterior" : "Al firmar"}
            </Badge>
            <Badge variant="outline">
              Gastos: {data.distribucionGastos === "cargo_comprador" ? "Comprador" : "Según Ley"}
            </Badge>
            <Badge variant="outline">
              Firma: {data.firmaPreferida === "manuscrita" ? "Manuscrita" : "Electrónica"}
            </Badge>
          </div>

          {data.condicionSuspensiva && (
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <p className="text-sm font-medium text-amber-700 dark:text-amber-400 mb-1">
                Condición Suspensiva
              </p>
              <p className="text-sm text-muted-foreground">{data.condicionSuspensiva}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Validación */}
      <Card className={isComplete ? "border-green-500/30 bg-green-500/5" : "border-amber-500/30 bg-amber-500/5"}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {isComplete ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">
                    Expediente listo para generar borrador
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Todos los campos requeridos están completos
                  </p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="h-6 w-6 text-amber-500" />
                <div>
                  <p className="font-medium text-amber-700 dark:text-amber-400">
                    Faltan campos requeridos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Revisa los pasos anteriores para completar la información
                  </p>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button size="lg" onClick={() => onNext(data)}>
          Siguiente: Generar Borrador
        </Button>
      </div>
    </motion.div>
  );
};
