import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Building2, Mail, Calendar, User, Briefcase, Phone, MapPin, ArrowRight, Send, Loader2
} from 'lucide-react';
import { submitLead } from '../../services/api';

const MEETING_URL = "https://meetings.hubspot.com/javier-m1?uuid=ac0d2c09-6a95-4b62-8a18-346e39571970";

const PARTNER_LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/512px-Microsoft_logo_%282012%29.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png", 
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/640px-IBM_logo.svg.png"
];

// --- SUB-COMPONENTES ACTUALIZADOS PARA MANEJAR DATOS ---
const InputGroup = ({ label, icon: Icon, type = "text", placeholder, name, value, onChange, required }) => (
  <div className="relative w-full group">
    <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <input 
        type={type} 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm text-slate-900 placeholder-slate-400 text-base focus:bg-white" 
        placeholder={placeholder}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, icon: Icon, options, placeholder, name, value, onChange, required }) => (
  <div className="relative w-full group">
    <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
        {Icon && <Icon className="h-5 w-5" />}
      </div>
      <select 
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm text-slate-900 appearance-none cursor-pointer text-base focus:bg-white bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1.5rem_center] bg-no-repeat"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

const ActionForm = () => {
  const [formType, setFormType] = useState('empresa');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });
  
  // Estado para guardar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    email: '',
    telefono: '',
    tamano: '',
    ubicacion: '',
    objetivo: ''
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- AQUÍ CONECTA MARIO EL BACKEND ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      await submitLead(formData);
      setSubmitMessage({
        type: 'success',
        text: 'Solicitud enviada correctamente. Te contactaremos pronto.'
      });
      
      // Resetear form
      setFormData({ nombre: '', cargo: '', email: '', telefono: '', tamano: '', ubicacion: '', objetivo: '' });

    } catch (error) {
      console.error("Error al enviar lead:", error);

      if (error?.code === 'missing_required') {
        setSubmitMessage({ type: 'error', text: 'Faltan campos requeridos. Revisa nombre y correo.' });
      } else if (error?.code === 'invalid_email') {
        setSubmitMessage({ type: 'error', text: 'El correo no es válido. Verifica e intenta de nuevo.' });
      } else if (error?.code === 'too_many_attempts' || error?.status === 429) {
        setSubmitMessage({ type: 'error', text: 'Se alcanzó el límite de intentos. Intenta más tarde.' });
      } else {
        setSubmitMessage({ type: 'error', text: 'No fue posible enviar tu solicitud. Intenta de nuevo.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-slate-50 py-12 md:py-24 md:-mt-10 relative z-20" id="formulario">
        <div className="max-w-7xl mx-auto bg-white md:rounded-[2.5rem] shadow-none md:shadow-2xl overflow-hidden border-y md:border border-slate-200 flex flex-col lg:flex-row relative">
            
            {/* COLUMNA IZQUIERDA (Igual que antes) */}
            <div className="lg:w-5/12 bg-slate-900 text-white p-8 lg:p-14 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600 rounded-full blur-[120px] opacity-20 pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-indigo-200 text-xs font-bold uppercase tracking-widest mb-6">Membresía Business Connect</div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-8 leading-tight">El socio estratégico que necesitas.</h3>
                    <ul className="space-y-8">
                        <li className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30 text-indigo-300"><Users className="h-6 w-6" /></div>
                            <div><h4 className="font-bold text-white text-lg">Networking C-Level</h4><p className="text-sm text-slate-400 leading-relaxed mt-1">Conecta con dueños y directores. Sin intermediarios.</p></div>
                        </li>
                        <li className="flex gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 text-emerald-300"><Building2 className="h-6 w-6" /></div>
                            <div><h4 className="font-bold text-white text-lg">Tu Oficina en el PIIT</h4><p className="text-sm text-slate-400 leading-relaxed mt-1">Impresiona a tus clientes. Salas de juntas y auditorios.</p></div>
                        </li>
                    </ul>
                </div>
                <div className="relative z-10 mt-16 pt-8 border-t border-white/10 hidden md:block">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-6">Confían en el ecosistema:</p>
                    <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {PARTNER_LOGOS.map((logo, i) => (<img key={i} src={logo} alt="Partner" className="h-8 w-auto object-contain brightness-0 invert hover:brightness-100 hover:invert-0 transition-all" />))}
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA: FORMULARIO */}
            <div className="lg:w-7/12 p-6 md:p-14 bg-white">
                <div className="flex p-1.5 bg-slate-100/80 rounded-2xl mb-10 max-w-md mx-auto md:mx-0">
                    <button onClick={() => setFormType('empresa')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${formType === 'empresa' ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}><Mail className="h-4 w-4" /> Solicitud</button>
                    <button onClick={() => setFormType('agendar')} className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${formType === 'agendar' ? 'bg-white text-indigo-600 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}><Calendar className="h-4 w-4" /> Agendar Cita</button>
                </div>

                {formType === 'empresa' && (
                    <motion.form 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                        onSubmit={handleSubmit} // CONECTADO
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Nombre Completo *" icon={User} placeholder="Tu nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                            <InputGroup label="Cargo / Puesto *" icon={Briefcase} placeholder="Ej. CEO / Director" name="cargo" value={formData.cargo} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="Correo Profesional *" icon={Mail} type="email" placeholder="nombre@empresa.com" name="email" value={formData.email} onChange={handleChange} required />
                            <InputGroup label="Teléfono / WhatsApp *" icon={Phone} type="tel" placeholder="+52 (81)..." name="telefono" value={formData.telefono} onChange={handleChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SelectGroup label="Tamaño de Empresa *" icon={Users} placeholder="Colaboradores" name="tamano" value={formData.tamano} onChange={handleChange} required options={["1-10 (Startup)", "11-50 (PyME)", "51-200 (Mediana)", "+200 (Corporativo)"]} />
                            <SelectGroup label="Ubicación *" icon={MapPin} placeholder="Sede principal" name="ubicacion" value={formData.ubicacion} onChange={handleChange} required options={["Nuevo León", "Resto de México", "Extranjero (Softlanding)"]} />
                        </div>
                        
                        <SelectGroup label="Objetivo Principal *" icon={ArrowRight} placeholder="Selecciona tu prioridad..." name="objetivo" value={formData.objetivo} onChange={handleChange} required options={["Ventas y Networking B2B", "Instalación de Oficinas (Softlanding)", "Proyectos de IA e Innovación", "Capacitación de Talento", "Levantamiento de Capital"]} />

                        <div className="pt-8 mt-4 border-t border-slate-100">
                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-indigo-200/50 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed">
                                {isSubmitting ? (
                                  <>Enviando... <Loader2 className="h-5 w-5 animate-spin" /></>
                                ) : (
                                  <>Iniciar Proceso <Send className="h-5 w-5" /></>
                                )}
                            </button>
                            {submitMessage.text && (
                              <p className={`text-center text-xs mt-4 px-4 font-medium ${submitMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {submitMessage.text}
                              </p>
                            )}
                            <p className="text-center text-xs text-slate-400 mt-4 px-4 leading-relaxed">Tus datos están seguros. Al enviar aceptas ser contactado por el equipo comercial de MITC.</p>
                        </div>
                    </motion.form>
                )}

                {formType === 'agendar' && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 px-4 flex flex-col items-center justify-center h-full">
                        <div className="w-28 h-28 bg-indigo-50 rounded-full flex items-center justify-center mb-8 ring-8 ring-indigo-50/50 shadow-inner"><Calendar className="h-14 w-14 text-indigo-600" /></div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Habla directo con Dirección</h3>
                        <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg leading-relaxed">¿Tienes dudas sobre el ROI de la membresía? Agenda 15 minutos con <strong>Javier Madinabeitia</strong>, nuestro Director Comercial.</p>
                        <a href={MEETING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-10 py-5 bg-white border-2 border-indigo-600 text-indigo-700 font-bold rounded-xl hover:bg-indigo-600 hover:text-white transition-all text-lg shadow-lg hover:shadow-xl">Ver Disponibilidad <ArrowRight className="h-5 w-5" /></a>
                    </motion.div>
                )}
            </div>
        </div>
    </section>
  );
};

export default ActionForm;
