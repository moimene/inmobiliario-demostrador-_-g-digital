import { useArras } from "@/contexts/ArrasContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { CertifiedBadge } from "@/components/arrendamiento/Shared/CertifiedBadge";

export const ConsolaTabContrato = () => {
  const { expediente } = useArras();

  return (
    <div className="p-6 space-y-6 bg-slate-950">
      <Card className="border-slate-700 bg-slate-900/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-slate-100 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Contrato de Arras Penitenciales
              </CardTitle>
              <CardDescription className="text-slate-400">
                Documento certificado con sello de tiempo cualificado eIDAS
              </CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Certificado
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Simulación de visor PDF */}
          <div className="border border-slate-700 rounded-lg bg-slate-800/30 aspect-[1/1.414] flex flex-col items-center justify-center p-8">
            <FileText className="h-16 w-16 text-slate-600 mb-4" />
            <p className="text-slate-400 text-center">Visor de PDF del contrato</p>
            <p className="text-xs text-slate-500 mt-2">
              Contrato_Arras_{expediente.inmueble.direccion.split(",")[0].replace(/\s/g, "_")}.pdf
            </p>
          </div>

          {/* Metadatos del contrato */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Hash del documento</p>
              <p className="font-mono text-xs text-slate-200 break-all">
                b4e9f3a7c2d8e1a5f6b9c3d7e2a4f8c1
              </p>
              <div className="mt-2">
                <CertifiedBadge hash="b4e9f3a7c2d8e1a5" compact />
              </div>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Sello temporal cualificado</p>
              <p className="font-mono text-xs text-slate-200">
                {new Date(expediente.fechaCreacion).toISOString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {new Date(expediente.fechaCreacion).toLocaleString("es-ES")}
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Firmado por</p>
              <p className="text-sm text-slate-200 font-semibold">
                {expediente.partes.vendedor.nombre}
              </p>
              <p className="text-sm text-slate-200 font-semibold mt-1">
                {expediente.partes.comprador.nombre}
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Estado del contrato</p>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                ✓ Firmado digitalmente
              </Badge>
              <p className="text-xs text-slate-500 mt-2">Validez jurídica conforme eIDAS</p>
            </div>
          </div>

          {/* Datos principales */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Precio de venta</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.precioVenta.toLocaleString("es-ES")}€
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Cantidad de arras</p>
              <p className="text-2xl font-bold text-slate-100">
                {expediente.contrato.cantidadArras.toLocaleString("es-ES")}€
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {expediente.contrato.porcentajeArras}% del precio
              </p>
            </div>

            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-400 mb-1">Tipo de depósito</p>
              <p className="text-lg font-bold text-slate-100 capitalize">
                {expediente.contrato.tipoDeposito}
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700">
            <p className="text-xs text-slate-400 mb-1">Plazo para escritura</p>
            <p className="text-sm font-semibold text-slate-100">
              {expediente.contrato.plazoEscritura} días (hasta{" "}
              {new Date(expediente.contrato.fechaLimiteEscritura).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              )
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
