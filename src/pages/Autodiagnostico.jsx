import React from 'react';
import { Helmet } from 'react-helmet';
import AssessmentWizard from '../components/autodiagnostico/AssessmentWizard';

const Autodiagnostico = () => {
  const quizSchema = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Autodiagnóstico de Madurez Tecnológica para Implementación de IA",
    "description": "Evalúa el nivel de preparación de tu empresa para implementar inteligencia artificial de forma rentable, responsable y escalable.",
    "provider": { "@type": "Organization", "name": "CII.IA - Centro Industrial de Innovación en Inteligencia Artificial" },
    "inLanguage": "es-MX",
    "educationalLevel": "Professional"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://monterreyitcluster.com/" },
      { "@type": "ListItem", "position": 2, "name": "Autodiagnóstico", "item": "https://monterreyitcluster.com/autodiagnostico" }
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans overflow-hidden h-[calc(100vh-68px)] mt-[68px]">
      <Helmet>
        <title>Autodiagnóstico de Madurez IA Empresarial | CII.IA - Monterrey IT Cluster</title>
        <meta name="description" content="Evalúa qué tan preparada está tu empresa para implementar inteligencia artificial. Reporte ejecutivo personalizado con nivel de madurez, fortalezas, brechas y roadmap." />
        <link rel="canonical" href="https://monterreyitcluster.com/autodiagnostico" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Autodiagnóstico de Madurez IA" />
        <meta property="og:description" content="Evalúa la preparación de tu empresa para implementar IA. Reporte ejecutivo con roadmap." />
        <meta property="og:url" content="https://monterreyitcluster.com/autodiagnostico" />
        <meta property="og:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Autodiagnóstico de Madurez IA" />
        <meta name="twitter:description" content="Evalúa la preparación de tu empresa para implementar IA." />
        <meta name="twitter:image" content="https://monterreyitcluster.com/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify(quizSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <AssessmentWizard />
    </div>
  );
};

export default Autodiagnostico;
