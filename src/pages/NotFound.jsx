import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-6 py-32">
      <Helmet>
        <title>Página no encontrada | Monterrey IT Cluster</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <div className="text-center max-w-md">
        <div className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 leading-none mb-4">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-slate-900 mb-3">
          Página no encontrada
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          La página que buscas no existe o fue movida. Intenta volver al inicio o explorar el directorio.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-bold text-sm hover:shadow-lg hover:shadow-indigo-200/50 transition-all">
            <Home className="w-4 h-4" /> Ir al inicio
          </Link>
          <Link to="/directorio" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all">
            <Search className="w-4 h-4" /> Ver directorio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
