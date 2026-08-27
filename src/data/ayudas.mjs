export const aidStatus = {
  available: "Disponible ahora",
  byProvider: "Disponible según entidad",
  announced: "Convocatoria pendiente",
  regulation: "En reglamentación",
};

const caliRecoverySource =
  "https://www.cali.gov.co/boletines/publicaciones/193819/alcaldia-de-cali-prioriza-reactivacion-del-tejido-empresarial-con-plan-de-alivios-y-fondo-solidario-de-5000-millones/";

export const aidOpportunities = [
  {
    id: "registro-afectacion-economica",
    title: "Reporta oficialmente la afectación",
    provider: "Alcaldía de Cali y Cámara de Comercio de Cali",
    status: "available",
    summary:
      "Este registro unificado es el primer paso para que las entidades conozcan tu caso y puedan orientar las medidas de recuperación.",
    eligibility:
      "Negocios formales e informales con afectaciones directas e indirectas por el terremoto.",
    institutionRole:
      "La Cámara de Comercio de Cali desarrolló la plataforma tecnológica de la Línea de Afectación Empresarial. Con Confecámaras, la herramienta se convirtió en el Censo Único de Emergencia para orientar la focalización de las medidas de recuperación; registrarse no garantiza recibir un beneficio.",
    details: [
      "Daños en infraestructura, maquinaria, equipos o inventario.",
      "Caída en ventas o interrupción de la operación normal.",
      "Puedes registrarte aunque tu negocio sea informal.",
    ],
    actions: [
      {
        type: "whatsapp",
        label: "Reportar por WhatsApp",
        href: "https://wa.me/573009131811",
      },
      {
        type: "phone",
        label: "Llamar al 602 886 1300",
        href: "tel:+576028861300",
      },
      {
        type: "email",
        label: "Escribir por correo",
        href: "mailto:reactivacali@cali.gov.co",
      },
    ],
    sourceLabel: "Ver fuente oficial de la Cámara",
    sourceUrl:
      "https://www.ccc.org.co/linea-afectacion-empresarial-impacto-terremoto-valle-del-cauca/",
    lastVerified: "2026-08-24",
  },
  {
    id: "alivios-bancarios",
    title: "Pregunta por los alivios de tu banco",
    provider: "Entidades financieras participantes",
    status: "byProvider",
    summary:
      "La banca anunció alivios para personas y negocios damnificados. Las condiciones y la aprobación dependen de cada entidad y de cada crédito.",
    eligibility: "Clientes afectados que tengan créditos vigentes con una entidad participante.",
    details: [
      "Periodos de gracia de hasta 12 meses, según la entidad.",
      "Posibles alivios de intereses, cobros y protección del historial crediticio.",
      "Solicita que revisen también los seguros asociados al crédito.",
    ],
    guidance:
      "Contacta directamente a tu banco y pide una evaluación como damnificado por el terremoto del 10 de agosto.",
    actions: [],
    sourceLabel: "Ver información publicada",
    sourceUrl:
      "https://www.infobae.com/colombia/2026/08/22/terremoto-en-colombia-empresarios-suman-donaciones-y-alivios-financieros-para-la-reconstruccion/",
    lastVerified: "2026-08-24",
  },
  {
    id: "credito-emergencia-comfandi",
    title: "Crédito de Emergencia Comfandi",
    provider: "Comfandi",
    status: "byProvider",
    summary:
      "Crédito de libre destinación para afiliados que necesiten atender una emergencia. Puede apoyar necesidades del negocio, pero no es un subsidio y debe pagarse con intereses.",
    eligibility:
      "Afiliados Comfandi de categorías A, B o C, con mínimo 3 meses de afiliación y 3 meses de antigüedad laboral, sujetos a evaluación y políticas de crédito.",
    details: [
      "Montos desde $1.000.000 hasta $20.000.000.",
      "Plazo de hasta 60 meses y primera cuota hasta 60 días después del desembolso.",
      "El dinero es de libre destinación y se desembolsa en una cuenta bancaria a nombre del solicitante.",
      "Antes de aceptar, revisa la tasa, los seguros, el valor de la cuota y el costo total en la simulación.",
    ],
    guidance:
      "Simula y solicita únicamente en la App Mi Comfandi o en la Sucursal Virtual Personas, desde los canales oficiales de Comfandi.",
    actions: [],
    sourceLabel: "Consultar condiciones en Comfandi",
    sourceUrl:
      "https://www.comfandi.com.co/personas/credito-y-seguros/credito-de-emergencia",
    lastVerified: "2026-08-27",
  },
  {
    id: "fondo-recuperacion-productiva",
    title: "Fondo para reponer equipos e insumos",
    provider: "Alcaldía de Cali",
    status: "announced",
    summary:
      "La ciudad proyectó $5.000 millones en aportes productivos no reembolsables entregados en especie.",
    eligibility: "Unidades productivas afectadas; los requisitos definitivos todavía no se han publicado.",
    details: [
      "Reposición de herramientas, maquinaria, equipos e insumos esenciales.",
      "La ayuda anunciada sería en especie, no en efectivo.",
      "Aún no hay formulario ni fecha de apertura publicados.",
    ],
    actions: [],
    sourceLabel: "Ver anuncio oficial",
    sourceUrl: caliRecoverySource,
    lastVerified: "2026-08-24",
  },
  {
    id: "microcreditos-especiales",
    title: "Microcréditos con tasas diferenciales",
    provider: "Alcaldía de Cali",
    status: "announced",
    summary:
      "Se están estructurando líneas especiales de microcrédito para apoyar la recuperación de los negocios afectados.",
    eligibility: "Pendiente de publicación de operadores, montos, tasas y requisitos.",
    details: ["Todavía no existe un canal oficial de solicitud.", "No entregues documentos ni dinero a intermediarios."],
    actions: [],
    sourceLabel: "Ver anuncio oficial",
    sourceUrl: caliRecoverySource,
    lastVerified: "2026-08-24",
  },
  {
    id: "alivios-tributarios-servicios",
    title: "ICA, predial y servicios públicos",
    provider: "Alcaldía de Cali y entidades competentes",
    status: "regulation",
    summary:
      "El Distrito trabaja en alivios tributarios y mecanismos temporales para servicios públicos, sujetos a habilitación jurídica.",
    eligibility: "Los beneficiarios y requisitos se definirán cuando las medidas sean reglamentadas.",
    details: [
      "Se estudian medidas relacionadas con ICA e impuesto predial.",
      "También se preparan alivios temporales en servicios públicos.",
      "No hay solicitudes habilitadas todavía.",
    ],
    actions: [],
    sourceLabel: "Ver anuncio oficial",
    sourceUrl: caliRecoverySource,
    lastVerified: "2026-08-24",
  },
  {
    id: "medidas-nacionales",
    title: "Empleo, Fondo Emprender y otros alivios nacionales",
    provider: "Gobierno Nacional",
    status: "announced",
    summary:
      "Cali espera medidas nacionales para empleo, emprendimiento, impuestos, arrendamientos y turismo en las regiones afectadas.",
    eligibility: "Pendiente de decretos, reglamentación y convocatorias específicas.",
    details: [
      "Posible Fondo Emprender del SENA especializado para afectados.",
      "Posibles subsidios al empleo formal e informal.",
      "Los beneficios todavía no están disponibles para solicitud.",
    ],
    actions: [],
    sourceLabel: "Ver anuncio oficial",
    sourceUrl: caliRecoverySource,
    lastVerified: "2026-08-24",
  },
];
