import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.15 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: '110%', filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const shimmerCSS = `
  @keyframes unirse-shimmer-sweep {
    0% { background-position: 0% center; }
    100% { background-position: 200% center; }
  }
  .unirse-shimmer {
    animation: unirse-shimmer-sweep 6s linear infinite;
  }
`;

const SplitLine = ({ text, className = '', shimmer = false }) => {
  const shimmerStyle = shimmer
    ? {
        backgroundImage:
          'linear-gradient(90deg, #818cf8 0%, #22d3ee 25%, #a78bfa 50%, #22d3ee 75%, #818cf8 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }
    : {};
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          variants={charVariants}
          className={`inline-block ${shimmer ? 'unirse-shimmer' : ''}`}
          style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal', ...shimmerStyle }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center px-6 bg-slate-950 overflow-hidden">
      <style>{shimmerCSS}</style>
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
          src="/unirse-bg.mp4"
          poster="/unirse-bg-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <img
          src="/unirse-bg-poster.jpg"
          alt=""
          aria-hidden="true"
          className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/90"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.08] blur-[120px]"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/[0.05] blur-[100px]"></div>
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 py-32 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">

          {/* Left: Headline */}
          <div className="lg:col-span-7">
            <span className="inline-block text-[11px] font-mono tracking-[0.25em] text-indigo-300/80 uppercase mb-6">
              [ Convocatoria 2026 ]
            </span>
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="text-5xl md:text-7xl lg:text-[8rem] xl:text-[9rem] font-display font-bold text-white leading-[0.92] tracking-[-0.02em]"
            >
              <SplitLine text="Deja de" />
              <SplitLine text="competir" />
              <SplitLine text="solo." shimmer />
            </motion.h1>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-5 lg:pb-6">
            <div className="h-px w-16 bg-white/20 mb-8 hidden lg:block"></div>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
              Accede a la red de colaboración más potente del norte de México. <strong className="text-white font-semibold">Proyectos validados</strong>, talento certificado e infraestructura lista para usar.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              <button
                onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
              >
                Iniciar Afiliación <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white/[0.05] text-slate-300 border border-white/[0.1] font-bold hover:bg-white/[0.1] hover:text-white transition-all flex items-center justify-center"
              >
                Agendar Cita
              </button>
            </div>
          </div>
        </div>

        {/* Bottom: Stats strip — full width, aligned with headline baseline */}
        <div className="mt-16 lg:mt-24 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 lg:gap-12">
          {[
            { value: '350+', label: 'Empresas Conectadas' },
            { value: 'PIIT', label: 'Oficinas' },
            { value: '13', label: 'Clusters' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <span className="text-3xl lg:text-4xl font-display font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-[11px] text-slate-500 uppercase tracking-[0.18em] font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
