import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, User, Building2, Mail, Briefcase,
  CheckCircle2, Brain, Database, Users, Cpu, Rocket, Shield,
  ChevronRight, Target, Lightbulb, BarChart3, AlertTriangle, TrendingUp,
  RotateCcw, Check, Circle, Download, FileText, ExternalLink, X as XIcon
} from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  SECTORES, TAMANOS, RETOS, AREAS_MEJORA, ERP_OPTIONS, CRM_OPTIONS,
  TIPOS_IA, PILARES, ESCALA_LABELS, AREAS_IMPACTO, SOLUCIONES,
  TIPOS_APOYO, getNivelMadurez, RETRO_RETOS, RETRO_ERP, RETRO_CRM, HINTS
} from './assessmentData';
import RadarChart from './RadarChart';
import logo from '../../assets/logo.svg';
import { submitAssessment, generateAssessmentPdf } from '../../services/api';

// ─── Hint component (collapsible tip) ───────────────────────

const Hint = ({ text }) => {
  const [open, setOpen] = useState(false);
  if (!text) return null;
  return (
    <div className="mt-2 mb-1">
      <button type="button" onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1.5 text-xs text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
        <Lightbulb className="w-3.5 h-3.5" />
        {open ? 'Ocultar recomendación' : 'Ver recomendación'}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="mt-2 text-xs text-indigo-600/80 bg-indigo-50 border border-indigo-100 p-3 leading-relaxed">
              💡 {text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PILAR_ICONS = [Target, Database, Users, Cpu, Rocket, Shield];
const TOTAL_STEPS = 12;

// ─── Sidebar with animated logo ─────────────────────────────

const Sidebar = ({ step }) => {
  const sidebarRef = useRef(null);

  useGSAP(() => {
    if (!sidebarRef.current) return;

    // Logo entrance
    gsap.fromTo('.sidebar-logo',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.4)', delay: 0.3 }
    );

    // Logo breathing
    gsap.to('.sidebar-logo', {
      scale: 1.04,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1.5,
    });

    // Orbits draw in
    sidebarRef.current.querySelectorAll('.sidebar-orbit').forEach((ring, i) => {
      const length = ring.getTotalLength();
      gsap.set(ring, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(ring, {
        strokeDashoffset: 0,
        duration: 2,
        delay: 0.5 + i * 0.3,
        ease: 'power2.inOut',
      });
    });

    // Orbits rotate
    gsap.to('.sidebar-orbit-g1', { rotation: 360, duration: 40, repeat: -1, ease: 'none', transformOrigin: 'center center' });
    gsap.to('.sidebar-orbit-g2', { rotation: -360, duration: 55, repeat: -1, ease: 'none', transformOrigin: 'center center' });

    // Dots pulse
    sidebarRef.current.querySelectorAll('.sidebar-dot').forEach((dot, i) => {
      gsap.to(dot, { opacity: 1, scale: 1.5, duration: 1.8, repeat: -1, yoyo: true, delay: i * 0.6, ease: 'sine.inOut' });
    });

    // Glow pulse
    gsap.to('.sidebar-glow', { opacity: 0.25, scale: 1.1, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });

  }, { scope: sidebarRef });

  const pct = Math.round((step / (TOTAL_STEPS - 1)) * 100);

  return (
    <div ref={sidebarRef} className="hidden lg:flex w-[340px] shrink-0 bg-slate-900 flex-col items-center justify-center relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
      <div className="absolute top-[-20%] left-[-20%] w-[300px] h-[300px] bg-indigo-600/[0.08] blur-[80px]"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }}></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Animated logo with orbits */}
        <div className="w-[220px] h-[220px] relative mb-8">
          <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="sideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <g className="sidebar-orbit-g1">
              <circle className="sidebar-orbit" cx="110" cy="110" r="85" fill="none" stroke="url(#sideGrad)" strokeWidth="0.6" opacity="0.25" />
              <circle className="sidebar-dot" cx="195" cy="110" r="2.5" fill="#818cf8" opacity="0.4" />
            </g>
            <g className="sidebar-orbit-g2">
              <circle className="sidebar-orbit" cx="110" cy="110" r="105" fill="none" stroke="url(#sideGrad)" strokeWidth="0.4" opacity="0.15" />
              <circle className="sidebar-dot" cx="110" cy="5" r="2" fill="#06b6d4" opacity="0.3" />
            </g>
          </svg>

          <div className="sidebar-glow absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 bg-indigo-500/15 blur-2xl"></div>
          </div>

          <div className="sidebar-logo absolute inset-0 flex items-center justify-center">
            <img src={logo} alt="MITC" className="w-32" style={{ filter: 'brightness(0) invert(1) drop-shadow(0 0 15px rgba(99,102,241,0.25))' }} />
          </div>
        </div>

        {/* Branding */}
        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">CII.IA</p>
        <p className="text-xs text-slate-500 text-center px-8 leading-relaxed">Centro de Innovación<br/>de Inteligencia Artificial</p>

        {/* Back to site button */}
        <a href="/" className="mt-6 mb-2 inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white hover:bg-white/10 transition-all">
          <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio
        </a>

        {/* Progress ring */}
        <div className="mt-8 relative w-16 h-16">
          <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
            <circle cx="32" cy="32" r="28" fill="none" stroke="#1e293b" strokeWidth="3" />
            <circle cx="32" cy="32" r="28" fill="none" stroke="url(#sideGrad)" strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - pct / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">{pct}%</span>
        </div>
      </div>
    </div>
  );
};

