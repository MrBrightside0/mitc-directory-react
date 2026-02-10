import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, Server, Users, Wifi, Shield, Cpu, PenTool, BookOpen, 
  Search, Briefcase, Settings, Database, ArrowRight, Box, Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_DATA } from '../../data/mockData';

// Helper para obtener logos automáticamente
const getLogoUrl = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

const getCompaniesByCriteria = (criteria) => {
  return MOCK_DATA.filter(company => {
    if (typeof criteria === 'string') return company.industry === criteria;
    if (Array.isArray(criteria)) return criteria.some(c => company.tags.includes(c) || company.industry === c);
    return false;
  }).slice(0, 9); // Mostramos hasta 9 logos por caja para que se vea lleno pero no explotado
};

const MARKET_STRUCTURE = [
  {
    category: "Software & Aplicaciones",
    color: "bg-blue-50 border-blue-100 text-blue-700",
    accent: "bg-blue-600",
    items: [
      { title: "Fábrica de Software", icon: Code, desc: "Desarrollo a medida.", companies: getCompaniesByCriteria(['Software', 'Global']) },
      { title: "Fintech & Banca", icon: Briefcase, desc: "Blockchain y pagos.", companies: getCompaniesByCriteria('Fintech') },
      { title: "SaaS B2B", icon: Box, desc: "Gestión empresarial.", companies: getCompaniesByCriteria(['SaaS', 'Logística']) },
      { title: "IA & Data", icon: Search, desc: "Automatización.", companies: getCompaniesByCriteria(['AI', 'Data Science']) }
    ]
  },
  {
    category: "Infraestructura 4.0",
    color: "bg-emerald-50 border-emerald-100 text-emerald-700",
    accent: "bg-emerald-600",
    items: [
      { title: "Manufactura", icon: Settings, desc: "Robótica industrial.", companies: getCompaniesByCriteria(['Manufactura 4.0', 'Automotriz']) },
      { title: "IoT & Sensores", icon: Wifi, desc: "Smart Cities.", companies: getCompaniesByCriteria(['IoT', 'Agrotech']) },
      { title: "Energía & Hardware", icon: Cpu, desc: "Sustentabilidad.", companies: getCompaniesByCriteria(['Cleantech', 'Materials']) },
      { title: "Ciberseguridad", icon: Shield, desc: "Protección crítica.", companies: getCompaniesByCriteria('Ciberseguridad') }
    ]
  },
  {
    category: "Servicios Estratégicos",
    color: "bg-purple-50 border-purple-100 text-purple-700",
    accent: "bg-purple-600",
    items: [
      { title: "Investigación R&D", icon: PenTool, desc: "Innovación científica.", companies: getCompaniesByCriteria(['Biotech', 'Nanotech']) },
      { title: "Healthtech", icon: Users, desc: "Salud digital.", companies: getCompaniesByCriteria('Healthtech') },
      { title: "Proptech", icon: Layers, desc: "Activos inmobiliarios.", companies: getCompaniesByCriteria('Proptech') },
      { title: "Edtech", icon: BookOpen, desc: "Talento TI.", companies: getCompaniesByCriteria('Edtech') }
    ]
  }
];

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const MarketMap = () => {
  return (
    <section className="py-24 px-4 md:px-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-indigo-100 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-4 shadow-sm">
            Ecosistema en Tiempo Real
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Mapa de Capacidades
          </h2>
          <p className="text-slate-500 text-lg leading-relaxed">
            Explora las empresas que lideran cada vertical tecnológica en Nuevo León.
          </p>
        </div>

        <div className="space-y-20">
          {MARKET_STRUCTURE.map((sector, sectionIdx) => (
            <div key={sectionIdx}>
              <FadeIn>
                <div className="flex items-center gap-4 mb-10">
                  <div className={`w-2 h-8 rounded-full ${sector.accent}`}></div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {sector.category}
                  </h3>
                </div>
              </FadeIn>

              {/* Grid Responsivo */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {sector.items.map((item, idx) => (
                  <FadeIn key={idx} delay={idx * 0.1}>
                    <div className="group h-full bg-white border border-slate-200 p-6 rounded-2xl hover:shadow-xl hover:border-indigo-400/50 transition-all duration-300 flex flex-col relative overflow-hidden">
                      
                      {/* Fondo decorativo hover */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-slate-50 to-white rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:from-indigo-50/50"></div>

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${sector.color} group-hover:scale-110 transition-transform`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{item.companies.length} Socios</span>
                        </div>
                        
                        <h4 className="font-bold text-slate-900 text-lg mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-500 mb-6">{item.desc}</p>

                        {/* GRID DE LOGOS */}
                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 min-h-[80px]">
                            {item.companies.length > 0 ? (
                                <div className="grid grid-cols-4 gap-2">
                                    {item.companies.map(company => (
                                        <div key={company.id} className="relative group/logo">
                                            <div className="aspect-square bg-white rounded-lg border border-slate-200 flex items-center justify-center p-1.5 hover:border-indigo-300 transition-colors cursor-help shadow-sm">
                                                <img 
                                                    src={getLogoUrl(company.domain)} 
                                                    alt={company.name} 
                                                    className="w-full h-full object-contain grayscale group-hover/logo:grayscale-0 opacity-80 group-hover/logo:opacity-100 transition-all"
                                                    onError={(e) => {e.target.style.display='none'}} // Ocultar si falla
                                                />
                                                {/* Fallback si no hay img */}
                                                <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-slate-400 bg-slate-50 -z-10">
                                                    {company.name.substring(0,2).toUpperCase()}
                                                </div>
                                            </div>
                                            {/* Tooltip Simple */}
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover/logo:opacity-100 pointer-events-none transition-opacity z-20">
                                                {company.name}
                                            </div>
                                        </div>
                                    ))}
                                    {/* Botón "+ ver más" si hay espacio */}
                                    <Link to="/directorio" className="aspect-square rounded-lg border border-dashed border-slate-300 flex items-center justify-center hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 text-slate-400 transition-all">
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center py-2">
                                    <span className="text-xs text-slate-400 italic mb-1">Espacio disponible</span>
                                    <Link to="/unirse" className="text-[10px] font-bold text-indigo-600 hover:underline">¡Únete aquí!</Link>
                                </div>
                            )}
                        </div>
                      </div>

                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MarketMap;