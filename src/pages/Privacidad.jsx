import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ShieldCheck, Mail, MapPin, ArrowLeft } from 'lucide-react';

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-28 mb-12">
    <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 mb-4">{title}</h2>
    <div className="space-y-4 text-slate-600 leading-relaxed text-[15px]">
      {children}
    </div>
  </section>
);

const Privacidad = () => {
  const lastUpdated = '30 de abril de 2026';

  return (
    <div className="flex-1 bg-white pt-24 md:pt-28 pb-20">
      <Helmet>
        <title>Aviso de Privacidad | Monterrey IT Cluster</title>
        <meta
          name="description"
          content="Aviso de Privacidad del Monterrey IT Cluster. Conoce cómo recabamos, usamos y protegemos tus datos personales conforme a la LFPDPPP."
        />
        <link rel="canonical" href="https://monterreyitcluster.com/privacidad" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-6">
        {/* Encabezado */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al inicio
          </Link>

          <div className="flex items-start gap-4 mb-4">
            <div className="h-12 w-12 shrink-0 flex items-center justify-center bg-gradient-to-br from-indigo-600 to-blue-500 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-indigo-600 mb-1">
                Marco legal · LFPDPPP
              </p>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight">
                Aviso de Privacidad
              </h1>
            </div>
          </div>
          <p className="text-sm text-slate-400">Última actualización: {lastUpdated}</p>
        </div>

        {/* Introducción */}
        <p className="text-slate-600 leading-relaxed text-[15px] mb-12">
          En cumplimiento de la <strong className="text-slate-800">Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> (LFPDPPP),
          su Reglamento y los Lineamientos del Aviso de Privacidad, ponemos a su disposición el presente Aviso de Privacidad
          Integral del <strong className="text-slate-800">Monterrey IT Cluster</strong>.
        </p>

        {/* Índice */}
        <nav className="border border-slate-200 bg-slate-50/60 p-6 mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-slate-500 mb-3">Contenido</p>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-slate-700">
            <li><a href="#responsable" className="hover:text-indigo-600">1. Responsable</a></li>
            <li><a href="#datos" className="hover:text-indigo-600">2. Datos que recabamos</a></li>
            <li><a href="#finalidades" className="hover:text-indigo-600">3. Finalidades del tratamiento</a></li>
            <li><a href="#transferencias" className="hover:text-indigo-600">4. Transferencias</a></li>
            <li><a href="#arco" className="hover:text-indigo-600">5. Derechos ARCO</a></li>
            <li><a href="#cookies" className="hover:text-indigo-600">6. Cookies y tecnologías</a></li>
            <li><a href="#seguridad" className="hover:text-indigo-600">7. Seguridad de la información</a></li>
            <li><a href="#cambios" className="hover:text-indigo-600">8. Cambios al aviso</a></li>
            <li><a href="#contacto" className="hover:text-indigo-600">9. Contacto</a></li>
          </ol>
        </nav>

        <Section id="responsable" title="1. Identidad y domicilio del responsable">
          <p>
            El <strong className="text-slate-800">Monterrey IT Cluster</strong> (en adelante, "MITC"), con domicilio en
            Alianza Sur #303, Parque de Investigación e Innovación Tecnológica (PIIT), Autopista al Aeropuerto Km 10,
            Apodaca, Nuevo León, México, es el responsable del tratamiento de los datos personales que usted nos proporcione
            a través del sitio <span className="font-medium">monterreyitcluster.com</span> y de cualquier formulario, correo
            electrónico o canal de contacto institucional.
          </p>
        </Section>

        <Section id="datos" title="2. Datos personales que recabamos">
          <p>Para las finalidades señaladas en este aviso, podemos recabar las siguientes categorías de datos:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-slate-800">Identificación:</strong> nombre, puesto, empresa u organización a la que representa.</li>
            <li><strong className="text-slate-800">Contacto:</strong> correo electrónico, teléfono y datos de la empresa.</li>
            <li><strong className="text-slate-800">Información empresarial:</strong> giro, tamaño, sector, áreas de interés y datos del autodiagnóstico de madurez digital.</li>
            <li><strong className="text-slate-800">Datos de navegación:</strong> dirección IP, tipo de dispositivo, navegador y páginas visitadas, recabados mediante cookies y herramientas analíticas.</li>
          </ul>
          <p>
            <strong className="text-slate-800">No recabamos datos personales sensibles</strong> ni datos financieros a través
            de este sitio web.
          </p>
        </Section>

        <Section id="finalidades" title="3. Finalidades del tratamiento">
          <p><strong className="text-slate-800">Finalidades primarias</strong> (necesarias para la relación con MITC):</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Atender solicitudes de afiliación y membresía al Cluster.</li>
            <li>Proporcionar información sobre proyectos, capacitaciones y vinculación empresarial.</li>
            <li>Procesar y entregar resultados del autodiagnóstico de madurez digital.</li>
            <li>Mantener un directorio de empresas asociadas y su perfil público.</li>
            <li>Atender consultas, dudas o comentarios recibidos.</li>
          </ul>
          <p className="pt-2"><strong className="text-slate-800">Finalidades secundarias</strong> (no necesarias, requieren su consentimiento):</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Envío de boletines, eventos y comunicaciones del ecosistema tecnológico.</li>
            <li>Estudios estadísticos y de mejora del ecosistema regional.</li>
          </ul>
          <p>
            Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a{' '}
            <a href="mailto:info@monterreyitcluster.com" className="text-indigo-600 hover:underline">
              info@monterreyitcluster.com
            </a>{' '}
            con el asunto "Limitación de uso".
          </p>
        </Section>

        <Section id="transferencias" title="4. Transferencias de datos">
          <p>
            MITC <strong className="text-slate-800">no transfiere sus datos personales a terceros sin su consentimiento</strong>,
            salvo en los casos previstos por el artículo 37 de la LFPDPPP (cumplimiento de obligaciones legales, autoridades
            competentes, sociedades del mismo grupo con políticas equivalentes).
          </p>
          <p>
            Cuando una transferencia requiera consentimiento, lo solicitaremos de forma expresa y específica antes de realizarla.
          </p>
        </Section>

        <Section id="arco" title="5. Derechos ARCO y revocación del consentimiento">
          <p>
            Usted tiene derecho a <strong className="text-slate-800">Acceder</strong>, <strong className="text-slate-800">Rectificar</strong>,{' '}
            <strong className="text-slate-800">Cancelar</strong> u <strong className="text-slate-800">Oponerse</strong> al tratamiento
            de sus datos personales (Derechos ARCO), así como a revocar su consentimiento.
          </p>
          <p>
            Para ejercerlos, envíe una solicitud a{' '}
            <a href="mailto:info@monterreyitcluster.com" className="text-indigo-600 hover:underline">
              info@monterreyitcluster.com
            </a>{' '}
            indicando: (i) nombre y medio de contacto, (ii) documento que acredite su identidad o representación,
            (iii) descripción clara de los datos y derecho a ejercer, y (iv) cualquier elemento que facilite la atención.
          </p>
          <p>
            Le daremos respuesta en un plazo máximo de <strong className="text-slate-800">20 días hábiles</strong>, conforme al artículo 32 de la LFPDPPP.
          </p>
        </Section>

        <Section id="cookies" title="6. Uso de cookies y tecnologías de rastreo">
          <p>
            Este sitio utiliza cookies propias y de terceros (Google Analytics) para analizar el uso del portal y mejorar la
            experiencia. Puede deshabilitar las cookies desde la configuración de su navegador; algunas funciones podrían dejar
            de operar correctamente.
          </p>
          <p>
            Los datos recabados por estas tecnologías se utilizan únicamente con fines estadísticos y de mejora del servicio.
          </p>
        </Section>

        <Section id="seguridad" title="7. Medidas de seguridad">
          <p>
            MITC implementa medidas administrativas, técnicas y físicas razonables para proteger sus datos personales contra
            daño, pérdida, alteración, destrucción o uso no autorizado, conforme a los principios de la LFPDPPP.
          </p>
        </Section>

        <Section id="cambios" title="8. Cambios al aviso de privacidad">
          <p>
            Cualquier modificación al presente aviso se publicará en esta misma página, indicando la fecha de la última
            actualización. Le recomendamos revisarlo periódicamente.
          </p>
        </Section>

        <Section id="contacto" title="9. Contacto del responsable de datos personales">
          <div className="border border-slate-200 p-6 bg-slate-50/60 not-prose">
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 shrink-0 mt-0.5 text-indigo-600" />
                <a href="mailto:info@monterreyitcluster.com" className="hover:text-indigo-600 font-medium">
                  info@monterreyitcluster.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-indigo-600" />
                <span>
                  Alianza Sur #303, PIIT,<br />
                  Autopista al Aeropuerto Km 10, Apodaca, NL.
                </span>
              </li>
            </ul>
          </div>
        </Section>

        <div className="mt-16 pt-8 border-t border-slate-200 text-xs text-slate-400 text-center">
          Aviso elaborado conforme a la LFPDPPP y su Reglamento. Vigente desde el {lastUpdated}.
        </div>
      </div>
    </div>
  );
};

export default Privacidad;
