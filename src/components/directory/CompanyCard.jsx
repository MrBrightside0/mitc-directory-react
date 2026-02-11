import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ShieldCheck, Building2, Store, Rocket, Briefcase } from 'lucide-react';

// --- HELPERS PARA ICONOS Y COLORES DE "TARGET" ---
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

const CompanyCard = ({ item, onClick }) => {
  const coverImage = item.banner || item.cover;
  const locationLabel = (item.location || 'Nuevo León').split(',')[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col justify-between h-full bg-white rounded-2xl border border-gray-200 overflow-hidden hover:border-indigo-500/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* BANNER TARJETA */}
      <div className="h-28 w-full relative overflow-hidden bg-gray-50 flex-shrink-0">
        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-transparent transition-colors z-10"></div>
        {coverImage ? (
          <img loading="lazy" src={coverImage} alt={item.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200" />
        )}
        {item.verified && (
          <div className="absolute top-2 right-2 z-20 bg-white/90 backdrop-blur text-emerald-700 p-1.5 rounded-full shadow-sm" title="Verificado">
            <ShieldCheck className="h-3.5 w-3.5" />
          </div>
        )}
      </div>

      <div className="px-5 pb-5 flex-1 flex flex-col">
        {/* LOGO OVERLAP & HEADER */}
        <div className="-mt-8 mb-2 relative z-20 flex justify-between items-end">
          <div className="h-14 w-14 rounded-xl bg-white flex items-center justify-center shadow-lg border-[3px] border-white overflow-hidden p-1">
            <img src={item.logoUrl} alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
            {item.tier}
          </span>
        </div>

        {/* --- NOMBRES --- */}
        <div className="mb-3">
            <h3 className="font-display font-bold text-lg text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                {item.name}
            </h3>
            {/* Nombre Comercial (Pequeño abajo) */}
            <p className="text-xs font-medium text-gray-400 truncate">
                {item.commercialName || item.industry} 
            </p>
        </div>

        {/* --- RECOMENDADO PARA (TARGET) --- */}
        {item.targetAudience && (
            <div className="flex flex-wrap gap-1.5 mb-3">
                {item.targetAudience.map(target => (
                    <span key={target} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[9px] font-bold uppercase tracking-wide ${getTargetStyle(target)}`}>
                        {getTargetIcon(target)} {target}
                    </span>
                ))}
            </div>
        )}
        
        {/* DESCRIPCIÓN */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {item.desc}
        </p>
        
        {/* STACK TECNOLÓGICO */}
        <div className="mt-auto pt-3 border-t border-dashed border-gray-100">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-2">Stack Tecnológico</p>
            <div className="flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[10px] font-medium text-gray-500 group-hover:text-gray-900 group-hover:border-gray-300 transition-colors">
                    {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* FOOTER CARD */}
      <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-200 flex items-center justify-between text-xs group-hover:bg-white transition-colors">
        <span className="flex items-center gap-1 text-gray-500 font-medium">
          <MapPin className="h-3 w-3 text-red-500"/> {locationLabel}
        </span>
        
        <span className="font-bold text-indigo-600 text-[10px] uppercase tracking-wider group-hover:underline decoration-dotted">
            Ver Perfil
        </span>
      </div>
    </motion.div>
  );
};

export default CompanyCard;
