import React from 'react';
import { Helmet } from 'react-helmet';

// Importación de Componentes Modulares
import Hero from '../components/unirse/Hero';
import Benefits from '../components/unirse/Benefits';
import EcosystemPreview from '../components/unirse/EcosystemPreview';
import MembershipRoute from '../components/unirse/MembershipRoute';
import ActionForm from '../components/unirse/ActionForm';

const Unirse = () => {

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Membresía MITC Business Connect",
    "description": "Afiliación empresarial al Cluster de Tecnología de Nuevo León.",
    "brand": { "@type": "Organization", "name": "Monterrey IT Cluster" },
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "areaServed": "Nuevo León, Mexico" }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans overflow-x-hidden pt-20 lg:pt-0">
      
      <Helmet>
        <title>Únete al Cluster | Membresía MITC Business Connect</title>
        <meta name="description" content="Solicita tu afiliación al Monterrey IT Cluster. Accede a proyectos de IA, oficinas en PIIT Apodaca y red de negocios exclusiva." />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* 1. Hero Comercial */}
      <Hero />

      {/* 2. Beneficios Clave */}
      <Benefits />

      {/* 3. Mapa del Mercado (Solo Desktop) */}
      <EcosystemPreview />

      {/* 4. Ruta de Afiliación (Línea de tiempo) */}
      <MembershipRoute />

      {/* 5. Formulario de Acción */}
      <ActionForm />

    </div>
  );
};

export default Unirse;