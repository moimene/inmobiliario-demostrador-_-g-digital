import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, Building2, Plus, Trash2, AlertCircle, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PersonaFisica {
  id: string;
  tipo: "fisica";
  nombre: string;
  dni: string;
  estadoCivil: string;
  regimenEconomico?: string;
  domicilio: string;
  email: string;
  telefono: string;
  porcentaje: number;
}

interface PersonaJuridica {
  id: string;
  tipo: "juridica";
  razonSocial: string;
  cif: string;
  representante: string;
  cargoRepresentante: string;
  poderesRepresentante: string;
  datosRegistrales: string;
  domicilio: string;
  email: string;
  telefono: string;
  porcentaje: number;
}

type Persona = PersonaFisica | PersonaJuridica;

interface Step3Data {
  compradores: Persona[];
  vendedores: Persona[];
  terceros: { nombre: string; rol: string; email: string }[];
}

interface StepProps {
  onNext: (data: Partial<Step3Data>) => void;
  onBack: () => void;
  data: Partial<Step3Data>;
}

const ESTADOS_CIVILES = [
  { value: "soltero", label: "Soltero/a" },
  { value: "casado", label: "Casado/a" },
  { value: "divorciado", label: "Divorciado/a" },
  { value: "viudo", label: "Viudo/a" },
  { value: "pareja_hecho", label: "Pareja de hecho" },
];

const REGIMENES_ECONOMICOS = [
  { value: "gananciales", label: "Gananciales" },
  { value: "separacion", label: "Separación de bienes" },
  { value: "participacion", label: "Participación" },
];

