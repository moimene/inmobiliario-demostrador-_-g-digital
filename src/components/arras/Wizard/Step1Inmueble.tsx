import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Building, MapPin, FileText, Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Anexo {
  id: string;
  tipo: "garaje" | "trastero";
  ubicacion: string;
  superficie: number;
  vinculacion: "ob_rem" | "independiente";
}

interface Step1Data {
  // Ubicación
  direccion: string;
  codigoPostal: string;
  ciudad: string;
  provincia: string;
  // Catastro
  referenciaCatastral: string;
  usoCatastral: string;
  superficieCatastral: number;
  anoConstruccion: number;
  // Registro
  numeroRegistro: string;
  localidadRegistro: string;
  numeroFinca: string;
  cruIdufir: string;
  tomo: string;
  libro: string;
  folio: string;
  // Características
  m2Construidos: number;
  m2Utiles: number;
  habitaciones: number;
  banos: number;
  tieneAscensor: boolean;
  descripcion: string;
  // Anexos
  anexos: Anexo[];
}

interface StepProps {
  onNext: (data: Partial<Step1Data>) => void;
  data: Partial<Step1Data>;
}

const PROVINCIAS_FORALES = ["Álava", "Vizcaya", "Guipúzcoa", "Navarra"];

export const Step1Inmueble = ({ onNext, data }: StepProps) => {
  const [formData, setFormData] = useState<Partial<Step1Data>>({
    // Datos realistas de una vivienda en Madrid
    direccion: "Calle Serrano 142, 3º B",
    codigoPostal: "28006",
    ciudad: "Madrid",
    provincia: "Madrid",
    referenciaCatastral: "9872023VK4797S0001WX",
    usoCatastral: "vivienda",
    superficieCatastral: 145,
    anoConstruccion: 1985,
    numeroRegistro: "28",
    localidadRegistro: "Madrid",
    numeroFinca: "15847",
    cruIdufir: "28040000158470",
    tomo: "2543",
    libro: "1876",
    folio: "124",
    m2Construidos: 145,
    m2Utiles: 128,
    habitaciones: 4,
    banos: 2,
    tieneAscensor: true,
    descripcion: "Luminoso piso exterior con orientación sur, reformado en 2019. Suelos de parquet, calefacción central y aire acondicionado por conductos. Armarios empotrados en todos los dormitorios.",
    anexos: [],
    ...data,
  });

  const [anexos, setAnexos] = useState<Anexo[]>(data.anexos || [
    {
      id: "anexo-garaje-1",
      tipo: "garaje",
      ubicacion: "Sótano -1, Plaza 23",
      superficie: 12,
      vinculacion: "ob_rem",
    },
    {
      id: "anexo-trastero-1",
      tipo: "trastero",
      ubicacion: "Sótano -2, Trastero 15",
      superficie: 8,
      vinculacion: "ob_rem",
    },
  ]);

  const esTerritorioForal = PROVINCIAS_FORALES.includes(formData.provincia || "");

  const handleChange = (field: keyof Step1Data, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addAnexo = () => {
    const nuevo: Anexo = {
      id: `anexo-${Date.now()}`,
      tipo: "garaje",
      ubicacion: "",
      superficie: 0,
      vinculacion: "ob_rem",
    };
    setAnexos([...anexos, nuevo]);
  };

  const removeAnexo = (id: string) => {
    setAnexos(anexos.filter((a) => a.id !== id));
  };

  const updateAnexo = (id: string, field: keyof Anexo, value: any) => {
    setAnexos(anexos.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const handleSubmit = () => {
    onNext({ ...formData, anexos });
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
          <Building className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Datos del Inmueble</h2>
          <p className="text-muted-foreground text-sm">
            Define el objeto físico y jurídico del contrato
          </p>
        </div>
      </div>

      {/* Alerta Territorio Foral */}
      <AnimatePresence>
        {esTerritorioForal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="border-amber-500/50 bg-amber-500/10">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-700 dark:text-amber-400">
                    Territorio Foral Detectado
                  </p>
                  <p className="text-sm text-muted-foreground">
                    La provincia seleccionada tiene derecho foral. El modelo estándar puede
                    requerir revisión por un profesional especializado.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sección Ubicación */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Ubicación
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Dirección Completa *</Label>
            <Input
              value={formData.direccion}
              onChange={(e) => handleChange("direccion", e.target.value)}
              placeholder="Calle, número, piso, puerta"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>Código Postal *</Label>
              <Input
                value={formData.codigoPostal}
                onChange={(e) => handleChange("codigoPostal", e.target.value)}
                placeholder="28001"
                maxLength={5}
              />
            </div>
            <div>
              <Label>Ciudad *</Label>
              <Input
                value={formData.ciudad}
                onChange={(e) => handleChange("ciudad", e.target.value)}
                placeholder="Madrid"
              />
            </div>
            <div className="col-span-2">
              <Label>Provincia *</Label>
              <Select
                value={formData.provincia}
                onValueChange={(v) => handleChange("provincia", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Madrid">Madrid</SelectItem>
                  <SelectItem value="Barcelona">Barcelona</SelectItem>
                  <SelectItem value="Valencia">Valencia</SelectItem>
                  <SelectItem value="Sevilla">Sevilla</SelectItem>
                  <SelectItem value="Álava">Álava</SelectItem>
                  <SelectItem value="Vizcaya">Vizcaya</SelectItem>
                  <SelectItem value="Guipúzcoa">Guipúzcoa</SelectItem>
                  <SelectItem value="Navarra">Navarra</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección Catastro */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Datos Catastrales
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Label>Referencia Catastral *</Label>
              <Input
                value={formData.referenciaCatastral}
                onChange={(e) => handleChange("referenciaCatastral", e.target.value)}
                placeholder="14-20 caracteres"
                maxLength={20}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Formato: 14-20 caracteres alfanuméricos
              </p>
            </div>
            <Button variant="outline" className="mt-6">
              Validar Catastro
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Uso</Label>
              <Select
                value={formData.usoCatastral}
                onValueChange={(v) => handleChange("usoCatastral", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vivienda">Vivienda</SelectItem>
                  <SelectItem value="local">Local Comercial</SelectItem>
                  <SelectItem value="oficina">Oficina</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Superficie (m²)</Label>
              <Input
                type="number"
                value={formData.superficieCatastral || ""}
                onChange={(e) => handleChange("superficieCatastral", Number(e.target.value))}
                placeholder="120"
              />
            </div>
            <div>
              <Label>Año Construcción</Label>
              <Input
                type="number"
                value={formData.anoConstruccion || ""}
                onChange={(e) => handleChange("anoConstruccion", Number(e.target.value))}
                placeholder="1990"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección Registro */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Datos Registrales
            <Badge variant="secondary" className="ml-2">
              Crítico para escritura
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Nº Registro de la Propiedad</Label>
              <Input
                value={formData.numeroRegistro}
                onChange={(e) => handleChange("numeroRegistro", e.target.value)}
                placeholder="Ej. 12"
              />
            </div>
            <div>
              <Label>Localidad del Registro</Label>
              <Input
                value={formData.localidadRegistro}
                onChange={(e) => handleChange("localidadRegistro", e.target.value)}
                placeholder="Madrid"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Número de Finca *</Label>
              <Input
                value={formData.numeroFinca}
                onChange={(e) => handleChange("numeroFinca", e.target.value)}
                placeholder="12345"
              />
            </div>
            <div>
              <Label>CRU / IDUFIR</Label>
              <Input
                value={formData.cruIdufir}
                onChange={(e) => handleChange("cruIdufir", e.target.value)}
                placeholder="Código Registral Único"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label>Tomo</Label>
              <Input
                value={formData.tomo}
                onChange={(e) => handleChange("tomo", e.target.value)}
                placeholder="1234"
              />
            </div>
            <div>
              <Label>Libro</Label>
              <Input
                value={formData.libro}
                onChange={(e) => handleChange("libro", e.target.value)}
                placeholder="567"
              />
            </div>
            <div>
              <Label>Folio</Label>
              <Input
                value={formData.folio}
                onChange={(e) => handleChange("folio", e.target.value)}
                placeholder="89"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sección Características */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Características</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label>M² Construidos</Label>
              <Input
                type="number"
                value={formData.m2Construidos || ""}
                onChange={(e) => handleChange("m2Construidos", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>M² Útiles</Label>
              <Input
                type="number"
                value={formData.m2Utiles || ""}
                onChange={(e) => handleChange("m2Utiles", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Habitaciones</Label>
              <Input
                type="number"
                value={formData.habitaciones || ""}
                onChange={(e) => handleChange("habitaciones", Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Baños</Label>
              <Input
                type="number"
                value={formData.banos || ""}
                onChange={(e) => handleChange("banos", Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>Descripción Adicional</Label>
            <Textarea
              value={formData.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Descripción libre del inmueble..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Sección Anexos */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Anexos (Garajes / Trasteros)</CardTitle>
            <Button variant="outline" size="sm" onClick={addAnexo}>
              <Plus className="h-4 w-4 mr-1" />
              Añadir Anexo
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence>
            {anexos.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No hay anexos registrados
              </p>
            ) : (
              <div className="space-y-4">
                {anexos.map((anexo, idx) => (
                  <motion.div
                    key={anexo.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Anexo {idx + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAnexo(anexo.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <Label>Tipo</Label>
                        <Select
                          value={anexo.tipo}
                          onValueChange={(v) => updateAnexo(anexo.id, "tipo", v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="garaje">Garaje</SelectItem>
                            <SelectItem value="trastero">Trastero</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Ubicación</Label>
                        <Input
                          value={anexo.ubicacion}
                          onChange={(e) => updateAnexo(anexo.id, "ubicacion", e.target.value)}
                          placeholder="Sótano -1, plaza 15"
                        />
                      </div>
                      <div>
                        <Label>Superficie (m²)</Label>
                        <Input
                          type="number"
                          value={anexo.superficie || ""}
                          onChange={(e) =>
                            updateAnexo(anexo.id, "superficie", Number(e.target.value))
                          }
                        />
                      </div>
                      <div>
                        <Label>Vinculación</Label>
                        <Select
                          value={anexo.vinculacion}
                          onValueChange={(v) => updateAnexo(anexo.id, "vinculacion", v)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ob_rem">Ob rem (inseparable)</SelectItem>
                            <SelectItem value="independiente">Independiente</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSubmit}>
          Siguiente: Acuerdo
        </Button>
      </div>
    </motion.div>
  );
};
