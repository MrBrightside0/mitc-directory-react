import React from 'react';
import { motion } from 'framer-motion';

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

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-center text-slate-900 mb-16">
                Ellos confían en nosotros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {
                        name: "Michael R.",
                        text: "Trato directo y sin vueltas. Tener la oficina en el PIIT, a 5 minutos del aeropuerto, facilitó todo nuestro arranque operativo en México.",
                        img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
                    },
                    {
                        name: "Sarah M.",
                        text: "Gracias a la membresía conectamos con proveedores validados en semanas. Es la forma más segura y rápida de entrar al ecosistema regio.",
                        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                    },
                    {
                        name: "Ing. Roberto M.",
                        text: "Expertos reales en IA, no improvisados. Nos ayudaron a implementar tecnología en planta con total seguridad y estructura. Muy recomendados.",
                        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
                    }
                ].map((review, idx) => (
                    <FadeIn key={idx} delay={idx * 0.1} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex gap-1 mb-4 text-amber-500">★★★★★</div>
                        <p className="text-slate-800 italic mb-6 text-sm leading-relaxed font-medium">"{review.text}"</p>
                        <div className="flex items-center gap-4 border-t border-slate-200 pt-4">
                            <img src={review.img} alt={review.name} className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm" />
                            <div>
                                <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Testimonials;