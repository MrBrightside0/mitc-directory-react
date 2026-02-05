import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, ArrowRight, X, MapPin, Globe, ShieldCheck, 
  Zap, Filter, ChevronDown, Check, 
  Linkedin, Twitter, Instagram, Mail, Briefcase, Users, Activity,
  Share2, Bot, Send, MessageSquare 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from './assets/logo.svg';
import heroImage from './assets/monterrey-hero.webp';

// --- HELPER PARA LOGOS DE GOOGLE ---
const getLogoUrl = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

// --- DATASET FINAL ---
const MOCK_DATA = [
  // SOFTWARE & DATA
  { 
    id: 1, name: 'Softtek', industry: 'Software', tags: ['AI', 'Cloud', 'Global'], location: 'Monterrey, NL', verified: true, employees: '15k+', revenue: '$1B+', tier: 'Titan', color: 'from-blue-600 to-blue-900', 
    domain: 'softtek.com', 
    banner: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop', 
    desc: 'Líder global en soluciones digitales. Ayudamos a las empresas a cerrar la brecha digital.' 
  },
  { 
    id: 2, name: 'DataRegio', industry: 'Data Science', tags: ['Big Data', 'Retail'], location: 'San Pedro, NL', verified: true, employees: '80', revenue: '$8M', tier: 'Specialist', color: 'from-emerald-600 to-emerald-900', 
    domain: 'databricks.com', 
    banner: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop', 
    desc: 'Consultoría boutique transformando datos complejos en estrategias de retail accionables.' 
  },
  { 
    id: 13, name: 'Neurona Lab', industry: 'Software', tags: ['Machine Learning', 'Python'], location: 'Monterrey, NL', verified: false, employees: '15', revenue: '$800k', tier: 'Startup', color: 'from-indigo-600 to-indigo-900', 
    domain: 'openai.com', 
    banner: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop', 
    desc: 'Laboratorio de IA enfocado en optimización de procesos industriales.' 
  },
  
  // FINTECH
  { 
    id: 3, name: 'FinCore', industry: 'Fintech', tags: ['Blockchain', 'Banking'], location: 'San Pedro, NL', verified: true, employees: '200', revenue: '$25M', tier: 'Scaleup', color: 'from-slate-700 to-slate-900', 
    domain: 'stripe.com', 
    banner: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format&fit=crop', 
    desc: 'Infraestructura bancaria de nueva generación y seguridad financiera.' 
  },
  { 
    id: 16, name: 'RegioLend', industry: 'Fintech', tags: ['Lending', 'SaaS'], location: 'Monterrey, NL', verified: true, employees: '45', revenue: '$5M', tier: 'Startup', color: 'from-sky-600 to-sky-900', 
    domain: 'kavak.com', 
    banner: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataforma de micro-créditos automatizados para PyMEs del norte.' 
  },

  // MANUFACTURA & AUTO
  { 
    id: 8, name: 'ManuFact', industry: 'Manufactura 4.0', tags: ['Robotics', 'Auto'], location: 'Santa Catarina', verified: true, employees: '1000+', revenue: '$200M', tier: 'Titan', color: 'from-red-600 to-red-900', 
    domain: 'tesla.com', 
    banner: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop', 
    desc: 'Automatización industrial y robótica avanzada para líneas de ensamblaje.' 
  },
  { 
    id: 15, name: 'AutoSoft', industry: 'Automotriz', tags: ['Embedded', 'EV'], location: 'Saltillo/Mty', verified: true, employees: '300', revenue: '$50M', tier: 'Enterprise', color: 'from-zinc-600 to-zinc-900', 
    domain: 'kia.com', 
    banner: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop', 
    desc: 'Software embebido para vehículos eléctricos y sistemas autónomos.' 
  },

  // HEALTH & BIO
  { 
    id: 5, name: 'HealthAI', industry: 'Healthtech', tags: ['Imaging', 'AI'], location: 'Monterrey, NL', verified: true, employees: '120', revenue: '$12M', tier: 'Scaleup', color: 'from-cyan-600 to-cyan-900', 
    domain: 'pfizer.com', 
    banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Diagnóstico asistido por IA para radiología y optimización hospitalaria.' 
  },
  { 
    id: 14, name: 'BioNorte', industry: 'Biotech', tags: ['Genomics', 'Lab'], location: 'Apodaca, NL', verified: false, employees: '25', revenue: '$2M', tier: 'Startup', color: 'from-teal-600 to-teal-900', 
    domain: 'modernatx.com', 
    banner: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=600&auto=format&fit=crop', 
    desc: 'Investigación genómica aplicada a la agricultura resistente a sequías.' 
  },

  // AGRO & CLEAN
  { 
    id: 4, name: 'AgroTech', industry: 'Agrotech', tags: ['IoT', 'Drones'], location: 'Sinaloa/Mty', verified: false, employees: '45', revenue: '$3M', tier: 'Startup', color: 'from-lime-600 to-lime-900', 
    domain: 'apple.com', 
    banner: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=600&auto=format&fit=crop', 
    desc: 'Agricultura de precisión mediante drones autónomos y sensores IoT.' 
  },
  { 
    id: 10, name: 'GreenGrid', industry: 'Cleantech', tags: ['Solar', 'Energy'], location: 'Apodaca, NL', verified: true, employees: '150', revenue: '$40M', tier: 'Enterprise', color: 'from-green-600 to-green-900', 
    domain: 'vestas.com', 
    banner: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop', 
    desc: 'Monitoreo inteligente de redes eléctricas y soluciones de energía renovable.' 
  },

  // OTROS
  { 
    id: 6, name: 'CyberShield', industry: 'Ciberseguridad', tags: ['SecOps', 'Compliance'], location: 'Remoto', verified: true, employees: '30', revenue: '$2M', tier: 'Boutique', color: 'from-rose-600 to-rose-900', 
    domain: 'crowdstrike.com', 
    banner: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop', 
    desc: 'Centro de operaciones de seguridad (SOC) y pentesting para startups.' 
  },
  { 
    id: 7, name: 'LogisticsOne', industry: 'Logística', tags: ['Fleet', 'SaaS'], location: 'Apodaca, NL', verified: true, employees: '500', revenue: '$80M', tier: 'Enterprise', color: 'from-orange-600 to-orange-900', 
    domain: 'samsung.com', 
    banner: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataforma SaaS para gestión de flotillas y optimización de última milla.' 
  },
  { 
    id: 9, name: 'BuildOps', industry: 'Proptech', tags: ['VR', 'BIM'], location: 'Monterrey, NL', verified: false, employees: '60', revenue: '$5M', tier: 'Specialist', color: 'from-yellow-600 to-yellow-900', 
    domain: 'cemex.com', 
    banner: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop', 
    desc: 'Gemelos digitales para construcción y gestión de activos inmobiliarios.' 
  },
  { 
    id: 11, name: 'LegalFlow', industry: 'Legaltech', tags: ['NLP', 'Contracts'], location: 'San Pedro, NL', verified: false, employees: '25', revenue: '$1.5M', tier: 'Startup', color: 'from-purple-600 to-purple-900', 
    domain: 'docusign.com', 
    banner: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop', 
    desc: 'Automatización de contratos y análisis legal mediante NLP.' 
  },
  { 
    id: 12, name: 'EduStack', industry: 'Edtech', tags: ['LMS', 'Mobile'], location: 'Remoto', verified: true, employees: '200', revenue: '$15M', tier: 'Scaleup', color: 'from-indigo-600 to-indigo-900', 
    domain: 'coursera.org', 
    banner: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop', 
    desc: 'Plataformas de aprendizaje adaptativo para corporativos.' 
  },
  { 
    id: 17, name: 'NanoMat', industry: 'Nanotech', tags: ['Materials', 'R&D'], location: 'PIIT, Apodaca', verified: true, employees: '10', revenue: '$500k', tier: 'Startup', color: 'from-fuchsia-600 to-fuchsia-900', 
    domain: '3m.com', 
    banner: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&auto=format&fit=crop', 
    desc: 'Desarrollo de nanomateriales avanzados para la industria aeroespacial.' 
  },
  { 
    id: 18, name: 'UrbanSense', industry: 'IoT', tags: ['Smart City', 'GovTech'], location: 'San Pedro, NL', verified: true, employees: '40', revenue: '$4M', tier: 'Scaleup', color: 'from-violet-600 to-violet-900', 
    domain: 'amazon.com', 
    banner: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?q=80&w=600&auto=format&fit=crop', 
    desc: 'Sensores urbanos y plataformas de gestión para ciudades inteligentes.' 
  },
];

