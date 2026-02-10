import React from 'react';
import MarketMap from '../home/MarketMap';

const EcosystemPreview = () => {
  return (
    <div className="hidden md:block bg-slate-50 border-t border-slate-200 mt-16 md:mt-24">
        <div className="pt-16 pb-8 text-center px-6">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Ecosistema Activo</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mt-2">Encuentra tu lugar</h2>
            <p className="text-slate-500 max-w-xl mx-auto mt-2">Únete a las empresas que lideran estos sectores estratégicos.</p>
        </div>
        <div className="scale-95 origin-top">
            <MarketMap />
        </div>
    </div>
  );
};

export default EcosystemPreview;