import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

// Topographic wave art for unirse page
const WaveArt = () => {
  const svgRef = useRef(null);

  useGSAP(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('.wave-path');

    // Draw-in
    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        delay: 0.3 + i * 0.06,
        ease: 'power2.inOut',
      });
    });

    // Floating
    gsap.to(svgRef.current, {
      y: -10,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Subtle rotation
    gsap.to('.wave-group-unirse', {
      rotation: 3,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center',
    });
  }, { scope: svgRef });

  const generateWaves = () => {
    const waves = [];
    const cx = 200, cy = 200;
    for (let i = 0; i < 16; i++) {
      const r = 25 + i * 12;
      const points = [];
      for (let a = 0; a <= 360; a += 4) {
        const rad = (a * Math.PI) / 180;
        const noise = Math.sin(rad * 4 + i * 0.6) * (6 + i * 1.2) + Math.cos(rad * 2.5 - i * 0.8) * (3 + i * 0.8);
        const x = cx + (r + noise) * Math.cos(rad);
        const y = cy + (r + noise) * Math.sin(rad);
        points.push(`${a === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`);
      }
      points.push('Z');
      waves.push(
        <path
          key={i}
          className="wave-path"
          d={points.join(' ')}
          fill="none"
          stroke="url(#waveGradUnirse)"
          strokeWidth={1 - i * 0.02}
          opacity={0.3 + (i / 16) * 0.5}
        />
      );
    }
    return waves;
  };

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 0 40px rgba(99, 102, 241, 0.12))' }}
    >
      <defs>
        <linearGradient id="waveGradUnirse" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a5b4fc" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <g className="wave-group-unirse">
        {generateWaves()}
      </g>
    </svg>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Badge
    tl.fromTo('.unirse-badge',
      { y: -20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 }
    );

    // Heading lines reveal
    tl.fromTo('.unirse-line',
      { yPercent: 120 },
      { yPercent: 0, duration: 1.1, stagger: 0.18 },
      '-=0.3'
    );

    // Paragraph
    tl.fromTo('.unirse-para',
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Search bar
    tl.fromTo('.unirse-search',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    );

    // Buttons
    tl.fromTo('.unirse-btn',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    );

    // Stats
    tl.fromTo('.unirse-stat',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      '-=0.3'
    );

    // Floating particles
    gsap.utils.toArray('.unirse-particle').forEach((el, i) => {
      gsap.to(el, {
        y: `random(-15, 15)`,
        x: `random(-8, 8)`,
        duration: `random(3, 5)`,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center px-6 bg-slate-950 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/[0.08] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-[400px] h-[400px] bg-cyan-500/[0.05] rounded-full blur-[100px]"></div>
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      ></div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="unirse-particle absolute w-1 h-1 rounded-full bg-indigo-400/20"
            style={{ top: `${20 + i * 15}%`, left: `${8 + i * 18}%` }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 py-32 lg:py-0">

        {/* Left: Content */}
        <div>
          <div className="unirse-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Convocatoria Abierta 2026
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.95] tracking-tight mb-8">
            <span className="block overflow-hidden">
              <span className="unirse-line block">Deja de</span>
            </span>
            <span className="block overflow-hidden">
              <span className="unirse-line block">competir</span>
            </span>
            <span className="block overflow-hidden">
              <span className="unirse-line block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">solo.</span>
            </span>
          </h1>

          <p className="unirse-para text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
            Accede a la red de colaboración más potente del norte de México. <strong className="text-white">Proyectos validados</strong>, talento certificado e infraestructura lista para usar.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
              className="unirse-btn px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 group"
            >
              Iniciar Afiliación <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.getElementById('formulario').scrollIntoView({ behavior: 'smooth' })}
              className="unirse-btn px-8 py-4 bg-white/[0.05] text-slate-300 border border-white/[0.1] rounded-xl font-bold hover:bg-white/[0.1] hover:text-white transition-all flex items-center"
            >
              Agendar Cita
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { value: '350+', label: 'Empresas Conectadas' },
              { value: 'PIIT', label: 'Oficinas' },
              { value: '13', label: 'Clusters' },
            ].map((stat, i) => (
              <div key={i} className="unirse-stat">
                <span className="block text-2xl font-display font-bold text-white">{stat.value}</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Wave Art */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-[480px] h-[480px] relative">
            <WaveArt />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
              <div className="w-40 h-40 bg-indigo-500/8 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
