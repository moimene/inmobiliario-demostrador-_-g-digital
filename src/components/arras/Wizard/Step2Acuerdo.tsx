import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ShieldCheck, AlertTriangle, Info, Scale, Banknote, 
  Calendar, Building, FileWarning, CheckCircle2 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TipoArras, CONSECUENCIAS_ARRAS } from "@/types/arras";

interface Step2Data {
  // Modo estándar
  modoEstandar: boolean;
  // Naturaleza arras
  tipoArras: TipoArras;
  // Económico
  precioVenta: number;
  importeArras: number;
  formaPagoArras: "al_firmar" | "posterior";
  plazoPago?: number;
  fechaLimitePago?: string;
  ibanVendedor?: string;
  // Escritura
  fechaLimiteEscritura: string;
  notariaNombre?: string;
  notariaDireccion?: string;
  // Otras condiciones
  distribucionGastos: "segun_ley" | "cargo_comprador";
  resolucionConflictos: "juzgados" | "arbitraje_notarial";
  firmaPreferida: "electronica" | "manuscrita";
  condicionSuspensiva?: string;
  // Ámbito avanzado (si no es modo estándar)
  conHipoteca: boolean;
  conArrendatarios: boolean;
  mobiliarioIncluido: boolean;
  retencionPlusvalia: boolean;
  retencionIbi: boolean;
  // Manifestaciones vendedor
  cosaCierta: boolean;
  libreOcupantes: boolean;
  libreCargas: boolean;
  corrientePagos: boolean;
  certificadoEnergetico: boolean;
}

interface StepProps {
  onNext: (data: Partial<Step2Data>) => void;
  onBack: () => void;
  data: Partial<Step2Data>;
}

// Fecha límite escritura: 90 días desde hoy
const getFechaLimiteEscritura = () => {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + 90);
  return fecha.toISOString().split("T")[0];
};

