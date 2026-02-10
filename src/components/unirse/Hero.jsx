import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6">
        
        {/* IMAGEN DE FONDO + CAPA NEGRA */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Networking empresarial" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
            <FadeIn>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Convocatoria Abierta 2026
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 tracking-tight leading-tight">
                  Deja de competir solo. <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Escala en comunidad.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12">
                  Accede a la red de colaboración más potente del norte de México. Proyectos validados, talento certificado e infraestructura lista para usar.
                </p>
                
                <button 
                    onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
                    className="px-8 py-4 bg-white text-slate-900 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 inline-flex items-center gap-2"
                >
                    Iniciar Afiliación <ArrowRight className="h-5 w-5" />
                </button>
            </FadeIn>
        </div>
    </section>
  );
};

export default Hero;