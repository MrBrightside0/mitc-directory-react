import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { step: 1, title: 'Solicitud', desc: 'Llena el formulario.' },
  { step: 2, title: 'Validación', desc: 'Revisamos tu perfil.' },
  { step: 3, title: 'Convenio', desc: 'Firma y pago anual.' },
  { step: 4, title: 'Onboarding', desc: 'Acceso inmediato.' },
];

const MembershipRoute = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    // Heading
    gsap.fromTo('.route-heading',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', toggleActions: 'play none none none' },
      }
    );

    // Connecting line draws across
    if (lineRef.current) {
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power2.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        }
      );
    }

    // Step numbers pop in with bounce
    gsap.fromTo('.route-number',
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(2)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

    // Step cards stagger up
    gsap.fromTo('.route-card',
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      }
    );

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
            <div className="route-heading">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Tu Ruta de Ingreso</h2>
              <p className="text-indigo-200/80 mb-16 max-w-2xl mx-auto text-lg">
                  Hemos simplificado el proceso para que puedas empezar a operar y hacer networking en tiempo récord.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10 relative">
                {/* Animated connecting line (Desktop) */}
                <div ref={lineRef} className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600/50 via-cyan-500/50 to-indigo-600/50 -z-10 origin-left"></div>

                {/* Connecting line (Mobile) */}
                <div className="md:hidden absolute top-8 bottom-8 left-1/2 w-0.5 bg-indigo-900/50 -translate-x-1/2 -z-10"></div>

                {steps.map((item) => (
                    <div key={item.step} className="route-card flex flex-col items-center group relative bg-slate-900 py-2">
                        <div className="route-number w-16 h-16 bg-indigo-600 flex items-center justify-center font-bold text-2xl mb-6 shadow-lg shadow-indigo-900/50 group-hover:-translate-y-2 transition-transform ring-4 ring-indigo-950 relative z-10 text-white">
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
