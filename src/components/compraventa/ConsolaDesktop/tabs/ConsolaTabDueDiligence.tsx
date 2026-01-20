import { useCompraventa } from "@/contexts/CompraventaContext";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileCheck, CheckCircle2, Clock } from "lucide-react";

const documentosDueDiligence = [
  { id: "nota_simple", label: "Nota Simple del Registro" },
  { id: "cedula_habitabilidad", label: "Cédula de Habitabilidad" },
  { id: "certificado_energetico", label: "Certificado Energético" },
  { id: "ibi", label: "Recibo IBI (Impuesto de Bienes Inmuebles)" },
  { id: "gastos_comunidad", label: "Certificado de Gastos de Comunidad" },
  { id: "estatutos_comunidad", label: "Estatutos de la Comunidad de Propietarios" },
  { id: "libro_edificio", label: "Libro del Edificio (ITE, si aplica)" },
];

export const ConsolaTabDueDiligence = () => {
  const { expediente } = useCompraventa();

  // Simular que algunos documentos están subidos
  const documentosSubidos = expediente.mensajes
    .filter((m) => m.tipo === "usuario" && m.adjuntos && m.adjuntos.length > 0)
    .flatMap((m) => m.adjuntos?.map((adj) => adj.nombre) || []);

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-slate-900/50">
      <Card className="bg-slate-900 border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <FileCheck className="h-6 w-6 text-purple-400" />
          <h2 className="text-xl font-bold text-slate-100">Due Diligence Completa</h2>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          Documentación legal requerida para validar la compraventa del inmueble. Todos los
          documentos son certificados con sellos de tiempo cualificados por EAD Trust.
        </p>

        <div className="space-y-3">
          {documentosDueDiligence.map((doc, index) => {
            const estaSubido = documentosSubidos.some((nombre) =>
              nombre.toLowerCase().includes(doc.id)
            );
            const simularSubido = index < 4; // Simular que los primeros 4 están subidos

            return (
              <Card
                key={doc.id}
                className={`p-4 border ${
                  estaSubido || simularSubido
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-slate-800/50 border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    {estaSubido || simularSubido ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <Clock className="h-5 w-5 text-slate-400" />
                    )}
                    <div>
                      <p className="font-medium text-slate-100">{doc.label}</p>
                      {(estaSubido || simularSubido) && (
                        <p className="text-xs text-green-300 mt-1">
                          ✓ Certificado con sello de tiempo cualificado
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      estaSubido || simularSubido
                        ? "bg-green-500/20 text-green-300 border-green-500/30"
                        : "bg-slate-500/20 text-slate-400 border-slate-600"
                    }
                  >
                    {estaSubido || simularSubido ? "Verificado" : "Pendiente"}
                  </Badge>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      <Card className="bg-slate-900 border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-100 mb-4">
          Resumen de Documentación
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-2xl font-bold text-green-300">4</p>
            <p className="text-xs text-slate-400">Documentos Verificados</p>
          </div>
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <p className="text-2xl font-bold text-amber-300">3</p>
            <p className="text-xs text-slate-400">Pendientes</p>
          </div>
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-2xl font-bold text-slate-100">7</p>
            <p className="text-xs text-slate-400">Total Documentos</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