export const Step2Acuerdo = ({ onNext, onBack, data }: StepProps) => {
  const [formData, setFormData] = useState<Partial<Step2Data>>({
    modoEstandar: true,
    tipoArras: "PENITENCIALES",
    // Datos económicos realistas
    precioVenta: 485000,
    importeArras: 48500,
    formaPagoArras: "al_firmar",
    fechaLimiteEscritura: getFechaLimiteEscritura(),
    notariaNombre: "D. Carlos Martínez Aguado",
    notariaDireccion: "Calle Velázquez 89, 1º, 28006 Madrid",
    distribucionGastos: "segun_ley",
    resolucionConflictos: "juzgados",
    firmaPreferida: "electronica",
    conHipoteca: false,
    conArrendatarios: false,
    mobiliarioIncluido: false,
    retencionPlusvalia: false,
    retencionIbi: false,
    // Manifestaciones del vendedor
    cosaCierta: true,
    libreOcupantes: true,
    libreCargas: true,
    corrientePagos: true,
    certificadoEnergetico: true,
    ...data,
  });

  const handleChange = (field: keyof Step2Data, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const porcentajeArras = useMemo(() => {
    if (!formData.precioVenta || !formData.importeArras) return 0;
    return ((formData.importeArras / formData.precioVenta) * 100).toFixed(1);
  }, [formData.precioVenta, formData.importeArras]);

  const arrasAltas = Number(porcentajeArras) > 10;

  const consecuencias = formData.tipoArras 
    ? CONSECUENCIAS_ARRAS[formData.tipoArras] 
    : null;

  const handleSubmit = () => {
    onNext(formData);
  };

  // Si activa modo estándar, forzar valores
  const toggleModoEstandar = (checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        modoEstandar: true,
        tipoArras: "PENITENCIALES",
        conHipoteca: false,
        conArrendatarios: false,
      }));
    } else {
      setFormData((prev) => ({ ...prev, modoEstandar: false }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Scale className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Acuerdo / Términos Esenciales</h2>
          <p className="text-muted-foreground text-sm">
            El "cerebro" legal del contrato. Define las reglas del juego.
          </p>
        </div>
        <Badge variant="destructive" className="ml-auto">
          CRÍTICO
        </Badge>
      </div>

      {/* Modo Estándar Observatorio */}
      <Card className="border-2 border-accent/30 bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <ShieldCheck className="h-10 w-10 text-accent mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-primary">
                    Modo Estándar Observatorio
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Configuración pre-validada por el Observatorio Legaltech Garrigues-ICADE
                  </p>
                </div>
                <Switch
                  checked={formData.modoEstandar}
                  onCheckedChange={toggleModoEstandar}
                />
              </div>
              {formData.modoEstandar && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 flex flex-wrap gap-2"
                >
                  <Badge variant="secondary">Arras Penitenciales</Badge>
                  <Badge variant="secondary">Vivienda</Badge>
                  <Badge variant="secondary">Sin Hipoteca</Badge>
                  <Badge variant="secondary">Sin Arrendatarios</Badge>
                  <Badge variant="secondary">Derecho Común</Badge>
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Naturaleza de las Arras */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileWarning className="h-4 w-4" />
            Naturaleza de las Arras
          </CardTitle>
          <CardDescription>
            Determina las consecuencias jurídicas del desistimiento
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Tipo de Arras *</Label>
            <Select
              value={formData.tipoArras}
              onValueChange={(v) => handleChange("tipoArras", v as TipoArras)}
              disabled={formData.modoEstandar}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENITENCIALES">
                  <div className="flex items-center gap-2">
                    <span>Penitenciales (Art. 1454 CC)</span>
                    <Badge variant="outline" className="text-xs">Recomendado</Badge>
                  </div>
                </SelectItem>
                <SelectItem value="CONFIRMATORIAS">Confirmatorias</SelectItem>
                <SelectItem value="PENALES">Penales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {consecuencias && (
            <motion.div
              key={formData.tipoArras}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-lg bg-muted/50 space-y-2"
            >
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Si el comprador incumple:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {consecuencias.siCompradorIncumple}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-primary mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Si el vendedor incumple:
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {consecuencias.siVendedorIncumple}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Condiciones Económicas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Banknote className="h-4 w-4" />
            Condiciones Económicas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Precio Total de Venta (€) *</Label>
              <Input
                type="number"
                value={formData.precioVenta || ""}
                onChange={(e) => handleChange("precioVenta", Number(e.target.value))}
                placeholder="300000"
              />
            </div>
            <div>
              <Label>Importe Arras (€) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={formData.importeArras || ""}
                  onChange={(e) => handleChange("importeArras", Number(e.target.value))}
                  placeholder="30000"
                />
                {formData.precioVenta > 0 && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Badge variant={arrasAltas ? "destructive" : "secondary"}>
                      {porcentajeArras}%
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>

          {arrasAltas && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-amber-700 dark:text-amber-400">
                El importe de arras supera el 10% del precio. Esto es inusual y puede
                requerir justificación adicional.
              </span>
            </div>
          )}

          <div>
            <Label>Forma de Pago de las Arras</Label>
            <Select
              value={formData.formaPagoArras}
              onValueChange={(v) => handleChange("formaPagoArras", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="al_firmar">Al firmar el contrato</SelectItem>
                <SelectItem value="posterior">Pago posterior</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <AnimatePresence>
            {formData.formaPagoArras === "posterior" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 p-4 rounded-lg bg-muted/30 border"
              >
                <p className="text-sm text-muted-foreground">
                  ⚠️ Se añadirá cláusula de condición resolutoria automática
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Plazo máximo (días)</Label>
                    <Input
                      type="number"
                      value={formData.plazoPago || ""}
                      onChange={(e) => handleChange("plazoPago", Number(e.target.value))}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label>O fecha límite</Label>
                    <Input
                      type="date"
                      value={formData.fechaLimitePago || ""}
                      onChange={(e) => handleChange("fechaLimitePago", e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>IBAN del Vendedor *</Label>
                  <Input
                    value={formData.ibanVendedor || ""}
                    onChange={(e) => handleChange("ibanVendedor", e.target.value)}
                    placeholder="ES00 0000 0000 0000 0000 0000"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Escritura Pública */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Escritura Pública
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Fecha Límite para Firma de Escritura *</Label>
            <Input
              type="date"
              value={formData.fechaLimiteEscritura}
              onChange={(e) => handleChange("fechaLimiteEscritura", e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Notaría (opcional)</Label>
              <Input
                value={formData.notariaNombre || ""}
                onChange={(e) => handleChange("notariaNombre", e.target.value)}
                placeholder="Nombre del Notario"
              />
            </div>
            <div>
              <Label>Dirección Notaría</Label>
              <Input
                value={formData.notariaDireccion || ""}
                onChange={(e) => handleChange("notariaDireccion", e.target.value)}
                placeholder="Dirección"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Otras Condiciones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Otras Condiciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Distribución de Gastos</Label>
              <Select
                value={formData.distribucionGastos}
                onValueChange={(v) => handleChange("distribucionGastos", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="segun_ley">Según Ley (Defecto)</SelectItem>
                  <SelectItem value="cargo_comprador">A cargo del Comprador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Resolución de Conflictos</Label>
              <Select
                value={formData.resolucionConflictos}
                onValueChange={(v) => handleChange("resolucionConflictos", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="juzgados">Juzgados Ordinarios</SelectItem>
                  <SelectItem value="arbitraje_notarial">Arbitraje Notarial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Firma Preferida</Label>
              <Select
                value={formData.firmaPreferida}
                onValueChange={(v) => handleChange("firmaPreferida", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronica">Electrónica</SelectItem>
                  <SelectItem value="manuscrita">Manuscrita</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Condición Suspensiva (opcional)</Label>
            <Textarea
              value={formData.condicionSuspensiva || ""}
              onChange={(e) => handleChange("condicionSuspensiva", e.target.value)}
              placeholder="Ej. Supeditado a la obtención de financiación hipotecaria..."
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      {/* Ámbito Avanzado (Solo si NO es modo estándar) */}
      <AnimatePresence>
        {!formData.modoEstandar && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-amber-500/30">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Ámbito Avanzado
                  <Badge variant="outline" className="ml-2">
                    Modo Personalizado
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Opciones que requieren cláusulas adicionales
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Inmueble con Hipoteca</Label>
                    <Switch
                      checked={formData.conHipoteca}
                      onCheckedChange={(c) => handleChange("conHipoteca", c)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Con Arrendatarios (Subrogación)</Label>
                    <Switch
                      checked={formData.conArrendatarios}
                      onCheckedChange={(c) => handleChange("conArrendatarios", c)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Mobiliario Incluido</Label>
                    <Switch
                      checked={formData.mobiliarioIncluido}
                      onCheckedChange={(c) => handleChange("mobiliarioIncluido", c)}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <Label>Retención Plusvalía/IBI</Label>
                    <Switch
                      checked={formData.retencionPlusvalia}
                      onCheckedChange={(c) => handleChange("retencionPlusvalia", c)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Manifestaciones del Vendedor */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Manifestaciones del Vendedor
          </CardTitle>
          <CardDescription>
            Declaraciones legales que el vendedor debe confirmar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { key: "cosaCierta", label: "El inmueble es cosa cierta y determinada" },
              { key: "libreOcupantes", label: "Está libre de ocupantes" },
              { key: "libreCargas", label: "Está libre de cargas y gravámenes" },
              { key: "corrientePagos", label: "Está al corriente de pagos (IBI, comunidad, suministros)" },
              { key: "certificadoEnergetico", label: "Dispone de certificado de eficiencia energética" },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center space-x-3">
                <Checkbox
                  id={key}
                  checked={!!formData[key as keyof Step2Data]}
                  onCheckedChange={(c) => handleChange(key as keyof Step2Data, c)}
                />
                <Label htmlFor={key} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button size="lg" onClick={handleSubmit}>
          Siguiente: Partes
        </Button>
      </div>
    </motion.div>
  );
};
