import React from 'react';
import { Plus } from 'lucide-react';

const FAQ = () => {
  return (
    <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Preguntas Frecuentes</h2>
                <p className="text-slate-600">MITC no es una consultora aislada. Es un cluster.</p>
            </div>

            <div className="space-y-4">
            {[
                { q: "¿Qué es MITC?", a: "Es un cluster con +35 empresas y aliados que integran IA, consultoría, espacios y networking en un solo lugar." },
                { q: "¿Cuánto tarda un proyecto de IA?", a: "Depende del alcance, pero nuestros pilotos están diseñados para mostrar resultados en 4 a 8 semanas." },
                { q: "¿Qué incluye Softlanding?", a: "Oficina física en el PIIT, asesoría legal, fiscal y conexión directa con el ecosistema local." },
                { q: "¿Cómo sé si estoy listo para IA?", a: "Si tienes procesos repetitivos y datos históricos, estás listo. Nosotros te ayudamos con el diagnóstico." },
                { q: "¿Qué es transformación digital en MITC?", a: "Es la integración de tecnología digital en todas las áreas de una empresa, cambiando fundamentalmente la forma en que opera y brinda valor." },
                { q: "¿Cómo aplica la industria 4.0 en mi negocio?", a: "Integra tecnologías inteligentes en la manufactura y procesos industriales." },
                { q: "¿Qué beneficios trae la automatización?", a: "Reducción de costos operativos y escalabilidad." },
                { q: "¿MITC ofrece consultoría personalizada?", a: "Sí, a través de nuestros socios estratégicos ofrecemos soluciones a medida." },
            ].map((item, idx) => (
                <details key={idx} className="group bg-white border border-slate-300 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden transition-all duration-300 shadow-sm open:shadow-md">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-slate-900 font-bold hover:bg-slate-50 transition-colors select-none text-base">
                    {item.q}
                    <div className="shrink-0 transition duration-300 group-open:rotate-45">
                        <Plus className="h-6 w-6 text-slate-500 group-open:text-indigo-600" />
                    </div>
                </summary>
                <div className="px-6 pb-6 pt-0">
                    <p className="text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-4 font-medium">
                    {item.a}
                    </p>
                </div>
                </details>
            ))}
            </div>
        </div>
    </section>
  );
};

export default FAQ;