import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Zap } from 'lucide-react';

const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="h-full"
  >
    {children}
  </motion.div>
);

const Benefits = () => {
  return (
    <section className="px-6 py-16 bg-white relative z-10 -mt-8 rounded-t-[2.5rem] md:rounded-none md:bg-transparent md:py-0 md:-mt-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {[
                { icon: TrendingUp, color: 'blue', title: 'Oportunidades Reales', desc: 'Acceso a licitaciones y proyectos privados exclusivos para miembros.' },
                { icon: Globe, color: 'purple', title: 'Visibilidad Global', desc: 'Tu empresa en el mapa de inversionistas de Texas y Latam.' },
                { icon: Zap, color: 'emerald', title: 'Ahorro Operativo', desc: 'Uso de oficinas de softlanding en el PIIT sin costo extra.' }
            ].map((item, idx) => (
                <FadeIn key={idx} delay={0.1 * (idx + 1)}>
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:border-indigo-100 transition-all group h-full">
                        <div className={`w-14 h-14 bg-${item.color}-50 rounded-2xl flex items-center justify-center mb-6 text-${item.color}-600 group-hover:scale-110 transition-transform`}>
                            <item.icon className="h-7 w-7" />
                        </div>
                        <h3 className="font-bold text-slate-900 text-xl mb-3">{item.title}</h3>
                        <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                </FadeIn>
            ))}
        </div>
    </section>
  );
};

export default Benefits;