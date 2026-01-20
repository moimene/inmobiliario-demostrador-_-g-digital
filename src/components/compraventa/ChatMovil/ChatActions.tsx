import { useCompraventa } from "@/contexts/CompraventaContext";
import { Button } from "@/components/ui/button";
import { FaseCompraventa } from "@/types/compraventa";
import { toast } from "sonner";

interface ChatActionsProps {
  rolForzado?: "vendedor" | "comprador";
}

interface Accion {
  label: string;
  onClick: () => void;
  rol?: "vendedor" | "comprador";
  variant?: "default" | "outline" | "secondary";
}

export const ChatActions = ({ rolForzado }: ChatActionsProps) => {
  const { expediente, enviarMensaje, usuarioActual, actualizarExpediente, confirmarMensaje, cambiarFase } = useCompraventa();
  const rolActivo = rolForzado || usuarioActual;

  const getButtonColorClass = (rol?: "vendedor" | "comprador") => {
    if (!rol) return "";
    return rol === "vendedor" 
      ? "bg-blue-600 hover:bg-blue-700 text-white" 
      : "bg-emerald-600 hover:bg-emerald-700 text-white";
  };

  const accionesPorFase: Record<FaseCompraventa, Accion[]> = {
    apertura_expediente_compraventa: [
      {
        label: "Ambas partes confirman ✓",
        onClick: () => {
          cambiarFase("identificacion_partes_compraventa");
          toast.success("Avanzando a identificación de partes");
        },
      },
    ],

    identificacion_partes_compraventa: [
      {
        label: "Quiero unirme al canal",
        rol: "vendedor",
        onClick: () => {
          const vendedor = expediente.partes.vendedor;
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: `Quiero unirme al canal certificado.\n\nMis datos:\n👤 ${vendedor.nombre}\n🆔 ${vendedor.nif}\n📧 ${vendedor.email}\n📞 ${vendedor.telefono}\n\n✓ Acepto los términos de uso del canal certificado\n✓ Acepto la política de privacidad`,
          });
          toast.success("Vendedor identificado");
        },
      },
      {
        label: "Quiero unirme al canal",
        rol: "comprador",
        onClick: () => {
          const comprador = expediente.partes.comprador;
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: `Quiero unirme al canal certificado.\n\nMis datos:\n👤 ${comprador.nombre}\n🆔 ${comprador.nif}\n📧 ${comprador.email}\n📞 ${comprador.telefono}\n\n✓ Acepto los términos de uso del canal certificado\n✓ Acepto la política de privacidad`,
          });
          toast.success("Comprador identificado");
        },
      },
    ],

    identificacion_inmueble_compraventa: [
      {
        label: "Confirmar identificación del inmueble",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: `Confirmar identificación del inmueble:\n\n📍 ${expediente.inmueble.direccion}\n📐 ${expediente.inmueble.superficie}m², ${expediente.inmueble.habitaciones} hab., ${expediente.inmueble.banos} baños\n📝 Finca: ${expediente.inmueble.datosRegistrales?.fincaRegistral || "N/A"}`,
          });
        },
      },
      {
        label: "Solicitar Nota Informativa",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Solicito Nota Informativa del Registro de la Propiedad para verificar cargas y situación registral del inmueble.",
          });
          toast.info("Solicitud de Nota Informativa enviada");
        },
      },
      {
        label: "Confirmar identificación del inmueble",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Confirmar identificación del inmueble. Acepto las características y datos registrales presentados.",
          });
        },
      },
    ],

    financiacion_bancaria: [
      {
        label: "Pago al contado",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Modalidad de pago: AL CONTADO. Dispongo de fondos suficientes para el pago total.",
          });
          actualizarExpediente({
            contrato: { ...expediente.contrato, modalidadPago: "contado" },
          });
        },
      },
      {
        label: "Financiación hipotecaria",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: `Modalidad de pago: FINANCIACIÓN HIPOTECARIA.\n\nBanco: ${expediente.contrato.bancoFinanciador || "Banco Santander"}\nImporte hipoteca: ${(expediente.contrato.importeHipoteca || 300000).toLocaleString()}€`,
          });
          actualizarExpediente({
            contrato: { 
              ...expediente.contrato, 
              modalidadPago: "hipoteca",
              bancoFinanciador: expediente.contrato.bancoFinanciador || "Banco Santander",
              importeHipoteca: expediente.contrato.importeHipoteca || 300000,
            },
          });
        },
      },
      {
        label: "Confirmo conocimiento de modalidad",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Confirmo conocimiento y aceptación de la modalidad de pago seleccionada por el Comprador.",
          });
        },
      },
    ],

    due_diligence_completa: [
      {
        label: "Subir Cédula Habitabilidad",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📄 Documento: Cédula de Habitabilidad",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/cedula-habitabilidad.pdf",
              nombre: "cedula-habitabilidad.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
        },
      },
      {
        label: "Subir IBI",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📄 Documento: Recibos IBI (últimos 3 años)",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/ibi.pdf",
              nombre: "ibi-ultimos-3-anos.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
        },
      },
      {
        label: "Subir Certificado Comunidad",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📄 Documento: Certificado Comunidad sin deudas",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/certificado-comunidad.pdf",
              nombre: "certificado-comunidad-sin-deudas.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
        },
      },
      {
        label: "Subir Certificado Energético",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📄 Documento: Certificado Energético",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/certificado-energetico.pdf",
              nombre: "certificado-energetico.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
        },
      },
      {
        label: "Confirmo recepción documentos",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Confirmo recepción y revisión de toda la documentación solicitada. Acepto continuar con el proceso.",
          });
        },
      },
    ],

    configuracion_modalidad_cierre: [
      {
        label: "Acepto Modalidad Directa",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Acepto Modalidad DIRECTA: Compraventa directa en escritura pública con pago total en un solo acto notarial.",
          });
          
          actualizarExpediente({
            contrato: {
              ...expediente.contrato,
              modalidadCierre: "directa",
              fechaEscrituraDirecta: "2025-02-15",
              notariaSeleccionadaDirecta: "Notaría García-Peña, Madrid",
            },
          });

          toast.success("Vendedor acepta Modalidad Directa");
        },
      },
      {
        label: "Acepto Modalidad Directa",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Acepto Modalidad DIRECTA: Compraventa directa en escritura pública con pago total en un solo acto notarial.",
          });
          
          actualizarExpediente({
            contrato: {
              ...expediente.contrato,
              modalidadCierre: "directa",
              fechaEscrituraDirecta: "2025-02-15",
              notariaSeleccionadaDirecta: "Notaría García-Peña, Madrid",
            },
          });

          toast.success("Comprador acepta Modalidad Directa");
        },
      },
      {
        label: "Acepto Modalidad Escalonada",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Acepto Modalidad ESCALONADA: Documento privado con pago parcial + elevación posterior a escritura pública.",
          });
          
          actualizarExpediente({
            contrato: {
              ...expediente.contrato,
              modalidadCierre: "escalonada",
              montoParcialDocumentoPrivado: Math.round(expediente.contrato.precioVenta * 0.1),
              porcentajeParcial: 10,
              fechaDocumentoPrivado: "2025-02-01",
              fechaLimiteElevacion: "2025-04-01",
            },
          });

          toast.success("Vendedor acepta Modalidad Escalonada");
        },
      },
      {
        label: "Acepto Modalidad Escalonada",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Acepto Modalidad ESCALONADA: Documento privado con pago parcial + elevación posterior a escritura pública.",
          });
          
          actualizarExpediente({
            contrato: {
              ...expediente.contrato,
              modalidadCierre: "escalonada",
              montoParcialDocumentoPrivado: Math.round(expediente.contrato.precioVenta * 0.1),
              porcentajeParcial: 10,
              fechaDocumentoPrivado: "2025-02-01",
              fechaLimiteElevacion: "2025-04-01",
            },
          });

          toast.success("Comprador acepta Modalidad Escalonada");
        },
      },
    ],

    // RUTA A: DIRECTA
    firma_contrato_compraventa_directa: [
      {
        label: "Acepto los términos del contrato",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Acepto los términos del contrato de compraventa. Confirmo firma electrónica avanzada.",
          });
          toast.success("Vendedor ha firmado el contrato");
        },
      },
      {
        label: "Acepto los términos del contrato",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Acepto los términos del contrato de compraventa. Confirmo firma electrónica avanzada.",
          });
          toast.success("Comprador ha firmado el contrato");
        },
      },
    ],

    escrituracion_notarial_directa: [
      {
        label: "Confirmar asistencia notaría",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: rolActivo as "vendedor" | "comprador",
            texto: "Confirmo mi asistencia a la cita notarial programada.",
          });
        },
      },
      {
        label: "Subir Escritura Pública",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📜 Escritura Pública formalizada y registrada",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/escritura-publica.pdf",
              nombre: "escritura-publica-compraventa.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
          toast.success("Escritura pública subida");
        },
      },
    ],

    // RUTA B: ESCALONADA
    firma_documento_privado: [
      {
        label: "Acepto documento privado",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Acepto documento privado de compraventa. Confirmo firma electrónica avanzada.",
          });
        },
      },
      {
        label: "Acepto documento privado",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Acepto documento privado de compraventa. Confirmo firma electrónica avanzada.",
          });
        },
      },
    ],

    pago_parcial_documento_privado: [
      {
        label: "Subir justificante de pago parcial",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: `💶 Justificante de pago parcial: ${(expediente.contrato.montoParcialDocumentoPrivado || 0).toLocaleString()}€`,
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/justificante-pago-parcial.pdf",
              nombre: "justificante-pago-parcial.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
        },
      },
      {
        label: "Confirmo recepción pago parcial",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "Confirmo recepción del pago parcial acordado en el documento privado.",
          });
        },
      },
    ],

    elevacion_a_escritura_publica: [
      {
        label: "Confirmar asistencia notaría",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: rolActivo as "vendedor" | "comprador",
            texto: "Confirmo mi asistencia a la cita notarial para elevación a escritura pública.",
          });
        },
      },
      {
        label: "Subir Escritura Pública Definitiva",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "📜 Escritura Pública Definitiva formalizada y registrada",
            adjuntos: [{
              tipo: "pdf",
              url: "/documents/escritura-publica-definitiva.pdf",
              nombre: "escritura-publica-definitiva.pdf",
              hash: Math.random().toString(36).substring(2, 15),
            }],
          });
          toast.success("Escritura definitiva subida");
        },
      },
    ],

    // COMÚN
    entrega_llaves: [
      {
        label: "Entrego las llaves",
        rol: "vendedor",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "vendedor",
            texto: "🔑 Entrego las llaves del inmueble y toda la documentación complementaria (manuales, garantías, etc.)",
          });
        },
      },
      {
        label: "Confirmo recepción llaves",
        rol: "comprador",
        onClick: () => {
          enviarMensaje({
            tipo: "usuario",
            remitente: "comprador",
            texto: "Confirmo recepción de las llaves y documentación. Acepto el estado del inmueble según acta certificada.",
          });
        },
      },
    ],

    cierre_expediente_compraventa: [
      {
        label: "Exportar expediente completo",
        onClick: () => {
          toast.success("Expediente exportado correctamente");
        },
      },
    ],
  };

  const accionesFase = accionesPorFase[expediente.fase] || [];
  
  // Filtrar acciones por rol activo
  let accionesFiltradas = accionesFase.filter(
    (accion) => !accion.rol || accion.rol === rolActivo
  );

  // Fallback: si no hay acciones para el rol, mostrar todas
  if (accionesFiltradas.length === 0 && accionesFase.length > 0) {
    accionesFiltradas = accionesFase;
  }

  if (accionesFiltradas.length === 0) return null;

  return (
    <div className="px-4 py-3 bg-slate-50 border-t border-slate-200">
      <div className="flex flex-wrap gap-2">
        {accionesFiltradas.map((accion, index) => (
          <Button
            key={index}
            onClick={accion.onClick}
            variant={accion.variant || "default"}
            size="sm"
            className={getButtonColorClass(accion.rol)}
          >
            {accion.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
