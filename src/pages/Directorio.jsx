import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import CompanyCard from '../components/directory/CompanyCard';
import CompanyDrawer from '../components/directory/CompanyDrawer';
import FilterBar from '../components/directory/FilterBar';
import heroImage from '../assets/monterrey-hero.webp'; 
import useCompanies from '../hooks/useCompanies';
import { fetchCompanyById } from '../services/api';

const Directorio = () => {
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { companies, isLoading, error } = useCompanies();
  const companyIdFromQuery = searchParams.get('socio');
  const selectedCompanyId = selectedCompany?.id ? String(selectedCompany.id) : '';

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
      <header className="relative pt-48 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-1">
            <img src={heroImage} alt="Monterrey Tech" className="w-full h-full object-cover transform scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA]"></div>
        </div>
        <div className="mx-auto max-w-7xl relative z-10 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Ecosistema en tiempo real</span>
            </div>
            <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tight mb-6 leading-tight drop-shadow-xl">
              El motor tech <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">del norte.</span>
            </h1>
            <p className="text-lg text-slate-200 max-w-xl leading-relaxed font-medium">
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
