import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Share2, Layers, Package, Briefcase, Activity, 
  Globe, MapPin, ShieldCheck, Sparkles, Building2, 
  Store, Rocket, Mail, Phone // <--- Agregados Mail y Phone
} from 'lucide-react';
import ContactModal from './ContactModal'; 

const getLogoUrl = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

// Helpers visuales
const getTargetIcon = (target) => {
    switch (target) {
      case 'Enterprise': return <Building2 className="h-3 w-3" />;
      case 'Startup': return <Rocket className="h-3 w-3" />;
      case 'PyME': return <Store className="h-3 w-3" />;
      default: return <Briefcase className="h-3 w-3" />;
    }
};
  
const getTargetStyle = (target) => {
    switch (target) {
      case 'Enterprise': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Startup': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'PyME': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
};

const CompanyDrawer = ({ selectedCompany, onClose }) => {
  // ESTADO PARA EL MODAL DE CONTACTO
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!selectedCompany) return null;

  return (
    <>
      {/* 1. RENDERIZAR EL MODAL SI ESTÁ ABIERTO */}
      {isModalOpen && (
        <ContactModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            companyName={selectedCompany.name} 
        />
      )}

      {/* Fondo oscuro (Backdrop) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
      />
      
      {/* Panel Deslizante */}
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-50 w-full md:max-w-2xl bg-white shadow-2xl flex flex-col"
      >
        
        {/* Botones Flotantes */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
            <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copiada');
                }}
                className="p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
            >
                <Share2 className="h-6 w-6 drop-shadow-md" />
            </button>
            <button 
                onClick={onClose} 
                className="p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
            >
                <X className="h-6 w-6 drop-shadow-md" />
            </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="flex-1 overflow-y-auto bg-white relative pb-44"> 
          
          {/* Header con Banner */}
          <div className="relative h-64 bg-gray-100">
              <img src={selectedCompany.banner} alt="Cover" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              
              <div className="absolute -bottom-10 left-6 md:left-8 h-24 w-24 rounded-2xl bg-white p-2 shadow-2xl z-20">
                <div className="h-full w-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img src={getLogoUrl(selectedCompany.domain)} alt="Logo" className="w-full h-full object-contain p-1.5" />
                </div>
              </div>
          </div>

          <div className="px-6 md:px-8 pt-16">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight leading-none">{selectedCompany.name}</h1>
                
                {selectedCompany.commercialName && (
                    <p className="text-lg font-medium text-gray-400 mt-1">{selectedCompany.commercialName}</p>
                )}

                <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mt-3 flex items-center gap-2">
                    {selectedCompany.industry} 
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> 
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

            {/* Diferenciador Destacado */}
            {selectedCompany.differentiator && (
                <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3 shadow-sm">
                    <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Propuesta de Valor</p>
                        <p className="text-sm font-bold text-amber-900 italic leading-relaxed">
                            "{selectedCompany.differentiator}"
                        </p>
                    </div>
                </div>
            )}

            {/* Grid de Servicios y Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col gap-3">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                      <Layers className="h-3 w-3" /> Servicios Principales
                  </div>
                  <ul className="space-y-2">
                    {selectedCompany.services && selectedCompany.services.map((svc, idx) => (
                      <li key={idx} className="text-sm font-medium text-gray-800 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                        {svc}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                        <Package className="h-3 w-3" /> Productos Core
                    </div>
                    <p className="text-sm font-bold text-gray-900">{selectedCompany.products}</p>
                  </div>
                  
                  {selectedCompany.targetAudience && (
                      <div>
                        <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 mt-2">
                            <Rocket className="h-3 w-3" /> Enfoque de Mercado
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {selectedCompany.targetAudience.map(target => (
                                <span key={target} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wide ${getTargetStyle(target)}`}>
                                    {getTargetIcon(target)} {target}
                                </span>
                            ))}
                        </div>
                      </div>
                  )}
                </div>
            </div>

            {/* Descripción */}
            <div className="prose prose-slate mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">Perfil Ejecutivo</h3>
              <p className="text-gray-500 leading-relaxed text-base">
                {selectedCompany.desc}
              </p>
            </div>

            {/* Stack Tecnológico */}
            <div className="mb-10">
              <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Stack Tecnológico</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCompany.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1.5">
                    <Activity className="h-3 w-3 text-gray-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sección de Contacto Ampliada */}
            <div className="flex flex-col gap-5 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Información de Contacto</h3>
                
                {/* Sitio Web */}
                <a href={`https://${selectedCompany.domain}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-gray-200 shadow-sm">
                    <Globe className="h-5 w-5 text-gray-600 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase group-hover:text-indigo-600 transition-colors">Sitio Web</p>
                    <p className="font-medium text-gray-900 underline decoration-dotted">{selectedCompany.domain}</p>
                  </div>
                </a>

                {/* Ubicación */}
                <div className="flex items-center gap-4 p-3 -mx-3">
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                    <MapPin className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase">Ubicación</p>
                    <p className="font-medium text-gray-900">{selectedCompany.location}</p>
                  </div>
                </div>

                {/* Correo (Si existe) */}
                {selectedCompany.email && (
                  <a href={`mailto:${selectedCompany.email}`} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-gray-200 shadow-sm">
                      <Mail className="h-5 w-5 text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase group-hover:text-indigo-600 transition-colors">Correo Electrónico</p>
                      <p className="font-medium text-gray-900">{selectedCompany.email}</p>
                    </div>
                  </a>
                )}

                {/* Teléfono (Si existe) */}
                {selectedCompany.phone && (
                  <a href={`tel:${selectedCompany.phone}`} className="flex items-center gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors border border-gray-200 shadow-sm">
                      <Phone className="h-5 w-5 text-gray-600 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase group-hover:text-indigo-600 transition-colors">Teléfono</p>
                      <p className="font-medium text-gray-900">{selectedCompany.phone}</p>
                    </div>
                  </a>
                )}
            </div>
          </div>
        </div>

        {/* 2. BOTÓN DE ACCIÓN CONECTADO AL MODAL */}
        <div className="absolute bottom-0 w-full z-20">
          <div className="h-12 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
          <div className="border-t border-gray-200 p-6 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => setIsModalOpen(true)} // <-- AQUÍ ABRE EL MODAL
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Conectar con Socio
            </button>
          </div>
        </div>

      </motion.div>
    </>
  );
};

export default CompanyDrawer;