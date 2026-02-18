import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, Share2, Layers, Package, Briefcase, Activity, 
  MapPin, ShieldCheck, Sparkles, Building2, 
  Store, Rocket, Mail, Phone, UserRound, Globe
} from 'lucide-react';
import ContactModal from './ContactModal'; 
import { fetchCompanyById } from '../../services/api';
import mitcLogo from '../../assets/logo.svg';

// Helpers visuales
const getTargetIcon = (target) => {
    switch (target) {
      case 'Enterprise': return <Building2 className="h-3 w-3" />;
      case 'Startup': return <Rocket className="h-3 w-3" />;
      case 'PyME': return <Store className="h-3 w-3" />;
      default: return <Briefcase className="h-3 w-3" />;
    }
};
  
const getTargetStyle = (target) => {
    switch (target) {
      case 'Enterprise': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Startup': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'PyME': return 'bg-blue-50 text-blue-700 border-blue-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
};

const splitContactValues = (value) => {
  const text = (value || '').toString().trim();
  if (!text) return [];

  const seen = new Set();
  return text
    .split(/[,\n;]+/)
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => {
      const key = item.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
};

const normalizeWebsiteHref = (value) => {
  const text = (value || '').toString().trim();
  if (!text || text.includes('@')) return '';

  let normalized = text.replace(/\s+/g, '');
  normalized = normalized.replace(/^https?:\/?(?!\/)/i, 'https://');

  if (/^www\./i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  const hasScheme = /^https?:\/\//i.test(normalized);
  if (!hasScheme && /^[a-z0-9.-]+\.[a-z]{2,}(\/\S*)?$/i.test(normalized)) {
    normalized = `https://${normalized}`;
  }

  try {
    const parsed = new URL(normalized);
    if (!parsed.hostname || !parsed.hostname.includes('.')) return '';
    return parsed.toString();
  } catch {
    return '';
  }
};

const formatWebsiteLabel = (href) => {
  try {
    const parsed = new URL(href);
    const path = parsed.pathname && parsed.pathname !== '/' ? parsed.pathname : '';
    return `${parsed.hostname}${path}${parsed.search}${parsed.hash}`;
  } catch {
    return href.replace(/^https?:\/\//i, '');
  }
};

const isLikelyEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || '').toString().trim());
const isLikelyPhone = (value) => (value || '').toString().replace(/\D/g, '').length >= 7;
const isLikelyWebsite = (value) => Boolean(normalizeWebsiteHref(value));

const stripContactPrefix = (value) =>
  (value || '')
    .toString()
    .trim()
    .replace(/^(correo|email|mail|telefono|tel|phone|nombre|name|web|sitio web|pagina web|website)\s*:\s*/i, '');

const isChannelLabel = (value) => {
  const normalized = (value || '').toString().trim().toLowerCase();
  return [
    'correo',
    'email',
    'mail',
    'telefono',
    'tel',
    'phone',
    'nombre',
    'name',
    'web',
    'sitio web',
    'pagina web',
    'website'
  ].includes(normalized);
};

const parseContactInfo = (values) => {
  const names = [];
  const emails = [];
  const phones = [];
  const websites = [];

  const seenNames = new Set();
  const seenEmails = new Set();
  const seenPhones = new Set();
  const seenWebsites = new Set();

  const pushUnique = (list, seen, value, key = value.toLowerCase()) => {
    if (!value || seen.has(key)) return;
    seen.add(key);
    list.push(value);
  };

  const tokens = values.flatMap((value) => splitContactValues(value));
  tokens.forEach((rawToken) => {
    const token = stripContactPrefix(rawToken);
    if (!token || isChannelLabel(token)) return;

    if (isLikelyEmail(token)) {
      pushUnique(emails, seenEmails, token);
      return;
    }

    if (isLikelyPhone(token)) {
      pushUnique(phones, seenPhones, token, token.replace(/\D/g, ''));
      return;
    }

    if (isLikelyWebsite(token)) {
      const href = normalizeWebsiteHref(token);
      pushUnique(websites, seenWebsites, href, href.toLowerCase());
      return;
    }

    pushUnique(names, seenNames, token);
  });

  return { names, emails, phones, websites };
};

const CompanyDrawer = ({ selectedCompany, onClose }) => {
  // ESTADO PARA EL MODAL DE CONTACTO
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(selectedCompany);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadDetails = async () => {
      if (!selectedCompany?.id) {
        setCompanyDetails(selectedCompany);
        return;
      }

      setCompanyDetails(selectedCompany);
      setIsLoadingDetails(true);

      try {
        const details = await fetchCompanyById(selectedCompany.id, selectedCompany);
        if (isMounted) setCompanyDetails(details);
      } catch (error) {
        if (isMounted) setCompanyDetails(selectedCompany);
        console.error('No se pudo cargar el detalle del socio:', error);
      } finally {
        if (isMounted) setIsLoadingDetails(false);
      }
    };

    loadDetails();

    return () => {
      isMounted = false;
    };
  }, [selectedCompany]);

  if (!selectedCompany) return null;

  const company = companyDetails || selectedCompany;
  const coverImage = company.banner || company.cover;
  const showCommercialName = company.commercialName && company.commercialName !== company.name;
  const services = Array.isArray(company.services) ? company.services.filter(Boolean) : [];
  const targetAudience = Array.isArray(company.targetAudience) ? company.targetAudience.filter(Boolean) : [];
  const tags = Array.isArray(company.tags) ? company.tags.filter(Boolean) : [];
  const hasServices = services.length > 0;
  const hasProducts = Boolean(company.products);
  const hasTargetAudience = targetAudience.length > 0;
  const hasBusinessSection = hasServices || hasProducts || hasTargetAudience;
  const hasExecutiveProfile = isLoadingDetails || Boolean(company.desc);
  const hasTags = tags.length > 0;
  const hasLocation = Boolean(company.location);
  const parsedContactInfo = parseContactInfo([
    company.contactName,
    company.email,
    company.phone,
    company.website,
    company.contact,
    company.publicLead,
    company.publicContact?.name,
    company.publicContact?.email,
    company.publicContact?.phone,
    company.publicContact?.value
  ]);
  const contactNames = parsedContactInfo.names;
  const emails = parsedContactInfo.emails;
  const phones = parsedContactInfo.phones;
  const websites = parsedContactInfo.websites;
  const hasContactName = contactNames.length > 0;
  const hasEmail = emails.length > 0;
  const hasPhone = phones.length > 0;
  const hasWebsite = websites.length > 0;
  const hasContactInfo = hasLocation || hasContactName || hasEmail || hasPhone || hasWebsite;

  return (
    <>
      {/* 1. RENDERIZAR EL MODAL SI ESTÁ ABIERTO */}
      {isModalOpen && (
        <ContactModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            companyName={company.name} 
        />
      )}

      {/* Fondo oscuro (Backdrop) */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm"
      />
      
      {/* Panel Deslizante */}
      <motion.div 
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-y-0 right-0 z-50 w-full md:max-w-2xl bg-white shadow-2xl flex flex-col"
      >
        
        {/* Botones Flotantes */}
        <div className="absolute top-4 right-4 z-50 flex gap-2">
            <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('URL copiada');
                }}
                className="p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
            >
                <Share2 className="h-6 w-6 drop-shadow-md" />
            </button>
            <button 
                onClick={onClose} 
                className="p-2 bg-black/30 hover:bg-white/50 text-white rounded-full transition-colors backdrop-blur-md shadow-lg"
            >
                <X className="h-6 w-6 drop-shadow-md" />
            </button>
        </div>

        {/* Contenido con Scroll */}
        <div className="flex-1 overflow-y-auto bg-white relative pb-44"> 
          
          {/* Header con Banner */}
          <div className="relative h-64 bg-gray-100">
              {coverImage ? (
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center">
                  <img src={mitcLogo} alt="MITC" className="h-20 w-auto opacity-90" />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              
              <div className="absolute -bottom-10 left-6 md:left-8 h-24 w-24 rounded-2xl bg-white p-2 shadow-2xl z-20">
                <div className="h-full w-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                  <img src={company.logoUrl} alt="Logo" className="w-full h-full object-contain p-1.5" />
                </div>
              </div>
          </div>

          <div className="px-6 md:px-8 pt-16">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight leading-none">{company.name}</h1>
                
                {showCommercialName && (
                    <p className="text-lg font-medium text-gray-400 mt-1">{company.commercialName}</p>
                )}

                <p className="text-sm font-mono text-gray-500 uppercase tracking-wider mt-3 flex items-center gap-2">
                    {company.industry} 
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span> 
                    {company.tier}
                </p>
              </div>
              {company.verified && (
                <div className="hidden sm:flex flex-col items-end">
                  <ShieldCheck className="h-8 w-8 text-emerald-500 mb-1" />
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Verificado</span>
                </div>
              )}
            </div>

            {/* Diferenciador Destacado */}
            {company.differentiator && (
                <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-start gap-3 shadow-sm">
                    <Sparkles className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-amber-600 uppercase tracking-wide mb-1">Propuesta de Valor</p>
                        <p className="text-sm font-bold text-amber-900 italic leading-relaxed">
                            "{company.differentiator}"
                        </p>
                    </div>
                </div>
            )}

            {/* Grid de Servicios y Detalles */}
            {hasBusinessSection && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                  {hasServices && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col gap-3">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">
                          <Layers className="h-3 w-3" /> Servicios Principales
                      </div>
                      <ul className="space-y-2">
                        {services.map((svc, idx) => (
                          <li key={idx} className="text-sm font-medium text-gray-800 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0"></span>
                            {svc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(hasProducts || hasTargetAudience) && (
                    <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col gap-4">
                      {hasProducts && (
                        <div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">
                              <Package className="h-3 w-3" /> Productos Core
                          </div>
                          <p className="text-sm font-bold text-gray-900">{company.products}</p>
                        </div>
                      )}
                      
                      {hasTargetAudience && (
                        <div>
                          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 mt-2">
                              <Rocket className="h-3 w-3" /> Enfoque de Mercado
                          </div>
                          <div className="flex flex-wrap gap-2">
                              {targetAudience.map(target => (
                                  <span key={target} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-bold uppercase tracking-wide ${getTargetStyle(target)}`}>
                                      {getTargetIcon(target)} {target}
                                  </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            )}

            {/* Descripción */}
            {hasExecutiveProfile && (
              <div className="prose prose-slate mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4 border-l-4 border-gray-900 pl-3">Perfil Ejecutivo</h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {isLoadingDetails ? 'Cargando perfil ejecutivo...' : company.desc}
                </p>
              </div>
            )}

            {/* Stack Tecnológico */}
            {hasTags && (
              <div className="mb-10">
                <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-4">Stack Tecnológico</h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-bold text-gray-800 shadow-sm flex items-center gap-1.5">
                      <Activity className="h-3 w-3 text-gray-400" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sección de Contacto Ampliada */}
            {hasContactInfo && (
              <div className="flex flex-col gap-5 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900">Información de Contacto</h3>

                  {/* Ubicación */}
                  {hasLocation && (
                    <div className="flex items-center gap-4 p-3 -mx-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                        <MapPin className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Ubicación</p>
                        <p className="font-medium text-gray-900">{company.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Contacto Público (Nombre) */}
                  {hasContactName && (
                    <div className="flex items-center gap-4 p-3 -mx-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm">
                        <UserRound className="h-5 w-5 text-indigo-500" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Contacto Público</p>
                        <div className="flex flex-col gap-1">
                          {contactNames.map((name) => (
                            <p key={name} className="font-medium text-gray-900">{name}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Correo (Si existe) */}
                  {hasEmail && (
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center transition-colors border border-gray-200 shadow-sm">
                        <Mail className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Correo Electrónico</p>
                        <div className="flex flex-col gap-1">
                          {emails.map((email) => (
                            <a key={email} href={`mailto:${email}`} className="font-medium text-gray-900 hover:text-indigo-600 transition-colors break-all">
                              {email}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sitio Web (Si existe) */}
                  {hasWebsite && (
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center transition-colors border border-gray-200 shadow-sm">
                        <Globe className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Sitio Web</p>
                        <div className="flex flex-col gap-1">
                          {websites.map((website) => (
                            <a
                              key={website}
                              href={website}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-gray-900 hover:text-indigo-600 transition-colors break-all"
                            >
                              {formatWebsiteLabel(website)}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Teléfono (Si existe) */}
                  {hasPhone && (
                    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors -mx-3">
                      <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center transition-colors border border-gray-200 shadow-sm">
                        <Phone className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase">Teléfono</p>
                        <div className="flex flex-col gap-1">
                          {phones.map((phone) => (
                            <a key={phone} href={`tel:${phone}`} className="font-medium text-gray-900 hover:text-indigo-600 transition-colors">
                              {phone}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>

        {/* 2. BOTÓN DE ACCIÓN CONECTADO AL MODAL */}
        <div className="absolute bottom-0 w-full z-20">
          <div className="h-12 w-full bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
          <div className="border-t border-gray-200 p-6 bg-white/95 backdrop-blur shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button 
                onClick={() => setIsModalOpen(true)} // <-- AQUÍ ABRE EL MODAL
                className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3"
            >
              Conectar con Socio
            </button>
          </div>
        </div>

      </motion.div>
    </>
  );
};

export default CompanyDrawer;
