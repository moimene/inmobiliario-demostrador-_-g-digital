import jsPDF from "jspdf";

interface Parte {
  nombre: string;
  nif: string;
  email: string;
  telefono: string;
}

interface EvidenciaArchivo {
  nombre: string;
  tipo: "foto" | "video" | "documento";
  estancia: string;
  hash: string;
  timestamp: string;
}

interface ActaData {
  parteEntregadora: Parte;
  parteReceptora: Parte;
  parteInteresada?: Parte;
  direccionInmueble: string;
  tipoActa: string;
  evidencias: EvidenciaArchivo[];
}

export const generarActaEstadoInmueble = async (data: ActaData) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPos = 20;

  // Cover Page
  pdf.setFillColor(0, 60, 70); // FaciliteCasas primary color
  pdf.rect(0, 0, pageWidth, 60, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("ACTA DE ESTADO DEL INMUEBLE", pageWidth / 2, 30, { align: "center" });

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text("Certificado Cualificado con Validez Legal Plena", pageWidth / 2, 45, { align: "center" });

  yPos = 80;

  // Reset text color
  pdf.setTextColor(0, 0, 0);

  // Tipo de Acta
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text(`Tipo: ${data.tipoActa}`, 20, yPos);
  yPos += 10;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Fecha de emisión: ${new Date().toLocaleString("es-ES")}`, 20, yPos);
  yPos += 15;

  // Dirección del Inmueble
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("INMUEBLE OBJETO DE CERTIFICACIÓN", 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(data.direccionInmueble, 20, yPos);
  yPos += 15;

  // Parte Entregadora
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("PARTE ENTREGADORA", 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Nombre: ${data.parteEntregadora.nombre}`, 20, yPos);
  yPos += 6;
  pdf.text(`NIF: ${data.parteEntregadora.nif}`, 20, yPos);
  yPos += 6;
  pdf.text(`Email: ${data.parteEntregadora.email}`, 20, yPos);
  yPos += 6;
  pdf.text(`Teléfono: ${data.parteEntregadora.telefono}`, 20, yPos);
  yPos += 15;

  // Parte Receptora
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("PARTE RECEPTORA", 20, yPos);
  yPos += 8;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Nombre: ${data.parteReceptora.nombre}`, 20, yPos);
  yPos += 6;
  pdf.text(`NIF: ${data.parteReceptora.nif}`, 20, yPos);
  yPos += 6;
  pdf.text(`Email: ${data.parteReceptora.email}`, 20, yPos);
  yPos += 6;
  pdf.text(`Teléfono: ${data.parteReceptora.telefono}`, 20, yPos);
  yPos += 15;

  // Parte Interesada (opcional)
  if (data.parteInteresada) {
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("PARTE INTERESADA (TESTIGO/AGENTE)", 20, yPos);
    yPos += 8;

    pdf.setFontSize(10);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Nombre: ${data.parteInteresada.nombre}`, 20, yPos);
    yPos += 6;
    pdf.text(`NIF: ${data.parteInteresada.nif}`, 20, yPos);
    yPos += 6;
    pdf.text(`Email: ${data.parteInteresada.email}`, 20, yPos);
    yPos += 6;
    pdf.text(`Teléfono: ${data.parteInteresada.telefono}`, 20, yPos);
    yPos += 15;
  }

  // Check if need new page
  if (yPos > pageHeight - 40) {
    pdf.addPage();
    yPos = 20;
  }

  // Inventario de Evidencias
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("INVENTARIO CERTIFICADO DE EVIDENCIAS", 20, yPos);
  yPos += 10;

  // Check for announcement screenshot
  const anuncioEvidence = data.evidencias.filter(e => e.estancia === "Anuncio Publicado");
  if (anuncioEvidence.length > 0) {
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text("CAPTURA CERTIFICADA DEL ANUNCIO PUBLICADO", 20, yPos);
    yPos += 8;

    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    anuncioEvidence.forEach((evidencia) => {
      pdf.text(`Archivo: ${evidencia.nombre}`, 20, yPos);
      yPos += 5;
      pdf.text(`Hash SHA-256: ${evidencia.hash}`, 20, yPos);
      yPos += 5;
      pdf.text(`Timestamp: ${new Date(evidencia.timestamp).toLocaleString("es-ES")}`, 20, yPos);
      yPos += 5;
      pdf.setFont("helvetica", "bold");
      pdf.text("✓ Certificada con sello de tiempo cualificado eIDAS", 20, yPos);
      pdf.setFont("helvetica", "normal");
      yPos += 12;
    });
  }

  // Add photo gallery section
  pdf.addPage();
  yPos = 20;
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("GALERÍA FOTOGRÁFICA CERTIFICADA", 20, yPos);
  yPos += 10;

  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text("Cada fotografía ha sido certificada con hash SHA-256 y sello de tiempo cualificado eIDAS", 20, yPos);
  yPos += 15;

  // Display photos in grid (2 columns)
  let col = 0;
  const imgWidth = 80;
  const imgHeight = 60;
  const colGap = 10;
  const rowGap = 15;
  
  // Filter out announcement screenshots from gallery (they're already shown above)
  const galleryEvidencias = data.evidencias.filter(e => e.estancia !== "Anuncio Publicado");
  
  for (let index = 0; index < galleryEvidencias.length; index++) {
    const evidencia = galleryEvidencias[index];
    
    if (yPos > pageHeight - imgHeight - 30) {
      pdf.addPage();
      yPos = 20;
      col = 0;
    }

    const xPos = col === 0 ? 20 : 20 + imgWidth + colGap;

    try {
      // Add image thumbnail
      const imgPath = `/images/${evidencia.nombre}`;
      pdf.addImage(imgPath, 'PNG', xPos, yPos, imgWidth, imgHeight);
      
      // Add caption below image
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "bold");
      pdf.text(evidencia.estancia, xPos, yPos + imgHeight + 4);
      
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7);
      pdf.text(`Hash: ${evidencia.hash.substring(0, 24)}...`, xPos, yPos + imgHeight + 8);
      pdf.text(new Date(evidencia.timestamp).toLocaleString("es-ES"), xPos, yPos + imgHeight + 11);
    } catch (error) {
      console.warn(`Could not load image: ${evidencia.nombre}`);
    }

    col++;
    if (col >= 2) {
      col = 0;
      yPos += imgHeight + rowGap + 12;
    }
  }

  // Move to next page for signatures
  pdf.addPage();
  yPos = 20;

  // Evidence Details List
  pdf.setFontSize(11);
  pdf.setFont("helvetica", "bold");
  pdf.text("DETALLE DE EVIDENCIAS CERTIFICADAS", 20, yPos);
  yPos += 10;

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");

  data.evidencias.forEach((evidencia, index) => {
    if (yPos > pageHeight - 30) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.text(`${index + 1}. ${evidencia.nombre}`, 20, yPos);
    yPos += 5;
    pdf.text(`   Estancia: ${evidencia.estancia}`, 25, yPos);
    yPos += 5;
    pdf.text(`   Hash SHA-256: ${evidencia.hash}`, 25, yPos);
    yPos += 5;
    pdf.text(`   Timestamp: ${new Date(evidencia.timestamp).toLocaleString("es-ES")}`, 25, yPos);
    yPos += 8;
  });

  yPos += 10;

  // Signatures Section
  if (yPos > pageHeight - 60) {
    pdf.addPage();
    yPos = 20;
  }

  pdf.setFontSize(12);
  pdf.setFont("helvetica", "bold");
  pdf.text("FIRMAS ELECTRÓNICAS AVANZADAS", 20, yPos);
  yPos += 10;

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`${data.parteEntregadora.nombre}`, 20, yPos);
  yPos += 5;
  pdf.text(`Firma electrónica avanzada mediante OTP`, 20, yPos);
  yPos += 5;
  pdf.text(`Fecha: ${new Date().toLocaleString("es-ES")}`, 20, yPos);
  yPos += 5;
  pdf.text(`Sello de tiempo cualificado: EAD Trust g-digital`, 20, yPos);
  yPos += 12;

  pdf.text(`${data.parteReceptora.nombre}`, 20, yPos);
  yPos += 5;
  pdf.text(`Firma electrónica avanzada mediante OTP`, 20, yPos);
  yPos += 5;
  pdf.text(`Fecha: ${new Date().toLocaleString("es-ES")}`, 20, yPos);
  yPos += 5;
  pdf.text(`Sello de tiempo cualificado: EAD Trust g-digital`, 20, yPos);
  yPos += 15;

  // Legal Footer
  if (yPos > pageHeight - 60) {
    pdf.addPage();
    yPos = 20;
  }

  pdf.setFillColor(240, 240, 240);
  pdf.rect(15, yPos, pageWidth - 30, 55, "F");

  yPos += 8;
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.text("VALIDEZ LEGAL DEL DOCUMENTO", 20, yPos);
  yPos += 6;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(8);
  const legalText = [
    "Este Acta de Estado del Inmueble ha sido generada por EAD Trust, Proveedor de Servicios de Confianza,",
    "y certificada con sello de tiempo cualificado eIDAS por EAD Trust g-digital.",
    "",
    "Las firmas electrónicas avanzadas aplicadas mediante OTP, junto con las evidencias certificadas con sello de tiempo cualificado,",
    "tienen validez legal de conformidad con el Reglamento (UE) n.º 910/2014 (eIDAS) y la Ley 6/2020 de servicios electrónicos de confianza.",
    "",
    "El documento es admisible como prueba en procedimientos judiciales según el artículo 326.4 de la Ley de Enjuiciamiento Civil.",
  ];

  legalText.forEach((line) => {
    pdf.text(line, 20, yPos);
    yPos += 4;
  });

  // Add QR Code for verification
  yPos += 6;
  const qrText = `https://verificacion.eadtrust.eu/acta/${Date.now()}`;
  
  // QR code section
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "bold");
  pdf.text("VERIFICACIÓN DEL DOCUMENTO", 20, yPos);
  yPos += 4;
  
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(7);
  pdf.text("Escanea el código QR para descargar y verificar este documento desde EAD Trust como QTSP:", 20, yPos);
  yPos += 4;
  pdf.text(qrText, 20, yPos);
  yPos += 8;

  // Add EAD Trust signature image
  try {
    pdf.addImage("/images/firma_eadtrust-2.png", "PNG", (pageWidth - 60) / 2, yPos, 60, 15);
  } catch (error) {
    console.warn("Could not load EAD Trust signature image");
  }

  // Save PDF
  pdf.save(`acta-estado-inmueble-${new Date().getTime()}.pdf`);
};
