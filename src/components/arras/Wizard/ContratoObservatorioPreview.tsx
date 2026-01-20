import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, ExternalLink } from "lucide-react";

interface ContratoPreviewProps {
  vendedor: {
    nombre: string;
    nif: string;
    estadoCivil: string;
    domicilio: string;
    email: string;
  };
  comprador: {
    nombre: string;
    nif: string;
    estadoCivil: string;
    domicilio: string;
    email: string;
  };
  inmueble: {
    direccion: string;
    tituloAdquisicion: string;
    datosRegistrales: string;
    notaSimple: string;
    referenciaCatastral: string;
  };
  condiciones: {
    precioCompra: number;
    importeArras: number;
    formaPagoArras: "momento_firma" | "posterior";
    plazoArras?: number;
    fechaLimitePagoArras?: string;
    ibanVendedor: string;
    bancoVendedor: string;
    fechaLimiteEscritura: string;
    notarioDesignado: string;
    distribucionGastos: "ley" | "comprador";
    resolucionConflictos: "tribunales" | "arbitraje" | "electronica";
    tipoFirma: "manuscrita" | "electronica";
  };
}

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const ContratoObservatorioPreview: React.FC<ContratoPreviewProps> = ({
  vendedor,
  comprador,
  inmueble,
  condiciones,
}) => {
  return (
    <div className="bg-white text-gray-900 p-8 max-h-[70vh] overflow-y-auto space-y-6 rounded-lg shadow-inner border">
      {/* Cabecera */}
      <div className="text-center space-y-2 pb-4 border-b-2 border-amber-500">
        <h1 className="text-2xl font-bold text-gray-800">
          Contrato de compraventa con arras penitenciales
        </h1>
        <div className="flex items-center justify-center gap-2">
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
            Estándar Observatorio Legaltech Garrigues-ICADE v2.0
          </Badge>
          <a
            href="https://www.comillas.edu/investigacion/observatorio-legaltech/foro-ktech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 hover:text-amber-700"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
        <p className="text-xs text-gray-500">
          Uso gratuito bajo licencia CC BY 4.0
        </p>
      </div>

      {/* Explicación Arras Penitenciales */}
      <Card className="bg-amber-50 border-amber-200 p-4">
        <h2 className="font-semibold text-amber-800 mb-2">
          EXPLICACIÓN DE LAS ARRAS PENITENCIALES
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          Las arras penitenciales son una cantidad de dinero que una parte
          entrega a la otra al firmar un contrato de compraventa como garantía
          de que la operación se completará en el futuro con la firma de la
          escritura pública ante notario. Este tipo de arras permite a las
          partes desistir libremente del contrato antes de formalizar la
          compraventa, aunque con consecuencias económicas: si quien desiste es
          la parte compradora, pierde las arras entregadas; si quien desiste es
          la parte vendedora, deberá devolverlas duplicadas.
        </p>
      </Card>

      {/* Condiciones de uso */}
      <Card className="bg-blue-50 border-blue-200 p-4">
        <h2 className="font-semibold text-blue-800 mb-2">
          CONDICIONES PARA USAR ESTE CONTRATO
        </h2>
        <div className="text-sm text-gray-700 space-y-1">
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Compraventa de vivienda entre personas físicas
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Vivienda ubicada en España (Derecho Civil Común)
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Sin hipoteca pendiente
          </p>
          <p className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            Sin arrendatarios
          </p>
        </div>
      </Card>

      <Separator />

      {/* PORTADA - Datos de las partes */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b pb-2">PORTADA</h2>

        {/* Tipo de vendedor */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-primary">
            <h3 className="font-semibold text-primary mb-2">VENDEDOR</h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-500">Nombre:</span>{" "}
                <strong>{vendedor.nombre}</strong>
              </p>
              <p>
                <span className="text-gray-500">DNI/NIE:</span> {vendedor.nif}
              </p>
              <p>
                <span className="text-gray-500">Estado civil:</span>{" "}
                {vendedor.estadoCivil}
              </p>
              <p>
                <span className="text-gray-500">Domicilio:</span>{" "}
                {vendedor.domicilio}
              </p>
              <p>
                <span className="text-gray-500">Email:</span> {vendedor.email}
              </p>
            </div>
          </Card>

          <Card className="p-4 border-l-4 border-l-secondary">
            <h3 className="font-semibold text-secondary-foreground mb-2">
              COMPRADOR
            </h3>
            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-500">Nombre:</span>{" "}
                <strong>{comprador.nombre}</strong>
              </p>
              <p>
                <span className="text-gray-500">DNI/NIE:</span> {comprador.nif}
              </p>
              <p>
                <span className="text-gray-500">Estado civil:</span>{" "}
                {comprador.estadoCivil}
              </p>
              <p>
                <span className="text-gray-500">Domicilio:</span>{" "}
                {comprador.domicilio}
              </p>
              <p>
                <span className="text-gray-500">Email:</span> {comprador.email}
              </p>
            </div>
          </Card>
        </div>

        {/* Datos del inmueble */}
        <Card className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-3">VIVIENDA</h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500 font-medium">Dirección:</span>{" "}
              {inmueble.direccion}
            </p>
            <p>
              <span className="text-gray-500 font-medium">
                Título de adquisición del Vendedor:
              </span>{" "}
              {inmueble.tituloAdquisicion}
            </p>
            <p>
              <span className="text-gray-500 font-medium">
                Datos registrales:
              </span>{" "}
              {inmueble.datosRegistrales}
            </p>
            <p>
              <span className="text-gray-500 font-medium">Nota Simple:</span>{" "}
              {inmueble.notaSimple}
            </p>
            <p>
              <span className="text-gray-500 font-medium">
                Referencia catastral:
              </span>{" "}
              {inmueble.referenciaCatastral}
            </p>
          </div>
        </Card>

        {/* Condiciones económicas */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h3 className="font-semibold text-green-800 mb-3">
            CONDICIONES ECONÓMICAS
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Precio de Compra:</p>
              <p className="text-2xl font-bold text-green-700">
                {formatCurrency(condiciones.precioCompra)}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Importe de las Arras:</p>
              <p className="text-2xl font-bold text-amber-700">
                {formatCurrency(condiciones.importeArras)}
              </p>
              <p className="text-xs text-gray-500">
                (
                {(
                  (condiciones.importeArras / condiciones.precioCompra) *
                  100
                ).toFixed(0)}
                % del precio)
              </p>
            </div>
          </div>
        </Card>

        {/* Forma de pago */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">FORMA DE PAGO DE LAS ARRAS</h3>
          <div className="text-sm space-y-2">
            {condiciones.formaPagoArras === "momento_firma" ? (
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                El pago de las arras se realiza en el momento de la firma del
                Contrato
              </p>
            ) : (
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  El pago de las arras se realizará después de la firma del
                  Contrato
                </p>
                {condiciones.plazoArras && (
                  <p className="text-gray-600 ml-6">
                    Plazo: {condiciones.plazoArras} días desde la firma
                  </p>
                )}
                {condiciones.fechaLimitePagoArras && (
                  <p className="text-gray-600 ml-6">
                    Fecha límite: {formatDate(condiciones.fechaLimitePagoArras)}
                  </p>
                )}
              </div>
            )}
            <p>
              <span className="text-gray-500">IBAN:</span>{" "}
              {condiciones.ibanVendedor}
            </p>
            <p>
              <span className="text-gray-500">Banco:</span>{" "}
              {condiciones.bancoVendedor}
            </p>
          </div>
        </Card>

        {/* Escritura */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3">OTORGAMIENTO DE ESCRITURA</h3>
          <div className="text-sm space-y-2">
            <p>
              <span className="text-gray-500">Fecha límite:</span>{" "}
              <strong>{formatDate(condiciones.fechaLimiteEscritura)}</strong>
            </p>
            <p>
              <span className="text-gray-500">Notario designado:</span>{" "}
              {condiciones.notarioDesignado}
            </p>
          </div>
        </Card>

        {/* Otras condiciones */}
        <Card className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-3">OTRAS CONDICIONES</h3>
          <div className="text-sm space-y-2">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-gray-500">Pago de gastos:</span>
              {condiciones.distribucionGastos === "ley"
                ? " El Vendedor asumirá los gastos de la escritura, y el comprador los de la primera copia, conforme a la ley"
                : " Por el Comprador"}
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-gray-500">Resolución de conflictos:</span>
              {condiciones.resolucionConflictos === "tribunales"
                ? " Juzgados y tribunales del lugar donde se encuentra la vivienda"
                : condiciones.resolucionConflictos === "arbitraje"
                ? " Arbitraje notarial de derecho"
                : " Electrónica"}
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-gray-500">Firma:</span>
              {condiciones.tipoFirma === "electronica"
                ? " Electrónica (simple, avanzada o cualificada)"
                : " Manuscrita"}
            </p>
          </div>
        </Card>
      </section>

      <Separator />

      {/* Términos Estándar - Resumen */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold border-b pb-2">
          TÉRMINOS ESTÁNDAR (Resumen)
        </h2>

        <div className="text-sm space-y-4 text-gray-700">
          <div>
            <h4 className="font-semibold text-gray-800">1. OBJETO</h4>
            <p>
              El Vendedor vende la Vivienda al Comprador. La entrega de la
              Vivienda y la transmisión de su propiedad se harán en el momento
              de otorgar la escritura pública de compraventa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              2. OBLIGACIONES DEL COMPRADOR
            </h4>
            <p>
              Pagar el Precio de Compra (restando las Arras) mediante
              transferencia bancaria al otorgar la escritura. Comunicar la fecha
              del otorgamiento con 10 días de antelación.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              3. OBLIGACIONES DEL VENDEDOR
            </h4>
            <p>
              Entregar la propiedad mediante la entrega de las llaves.
              Mantener la vivienda en buen estado y no constituir cargas sin
              autorización del Comprador.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">
              5. DESISTIMIENTO UNILATERAL
            </h4>
            <p>
              <strong>Si desiste el Comprador:</strong> pierde el Importe de las
              Arras.
              <br />
              <strong>Si desiste el Vendedor:</strong> devuelve las Arras
              duplicadas.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-800">10. FIRMA ELECTRÓNICA</h4>
            <p>
              Las partes podrán firmar este contrato utilizando firmas
              electrónicas (simples, avanzadas o cualificadas), que tendrán los
              mismos efectos que una firma manuscrita.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Anexos */}
      <section className="space-y-2">
        <h2 className="text-lg font-bold border-b pb-2">ANEXOS</h2>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-1">
          <li>Nota simple del Registro de la Propiedad</li>
          <li>Recibo del IBI</li>
          <li>Justificante de la transferencia</li>
          <li>Certificación energética</li>
        </ol>
      </section>

      {/* Pie */}
      <div className="text-center pt-4 border-t text-xs text-gray-500">
        <p>
          Estándar del Observatorio Legaltech Garrigues-ICADE (versión 2.0)
        </p>
        <p>Uso gratuito bajo licencia CC BY 4.0</p>
      </div>
    </div>
  );
};
