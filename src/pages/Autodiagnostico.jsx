import React from 'react';
import { Helmet } from 'react-helmet';
import AssessmentWizard from '../components/autodiagnostico/AssessmentWizard';

const Autodiagnostico = () => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Quiz",
    "name": "Autodiagnóstico de Madurez Tecnológica para Implementación de IA",
    "description": "Evalúa el nivel de preparación de tu empresa para implementar inteligencia artificial de forma rentable, responsable y escalable.",
    "provider": { "@type": "Organization", "name": "CII.IA - Centro de Innovación de Inteligencia Artificial" }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 font-sans overflow-hidden h-[calc(100vh-68px)] mt-[68px]">
      <Helmet>
        <title>Autodiagnóstico de Madurez IA | CII.IA</title>
        <meta name="description" content="Evalúa qué tan preparada está tu empresa para implementar inteligencia artificial. Recibe un reporte ejecutivo personalizado con nivel de madurez, fortalezas, brechas y roadmap." />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      <AssessmentWizard />
    </div>
  );
};

export default Autodiagnostico;
