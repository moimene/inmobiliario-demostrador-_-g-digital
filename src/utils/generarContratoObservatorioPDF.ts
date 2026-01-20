import { jsPDF } from "jspdf";

interface ContratoObservatorioData {
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

export const generarContratoObservatorioPDF = (data: ContratoObservatorioData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 20;

  // Helper para añadir texto con wrap
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    const lines = doc.splitTextToSize(text, pageWidth - 40);
    doc.text(lines, 20, y);
    y += lines.length * (fontSize * 0.4) + 4;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  };

  // ========== PÁGINA 1: PORTADA ==========
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("CONTRATO DE COMPRAVENTA", pageWidth / 2, y, { align: "center" });
  y += 8;
  doc.text("CON ARRAS PENITENCIALES", pageWidth / 2, y, { align: "center" });
  y += 12;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(150, 100, 0);
  doc.text("Estándar del Observatorio Legaltech Garrigues-ICADE (versión 2.0)", pageWidth / 2, y, { align: "center" });
  y += 5;
  doc.text("Uso gratuito bajo licencia CC BY 4.0", pageWidth / 2, y, { align: "center" });
  doc.setTextColor(0, 0, 0);
  y += 15;

  // Explicación arras
  doc.setFillColor(255, 248, 230);
  doc.rect(15, y - 5, pageWidth - 30, 35, "F");
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("EXPLICACIÓN DE LAS ARRAS PENITENCIALES", 20, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  const explicacion = "Las arras penitenciales son una cantidad de dinero que una parte entrega a la otra al firmar un contrato de compraventa como garantía de que la operación se completará en el futuro con la firma de la escritura pública ante notario. Este tipo de arras permite a las partes desistir libremente del contrato, aunque con consecuencias económicas: si desiste el comprador, pierde las arras; si desiste el vendedor, debe devolverlas duplicadas.";
  const explLines = doc.splitTextToSize(explicacion, pageWidth - 50);
  doc.text(explLines, 20, y);
  y += explLines.length * 4 + 15;

  // Partes
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PARTES DEL CONTRATO", 20, y);
  y += 10;

  // Vendedor
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("VENDEDOR", 20, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${data.vendedor.nombre}`, 25, y); y += 5;
  doc.text(`DNI/NIE: ${data.vendedor.nif}`, 25, y); y += 5;
  doc.text(`Estado civil: ${data.vendedor.estadoCivil}`, 25, y); y += 5;
  doc.text(`Domicilio: ${data.vendedor.domicilio}`, 25, y); y += 5;
  doc.text(`Email: ${data.vendedor.email}`, 25, y); y += 10;

  // Comprador
  doc.setFont("helvetica", "bold");
  doc.text("COMPRADOR", 20, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${data.comprador.nombre}`, 25, y); y += 5;
  doc.text(`DNI/NIE: ${data.comprador.nif}`, 25, y); y += 5;
  doc.text(`Estado civil: ${data.comprador.estadoCivil}`, 25, y); y += 5;
  doc.text(`Domicilio: ${data.comprador.domicilio}`, 25, y); y += 5;
  doc.text(`Email: ${data.comprador.email}`, 25, y); y += 15;

  // Inmueble
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("VIVIENDA", 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Dirección: ${data.inmueble.direccion}`, 25, y); y += 5;
  const tituloLines = doc.splitTextToSize(`Título de adquisición: ${data.inmueble.tituloAdquisicion}`, pageWidth - 50);
  doc.text(tituloLines, 25, y); y += tituloLines.length * 4 + 2;
  doc.text(`Datos registrales: ${data.inmueble.datosRegistrales}`, 25, y); y += 5;
  doc.text(`Nota Simple: ${data.inmueble.notaSimple}`, 25, y); y += 5;
  doc.text(`Referencia catastral: ${data.inmueble.referenciaCatastral}`, 25, y); y += 15;

  // Condiciones económicas
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("CONDICIONES ECONÓMICAS", 20, y);
  y += 8;
  doc.setFontSize(11);
  doc.text(`Precio de Compra: ${formatCurrency(data.condiciones.precioCompra)}`, 25, y); y += 6;
  doc.setTextColor(180, 100, 0);
  doc.text(`Importe de las Arras: ${formatCurrency(data.condiciones.importeArras)}`, 25, y);
  doc.setTextColor(0, 0, 0);
  y += 6;
  const porcentaje = ((data.condiciones.importeArras / data.condiciones.precioCompra) * 100).toFixed(0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`(${porcentaje}% del precio de compra)`, 25, y); y += 10;

  // ========== PÁGINA 2 ==========
  doc.addPage();
  y = 20;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("FORMA DE PAGO Y ESCRITURA", 20, y);
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  if (data.condiciones.formaPagoArras === "momento_firma") {
    doc.text("[X] El pago de las arras se realiza en el momento de la firma del Contrato", 25, y);
  } else {
    doc.text("[X] El pago de las arras se realizará después de la firma del Contrato", 25, y);
    if (data.condiciones.plazoArras) {
      y += 5;
      doc.text(`    Plazo: ${data.condiciones.plazoArras} días desde la firma`, 25, y);
    }
  }
  y += 8;
  doc.text(`IBAN: ${data.condiciones.ibanVendedor}`, 25, y); y += 5;
  doc.text(`Banco: ${data.condiciones.bancoVendedor}`, 25, y); y += 10;

  doc.text(`Fecha Límite para Otorgar la Escritura: ${formatDate(data.condiciones.fechaLimiteEscritura)}`, 25, y); y += 5;
  const notarioLines = doc.splitTextToSize(`Notario: ${data.condiciones.notarioDesignado}`, pageWidth - 50);
  doc.text(notarioLines, 25, y); y += notarioLines.length * 4 + 10;

  // Otras condiciones
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("OTRAS CONDICIONES", 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const gastos = data.condiciones.distribucionGastos === "ley" 
    ? "El Vendedor asumirá los gastos de la escritura, y el comprador los de la primera copia, conforme a la ley"
    : "Por el Comprador";
  doc.text(`[X] Pago de gastos: ${gastos}`, 25, y); y += 8;

  const conflictos = data.condiciones.resolucionConflictos === "tribunales"
    ? "Juzgados y tribunales del lugar donde se encuentra la vivienda"
    : data.condiciones.resolucionConflictos === "arbitraje"
    ? "Arbitraje notarial de derecho"
    : "Electrónica";
  doc.text(`[X] Resolución de conflictos: ${conflictos}`, 25, y); y += 8;

  const firma = data.condiciones.tipoFirma === "electronica" ? "Electrónica" : "Manuscrita";
  doc.text(`[X] Tipo de firma: ${firma}`, 25, y); y += 15;

  // Anexos
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ANEXOS", 20, y);
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("1. Nota simple del Registro de la Propiedad", 25, y); y += 5;
  doc.text("2. Recibo del IBI", 25, y); y += 5;
  doc.text("3. Justificante de la transferencia", 25, y); y += 5;
  doc.text("4. Certificación energética", 25, y); y += 20;

  // ========== PÁGINA 3: TÉRMINOS ESTÁNDAR ==========
  doc.addPage();
  y = 20;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("TÉRMINOS ESTÁNDAR", pageWidth / 2, y, { align: "center" });
  y += 15;

  // Cláusula 1
  addText("1. OBJETO", 11, true);
  addText("El Vendedor vende la Vivienda al Comprador. La Vivienda se encuentra en buen estado de conservación y mantenimiento. Al firmar este contrato con arras penitenciales, las partes pueden desistir de la compraventa: si desiste el Comprador, pierde el Importe de las Arras; si desiste el Vendedor, tiene que devolver el Importe de las Arras duplicado.");
  y += 5;

  // Cláusula 2
  addText("2. OBLIGACIONES DEL COMPRADOR", 11, true);
  addText("El Comprador pagará el Precio de Compra (restándole el Importe de las Arras) al Vendedor mediante transferencia bancaria cuando se otorgue la escritura de compraventa. El Comprador comunicará al Vendedor la fecha del otorgamiento con 10 días de antelación a la Fecha Límite.");
  y += 5;

  // Cláusula 3
  addText("3. OBLIGACIONES DEL VENDEDOR", 11, true);
  addText("El Vendedor entregará al Comprador la propiedad de la Vivienda mediante la entrega de las llaves cuando se firme la escritura. Desde la firma de este contrato, el Vendedor se compromete a mantener la Vivienda en buen estado y no constituir cargas sin autorización del Comprador.");
  y += 5;

  // Cláusula 5
  addText("5. DESISTIMIENTO UNILATERAL", 11, true);
  addText("Desistimiento del Comprador: puede desistir unilateralmente desde la firma hasta la fecha de la escritura. Si lo hace, perderá el Importe de las Arras a favor del Vendedor.");
  addText("Desistimiento del Vendedor: puede desistir unilateralmente. En este caso, deberá devolver al Comprador el Importe de las Arras duplicado.");
  y += 5;

  // Cláusula 10
  addText("10. FIRMA ELECTRÓNICA", 11, true);
  addText("Las partes podrán firmar este contrato utilizando firmas electrónicas (simples, avanzadas o cualificadas), que tendrán los mismos efectos que una firma manuscrita.");

  // ========== PÁGINA FINAL: FIRMAS ==========
  doc.addPage();
  y = 20;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FIRMAS", pageWidth / 2, y, { align: "center" });
  y += 20;

  // Tabla vendedor
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("VENDEDOR", 30, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${data.vendedor.nombre}`, 30, y); y += 6;
  doc.text(`DNI/NIE: ${data.vendedor.nif}`, 30, y); y += 6;
  doc.text(`Estado civil: ${data.vendedor.estadoCivil}`, 30, y); y += 6;
  doc.text(`Domicilio: ${data.vendedor.domicilio}`, 30, y); y += 6;
  doc.text(`Email: ${data.vendedor.email}`, 30, y); y += 15;
  doc.text("Firma: ________________________________", 30, y); y += 8;
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 30, y); y += 25;

  // Tabla comprador
  doc.setFont("helvetica", "bold");
  doc.text("COMPRADOR", 30, y);
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${data.comprador.nombre}`, 30, y); y += 6;
  doc.text(`DNI/NIE: ${data.comprador.nif}`, 30, y); y += 6;
  doc.text(`Estado civil: ${data.comprador.estadoCivil}`, 30, y); y += 6;
  doc.text(`Domicilio: ${data.comprador.domicilio}`, 30, y); y += 6;
  doc.text(`Email: ${data.comprador.email}`, 30, y); y += 15;
  doc.text("Firma: ________________________________", 30, y); y += 8;
  doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 30, y);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Estándar del Observatorio Legaltech Garrigues-ICADE (versión 2.0) — Uso gratuito bajo CC BY 4.0", pageWidth / 2, 285, { align: "center" });

  // Guardar
  const fileName = `Contrato_Arras_Observatorio_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);

  return { fileName };
};
