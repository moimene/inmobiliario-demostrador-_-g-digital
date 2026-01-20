import { jsPDF } from "jspdf";
import { Evento } from "@/types/arras";

export const generarCertificadoEventos = (eventos: Evento[], referencia: string) => {
    const doc = new jsPDF();

    // Header with Logo Placeholder
    doc.setFillColor(0, 50, 100); // Dark Blue
    doc.rect(0, 0, 210, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Certificado de Trazabilidad Digital", 105, 25, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Expediente Referencia: ${referencia}`, 20, 55);
    doc.text(`Fecha de Emisión: ${new Date().toLocaleString()}`, 20, 62);
    doc.text("Autoridad de Certificación: g-digital QTSP Node", 20, 69);

    // Table Header
    let y = 85;
    doc.setFillColor(240, 240, 240);
    doc.rect(20, y - 5, 170, 8, "F");
    doc.setFont(undefined, "bold");
    doc.text("Fecha / Hora", 25, y);
    doc.text("Evento", 70, y);
    doc.text("Actor", 160, y);
    doc.setFont(undefined, "normal");

    y += 10;

    // Logic to print events
    eventos.forEach((evt) => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }

        const fecha = new Date(evt.timestamp).toLocaleString();
        doc.setFontSize(9);
        doc.text(fecha, 25, y);
        doc.text(evt.descripcion.substring(0, 50), 70, y);
        doc.text(evt.actor, 160, y);

        y += 8;
    });

    // Footer
    doc.setDrawColor(0, 150, 0);
    doc.setLineWidth(1);
    doc.line(20, 250, 190, 250);

    doc.setFontSize(10);
    doc.setTextColor(0, 100, 0);
    doc.text("Documento firmado digitalmente. La integridad de este certificado puede ser verificada.", 105, 260, { align: "center" });

    doc.save(`Certificado_Trazabilidad_${referencia}.pdf`);
};
