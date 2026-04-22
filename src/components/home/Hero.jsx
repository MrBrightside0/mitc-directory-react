import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import logo from '../../assets/logo.svg';

// Animated logo composition with orbiting rings and particles
const AnimatedLogo = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Logo entrance
    gsap.fromTo('.logo-center',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 0.5, ease: 'back.out(1.4)' }
    );

    // Logo breathing
    gsap.to('.logo-center', {
      scale: 1.03,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.8,
    });

    // Glow pulse
    gsap.to('.logo-glow', {
      opacity: 0.3,
      scale: 1.15,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    // Orbiting rings draw in
    containerRef.current.querySelectorAll('.orbit-ring').forEach((ring, i) => {
      const length = ring.getTotalLength();
      gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(ring, {
        strokeDashoffset: 0,
        duration: 2,
        delay: 0.8 + i * 0.2,
        ease: 'power2.inOut',
      });
    });

    // Rings continuous rotation
    gsap.to('.orbit-group-1', {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
    gsap.to('.orbit-group-2', {
      rotation: -360,
      duration: 45,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });
    gsap.to('.orbit-group-3', {
      rotation: 360,
      duration: 60,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center',
    });

    // Orbit dots pulse
    containerRef.current.querySelectorAll('.orbit-dot').forEach((dot, i) => {
      gsap.to(dot, {
        opacity: 1,
        scale: 1.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: i * 0.4,
        ease: 'sine.inOut',
      });
    });

    // Corner accent lines draw in
    containerRef.current.querySelectorAll('.accent-line').forEach((line, i) => {
      gsap.fromTo(line,
        { scaleX: 0, scaleY: 0, opacity: 0 },
        { scaleX: 1, scaleY: 1, opacity: 1, duration: 0.8, delay: 1.5 + i * 0.15, ease: 'power2.out' }
      );
    });

    // Floating container
    gsap.to(containerRef.current, {
      y: -6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-[460px] h-[460px]">
      <svg viewBox="0 0 460 460" className="absolute inset-0 w-full h-full">
        {/* Orbit ring 1 - inner */}
        <g className="orbit-group-1">
          <ellipse className="orbit-ring" cx="230" cy="230" rx="140" ry="140"
            fill="none" stroke="url(#grad1)" strokeWidth="0.8" opacity="0.3" />
          <circle className="orbit-dot" cx="370" cy="230" r="3" fill="#818cf8" opacity="0.5" />
          <circle className="orbit-dot" cx="90" cy="230" r="2" fill="#06b6d4" opacity="0.4" />
        </g>

        {/* Orbit ring 2 - middle */}
        <g className="orbit-group-2">
          <ellipse className="orbit-ring" cx="230" cy="230" rx="185" ry="175"
            fill="none" stroke="url(#grad1)" strokeWidth="0.6" opacity="0.2"
            transform="rotate(20, 230, 230)" />
          <circle className="orbit-dot" cx="415" cy="230" r="2.5" fill="#6366f1" opacity="0.4" />
          <circle className="orbit-dot" cx="45" cy="230" r="2" fill="#818cf8" opacity="0.3" />
        </g>

        {/* Orbit ring 3 - outer */}
        <g className="orbit-group-3">
          <ellipse className="orbit-ring" cx="230" cy="230" rx="220" ry="210"
            fill="none" stroke="url(#grad1)" strokeWidth="0.4" opacity="0.15"
            transform="rotate(-10, 230, 230)" />
          <circle className="orbit-dot" cx="230" cy="20" r="2" fill="#06b6d4" opacity="0.3" />
        </g>

        {/* Accent dashes - decorative */}
        <line className="accent-line" x1="50" y1="80" x2="90" y2="80" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
        <line className="accent-line" x1="50" y1="80" x2="50" y2="110" stroke="#6366f1" strokeWidth="1" opacity="0.3" />
        <line className="accent-line" x1="370" y1="380" x2="410" y2="380" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
        <line className="accent-line" x1="410" y1="350" x2="410" y2="380" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glow behind logo */}
      <div className="logo-glow absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Logo center */}
      <div className="logo-center absolute inset-0 flex items-center justify-center">
        <img
          src={logo}
          alt="MITC Logo"
          className="w-56 brightness-0 invert opacity-90"
          style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 20px rgba(99, 102, 241, 0.2))' }}
        />
      </div>
    </div>
  );
};

const SplitText = ({ text, className = '', shimmer = false }) => {
  const shimmerStyle = shimmer
    ? {
        backgroundImage: 'linear-gradient(90deg, #818cf8 0%, #22d3ee 25%, #a78bfa 50%, #22d3ee 75%, #818cf8 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }
    : {};
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`hero-char inline-block ${shimmer ? 'hero-shimmer' : ''} ${className}`}
          style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal', ...shimmerStyle }}
        >
          {ch}
        </span>
      ))}
    </>
  );
};

