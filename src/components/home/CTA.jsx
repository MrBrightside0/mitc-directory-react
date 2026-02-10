import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight">
                ¿Listo para dejar de improvisar?
            </h2>
            <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                Invierte en el <strong>PRESENTE</strong> de tu empresa. Beneficios tangibles desde el arranque.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/unirse" className="px-10 py-4 bg-white text-slate-900 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2">
                    Obtén tu Membresía <ArrowRight className="h-5 w-5" />
                </Link>
            </div>
        </div>
    </section>
  );
};

export default CTA;