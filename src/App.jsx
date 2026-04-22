import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import ReactGA from 'react-ga4';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ui/ChatWidget';
import ScrollToTop from './components/utils/ScrollToTop';

import Inicio from './pages/Inicio';

const Directorio = lazy(() => import('./pages/Directorio'));
const Unirse = lazy(() => import('./pages/Unirse'));
const Autodiagnostico = lazy(() => import('./pages/Autodiagnostico'));
const NotFound = lazy(() => import('./pages/NotFound'));

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 animate-spin"></div>
  </div>
);

const Page = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 24 }}
    animate={{ opacity: 1, x: 0, transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
    exit={{ opacity: 0, transition: { duration: 0.12, ease: 'easeIn' } }}
  >
    {children}
  </motion.div>
);

const AppLayout = () => {
  const location = useLocation();
  const isAutodiagnostico = location.pathname === '/autodiagnostico';

  return (
    <div className={`flex flex-col ${isAutodiagnostico ? '' : 'min-h-screen'} bg-white overflow-x-hidden`}>
      <Navbar />
      {!isAutodiagnostico && <ChatWidget />}
      <AnimatePresence mode="wait" initial={false}>
        <Suspense fallback={<RouteFallback />} key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Page><Inicio /></Page>} />
            <Route path="/directorio" element={<Page><Directorio /></Page>} />
            <Route path="/unirse" element={<Page><Unirse /></Page>} />
            <Route path="/autodiagnostico" element={<Page><Autodiagnostico /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAutodiagnostico && <Footer />}
    </div>
  );
};

const App = () => {

  useEffect(() => {
    ReactGA.initialize('TU_ID_DE_GOOGLE_AQUI');
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });

    // Remove splash screen
    const splash = document.getElementById('splash');
    if (splash) {
      splash.classList.add('hide');
      setTimeout(() => splash.remove(), 600);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
};

export default App;
