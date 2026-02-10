import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Mail, Phone } from 'lucide-react';
import logo from '../../assets/logo.svg'; 

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-white pt-16 pb-8 mt-12">
        <div className="mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
                
                {/* COLUMNA 1: IDENTIDAD */}
                <div className="col-span-1 md:col-span-4">
                    <img src={logo} alt="MITC Logo" className="h-8 w-auto mb-6 opacity-90" />
                    <p className="text-sm text-gray-500 leading-relaxed mb-6 pr-4">
                        MITC Business Connect es una membresía diseñada para potenciar emprendimientos industriales y tecnológicos.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/MTYITC" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300">
                            <Facebook className="h-5 w-5"/>
                        </a>
                        <a href="https://www.instagram.com/monterreyitcluster" target="_blank" rel="noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all duration-300">
                            <Instagram className="h-5 w-5"/>
                        </a>
                    </div>
                </div>

                {/* COLUMNA 2: PLATAFORMA (Actualizada) */}
                <div className="col-span-1 md:col-span-2">
                    <h4 className="font-display font-bold text-gray-900 mb-6">Plataforma</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><Link to="/" className="hover:text-indigo-600 transition-colors">Inicio</Link></li>
                        <li><Link to="/directorio" className="hover:text-indigo-600 transition-colors">Directorio</Link></li>
                        {/* Nuevo enlace aquí */}
                        <li><Link to="/unirse" className="hover:text-indigo-600 transition-colors">Unirse al Cluster</Link></li>
                    </ul>
                </div>

                {/* COLUMNA 3: LEGAL */}
                <div className="col-span-1 md:col-span-2">
                    <h4 className="font-display font-bold text-gray-900 mb-6">Legal</h4>
                    <ul className="space-y-3 text-sm text-gray-500">
                        <li><a href="#" className="hover:text-indigo-600 transition-colors">Aviso de Privacidad</a></li>
                        <li><a href="#" className="hover:text-indigo-600 transition-colors">Términos y Condiciones</a></li>
                        <li><a href="#" className="hover:text-indigo-600 transition-colors">Política de Cookies</a></li>
                    </ul>
                </div>

                {/* COLUMNA 4: CONTACTO */}
                <div className="col-span-1 md:col-span-4">
                    <h4 className="font-display font-bold text-gray-900 mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm text-gray-500">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 shrink-0 mt-0.5 text-indigo-600" />
                            <span>
                                Alianza Sur #303<br/>
                                Parque de Investigación e Innovación Tecnológica<br/>
                                Autopista al Aeropuerto Km 10, Apodaca, NL.
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-indigo-600" />
                            <div className="flex flex-col">
                                <a href="tel:8182863400" className="hover:text-indigo-600 transition-colors">(81) 8286 3400</a>
                                <a href="tel:8177702200" className="hover:text-indigo-600 transition-colors">(81) 7770 2200</a>
                            </div>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="h-5 w-5 shrink-0 text-indigo-600" />
                            <a href="mailto:info@monterreyitcluster.com" className="hover:text-indigo-600 transition-colors font-medium">
                                info@monterreyitcluster.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* BARRA INFERIOR */}
            <div className="border-t border-gray-200 pt-8 text-center text-xs text-gray-400">
                <p>© 2026 Monterrey IT Cluster. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
  );
};

export default Footer;