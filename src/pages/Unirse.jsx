import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, ArrowRight, Calendar, User, 
  Mail, Phone, Building2, MapPin, Briefcase, 
  Send, ShieldCheck, Users, TrendingUp, Globe, Zap
} from 'lucide-react';

import MarketMap from '../components/home/MarketMap'; 

const MEETING_URL = "https://meetings.hubspot.com/javier-m1?uuid=ac0d2c09-6a95-4b62-8a18-346e39571970";

const PARTNER_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png", 
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/640px-IBM_logo.svg.png"
];

const FadeIn = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const InputGroup = ({ label, icon: Icon, type = "text", placeholder }) => (
  <div className="relative w-full">
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <input 
        type={type} 
        className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm text-slate-900 placeholder-slate-400 text-base" 
        placeholder={placeholder}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, icon: Icon, options, placeholder }) => (
  <div className="relative w-full">
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <select className="w-full pl-10 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm text-slate-900 appearance-none cursor-pointer text-base bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat">
        <option value="" disabled selected>{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

const Unirse = () => {
  const [formType, setFormType] = useState('empresa');

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Membresía MITC Business Connect",
    "description": "Afiliación empresarial al Cluster de Tecnología de Nuevo León.",
    "brand": { "@type": "Organization", "name": "Monterrey IT Cluster" },
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "areaServed": "Nuevo León, Mexico" }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans overflow-x-hidden pt-28">
      
      <Helmet>
        <title>Únete al Cluster | Membresía MITC Business Connect</title>
        <meta name="description" content="Solicita tu afiliación al Monterrey IT Cluster. Accede a proyectos de IA, oficinas en PIIT Apodaca y red de negocios exclusiva." />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <section className="px-6 pb-12 text-center max-w-4xl mx-auto">
        <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
              Convocatoria Abierta 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-slate-900 mb-6 tracking-tight">
              Deja de competir solo. <br/>
              <span className="text-indigo-600">Escala en comunidad.</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
              Accede a la red de colaboración más potente del norte de México. Proyectos validados, talento certificado e infraestructura lista para usar.
            </p>
        </FadeIn>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {[
                { icon: TrendingUp, color: 'blue', title: 'Oportunidades Reales', desc: 'Acceso a licitaciones y proyectos privados exclusivos para miembros.' },
                { icon: Globe, color: 'purple', title: 'Visibilidad Global', desc: 'Tu empresa en el mapa de inversionistas de Texas y Latam.' },
                { icon: Zap, color: 'emerald', title: 'Ahorro Operativo', desc: 'Uso de oficinas de softlanding en el PIIT sin costo extra.' }
            ].map((item, idx) => (
                <FadeIn key={idx} delay={0.1 * (idx + 1)} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-lg transition-all group">
                    <div className={`w-12 h-12 bg-${item.color}-50 rounded-xl flex items-center justify-center mb-4 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                </FadeIn>
            ))}
        </div>
      </section>

      <div className="bg-slate-50 border-t border-slate-200">
        <div className="pt-16 pb-8 text-center px-6">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Ecosistema Activo</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">Encuentra tu lugar</h2>
            <p className="text-slate-500 max-w-xl mx-auto mt-2">Únete a las empresas que lideran estos sectores estratégicos.</p>
        </div>
        <div className="scale-95 origin-top">
            <MarketMap />
        </div>
      </div>

      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold mb-4">Tu Ruta de Ingreso</h2>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
                Hemos simplificado el proceso para que puedas empezar a operar y hacer networking en tiempo récord.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                <div className="hidden md:block absolute top-6 left-0 w-full h-0.5 bg-slate-700 -z-10"></div>
                {[
                    { step: 1, title: 'Solicitud', desc: 'Llena el formulario.' },
                    { step: 2, title: 'Validación', desc: 'Revisamos tu perfil.' },
                    { step: 3, title: 'Convenio', desc: 'Firma y pago anual.' },
                    { step: 4, title: 'Onboarding', desc: 'Acceso inmediato.' }
                ].map((item) => (
                    <div key={item.step} className="flex flex-col items-center group">
                        <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-xl mb-6 shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform ring-4 ring-slate-900 relative z-10">
                            {item.step}
                        </div>
                        <h4 className="font-bold text-white text-lg">{item.title}</h4>
                        <p className="text-sm text-slate-400 mt-2 px-4">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <section className="px-4 md:px-6 py-24 -mt-10" id="formulario">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col lg:flex-row relative z-10">
            
            <div className="lg:w-2/5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="inline-block px-3 py-1 bg-indigo-500/20 rounded-lg text-indigo-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Membresía Business Connect
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-6 leading-tight">El socio estratégico que necesitas.</h3>
                    
                    <ul className="space-y-8 mt-10">
                        <li className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                <Users className="h-6 w-6 text-indigo-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Networking C-Level</h4>
                                <p className="text-sm text-slate-400 leading-snug mt-1">Conecta con dueños y directores. No pierdas tiempo.</p>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                                <Building2 className="h-6 w-6 text-emerald-300" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">Tu Oficina en el PIIT</h4>
                                <p className="text-sm text-slate-400 leading-snug mt-1">Impresiona a tus clientes. Salas de juntas y auditorios.</p>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                    <p className="text-sm text-slate-300 font-medium mb-4">+350 empresas confían en el ecosistema:</p>
                    <div className="flex flex-wrap items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {PARTNER_LOGOS.map((logo, i) => (
                            <img key={i} src={logo} alt="Partner" className="h-6 w-auto object-contain brightness-0 invert hover:brightness-100 hover:invert-0 transition-all" />
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:w-3/5 p-6 md:p-12 bg-white">
                
                <div className="flex p-1.5 bg-slate-100 rounded-xl mb-8 max-w-md mx-auto lg:mx-0">
                    <button 
                        onClick={() => setFormType('empresa')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${formType === 'empresa' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Mail className="h-4 w-4" /> Solicitud
                    </button>
                    <button 
                        onClick={() => setFormType('agendar')}
                        className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${formType === 'agendar' ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Calendar className="h-4 w-4" /> Agendar Cita
                    </button>
                </div>

                {formType === 'empresa' && (
                    <motion.form 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="space-y-5 md:space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputGroup label="Nombre Completo *" icon={User} placeholder="Tu nombre" />
                            <InputGroup label="Cargo / Puesto *" icon={Briefcase} placeholder="Ej. CEO / Director" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <InputGroup label="Correo Profesional *" icon={Mail} type="email" placeholder="nombre@empresa.com" />
                            <InputGroup label="Teléfono / WhatsApp *" icon={Phone} type="tel" placeholder="+52 (81)..." />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <SelectGroup 
                                label="Tamaño de Empresa *" 
                                icon={Users} 
                                placeholder="Colaboradores"
                                options={["1-10 (Startup)", "11-50 (PyME)", "51-200 (Mediana)", "+200 (Corporativo)"]}
                            />
                            <SelectGroup 
                                label="Ubicación *" 
                                icon={MapPin} 
                                placeholder="Sede principal"
                                options={["Nuevo León", "Resto de México", "Extranjero (Softlanding)"]}
                            />
                        </div>

                        <SelectGroup 
                            label="Objetivo Principal *" 
                            icon={ArrowRight} 
                            placeholder="¿Qué es lo más importante para ti hoy?"
                            options={[
                                "Ventas y Networking B2B", 
                                "Instalación de Oficinas (Softlanding)", 
                                "Proyectos de IA e Innovación", 
                                "Capacitación de Talento",
                                "Levantamiento de Capital"
                            ]}
                        />

                        <div className="pt-6 border-t border-slate-100">
                            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-200 hover:shadow-2xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3 text-lg">
                                Iniciar Proceso <Send className="h-5 w-5" />
                            </button>
                            <p className="text-center text-xs text-slate-400 mt-4 px-4">
                                Tu información es confidencial. Al enviar aceptas ser contactado por el equipo comercial de MITC.
                            </p>
                        </div>
                    </motion.form>
                )}

                {formType === 'agendar' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 px-4"
                    >
                        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-indigo-50/50">
                            <Calendar className="h-12 w-12 text-indigo-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">Habla directo con Dirección</h3>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">
                            ¿Tienes dudas sobre el ROI de la membresía? Agenda 15 minutos con <strong>Javier Madinabeitia</strong>, nuestro Director Comercial.
                        </p>
                        
                        <a 
                            href={MEETING_URL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white border-2 border-indigo-600 text-indigo-700 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-lg shadow-sm hover:shadow-lg"
                        >
                            Ver Disponibilidad <ArrowRight className="h-5 w-5" />
                        </a>
                    </motion.div>
                )}

            </div>
        </div>
      </section>

    </div>
  );
};

export default Unirse;