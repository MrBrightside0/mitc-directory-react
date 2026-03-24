// Data del assessment basada en Autodiagnostico_Madurez_IA_CII.docx

export const SECTORES = [
  'Manufactura', 'Logística', 'Retail / Comercio', 'Servicios profesionales',
  'Financiero', 'Salud', 'Educación', 'Tecnología', 'Otro'
];

export const TAMANOS = [
  '1 a 10', '11 a 50', '51 a 250', '251 a 1,000', 'Más de 1,000'
];

export const RETOS = [
  'Reducir costos operativos', 'Incrementar ventas', 'Mejorar servicio al cliente',
  'Tener mejor información para decidir', 'Automatizar tareas repetitivas',
  'Reducir errores', 'Mejorar productividad del equipo', 'Mejorar control financiero',
  'Mejorar cobranza', 'Mejorar tiempos de respuesta', 'Otro'
];

export const AREAS_MEJORA = [
  'Operaciones', 'Finanzas', 'Recursos Humanos', 'Marketing y ventas',
  'Atención al cliente', 'TI', 'Logística / cadena de suministro',
  'Innovación / desarrollo de producto', 'Dirección general', 'Otro'
];

export const ERP_OPTIONS = [
  'Oracle', 'SAP', 'Dynamics 365', 'Odoo', 'Microsip', 'Contpaq',
  'ASPEL', 'QAD', 'No tengo ERP / uso Excel', 'Otro ERP'
];

export const CRM_OPTIONS = [
  'Zoho', 'Salesforce', 'HubSpot', 'Dynamics 365 CRM', 'Pipedrive',
  'No tengo CRM / uso Excel', 'Otro CRM'
];

export const TIPOS_IA = [
  'IA generativa (ChatGPT, Copilot, Gemini, etc.)', 'Análisis predictivo',
  'Machine learning / análisis de datos', 'Business Intelligence',
  'Visión por computadora', 'Automatización con IA',
  'No tengo claridad todavía', 'Otro'
];

