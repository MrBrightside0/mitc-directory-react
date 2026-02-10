import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Play, Building2 } from 'lucide-react';

const StatItem = ({ number, label }) => (
  <div className="flex flex-col items-center justify-center p-4 border-r border-slate-200 last:border-0">
    <span className="text-3xl md:text-4xl font-display font-bold text-slate-900 tracking-tight">{number}</span>
    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 text-center">{label}</span>
  </div>
);

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 bg-slate-900 overflow-hidden">
        {/* Fondo */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/30 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Fortalecer • Colaborar • Desarrollar
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] mb-6 tracking-tight">
              ¿Quieres automatizar <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">tu empresa?</span>
            </h1>
            
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              Contamos con más de <strong>35 empresas de tecnología</strong> en diferentes sectores. Implementa inteligencia artificial rápido y potencializa tu trabajo, en <strong>4 a 8 semanas</strong>. Expande tu negocio con oficinas listas en Nuevo León-Texas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/unirse" className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                Solicitar Asesoría <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/directorio" className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all flex items-center justify-center backdrop-blur-sm">
                Ver Empresas
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-sm font-medium text-slate-400">
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                 <span>Redujo tiempos de 20% en tus departamentos</span>
               </div>
               <div className="flex items-center gap-2">
                 <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                 <span>Integración en red de 13 clusters nacionales</span>
               </div>
            </div>
          </motion.div>

          {/* Visual Hero */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800 aspect-[4/3] group">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600&auto=format&fit=crop" 
                alt="Oficinas en Monterrey" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-slate-900/20"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 text-white hover:scale-110 hover:bg-white/30 transition-all cursor-pointer shadow-lg">
                    <Play className="h-8 w-8 ml-1 fill-white" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
    </section>
  );
};

export default Hero;