import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useArrendamiento } from "@/contexts/ArrendamientoContext";
import { FaseArrendamiento } from "@/types/arrendamiento";

const PHASE_NOTIFICATIONS: Record<
  FaseArrendamiento,
  { arrendador: string; arrendatario: string }
> = {
  apertura_expediente: {
    arrendador: "📋 Expediente abierto. Por favor, confirme su identidad para continuar.",
    arrendatario: "📋 Expediente abierto. Por favor, confirme su identidad para continuar.",
  },
  identificacion_partes: {
    arrendador: "👤 Confirme su identidad y únase al canal certificado.",
    arrendatario: "👤 Confirme su identidad y únase al canal certificado.",
  },
  identificacion_inmueble: {
    arrendador: "🏠 Confirme la identificación del inmueble o gestione la Nota Informativa.",
    arrendatario: "🏠 Confirme la identificación del inmueble. Puede solicitar la Nota Informativa.",
  },
  extracto_informado: {
    arrendador: "📄 Revise los términos básicos del contrato y confirme su conformidad.",
    arrendatario: "📄 Revise los términos básicos del contrato y confirme su conformidad.",
  },
  firma_contrato: {
    arrendador: "✍️ Revise el contrato completo y acepte los términos para firmarlo.",
    arrendatario: "✍️ Revise el contrato completo y acepte los términos para firmarlo.",
  },
  pagos_iniciales: {
    arrendador: "💰 Deposite la fianza en IVIMA y suba el resguardo oficial.",
    arrendatario: "💰 Suba los justificantes de fianza y primera renta mensual.",
  },
  estado_inicial: {
    arrendador: "📸 Suba el inventario y fotografías del estado inicial del inmueble.",
    arrendatario: "📸 Revise y confirme el inventario y fotografías del estado inicial.",
  },
  canal_oficial: {
    arrendador: "✅ Confirme que el canal es ahora el medio oficial de comunicación.",
    arrendatario: "✅ Confirme que el canal es ahora el medio oficial de comunicación.",
  },
  vida_contrato: {
    arrendador: "🏡 Contrato activo. Responda a incidencias y gestione comunicaciones.",
    arrendatario: "🏡 Contrato activo. Suba justificantes de renta mensual y reporte incidencias.",
  },
  impago_evento: {
    arrendador: "⚠️ Impago detectado. Revise la situación y gestione según corresponda.",
    arrendatario: "⚠️ Impago detectado. Suba el justificante de pago para regularizar.",
  },
  prorroga_legal: {
    arrendador: "📅 Prórroga legal activa. Informe según Ley de Arrendamientos Urbanos.",
    arrendatario: "📅 Prórroga legal disponible. Decida si desea continuar o finalizar.",
  },
  decision_arrendatario: {
    arrendador: "🔔 Arrendatario debe decidir sobre la renovación del contrato.",
    arrendatario: "🔔 Decida si desea renovar el contrato o finalizar el arrendamiento.",
  },
  recuperacion_necesidad: {
    arrendador: "⚖️ Invoque Art. 9.3 LAU para recuperación por necesidad.",
    arrendatario: "⚖️ El arrendador ha iniciado recuperación por necesidad (Art. 9.3 LAU).",
  },
  devolucion_fianza: {
    arrendador: "💵 Suba el informe de estado final y gestione la devolución de fianza.",
    arrendatario: "💵 Revise el cálculo de liquidación y confirme la devolución de fianza.",
  },
  cierre: {
    arrendador: "🎯 Expediente cerrado. Puede exportar el expediente completo.",
    arrendatario: "🎯 Expediente cerrado. Puede exportar el expediente completo.",
  },
};

interface UsePhaseNotificationsProps {
  rolForzado?: "arrendador" | "arrendatario";
}

export const usePhaseNotifications = ({ rolForzado }: UsePhaseNotificationsProps) => {
  const { expediente, usuarioActual } = useArrendamiento();
  const previousPhaseRef = useRef<FaseArrendamiento | null>(null);
  const hasShownNotificationRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!expediente) return; // Guard para asegurar que expediente existe
    
    const currentPhase = expediente.fase;
    const activeRole = rolForzado || usuarioActual;

    // Generar una clave única para esta combinación fase+rol
    const notificationKey = `${currentPhase}-${activeRole}`;

    // Solo mostrar notificación si:
    // 1. La fase ha cambiado (diferente a la anterior)
    // 2. No hemos mostrado notificación para esta combinación fase+rol
    // 3. No es la carga inicial (previousPhaseRef.current existe)
    if (
      previousPhaseRef.current !== null &&
      currentPhase !== previousPhaseRef.current &&
      !hasShownNotificationRef.current.has(notificationKey)
    ) {
      const notification = PHASE_NOTIFICATIONS[currentPhase];
      const message =
        activeRole === "arrendador"
          ? notification.arrendador
          : notification.arrendatario;

      // Mostrar notificación con sonido y duración extendida
      toast.success(message, {
        duration: 6000,
        position: "top-center",
        className: "font-medium",
      });

      // Marcar como mostrada
      hasShownNotificationRef.current.add(notificationKey);
    }

    // Actualizar la fase previa
    previousPhaseRef.current = currentPhase;
  }, [expediente.fase, rolForzado, usuarioActual]);

  // Limpiar el set de notificaciones mostradas cuando cambia el rol
  // (para permitir notificaciones en vista dual cuando se cambia de dispositivo)
  useEffect(() => {
    return () => {
      hasShownNotificationRef.current.clear();
    };
  }, [rolForzado]);
};