export const PILARES = [
  {
    id: 'estrategia',
    nombre: 'Estrategia y toma de decisiones',
    descripcion: 'Mide si la empresa tiene claridad de visión, prioridades, métricas y alineación de IA con los objetivos de negocio. Es el pilar fundacional: sin estrategia, la IA se convierte en experimentación sin dirección.',
    preguntas: [
      'Existe una estrategia clara y documentada para la adopción de IA.',
      'Las decisiones relevantes del negocio se apoyan cada vez más en datos e indicadores.',
      'La dirección tiene claridad sobre los beneficios esperados de implementar IA.',
      'Existen métricas o criterios para evaluar el valor o impacto de una iniciativa tecnológica.',
      'Se han identificado áreas concretas donde la IA podría generar valor para el negocio.'
    ],
    retroalimentacion: [
      'Una estrategia documentada de IA no significa un plan de 100 páginas. Con una página que responda: ¿por qué queremos IA?, ¿qué esperamos lograr?, ¿quién es responsable? y ¿cómo mediremos el éxito?, ya tienes una base estratégica suficiente.',
      'La IA no crea una cultura de datos, la amplifica. Si las decisiones hoy se toman por intuición, la IA producirá análisis que nadie consultará. Un score de 3+ aquí es una fortaleza competitiva real.',
      'Cuando la dirección espera beneficios concretos ("reducir 30% el tiempo de cierre de ventas"), los proyectos tienen objetivo medible. Convierte las expectativas en métricas de negocio antes de empezar.',
      'Las empresas que ya evalúan proyectos tecnológicos con criterios claros tienen una ventaja enorme al implementar IA porque pueden comparar, priorizar y demostrar ROI.',
      'La identificación de oportunidades concretas es la diferencia entre "queremos usar IA" y "vamos a automatizar la validación de facturas en 60 días". El primero es una intención; el segundo es un proyecto.'
    ],
    riesgo: 'Si el promedio de este pilar es menor a 2.5, no inicies implementación de IA todavía. Invierte primero en definir la estrategia. Una empresa con bajo pilar de estrategia que implementa IA termina con proyectos huérfanos: funcionales pero abandonados.'
  },
  {
    id: 'datos',
    nombre: 'Datos y gobierno de datos',
    descripcion: 'Mide si la empresa tiene información usable, accesible, confiable y con responsables claros. Este pilar es la infraestructura invisible de toda iniciativa de IA: sin datos de calidad, la IA no puede funcionar.',
    preguntas: [
      'La calidad de los datos de la empresa es suficiente para usarlos en análisis o automatización.',
      'La información crítica está actualizada y disponible cuando se necesita.',
      'Existe claridad sobre quién es responsable de la información clave del negocio.',
      'La empresa tiene criterios mínimos de orden, acceso y control sobre sus datos.',
      'La información está lo suficientemente centralizada o conectada para habilitar iniciativas de IA.'
    ],
    retroalimentacion: [
      'El 80% del tiempo de un proyecto de IA se invierte en preparar datos, no en construir el modelo. Un proyecto de higiene de datos de 4-6 semanas puede desbloquearlo todo.',
      'La IA que impacta el día a día necesita datos en tiempo real o near-real-time. Si la información llega con 2-3 días de retraso, la IA puede hacer análisis histórico pero no ayudarte a decidir hoy.',
      'El gobierno de datos sin responsable es la causa #1 de proyectos de IA fallidos. Crea una matriz simple: tipo de dato → responsable → frecuencia de actualización → sistema donde vive.',
      'La IA con datos no controlados puede amplificar errores o exponer información sensible. Define al menos 3 reglas mínimas de gobierno de datos.',
      'La centralización no significa tener todo en un solo sistema: significa que los sistemas pueden comunicarse. Antes de elegir una herramienta de IA, responde: ¿tengo al menos 12 meses de datos limpios del proceso que quiero mejorar?'
    ],
    riesgo: 'Un score promedio menor a 2.5 en este pilar es el principal predictor de fracaso en proyectos de IA. Implementar IA sobre datos deficientes puede generar decisiones incorrectas que cuestan más que el problema original. Invierte en este pilar antes que en cualquier otra iniciativa de IA.'
  },
  {
    id: 'capacidades',
    nombre: 'Capacidades y competencias',
    descripcion: 'Mide si el equipo entiende IA, sabe identificar casos de uso y tiene las habilidades mínimas para operar iniciativas. No se trata de tener ingenieros de datos: se trata de tener líderes que sepan qué pedirle a la IA.',
    preguntas: [
      'Los líderes de la empresa entienden de forma general qué es la IA y qué puede aportar.',
      'El equipo tiene conocimientos básicos para participar en iniciativas de IA.',
      'La empresa ha invertido en capacitación o aprendizaje relacionado con IA, automatización o análisis de datos.',
      'Existe capacidad interna o externa confiable para evaluar soluciones de IA.',
      'La organización tiene disposición para aprender y adaptarse a nuevas formas de trabajo apoyadas en IA.'
    ],
    retroalimentacion: [
      'Los líderes que no entienden IA suelen sobreestimar (esperan magia) o subestimar (creen que no aplica). Un taller ejecutivo de 2 horas sobre "IA aplicada a negocios" tiene un ROI exponencial.',
      'El perfil más valioso en un equipo de IA no es el técnico: es el experto del proceso que puede decirle al sistema qué está mal y por qué.',
      'Las empresas que invierten en aprendizaje de IA 6-12 meses antes de implementar tienen una tasa de adopción 2-3 veces mayor.',
      'Si no tienes capacidad de evaluar soluciones internamente, un aliado de confianza con experiencia es tu activo más valioso. Pide: casos similares, métricas reales y acceso al cliente de referencia.',
      'La resistencia al cambio suele ser miedo a la pérdida de relevancia o control. Comunica que el objetivo de la IA es amplificar el trabajo del equipo, no reemplazarlo.'
    ],
    riesgo: null
  },
  {
    id: 'tecnologia',
    nombre: 'Tecnología y capacidad de implementación',
    descripcion: 'Mide si existen sistemas, infraestructura, herramientas y aliados para ejecutar. Es el pilar que convierte la intención en acción.',
    preguntas: [
      'La empresa cuenta con herramientas tecnológicas que podrían integrarse con soluciones de IA.',
      'La infraestructura actual permite hacer pruebas piloto sin una disrupción excesiva.',
      'La organización cuenta con apoyo interno o aliados externos para implementar nuevas soluciones tecnológicas.',
      'Existen procesos tecnológicos suficientemente estables para incorporar automatización o analítica avanzada.',
      'La empresa está en condiciones de pasar de una idea a una prueba funcional en un plazo razonable.'
    ],
    retroalimentacion: [
      'Microsoft 365, Google Workspace, Salesforce, HubSpot, SAP, Oracle ya tienen capacidades de IA integradas. Haz un inventario de qué módulos de IA están disponibles pero no activados en tus licencias actuales.',
      'Si cualquier prueba tecnológica requiere meses de preparación, el problema no es tecnológico: es de governance y agilidad de TI. Define un "sandbox de IA" para probar sin afectar la operación.',
      'Construye un equipo híbrido: un líder interno que conoce el negocio + un aliado externo que conoce la tecnología. Esa combinación genera capacidad interna que permanece después del proyecto.',
      'Automatizar un proceso inestable con IA solo automatiza el caos. Primero estandariza, después optimiza, después automatiza.',
      'Las empresas que pasan de idea a piloto en 4-8 semanas tienen ventaja competitiva real. Si tarda más de 3 meses, el problema es de procesos de aprobación, no de tecnología.'
    ],
    riesgo: null
  },
  {
    id: 'adopcion',
    nombre: 'Uso actual y adopción',
    descripcion: 'Mide si la empresa ya usa IA en algún proceso, aprende de esos usos y tiene capacidad de escalar. Es el pilar que refleja el estado real de la adopción hoy.',
    preguntas: [
      'La empresa ya utiliza alguna forma de IA o automatización inteligente en al menos un proceso.',
      'Existen áreas donde la IA ya ha mostrado beneficios tangibles o visibles.',
      'La organización tiene interés real en escalar el uso de IA a otras áreas.',
      'Los usuarios o equipos muestran apertura para incorporar nuevas herramientas de IA.',
      'La empresa tiene claridad sobre qué procesos podrían automatizarse o mejorar con IA en el corto plazo.'
    ],
    retroalimentacion: [
      'Las empresas que ya "tocaron" la IA tienen una ventaja de velocidad. Si ya usas IA en algún proceso, documenta qué funcionó, qué no y qué datos necesitabas que no tenías.',
      'Un caso de éxito real, aunque pequeño, convence más que cualquier presentación. Documenta los beneficios con números concretos y compártelo con el equipo directivo.',
      'El interés sin estructura produce proyectos fallidos. Crea un proceso: cualquier área que quiera IA debe presentar problema, dato disponible, objetivo medible y responsable.',
      'Identifica 2-3 "campeones de IA": personas entusiastas y respetadas que serán los primeros usuarios. Son el mejor canal de adopción que existe.',
      'Los mejores candidatos para automatización rápida son procesos: repetitivos, basados en reglas claras, con datos disponibles y con resultado verificable.'
    ],
    riesgo: null
  },
  {
    id: 'liderazgo',
    nombre: 'Liderazgo, gobernanza y gestión del cambio',
    descripcion: 'Mide si la dirección impulsa, patrocina, gobierna y da seguimiento a las iniciativas de IA. Es el pilar que determina si la IA se convierte en ventaja competitiva sostenible.',
    preguntas: [
      'La alta dirección impulsa la transformación digital como prioridad estratégica.',
      'Existe un patrocinador o responsable interno que podría liderar una iniciativa de IA.',
      'La empresa comunica con claridad los cambios tecnológicos y su propósito.',
      'Existe una cultura favorable a la innovación, la experimentación y la mejora continua.',
      'La empresa considera aspectos de riesgo, confidencialidad, cumplimiento o impacto antes de implementar nuevas tecnologías.'
    ],
    retroalimentacion: [
      'Sin el respaldo visible de la dirección, los proyectos de IA pierden recursos en la primera crisis operativa. Conecta la IA con el objetivo más importante del negocio hoy.',
      'El patrocinador no es el equipo de TI: es un directivo de negocio con autoridad para tomar decisiones y remover obstáculos. Sin patrocinador, los problemas se resuelven en meses, no en días.',
      'Las empresas que comunican bien los cambios tecnológicos tienen 3 veces más probabilidad de adopción exitosa. Define: qué se implementa, por qué, cómo afecta cada rol y qué apoyo hay disponible.',
      'En una cultura que castiga el error, nadie querrá probar algo nuevo. Crea un "espacio seguro para la IA": comunica que los primeros proyectos son de aprendizaje, no de producción.',
      'Los riesgos más comunes: uso de datos sin consentimiento, decisiones algorítmicas con sesgo, dependencia de un solo proveedor. Antes de implementar, responde: ¿tenemos el consentimiento legal? ¿Cómo auditamos las decisiones del sistema?'
    ],
    riesgo: 'Un score bajo en este pilar, combinado con scores bajos en Datos y Estrategia, es la combinación más riesgosa. Significa que no hay bases, no hay gobierno y no hay quien lidere. La recomendación es iniciar con un ejercicio de alineación ejecutiva de 1 día antes de cualquier inversión tecnológica.'
  }
];

