import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';

const ContactModal = ({ isOpen, onClose, companyName }) => {
  const [step, setStep] = useState(1); // 1: Formulario, 2: Éxito

  const handleSubmit = (e) => {
    e.preventDefault();
    // AQUÍ CONECTARÍAS CON TU BACKEND REAL
    // Simulamos envío y pasamos al éxito
    setTimeout(() => setStep(2), 1000);
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
                    <input type="text" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" placeholder="Ej. Ana García" />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Correo Corporativo</label>
                    <input type="email" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all" placeholder="ana@empresa.com" />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Detalles del Proyecto</label>
                    <textarea rows="3" required className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none" placeholder="Breve descripción de lo que necesitas..."></textarea>
                  </div>

                  <button type="submit" className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    Enviar Solicitud <Send className="h-4 w-4" />
                  </button>
                  
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