export const Step3Partes = ({ onNext, onBack, data }: StepProps) => {
  const [compradores, setCompradores] = useState<Persona[]>(
    data.compradores || [createPersonaFisica("comprador")]
  );
  const [vendedores, setVendedores] = useState<Persona[]>(
    data.vendedores || [createPersonaFisica("vendedor")]
  );
  const [terceros, setTerceros] = useState<{ nombre: string; rol: string; email: string }[]>(
    data.terceros || []
  );

  function createPersonaFisica(prefix: string): PersonaFisica {
    return {
      id: `${prefix}-${Date.now()}`,
      tipo: "fisica",
      nombre: "",
      dni: "",
      estadoCivil: "soltero",
      domicilio: "",
      email: "",
      telefono: "",
      porcentaje: 100,
    };
  }

  function createPersonaJuridica(prefix: string): PersonaJuridica {
    return {
      id: `${prefix}-${Date.now()}`,
      tipo: "juridica",
      razonSocial: "",
      cif: "",
      representante: "",
      cargoRepresentante: "",
      poderesRepresentante: "",
      datosRegistrales: "",
      domicilio: "",
      email: "",
      telefono: "",
      porcentaje: 100,
    };
  }

  const addPersona = (rol: "comprador" | "vendedor", tipo: "fisica" | "juridica") => {
    const nueva = tipo === "fisica" ? createPersonaFisica(rol) : createPersonaJuridica(rol);
    if (rol === "comprador") {
      setCompradores([...compradores, nueva]);
    } else {
      setVendedores([...vendedores, nueva]);
    }
  };

  const removePersona = (rol: "comprador" | "vendedor", id: string) => {
    if (rol === "comprador") {
      setCompradores(compradores.filter((p) => p.id !== id));
    } else {
      setVendedores(vendedores.filter((p) => p.id !== id));
    }
  };

  const updatePersona = (
    rol: "comprador" | "vendedor",
    id: string,
    field: string,
    value: any
  ) => {
    const update = (personas: Persona[]) =>
      personas.map((p) => (p.id === id ? { ...p, [field]: value } : p));
    if (rol === "comprador") {
      setCompradores(update(compradores));
    } else {
      setVendedores(update(vendedores));
    }
  };

  const calcularTotalPorcentaje = (personas: Persona[]) =>
    personas.reduce((sum, p) => sum + (p.porcentaje || 0), 0);

  const totalCompradores = calcularTotalPorcentaje(compradores);
  const totalVendedores = calcularTotalPorcentaje(vendedores);

  const handleSubmit = () => {
    onNext({ compradores, vendedores, terceros });
  };

  const renderPersonaForm = (persona: Persona, rol: "comprador" | "vendedor", index: number) => {
    const esGananciales =
      persona.tipo === "fisica" &&
      (persona as PersonaFisica).estadoCivil === "casado" &&
      (persona as PersonaFisica).regimenEconomico === "gananciales";

    return (
      <motion.div
        key={persona.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="p-4 border rounded-lg bg-muted/20"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {persona.tipo === "fisica" ? (
              <User className="h-4 w-4 text-primary" />
            ) : (
              <Building2 className="h-4 w-4 text-primary" />
            )}
            <span className="font-medium">
              {rol === "comprador" ? "Comprador" : "Vendedor"} {index + 1}
            </span>
            <Badge variant="outline">
              {persona.tipo === "fisica" ? "Persona Física" : "Persona Jurídica"}
            </Badge>
          </div>
          {(rol === "comprador" ? compradores : vendedores).length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removePersona(rol, persona.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          )}
        </div>

        {persona.tipo === "fisica" ? (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre Completo *</Label>
                <Input
                  value={(persona as PersonaFisica).nombre}
                  onChange={(e) => updatePersona(rol, persona.id, "nombre", e.target.value)}
                  placeholder="Juan García López"
                />
              </div>
              <div>
                <Label>DNI/NIF *</Label>
                <Input
                  value={(persona as PersonaFisica).dni}
                  onChange={(e) => updatePersona(rol, persona.id, "dni", e.target.value)}
                  placeholder="12345678A"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Estado Civil</Label>
                <Select
                  value={(persona as PersonaFisica).estadoCivil}
                  onValueChange={(v) => updatePersona(rol, persona.id, "estadoCivil", v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ESTADOS_CIVILES.map((ec) => (
                      <SelectItem key={ec.value} value={ec.value}>
                        {ec.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {(persona as PersonaFisica).estadoCivil === "casado" && (
                <div>
                  <Label>Régimen Económico</Label>
                  <Select
                    value={(persona as PersonaFisica).regimenEconomico || ""}
                    onValueChange={(v) => updatePersona(rol, persona.id, "regimenEconomico", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIMENES_ECONOMICOS.map((re) => (
                        <SelectItem key={re.value} value={re.value}>
                          {re.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {esGananciales && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-amber-700 dark:text-amber-400">
                  En régimen de gananciales, el cónyuge deberá comparecer para la escritura.
                </span>
              </div>
            )}

            <div>
              <Label>Domicilio</Label>
              <Input
                value={(persona as PersonaFisica).domicilio}
                onChange={(e) => updatePersona(rol, persona.id, "domicilio", e.target.value)}
                placeholder="Calle, número, ciudad"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={(persona as PersonaFisica).email}
                  onChange={(e) => updatePersona(rol, persona.id, "email", e.target.value)}
                  placeholder="email@ejemplo.com"
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={(persona as PersonaFisica).telefono}
                  onChange={(e) => updatePersona(rol, persona.id, "telefono", e.target.value)}
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Razón Social *</Label>
                <Input
                  value={(persona as PersonaJuridica).razonSocial}
                  onChange={(e) => updatePersona(rol, persona.id, "razonSocial", e.target.value)}
                  placeholder="Empresa S.L."
                />
              </div>
              <div>
                <Label>CIF *</Label>
                <Input
                  value={(persona as PersonaJuridica).cif}
                  onChange={(e) => updatePersona(rol, persona.id, "cif", e.target.value)}
                  placeholder="B12345678"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label>Representante Legal *</Label>
                <Input
                  value={(persona as PersonaJuridica).representante}
                  onChange={(e) => updatePersona(rol, persona.id, "representante", e.target.value)}
                  placeholder="Nombre del representante"
                />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input
                  value={(persona as PersonaJuridica).cargoRepresentante}
                  onChange={(e) => updatePersona(rol, persona.id, "cargoRepresentante", e.target.value)}
                  placeholder="Administrador Único"
                />
              </div>
              <div>
                <Label>Poderes</Label>
                <Input
                  value={(persona as PersonaJuridica).poderesRepresentante}
                  onChange={(e) => updatePersona(rol, persona.id, "poderesRepresentante", e.target.value)}
                  placeholder="Escritura nº..."
                />
              </div>
            </div>

            <div>
              <Label>Datos Registrales</Label>
              <Input
                value={(persona as PersonaJuridica).datosRegistrales}
                onChange={(e) => updatePersona(rol, persona.id, "datosRegistrales", e.target.value)}
                placeholder="Registro Mercantil de..., Tomo..., Folio..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={(persona as PersonaJuridica).email}
                  onChange={(e) => updatePersona(rol, persona.id, "email", e.target.value)}
                />
              </div>
              <div>
                <Label>Teléfono</Label>
                <Input
                  value={(persona as PersonaJuridica).telefono}
                  onChange={(e) => updatePersona(rol, persona.id, "telefono", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Porcentaje de propiedad */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-4">
            <Percent className="h-4 w-4 text-muted-foreground" />
            <Label>Porcentaje de Propiedad</Label>
            <Input
              type="number"
              value={persona.porcentaje}
              onChange={(e) => updatePersona(rol, persona.id, "porcentaje", Number(e.target.value))}
              className="w-24"
              min={0}
              max={100}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
      </motion.div>
    );
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
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Identificación de Partes</h2>
          <p className="text-muted-foreground text-sm">
            Datos de compradores y vendedores que intervendrán en el contrato
          </p>
        </div>
      </div>

      <Tabs defaultValue="compradores" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="compradores" className="gap-2">
            Compradores
            <Badge variant={totalCompradores === 100 ? "default" : "destructive"}>
              {totalCompradores}%
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="vendedores" className="gap-2">
            Vendedores
            <Badge variant={totalVendedores === 100 ? "default" : "destructive"}>
              {totalVendedores}%
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compradores" className="space-y-4 mt-4">
          <AnimatePresence>
            {compradores.map((p, i) => renderPersonaForm(p, "comprador", i))}
          </AnimatePresence>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPersona("comprador", "fisica")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Añadir Persona Física
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPersona("comprador", "juridica")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Añadir Persona Jurídica
            </Button>
          </div>

          {totalCompradores !== 100 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">
                La suma de porcentajes debe ser 100% (actual: {totalCompradores}%)
              </span>
            </div>
          )}
        </TabsContent>

        <TabsContent value="vendedores" className="space-y-4 mt-4">
          <AnimatePresence>
            {vendedores.map((p, i) => renderPersonaForm(p, "vendedor", i))}
          </AnimatePresence>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPersona("vendedor", "fisica")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Añadir Persona Física
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addPersona("vendedor", "juridica")}
            >
              <Plus className="h-4 w-4 mr-1" />
              Añadir Persona Jurídica
            </Button>
          </div>

          {totalVendedores !== 100 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-destructive">
                La suma de porcentajes debe ser 100% (actual: {totalVendedores}%)
              </span>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Terceros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Terceros (Opcional)</CardTitle>
          <CardDescription>Agentes, asesores o notarías de contacto</CardDescription>
        </CardHeader>
        <CardContent>
          {terceros.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No hay terceros registrados
            </p>
          ) : (
            <div className="space-y-2">
              {terceros.map((t, i) => (
                <div key={i} className="flex items-center gap-4 p-2 border rounded">
                  <span className="flex-1">{t.nombre}</span>
                  <Badge variant="outline">{t.rol}</Badge>
                  <span className="text-sm text-muted-foreground">{t.email}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setTerceros(terceros.filter((_, idx) => idx !== i))}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() =>
              setTerceros([...terceros, { nombre: "", rol: "Agente", email: "" }])
            }
          >
            <Plus className="h-4 w-4 mr-1" />
            Añadir Tercero
          </Button>
        </CardContent>
      </Card>

      {/* Navegación */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Atrás
        </Button>
        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={totalCompradores !== 100 || totalVendedores !== 100}
        >
          Siguiente: Resumen
        </Button>
      </div>
    </motion.div>
  );
};
