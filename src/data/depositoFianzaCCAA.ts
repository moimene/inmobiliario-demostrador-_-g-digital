/**
 * Requisitos de depósito de fianza por Comunidad Autónoma
 * 
 * BASE LEGAL:
 * - LAU Art. 36: Fianza obligatoria equivalente a 1 mensualidad (vivienda) o 2 mensualidades (local comercial)
 * - Cada CCAA tiene su propio organismo y normativa específica de depósito
 * - Plazos y procedimientos varían según legislación autonómica
 * 
 * IMPORTANTE:
 * - El depósito es OBLIGATORIO en todas las CCAA
 * - Incumplimiento: sanciones económicas y pérdida de garantías
 * - La fianza depositada se devuelve al arrendador tras finalización del contrato
 */

export interface DepositoFianzaCCAA {
  comunidad: string;
  organismo: string;
  plazoDeposito: string; // Plazo desde firma del contrato
  plazoDevolucion: string; // Plazo desde fin del contrato
  sancionIncumplimiento: string;
  enlaceWeb?: string;
  observaciones?: string;
}

export const depositosPorCCAA: Record<string, DepositoFianzaCCAA> = {
  madrid: {
    comunidad: "Comunidad de Madrid",
    organismo: "IVIMA (Instituto de la Vivienda de Madrid)",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 1.000€ según Ley 29/1994 (LAU)",
    enlaceWeb: "https://www.ivima.es/",
    observaciones: "Se puede depositar online a través de la Sede Electrónica de la Comunidad de Madrid",
  },
  
  catalunya: {
    comunidad: "Cataluña",
    organismo: "INCASOL (Institut Català del Sòl)",
    plazoDeposito: "2 meses desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 1.500€ según normativa autonómica",
    enlaceWeb: "https://habitatge.gencat.cat/",
    observaciones: "Obligatorio depositar mediante certificado digital o presencialmente",
  },
  
  andalucia: {
    comunidad: "Andalucía",
    organismo: "Consejería de Fomento, Infraestructuras y Ordenación del Territorio",
    plazoDeposito: "1 mes desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de entre 300€ y 9.000€ según Ley 1/2010",
    enlaceWeb: "https://www.juntadeandalucia.es/organismos/fomentoinfraestructurasyordenaciondelterritorio.html",
    observaciones: "Depósito obligatorio en Registro de Fianzas de Andalucía",
  },
  
  valencia: {
    comunidad: "Comunitat Valenciana",
    organismo: "Conselleria de Vivienda y Arquitectura Bioclimática",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    enlaceWeb: "https://www.gva.es/",
    observaciones: "Depósito telemático disponible mediante certificado digital",
  },
  
  paisVasco: {
    comunidad: "País Vasco / Euskadi",
    organismo: "Etxebide (Servicio Vasco de Vivienda)",
    plazoDeposito: "2 meses desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    enlaceWeb: "https://www.etxebide.euskadi.eus/",
    observaciones: "Obligatorio en las tres provincias vascas (Álava, Bizkaia, Gipuzkoa)",
  },
  
  galicia: {
    comunidad: "Galicia",
    organismo: "Instituto Gallego de la Vivienda y Suelo (IGVS)",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de entre 300€ y 9.000€ según normativa autonómica",
    enlaceWeb: "https://igvs.xunta.gal/",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Galicia",
  },
  
  castillaLeon: {
    comunidad: "Castilla y León",
    organismo: "Consejería de Medio Ambiente, Vivienda y Ordenación del Territorio",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Castilla y León",
  },
  
  canarias: {
    comunidad: "Canarias",
    organismo: "Instituto Canario de la Vivienda",
    plazoDeposito: "1 mes desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Obligatorio en ambas provincias (Las Palmas y Santa Cruz de Tenerife)",
  },
  
  aragon: {
    comunidad: "Aragón",
    organismo: "Instituto Aragonés de la Vivienda",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Aragón",
  },
  
  murcia: {
    comunidad: "Región de Murcia",
    organismo: "Consejería de Fomento e Infraestructuras",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de la Región de Murcia",
  },
  
  baleares: {
    comunidad: "Illes Balears",
    organismo: "Institut Balear de l'Habitatge (IBAVI)",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    enlaceWeb: "https://www.caib.es/sites/habitatge/",
    observaciones: "Obligatorio en todas las islas del archipiélago",
  },
  
  extremadura: {
    comunidad: "Extremadura",
    organismo: "Consejería de Movilidad, Transporte y Vivienda",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Extremadura",
  },
  
  asturias: {
    comunidad: "Principado de Asturias",
    organismo: "Consejería de Medio Rural y Cohesión Territorial",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas del Principado de Asturias",
  },
  
  navarra: {
    comunidad: "Comunidad Foral de Navarra",
    organismo: "Nasuvinsa (Navarra de Suelo y Vivienda)",
    plazoDeposito: "2 meses desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa foral",
    enlaceWeb: "https://www.nasuvinsa.es/",
    observaciones: "Régimen foral propio con normativa específica de Navarra",
  },
  
  cantabria: {
    comunidad: "Cantabria",
    organismo: "Consejería de Obras Públicas, Ordenación del Territorio y Urbanismo",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Cantabria",
  },
  
  rioja: {
    comunidad: "La Rioja",
    organismo: "Consejería de Fomento y Política Territorial",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de La Rioja",
  },
  
  castillaMancha: {
    comunidad: "Castilla-La Mancha",
    organismo: "Consejería de Fomento",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa autonómica",
    observaciones: "Depósito obligatorio en el Registro de Fianzas de Castilla-La Mancha",
  },
  
  ceuta: {
    comunidad: "Ciudad Autónoma de Ceuta",
    organismo: "Consejería de Fomento, Vivienda y Turismo",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa local",
    observaciones: "Normativa específica de la Ciudad Autónoma",
  },
  
  melilla: {
    comunidad: "Ciudad Autónoma de Melilla",
    organismo: "Consejería de Fomento, Juventud y Deportes",
    plazoDeposito: "30 días naturales desde la firma del contrato",
    plazoDevolucion: "1 mes desde la finalización del contrato",
    sancionIncumplimiento: "Multa de hasta 3.000€ según normativa local",
    observaciones: "Normativa específica de la Ciudad Autónoma",
  },
};

/**
 * Función helper para obtener información de depósito según CCAA
 */
export const getDepositoInfo = (comunidadAutonoma: string): DepositoFianzaCCAA | null => {
  const key = comunidadAutonoma.toLowerCase().replace(/\s+/g, "").replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
  return depositosPorCCAA[key] || null;
};
