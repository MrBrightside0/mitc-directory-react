import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { clarity } from 'react-microsoft-clarity';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ui/ChatWidget';
// 1. IMPORTA EL COMPONENTE
import ScrollToTop from './components/utils/ScrollToTop'; 

import Directorio from './pages/Directorio';
import Inicio from './pages/Inicio'; 
import Unirse from './pages/Unirse'; 

const App = () => {

  useEffect(() => {
    clarity.init('TU_ID_AQUI'); 
  }, []);

  return (
    <Router>
      <ScrollToTop />

      <div className="flex flex-col min-h-screen bg-white">
        
        <Navbar />
        <ChatWidget />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/unirse" element={<Unirse />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
        
      </div>
    </Router>
  );
};

export default App;