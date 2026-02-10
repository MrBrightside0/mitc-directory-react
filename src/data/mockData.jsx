// src/data/mockData.jsx

// 1. CATEGORÍAS (Usadas en el filtro)
export const CATEGORIES = [
  'Todas', 
  'Software', 
  'Fintech', 
  'Data Science', 
  'Manufactura 4.0', 
  'Automotriz', 
  'Healthtech', 
  'Logística', 
  'Agrotech', 
  'Nanotech',
  'Ciberseguridad',
  'Proptech',
  'Legaltech',
  'Edtech',
  'IoT'
];

// 2. DATOS DE EMPRESAS (Enriquecidos con Contacto)
export const MOCK_DATA = [
  // SOFTWARE & DATA
  { 
    id: 1, 
    name: 'Softtek', 
    commercialName: 'Softtek Global Services',
    differentiator: 'Creadores del modelo Nearshore',
    targetAudience: ['Enterprise'],
    industry: 'Software', 
    tags: ['AI', 'Cloud', 'Global'], 
    location: 'Monterrey, NL', 
    verified: true, 
    tier: 'Titan', 
    color: 'from-blue-600 to-blue-900', 
    domain: 'softtek.com', 
    email: 'info@softtek.com', // Nuevo
    phone: '+52 (81) 8151 8888', // Nuevo
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop', 
    desc: 'Líder global en soluciones digitales. Ayudamos a las empresas a cerrar la brecha digital.',
    services: [
        'Desarrollo de Aplicaciones Móviles', 
        'Cloud Migration & DevOps', 
        'Ciberseguridad Empresarial',
        'Staffing de TI Especializado',
        'Modernización de Sistemas Legacy',
        'Implementación SAP/Oracle',
        'QA & Testing Automatizado',
        'Diseño UX/UI Corporativo'
    ],
    products: 'FRIDA Intelligent Automation'
  },
  { 
    id: 2, 
    name: 'DataRegio', 
    commercialName: 'DataRegio Analytics',
    differentiator: 'Transformamos datos en ventas reales',
    targetAudience: ['PyME', 'Startup'],
    industry: 'Data Science', 
    tags: ['Big Data', 'Retail'], 
    location: 'San Pedro, NL', 
    verified: true, 
    tier: 'Specialist', 
    color: 'from-emerald-600 to-emerald-900', 
    domain: 'databricks.com', 
    email: 'contacto@dataregio.mx', // Nuevo
    phone: '+52 (81) 8340 1234', // Nuevo
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', 
    desc: 'Consultoría boutique transformando datos complejos en estrategias de retail accionables.',
    services: [
        'Business Intelligence (BI)', 
        'Ingeniería de Datos (ETL)', 
        'Modelos Predictivos de Venta',
        'Segmentación de Clientes con IA',
        'Data Warehousing',
        'Gobernanza de Datos',
        'Visualización en Tableau/PowerBI'
    ],
    products: 'RetailDash Analytics Suite'
  },
  { 
    id: 13, 
    name: 'Neurona Lab', 
    commercialName: 'Neurona Lab AI',
    differentiator: 'IA aplicada a procesos industriales reales',
    targetAudience: ['Enterprise', 'PyME'],
    industry: 'Software', 
    tags: ['Machine Learning', 'Python'], 
    location: 'Monterrey, NL', 
    verified: false, 
    tier: 'Startup', 
    color: 'from-indigo-600 to-indigo-900', 
    domain: 'openai.com', 
    email: 'hola@neuronalab.ai', // Nuevo
    phone: '+52 (81) 1234 5678', // Nuevo
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop', 
    desc: 'Laboratorio de IA enfocado en optimización de procesos industriales.',
    services: [
        'Visión Computacional', 
        'Optimización de Procesos', 
        'Consultoría en IA Generativa',
        'Desarrollo de Chatbots (NLP)',
        'Mantenimiento Predictivo',
        'Análisis de Sentimiento',
        'Deep Learning para Industria'
    ],
    products: 'VisionAI Control'
  },
  
  // FINTECH
  { 
    id: 3, 
    name: 'FinCore', 
    commercialName: 'FinCore Banking',
    differentiator: 'Infraestructura bancaria segura y escalable',
    targetAudience: ['Enterprise', 'Startup'],
    industry: 'Fintech', 
    tags: ['Blockchain', 'Banking'], 
    location: 'San Pedro, NL', 
    verified: true, 
    tier: 'Scaleup', 
    color: 'from-slate-700 to-slate-900', 
    domain: 'stripe.com', 
    email: 'security@fincore.com', // Nuevo
    phone: '+52 (81) 9999 8888', // Nuevo
    banner: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', 
    desc: 'Infraestructura bancaria de nueva generación y seguridad financiera.',
    services: [
        'Pasarelas de Pago Custom', 
        'Seguridad Bancaria (PCI DSS)', 
        'Integración de APIs Financieras',
        'Desarrollo Blockchain',
        'Smart Contracts',
        'Prevención de Fraude con IA',
        'Billeteras Digitales (Wallets)'
    ],
    products: 'CoreBank API'
  },
  { 
    id: 16, 
    name: 'RegioLend', 
    commercialName: 'RegioLend Solutions',
    differentiator: 'Micro-créditos aprobados en minutos',
    targetAudience: ['PyME', 'Startup'],
    industry: 'Fintech', 
    tags: ['Lending', 'SaaS'], 
    location: 'Monterrey, NL', 
    verified: true, 
    tier: 'Startup', 
    color: 'from-sky-600 to-sky-900', 
    domain: 'kavak.com', 
    email: 'soporte@regiolend.com', // Nuevo
    phone: '+52 (81) 7777 6666', // Nuevo
    banner: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataforma de micro-créditos automatizados para PyMEs del norte.',
    services: [
        'Micro-créditos Automatizados', 
        'Scoring Crediticio Algorítmico', 
        'SaaS Financiero White-Label',
        'Gestión de Cobranza Digital',
        'Verificación de Identidad (KYC)',
        'Análisis de Riesgo',
        'Factoraje Financiero'
    ],
    products: 'PrestamoFast Engine'
  },

  // MANUFACTURA & AUTO
  { 
    id: 8, 
    name: 'ManuFact', 
    commercialName: 'ManuFact Robotics',
    differentiator: 'Automatización 4.0 llave en mano',
    targetAudience: ['Enterprise'],
    industry: 'Manufactura 4.0', 
    tags: ['Robotics', 'Auto'], 
    location: 'Santa Catarina', 
    verified: true, 
    tier: 'Titan', 
    color: 'from-red-600 to-red-900', 
    domain: 'tesla.com', 
    email: 'sales@manufact.com', // Nuevo
    phone: '+52 (81) 5555 4444', // Nuevo
    banner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', 
    desc: 'Automatización industrial y robótica avanzada para líneas de ensamblaje.',
    services: [
        'Integración de Celdas Robóticas', 
        'Programación de PLCs', 
        'Diseño Industrial CAD/CAM',
        'Gemelos Digitales de Planta',
        'Sistemas SCADA',
        'IoT Industrial (IIoT)',
        'Consultoría Lean Manufacturing'
    ],
    products: 'AssemblyLine Pro'
  },
  { 
    id: 15, 
    name: 'AutoSoft', 
    commercialName: 'AutoSoft Embedded',
    differentiator: 'Software crítico para la movilidad eléctrica',
    targetAudience: ['Enterprise'],
    industry: 'Automotriz', 
    tags: ['Embedded', 'EV'], 
    location: 'Saltillo/Mty', 
    verified: true, 
    tier: 'Enterprise', 
    color: 'from-zinc-600 to-zinc-900', 
    domain: 'kia.com', 
    email: 'engineering@autosoft.com', // Nuevo
    phone: '+52 (844) 411 2233', // Nuevo
    banner: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', 
    desc: 'Software embebido para vehículos eléctricos y sistemas autónomos.',
    services: [
        'Desarrollo de Sistemas Embebidos', 
        'Testing Automotriz (HIL/SIL)', 
        'Telemática y V2X',
        'Infotainment Systems',
        'Gestión de Baterías (BMS)',
        'Seguridad Funcional (ISO 26262)',
        'ADAS Algorithms'
    ],
    products: 'E-Drive OS'
  },

  // HEALTH & BIO
  { 
    id: 5, 
    name: 'HealthAI', 
    commercialName: 'HealthAI Diagnostics',
    differentiator: 'Diagnóstico radiológico asistido por IA',
    targetAudience: ['Enterprise', 'PyME'],
    industry: 'Healthtech', 
    tags: ['Imaging', 'AI'], 
    location: 'Monterrey, NL', 
    verified: true, 
    tier: 'Scaleup', 
    color: 'from-cyan-600 to-cyan-900', 
    domain: 'pfizer.com', 
    email: 'diagnostics@healthai.com', // Nuevo
    phone: '+52 (81) 2222 3333', // Nuevo
    banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Diagnóstico asistido por IA para radiología y optimización hospitalaria.',
    services: [
        'Análisis de Imágenes Médicas (DICOM)', 
        'Gestión Hospitalaria (HIS)', 
        'Plataformas de Telemedicina',
        'Expediente Clínico Electrónico',
        'Interoperabilidad HL7/FHIR',
        'Triaje Automatizado con IA',
        'Monitoreo Remoto de Pacientes'
    ],
    products: 'RadioScan AI'
  },
  { 
    id: 14, 
    name: 'BioNorte', 
    commercialName: 'BioNorte Labs',
    differentiator: 'Genómica para agricultura sustentable',
    targetAudience: ['Startup', 'PyME'],
    industry: 'Biotech', // Keeping 'Biotech' even if not in main CATEGORIES list, filter logic usually handles 'Todas' or specific matches. 
    tags: ['Genomics', 'Lab'], 
    location: 'Apodaca, NL', 
    verified: false, 
    tier: 'Startup', 
    color: 'from-teal-600 to-teal-900', 
    domain: 'modernatx.com', 
    email: 'lab@bionorte.com', // Nuevo
    phone: '+52 (81) 3333 4444', // Nuevo
    banner: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop', 
    desc: 'Investigación genómica aplicada a la agricultura resistente a sequías.',
    services: [
        'Secuenciación de ADN', 
        'Cultivos de Tejidos In-Vitro', 
        'Consultoría Agrícola Avanzada',
        'Bioinformática',
        'Análisis de Microbioma de Suelo',
        'Edición Genética (CRISPR)',
        'Pruebas de Toxicidad'
    ],
    products: 'DroughtResist Seeds'
  },

  // AGRO & CLEAN
  { 
    id: 4, 
    name: 'AgroTech', 
    commercialName: 'AgroTech Precision',
    differentiator: 'Maximiza cosechas con datos aéreos',
    targetAudience: ['PyME'],
    industry: 'Agrotech', 
    tags: ['IoT', 'Drones'], 
    location: 'Sinaloa/Mty', 
    verified: false, 
    tier: 'Startup', 
    color: 'from-lime-600 to-lime-900', 
    domain: 'apple.com', 
    email: 'drones@agrotech.mx', // Nuevo
    phone: '+52 (668) 812 3456', // Nuevo
    banner: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600&auto=format&fit=crop', 
    desc: 'Agricultura de precisión mediante drones autónomos y sensores IoT.',
    services: [
        'Mapeo Aéreo con Drones', 
        'Instalación de Sensores IoT', 
        'Análisis Químico de Suelos',
        'Sistemas de Riego Inteligente',
        'Pronóstico de Cosechas con IA',
        'Trazabilidad Blockchain',
        'Control de Plagas Digital'
    ],
    products: 'FarmView Dashboard'
  },
  { 
    id: 10, 
    name: 'GreenGrid', 
    commercialName: 'GreenGrid Energy',
    differentiator: 'Redes eléctricas inteligentes y estables',
    targetAudience: ['Enterprise'],
    industry: 'Cleantech', // Will appear under 'Todas' or added to CATEGORIES if desired
    tags: ['Solar', 'Energy'], 
    location: 'Apodaca, NL', 
    verified: true, 
    tier: 'Enterprise', 
    color: 'from-green-600 to-green-900', 
    domain: 'vestas.com', 
    email: 'energia@greengrid.com', // Nuevo
    phone: '+52 (81) 4444 5555', // Nuevo
    banner: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop', 
    desc: 'Monitoreo inteligente de redes eléctricas y soluciones de energía renovable.',
    services: [
        'Auditoría Energética Industrial', 
        'Instalación de Paneles Solares', 
        'Mantenimiento de Turbinas',
        'Gestión de Baterías Industriales',
        'Balanceo de Red Eléctrica',
        'Certificación de Huella de Carbono',
        'Smart Metering'
    ],
    products: 'SmartGrid Controller'
  },

  // OTROS
  { 
    id: 6, 
    name: 'CyberShield', 
    commercialName: 'CyberShield Ops',
    differentiator: 'Seguridad ofensiva para activos críticos',
    targetAudience: ['Startup', 'PyME'],
    industry: 'Ciberseguridad', 
    tags: ['SecOps', 'Compliance'], 
    location: 'Remoto', 
    verified: true, 
    tier: 'Boutique', 
    color: 'from-rose-600 to-rose-900', 
    domain: 'crowdstrike.com', 
    email: 'soc@cybershield.io', // Nuevo
    phone: '+52 (81) 6666 7777', // Nuevo
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop', 
    desc: 'Centro de operaciones de seguridad (SOC) y pentesting para startups.',
    services: [
        'Ethical Hacking / Pentesting', 
        'Monitoreo SOC 24/7', 
        'Consultoría ISO 27001',
        'Respuesta a Incidentes',
        'Análisis Forense Digital',
        'Seguridad en la Nube',
        'Phishing Simulation'
    ],
    products: 'ShieldWall Firewall'
  },
  { 
    id: 7, 
    name: 'LogisticsOne', 
    commercialName: 'LogisticsOne Fleet',
    differentiator: 'Control total de tu flotilla en tiempo real',
    targetAudience: ['Enterprise', 'PyME'],
    industry: 'Logística', 
    tags: ['Fleet', 'SaaS'], 
    location: 'Apodaca, NL', 
    verified: true, 
    tier: 'Enterprise', 
    color: 'from-orange-600 to-orange-900', 
    domain: 'samsung.com', 
    email: 'fleet@logisticsone.com', // Nuevo
    phone: '+52 (81) 8888 9999', // Nuevo
    banner: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataforma SaaS para gestión de flotillas y optimización de última milla.',
    services: [
        'Rastreo Satelital GPS', 
        'Optimización de Rutas con IA', 
        'Gestión de Mantenimiento de Flota',
        'Control de Inventarios (WMS)',
        'Logística de Última Milla',
        'Integración con ERPs',
        'Monitoreo de Cadena de Frío'
    ],
    products: 'FleetTrack 360'
  },
  { 
    id: 9, 
    name: 'BuildOps', 
    commercialName: 'BuildOps Digital',
    differentiator: 'Gemelos digitales para construcción sin errores',
    targetAudience: ['Enterprise'],
    industry: 'Proptech', 
    tags: ['VR', 'BIM'], 
    location: 'Monterrey, NL', 
    verified: false, 
    tier: 'Specialist', 
    color: 'from-yellow-600 to-yellow-900', 
    domain: 'cemex.com', 
    email: 'bim@buildops.com', // Nuevo
    phone: '+52 (81) 1010 2020', // Nuevo
    banner: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop', 
    desc: 'Gemelos digitales para construcción y gestión de activos inmobiliarios.',
    services: [
        'Modelado BIM 3D/4D', 
        'Recorridos Virtuales (VR)', 
        'Supervisión de Obra Remota',
        'Gestión de Activos Inmobiliarios',
        'Escaneo Láser de Terrenos',
        'Presupuestación Automatizada',
        'Simulación Energética de Edificios'
    ],
    products: 'DigitalTwin Builder'
  },
  { 
    id: 11, 
    name: 'LegalFlow', 
    commercialName: 'LegalFlow Automation',
    differentiator: 'Contratos inteligentes sin fricción legal',
    targetAudience: ['Startup', 'PyME'],
    industry: 'Legaltech', 
    tags: ['NLP', 'Contracts'], 
    location: 'San Pedro, NL', 
    verified: false, 
    tier: 'Startup', 
    color: 'from-purple-600 to-purple-900', 
    domain: 'docusign.com', 
    email: 'legal@legalflow.com', // Nuevo
    phone: '+52 (81) 3030 4040', // Nuevo
    banner: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop', 
    desc: 'Automatización de contratos y análisis legal mediante NLP.',
    services: [
        'Automatización de Documentos', 
        'Gestión del Ciclo de Vida de Contratos', 
        'Firma Digital Certificada',
        'Búsqueda Legal con IA',
        'Compliance Corporativo',
        'Notificaciones Legales Automatizadas',
        'Propiedad Intelectual Digital'
    ],
    products: 'ContractAI'
  },
  { 
    id: 12, 
    name: 'EduStack', 
    commercialName: 'EduStack Learning',
    differentiator: 'Capacitación corporativa que sí funciona',
    targetAudience: ['Enterprise'],
    industry: 'Edtech', 
    tags: ['LMS', 'Mobile'], 
    location: 'Remoto', 
    verified: true, 
    tier: 'Scaleup', 
    color: 'from-indigo-600 to-indigo-900', 
    domain: 'coursera.org', 
    email: 'learning@edustack.com', // Nuevo
    phone: '+52 (55) 5050 6060', // Nuevo
    banner: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataformas de aprendizaje adaptativo para corporativos.',
    services: [
        'Desarrollo de Cursos E-learning', 
        'Implementación de LMS', 
        'Gamificación Corporativa',
        'Micro-learning Móvil',
        'Evaluaciones Automatizadas',
        'Certificaciones Digitales (Blockchain)',
        'Consultoría Pedagógica'
    ],
    products: 'LearnCorp Suite'
  },
  { 
    id: 17, 
    name: 'NanoMat', 
    commercialName: 'NanoMat Advanced Materials',
    differentiator: 'Materiales del futuro para la industria hoy',
    targetAudience: ['Startup', 'Enterprise'],
    industry: 'Nanotech', 
    tags: ['Materials', 'R&D'], 
    location: 'PIIT, Apodaca', 
    verified: true, 
    tier: 'Startup', 
    color: 'from-fuchsia-600 to-fuchsia-900', 
    domain: '3m.com', 
    email: 'rd@nanomat.com', // Nuevo
    phone: '+52 (81) 7070 8080', // Nuevo
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Desarrollo de nanomateriales avanzados para la industria aeroespacial.',
    services: [
        'Investigación y Desarrollo (R&D)', 
        'Pruebas de Resistencia de Materiales', 
        'Prototipado Rápido',
        'Recubrimientos Nanotecnológicos',
        'Microscopía Electrónica',
        'Síntesis Química Avanzada',
        'Consultoría de Patentes'
    ],
    products: 'AeroGraphene'
  },
  { 
    id: 18, 
    name: 'UrbanSense', 
    commercialName: 'UrbanSense Smart Cities',
    differentiator: 'Inteligencia urbana para ciudades vivas',
    targetAudience: ['Enterprise'],
    industry: 'IoT', 
    tags: ['Smart City', 'GovTech'], 
    location: 'San Pedro, NL', 
    verified: true, 
    tier: 'Scaleup', 
    color: 'from-violet-600 to-violet-900', 
    domain: 'nvidia.com', 
    email: 'smartcity@urbansense.com', // Nuevo
    phone: '+52 (81) 9090 0000', // Nuevo
    banner: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=600&auto=format&fit=crop', 
    desc: 'Sensores urbanos y plataformas de gestión para ciudades inteligentes.',
    services: [
        'Infraestructura Smart City', 
        'Análisis de Tráfico en Tiempo Real', 
        'Sistemas de Seguridad Urbana',
        'Gestión Inteligente de Residuos',
        'Iluminación Pública Automatizada',
        'Monitoreo de Calidad del Aire',
        'Apps de Participación Ciudadana'
    ],
    products: 'CitySense Hub'
  },
];