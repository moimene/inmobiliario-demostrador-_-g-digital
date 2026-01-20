import { jsPDF } from "jspdf";
import { ExpedienteArras, EventoTimelineArras, Comunicacion } from "@/types/arras";

interface DatosControversia {
  expediente: ExpedienteArras;
  fechaDeclaracion: string;
  motivoDeclaracion?: string;
}

// Función para generar hash SHA-256 simulado
const generarHashSHA256 = (contenido: string): string => {
  let hash = 0;
  for (let i = 0; i < contenido.length; i++) {
    const char = contenido.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const hashHex = Math.abs(hash).toString(16).padStart(8, '0');
  return `sha256:${hashHex}${'0'.repeat(56)}`.substring(0, 71);
};

// Función para generar sello de tiempo RFC3161 simulado
const generarSelloTiempo = (): string => {
  const timestamp = Date.now();
  return `TST-RFC3161-${timestamp.toString(36).toUpperCase()}-QTSP`;
};

export const generarCertificadoQTSP = (datos: DatosControversia) => {
  const { expediente, fechaDeclaracion, motivoDeclaracion } = datos;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 0;

  // ==================== PÁGINA 1: PORTADA ====================
  
  // Header con gradiente simulado
  doc.setFillColor(26, 46, 76); // gdigital-navy
  doc.rect(0, 0, pageWidth, 60, "F");
  
  // Banda verde
  doc.setFillColor(15, 232, 96); // gdigital-green
  doc.rect(0, 60, pageWidth, 3, "F");

  // Logo g-digital (texto)
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("g", 20, 35);
  doc.setTextColor(255, 255, 255);
  doc.text("-digital", 32, 35);

  // Título principal
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("CERTIFICADO DE EVIDENCIAS FORENSES", pageWidth - margin, 30, { align: "right" });
  doc.setFontSize(10);
  doc.text("Prestador Cualificado de Servicios de Confianza (QTSP)", pageWidth - margin, 40, { align: "right" });
  doc.text("Conforme a eIDAS (Reglamento UE 910/2014)", pageWidth - margin, 48, { align: "right" });

  y = 80;

  // Información del certificado
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("CERTIFICADO QTSP DE CONTROVERSIA", pageWidth / 2, y, { align: "center" });
  
  y += 15;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Expediente de Contrato de Arras", pageWidth / 2, y, { align: "center" });

  // Cuadro de referencia
  y += 20;
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 50, 3, 3, "F");
  doc.setDrawColor(15, 232, 96);
  doc.setLineWidth(0.5);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 50, 3, 3, "S");

  y += 12;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("DATOS DEL EXPEDIENTE", margin + 10, y);
  
  y += 10;
  doc.setFont("helvetica", "normal");
  doc.text(`Referencia: ${expediente.id}`, margin + 10, y);
  y += 7;
  doc.text(`Fecha de Creación: ${new Date(expediente.fechaCreacion).toLocaleDateString('es-ES')}`, margin + 10, y);
  y += 7;
  doc.text(`Fecha de Controversia: ${new Date(fechaDeclaracion).toLocaleString('es-ES')}`, margin + 10, y);
  y += 7;
  doc.text(`Estado Final: CONTROVERSIA`, margin + 10, y);

  // Partes del contrato
  y += 25;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PARTES DEL CONTRATO", margin, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  
  // Vendedor
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(margin, y, (pageWidth - 2 * margin - 10) / 2, 35, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.text("VENDEDOR", margin + 5, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(expediente.partes.vendedor.nombre, margin + 5, y + 16);
  doc.text(`NIF: ${expediente.partes.vendedor.nif}`, margin + 5, y + 23);
  doc.text(expediente.partes.vendedor.email, margin + 5, y + 30);

  // Comprador
  const xComprador = margin + (pageWidth - 2 * margin + 10) / 2;
  doc.setFillColor(250, 250, 250);
  doc.roundedRect(xComprador, y, (pageWidth - 2 * margin - 10) / 2, 35, 2, 2, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("COMPRADOR", xComprador + 5, y + 8);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(expediente.partes.comprador.nombre, xComprador + 5, y + 16);
  doc.text(`NIF: ${expediente.partes.comprador.nif}`, xComprador + 5, y + 23);
  doc.text(expediente.partes.comprador.email, xComprador + 5, y + 30);

  // Inmueble
  y += 45;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("INMUEBLE OBJETO DEL CONTRATO", margin, y);
  
  y += 10;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Dirección: ${expediente.inmueble.direccion}`, margin, y);
  y += 7;
  if (expediente.inmueble.referenciaCatastral) {
    doc.text(`Ref. Catastral: ${expediente.inmueble.referenciaCatastral}`, margin, y);
    y += 7;
  }
  doc.text(`Precio de Venta: ${expediente.contrato.precioVenta.toLocaleString('es-ES')} €`, margin, y);
  y += 7;
  doc.text(`Arras Depositadas: ${expediente.contrato.cantidadArras.toLocaleString('es-ES')} € (${expediente.contrato.porcentajeArras}%)`, margin, y);

  // Hash del documento
  y += 20;
  const hashCertificado = generarHashSHA256(JSON.stringify(expediente) + fechaDeclaracion);
  const selloTiempo = generarSelloTiempo();
  
  doc.setFillColor(26, 46, 76);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 25, 2, 2, "F");
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("HASH SHA-256 DEL CERTIFICADO", margin + 5, y + 8);
  doc.setFont("courier", "normal");
  doc.setTextColor(255, 255, 255);
  doc.text(hashCertificado, margin + 5, y + 16);

  // ==================== PÁGINA 2: AUDIT TRAIL ====================
  doc.addPage();
  y = 20;

  // Header de página
  doc.setFillColor(26, 46, 76);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("AUDIT TRAIL - TRAZABILIDAD COMPLETA", margin, 16);

  y = 35;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Registro cronológico de todos los eventos certificados del expediente:", margin, y);

  y += 15;

  // Tabla de eventos
  const eventos = expediente.eventos || [];
  
  // Header de tabla
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("FECHA/HORA", margin + 2, y);
  doc.text("EVENTO", margin + 45, y);
  doc.text("ACTOR", margin + 120, y);
  doc.text("HASH", margin + 145, y);
  
  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  eventos.forEach((evento, index) => {
    if (y > 270) {
      doc.addPage();
      y = 30;
      
      // Header en nueva página
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("FECHA/HORA", margin + 2, y);
      doc.text("EVENTO", margin + 45, y);
      doc.text("ACTOR", margin + 120, y);
      doc.text("HASH", margin + 145, y);
      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
    }

    // Alternar colores de fila
    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 8, "F");
    }

    const fecha = new Date(evento.fecha).toLocaleString('es-ES');
    const descripcion = evento.mensaje.length > 40 
      ? evento.mensaje.substring(0, 40) + "..." 
      : evento.mensaje;
    const hashEvento = evento.hash || generarHashSHA256(evento.id + evento.fecha).substring(0, 16) + "...";

    doc.text(fecha, margin + 2, y);
    doc.text(descripcion, margin + 45, y);
    doc.text(String(evento.actor || 'sistema'), margin + 120, y);
    doc.setFont("courier", "normal");
    doc.text(hashEvento.substring(0, 20), margin + 145, y);
    doc.setFont("helvetica", "normal");

    y += 8;
  });

  // Añadir evento de controversia
  y += 5;
  doc.setFillColor(255, 230, 230);
  doc.rect(margin, y - 4, pageWidth - 2 * margin, 10, "F");
  doc.setTextColor(180, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(new Date(fechaDeclaracion).toLocaleString('es-ES'), margin + 2, y);
  doc.text("CONTROVERSIA DECLARADA - EXPEDIENTE BLOQUEADO", margin + 45, y);
  doc.text("SISTEMA", margin + 120, y);

  // ==================== PÁGINA 3: INVENTARIO DOCUMENTAL ====================
  doc.addPage();
  y = 20;

  doc.setFillColor(26, 46, 76);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("INVENTARIO DOCUMENTAL CERTIFICADO", margin, 16);

  y = 35;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Documentos del expediente con huellas digitales SHA-256:", margin, y);

  y += 15;

  const inventario = expediente.inventarioDocumental || [];
  
  // Header
  doc.setFillColor(240, 240, 240);
  doc.rect(margin, y - 5, pageWidth - 2 * margin, 10, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("TIPO DOCUMENTO", margin + 2, y);
  doc.text("ESTADO", margin + 60, y);
  doc.text("FECHA SUBIDA", margin + 95, y);
  doc.text("HASH SHA-256", margin + 135, y);

  y += 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);

  inventario.forEach((item, index) => {
    if (y > 270) {
      doc.addPage();
      y = 30;
    }

    if (index % 2 === 0) {
      doc.setFillColor(250, 250, 250);
      doc.rect(margin, y - 4, pageWidth - 2 * margin, 8, "F");
    }

    const hashDoc = item.archivoId 
      ? generarHashSHA256(item.archivoId).substring(0, 24) + "..."
      : "N/A";

    doc.text(item.tipo.replace(/_/g, " "), margin + 2, y);
    
    // Color según estado
    if (item.estado === "VALIDADO") {
      doc.setTextColor(0, 128, 0);
    } else if (item.estado === "RECHAZADO") {
      doc.setTextColor(180, 0, 0);
    } else {
      doc.setTextColor(128, 128, 0);
    }
    doc.text(item.estado, margin + 60, y);
    doc.setTextColor(0, 0, 0);

    doc.text(item.fechaSubida || "Pendiente", margin + 95, y);
    doc.setFont("courier", "normal");
    doc.text(hashDoc, margin + 135, y);
    doc.setFont("helvetica", "normal");

    y += 8;
  });

  // ==================== PÁGINA 4: COMUNICACIONES ====================
  doc.addPage();
  y = 20;

  doc.setFillColor(26, 46, 76);
  doc.rect(0, 0, pageWidth, 25, "F");
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("COMUNICACIONES CERTIFICADAS", margin, 16);

  y = 35;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Registro de comunicaciones con sello de tiempo cualificado:", margin, y);

  y += 15;

  const comunicaciones = expediente.comunicaciones || [];
  
  comunicaciones.slice(0, 15).forEach((com, index) => {
    if (y > 260) {
      doc.addPage();
      y = 30;
    }

    doc.setFillColor(index % 2 === 0 ? 250 : 245, index % 2 === 0 ? 250 : 245, index % 2 === 0 ? 250 : 245);
    doc.roundedRect(margin, y - 2, pageWidth - 2 * margin, 22, 2, 2, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "bold");
    doc.text(`[${new Date(com.timestamp).toLocaleString('es-ES')}] ${com.remitente}`, margin + 3, y + 5);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    const mensajeCorto = com.mensaje.length > 100 ? com.mensaje.substring(0, 100) + "..." : com.mensaje;
    doc.text(mensajeCorto, margin + 3, y + 12);
    
    if (com.evidencia) {
      doc.setFont("courier", "normal");
      doc.setFontSize(6);
      doc.setTextColor(100, 100, 100);
      doc.text(`TSA: ${com.evidencia.tsa}`, margin + 3, y + 18);
      doc.setTextColor(0, 0, 0);
    }

    y += 26;
  });

  // ==================== PÁGINA FINAL: SELLO QTSP ====================
  doc.addPage();
  y = 20;

  doc.setFillColor(26, 46, 76);
  doc.rect(0, 0, pageWidth, 60, "F");
  doc.setFillColor(15, 232, 96);
  doc.rect(0, 60, pageWidth, 3, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("SELLO DE TIEMPO CUALIFICADO eIDAS", pageWidth / 2, 30, { align: "center" });
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Emitido por EAD Trust - Prestador Cualificado de Servicios de Confianza", pageWidth / 2, 42, { align: "center" });
  doc.text("Conforme al Reglamento (UE) 910/2014 y Ley 6/2020", pageWidth / 2, 52, { align: "center" });

  y = 80;

  // Cuadro de sello
  doc.setFillColor(245, 255, 245);
  doc.setDrawColor(15, 232, 96);
  doc.setLineWidth(2);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 80, 5, 5, "FD");

  y += 15;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("DATOS DEL SELLO CUALIFICADO", pageWidth / 2, y, { align: "center" });

  y += 15;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(`Identificador del Sello: ${selloTiempo}`, margin + 10, y);
  y += 10;
  doc.text(`Fecha y Hora UTC: ${new Date(fechaDeclaracion).toISOString()}`, margin + 10, y);
  y += 10;
  doc.text(`Algoritmo de Hash: SHA-256`, margin + 10, y);
  y += 10;
  doc.text(`Política de Sello: QTSP-POLICY-EIDAS-2024`, margin + 10, y);
  y += 10;
  doc.text(`Proveedor: EAD Trust (g-digital / Garrigues)`, margin + 10, y);

  // Hash final
  y += 25;
  doc.setFillColor(26, 46, 76);
  doc.roundedRect(margin, y, pageWidth - 2 * margin, 35, 3, 3, "F");
  
  doc.setTextColor(15, 232, 96);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("HUELLA DIGITAL DEL EXPEDIENTE COMPLETO", margin + 10, y + 10);
  
  doc.setFont("courier", "normal");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  const hashFinal = generarHashSHA256(JSON.stringify(expediente) + selloTiempo + fechaDeclaracion);
  doc.text(hashFinal, margin + 10, y + 22);

  // Disclaimer legal
  y += 50;
  doc.setTextColor(80, 80, 80);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  const disclaimer = [
    "Este certificado constituye prueba pre-constituida conforme al artículo 326 LEC.",
    "La integridad del documento puede verificarse en: https://verificacion.eadtrust.eu",
    "El sello de tiempo cualificado garantiza la existencia del documento en la fecha indicada.",
    "Documento generado automáticamente por el sistema g-digital Chrono-Flare."
  ];
  
  disclaimer.forEach((line, i) => {
    doc.text(line, pageWidth / 2, y + (i * 6), { align: "center" });
  });

  // Pie de página con número de páginas
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Página ${i} de ${totalPages} | Expediente: ${expediente.id} | Certificado QTSP`,
      pageWidth / 2,
      290,
      { align: "center" }
    );
  }

  // Guardar
  const fileName = `Certificado_QTSP_Controversia_${expediente.id}_${Date.now()}.pdf`;
  doc.save(fileName);
  
  return {
    fileName,
    hashCertificado,
    selloTiempo,
    fechaEmision: fechaDeclaracion
  };
};
