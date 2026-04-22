import React, { useRef } from 'react';
import { TrendingUp, Globe, Zap } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useGSAPAnimations';

const benefits = [
  { icon: TrendingUp, color: 'blue', title: 'Oportunidades Reales', desc: 'Acceso a licitaciones y proyectos privados exclusivos para miembros.' },
  { icon: Globe, color: 'purple', title: 'Visibilidad Global', desc: 'Tu empresa en el mapa de inversionistas de Texas y Latam.' },
  { icon: Zap, color: 'emerald', title: 'Ahorro Operativo', desc: 'Uso de oficinas de softlanding en el PIIT sin costo extra.' }
];

const Benefits = () => {
  const gridRef = useRef(null);
  useScrollReveal(gridRef, '.reveal-item', { y: 50, stagger: 0.12, scale: 0.95, duration: 0.7 });

  return (
    <section className="px-6 py-16 bg-white relative z-10 -mt-8 md:bg-transparent md:py-0 md:-mt-16">
        <div ref={gridRef} className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {benefits.map((item, idx) => (
                <div key={idx} className="reveal-item bg-white p-8 border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-indigo-100 hover:-translate-y-1 transition-all group h-full">
                    <div className={`w-14 h-14 bg-${item.color}-50 flex items-center justify-center mb-6 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
            ))}
        </div>
    </section>
  );
};

export default Benefits;
