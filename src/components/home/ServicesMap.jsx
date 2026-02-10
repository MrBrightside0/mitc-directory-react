import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Database, Code, BarChart3, Briefcase, Server } from 'lucide-react';

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

const ServicesMap = () => {
  return (
    <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs">Mapa del Mercado</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mt-2 mb-4">
                Servicios del Cluster
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <FadeIn className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <Lightbulb className="h-10 w-10 text-indigo-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Innovación Tecnología e Investigación</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Se crea un nuevo producto, servicio, proceso o modelo de negocio, o bien mejora significativamente las características de uno ya existente, utilizando como vehículo las herramientas tecnológicas.
                </p>
            </FadeIn>

            <FadeIn delay={0.1} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <Database className="h-10 w-10 text-emerald-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Almacenamiento</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    El concepto de servicios de datos se refiere a varias categorías de software que facilitan el acceso a los datos, su gestión y su análisis. Son parte fundamental de las estrategias de nube híbrida.
                </p>
            </FadeIn>

            <FadeIn delay={0.2} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <Code className="h-10 w-10 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Desarrollo de Software</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Conjunto de actividades informáticas dedicadas al proceso de creación, diseño, despliegue y compatibilidad de software.
                </p>
            </FadeIn>

            <FadeIn delay={0.3} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <BarChart3 className="h-10 w-10 text-amber-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Inteligencia de Negocios</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Combina análisis de negocios, minería de datos, visualización e infraestructura para ayudar a las organizaciones a tomar decisiones más basadas en los datos.
                </p>
            </FadeIn>

            <FadeIn delay={0.4} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <Briefcase className="h-10 w-10 text-purple-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Consultoría en TI</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Brinda asesorías y servicios relacionados con las Tecnologías de la Información. Empresas especializadas que brindan soluciones para integrar o mejorar procesos tecnológicos.
                </p>
            </FadeIn>

            <FadeIn delay={0.5} className="bg-white p-8 rounded-2xl border border-slate-200 hover:shadow-lg transition-all">
                <Server className="h-10 w-10 text-slate-600 mb-6" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">Data Centers</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Las empresas se ven en la necesidad de contar con un Data Center propio, ya que sus procesos requieren mayor gestión TI y una infraestructura física que lo soporte adecuadamente.
                </p>
            </FadeIn>

          </div>
        </div>
    </section>
  );
};

export default ServicesMap;