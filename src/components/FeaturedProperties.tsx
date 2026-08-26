import React, { useState } from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { ArrowRight, Sparkles } from 'lucide-react';

interface FeaturedPropertiesProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onViewAll: () => void;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
  favorites,
  onToggleFavorite,
  onSelectProperty,
  onViewAll,
}) => {
  const [activeTab, setActiveTab] = useState<'Todos' | 'Venda' | 'Aluguel' | 'Destaque'>('Todos');

  const filteredProperties = properties.filter((p) => {
    if (activeTab === 'Todos') return true;
    if (activeTab === 'Venda') {
      return p.purpose === 'Venda' || p.purpose === 'Venda e Aluguel' || (p.price && p.price > 0 && p.purpose !== 'Aluguel');
    }
    if (activeTab === 'Aluguel') {
      return p.purpose === 'Aluguel' || p.purpose === 'Venda e Aluguel' || (!!p.rentalPrice && p.rentalPrice > 0);
    }
    if (activeTab === 'Destaque') return p.featured || p.badge === 'Destaque';
    return true;
  });

  return (
    <section id="featured-properties-section" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center space-x-1.5 text-blue-700 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Oportunidades Selecionadas</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif">
              Imóveis em Destaque
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            {(['Todos', 'Venda', 'Aluguel', 'Destaque'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                }`}
              >
                {tab === 'Venda' ? 'Comprar' : tab === 'Aluguel' ? 'Alugar' : tab === 'Destaque' ? 'Destaques' : 'Todos'}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.slice(0, 6).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-600 text-base">Nenhum imóvel encontrado nesta categoria no momento.</p>
            <button
              onClick={() => setActiveTab('Todos')}
              className="mt-4 px-4 py-2 rounded-lg bg-blue-700 text-white text-xs font-bold"
            >
              Ver todos os imóveis
            </button>
          </div>
        )}

        {/* View All Properties CTA */}
        <div className="mt-12 text-center">
          <button
            id="view-all-properties-btn"
            onClick={onViewAll}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm shadow-lg shadow-blue-900/15 transition-all transform hover:-translate-y-0.5"
          >
            <span>Ver Todo o Catálogo ({properties.length} Imóveis)</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

      </div>
    </section>
  );
};
