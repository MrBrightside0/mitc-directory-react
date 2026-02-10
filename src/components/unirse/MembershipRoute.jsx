import React from 'react';

const MembershipRoute = () => {
  return (
    <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tu Ruta de Ingreso</h2>
            <p className="text-indigo-200/80 mb-16 max-w-2xl mx-auto text-lg">
                Hemos simplificado el proceso para que puedas empezar a operar y hacer networking en tiempo récord.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 relative">
                {/* Línea conectora (Desktop Horizontal) */}
                <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-indigo-900/50 -z-10"></div>
                
                {/* Línea conectora (Móvil Vertical) */}
                <div className="md:hidden absolute top-8 bottom-8 left-1/2 w-0.5 bg-indigo-900/50 -translate-x-1/2 -z-10"></div>
                
                {[
                    { step: 1, title: 'Solicitud', desc: 'Llena el formulario.' },
                    { step: 2, title: 'Validación', desc: 'Revisamos tu perfil.' },
                    { step: 3, title: 'Convenio', desc: 'Firma y pago anual.' },
                    { step: 4, title: 'Onboarding', desc: 'Acceso inmediato.' }
                ].map((item) => (
                    <div key={item.step} className="flex flex-col items-center group relative bg-slate-900 py-2">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-indigo-900/50 group-hover:-translate-y-2 transition-transform ring-4 ring-indigo-950 relative z-10 text-white">
                            {item.step}
                        </div>
                        <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                        <p className="text-sm text-indigo-200/70 px-4">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default MembershipRoute;