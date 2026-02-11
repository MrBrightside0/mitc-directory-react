import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, ShieldCheck, X } from 'lucide-react';

const FilterBar = ({ 
  searchTerm, setSearchTerm, 
  activeFilter, setActiveFilter, 
  onlyVerified, setOnlyVerified,
  categories = ['Todas']
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="sticky top-[88px] z-30 px-6 pb-4 -mt-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 flex flex-col md:flex-row items-center gap-2 transition-all hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)]">
          
          {/* Input Buscador */}
          <div className="relative w-full flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar tecnología, empresa..." 
              className="block w-full rounded-xl border-none bg-gray-50/50 py-3.5 pl-11 pr-4 text-sm text-gray-900 placeholder-gray-400/80 focus:ring-2 focus:ring-gray-900/5 focus:bg-white transition-all outline-none"
            />
          </div>

          <div className="flex w-full md:w-auto items-center gap-2">
              
              {/* Dropdown Categorías */}
              <div className="relative w-full md:w-auto">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full md:w-60 flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm font-medium text-gray-900 hover:border-gray-900/30 transition-all focus:outline-none focus:ring-2 focus:ring-gray-900/5 active:scale-[0.98]"
                >
                  <span className="truncate">{activeFilter === 'Todas' ? 'Todas las Industrias' : activeFilter}</span>
                  <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 z-20 w-full md:w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl ring-1 ring-black/5"
                      >
                        <div className="max-h-64 overflow-y-auto custom-scrollbar">
                          {categories.map((cat) => (
                            <button
                              key={cat}
                              onClick={() => { setActiveFilter(cat); setIsDropdownOpen(false); }}
                              className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide transition-colors ${
                                activeFilter === cat ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                              }`}
                            >
                              {cat}
                              {activeFilter === cat && <Check className="h-3.5 w-3.5" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón Verificados */}
              <button
                onClick={() => setOnlyVerified(!onlyVerified)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3.5 text-sm font-medium transition-all active:scale-[0.98] ${
                  onlyVerified 
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'border-gray-200 bg-white text-gray-400 hover:border-gray-900/30'
                }`}
                title="Mostrar solo verificados"
              >
                <ShieldCheck className={`h-4 w-4 ${onlyVerified ? 'fill-emerald-700' : ''}`} />
                <span className="hidden md:inline text-xs uppercase font-bold tracking-wider">Verificados</span>
              </button>
          </div>
        </div>
        
        {/* Chips de filtro activo */}
        {(activeFilter !== 'Todas' || onlyVerified || searchTerm) && (
           <div className="mt-3 flex flex-wrap gap-2 px-1">
              {activeFilter !== 'Todas' && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white pl-3 pr-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900 shadow-sm">
                      {activeFilter}
                      <div className="h-3 w-px bg-gray-200"></div>
                      <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => setActiveFilter('Todas')} />
                  </span>
              )}
              <button onClick={() => {setActiveFilter('Todas'); setSearchTerm(''); setOnlyVerified(false)}} className="ml-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 hover:underline decoration-dotted transition-colors">
                  Limpiar todo
              </button>
           </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