export const ESCALA_LABELS = [
  { value: 1, label: 'No existe / No considerado' },
  { value: 2, label: 'Inicial / Exploración' },
  { value: 3, label: 'Básico / Piloto' },
  { value: 4, label: 'En expansión' },
  { value: 5, label: 'Integrado / Maduro' }
];

export const AREAS_IMPACTO = [
  'Operaciones', 'Finanzas', 'Recursos Humanos', 'Reclutamiento y selección',
  'Marketing y ventas', 'Atención al cliente', 'Innovación y desarrollo de productos',
  'TI y ciberseguridad', 'Cadena de suministro / logística', 'Otra'
];

export const SOLUCIONES = [
  'Análisis de documentos con IA', 'Asistentes virtuales / chatbots',
  'Análisis de datos avanzado', 'Optimización de procesos',
  'IA generativa para contenido', 'Gestión de clientes y ventas',
  'Control financiero y riesgos', 'Gestión de cobranza',
  'Desarrollo de software con IA', 'Otra'
];

export const TIPOS_APOYO = [
  'Claridad estratégica / roadmap', 'Capacitación ejecutiva',
  'Taller para detectar oportunidades', 'Piloto rápido en un área concreta',
  'Implementación de solución', 'Integración con sistemas / datos',
  'Gobernanza y riesgos', 'Aún no lo tengo claro'
];