const Hero = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Heading reveal — char by char with blur + rise
    tl.fromTo('.hero-char',
      { yPercent: 110, opacity: 0, filter: 'blur(12px)' },
      { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1, stagger: 0.035 }
    );

    // Continuous shimmer sweep on the gradient word
    gsap.to('.hero-shimmer', {
      backgroundPosition: '200% center',
      duration: 6,
      repeat: -1,
      ease: 'none',
    });

    // Subtitle
    tl.fromTo('.hero-sub',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.5'
    );

    // Search bar
    tl.fromTo('.hero-search',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );

    // Buttons
    tl.fromTo('.hero-btn',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 },
      '-=0.3'
    );

    // Stats
    tl.fromTo('.hero-stat',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1,
      duration: 0.5,
      stagger: 0.08,
    }, '-=0.3');

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center px-6 bg-slate-950 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
          src="/hero-bg.mp4"
          poster="/hero-bg-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <img
          src="/hero-bg-poster.jpg"
          alt=""
          aria-hidden="true"
          className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-900/80 to-slate-950/90"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/[0.07] blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-cyan-500/[0.04] blur-[100px]"></div>
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      ></div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 py-32 lg:py-0">

        {/* Left: Content */}
        <div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white leading-[0.95] tracking-tight mb-8">
            <span className="block overflow-hidden pb-1">
              <SplitText text="Automatiza." />
            </span>
            <span className="block overflow-hidden pb-1">
              <SplitText text="Escala." shimmer />
            </span>
            <span className="block overflow-hidden pb-1">
              <SplitText text="Crece." />
            </span>
          </h1>

          <p className="hero-sub text-lg md:text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
            Más de <strong className="text-white">35 empresas de tecnología</strong> listas para implementar IA en tu negocio. Resultados en <strong className="text-white">4 a 8 semanas</strong>.
          </p>

          {/* Search bar */}
          <div className="hero-search relative max-w-md mb-8">
            <div className="flex items-center bg-white/[0.06] border border-white/[0.1] px-5 py-4 backdrop-blur-sm hover:border-indigo-500/30 transition-all focus-within:border-indigo-500/50 focus-within:bg-white/[0.08]">
              <Search className="w-5 h-5 text-slate-500 mr-3 shrink-0" />
              <input
                type="text"
                placeholder="¿Qué necesita tu empresa?"
                className="bg-transparent text-white placeholder-slate-500 outline-none w-full text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Link to="/unirse" className="hero-btn px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-2 group">
              Solicitar Asesoría <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/directorio" className="hero-btn px-8 py-4 bg-white/[0.05] text-slate-300 border border-white/[0.1] font-bold hover:bg-white/[0.1] hover:text-white transition-all flex items-center">
              Ver Empresas
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8">
            {[
              { value: '35+', label: 'Empresas' },
              { value: '13', label: 'Clusters' },
              { value: '4-8', label: 'Semanas' },
            ].map((stat, i) => (
              <div key={i} className="hero-stat">
                <span className="block text-2xl font-display font-bold text-white">{stat.value}</span>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Animated Logo */}
        <div className="hidden lg:flex items-center justify-center">
          <AnimatedLogo />
        </div>

      </div>

    </section>
  );
};

export default Hero;
