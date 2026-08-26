import React from 'react';
import { FilterState, PropertyType, Purpose } from '../types';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

interface PropertyFilterSidebarProps {
  filters: FilterState;
  onChangeFilters: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const PropertyFilterSidebar: React.FC<PropertyFilterSidebarProps> = ({
  filters,
  onChangeFilters,
  onResetFilters,
  totalResults,
}) => {
  const allFeatures = [
    'Piscina',
    'Churrasqueira',
    'Mobiliado',
    'Aceita Pet',
    'Elevador',
    'Varanda Gourmet',
    'Portaria 24h',
    'Academia',
    'Ar Condicionado',
    'Quadra de Tênis'
  ];

  const handleFeatureToggle = (feature: string) => {
    const current = filters.selectedFeatures || [];
    if (current.includes(feature)) {
      onChangeFilters({ selectedFeatures: current.filter((f) => f !== feature) });
    } else {
      onChangeFilters({ selectedFeatures: [...current, feature] });
    }
  };

  return (
    <aside id="property-filter-sidebar" className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-5 h-5 text-[#1E90FF]" />
          <h3 className="font-extrabold text-slate-900 text-base">Filtros de Busca</h3>
        </div>
        
        <button
          onClick={onResetFilters}
          className="text-xs text-slate-500 hover:text-[#1E90FF] flex items-center space-x-1 transition-colors font-medium"
          title="Limpar todos os filtros"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar</span>
        </button>
      </div>

      <p className="text-xs text-slate-600">
        Encontrados <strong className="text-[#1E90FF] font-bold">{totalResults}</strong> imóveis com estes critérios.
      </p>

      {/* Purpose / Negociação */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Negociação
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {(['Venda', 'Aluguel', 'Todos'] as const).map((p) => (
            <button
              key={p}
              onClick={() => {
                const isRental = p === 'Aluguel';
                const updates: Partial<FilterState> = { purpose: p };
                if (isRental && filters.maxPrice > 100000) {
                  updates.maxPrice = 15000;
                  updates.minPrice = 0;
                } else if (!isRental && filters.maxPrice <= 30000) {
                  updates.maxPrice = 10000000;
                  updates.minPrice = 0;
                }
                onChangeFilters(updates);
              }}
              className={`py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filters.purpose === p 
                  ? 'bg-[#1E90FF] text-white shadow' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p === 'Venda' ? 'Comprar' : p === 'Aluguel' ? 'Alugar' : 'Todos'}
            </button>
          ))}
        </div>
      </div>

      {/* Cidade & Bairro */}
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Cidade
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => onChangeFilters({ city: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
          >
            <option value="">Todas as Cidades</option>
            <option value="Colombo">Colombo - PR</option>
            <option value="Bocaiúva do Sul">Bocaiúva do Sul - PR</option>
            <option value="Curitiba">Curitiba - PR</option>
            <option value="Pinhais">Pinhais - PR</option>
            <option value="Almirante Tamandaré">Almirante Tamandaré - PR</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Bairro
          </label>
          <input
            type="text"
            placeholder="Ex: Maracanã, Osasco, Alto da XV..."
            value={filters.neighborhood}
            onChange={(e) => onChangeFilters({ neighborhood: e.target.value })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF] placeholder-slate-400"
          />
        </div>
      </div>

      {/* Tipo de imóvel */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Tipo de Imóvel
        </label>
        <select
          value={filters.type}
          onChange={(e) => onChangeFilters({ type: e.target.value as PropertyType | 'Todos' })}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
        >
          <option value="Todos">Todos os Tipos</option>
          <option value="Terreno">Terrenos / Áreas / Rural</option>
          <option value="Casa">Casas & Sobrados</option>
          <option value="Comercial">Imóveis Comerciais</option>
          <option value="Apartamento">Apartamentos Especiais</option>
        </select>
      </div>

      {/* Faixa de Valor */}
      <div>
        <div className="flex justify-between text-xs text-slate-700 font-semibold mb-1">
          <span>{filters.purpose === 'Aluguel' ? 'Aluguel Máximo' : 'Valor Máximo'}</span>
          <span className="text-[#1E90FF] font-bold">
            R$ {filters.maxPrice.toLocaleString('pt-BR')}
            {filters.purpose === 'Aluguel' ? '/mês' : ''}
          </span>
        </div>
        <input
          type="range"
          min={filters.purpose === 'Aluguel' ? 500 : 50000}
          max={filters.purpose === 'Aluguel' ? 25000 : 10000000}
          step={filters.purpose === 'Aluguel' ? 250 : 50000}
          value={filters.maxPrice}
          onChange={(e) => onChangeFilters({ maxPrice: Number(e.target.value) })}
          className="w-full accent-[#1E90FF] bg-slate-100 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
          <span>{filters.purpose === 'Aluguel' ? 'R$ 500' : 'R$ 50 mil'}</span>
          <span>{filters.purpose === 'Aluguel' ? 'R$ 25 mil/mês' : 'R$ 10 mi+'}</span>
        </div>
      </div>

      {/* Specs Metrics: Quartos, Suítes, Banheiros, Vagas */}
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Quartos Mín.</label>
          <select
            value={filters.minBedrooms}
            onChange={(e) => onChangeFilters({ minBedrooms: Number(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-2.5 py-1.5 text-xs"
          >
            <option value={0}>Qualquer</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Suítes Mín.</label>
          <select
            value={filters.minSuites}
            onChange={(e) => onChangeFilters({ minSuites: Number(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-2.5 py-1.5 text-xs"
          >
            <option value={0}>Qualquer</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Banheiros Mín.</label>
          <select
            value={filters.minBathrooms}
            onChange={(e) => onChangeFilters({ minBathrooms: Number(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-2.5 py-1.5 text-xs"
          >
            <option value={0}>Qualquer</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-medium text-slate-600 mb-1">Vagas Mín.</label>
          <select
            value={filters.minParking}
            onChange={(e) => onChangeFilters({ minParking: Number(e.target.value) })}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-lg px-2.5 py-1.5 text-xs"
          >
            <option value={0}>Qualquer</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>
      </div>

      {/* Características / Amenities Checklist */}
      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
          Características e Lazer
        </label>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {allFeatures.map((feat) => {
            const checked = (filters.selectedFeatures || []).includes(feat);
            return (
              <button
                key={feat}
                type="button"
                onClick={() => handleFeatureToggle(feat)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  checked 
                    ? 'bg-blue-50 text-[#1E90FF] border border-blue-200 font-semibold' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{feat}</span>
                {checked && <Check className="w-3.5 h-3.5 text-[#1E90FF]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Código do imóvel */}
      <div className="pt-2 border-t border-slate-100">
        <label className="block text-xs font-semibold text-slate-700 mb-1">
          Código do Imóvel
        </label>
        <input
          type="text"
          placeholder="Ex: SZ-1001"
          value={filters.code}
          onChange={(e) => onChangeFilters({ code: e.target.value })}
          className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs uppercase placeholder-slate-400 focus:border-[#1E90FF]"
        />
      </div>

    </aside>
  );
};
