import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import CompanyCard from '../components/directory/CompanyCard';
import CompanyDrawer from '../components/directory/CompanyDrawer';
import FilterBar from '../components/directory/FilterBar';
import heroImage from '../assets/monterrey-hero.webp';
import useCompanies from '../hooks/useCompanies';
import { fetchCompanyById } from '../services/api';

const Directorio = () => {
  const heroRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { companies, isLoading, error } = useCompanies();
  const companyIdFromQuery = searchParams.get('socio');
  const selectedCompanyId = selectedCompany?.id ? String(selectedCompany.id) : '';

  useGSAP(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Badge
    tl.fromTo('.dir-badge',
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );

    // Heading lines
    tl.fromTo('.dir-line',
      { yPercent: 120 },
      { yPercent: 0, duration: 1.1, stagger: 0.15 },
      '-=0.3'
    );

    // Paragraph
    tl.fromTo('.dir-para',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );

    // Background image parallax
    gsap.to('.dir-bg-img', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

  }, { scope: heroRef });

  const categories = useMemo(() => {
    const values = companies
      .map((company) => company.industry)
      .filter((industry) => typeof industry === 'string' && industry.trim() !== '');
    return ['Todas', ...new Set(values)];
  }, [companies]);

  const filtered = companies.filter(item => {
    const matchCat = activeFilter === 'Todas' || item.industry === activeFilter;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchVerified = onlyVerified ? item.verified : true;
    return matchCat && matchSearch && matchVerified;
  });

  const hasActiveFilters = activeFilter !== 'Todas' || onlyVerified || searchTerm.trim() !== '';

  useEffect(() => {
    let isMounted = true;

    const syncCompanyFromQuery = async () => {
      if (!companyIdFromQuery) {
        if (selectedCompanyId) setSelectedCompany(null);
        return;
      }

      const companyFromList = companies.find((company) => String(company.id) === companyIdFromQuery);
      if (companyFromList) {
        if (selectedCompanyId !== String(companyFromList.id)) {
          setSelectedCompany(companyFromList);
        }
        return;
      }

      if (selectedCompanyId === companyIdFromQuery) return;
      if (isLoading) return;

      try {
        const companyFromApi = await fetchCompanyById(companyIdFromQuery);
        if (isMounted) setSelectedCompany(companyFromApi);
      } catch {
        if (!isMounted) return;
        setSearchParams((prev) => {
          const next = new URLSearchParams(prev);
          next.delete('socio');
          return next;
        }, { replace: true });
      }
    };

    syncCompanyFromQuery();

    return () => {
      isMounted = false;
    };
  }, [companyIdFromQuery, companies, isLoading, selectedCompanyId, setSearchParams]);

  const openCompany = (company) => {
    if (!company?.id) return;
    setSelectedCompany(company);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set('socio', String(company.id));
      return next;
    });
  };

  const closeCompany = () => {
    setSelectedCompany(null);
    setSearchParams((prev) => {
      if (!prev.has('socio')) return prev;
      const next = new URLSearchParams(prev);
      next.delete('socio');
      return next;
    });
  };

  return (
    <div className="flex-1 flex flex-col relative">
      {/* HERO SECTION */}
      <header ref={heroRef} className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-1">
            <img src={heroImage} alt="Monterrey Tech" className="dir-bg-img w-full h-[115%] object-cover -mt-[5%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA]"></div>
        </div>

        {/* Grid pattern over image */}
        <div
          className="absolute inset-0 opacity-[0.04] z-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '70px 70px',
          }}
        ></div>

        <div className="mx-auto max-w-7xl relative z-10 text-white">
            <div className="dir-badge inline-flex items-center gap-2 rounded-full border border-white/[0.15] bg-white/[0.06] px-4 py-1.5 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Ecosistema en tiempo real</span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.95]">
              <span className="block overflow-hidden">
                <span className="dir-line block">El motor tech</span>
              </span>
              <span className="block overflow-hidden">
                <span className="dir-line block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">del norte.</span>
              </span>
            </h1>

            <p className="dir-para text-lg text-slate-200 max-w-xl leading-relaxed font-medium">
              Conecta con las empresas líderes. Verificadas por capacidad técnica y solidez financiera.
            </p>
        </div>
      </header>

      {/* BARRA DE FILTROS */}
      <FilterBar
        searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        activeFilter={activeFilter} setActiveFilter={setActiveFilter}
        onlyVerified={onlyVerified} setOnlyVerified={setOnlyVerified}
        categories={categories}
      />

      {/* GRID RESULTADOS */}
      <main className="mx-auto max-w-7xl px-4 md:px-6 py-8 flex-1 w-full">
        {isLoading && (
          <div className="py-24 text-center">
            <h3 className="text-lg font-bold text-gray-900">Cargando empresas...</h3>
          </div>
        )}

        {!isLoading && error && (
          <div className="py-10 text-center">
            <h3 className="text-lg font-bold text-gray-900">No se pudo cargar el directorio</h3>
            <p className="text-sm text-gray-500 mt-2">Intenta nuevamente en unos minutos.</p>
          </div>
        )}

        {!isLoading && !error && (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filtered.map((item) => (
                <CompanyCard key={item.id} item={item} onClick={() => openCompany(item)} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!isLoading && !error && filtered.length === 0 && (
          <div className="py-24 text-center">
             <Filter className="h-8 w-8 text-gray-300 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-gray-900">
               {hasActiveFilters ? 'Sin resultados' : 'Estamos actualizando el directorio de empresas. Vuelve en unos minutos.'}
             </h3>
             {hasActiveFilters && (
               <button onClick={() => {setSearchTerm(''); setActiveFilter('Todas'); setOnlyVerified(false)}} className="mt-4 px-6 py-2.5 bg-gray-900 text-white rounded-full text-xs font-bold uppercase tracking-widest">
                 Reiniciar filtros
               </button>
             )}
          </div>
        )}
      </main>

      {/* DRAWER */}
      <AnimatePresence>
        {selectedCompany && (
            <CompanyDrawer selectedCompany={selectedCompany} onClose={closeCompany} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Directorio;
