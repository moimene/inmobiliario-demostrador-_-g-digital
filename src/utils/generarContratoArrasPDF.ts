import { jsPDF } from "jspdf";
import { ExpedienteArras } from "@/types/arras";

export const generarContratoArrasPDF = (expediente: ExpedienteArras) => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("Contrato de Arras Penitenciales", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Referencia: ${expediente.id}`, 20, 30);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 150, 30);

    // Partes
    doc.setFontSize(12);
    doc.text("REUNIDOS", 20, 45);
    doc.setFontSize(10);

    const vendedor = expediente.partes.vendedor;
    const comprador = expediente.partes.comprador;

    doc.text(`De una parte, DON/DOÑA ${vendedor?.nombre || "_______________"}, con NIF ${vendedor?.nif || "_______________"}`, 20, 55);
    doc.text("En concepto de VENDEDOR.", 20, 60);

    doc.text(`De otra parte, DON/DOÑA ${comprador?.nombre || "_______________"}, con NIF ${comprador?.nif || "_______________"}`, 20, 70);
    doc.text("En concepto de COMPRADOR.", 20, 75);

    // Exponen
    doc.setFontSize(12);
    doc.text("EXPONEN", 20, 90);
    doc.setFontSize(10);

    const textoInmueble = `Que la parte VENDEDORA es titular del pleno dominio de la finca sita en ${expediente.inmueble.direccion}.`;
    doc.text(doc.splitTextToSize(textoInmueble, 170), 20, 100);

    // Clausulas
    doc.setFontSize(12);
    doc.text("ESTIPULAN", 20, 120);
    doc.setFontSize(10);

    const precio = expediente.contrato.precioVenta.toLocaleString("es-ES");
    const arras = expediente.contrato.cantidadArras.toLocaleString("es-ES");

    const clausula1 = `PRIMERA.- El precio pactado para la compraventa es de ${precio} EUROS.`;
    const clausula2 = `SEGUNDA.- En este acto, la parte COMPRADORA entrega a la VENDEDORA la cantidad de ${arras} EUROS en concepto de ARRAS PENITENCIALES, de conformidad con el artículo 1454 del Código Civil.`;
    const clausula3 = `TERCERA.- La escritura pública de compraventa se otorgará antes del día ${expediente.contrato.fechaLimiteEscritura}.`;

    let y = 130;
    doc.text(doc.splitTextToSize(clausula1, 170), 20, y); y += 10;
    doc.text(doc.splitTextToSize(clausula2, 170), 20, y); y += 15;
    doc.text(doc.splitTextToSize(clausula3, 170), 20, y);

    // Firmas area
    y += 40;
    doc.text("Fdo. El Vendedor", 40, y);
    doc.text("Fdo. El Comprador", 140, y);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Documento generado por Infraestructura g-digital Chrono-Flare. Hash certificado: _______________", 105, 280, { align: "center" });

    doc.save(`Contrato_Arras_${expediente.id}.pdf`);
};