export const NIVELES_MADUREZ = [
  { min: 1.0, max: 2.0, nivel: 'Exploración inicial', descripcion: 'La empresa está entendiendo la IA y aún no tiene condiciones suficientes para capturar valor consistente.' },
  { min: 2.1, max: 3.0, nivel: 'En camino', descripcion: 'Hay intención y algunas bases, pero sin estructura suficiente para escalar.' },
  { min: 3.1, max: 4.0, nivel: 'Implementación básica', descripcion: 'Hay pilotos activos; falta formalizar procesos, métricas y gobierno.' },
  { min: 4.1, max: 4.5, nivel: 'Expansión estratégica', descripcion: 'La IA ya impacta decisiones y procesos; el reto es estandarizar y escalar.' },
  { min: 4.6, max: 5.0, nivel: 'Líder en IA', descripcion: 'Integración avanzada con medición y ventaja competitiva clara.' }
];

export function getNivelMadurez(score) {
  for (const nivel of NIVELES_MADUREZ) {
    if (score >= nivel.min && score <= nivel.max) return nivel;
  }
  return NIVELES_MADUREZ[0];
}

// Hints por pregunta (se muestran durante el cuestionario)
export const HINTS = {
  // Sección 1
  sector: 'El sector y tamaño de tu empresa definen el punto de partida realista para IA. Las empresas de manufactura y logística suelen tener datos estructurados ideales para IA predictiva. Las de servicios profesionales tienen mayor oportunidad con IA generativa. Empresas de 11 a 250 colaboradores son las que más se benefician de quick wins de IA.',

  // Sección 2
  retos: 'Los retos que selecciones determinan qué tipo de IA tiene sentido para ti hoy. Si eliges 3 retos de áreas completamente distintas, es señal de que la empresa necesita primero un ejercicio de priorización antes de implementar IA.',
  areasMejora: 'El área con mayor necesidad de mejora es generalmente el mejor candidato para un primer piloto de IA: hay motivación, hay problema claro, hay receptividad al cambio. El área seleccionada debe coincidir con el líder que será el sponsor del primer proyecto.',
  prioridad: 'Un score de 1 o 2 no es malo: significa que antes de IA hay que resolver fundamentos. Un score de 4 o 5 sin bases sólidas en datos y tecnología es una señal de riesgo: hay urgencia pero no hay condiciones.',
  resultadoEsperado: 'Las respuestas vagas ("ser más eficientes") sugieren exploración; las específicas ("reducir 20% el tiempo de atención") sugieren preparación real. Si el resultado involucra tecnología específica, redirige hacia el problema de negocio primero.',

  // Sección 3
  erp: 'SAP, Oracle y Dynamics 365 tienen conectores nativos con plataformas de IA, lo que acelera la integración. Si operas en Excel, puedes usar IA generativa como punto de entrada. Si tienes ERP, solicita a TI un inventario de datos disponibles vía API.',
  crm: 'Salesforce y HubSpot tienen módulos de IA integrados (Einstein AI, HubSpot AI) que son quick wins inmediatos. Si tienes CRM pero no lo usas consistentemente, la IA sobre datos incompletos amplifica errores.',
  tiposIA: 'Si solo conoces IA generativa, hay riesgo de intentar resolver con ChatGPT problemas que necesitan análisis predictivo. Conocer Business Intelligence pero no IA predictiva indica un paso intermedio: la empresa analiza el pasado pero no predice el futuro.',

  // Sección 10
  areasImpacto: 'Las áreas seleccionadas, cruzadas con tus retos y nivel de madurez, definen el mapa de oportunidades real. Pregúntate: ¿en cuál de estas áreas tengo mejores datos hoy? Esa es tu punto de entrada ideal.',
  soluciones: 'Las soluciones con mayor ROI demostrado en empresas medianas son: análisis de documentos con IA, asistentes virtuales para atención a clientes y gestión inteligente de cobranza. El criterio debe ser: impacto × factibilidad × velocidad.',
  tipoApoyo: '"Claridad estratégica" y "Capacitación ejecutiva" indican etapa temprana; "Piloto rápido" e "Implementación" indican etapa avanzada. Si es "Aún no lo tengo claro", el primer paso es un diagnóstico guiado.',

  // Sección 11
  desafios: 'Los frenos más comunes: falta de claridad sobre por dónde empezar (40%), falta de datos de calidad (30%), resistencia cultural (15%) y presupuesto insuficiente (15%). Cada freno tiene una ruta de desbloqueamiento diferente.',
  preocupacion: 'Las preocupaciones más frecuentes: perder control sobre decisiones, exposición de datos, que el equipo no adopte la tecnología y que la inversión no se justifique. Todas son legítimas y todas tienen respuesta.',
  recursosNecesarios: 'El recurso más subestimado no es el dinero ni la tecnología: es el tiempo de personas clave del negocio para participar activamente en los proyectos.',
  comentarioExtra: 'Presta atención a menciones de cambios organizacionales recientes: fusiones, reestructuras, crisis. Estos contextos afectan profundamente la capacidad de implementar cualquier iniciativa de cambio.',
};

