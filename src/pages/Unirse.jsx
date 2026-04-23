import React from 'react';
import { Helmet } from 'react-helmet';

// Importación de Componentes Modulares
import Hero from '../components/unirse/Hero';
import Benefits from '../components/unirse/Benefits';
import EcosystemPreview from '../components/unirse/EcosystemPreview';
import MembershipRoute from '../components/unirse/MembershipRoute';
import ActionForm from '../components/unirse/ActionForm';

const Unirse = () => {

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Membresía empresarial",
    "name": "Membresía MITC Business Connect",
    "description": "Afiliación empresarial al Monterrey IT Cluster. Acceso a red de negocios, proyectos de IA, talento certificado e infraestructura en PIIT Apodaca.",
    "provider": { "@id": "https://monterreyitcluster.com/#organization" },
    "areaServed": { "@type": "State", "name": "Nuevo León" },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "areaServed": "Nuevo León, México",
      "url": "https://monterreyitcluster.com/unirse"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://monterreyitcluster.com/" },
      { "@type": "ListItem", "position": 2, "name": "Unirse", "item": "https://monterreyitcluster.com/unirse" }
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans overflow-x-hidden pt-20 lg:pt-0">

      <Helmet>
        <title>Únete al Cluster | Membresía MITC Business Connect Monterrey</title>
        <meta name="description" content="Solicita tu afiliación al Monterrey IT Cluster. Accede a proyectos de IA, oficinas en PIIT Apodaca, talento certificado y red de negocios en Nuevo León." />
        <link rel="canonical" href="https://monterreyitcluster.com/unirse" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Únete al Monterrey IT Cluster" />
        <meta property="og:description" content="Proyectos de IA, oficinas en PIIT Apodaca y red de negocios en Nuevo León. Convocatoria abierta." />
        <meta property="og:url" content="https://monterreyitcluster.com/unirse" />
        <meta property="og:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Únete al Monterrey IT Cluster" />
        <meta name="twitter:description" content="Proyectos de IA, oficinas en PIIT Apodaca y red de negocios en Nuevo León." />
        <meta name="twitter:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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