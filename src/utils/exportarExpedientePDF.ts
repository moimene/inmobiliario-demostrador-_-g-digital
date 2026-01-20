import jsPDF from "jspdf";
import { Expediente } from "@/types/arrendamiento";
import { faseLabels } from "@/data/arrendamientoBotFlow";

export const exportarExpedientePDF = (expediente: Expediente) => {
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

  // ==================== PORTADA CORPORATIVA ====================
  // Banda superior con color corporativo
  doc.setFillColor(0, 60, 70); // FaciliteCasas primary #003c46
  doc.rect(0, 0, pageWidth, 60, "F");

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

  // Título del documento
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  yPosition = 80;
  doc.text("EXPEDIENTE PROBATORIO CERTIFICADO", pageWidth / 2, yPosition, { align: "center" });

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  yPosition += 10;
  doc.text("Certificado Cualificado con Validez Legal Plena", pageWidth / 2, yPosition, { align: "center" });
  
  yPosition += 5;
  doc.setFontSize(14);
  doc.text("Canal de Arrendamiento Digital", pageWidth / 2, yPosition, { align: "center" });

  // Información del expediente
  yPosition += 20;
  doc.setFillColor(245, 245, 245); // Light gray background
  doc.rect(margin, yPosition - 5, maxWidth, 35, "F");
  
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 0, 0);
  doc.text(`EXPEDIENTE Nº: ${expediente.id}`, margin + 5, yPosition + 5);
  
  doc.setFont("helvetica", "normal");
  yPosition += 12;
  doc.text(
    `Fecha de creación: ${new Date(expediente.fechaCreacion).toLocaleString("es-ES")}`,
    margin + 5,
    yPosition
  );
  yPosition += 7;
  doc.text(`Fase actual: ${faseLabels[expediente.fase]}`, margin + 5, yPosition);
  yPosition += 7;
  doc.text(`Estado: ${expediente.estado.toUpperCase()}`, margin + 5, yPosition);

  // Sello "EXPEDIENTE CERTIFICADO"
  yPosition += 20;
  doc.setFillColor(0, 60, 70); // Primary color
  doc.circle(pageWidth / 2, yPosition + 15, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("EXPEDIENTE", pageWidth / 2, yPosition + 12, { align: "center" });
  doc.text("CERTIFICADO", pageWidth / 2, yPosition + 19, { align: "center" });
  
  // Certificación eIDAS
  yPosition += 45;
  doc.setFillColor(240, 253, 244); // Light green
  doc.rect(margin, yPosition - 5, maxWidth, 30, "F");
  doc.setTextColor(0, 60, 70);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("✓ CERTIFICACIÓN CONFORME A REGLAMENTO eIDAS (UE) 910/2014", margin + 5, yPosition + 3);
  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    "Todos los eventos, mensajes y documentos incluyen sello de tiempo cualificado.",
    margin + 5,
    yPosition + 12
  );
  doc.text("Este expediente tiene plena validez probatoria jurídica en toda la Unión Europea.", margin + 5, yPosition + 19);

  // ==================== DATOS DE LAS PARTES ====================
  doc.addPage();
  yPosition = margin;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("1. DATOS DE LAS PARTES", margin, yPosition);
  yPosition += 10;

  // Arrendador
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("🔵 ARRENDADOR", margin, yPosition);
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${expediente.partes.arrendador.nombre}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`NIF: ${expediente.partes.arrendador.nif}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Email: ${expediente.partes.arrendador.email}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Teléfono: ${expediente.partes.arrendador.telefono}`, margin + 5, yPosition);
  yPosition += 10;

  // Arrendatario
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("🟢 ARRENDATARIO", margin, yPosition);
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Nombre: ${expediente.partes.arrendatario.nombre}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`NIF: ${expediente.partes.arrendatario.nif}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Email: ${expediente.partes.arrendatario.email}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Teléfono: ${expediente.partes.arrendatario.telefono}`, margin + 5, yPosition);

  // ==================== DATOS DEL INMUEBLE Y CONTRATO ====================
  yPosition += 15;
  checkNewPage(50);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("2. DATOS DEL INMUEBLE Y CONTRATO", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.text("🏠 INMUEBLE", margin, yPosition);
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Dirección: ${expediente.vivienda.direccion}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Tipo: ${expediente.vivienda.tipo}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Superficie: ${expediente.vivienda.superficie} m²`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Habitaciones: ${expediente.vivienda.habitaciones}`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Baños: ${expediente.vivienda.banos}`, margin + 5, yPosition);
  yPosition += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("📄 CONTRATO", margin, yPosition);
  yPosition += 7;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Fecha de inicio: ${new Date(expediente.contrato.fechaInicio).toLocaleDateString("es-ES")}`,
    margin + 5,
    yPosition
  );
  yPosition += 6;
  doc.text(
    `Fecha de fin: ${new Date(expediente.contrato.fechaFin).toLocaleDateString("es-ES")}`,
    margin + 5,
    yPosition
  );
  yPosition += 6;
  doc.text(`Renta mensual: ${expediente.contrato.rentaMensual}€/mes`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Depósito: ${expediente.contrato.deposito}€`, margin + 5, yPosition);
  yPosition += 6;
  doc.text(`Duración: ${expediente.contrato.duracion} meses`, margin + 5, yPosition);

  // ==================== TIMELINE DE EVENTOS ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3. TIMELINE DE EVENTOS CERTIFICADOS", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");

  const eventosOrdenados = [...expediente.eventos].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  eventosOrdenados.forEach((evento, index) => {
    checkNewPage(25);

    doc.setFont("helvetica", "bold");
    doc.text(
      `${index + 1}. ${new Date(evento.fecha).toLocaleString("es-ES")}`,
      margin,
      yPosition
    );
    yPosition += 5;

    doc.setFont("helvetica", "normal");
    yPosition = addWrappedText(evento.mensaje, margin + 5, yPosition, maxWidth - 5, 5);
    yPosition += 2;

    doc.setTextColor(100, 100, 100);
    doc.text(`Tipo: ${evento.tipo}`, margin + 5, yPosition);
    yPosition += 4;
    doc.text(`ID Evento: ${evento.id}`, margin + 5, yPosition);
    yPosition += 7;

    doc.setTextColor(0, 0, 0);
  });

  // ==================== HISTORIAL DE MENSAJES CERTIFICADOS ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("4. HISTORIAL COMPLETO DE COMUNICACIONES CERTIFICADAS", margin, yPosition);
  yPosition += 10;

  doc.setFontSize(9);

  expediente.mensajes.forEach((mensaje, index) => {
    checkNewPage(30);

    // Encabezado del mensaje
    doc.setFont("helvetica", "bold");
    const remitenteLabel =
      mensaje.remitente === "bot"
        ? "🤖 Certy (Bot Certificador)"
        : mensaje.remitente === "arrendador"
        ? "🔵 Arrendador"
        : "🟢 Arrendatario";

    doc.text(
      `${index + 1}. ${remitenteLabel} - ${new Date(mensaje.timestamp).toLocaleString("es-ES")}`,
      margin,
      yPosition
    );
    yPosition += 5;

    // Contenido del mensaje
    doc.setFont("helvetica", "normal");
    yPosition = addWrappedText(mensaje.texto, margin + 5, yPosition, maxWidth - 5, 5);
    yPosition += 3;

    // Certificación
    doc.setTextColor(34, 197, 94); // Green
    doc.text("✓ CERTIFICADO", margin + 5, yPosition);
    yPosition += 4;
    doc.setTextColor(100, 100, 100);
    doc.text(`Hash: ${mensaje.hash}`, margin + 5, yPosition);
    yPosition += 4;
    doc.text(`Timestamp: ${mensaje.timestamp}`, margin + 5, yPosition);
    yPosition += 4;

    if (mensaje.requiereConfirmacion && mensaje.confirmadoPor) {
      doc.text(
        `Confirmado por: ${mensaje.confirmadoPor.join(", ")}`,
        margin + 5,
        yPosition
      );
      yPosition += 4;
    }

    if (mensaje.adjuntos && mensaje.adjuntos.length > 0) {
      doc.setTextColor(37, 99, 235); // Blue
      doc.text(
        `📎 Adjuntos: ${mensaje.adjuntos.length} archivo(s)`,
        margin + 5,
        yPosition
      );
      yPosition += 4;
    }

    yPosition += 5;
    doc.setTextColor(0, 0, 0);
  });

  // ==================== INVENTARIO ====================
  if (expediente.inventario.length > 0) {
    doc.addPage();
    yPosition = margin;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("5. INVENTARIO CERTIFICADO DEL INMUEBLE", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");

    expediente.inventario.forEach((item, index) => {
      checkNewPage(20);

      doc.setFont("helvetica", "bold");
      doc.text(`${index + 1}. ${item.estancia}`, margin, yPosition);
      yPosition += 5;

      doc.setFont("helvetica", "normal");
      yPosition = addWrappedText(item.descripcion, margin + 5, yPosition, maxWidth - 5, 5);
      yPosition += 3;

      doc.text(`Estado: ${item.estado}`, margin + 5, yPosition);
      yPosition += 5;
      doc.text(`Fotos certificadas: ${item.fotos.length}`, margin + 5, yPosition);
      yPosition += 8;
    });
  }

  // ==================== QR DE VERIFICACIÓN ====================
  doc.addPage();
  yPosition = margin;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("VERIFICACIÓN DEL EXPEDIENTE", margin, yPosition);
  yPosition += 12;
  
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Código QR de verificación independiente:", margin, yPosition);
  yPosition += 8;
  doc.text(`https://verificacion.eadtrust.eu/expediente/${expediente.id}`, margin, yPosition);
  yPosition += 8;
  doc.text("[Escanear QR para verificar autenticidad y descargar datos de verificación]", margin, yPosition);

  // ==================== PIE DE PÁGINA CORPORATIVO EN TODAS LAS PÁGINAS ====================
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Expediente Probatorio Certificado • Expediente ${expediente.id} • Página ${i} de ${totalPages}`,
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
  const fileName = `Expediente_${expediente.id}_${new Date().toISOString().split("T")[0]}.pdf`;
  doc.save(fileName);

  return fileName;
};
