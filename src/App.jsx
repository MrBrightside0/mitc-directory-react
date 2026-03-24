import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ReactGA from 'react-ga4';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ui/ChatWidget';
import ScrollToTop from './components/utils/ScrollToTop';

import Directorio from './pages/Directorio';
import Inicio from './pages/Inicio';
import Unirse from './pages/Unirse';
import Autodiagnostico from './pages/Autodiagnostico';

const AppLayout = () => {
  const location = useLocation();
  const isAutodiagnostico = location.pathname === '/autodiagnostico';

  return (
    <div className={`flex flex-col ${isAutodiagnostico ? '' : 'min-h-screen'} bg-white`}>
      {!isAutodiagnostico && <Navbar />}
      {!isAutodiagnostico && <ChatWidget />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/directorio" element={<Directorio />} />
        <Route path="/unirse" element={<Unirse />} />
        <Route path="/autodiagnostico" element={<Autodiagnostico />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAutodiagnostico && <Footer />}
    </div>
  );
};

const App = () => {

  useEffect(() => {
    ReactGA.initialize('TU_ID_DE_GOOGLE_AQUI');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
};

export default App;