const CATEGORIES = ['Todas', 'Software', 'Fintech', 'Data Science', 'Manufactura 4.0', 'Automotriz', 'Healthtech', 'Logística', 'Agrotech', 'Nanotech'];

const App = () => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // --- ESTADOS PARA EL CHAT ---
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAiBubble, setShowAiBubble] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy la IA del Cluster. ¿Buscas algún proveedor en específico o necesitas recomendaciones?', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // --- EFECTO: SCROLL NAV ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- EFECTO: ARREGLAR SCROLL DEL FONDO ---
  useEffect(() => {
    if (selectedCompany || isChatOpen) { 
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCompany, isChatOpen]);

  // --- EFECTO: MOSTRAR BURBUJA DE IA (SIEMPRE AL ENTRAR) ---
  useEffect(() => {
    
    const timer = setTimeout(() => {
      setShowAiBubble(true);
    }, 1500); 
    
    return () => clearTimeout(timer);
  }, []);

  // --- EFECTO: AUTO SCROLL CHAT ---
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages, isTyping, isChatOpen]);

  const handleCloseAiBubble = (e) => {
    e.stopPropagation();
    setShowAiBubble(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (showAiBubble) handleCloseAiBubble({ stopPropagation: () => {} });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Agregar mensaje del usuario
    const newMessage = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // 2. SIMULAR RESPUESTA BACKEND
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: '¡Entendido! Estoy analizando nuestra base de datos para encontrar las mejores opciones para ti...', 
        sender: 'ai' 
      }]);
    }, 2000);
  };

  const filtered = MOCK_DATA.filter(item => {
    const matchCat = activeFilter === 'Todas' || item.industry === activeFilter;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchVerified = onlyVerified ? item.verified : true;
    return matchCat && matchSearch && matchVerified;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-ink selection:bg-ink selection:text-white flex flex-col relative">
      
      {/* --- WIDGET DE CHAT (Flotante) --- */}
      {!selectedCompany && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
          
          {/* Burbuja de Texto (Notificación) */}
          <AnimatePresence>
            {showAiBubble && !isChatOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-white border border-border shadow-xl rounded-xl p-4 w-56 text-left origin-bottom-right"
              >
                <button 
                  onClick={handleCloseAiBubble}
                  className="absolute -top-2 -left-2 bg-slate-200 hover:bg-red-500 hover:text-white text-subtle rounded-full p-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
                <div className="flex items-center gap-2 mb-2">
                   <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-xs font-bold text-ink">Asistente Virtual</p>
                </div>
                <p className="text-xs text-subtle leading-snug">
                  ¿Necesitas ayuda para encontrar un proveedor? ¡Puedo buscar por ti!
                </p>
                <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-border rotate-45 transform"></div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón Flotante */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChat}
            className={`h-14 w-14 rounded-full shadow-2xl flex items-center justify-center transition-all z-50 ${isChatOpen ? 'bg-slate-800 rotate-90' : 'bg-gradient-to-br from-indigo-600 to-violet-600 hover:shadow-indigo-500/30'}`}
          >
            {isChatOpen ? <X className="h-6 w-6 text-white" /> : <Bot className="h-7 w-7 text-white" />}
          </motion.button>

          {/* VENTANA DE CHAT */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute bottom-20 right-0 w-[90vw] md:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden origin-bottom-right z-40"
              >
                {/* Header Chat */}
                <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 flex items-center gap-3 shadow-sm">
                  <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm border border-white/20">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">Cluster AI Assistant</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-white/70 text-[10px] uppercase font-bold tracking-wide">En línea</span>
                    </div>
                  </div>
                </div>

                {/* Area de Mensajes */}
                <div className="flex-1 bg-slate-50 p-4 overflow-y-auto custom-scrollbar">
                  <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-white text-ink border border-border rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {/* Indicador de escribiendo */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-border rounded-2xl rounded-bl-none px-4 py-3 shadow-sm flex gap-1 items-center">
                          <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="h-1.5 w-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-border flex gap-2">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu consulta..."
                    className="flex-1 bg-slate-50 border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* --- NAVBAR --- */}
      <nav className={`fixed top-0 z-30 w-full transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-border py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <img 
              src={logo} 
              alt="Logo" 
              className={`h-10 w-auto transition-all duration-300 hover:scale-105 ${!scrolled ? 'brightness-0 invert' : ''}`} 
            />
            <div className={`hidden md:block w-px h-8 mx-2 transition-colors ${scrolled ? 'bg-border' : 'bg-white/30'}`}></div>
            <div className="hidden md:flex flex-col justify-center">
              <span className={`text-sm font-display font-bold leading-none transition-colors ${scrolled ? 'text-ink' : 'text-white'}`}>MITC Cluster</span>
              <span className={`text-[10px] font-mono uppercase tracking-widest leading-none mt-1 transition-colors ${scrolled ? 'text-subtle' : 'text-white/70'}`}>Directorio Oficial</span>
            </div>
          </div>
          <a href="#" className={`group relative overflow-hidden rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all ${scrolled ? 'bg-ink text-white hover:bg-slate-800' : 'bg-white text-ink hover:bg-white/90'}`}>
            <span className="relative z-10 flex items-center gap-2">
              Acceso Socios <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-1">
            <img 
                src={heroImage} 
                alt="Monterrey Tech" 
                className="w-full h-full object-cover transform scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA]"></div>
        </div>

        <div className="mx-auto max-w-7xl relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Ecosistema en tiempo real</span>
            </div>

            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-xl">
              El motor tech <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">del norte.</span>
            </h1>
            
            <p className="text-lg text-slate-200 max-w-xl leading-relaxed font-medium">
              Conecta con las <b>cientos</b> empresas líderes que están definiendo el futuro desde Nuevo León. 
              Verificadas por capacidad técnica y solidez financiera.
            </p>

            <div className="mt-10 flex gap-4">
               <div className="flex -space-x-3">
                  {[1,2,3,8].map(i => {
                      const item = MOCK_DATA.find(d=>d.id===i);
                      return (
                         <div key={i} className={`h-10 w-10 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center shadow-lg overflow-hidden`}>
                            <img src={getLogoUrl(item.domain)} alt="Logo" className="w-full h-full object-cover" />
                         </div>
                      )
                  })}
                  <div className="h-10 w-10 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center text-ink text-xs font-bold">
                      +14
                  </div>
               </div>
               <div className="flex flex-col justify-center">
                  <span className="text-white font-bold text-sm">Cluster en crecimiento</span>
                  <span className="text-slate-400 text-xs">Únete a la red de valor</span>
               </div>
            </div>

          </motion.div>
        </div>
      </header>

      {/* --- BARRA DE CONTROL --- */}
      <div className="sticky top-[88px] z-30 px-6 pb-4 -mt-8">
        <div className="mx-auto max-w-7xl">
          <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col md:flex-row items-center gap-2 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
            
            <div className="relative w-full flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-subtle group-focus-within:text-ink transition-colors" />
              </div>
              <input 
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar tecnología, empresa..." 
                className="block w-full rounded-xl border-none bg-surface/50 py-3.5 pl-11 pr-4 text-sm text-ink placeholder-subtle/80 focus:ring-2 focus:ring-ink/5 focus:bg-white transition-all outline-none"
              />
            </div>

            <div className="flex w-full md:w-auto items-center gap-2">
                <div className="relative w-full md:w-auto">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full md:w-60 flex items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-3.5 text-sm font-medium text-ink hover:border-ink/30 transition-all focus:outline-none focus:ring-2 focus:ring-ink/5 active:scale-[0.98]"
                  >
                    <span className="truncate">{activeFilter === 'Todas' ? 'Todas las Industrias' : activeFilter}</span>
                    <ChevronDown className={`h-4 w-4 text-subtle transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 top-full mt-2 z-20 w-full md:w-64 rounded-xl border border-border bg-white p-2 shadow-xl ring-1 ring-black/5"
                        >
                          <div className="max-h-64 overflow-y-auto custom-scrollbar">
                            {CATEGORIES.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => { setActiveFilter(cat); setIsDropdownOpen(false); }}
                                className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors ${
                                  activeFilter === cat ? 'bg-ink text-white' : 'text-subtle hover:bg-surface hover:text-ink'
                                }`}
                              >
                                {cat}
                                {activeFilter === cat && <Check className="h-3.5 w-3.5" />}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={() => setOnlyVerified(!onlyVerified)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all active:scale-[0.98] ${
                    onlyVerified 
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm' 
                      : 'border-border bg-white text-subtle hover:border-ink/30'
                  }`}
                  title="Mostrar solo verificados"
                >
                  <ShieldCheck className={`h-4 w-4 ${onlyVerified ? 'fill-emerald-700' : ''}`} />
                  <span className="hidden md:inline text-xs uppercase font-bold tracking-wider">Verificados</span>
                </button>
            </div>
          </div>
          
          {(activeFilter !== 'Todas' || onlyVerified || searchTerm) && (
             <div className="mt-3 flex flex-wrap gap-2 px-1">
                {activeFilter !== 'Todas' && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white pl-3 pr-2 py-1 text-[10px] font-bold uppercase tracking-wider text-ink shadow-sm">
                        {activeFilter}
                        <div className="h-3 w-px bg-border"></div>
                        <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setActiveFilter('Todas')} />
                    </span>
                )}
                <button onClick={() => {setActiveFilter('Todas'); setSearchTerm(''); setOnlyVerified(false)}} className="ml-1 text-[10px] font-bold uppercase tracking-wider text-subtle hover:text-ink hover:underline decoration-dotted transition-colors">
                    Limpiar todo
                </button>
             </div>
          )}
        </div>
      </div>

      {/* --- GRID RESULTADOS --- */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 flex-1 w-full">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filtered.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                onClick={() => setSelectedCompany(item)}
                className="group relative cursor-pointer flex flex-col justify-between h-full bg-white rounded-2xl border border-border overflow-hidden hover:border-ink/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* BANNER TARJETA */}
                <div className="h-32 w-full relative overflow-hidden bg-surface flex-shrink-0">
                   <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors z-10"></div>
                   <img loading="lazy" src={item.banner} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                   {item.verified && (
                      <div className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur text-emerald-700 p-1.5 rounded-full shadow-sm" title="Verificado">
                        <ShieldCheck className="h-3.5 w-3.5" />
                      </div>
                    )}
                </div>

                <div className="px-5 pb-5 flex-1 flex flex-col">
                  {/* LOGO OVERLAP */}
                  <div className="-mt-8 mb-3 relative z-20 flex justify-between items-end">
                      <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center shadow-lg border-[3px] border-white overflow-hidden p-1">
                        <img src={getLogoUrl(item.domain)} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-subtle/80 bg-surface px-2 py-0.5 rounded border border-border/50">
                        {item.tier}
                      </span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-ink mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">{item.name}</h3>
                  <p className="text-[10px] font-mono text-subtle uppercase tracking-widest mb-3">{item.industry}</p>
                  
                  <p className="text-xs text-subtle leading-relaxed mb-4">
                      {item.desc}
                  </p>
                  
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-surface border border-border/50 rounded text-[10px] font-medium text-subtle group-hover:text-ink group-hover:border-border transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="px-5 py-3 border-t border-dashed border-border flex flex-wrap gap-y-2 items-center justify-between text-xs bg-base/30 group-hover:bg-white transition-colors">
                  <span className="flex items-center gap-1 text-subtle">
                    <MapPin className="h-3 w-3 text-red-500"/> {item.location.split(',')[0]}
                  </span>
                  
                  <button 
                    className="flex items-center gap-1 font-bold text-ink bg-white border border-border px-3 py-1.5 rounded-full shadow-sm hover:bg-ink hover:text-white transition-all group-hover:border-ink"
                    onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCompany(item);
                    }}
                  >
                    Contactar
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-24 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-surface mb-4">
                <Filter className="h-8 w-8 text-subtle/50" />
            </div>
            <h3 className="text-lg font-bold text-ink">Sin resultados</h3>
            <p className="text-subtle text-sm mt-1 mb-6">No encontramos coincidencias con los filtros actuales.</p>
            <button onClick={() => {setSearchTerm(''); setActiveFilter('Todas'); setOnlyVerified(false)}} className="px-6 py-2.5 bg-ink text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl">
              Reiniciar filtros
            </button>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-border bg-white pt-16 pb-8 mt-12">
        <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <img src={logo} alt="MITC Logo" className="h-8 w-auto mb-6 opacity-80 grayscale hover:grayscale-0 transition-all" />
                    <p className="text-sm text-subtle leading-relaxed mb-6">
                        Impulsando la innovación tecnológica y el desarrollo económico del norte de México a través de la colaboración estratégica.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-surface text-subtle hover:bg-ink hover:text-white transition-colors"><Linkedin className="h-4 w-4"/></a>
                        <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-surface text-subtle hover:bg-ink hover:text-white transition-colors"><Twitter className="h-4 w-4"/></a>
                        <a href="#" className="h-8 w-8 flex items-center justify-center rounded-full bg-surface text-subtle hover:bg-ink hover:text-white transition-colors"><Instagram className="h-4 w-4"/></a>
                    </div>
                </div>
                <div>
                    <h4 className="font-display font-bold text-ink mb-6">Plataforma</h4>
                    <ul className="space-y-3 text-sm text-subtle">
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Explorar Directorio</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Mapa de Calor</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Estadísticas</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Acceso Socios</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-display font-bold text-ink mb-6">Recursos</h4>
                    <ul className="space-y-3 text-sm text-subtle">
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Reportes 2025</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Guía de Inversión</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Blog & Noticias</a></li>
                        <li><a href="#" className="hover:text-ink hover:underline decoration-dotted">Bolsa de Trabajo</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-display font-bold text-ink mb-6">Contacto</h4>
                    <ul className="space-y-3 text-sm text-subtle">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-red-500" />
                            <span>Av. Fundidora 501, Col. Obrera, Monterrey, NL.</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-4 w-4 shrink-0" />
                            <a href="mailto:hola@mitc.mx" className="hover:text-ink">hola@mitc.mx</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-subtle">
                <p>© 2026 Monterrey IT Cluster. Todos los derechos reservados.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-ink">Privacidad</a>
                    <a href="#" className="hover:text-ink">Términos</a>
                    <a href="#" className="hover:text-ink">Cookies</a>
                </div>
            </div>
        </div>
      </footer>

      {/* --- DRAWER --- */}
      <AnimatePresence>
        {selectedCompany && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedCompany(null)}
              className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full md:max-w-2xl bg-white shadow-2xl flex flex-col"
            >
              
              {/* === Botón COMPARTIR === */}
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: selectedCompany.name,
                      text: `Mira este perfil de ${selectedCompany.name} en el Cluster IT.`,
                      url: window.location.href, 
                    }).catch(console.error);
                  } else {
                     navigator.clipboard.writeText(window.location.href);
                     alert('URL copiada al portapapeles');
                  }
                }}
                className="absolute top-4 right-16 z-50 p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
                title="Compartir"
              >
                <Share2 className="h-6 w-6 drop-shadow-md" />
              </button>

              {/* BOTON DE CERRAR FLOTANTE */}
              <button 
                onClick={() => setSelectedCompany(null)} 
                className="absolute top-4 right-4 z-50 p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
              >
                <X className="h-6 w-6 drop-shadow-md" />
              </button>

              {/* CONTENEDOR UNIFICADO CON SCROLL */}
              <div className="flex-1 overflow-y-auto bg-white relative pb-44"> 
                
                {/* HEADER / BANNER */}
                <div className="relative h-64 bg-surface group">
                    <img src={selectedCompany.banner} alt="Cover" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
                    
                    {/* LOGO */}
                    <div className="absolute -bottom-10 left-6 md:left-8 h-24 w-24 rounded-2xl bg-white p-2 shadow-2xl z-20">
                      <div className="h-full w-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                        <img src={getLogoUrl(selectedCompany.domain)} alt="Logo" className="w-full h-full object-contain p-1.5" />
                      </div>
                   </div>
                </div>

                {/* CONTENIDO TEXTUAL */}
                <div className="px-6 md:px-8 pt-16">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h1 className="text-4xl font-display font-bold text-ink tracking-tight">{selectedCompany.name}</h1>
                      <p className="text-sm font-mono text-subtle uppercase tracking-wider mt-2 flex items-center gap-2">
                          {selectedCompany.industry} 
                          <span className="w-1 h-1 bg-subtle rounded-full"></span> 
                          {selectedCompany.tier}
                      </p>
                    </div>
                    {selectedCompany.verified && (
                      <div className="hidden sm:flex flex-col items-end">
                        <ShieldCheck className="h-8 w-8 text-emerald-500 mb-1" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verificado</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="p-5 rounded-2xl bg-surface/50 border border-border flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-subtle text-xs font-bold uppercase tracking-wider">
                            <Briefcase className="h-3 w-3" /> Ingresos
                        </div>
                        <p className="text-2xl font-display font-bold text-ink">{selectedCompany.revenue}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-surface/50 border border-border flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-subtle text-xs font-bold uppercase tracking-wider">
                            <Users className="h-3 w-3" /> Equipo
                        </div>
                        <p className="text-2xl font-display font-bold text-ink">{selectedCompany.employees}</p>
                      </div>
                  </div>

                  <div className="prose prose-slate mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-4 border-l-4 border-ink pl-3">Perfil Ejecutivo</h3>
                    <p className="text-subtle leading-relaxed text-base">
                      {selectedCompany.desc}
                      <br/><br/>
                      {selectedCompany.name} impulsa la transformación digital con soluciones escalables y un equipo de {selectedCompany.employees} especialistas certificados. Su enfoque en resultados medibles los ha posicionado como referentes en el ecosistema.
                    </p>
                  </div>

                  <div className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-ink mb-4">Stack Tecnológico</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCompany.tags.map(tag => (
                        <span key={tag} className="px-4 py-2 rounded-lg border border-border bg-white text-xs font-bold text-ink shadow-sm flex items-center gap-1.5">
                          <Activity className="h-3 w-3 text-subtle" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-8 border-t border-border">
                      <a href="#" className="flex items-center gap-4 group">
                        <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center group-hover:bg-ink group-hover:text-white transition-colors border border-border">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-subtle uppercase group-hover:text-ink transition-colors">Sitio Web</p>
                          <p className="font-medium text-ink underline decoration-dotted">www.sitiooficial.com</p>
                        </div>
                      </a>
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-surface flex items-center justify-center border border-border">
                          <MapPin className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-subtle uppercase">Oficinas Centrales</p>
                          <p className="font-medium text-ink">{selectedCompany.location}</p>
                        </div>
                      </div>
                  </div>
                </div>
              </div>

              {/* === Footer Flotante === */}
              <div className="absolute bottom-0 w-full z-20">
                <div className="h-12 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>

                <div className="border-t border-border p-6 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
                  <button className="w-full py-4 bg-ink text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3">
                    Conectar con Socio
                  </button>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;