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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://monterreyitcluster.com/#localbusiness",
    "name": "Monterrey IT Cluster",
    "alternateName": "MITC",
    "url": "https://monterreyitcluster.com",
    "logo": "https://monterreyitcluster.com/logo.svg",
    "image": "https://monterreyitcluster.com/og-image.jpg",
    "email": "info@monterreyitcluster.com",
    "description": "Cluster de tecnología con más de 35 empresas de IT, software e inteligencia artificial en Nuevo León. Implementa IA en 4-8 semanas.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Alianza Sur #303, PIIT",
      "addressLocality": "Apodaca",
      "addressRegion": "Nuevo León",
      "postalCode": "66629",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.779333,
      "longitude": -100.227444
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }],
    "areaServed": [
      { "@type": "State", "name": "Nuevo León" },
      { "@type": "Country", "name": "México" }
    ],
    "sameAs": [
      "https://www.facebook.com/MTYITC",
      "https://www.instagram.com/monterreyitcluster",
      "https://www.linkedin.com/company/monterrey-it-cluster"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://monterreyitcluster.com/" }
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-white font-sans overflow-x-hidden">

      <Helmet>
        <html lang="es-MX" />
        <title>MITC | Automatiza tu empresa con IA y Tecnología en Monterrey</title>
        <meta name="description" content="Monterrey IT Cluster: red de más de 35 empresas de tecnología en Nuevo León. Implementa inteligencia artificial en 4 a 8 semanas. Oficinas en PIIT Apodaca." />
        <link rel="canonical" href="https://monterreyitcluster.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="MITC | Automatiza tu empresa con IA y Tecnología" />
        <meta property="og:description" content="Más de 35 empresas de tecnología en Nuevo León. Implementa IA en 4-8 semanas." />
        <meta property="og:url" content="https://monterreyitcluster.com/" />
        <meta property="og:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MITC | Automatiza tu empresa con IA y Tecnología" />
        <meta name="twitter:description" content="Más de 35 empresas de tecnología en Nuevo León. Implementa IA en 4-8 semanas." />
        <meta name="twitter:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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