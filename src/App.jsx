import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatWidget from './components/ui/ChatWidget';

import Directorio from './pages/Directorio';
import Inicio from './pages/Inicio'; 
import Unirse from './pages/Unirse'; 

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        
        <Navbar />
        <ChatWidget />

        <Routes>
          {/* RUTA PRINCIPAL */}
          <Route path="/" element={<Inicio />} />
          
          {/* RUTAS INTERNAS */}
          <Route path="/directorio" element={<Directorio />} />
          <Route path="/unirse" element={<Unirse />} />

          {/* CUALQUIER RUTA RARA REDIRIGE AL INICIO */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
        
      </div>
    </Router>
  );
};

export default App;