// ─── Step indicator with icons ────────────────────────────

const STEP_SECTIONS = [
  { label: 'Inicio', icon: Brain },
  { label: 'Datos', icon: User },
  { label: 'Negocio', icon: Building2 },
  { label: 'Tech', icon: Cpu },
  { label: 'Pilares', icon: Target },
  { label: 'Oportunidades', icon: Lightbulb },
  { label: 'Cierre', icon: Briefcase },
];

const getSection = (step) => {
  if (step === 0) return 0;
  if (step === 1) return 1;
  if (step === 2) return 2;
  if (step === 3) return 3;
  if (step >= 4 && step <= 9) return 4;
  if (step === 10) return 5;
  return 6;
};

const StepIndicator = ({ step }) => {
  const currentSection = getSection(step);
  return (
    <div className="flex items-center justify-between w-full max-w-2xl mx-auto mb-2">
      {STEP_SECTIONS.map((s, i) => {
        const done = i < currentSection;
        const active = i === currentSection;
        const Icon = s.icon;
        return (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 flex items-center justify-center transition-all duration-300 ${
                done ? 'bg-indigo-600 text-white scale-90' :
                active ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 scale-110' :
                'bg-slate-100 text-slate-400'
              }`}>
                {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
              </div>
              <span className={`text-[10px] font-bold hidden sm:block ${active ? 'text-indigo-600' : done ? 'text-slate-500' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
            {i < STEP_SECTIONS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all ${i < currentSection ? 'bg-indigo-600' : 'bg-slate-100'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Pilar mini progress (shown during steps 4-9)
const PilarMiniNav = ({ currentPilar, scores }) => (
  <div className="flex gap-2 mb-6">
    {PILARES.map((p, i) => {
      const Icon = PILAR_ICONS[i];
      const done = scores[i].every(s => s > 0);
      const active = i === currentPilar;
      return (
        <div key={i} className={`flex-1 flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all ${
          active ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
          done ? 'bg-emerald-50 text-emerald-600' :
          'bg-slate-50 text-slate-400'
        }`}>
          <Icon className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden lg:block truncate">{p.nombre.split(' ')[0]}</span>
          {done && !active && <Check className="w-3 h-3 ml-auto shrink-0" />}
        </div>
      );
    })}
  </div>
);

// ─── Sub-components ─────────────────────────────────────────

const StepHeader = ({ icon: Icon, title, subtitle, stepNum, totalInSection }) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-3">
      {Icon && <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200/50"><Icon className="w-5 h-5" /></div>}
      <div>
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900">{title}</h2>
        {stepNum && <p className="text-xs text-slate-400 font-bold">{stepNum}</p>}
      </div>
    </div>
    {subtitle && <p className="text-slate-500 leading-relaxed ml-14">{subtitle}</p>}
  </div>
);

const InputField = ({ label, type = 'text', placeholder, value, onChange, required }) => (
  <div className="group">
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3.5 bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 placeholder-slate-400 hover:border-slate-300"
    />
  </div>
);

const SelectField = ({ label, options, placeholder, value, onChange }) => (
  <div className="group">
    <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-3.5 bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 appearance-none cursor-pointer hover:border-slate-300 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%236b7280%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat"
    >
      <option value="" disabled>{placeholder}</option>
      {options.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
    </select>
  </div>
);

const MultiSelect = ({ label, options, selected, onChange, max = 3 }) => {
  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
    else if (selected.length < max) onChange([...selected, opt]);
  };
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-1">{label}</label>
      <p className="text-xs text-slate-400 mb-3">Selecciona hasta {max} opciones &mdash; <span className="text-indigo-500 font-bold">{selected.length}/{max}</span></p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const active = selected.includes(opt);
          return (
            <button key={i} type="button" onClick={() => toggle(opt)}
              className={`px-4 py-2.5 text-sm font-medium border transition-all ${
                active ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200/50' :
                selected.length >= max ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed' :
                'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >{opt}</button>
          );
        })}
      </div>
    </div>
  );
};

const CheckboxGroup = ({ label, options, selected, onChange }) => {
  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter(s => s !== opt));
    else onChange([...selected, opt]);
  };
  return (
    <div>
      <label className="block text-sm font-bold text-slate-700 mb-3">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt, i) => {
          const active = selected.includes(opt);
          return (
            <button key={i} type="button" onClick={() => toggle(opt)}
              className={`px-4 py-3 text-sm text-left font-medium border transition-all flex items-center gap-3 ${
                active ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-5 h-5 border-2 flex items-center justify-center shrink-0 transition-all ${active ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`}>
                {active && <Check className="w-3 h-3 text-white" />}
              </div>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Likert scale with color gradient
const LIKERT_COLORS = [
  '', // index 0 unused
  'bg-rose-500 border-rose-500 ring-rose-100',
  'bg-orange-500 border-orange-500 ring-orange-100',
  'bg-amber-500 border-amber-500 ring-amber-100',
  'bg-blue-500 border-blue-500 ring-blue-100',
  'bg-emerald-500 border-emerald-500 ring-emerald-100',
];

const LikertScale = ({ question, value, onChange, index, hint }) => (
  <div className="py-5 border-b border-slate-100 last:border-0">
    <p className="text-sm font-medium text-slate-800 mb-2 leading-relaxed">
      <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-100 text-indigo-600 text-xs font-bold mr-2">{index}</span>
      {question}
    </p>
    {hint && <div className="ml-8 mb-3"><Hint text={hint} /></div>}
    <div className="grid grid-cols-5 gap-2">
      {ESCALA_LABELS.map(({ value: v, label }) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`py-3 px-1 text-xs font-medium border-2 transition-all text-center ${
            value === v
              ? `${LIKERT_COLORS[v]} text-white ring-4`
              : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
          }`}
        >
          <span className="block text-lg font-bold">{v}</span>
          <span className="hidden sm:block mt-0.5 leading-tight">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

const PriorityScale = ({ value, onChange }) => {
  const options = [
    { v: 1, label: 'No es prioridad', color: 'border-l-rose-500' },
    { v: 2, label: 'Interesante, pero no urgente', color: 'border-l-orange-500' },
    { v: 3, label: 'Prioridad media', color: 'border-l-amber-500' },
    { v: 4, label: 'Alta prioridad', color: 'border-l-blue-500' },
    { v: 5, label: 'Muy alta / estratégico', color: 'border-l-emerald-500' }
  ];
  return (
    <div className="flex flex-col gap-2">
      {options.map(({ v, label, color }) => (
        <button key={v} type="button" onClick={() => onChange(v)}
          className={`py-3.5 px-5 text-sm font-medium border-2 border-l-4 transition-all text-left flex items-center gap-3 ${color} ${
            value === v ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className={`w-8 h-8 flex items-center justify-center text-sm font-bold transition-all ${value === v ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'}`}>{v}</span>
          {label}
        </button>
      ))}
    </div>
  );
};

// ─── Results Component ──────────────────────────────────────

// ─── PDF Generation Modal ───────────────────────────────────

const PdfModal = ({ isOpen, onClose, status, error }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={status !== 'loading' ? onClose : undefined}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-white p-8 max-w-sm w-full text-center shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 relative">
                <div className="absolute inset-0 border-4 border-slate-100"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-indigo-600 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Generando reporte</h3>
              <p className="text-sm text-slate-500">Estamos preparando tu Reporte Ejecutivo de Madurez personalizado...</p>
              <div className="mt-5 w-full bg-slate-100 h-1.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-[shimmer_2s_ease-in-out_infinite]" style={{ width: '70%', animation: 'sLoad 1.5s ease-in-out infinite' }}></div>
              </div>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Reporte descargado</h3>
              <p className="text-sm text-slate-500 mb-5">Tu PDF se descargó correctamente.</p>
              <button onClick={onClose} className="px-6 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all">
                Cerrar
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-5 bg-rose-50 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-rose-500" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900 mb-2">Error al generar</h3>
              <p className="text-sm text-slate-500 mb-5">{error || 'No pudimos generar el PDF. Inténtalo de nuevo.'}</p>
              <button onClick={onClose} className="px-6 py-2.5 bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all">
                Cerrar
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const PdfSection = ({ assessmentId }) => {
  const [pdfStatus, setPdfStatus] = useState('idle'); // idle | loading | success | error
  const [pdfError, setPdfError] = useState('');

  const handleDownload = async () => {
    setPdfStatus('loading');
    setPdfError('');

    try {
      const blob = await generateAssessmentPdf(assessmentId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Reporte_Madurez_IA_${assessmentId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setPdfStatus('success');
    } catch (err) {
      console.error('Error generando PDF:', err);
      setPdfError(err?.message || 'No pudimos generar el PDF. Inténtalo de nuevo.');
      setPdfStatus('error');
    }
  };

  return (
    <>
      <PdfModal
        isOpen={pdfStatus !== 'idle'}
        onClose={() => setPdfStatus('idle')}
        status={pdfStatus}
        error={pdfError}
      />
      <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-white">
          <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Reporte Ejecutivo PDF</h3>
            <p className="text-xs text-white/70">Descarga tu diagnóstico personalizado</p>
          </div>
        </div>
        <button
          onClick={handleDownload}
          disabled={pdfStatus === 'loading'}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-700 text-sm font-bold hover:bg-indigo-50 transition-all shadow-lg disabled:opacity-70"
        >
          <Download className="w-4 h-4" /> Descargar PDF
        </button>
      </div>
    </>
  );
};

const Results = ({ data, pilarScores, onReset, assessmentId, submitError }) => {
  const totalScore = pilarScores.reduce((a, b) => a + b, 0) / pilarScores.length;
  const nivel = getNivelMadurez(totalScore);
  const labels = PILARES.map(p => p.nombre.split(' ').slice(0, 2).join(' '));

  const fortalezas = pilarScores.map((s, i) => ({ score: s, pilar: PILARES[i], idx: i })).sort((a, b) => b.score - a.score).slice(0, 2);
  const brechas = pilarScores.map((s, i) => ({ score: s, pilar: PILARES[i], idx: i })).sort((a, b) => a.score - b.score).slice(0, 2);

  const getColor = (score) => {
    if (score >= 4.1) return 'text-emerald-600 bg-emerald-50';
    if (score >= 3.1) return 'text-blue-600 bg-blue-50';
    if (score >= 2.1) return 'text-amber-600 bg-amber-50';
    return 'text-rose-600 bg-rose-50';
  };

  const getBarColor = (score) => {
    if (score >= 4.1) return 'bg-emerald-500';
    if (score >= 3.1) return 'bg-blue-500';
    if (score >= 2.1) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  const getLowScoringRetro = (pilarIdx) => {
    const pilar = PILARES[pilarIdx];
    const scores = data.pilarScores[pilarIdx];
    return scores.map((score, qIdx) => ({ question: pilar.preguntas[qIdx], retro: pilar.retroalimentacion?.[qIdx], score }))
      .filter(lr => lr.score <= 2 && lr.retro);
  };

  const retoRetros = (data.retos || []).filter(r => RETRO_RETOS[r]).map(r => ({ reto: r, retro: RETRO_RETOS[r] }));
  const erpRetros = (data.erp || []).filter(e => RETRO_ERP[e]).map(e => ({ system: e, retro: RETRO_ERP[e] }));
  const crmRetros = (data.crm || []).filter(c => RETRO_CRM[c]).map(c => ({ system: c, retro: RETRO_CRM[c] }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center pt-4">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">CII.IA &mdash; Centro de Innovación de Inteligencia Artificial</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-1">Reporte Ejecutivo de Madurez</h2>
        <p className="text-slate-500">{data.nombre} {data.apellidos} &mdash; {data.empresa}</p>
      </div>

      {/* Score card */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 blur-3xl -mr-12 -mt-12"></div>
        <p className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-3 relative z-10">Score total de madurez</p>
        <div className="text-7xl font-display font-bold mb-2 relative z-10">{totalScore.toFixed(1)}<span className="text-3xl text-slate-500">/5.0</span></div>
        <div className={`inline-block px-5 py-2 text-sm font-bold mt-2 ${
          totalScore >= 4.1 ? 'bg-emerald-500/20 text-emerald-300' :
          totalScore >= 3.1 ? 'bg-blue-500/20 text-blue-300' :
          totalScore >= 2.1 ? 'bg-amber-500/20 text-amber-300' :
          'bg-rose-500/20 text-rose-300'
        }`}>{nivel.nivel}</div>
        <p className="text-sm text-slate-400 mt-4 max-w-lg mx-auto leading-relaxed relative z-10">{nivel.descripcion}</p>
      </div>

      {/* Radar */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Perfil por dimensión</h3>
        <RadarChart scores={pilarScores} labels={labels} />
      </div>

      {/* Pilares detail */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Resultado por pilar</h3>
        <div className="space-y-3">
          {PILARES.map((pilar, i) => {
            const Icon = PILAR_ICONS[i];
            const score = pilarScores[i];
            const pilarNivel = getNivelMadurez(score);
            const lowRetros = getLowScoringRetro(i);
            const hasRisk = pilar.riesgo && score < 2.5;
            return (
              <div key={pilar.id}>
                <div className="flex items-center gap-4 p-4 bg-slate-50 hover:bg-slate-100/80 transition-colors">
                  <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0"><Icon className="w-5 h-5" /></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{pilar.nombre}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-200 h-1.5">
                        <div className={`h-1.5 transition-all ${getBarColor(score)}`} style={{ width: `${(score / 5) * 100}%` }} />
                      </div>
                      <span className={`text-xs font-bold px-2 py-0.5 ${getColor(score)}`}>{score.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                {hasRisk && (
                  <div className="mt-1 mx-2 p-3 bg-rose-50 border border-rose-100 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-rose-700 leading-relaxed">{pilar.riesgo}</p>
                  </div>
                )}
                {lowRetros.length > 0 && (
                  <div className="mt-1 mx-2 space-y-1">
                    {lowRetros.map((lr, j) => (
                      <div key={j} className="p-3 bg-amber-50 border border-amber-100">
                        <p className="text-xs text-amber-700 leading-relaxed"><span className="font-bold">Recomendación:</span> {lr.retro}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Fortalezas y brechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-emerald-50 p-6 border border-emerald-100">
          <div className="flex items-center gap-2 mb-4"><TrendingUp className="w-5 h-5 text-emerald-600" /><h3 className="font-bold text-emerald-900">Top fortalezas</h3></div>
          {fortalezas.map(({ score, pilar }, i) => (
            <div key={i} className="flex items-center justify-between py-2"><span className="text-sm text-emerald-800">{pilar.nombre}</span><span className="text-sm font-bold text-emerald-600">{score.toFixed(1)}</span></div>
          ))}
        </div>
        <div className="bg-amber-50 p-6 border border-amber-100">
          <div className="flex items-center gap-2 mb-4"><AlertTriangle className="w-5 h-5 text-amber-600" /><h3 className="font-bold text-amber-900">Brechas prioritarias</h3></div>
          {brechas.map(({ score, pilar }, i) => (
            <div key={i} className="flex items-center justify-between py-2"><span className="text-sm text-amber-800">{pilar.nombre}</span><span className="text-sm font-bold text-amber-600">{score.toFixed(1)}</span></div>
          ))}
        </div>
      </div>

      {/* Lectura de negocio */}
      {(data.retos?.length > 0 || data.resultadoEsperado) && (
        <div className="bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold text-slate-900">Lectura de negocio</h3></div>
          {data.retos?.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Retos principales</p>
              <div className="flex flex-wrap gap-2 mb-3">{data.retos.map((r, i) => <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm">{r}</span>)}</div>
              {retoRetros.length > 0 && retoRetros.map((rr, i) => (
                <div key={i} className="p-3 bg-indigo-50 border border-indigo-100 mb-2">
                  <p className="text-xs text-indigo-600 leading-relaxed"><span className="font-bold">{rr.reto}:</span> {rr.retro}</p>
                </div>
              ))}
            </div>
          )}
          {data.resultadoEsperado && (
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Resultado esperado en 12 meses</p>
              <p className="text-sm text-slate-700 bg-slate-50 p-3">{data.resultadoEsperado}</p>
            </div>
          )}
        </div>
      )}

      {/* Tech context */}
      {(erpRetros.length > 0 || crmRetros.length > 0) && (
        <div className="bg-white border border-slate-200 p-6 space-y-2">
          <div className="flex items-center gap-2 mb-2"><Cpu className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold text-slate-900">Contexto tecnológico</h3></div>
          {[...erpRetros.map(e => ({ label: `ERP: ${e.system}`, text: e.retro })), ...crmRetros.map(c => ({ label: `CRM: ${c.system}`, text: c.retro }))].map((item, i) => (
            <div key={i} className="p-3 bg-slate-50 border border-slate-100">
              <p className="text-xs text-slate-600 leading-relaxed"><span className="font-bold text-slate-700">{item.label}:</span> {item.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Oportunidades */}
      {(data.areasImpacto?.length > 0 || data.soluciones?.length > 0) && (
        <div className="bg-white border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4"><BarChart3 className="w-5 h-5 text-indigo-600" /><h3 className="text-lg font-bold text-slate-900">Mapa de oportunidades</h3></div>
          {data.areasImpacto?.length > 0 && <div className="mb-4"><p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Áreas de impacto</p><div className="flex flex-wrap gap-2">{data.areasImpacto.map((a, i) => <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium">{a}</span>)}</div></div>}
          {data.soluciones?.length > 0 && <div><p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Soluciones de interés</p><div className="flex flex-wrap gap-2">{data.soluciones.map((s, i) => <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-medium">{s}</span>)}</div></div>}
        </div>
      )}

      {/* Roadmap */}
      <div className="bg-white border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-6">Roadmap recomendado</h3>
        <div className="space-y-4">
          {[
            { periodo: '0–2 meses', items: ['Orden y priorización', 'Quick wins', 'Alineación ejecutiva', 'Definición de caso de uso'], bg: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
            { periodo: '2–6 meses', items: ['Piloto en área concreta', 'Medición de impacto', 'Habilitación de datos', 'Adopción interna'], bg: 'bg-blue-50 text-blue-700 border-blue-100' },
            { periodo: '6–12 meses', items: ['Escalamiento', 'Integración', 'Gobierno', 'Modelos avanzados'], bg: 'bg-emerald-50 text-emerald-700 border-emerald-100' }
          ].map(({ periodo, items, bg }, i) => (
            <div key={i} className={`p-4 border ${bg}`}>
              <p className="text-sm font-bold mb-2">{periodo}</p>
              <div className="grid grid-cols-2 gap-1">
                {items.map((item, j) => <span key={j} className="text-xs flex items-center gap-1"><ChevronRight className="w-3 h-3 shrink-0" />{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="bg-white border border-slate-200 p-6 space-y-3">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Recomendaciones finales</h3>
        <div className="flex items-start gap-3 p-3 bg-emerald-50">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
          <div><p className="text-sm font-bold text-emerald-800">Qué hacer primero</p><p className="text-xs text-emerald-700">Enfocarse en {fortalezas[0]?.pilar.nombre} para generar quick wins que validen el valor de la IA.</p></div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-amber-50">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div><p className="text-sm font-bold text-amber-800">Qué no hacer todavía</p><p className="text-xs text-amber-700">No invertir en implementaciones complejas hasta fortalecer {brechas[0]?.pilar.nombre}.</p></div>
        </div>
        <div className="flex items-start gap-3 p-3 bg-rose-50">
          <Shield className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          <div><p className="text-sm font-bold text-rose-800">Qué riesgo evitar</p><p className="text-xs text-rose-700">Implementar IA sin datos de calidad o sin patrocinio directivo.</p></div>
        </div>
      </div>

      {/* Envío */}
      {submitError && (
        <div className="bg-amber-50 border border-amber-200 p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-amber-800">No se pudo guardar tu diagnóstico</p>
            <p className="text-xs text-amber-700">Tu reporte se generó correctamente pero no pudimos enviarlo al servidor.</p>
          </div>
        </div>
      )}

      {/* PDF Preview + Download */}
      {assessmentId && <PdfSection assessmentId={assessmentId} />}

      {/* Cierre */}
      <div className="bg-slate-50 p-8 text-center border border-slate-200">
        <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">CII.IA</p>
        <p className="text-slate-600 mb-2">Gracias por completar tu autodiagnóstico.</p>
        <p className="text-sm text-slate-500 mb-6">¿Tienes preguntas? Contáctanos para una sesión de interpretación de resultados.</p>
        <button onClick={onReset} className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-sm font-bold text-slate-700 hover:bg-white transition-all">
          <RotateCcw className="w-4 h-4" /> Hacer otro diagnóstico
        </button>
      </div>
    </div>
  );
};

// ─── Main Wizard ────────────────────────────────────────────

const AssessmentWizard = () => {
  const [step, setStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [assessmentId, setAssessmentId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '', apellidos: '', empresa: '', puesto: '', email: '',
    sector: '', tamano: '',
    retos: [], areasMejora: [], prioridad: 0, resultadoEsperado: '',
    erp: [], crm: [], tiposIA: [],
    pilarScores: PILARES.map(() => Array(5).fill(0)),
    dondeViveDatos: [],
    areasImpacto: [], soluciones: [], tipoApoyo: '',
    desafios: '', preocupacion: '', recursosNecesarios: '', comentarioExtra: '',
    aceptaDatos: false
  });

  const update = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));
  const updatePilarScore = (pilarIdx, preguntaIdx, value) => {
    setFormData(prev => {
      const newScores = prev.pilarScores.map(arr => [...arr]);
      newScores[pilarIdx][preguntaIdx] = value;
      return { ...prev, pilarScores: newScores };
    });
  };

  const canAdvance = () => {
    if (step === 0) return true;
    if (step === 1) return formData.nombre && formData.empresa && formData.email;
    if (step === 2) return formData.retos.length > 0;
    if (step === 3) return true;
    if (step >= 4 && step <= 9) return formData.pilarScores[step - 4].every(s => s > 0);
    return true;
  };

  const handleFinish = async () => {
    setShowResults(true);
    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const result = await submitAssessment(formData, pilarScoresAvg);
      setAssessmentId(result.id);
    } catch (err) {
      console.error('Error al enviar diagnóstico:', err);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };
  const prev = () => { if (step > 0) setStep(step - 1); };
  const reset = () => {
    setStep(0); setShowResults(false); setAssessmentId(null); setSubmitError(false);
    setFormData({ nombre: '', apellidos: '', empresa: '', puesto: '', email: '', sector: '', tamano: '', retos: [], areasMejora: [], prioridad: 0, resultadoEsperado: '', erp: [], crm: [], tiposIA: [], pilarScores: PILARES.map(() => Array(5).fill(0)), dondeViveDatos: [], areasImpacto: [], soluciones: [], tipoApoyo: '', desafios: '', preocupacion: '', recursosNecesarios: '', comentarioExtra: '', aceptaDatos: false });
  };

  const pilarScoresAvg = formData.pilarScores.map(scores => scores.reduce((a, b) => a + b, 0) / scores.length);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, showResults]);

  if (showResults) {
    return (
      <div className="flex h-full pt-16 lg:pt-0">
        <Sidebar step={TOTAL_STEPS} />
        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 py-12"><Results data={formData} pilarScores={pilarScoresAvg} onReset={reset} assessmentId={assessmentId} submitError={submitError} /></div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200/50">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-3">CII.IA &mdash; Centro de Innovación de Inteligencia Artificial</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Autodiagnóstico de Madurez Tecnológica</h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
              Diseñado para directivos y líderes de negocio. Entiende con claridad real el nivel de preparación de tu organización para adoptar IA.
              <br /><br />
              <strong className="text-slate-700">No es un examen técnico. Es una herramienta de claridad ejecutiva.</strong>
            </p>

            {/* 6 Pilares preview */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto mb-8">
              {PILARES.map((p, i) => {
                const Icon = PILAR_ICONS[i];
                return (
                  <div key={i} className="flex items-center gap-2.5 p-3 bg-white border border-slate-100 text-left">
                    <div className="w-8 h-8 bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0"><Icon className="w-4 h-4" /></div>
                    <span className="text-xs font-bold text-slate-700 leading-tight">{p.nombre}</span>
                  </div>
                );
              })}
            </div>

            <div className="bg-white p-5 max-w-lg mx-auto text-left border border-slate-100">
              <p className="text-sm font-bold text-slate-700 mb-3">Al finalizar obtendrás:</p>
              <ul className="space-y-2">
                {['Nivel de madurez total y por dimensión', 'Fortalezas y brechas identificadas', 'Oportunidades concretas de IA', 'Recomendaciones priorizadas', 'Roadmap de implementación (0–12 meses)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600"><CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-slate-400 mt-6">Tiempo estimado: 10–15 minutos</p>
          </div>
        );

      case 1:
        return (
          <div>
            <StepHeader icon={User} title="Datos generales" subtitle="Cuéntanos sobre ti y tu empresa." stepNum="Sección 1 de 8" />
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Nombre *" placeholder="Tu nombre" value={formData.nombre} onChange={v => update('nombre', v)} required />
                <InputField label="Apellidos" placeholder="Tus apellidos" value={formData.apellidos} onChange={v => update('apellidos', v)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Empresa *" placeholder="Nombre de tu empresa" value={formData.empresa} onChange={v => update('empresa', v)} required />
                <InputField label="Puesto" placeholder="Ej. Director General" value={formData.puesto} onChange={v => update('puesto', v)} />
              </div>
              <InputField label="Correo electrónico *" type="email" placeholder="nombre@empresa.com" value={formData.email} onChange={v => update('email', v)} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectField label="Sector de la empresa" options={SECTORES} placeholder="Selecciona un sector" value={formData.sector} onChange={v => update('sector', v)} />
                <SelectField label="Tamaño de la empresa" options={TAMANOS} placeholder="Número de colaboradores" value={formData.tamano} onChange={v => update('tamano', v)} />
              </div>
              <Hint text={HINTS.sector} />
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <StepHeader icon={Building2} title="Contexto del negocio" subtitle="Entendamos la situación actual de tu empresa." stepNum="Sección 2 de 8" />
            <div className="space-y-8">
              <div>
                <MultiSelect label="¿Cuáles son hoy los principales retos de tu empresa?" options={RETOS} selected={formData.retos} onChange={v => update('retos', v)} max={3} />
                <Hint text={HINTS.retos} />
              </div>
              <div>
                <MultiSelect label="¿Qué áreas tienen hoy mayor necesidad de mejora?" options={AREAS_MEJORA} selected={formData.areasMejora} onChange={v => update('areasMejora', v)} max={3} />
                <Hint text={HINTS.areasMejora} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">¿Qué tan prioritario es implementar IA en los próximos 12 meses?</label>
                <PriorityScale value={formData.prioridad} onChange={v => update('prioridad', v)} />
                <Hint text={HINTS.prioridad} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">¿Qué resultado te gustaría lograr con IA en los próximos 12 meses?</label>
                <textarea value={formData.resultadoEsperado} onChange={e => update('resultadoEsperado', e.target.value)} placeholder="Describe brevemente tu expectativa..." rows={3}
                  className="w-full px-4 py-3 bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 placeholder-slate-400 resize-none hover:border-slate-300" />
                <Hint text={HINTS.resultadoEsperado} />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <StepHeader icon={Cpu} title="Contexto tecnológico" subtitle="¿Qué sistemas y herramientas usa tu empresa hoy?" stepNum="Sección 3 de 8" />
            <div className="space-y-8">
              <div>
                <CheckboxGroup label="¿Cuenta la empresa con alguno de estos ERP?" options={ERP_OPTIONS} selected={formData.erp} onChange={v => update('erp', v)} />
                <Hint text={HINTS.erp} />
              </div>
              <div>
                <CheckboxGroup label="¿Utilizan actualmente un CRM?" options={CRM_OPTIONS} selected={formData.crm} onChange={v => update('crm', v)} />
                <Hint text={HINTS.crm} />
              </div>
              <div>
                <CheckboxGroup label="¿Qué tipos de IA conoces o has escuchado aplicar en negocios?" options={TIPOS_IA} selected={formData.tiposIA} onChange={v => update('tiposIA', v)} />
                <Hint text={HINTS.tiposIA} />
              </div>
            </div>
          </div>
        );

      case 4: case 5: case 6: case 7: case 8: case 9: {
        const pilarIdx = step - 4;
        const pilar = PILARES[pilarIdx];
        const Icon = PILAR_ICONS[pilarIdx];
        const answered = formData.pilarScores[pilarIdx].filter(s => s > 0).length;

        return (
          <div>
            <StepHeader icon={Icon} title={pilar.nombre} subtitle={pilar.descripcion} stepNum={`Pilar ${pilarIdx + 1} de 6`} />

            <PilarMiniNav currentPilar={pilarIdx} scores={formData.pilarScores} />

            {pilarIdx === 1 && (
              <div className="mb-6">
                <CheckboxGroup label="¿Dónde vive hoy la mayor parte de la información de tu empresa?"
                  options={['Sistemas internos (ERP, CRM, software administrativo)', 'Excel o archivos sueltos', 'Google Drive / SharePoint / OneDrive', 'Bases de datos estructuradas', 'Múltiples sistemas sin integración clara', 'Otro']}
                  selected={formData.dondeViveDatos} onChange={v => update('dondeViveDatos', v)} />
              </div>
            )}

            <div className="bg-white p-4 sm:p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Evalúa cada afirmación del 1 al 5</p>
                <span className="text-xs font-bold text-indigo-600">{answered}/5 respondidas</span>
              </div>
              {pilar.preguntas.map((pregunta, i) => (
                <LikertScale key={i} question={pregunta} value={formData.pilarScores[pilarIdx][i]} onChange={v => updatePilarScore(pilarIdx, i, v)} index={i + 1} hint={pilar.retroalimentacion?.[i]} />
              ))}
            </div>
          </div>
        );
      }

      case 10:
        return (
          <div>
            <StepHeader icon={Lightbulb} title="Oportunidades prioritarias" subtitle="Identifica dónde ves más potencial para IA en tu empresa." stepNum="Sección 7 de 8" />
            <div className="space-y-8">
              <div>
                <MultiSelect label="¿En qué áreas ves mayor impacto potencial de IA?" options={AREAS_IMPACTO} selected={formData.areasImpacto} onChange={v => update('areasImpacto', v)} max={3} />
                <Hint text={HINTS.areasImpacto} />
              </div>
              <div>
                <MultiSelect label="¿Qué soluciones te interesan más?" options={SOLUCIONES} selected={formData.soluciones} onChange={v => update('soluciones', v)} max={3} />
                <Hint text={HINTS.soluciones} />
              </div>
              <div>
                <SelectField label="¿Qué tipo de apoyo sería más valioso para tu empresa?" options={TIPOS_APOYO} placeholder="Selecciona una opción" value={formData.tipoApoyo} onChange={v => update('tipoApoyo', v)} />
                <Hint text={HINTS.tipoApoyo} />
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div>
            <StepHeader icon={Briefcase} title="Preguntas abiertas" subtitle="Opcionales pero muy valiosas para personalizar tu reporte." stepNum="Sección 8 de 8" />
            <div className="space-y-5">
              {[
                { label: '¿Cuáles son los principales desafíos que frenan la adopción de IA?', field: 'desafios' },
                { label: '¿Qué te preocupa más al pensar en implementar IA?', field: 'preocupacion' },
                { label: '¿Qué recursos necesitaría tu empresa para avanzar?', field: 'recursosNecesarios' },
                { label: '¿Algo más que quieras compartir?', field: 'comentarioExtra' }
              ].map(({ label, field }, i) => (
                <div key={i}>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{label}</label>
                  <textarea value={formData[field]} onChange={e => update(field, e.target.value)} rows={2} placeholder="Escribe tu respuesta..."
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-900 placeholder-slate-400 resize-none hover:border-slate-300" />
                  <Hint text={HINTS[field]} />
                </div>
              ))}
              <label className="flex items-start gap-3 cursor-pointer p-4 bg-white border border-slate-200 hover:bg-slate-50 transition-colors">
                <input type="checkbox" checked={formData.aceptaDatos} onChange={e => update('aceptaDatos', e.target.checked)} className="mt-0.5 w-5 h-5 border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                <span className="text-sm text-slate-600">Acepto el uso de mis datos para recibir mi resultado, recomendaciones y seguimiento.</span>
              </label>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex h-full pt-16 lg:pt-0">
      {/* Left sidebar with animated logo */}
      <Sidebar step={step} />

      {/* Right: scrollable content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar with step indicator */}
        <div className="shrink-0 bg-white border-b border-slate-200 px-4 md:px-8 py-4">
          <div className="flex items-center gap-3 lg:hidden mb-3">
            <a href="/" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Volver al sitio
            </a>
            <span className="text-slate-300">|</span>
            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">CII.IA</span>
          </div>
          <StepIndicator step={step} />
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto" ref={scrollRef}>
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Fixed bottom navigation */}
        <div className="shrink-0 bg-white border-t border-slate-200 px-4 md:px-8 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between">
            <button onClick={prev} disabled={step === 0}
              className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all ${step === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-slate-100'}`}>
              <ArrowLeft className="w-4 h-4" /> Anterior
            </button>
            <button onClick={next} disabled={!canAdvance()}
              className={`inline-flex items-center gap-2 px-7 py-3 text-sm font-bold transition-all ${
                canAdvance() ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200/50' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}>
              {step === TOTAL_STEPS - 1 ? 'Ver resultados' : 'Siguiente'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentWizard;
