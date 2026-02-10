import React from 'react';
import { Helmet } from 'react-helmet';

// Importación de Componentes Modulares
import Hero from '../components/home/Hero';
import ServicesMap from '../components/home/ServicesMap';
import BusinessConnect from '../components/home/BusinessConnect';
import MembershipSteps from '../components/home/MembershipSteps';
import Testimonials from '../components/home/Testimonials';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

const Inicio = () => {

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Monterrey IT Cluster (MITC)",
    "url": "https://monterreyitcluster.com",
    "logo": "https://monterreyitcluster.com/logo.png",
    "description": "Contamos con más de 35 empresas de tecnologías. Implementa IA en 4-8 semanas y expande tu negocio con oficinas en NL-Texas.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alianza Sur #303, PIIT",
      "addressLocality": "Apodaca",
      "addressRegion": "Nuevo León",
      "addressCountry": "MX"
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white font-sans overflow-x-hidden">
      
      <Helmet>
        <title>MITC | Automatiza tu empresa con IA y Tecnología</title>
        <meta name="description" content="Implementa inteligencia artificial en 4 a 8 semanas. Softlanding en Monterrey y red de 13 clusters nacionales." />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* 1. Hero */}
      <Hero />

      {/* 2. Servicios */}
      <ServicesMap />

      {/* 3. Business Connect & Stats */}
      <BusinessConnect />

      {/* 4. Proceso */}
      <MembershipSteps />

      {/* 5. Testimonios */}
      <Testimonials />

      {/* 6. FAQ */}
      <FAQ />

      {/* 7. CTA Final */}
      <CTA />

    </div>
  );
};

export default Inicio;