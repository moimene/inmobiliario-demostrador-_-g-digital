import { Button } from "@/components/ui/button";
import { useArras } from "@/contexts/ArrasContext";
import { FileText, Upload, CheckCircle, Home, FileSignature, Coins, Building } from "lucide-react";
import { toast } from "sonner";

interface ChatActionsProps {
  rolForzado?: "vendedor" | "comprador";
}

export const ChatActions = ({ rolForzado }: ChatActionsProps) => {
  const { expediente, enviarMensaje, confirmarMensaje, usuarioActual } = useArras();
  const rolActivo = rolForzado || (usuarioActual as "vendedor" | "comprador");

  const getButtonColorClass = (rol: "vendedor" | "comprador") => {
    if (rol === "vendedor") {
      return "bg-blue-500 hover:bg-blue-600 text-white";
    }
    return "bg-green-500 hover:bg-green-600 text-white";
  };

  const handleConfirmar = (textoPersonalizado?: string) => {
    // Buscar el último mensaje que requiere confirmación
    const mensajePendiente = [...expediente.mensajes]
      .reverse()
      .find((msg) => msg.requiereConfirmacion && !(msg.confirmadoPor?.includes(rolActivo)));

    if (!mensajePendiente) {
      return;
    }

    const texto = textoPersonalizado || 
      (rolActivo === "vendedor" 
        ? "Confirmo como vendedor" 
        : "Confirmo como comprador");

    enviarMensaje({
      tipo: "usuario",
      remitente: rolActivo,
      texto,
    });

    confirmarMensaje(mensajePendiente.id, rolActivo);
    toast.success("Confirmación enviada");
  };

  // Fase 1: Apertura
  if (expediente.fase === "apertura_expediente_arras") {
    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => handleConfirmar("Entiendo el funcionamiento del canal y deseo continuar")}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="default"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Entiendo y deseo continuar
        </Button>
      </div>
    );
  }

  // Fase 2: Identificación de partes
  if (expediente.fase === "identificacion_partes_arras") {
    const parteActual = rolActivo === "vendedor" ? expediente.partes.vendedor : expediente.partes.comprador;
    
    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => {
            const texto = `Soy ${parteActual.nombre}, con NIF ${parteActual.nif}, y confirmo mi identidad como parte ${rolActivo === "vendedor" ? "vendedora" : "compradora"} en este expediente.`;
            handleConfirmar(texto);
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="default"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirmo mi identidad
        </Button>
      </div>
    );
  }

  // Fase 3: Identificación inmueble
  if (expediente.fase === "identificacion_inmueble_arras") {
    if (rolActivo === "vendedor") {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => handleConfirmar("Confirmo la identificación del inmueble")}
            className={getButtonColorClass("vendedor")}
            size="sm"
          >
            <Home className="h-4 w-4 mr-2" />
            Confirmar inmueble
          </Button>
          <Button
            onClick={() => {
              enviarMensaje({
                tipo: "usuario",
                remitente: "vendedor",
                texto: "Aporto Nota Informativa vigente del Registro de la Propiedad",
                adjuntos: [{
                  tipo: "pdf",
                  nombre: "Nota_Registral_Finca_25887.pdf",
                  url: "/nota-registral.pdf",
                  hash: "abc123def456",
                }],
              });
              toast.success("Nota Registral subida y certificada");
            }}
            className={getButtonColorClass("vendedor")}
            size="sm"
            variant="outline"
          >
            <Upload className="h-4 w-4 mr-2" />
            Subir Nota Registral
          </Button>
        </div>
      );
    } else {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => handleConfirmar("Confirmo la identificación del inmueble")}
            className={getButtonColorClass("comprador")}
            size="sm"
          >
            <Home className="h-4 w-4 mr-2" />
            Confirmar inmueble
          </Button>
        </div>
      );
    }
  }

  // Fase 4: Due Diligence
  if (expediente.fase === "due_diligence_basica") {
    if (rolActivo === "vendedor") {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => handleConfirmar("Confirmo que las declaraciones son correctas y completas")}
            className={getButtonColorClass("vendedor")}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar declaraciones
          </Button>
        </div>
      );
    } else {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => handleConfirmar("He revisado la información y deseo seguir adelante")}
            className={getButtonColorClass("comprador")}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Seguir adelante
          </Button>
        </div>
      );
    }
  }

  // Fase 5: Configuración depósito
  if (expediente.fase === "configuracion_deposito_arras") {
    const yaEligioDeposito = expediente.mensajes.some(
      m => m.remitente === "comprador" && 
      (m.texto.includes("Depósito en notaría") || m.texto.includes("Depósito en escrow"))
    );

    const vendedorAcepto = expediente.mensajes.some(
      m => m.remitente === "vendedor" && m.texto.includes("Acepto la opción de depósito")
    );

    if (rolActivo === "comprador" && !yaEligioDeposito) {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => {
              enviarMensaje({
                tipo: "usuario",
                remitente: "comprador",
                texto: "Depósito en notaría elegida por el comprador",
              });
            }}
            className={getButtonColorClass("comprador")}
            size="sm"
          >
            <Building className="h-4 w-4 mr-2" />
            Depósito en notaría
          </Button>
          <Button
            onClick={() => {
              enviarMensaje({
                tipo: "usuario",
                remitente: "comprador",
                texto: "Depósito en escrow / dinero tokenizado",
              });
            }}
            className={getButtonColorClass("comprador")}
            size="sm"
            variant="outline"
          >
            <Coins className="h-4 w-4 mr-2" />
            Depósito escrow
          </Button>
        </div>
      );
    } else if (rolActivo === "vendedor" && yaEligioDeposito && !vendedorAcepto) {
      return (
        <div className="px-4 py-2 border-t bg-background space-y-2">
          <Button
            onClick={() => {
              enviarMensaje({
                tipo: "usuario",
                remitente: "vendedor",
                texto: "Acepto la opción de depósito seleccionada",
              });
            }}
            className={getButtonColorClass("vendedor")}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aceptar opción depósito
          </Button>
        </div>
      );
    }
  }

  // Fase 6: Firma contrato
  if (expediente.fase === "generacion_y_firma_contrato_arras") {
    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => handleConfirmar(`He leído el contrato de arras, comprendo sus efectos (incluida la pérdida/devolución de la señal según el contrato) y acepto sus términos. Firmo.`)}
          className={getButtonColorClass(rolActivo)}
          size="sm"
        >
          <FileSignature className="h-4 w-4 mr-2" />
          Firmar contrato
        </Button>
      </div>
    );
  }

  // Fase 7: Canal certificado
  if (expediente.fase === "canal_certificado_pre_escritura") {
    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => handleConfirmar("Confirmo que este canal será el medio oficial de comunicaciones")}
          className={getButtonColorClass(rolActivo)}
          size="sm"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirmar canal oficial
        </Button>
      </div>
    );
  }

  // Fase 8: Gestión eventos pre-notaría
  if (expediente.fase === "gestion_eventos_pre_notaria") {
    const listoParaNotaria = expediente.mensajes.some(
      m => m.remitente === rolActivo && m.texto.includes("Estoy listo para acudir a la notaría")
    );

    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => {
            enviarMensaje({
              tipo: "usuario",
              remitente: rolActivo,
              texto: "Solicito prórroga del plazo de escritura por causas justificadas",
            });
            toast.info("Solicitud de prórroga enviada y certificada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          Solicitar prórroga
        </Button>
        <Button
          onClick={() => {
            enviarMensaje({
              tipo: "usuario",
              remitente: rolActivo,
              texto: "Comunico incidencia relacionada con la operación que requiere atención",
            });
            toast.info("Incidencia comunicada y certificada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          Comunicar incidencia
        </Button>
        {!listoParaNotaria && (
          <Button
            onClick={() => handleConfirmar("Estoy listo para acudir a la notaría en la fecha prevista")}
            className={getButtonColorClass(rolActivo)}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar listo para notaría
          </Button>
        )}
      </div>
    );
  }

  // Fase 9: Convocatoria notarial
  if (expediente.fase === "convocatoria_y_comparecencia_notarial") {
    const yaConfirmoAsistencia = expediente.mensajes.some(
      m => m.remitente === rolActivo && m.texto.includes("Confirmo mi asistencia a la notaría")
    );

    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        {!yaConfirmoAsistencia && (
          <Button
            onClick={() => handleConfirmar("Confirmo mi asistencia a la notaría en la fecha y hora indicadas")}
            className={getButtonColorClass(rolActivo)}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar asistencia
          </Button>
        )}
        <Button
          onClick={() => {
            enviarMensaje({
              tipo: "usuario",
              remitente: rolActivo,
              texto: "Registro que no podré comparecer en la fecha prevista",
            });
            toast.warning("No comparecencia registrada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          Registrar no comparecencia
        </Button>
      </div>
    );
  }

  // Fase 10: Resultado formalización
  if (expediente.fase === "resultado_formalizacion") {
    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        <Button
          onClick={() => handleConfirmar("He leído el resultado y comprendo que se aplicará el régimen de arras previsto en el contrato")}
          className={getButtonColorClass(rolActivo)}
          size="sm"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Confirmar comprensión
        </Button>
        <Button
          onClick={() => {
            enviarMensaje({
              tipo: "usuario",
              remitente: rolActivo,
              texto: "Aporto copia de la escritura de compraventa otorgada",
              adjuntos: [{
                tipo: "pdf",
                nombre: "Escritura_Compraventa_Notaria.pdf",
                url: "/escritura.pdf",
                hash: "xyz789abc123",
              }],
            });
            toast.success("Escritura subida y certificada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <Upload className="h-4 w-4 mr-2" />
          Subir escritura
        </Button>
      </div>
    );
  }

  // Fase 11: Resolución arras
  if (expediente.fase === "resolucion_arras") {
    const yaAceptoResolucion = expediente.mensajes.some(
      m => m.remitente === rolActivo && m.texto.includes("Acepto la resolución de arras")
    );

    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        {!yaAceptoResolucion && (
          <Button
            onClick={() => handleConfirmar("Acepto la resolución de arras según lo establecido en el contrato")}
            className={getButtonColorClass(rolActivo)}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Aceptar resolución
          </Button>
        )}
        <Button
          onClick={() => {
            enviarMensaje({
              tipo: "usuario",
              remitente: rolActivo,
              texto: "Solicito activar el mecanismo de arbitraje configurado para resolver la disputa",
            });
            toast.info("Solicitud de arbitraje registrada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          Solicitar arbitraje
        </Button>
      </div>
    );
  }

  // Fase 12: Arbitraje y cierre
  if (expediente.fase === "arbitraje_y_cierre") {
    const yaConfirmoCierre = expediente.mensajes.some(
      m => m.remitente === rolActivo && m.texto.includes("Confirmo el cierre del expediente")
    );

    return (
      <div className="px-4 py-2 border-t bg-background space-y-2">
        {!yaConfirmoCierre && (
          <Button
            onClick={() => handleConfirmar("Confirmo el cierre del expediente y la finalización del proceso de arras")}
            className={getButtonColorClass(rolActivo)}
            size="sm"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Confirmar cierre expediente
          </Button>
        )}
        <Button
          onClick={() => {
            toast.success("Descarga del expediente completo iniciada");
          }}
          className={getButtonColorClass(rolActivo)}
          size="sm"
          variant="outline"
        >
          <FileText className="h-4 w-4 mr-2" />
          Descargar expediente completo
        </Button>
      </div>
    );
  }

  return null;
};
