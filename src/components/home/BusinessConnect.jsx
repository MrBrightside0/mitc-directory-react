import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const FadeIn = ({ children, delay = 0, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const BusinessConnect = () => {
  return (
    <section className="py-24 px-6 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <FadeIn>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
                        MITC Business Connect
                    </h2>
                    <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                        MITC Business Connect es una membresía del Monterrey IT Cluster, una comunidad que impulsa a emprendimientos del ecosistema industrial y tecnológico a través de:
                    </p>
                    <ul className="space-y-4 mb-8">
                        <li className="flex items-center gap-3 font-bold text-slate-800">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Vinculación estratégica
                        </li>
                        <li className="flex items-center gap-3 font-bold text-slate-800">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Acceso a Real Tech
                        </li>
                        <li className="flex items-center gap-3 font-bold text-slate-800">
                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Instalaciones para fomentar la innovación
                        </li>
                    </ul>
                    <p className="text-slate-600 italic border-l-4 border-indigo-600 pl-4 mb-8">
                        "Imagínate ser acompañado por nosotros y estar ligado a mas de 350 empresas."
                    </p>

                    <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
                        <p className="font-serif text-lg italic opacity-90 mb-4">"La mejor manera de predecir el futuro es inventándolo"</p>
                        <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">— Alan Kay</p>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    {/* STATS GRID */}
                    <div className="grid grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden mb-8">
                        <div className="bg-slate-50 p-8 text-center">
                            <span className="block text-4xl font-bold text-indigo-600 mb-1">12+</span>
                            <span className="text-xs font-bold uppercase text-slate-500">Años de Experiencia</span>
                        </div>
                        <div className="bg-slate-50 p-8 text-center">
                            <span className="block text-4xl font-bold text-indigo-600 mb-1">90+</span>
                            <span className="text-xs font-bold uppercase text-slate-500">Participación en medios</span>
                        </div>
                        <div className="bg-slate-50 p-8 text-center">
                            <span className="block text-4xl font-bold text-indigo-600 mb-1">170+</span>
                            <span className="text-xs font-bold uppercase text-slate-500">Oportunidades Abiertas</span>
                        </div>
                        <div className="bg-slate-50 p-8 text-center">
                            <span className="block text-4xl font-bold text-indigo-600 mb-1">40+</span>
                            <span className="text-xs font-bold uppercase text-slate-500">Empresas Consorcio</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-bold text-slate-900 text-lg">La membresía que tu empresa tiene que tener:</h4>
                        <div className="flex gap-4 items-start">
                            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Información privilegiada</strong>
                                <span className="text-sm text-slate-500">Entérate antes del sector tech e industrial.</span>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Networking de verdad</strong>
                                <span className="text-sm text-slate-500">Te conectamos con empresarios.</span>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                            <div>
                                <strong className="block text-slate-900">Usa nuestras Salas</strong>
                                <span className="text-sm text-slate-500">Sala de Capacitación, salas de juntas, agendas y listo.</span>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    </section>
  );
};

export default BusinessConnect;