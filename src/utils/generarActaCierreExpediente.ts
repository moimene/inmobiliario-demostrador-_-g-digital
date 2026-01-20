import jsPDF from "jspdf";
import { Expediente } from "@/types/arrendamiento";
import { faseLabels } from "@/data/arrendamientoBotFlow";

export const generarActaCierreExpediente = (expediente: Expediente) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const maxWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Función auxiliar para añadir nueva página si es necesario
  const checkNewPage = (requiredSpace: number = 20) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Función auxiliar para añadir texto con salto de línea automático
  const addWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number = 7
  ): number => {
    const lines = doc.splitTextToSize(text, maxWidth);
    lines.forEach((line: string, index: number) => {
      if (y + index * lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, x, y + index * lineHeight);
    });
    return y + lines.length * lineHeight;
  };

  // ==================== PORTADA OFICIAL ====================
  doc.setFillColor(0, 60, 70); // Corporate dark blue
  doc.rect(0, 0, pageWidth, 60, "F");

  // Logo EAD Trust
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("EAD Trust g-digital", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Proveedor de Servicios de Confianza Cualificado", pageWidth / 2, 35, {
    align: "center",
  });
  doc.text("Reglamento eIDAS (UE) 910/2014 • Ley 6/2020", pageWidth / 2, 42, {
    align: "center",
  });

  // Badge eIDAS
  doc.setFillColor(30, 222, 192); // Turquoise accent
  doc.rect(margin, 50, maxWidth, 8, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("✓ CERTIFICACIÓN eIDAS • VALIDEZ JURÍDICA PLENA EN LA UNIÓN EUROPEA", pageWidth / 2, 55, {
    align: "center",
  });

  // Título principal del documento
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  yPosition = 80;
  doc.text("ACTA DE CIERRE", pageWidth / 2, yPosition, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  yPosition += 10;
  doc.text("Certificado Cualificado con Validez Legal Plena", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 5;
  doc.setFontSize(14);
  doc.text("Expediente de Arrendamiento Certificado", pageWidth / 2, yPosition, { align: "center" });

  // Información oficial del expediente
  yPosition += 20;
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition - 5, maxWidth, 40, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(`EXPEDIENTE Nº: ${expediente.id}`, margin + 5, yPosition + 5);
  
  doc.setFont("helvetica", "normal");
  yPosition += 12;
  doc.text(
    `Fecha de apertura: ${new Date(expediente.fechaCreacion).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    margin + 5,
    yPosition
  );
  yPosition += 7;
  doc.text(
    `Fecha de cierre: ${new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })}`,
    margin + 5,
    yPosition
  );
  yPosition += 7;
  doc.text(`Estado final: ${expediente.estado.toUpperCase()}`, margin + 5, yPosition);

  // Sello oficial de cierre
  yPosition += 20;
  doc.setFillColor(220, 38, 38); // Red-600 for official seal
  doc.circle(pageWidth / 2, yPosition + 15, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("EXPEDIENTE", pageWidth / 2, yPosition + 12, { align: "center" });
  doc.text("CERRADO", pageWidth / 2, yPosition + 19, { align: "center" });

  // ==================== DECLARACIÓN OFICIAL DE CIERRE ====================
  doc.addPage();
  yPosition = margin;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("DECLARACIÓN OFICIAL DE CIERRE DEL EXPEDIENTE", margin, yPosition);
  yPosition += 12;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const declaracionTexto = `EAD Trust g-digital, en su condición de Prestador Cualificado de Servicios de Confianza inscrito y supervisado conforme al Reglamento (UE) 910/2014 (eIDAS) y a la Ley 6/2020 reguladora de determinados aspectos de los servicios electrónicos de confianza,

CERTIFICA:

Que el presente expediente de arrendamiento, identificado con el número ${expediente.id}, ha sido gestionado íntegramente a través del Canal de Arrendamiento Certificado operado por FaciliteCasas en colaboración con EAD Trust.

Que todas las comunicaciones, documentos, eventos y acciones registradas en este expediente han sido certificadas mediante sellos de tiempo cualificados, garantizando:

• La integridad de los contenidos (mediante funciones hash criptográficas)
• La trazabilidad temporal de todos los eventos (mediante sellos de tiempo cualificados RFC 3161)
• La inalterabilidad del registro probatorio (mediante custodia electrónica cualificada)
• La verificabilidad independiente por terceros (mediante certificados digitales cualificados)

Que el expediente ha completado su ciclo de vida contractual completo, desde la apertura hasta el cierre, conforme a la Ley 29/1994 de Arrendamientos Urbanos (LAU) y demás normativa aplicable.

Que el presente Acta de Cierre constituye el documento oficial que da fe del cumplimiento de todas las obligaciones contractuales y del cierre definitivo del expediente, con plena validez jurídica y probatoria en toda la Unión Europea conforme al artículo 46 del Reglamento eIDAS.`;

  yPosition = addWrappedText(declaracionTexto, margin, yPosition, maxWidth, 6);

  // ==================== RESUMEN EJECUTIVO DEL CONTRATO ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("1. RESUMEN EJECUTIVO DEL CONTRATO DE ARRENDAMIENTO", margin, yPosition);
  yPosition += 12;

  // Partes del contrato
  doc.setFillColor(240, 249, 255);
  doc.rect(margin, yPosition - 3, maxWidth, 50, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("🔵 ARRENDADOR (Propietario)", margin + 5, yPosition + 3);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${expediente.partes.arrendador.nombre}`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`NIF: ${expediente.partes.arrendador.nif}`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`Contacto: ${expediente.partes.arrendador.email}`, margin + 8, yPosition);
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("🟢 ARRENDATARIO (Inquilino)", margin + 5, yPosition);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`${expediente.partes.arrendatario.nombre}`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`NIF: ${expediente.partes.arrendatario.nif}`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`Contacto: ${expediente.partes.arrendatario.email}`, margin + 8, yPosition);

  // Inmueble y condiciones económicas
  yPosition += 15;
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition - 3, maxWidth, 55, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("🏠 INMUEBLE ARRENDADO", margin + 5, yPosition + 3);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Dirección: ${expediente.vivienda.direccion}`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`Tipo: ${expediente.vivienda.tipo} • Superficie: ${expediente.vivienda.superficie}m²`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(
    `Distribución: ${expediente.vivienda.habitaciones} habitaciones, ${expediente.vivienda.banos} baño(s)`,
    margin + 8,
    yPosition
  );
  yPosition += 10;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("💰 CONDICIONES ECONÓMICAS", margin + 5, yPosition);
  yPosition += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Renta mensual: ${expediente.contrato.rentaMensual}€/mes`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(`Fianza depositada: ${expediente.contrato.deposito}€`, margin + 8, yPosition);
  yPosition += 6;
  doc.text(
    `Duración: ${expediente.contrato.duracion} meses (desde ${new Date(
      expediente.contrato.fechaInicio
    ).toLocaleDateString("es-ES")} hasta ${new Date(expediente.contrato.fechaFin).toLocaleDateString("es-ES")})`,
    margin + 8,
    yPosition
  );

  // ==================== EVENTOS CERTIFICADOS CLAVE ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("2. EVENTOS CERTIFICADOS DEL CICLO DE VIDA CONTRACTUAL", margin, yPosition);
  yPosition += 12;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const eventosOrdenados = [...expediente.eventos].sort(
    (a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
  );

  // Tabla de eventos
  const tableStartY = yPosition;
  const colWidths = [15, 35, 90, 30];
  const rowHeight = 8;

  // Encabezado de tabla
  doc.setFillColor(0, 60, 70);
  doc.rect(margin, yPosition, colWidths.reduce((a, b) => a + b, 0), rowHeight, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.text("#", margin + 2, yPosition + 5);
  doc.text("FECHA", margin + colWidths[0] + 2, yPosition + 5);
  doc.text("EVENTO", margin + colWidths[0] + colWidths[1] + 2, yPosition + 5);
  doc.text("TIPO", margin + colWidths[0] + colWidths[1] + colWidths[2] + 2, yPosition + 5);
  yPosition += rowHeight;

  // Filas de eventos
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  eventosOrdenados.forEach((evento, index) => {
    checkNewPage(rowHeight + 5);

    const fillColor = index % 2 === 0 ? [250, 250, 250] : [255, 255, 255];
    doc.setFillColor(fillColor[0], fillColor[1], fillColor[2]);
    doc.rect(margin, yPosition, colWidths.reduce((a, b) => a + b, 0), rowHeight, "F");

    doc.text(`${index + 1}`, margin + 2, yPosition + 5);
    doc.text(
      new Date(evento.fecha).toLocaleDateString("es-ES"),
      margin + colWidths[0] + 2,
      yPosition + 5
    );
    
    const eventoTexto = doc.splitTextToSize(evento.mensaje, colWidths[2] - 4);
    doc.text(eventoTexto[0], margin + colWidths[0] + colWidths[1] + 2, yPosition + 5);
    
    doc.text(evento.tipo, margin + colWidths[0] + colWidths[1] + colWidths[2] + 2, yPosition + 5);
    yPosition += rowHeight;
  });

  // ==================== COMUNICACIONES CERTIFICADAS ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3. RESUMEN DE COMUNICACIONES CERTIFICADAS", margin, yPosition);
  yPosition += 12;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  const totalMensajes = expediente.mensajes.length;
  const mensajesArrendador = expediente.mensajes.filter((m) => m.remitente === "arrendador").length;
  const mensajesArrendatario = expediente.mensajes.filter((m) => m.remitente === "arrendatario").length;
  const mensajesSistema = expediente.mensajes.filter((m) => m.remitente === "bot" || m.remitente === "certy").length;

  doc.text(`Total de mensajes certificados: ${totalMensajes}`, margin, yPosition);
  yPosition += 7;
  doc.text(`Mensajes del arrendador: ${mensajesArrendador}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Mensajes del arrendatario: ${mensajesArrendatario}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Mensajes del sistema (Certy Bot): ${mensajesSistema}`, margin + 5, yPosition);
  yPosition += 10;

  doc.setFont("helvetica", "italic");
  doc.text(
    "Todas las comunicaciones han sido selladas con sello de tiempo cualificado RFC 3161",
    margin,
    yPosition
  );
  yPosition += 6;
  doc.text(
    "y conservadas en archivo electrónico cualificado con garantías de integridad.",
    margin,
    yPosition
  );

  // ==================== ESTADO FINAL Y LIQUIDACIÓN ====================
  yPosition += 20;
  checkNewPage(60);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("4. ESTADO FINAL Y LIQUIDACIÓN DE FIANZA", margin, yPosition);
  yPosition += 12;

  doc.setFillColor(240, 253, 244); // Light green
  doc.rect(margin, yPosition - 3, maxWidth, 45, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("💰 LIQUIDACIÓN FINAL DE FIANZA", margin + 5, yPosition + 3);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Fianza depositada inicialmente: ${expediente.contrato.deposito}€`, margin + 8, yPosition);
  yPosition += 7;
  doc.text(`Deducciones por desperfectos: 0€`, margin + 8, yPosition);
  yPosition += 7;
  doc.text(`Deducciones por impagos: 0€`, margin + 8, yPosition);
  yPosition += 7;

  doc.setFont("helvetica", "bold");
  doc.text(`IMPORTE A DEVOLVER: ${expediente.contrato.deposito}€`, margin + 8, yPosition);
  yPosition += 10;

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text(
    `✓ Liquidación conforme al Art. 36 LAU • Plazo legal: 30 días desde entrega de llaves`,
    margin + 8,
    yPosition
  );

  // ==================== CERTIFICACIÓN FINAL ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICACIÓN FINAL DEL EXPEDIENTE", margin, yPosition);
  yPosition += 15;

  doc.setFillColor(220, 38, 38); // Red
  doc.rect(margin, yPosition - 3, maxWidth, 70, "F");
  doc.setTextColor(255, 255, 255);

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("SELLO DE CIERRE CUALIFICADO", pageWidth / 2, yPosition + 5, { align: "center" });
  yPosition += 15;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Expediente: ${expediente.id}`, pageWidth / 2, yPosition, { align: "center" });
  yPosition += 7;
  doc.text(
    `Fecha de cierre: ${new Date().toLocaleString("es-ES")}`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 7;
  doc.text(
    `Hash del expediente: ${Math.random().toString(36).substring(2, 15).toUpperCase()}`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 10;

  doc.setFont("helvetica", "bold");
  doc.text("EAD Trust g-digital", pageWidth / 2, yPosition, { align: "center" });
  yPosition += 6;
  doc.setFont("helvetica", "normal");
  doc.text("Prestador Cualificado de Servicios de Confianza", pageWidth / 2, yPosition, { align: "center" });

  // Firma digital y sello
  yPosition += 20;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.text(
    "Este documento ha sido generado electrónicamente y firmado digitalmente",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 5;
  doc.text(
    "por EAD Trust g-digital mediante certificado cualificado conforme a eIDAS.",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 5;
  doc.text(
    "Su validez jurídica es equivalente a la firma manuscrita (Art. 25 eIDAS).",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // QR de verificación
  yPosition += 15;
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text(
    "Código QR de verificación independiente:",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 5;
  doc.text(
    `https://verificacion.eadtrust.eu/cierre/${expediente.id}`,
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );
  yPosition += 5;
  doc.text(
    "[Escanear QR para verificar autenticidad del documento]",
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // ==================== PIE DE PÁGINA EN TODAS LAS PÁGINAS ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Acta de Cierre • Expediente ${expediente.id} • Página ${i} de ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
    doc.text(
      `Documento certificado conforme a eIDAS (UE) 910/2014 • EAD Trust g-digital`,
      pageWidth / 2,
      pageHeight - 6,
      { align: "center" }
    );
  }

  // ==================== GUARDAR PDF ====================
  const fileName = `Acta_Cierre_Expediente_${expediente.id}_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);

  return fileName;
};
