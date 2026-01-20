import infografiaEidasMarcoLegal from "@/assets/infografia-eidas-marco-legal.png";
import infografiaLey62020 from "@/assets/infografia-ley-6-2020.png";

export interface Concepto {
  id: string;
  categoria: "marco-legal" | "tecnologia" | "clm" | "aplicaciones";
  titulo: string;
  subtitulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  imagen?: string;
  icono?: string;
  enlaces?: { texto: string; url: string }[];
  destacado?: boolean;
}

export const conceptos: Concepto[] = [
  // CATEGORÍA 1: MARCO LEGAL
  {
    id: "eidas",
    categoria: "marco-legal",
    titulo: "eIDAS (Reglamento UE 910/2014)",
    subtitulo: "Marco Legal Europeo de Confianza Digital",
    descripcionCorta: "Reglamento que establece las bases legales para la identificación electrónica y los servicios de confianza en toda la Unión Europea.",
    descripcionCompleta: "El Reglamento eIDAS (electronic IDentification, Authentication and trust Services) establece un marco legal común para las transacciones electrónicas en la UE. Define los servicios de confianza cualificados (firmas electrónicas, sellos de tiempo, entrega electrónica certificada, conservación electrónica) y garantiza su validez legal equivalente a los documentos físicos en todos los Estados Miembros. Este reglamento es la piedra angular de la transformación digital del sector legal europeo.",
    imagen: infografiaEidasMarcoLegal,
    icono: "Shield",
    enlaces: [
      { texto: "Texto oficial eIDAS", url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32014R0910" },
    ],
    destacado: true
  },
  {
    id: "ley-6-2020",
    categoria: "marco-legal",
    titulo: "Ley 6/2020 (España)",
    subtitulo: "Regulación Nacional de Servicios Electrónicos de Confianza",
    descripcionCorta: "Ley española que transpone eIDAS y establece el régimen jurídico de los servicios electrónicos de confianza, incluyendo el art. 326.4 LEC.",
    descripcionCompleta: "La Ley 6/2020 regula los servicios electrónicos de confianza en España, transponiendo el Reglamento eIDAS. Modifica la Ley de Enjuiciamiento Civil (art. 326.4 LEC) para establecer que los documentos electrónicos certificados con servicios de confianza cualificados tienen presunción de autenticidad e integridad en juicio, invirtiendo la carga de la prueba. Esta regulación nacional refuerza la seguridad jurídica de las transacciones digitales certificadas en el territorio español.",
    imagen: infografiaLey62020,
    icono: "Scale",
    enlaces: [
      { texto: "Texto oficial Ley 6/2020", url: "https://www.boe.es/buscar/act.php?id=BOE-A-2020-14046" },
    ],
    destacado: true
  },
  {
    id: "carga-prueba",
    categoria: "marco-legal",
    titulo: "Inversión de la Carga de la Prueba",
    subtitulo: "Art. 326.4 LEC - Impacto en Juicios",
    descripcionCorta: "Los documentos certificados con servicios de confianza cualificados tienen presunción de autenticidad, invirtiendo la carga probatoria en litigios.",
    descripcionCompleta: "Según el artículo 326.4 de la Ley de Enjuiciamiento Civil, los documentos electrónicos certificados mediante servicios electrónicos de confianza cualificados gozan de presunción de autenticidad e integridad. Esto significa que en un juicio, el documento certificado se considera auténtico por defecto, y es la parte contraria quien debe demostrar su falsedad o alteración. Esta inversión de la carga de la prueba transforma radicalmente la litigación: en lugar de tener que demostrar que tu comunicación o contrato es válido, es la otra parte quien debe probar que NO lo es. Esto reduce drásticamente los costes de litigio y fortalece la posición de quien utiliza certificación cualificada.",
    imagen: "impacto-legal-eidas",
    destacado: true
  },

  // CATEGORÍA 2: TECNOLOGÍA DE CONFIANZA
  {
    id: "sellos-tiempo",
    categoria: "tecnologia",
    titulo: "Sellos de Tiempo Cualificado",
    subtitulo: "Certificación Temporal Irrefutable",
    descripcionCorta: "Prueba criptográfica del momento exacto en que un dato existía, emitida por un Prestador Cualificado de Servicios de Confianza.",
    descripcionCompleta: "Un sello de tiempo cualificado (Qualified Timestamp) es una evidencia electrónica que vincula datos con un instante temporal concreto, garantizando que esos datos existían en ese momento y no han sido modificados desde entonces. A diferencia de un timestamp simple (que puede ser manipulado), el sello cualificado es emitido por un QTSP autorizado que cumple estándares técnicos y de seguridad verificados por organismos reguladores. Estos sellos son irrefutables en juicio gracias al art. 326.4 LEC y constituyen la base de la certificación de todas las comunicaciones y eventos en FaciliteCasas.",
    icono: "Clock",
    enlaces: [
      { texto: "Norma ETSI EN 319 422", url: "https://www.etsi.org/deliver/etsi_en/319400_319499/319422/" },
    ],
  },
  {
    id: "firmas-electronicas",
    categoria: "tecnologia",
    titulo: "Firmas Electrónicas Avanzadas vs Cualificadas",
    subtitulo: "Diferencias Legales y Casos de Uso",
    descripcionCorta: "Las firmas avanzadas ofrecen identificación robusta con respaldo de sellos cualificados, mientras que las cualificadas requieren certificados emitidos por QTSP.",
    descripcionCompleta: "Existen tres niveles de firma electrónica según eIDAS: simple, avanzada y cualificada. La firma simple (ej: tick en una casilla) tiene validez legal pero baja fuerza probatoria. La firma avanzada requiere identificación del firmante, control exclusivo del medio de firma y detección de alteraciones posteriores (ej: OTP + sello de tiempo). La firma cualificada requiere además un certificado cualificado emitido por un QTSP y dispositivo seguro de creación. FaciliteCasas utiliza firmas electrónicas avanzadas respaldadas por sellos de tiempo cualificado: el usuario se identifica mediante OTP (autenticación), acepta en el canal certificado (firma), y EAD Trust aplica un sello de tiempo cualificado que proporciona la fuerza probatoria legal. Este modelo ofrece el equilibrio óptimo entre usabilidad y seguridad jurídica.",
    icono: "PenTool",
  },
  {
    id: "qtsp",
    categoria: "tecnologia",
    titulo: "QTSP (Prestador Cualificado de Servicios de Confianza)",
    subtitulo: "El Rol de EAD Trust como Entidad Regulada",
    descripcionCorta: "Entidad autorizada para emitir servicios de confianza cualificados bajo supervisión de organismos reguladores nacionales y europeos.",
    descripcionCompleta: "Un Qualified Trust Services Provider (QTSP) o Prestador Cualificado de Servicios de Confianza es una entidad autorizada para emitir certificados cualificados, sellos de tiempo, servicios de entrega certificada y custodia electrónica bajo el Reglamento eIDAS. Estas entidades están sujetas a auditorías técnicas y de seguridad periódicas por organismos de supervisión nacionales (en España, el Ministerio de Asuntos Económicos y Transformación Digital). EAD Trust actúa como QTSP en Facilitea Casa: es quien certifica todas las comunicaciones, aplica los sellos de tiempo, gestiona la custodia electrónica de expedientes y emite los certificados de verificación. Facilitea Casa es la plataforma que orquesta los procesos; EAD Trust es el proveedor regulado que garantiza la validez legal.",
    icono: "BadgeCheck",
    destacado: true
  },

  // CATEGORÍA 3: CLM (CONTRACT LIFECYCLE MANAGEMENT)
  {
    id: "que-es-clm",
    categoria: "clm",
    titulo: "Qué es CLM (Contract Lifecycle Management)",
    subtitulo: "Gestión Integral del Ciclo de Vida Contractual",
    descripcionCorta: "Sistema que gestiona todas las fases de un contrato: preparación, negociación, firma, ejecución, renovación y terminación.",
    descripcionCompleta: "Contract Lifecycle Management (CLM) es una disciplina empresarial que gestiona el ciclo completo de vida de un contrato: desde su preparación inicial (identificación de partes, negociación de términos) pasando por su formalización (firma, activación), ejecución (seguimiento de obligaciones, gestión de incidencias, pagos) hasta su terminación (vencimiento, renovación o cierre). Un sistema CLM centraliza toda la información contractual, automatiza flujos de aprobación, notifica eventos clave (vencimientos, pagos) y genera trazabilidad completa para auditoría y litigio. Facilitea Casa implementa CLM inmobiliario: contratos de arrendamiento, arras y compraventa gestionados de extremo a extremo con certificación eIDAS integrada en cada fase.",
    icono: "FileText",
    destacado: true
  },
  {
    id: "canal-certificado",
    categoria: "clm",
    titulo: "Canal Certificado como Fuente Única de la Verdad",
    subtitulo: "Reducción de Litigios mediante Registro Certificado",
    descripcionCorta: "Todas las comunicaciones, documentos y acuerdos quedan registrados en un único canal certificado, eliminando narrativas contradictorias.",
    descripcionCompleta: "El concepto de 'Fuente Única de la Verdad' (Single Source of Truth) aplicado a contratos significa que todas las interacciones entre las partes (mensajes, confirmaciones, documentos, pagos) ocurren y quedan registradas en un único canal certificado con sellos de tiempo cualificado. Esto elimina el problema tradicional de las comunicaciones dispersas (WhatsApp, email, llamadas, papel) donde cada parte puede tener versiones contradictorias de lo acordado. En Facilitea Casa, el canal certificado es el registro definitivo: si algo no está en el canal, legalmente no ocurrió; si está certificado en el canal, tiene plena validez probatoria. Este modelo reduce drásticamente la litigiosidad porque no hay espacio para la ambigüedad o la manipulación de evidencias.",
    icono: "MessageSquare",
  },
  {
    id: "expediente-probatorio",
    categoria: "clm",
    titulo: "Expediente Probatorio",
    subtitulo: "Validez en Juicio y Exportación Certificada",
    descripcionCorta: "Conjunto completo de todas las evidencias certificadas de un contrato, exportable como PDF con validez legal plena.",
    descripcionCompleta: "El expediente probatorio es el conjunto organizado y certificado de todas las comunicaciones, documentos, eventos y acuerdos que componen la historia completa de una relación contractual. En Facilitea Casa, cada expediente incluye: timeline de eventos con sellos de tiempo, mensajes del chat certificado con hashes y timestamps, documentos uploadados con certificación de integridad, confirmaciones y firmas de ambas partes, incidencias y resoluciones, pagos y justificantes. Este expediente es exportable como PDF firmado digitalmente por EAD Trust, con QR de verificación, y tiene validez legal plena en juicio. Es la 'carpeta de litigio lista' que cualquier abogado necesitaría para defender su caso, pero generada automáticamente durante la vida del contrato.",
    icono: "FolderOpen",
  },

  // CATEGORÍA 4: APLICACIONES PRÁCTICAS
  {
    id: "aceptacion-firma",
    categoria: "aplicaciones",
    titulo: "Aceptación como Firma en Canal Certificado",
    subtitulo: "Validez Legal de Confirmaciones en Canal eIDAS",
    descripcionCorta: "Una aceptación textual ('Acepto', 'Confirmo') en un canal certificado con sello de tiempo cualificado constituye firma válida.",
    descripcionCompleta: "Bajo el marco eIDAS y Ley 6/2020, no se requiere firma manuscrita ni certificado digital cualificado para que una aceptación tenga validez contractual. Basta con que: (1) el usuario esté identificado en el canal (autenticación previa), (2) la aceptación sea inequívoca ('Acepto los términos del contrato'), (3) el mensaje de aceptación esté certificado con sello de tiempo cualificado por un QTSP. Facilitea Casa implementa este modelo: cuando el arrendador o arrendatario escribe 'Confirmo' en respuesta a una propuesta contractual, ese mensaje queda certificado por EAD Trust con timestamp cualificado, identificación del emisor y hash del contenido. Esta aceptación tiene el mismo valor legal que una firma manuscrita o cualificada, con la ventaja de ser más rápida, trazable y verificable.",
    icono: "CheckCircle",
  },
  {
    id: "certificacion-multimedia",
    categoria: "aplicaciones",
    titulo: "Certificación Multimedia (Evidencias)",
    subtitulo: "Hash Criptográfico e Inmutabilidad de Imágenes/Vídeos",
    descripcionCorta: "Cada foto o vídeo subido recibe un hash criptográfico y sello de tiempo, garantizando que no ha sido alterado desde su captura.",
    descripcionCompleta: "La certificación multimedia es clave en disputas sobre estado de inmuebles o vehículos. Cuando un usuario sube una foto del estado de una cocina en el Acta de Estado del Inmueble, Facilitea Casa: (1) calcula un hash SHA-256 de la imagen (huella digital única), (2) registra el hash junto con metadata (fecha, hora, ubicación, nombre archivo), (3) solicita a EAD Trust un sello de tiempo cualificado que certifica que ese hash existía en ese momento preciso. Si posteriormente alguien intenta modificar la imagen (aunque sea un píxel), el hash cambiará y la verificación fallará. Esto crea evidencia inmutable: la imagen que se presenta en juicio es exactamente la que se capturó en el momento certificado, sin posibilidad de manipulación retroactiva.",
    icono: "Camera",
  },
  {
    id: "gestion-fianzas",
    categoria: "aplicaciones",
    titulo: "Gestión de Fianzas y Depósitos Certificados",
    subtitulo: "Trazabilidad de Pagos y Devolución Legal",
    descripcionCorta: "Registro certificado de transferencias de fianzas, depósitos en IVIMA y cálculos de devolución con protección legal para ambas partes.",
    descripcionCompleta: "La gestión de fianzas es una fuente constante de conflictos en arrendamientos: arrendadores que retienen fianzas indebidamente, arrendatarios que no las depositan, disputas sobre deducciones por daños. Facilitea Casa certifica todo el ciclo: (1) Arrendatario sube justificante de transferencia de fianza → certificado con timestamp, (2) Arrendador sube resguardo de depósito en IVIMA → certificado, (3) Durante vida del contrato, cualquier incidencia que pueda afectar la fianza queda registrada con fecha y descripción, (4) Al cierre, el sistema calcula la devolución aplicando deducciones legales documentadas, (5) Arrendatario confirma conformidad con el cálculo → certificado, (6) Arrendador sube justificante de devolución → certificado. Todo el proceso queda en el expediente probatorio, protegiendo legalmente a ambas partes y facilitando resolución rápida en caso de disputa.",
    icono: "CreditCard",
  },
];