// Retroalimentación contextual por sección
export const RETRO_SECTOR = 'El sector y tamaño de tu empresa definen el punto de partida realista para IA. Las empresas de manufactura y logística suelen tener datos estructurados que son ideales para IA predictiva. Las de servicios profesionales tienen mayor oportunidad con IA generativa.';

export const RETRO_RETOS = {
  'Reducir costos operativos': 'La IA de automatización de procesos (RPA + IA) es tu camino más rápido.',
  'Incrementar ventas': 'El scoring de clientes y la predicción de cierre con IA pueden incrementar conversión significativamente.',
  'Mejorar servicio al cliente': 'Los chatbots y asistentes virtuales con IA pueden entregar valor visible en menos de 60 días.',
  'Tener mejor información para decidir': 'El análisis predictivo y los dashboards inteligentes son tu prioridad.',
  'Automatizar tareas repetitivas': 'La automatización inteligente (RPA + IA) es el punto de entrada más rápido y medible.',
  'Reducir errores': 'La IA de detección de anomalías puede reducir errores en procesos repetitivos hasta en un 90%.',
  'Mejorar productividad del equipo': 'Herramientas como Copilot y asistentes de IA pueden incrementar productividad individual en 20-30%.',
  'Mejorar control financiero': 'El análisis predictivo financiero y la detección de anomalías en transacciones son casos de uso de alto ROI.',
  'Mejorar cobranza': 'La gestión inteligente de cobranza con scoring predictivo es uno de los casos de uso con mayor ROI demostrado.',
  'Mejorar tiempos de respuesta': 'Los asistentes virtuales y la automatización de workflows pueden reducir tiempos de respuesta drásticamente.',
};

