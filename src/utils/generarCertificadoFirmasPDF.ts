import jsPDF from "jspdf";

interface FirmanteCertificado {
  id: string;
  nombre: string;
  nif: string;
  email: string;
  telefono: string;
  rol: "vendedor" | "comprador";
  metodoVerificacion?: "sms" | "email" | "certificado";
  timestampFirma?: string;
  hashFirma?: string;
}

interface DatosContratoCertificado {
  idExpediente: string;
  tituloContrato: string;
  hashDocumento: string;
  timestampCreacion: string;
  inmueble: {
    direccion: string;
    referenciaCatastral: string;
  };
  importeArras: number;
}

export const generarCertificadoFirmasPDF = (
  firmantes: FirmanteCertificado[],
  datosContrato: DatosContratoCertificado
): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper functions
  const addCenteredText = (text: string, fontSize: number, isBold = false) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.text(text, pageWidth / 2, y, { align: "center" });
    y += fontSize * 0.5;
  };

  const addText = (text: string, fontSize: number, isBold = false, color: number[] = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);
    doc.text(text, margin, y);
    y += fontSize * 0.5;
    doc.setTextColor(0, 0, 0);
  };

  const addKeyValue = (key: string, value: string, fontSize = 10) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "bold");
    doc.text(key, margin, y);
    doc.setFont("helvetica", "normal");
    const keyWidth = doc.getTextWidth(key + " ");
    doc.text(value, margin + keyWidth, y);
    y += fontSize * 0.6;
  };

  const addSeparator = () => {
    y += 3;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;
  };

  const addBox = (content: () => void, bgColor: number[] = [248, 250, 252]) => {
    const startY = y;
    y += 5;
    content();
    const endY = y + 5;
    doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
    doc.roundedRect(margin - 5, startY, contentWidth + 10, endY - startY, 3, 3, "F");
    // Re-render content on top of box
    y = startY + 5;
    content();
    y = endY + 5;
  };

  // ============ HEADER ============
  // Border frame
  doc.setDrawColor(34, 139, 34);
  doc.setLineWidth(2);
  doc.rect(10, 10, pageWidth - 20, doc.internal.pageSize.getHeight() - 20);

  // Title
  y = 30;
  doc.setFillColor(34, 139, 34);
  doc.rect(margin, y - 8, contentWidth, 25, "F");
  doc.setTextColor(255, 255, 255);
  addCenteredText("CERTIFICADO DE EVIDENCIA DE FIRMA ELECTRÓNICA", 14, true);
  y += 5;
  addCenteredText("Firma Electrónica Cualificada - Reglamento eIDAS", 10, false);
  doc.setTextColor(0, 0, 0);
  y += 15;

  // Certificate ID
  const certificadoId = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  addCenteredText(`Nº Certificado: ${certificadoId}`, 9, false);
  y += 5;
  addCenteredText(`Fecha de emisión: ${new Date().toLocaleString("es-ES")}`, 9, false);
  y += 10;

  addSeparator();

  // ============ QTSP INFO ============
  addText("PROVEEDOR DE SERVICIOS DE CONFIANZA CUALIFICADO (QTSP)", 11, true, [34, 139, 34]);
  y += 3;
  addKeyValue("Prestador:", "EADTrust - European Agency of Digital Trust");
  addKeyValue("NIF:", "B-12345678");
  addKeyValue("Registro MINECO:", "Prestador Cualificado según Reglamento (UE) 910/2014");
  addKeyValue("Servicios:", "Firma electrónica cualificada, Sellado de tiempo cualificado");
  y += 5;

  addSeparator();

  // ============ DOCUMENT INFO ============
  addText("INFORMACIÓN DEL DOCUMENTO", 11, true, [34, 139, 34]);
  y += 3;
  addKeyValue("ID Expediente:", datosContrato.idExpediente);
  addKeyValue("Tipo de contrato:", datosContrato.tituloContrato);
  addKeyValue("Inmueble:", datosContrato.inmueble.direccion);
  addKeyValue("Ref. Catastral:", datosContrato.inmueble.referenciaCatastral);
  addKeyValue("Importe arras:", `${datosContrato.importeArras.toLocaleString("es-ES")} €`);
  y += 3;
  
  // Document hash box
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(margin, y, contentWidth, 18, 2, 2, "F");
  y += 5;
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("Hash SHA-256 del documento:", margin + 5, y);
  y += 5;
  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  doc.text(datosContrato.hashDocumento, margin + 5, y);
  y += 3;
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.text(`Timestamp creación: ${datosContrato.timestampCreacion}`, margin + 5, y);
  y += 15;

  addSeparator();

  // ============ SIGNATURES ============
  addText("REGISTRO DE FIRMAS ELECTRÓNICAS CUALIFICADAS", 11, true, [34, 139, 34]);
  y += 5;

  firmantes.forEach((firmante, index) => {
    // Firmante box
    const boxStartY = y;
    doc.setFillColor(firmante.rol === "vendedor" ? 255 : 240, firmante.rol === "vendedor" ? 248 : 248, firmante.rol === "vendedor" ? 240 : 255);
    doc.roundedRect(margin, y, contentWidth, 45, 3, 3, "F");
    
    // Border color based on role
    doc.setDrawColor(firmante.rol === "vendedor" ? 234 : 59, firmante.rol === "vendedor" ? 88 : 130, firmante.rol === "vendedor" ? 12 : 246);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 45, 3, 3, "S");
    
    y += 8;
    
    // Firmante header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`FIRMANTE ${index + 1}: ${firmante.rol.toUpperCase()}`, margin + 5, y);
    
    // Status badge
    doc.setFillColor(34, 139, 34);
    doc.roundedRect(pageWidth - margin - 45, y - 5, 40, 8, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(7);
    doc.text("✓ FIRMADO", pageWidth - margin - 40, y - 0.5);
    doc.setTextColor(0, 0, 0);
    
    y += 6;
    
    // Firmante details
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Nombre: ${firmante.nombre}`, margin + 5, y);
    doc.text(`NIF: ${firmante.nif}`, margin + 100, y);
    y += 5;
    doc.text(`Email: ${firmante.email}`, margin + 5, y);
    doc.text(`Tel: ${firmante.telefono}`, margin + 100, y);
    y += 5;
    doc.text(`Verificación: ${firmante.metodoVerificacion?.toUpperCase() || "OTP"}`, margin + 5, y);
    y += 6;
    
    // Hash and timestamp
    doc.setFillColor(230, 255, 230);
    doc.roundedRect(margin + 3, y - 2, contentWidth - 6, 12, 2, 2, "F");
    doc.setFontSize(7);
    doc.setFont("courier", "normal");
    doc.text(`Hash firma: ${firmante.hashFirma || "N/A"}`, margin + 5, y + 2);
    y += 5;
    doc.text(`Timestamp: ${firmante.timestampFirma ? new Date(firmante.timestampFirma).toISOString() : "N/A"}`, margin + 5, y + 2);
    
    y = boxStartY + 50;
  });

  y += 5;
  addSeparator();

  // ============ LEGAL DECLARATION ============
  addText("DECLARACIÓN DE CONFORMIDAD eIDAS", 11, true, [34, 139, 34]);
  y += 5;
  
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const declaracion = [
    "Este certificado acredita que las firmas electrónicas indicadas han sido creadas mediante un servicio",
    "de firma electrónica cualificada conforme al Reglamento (UE) 910/2014 (eIDAS), cumpliendo con:",
    "",
    "• Art. 25.2: Las firmas tienen el efecto jurídico equivalente a una firma manuscrita",
    "• Art. 42: Sellado de tiempo cualificado que garantiza la fecha y hora exacta de cada firma",
    "• Art. 24: Verificación de identidad de los firmantes mediante métodos cualificados",
    "",
    "La integridad del documento se garantiza mediante hash criptográfico SHA-256."
  ];
  
  declaracion.forEach(line => {
    doc.text(line, margin, y);
    y += 4;
  });

  y += 10;

  // ============ VERIFICATION QR PLACEHOLDER ============
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, 40, 40, 3, 3, "F");
  doc.setDrawColor(200, 200, 200);
  doc.roundedRect(margin, y, 40, 40, 3, 3, "S");
  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  doc.text("QR Verificación", margin + 7, y + 22);
  doc.setTextColor(0, 0, 0);
  
  doc.setFontSize(8);
  doc.text("Para verificar la autenticidad de este certificado:", margin + 50, y + 10);
  doc.text("https://verify.eadtrust.eu/cert/" + certificadoId, margin + 50, y + 18);
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text("Este certificado es válido únicamente en formato electrónico.", margin + 50, y + 28);
  doc.text("La impresión en papel no tiene validez legal.", margin + 50, y + 34);

  // ============ FOOTER ============
  const footerY = doc.internal.pageSize.getHeight() - 25;
  doc.setDrawColor(34, 139, 34);
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageWidth - margin, footerY);
  
  doc.setFontSize(7);
  doc.setTextColor(100, 100, 100);
  doc.text("Documento generado automáticamente por el sistema Chrono-Flare CLM", pageWidth / 2, footerY + 5, { align: "center" });
  doc.text("Integración con EADTrust - European Agency of Digital Trust", pageWidth / 2, footerY + 9, { align: "center" });
  doc.text(`ID: ${certificadoId} | Generado: ${new Date().toISOString()}`, pageWidth / 2, footerY + 13, { align: "center" });

  // Save
  doc.save(`certificado-firmas-${datosContrato.idExpediente}.pdf`);
};
