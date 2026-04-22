import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';


const ADMIN_PANEL_URL = "https://admin.monterreyitcluster.com/";

const NAV_ITEMS = [
  { to: '/', label: 'Inicio' },
  { to: '/directorio', label: 'Directorio' },
  { to: '/autodiagnostico', label: 'Autodiagnóstico' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const routeHasLightTop = location.pathname === '/autodiagnostico';
  const onDarkHero = !scrolled && !isMobileMenuOpen && !routeHasLightTop;

  const textBase = onDarkHero ? 'text-white/70' : 'text-slate-500';
  const textStrong = onDarkHero ? 'text-white' : 'text-slate-900';
  const textHover = onDarkHero ? 'hover:text-white' : 'hover:text-slate-900';

  return (
    <nav className={`fixed top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color,box-shadow,color] duration-300 py-5 ${isMobileMenuOpen ? 'bg-white border-b border-slate-200/60' : onDarkHero ? 'bg-transparent' : 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60'}`}>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-6">

        {/* --- IZQUIERDA: LOGO --- */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center group z-50">
            <img
              src={logo}
              alt="MITC"
              className={`h-7 w-auto transition-opacity duration-300 group-hover:opacity-70 ${onDarkHero ? 'brightness-0 invert' : ''}`}
            />
          </Link>
        </div>

        {/* --- CENTRO: NAVEGACIÓN --- */}
        <div className="hidden lg:flex items-center gap-10">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              active={location.pathname === item.to}
              textBase={textBase}
              textStrong={textStrong}
              textHover={textHover}
              onDarkHero={onDarkHero}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* --- DERECHA: ACCIONES --- */}
        <div className="hidden lg:flex items-center justify-end gap-8">
          <a
            href={ADMIN_PANEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm font-medium tracking-tight transition-colors ${textBase} ${textHover}`}
          >
            Acceso Socios
          </a>

          <Link
            to="/unirse"
            className={`group inline-flex items-center gap-1.5 text-sm font-medium tracking-tight transition-colors ${textStrong} ${textHover}`}
          >
            Unirse
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* --- BOTÓN HAMBURGUESA (Móvil) --- */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`lg:hidden z-50 p-2 col-start-3 justify-self-end transition-colors ${textStrong}`}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200/60 lg:hidden overflow-hidden"
          >
            <div className="px-6 py-10 flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => (
                  <MobileNavLink
                    key={item.to}
                    to={item.to}
                    active={location.pathname === item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </MobileNavLink>
                ))}
              </div>

              <div className="h-px w-full bg-slate-200/70"></div>

              <div className="flex flex-col gap-4">
                <Link
                  to="/unirse"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="group inline-flex items-center gap-2 text-2xl font-display tracking-tight text-slate-900"
                >
                  Unirse
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href={ADMIN_PANEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                >
                  Acceso Socios →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};


const NavLink = ({ to, children, active, textBase, textStrong, textHover, onDarkHero }) => (
  <Link
    to={to}
    className={`relative text-sm font-medium tracking-tight transition-colors ${active ? textStrong : textBase} ${textHover}`}
  >
    {children}
    {active && (
      <span
        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 ${onDarkHero ? 'bg-white' : 'bg-slate-900'}`}
      />
    )}
  </Link>
);

const MobileNavLink = ({ to, children, onClick, active }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block text-3xl font-display tracking-tight transition-colors py-2 ${active ? 'text-slate-900 font-semibold' : 'text-slate-400 hover:text-slate-900 font-medium'}`}
  >
    {children}
  </Link>
);

export default Navbar;
