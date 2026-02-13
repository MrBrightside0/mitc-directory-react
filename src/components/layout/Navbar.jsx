import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';


const ADMIN_PANEL_URL = "https://admin.monterreyitcluster.com/";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;
  
  const navBgClass = isTransparent 
    ? 'bg-transparent py-6' 
    : 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm';

  const baseTextColor = isTransparent ? 'text-white' : 'text-gray-900';
  const subtleTextColor = isTransparent ? 'text-white/70' : 'text-gray-500';
  const hoverTextColor = isTransparent ? 'hover:text-white' : 'hover:text-indigo-600';
  

  const outlineButtonClass = isTransparent
    ? 'border-white/30 text-white hover:bg-white/10'
    : 'border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900';

  return (
    <nav className={`fixed top-0 z-40 w-full transition-all duration-500 ${navBgClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* --- IZQUIERDA: LOGO + NAVEGACIÓN --- */}
        <div className="flex items-center gap-10">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-4 group z-50">
            <img 
                src={logo} 
                alt="Logo" 
                className={`h-9 w-auto transition-all duration-300 group-hover:scale-105 ${isTransparent ? 'brightness-0 invert' : ''}`} 
            />
            <div className={`hidden md:block w-px h-8 transition-colors ${isTransparent ? 'bg-white/20' : 'bg-gray-200'}`}></div>
            <div className="hidden md:flex flex-col justify-center">
                <span className={`text-sm font-display font-bold leading-none transition-colors ${baseTextColor}`}>MITC Cluster</span>
                <span className={`text-[10px] font-mono uppercase tracking-widest leading-none mt-1 transition-colors ${subtleTextColor}`}>Portal Oficial</span>
            </div>
            </Link>

            {/* Menú Desktop (Pegado a la izquierda) */}
            <div className="hidden lg:flex items-center gap-6">
                <NavLink to="/" active={location.pathname === '/'} baseColor={baseTextColor} hoverColor={hoverTextColor}>Inicio</NavLink>
                <NavLink to="/directorio" active={location.pathname === '/directorio'} baseColor={baseTextColor} hoverColor={hoverTextColor}>Directorio</NavLink>
            </div>
        </div>

        {/* --- DERECHA: ACCIONES --- */}
        <div className="hidden lg:flex items-center gap-4">
            {/* Botón Principal: Unirse (Link Interno) */}
            <Link to="/unirse" 
                className={`group relative overflow-hidden rounded-xl px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider shadow-lg transition-all text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:shadow-indigo-500/25 hover:scale-105 active:scale-95`}>
                <span className="relative z-10 flex items-center gap-2">
                Unirse al Cluster <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
            </Link>

            {/* Botón Secundario: Acceso Socios (Login) */}
            <a href={ADMIN_PANEL_URL} target="_blank" rel="noopener noreferrer" 
                className={`flex items-center gap-2 px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider rounded-xl border transition-all ${outlineButtonClass}`}>
                <User className="h-3 w-3" /> Acceso Socios
            </a>
        </div>

        {/* --- BOTÓN HAMBURGUESA (Móvil) --- */}
        <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden z-50 p-2 rounded-lg transition-colors ${baseTextColor} ${!isTransparent && 'hover:bg-gray-100'}`}
        >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* --- MENÚ MÓVIL --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl lg:hidden overflow-hidden"
            >
                <div className="px-6 py-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <MobileNavLink to="/" active={location.pathname === '/'} onClick={() => setIsMobileMenuOpen(false)}>Inicio</MobileNavLink>
                        <MobileNavLink to="/directorio" active={location.pathname === '/directorio'} onClick={() => setIsMobileMenuOpen(false)}>Directorio</MobileNavLink>
                        {/* Se eliminó el link duplicado de "Unirse" aquí */}
                    </div>
                    
                    <div className="h-px w-full bg-gray-100"></div>
                    
                    <div className="grid grid-cols-1 gap-3">
                        <Link to="/unirse" onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold uppercase tracking-wider text-white bg-gradient-to-r from-indigo-600 to-blue-500 shadow-lg active:scale-95 transition-all">
                            Unirse al Cluster <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a href={ADMIN_PANEL_URL} target="_blank" rel="noopener noreferrer" 
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-gray-50 active:scale-95 transition-all">
                            <User className="h-4 w-4" /> Acceso Socios
                        </a>
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const NavLink = ({ to, children, active, baseColor, hoverColor }) => (
    <Link to={to} className={`text-sm font-bold transition-colors relative group ${active ? 'text-indigo-600' : baseColor} ${hoverColor}`}>
        {children}
        {/* Indicador de activo */}
        {active && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>}
    </Link>
);

const MobileNavLink = ({ to, children, onClick, active }) => (
    <Link to={to} onClick={onClick} className={`block text-lg font-display font-bold transition-all px-2 py-1 rounded-lg ${active ? 'text-indigo-600 bg-indigo-50 pl-4' : 'text-gray-600 hover:text-gray-900'}`}>
        {children}
    </Link>
);

export default Navbar;
