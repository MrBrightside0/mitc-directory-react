import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Loader2, Phone } from 'lucide-react';
import { submitLead } from '../../services/api';

const ContactModal = ({ isOpen, onClose, companyName }) => {
  const [step, setStep] = useState(1); // 1: Formulario, 2: Éxito
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    proyecto: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await submitLead({
        nombre: formData.nombre,
        cargo: `Contacto de directorio para ${companyName}`,
        email: formData.email,
        telefono: formData.telefono,
        tamano: '',
        ubicacion: '',
        objetivo: `Interés en ${companyName}. Detalles: ${formData.proyecto}`
      });

      setStep(2);
    } catch (error) {
      if (error?.code === 'invalid_email') {
        setErrorMessage('El correo no es válido. Verifica e intenta de nuevo.');
      } else if (error?.code === 'too_many_attempts' || error?.status === 429) {
        setErrorMessage('Se alcanzó el límite de intentos. Intenta más tarde.');
      } else {
        setErrorMessage('No se pudo enviar la solicitud. Intenta nuevamente.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {/* Fondo oscuro (Backdrop) con z-index alto para tapar el Drawer */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()} 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
        >
          {/* Botón cerrar */}
          <button onClick={onClose} className="absolute top-4 right-4 p-1 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>

          <div className="p-8">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-display font-bold text-slate-900 mb-2">
                  Cotizar con <span className="text-indigo-600">{companyName}</span>
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  Cuéntanos sobre tu proyecto. El equipo del Cluster validará tu solicitud y te conectará con el socio de forma segura.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Tu Nombre</label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="Ej. Ana García"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Corporativo</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                      placeholder="ana@empresa.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Celular</label>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="+52 81 1234 5678"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Detalles del Proyecto</label>
                    <textarea
                      rows="3"
                      name="proyecto"
                      value={formData.proyecto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                      placeholder="Breve descripción de lo que necesitas..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Enviando... <Loader2 className="h-4 w-4 animate-spin" /></>
                    ) : (
                      <>Enviar Solicitud <Send className="h-4 w-4" /></>
                    )}
                  </button>

                  {errorMessage && (
                    <p className="text-xs text-center text-rose-600 font-medium">
                      {errorMessage}
                    </p>
                  )}
                  
                  <p className="text-[10px] text-center text-slate-400 mt-4">
                    Al enviar, aceptas que el Cluster medie la conexión.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="mx-auto h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">¡Solicitud Recibida!</h3>
                <p className="text-sm text-slate-500 mb-6">
                  Hemos notificado a <b>{companyName}</b> sobre tu interés. Un gestor del Cluster te contactará contigo pronto para coordinar la reunión.
                </p>
                <button onClick={onClose} className="px-6 py-2 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  Entendido, gracias
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ContactModal;
