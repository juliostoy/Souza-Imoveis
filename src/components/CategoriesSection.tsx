import React from 'react';
import { PropertyType, Property } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { INITIAL_PROPERTIES } from '../data/mockData';

interface CategoriesSectionProps {
  onSelectCategory: (type: PropertyType) => void;
  properties?: Property[];
}

interface CategoryCard {
  type: PropertyType;
  title: string;
  countText: string;
  image: string;
  description: string;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({ onSelectCategory, properties = INITIAL_PROPERTIES }) => {
  const getCount = (catType: PropertyType): number => {
    if (catType === 'Terreno') {
      return properties.filter((p) => p.type === 'Terreno' || p.type === 'Área' || p.type === 'Sítio' || p.type === 'Chácara').length;
    }
    if (catType === 'Casa') {
      return properties.filter((p) => p.type === 'Casa' || p.type === 'Sobrado').length;
    }
    if (catType === 'Comercial') {
      return properties.filter((p) => p.type === 'Comercial').length;
    }
    if (catType === 'Apartamento') {
      return properties.filter((p) => p.type === 'Apartamento').length;
    }
    return properties.filter((p) => p.type === catType).length;
  };

  const categories: CategoryCard[] = [
    {
      type: 'Terreno',
      title: 'Terrenos & Áreas',
      countText: `${getCount('Terreno')} ${getCount('Terreno') === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}`,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      description: 'Lotes urbanos, chácaras, sítios e grandes áreas em Curitiba e Região Metropolitana.'
    },
    {
      type: 'Casa',
      title: 'Casas & Sobrados',
      countText: `${getCount('Casa')} ${getCount('Casa') === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}`,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=600&q=80',
      description: 'Residências privativas e kitnets com excelente infraestrutura e localização.'
    },
    {
      type: 'Comercial',
      title: 'Imóveis Comerciais',
      countText: `${getCount('Comercial')} ${getCount('Comercial') === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}`,
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      description: 'Lojas, salas comerciais e pontos estratégicos de alto fluxo para o seu negócio.'
    },
    {
      type: 'Apartamento',
      title: 'Apartamentos Especiais',
      countText: `${getCount('Apartamento')} ${getCount('Apartamento') === 1 ? 'imóvel disponível' : 'imóveis disponíveis'}`,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
      description: 'Seleção especial sob demanda em localizações consolidadas.'
    },
  ];

  return (
    <section id="categories-section" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
              Especialidades Souza & Souza
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-1">
              Explore por tipo de imóvel
            </h2>
          </div>
          <p className="text-slate-600 text-sm max-w-md mt-2 sm:mt-0">
            Foco em terrenos, áreas, casas e imóveis comerciais em Curitiba e Região Metropolitana.
          </p>
        </div>

        {/* Categories Grid - Centered Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-stretch max-w-7xl mx-auto">
          {categories.map((cat) => (
            <div
              key={cat.type}
              id={`category-card-${cat.type.toLowerCase()}`}
              onClick={() => onSelectCategory(cat.type)}
              className="group relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 cursor-pointer shadow-md hover:border-blue-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] via-[#0B132B]/60 to-transparent" />

              {/* Category Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-end items-start">
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-blue-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
                    {cat.countText}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif group-hover:text-blue-200 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-blue-100/90 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