export const RETRO_ERP = {
  'Oracle': 'Oracle tiene Oracle Analytics Cloud con IA integrada, lo que acelera la integración considerablemente.',
  'SAP': 'SAP tiene SAP AI Core con conectores nativos, lo que acelera considerablemente la integración.',
  'Dynamics 365': 'Dynamics 365 tiene módulos de IA integrados con Azure AI que pueden activarse con configuración básica.',
  'Odoo': 'Las integraciones son posibles pero requieren trabajo de extracción de datos adicional (APIs o exportaciones).',
  'Microsip': 'Las integraciones requieren exportaciones de datos. No es un bloqueador, pero sí un factor de tiempo.',
  'Contpaq': 'Las integraciones requieren exportaciones de datos. No es bloqueador, pero agrega tiempo y costo.',
  'ASPEL': 'Las integraciones requieren trabajo adicional de extracción de datos.',
  'QAD': 'QAD permite integraciones vía API para conectar con soluciones de IA.',
  'No tengo ERP / uso Excel': 'No estás en condiciones de implementar IA avanzada todavía, pero sí puedes usar IA generativa para análisis, síntesis y automatización de reportes como punto de entrada.',
};

export const RETRO_CRM = {
  'Salesforce': 'Salesforce tiene Einstein AI integrado que puede activarse con configuración básica — es un quick win inmediato.',
  'HubSpot': 'HubSpot tiene HubSpot AI integrado que puede activarse sin desarrollo adicional — es un quick win inmediato.',
  'Zoho': 'Zoho tiene Zia AI que ofrece predicciones de ventas y análisis de sentimiento.',
  'Dynamics 365 CRM': 'Dynamics 365 CRM se integra nativamente con Azure AI para insights de ventas.',
  'Pipedrive': 'Pipedrive ofrece automatizaciones con IA para gestión de pipeline de ventas.',
  'No tengo CRM / uso Excel': 'La IA de ventas y atención al cliente tiene un techo muy bajo sin CRM. Antes de implementar IA en esas áreas, conviene implantar el CRM primero.',
};
