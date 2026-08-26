import React, { useState } from 'react';
import { 
  Search, 
  Home, 
  Building, 
  MapPin, 
  Sparkles,
} from 'lucide-react';
import { FilterState, PropertyType, Purpose } from '../types';

interface HeroSectionProps {
  onSearch: (filters: Partial<FilterState>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSearch }) => {
  const [purpose, setPurpose] = useState<Purpose | 'Todos'>('Venda');
  const [propertyType, setPropertyType] = useState<PropertyType | 'Todos'>('Todos');
  const [city, setCity] = useState<string>('Todas');
  const [neighborhood, setNeighborhood] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<number>(0);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      purpose,
      type: propertyType,
      city: city === 'Todas' ? '' : city,
      neighborhood,
      minBedrooms: bedrooms,
    });
  };

  return (
    <section id="hero-section" className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden py-12 lg:py-20">
      
      {/* Background Image Carousel Slider with Blue Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85" 
          alt="Imóvel em Colombo PR" 
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000"
        />
        {/* Blue and White Gradient Overlays for high legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-[#0B132B]/85 to-slate-900/80" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B132B]/40 to-slate-950/90" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        
        {/* Badge Intro */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Atendimento de Excelência & Imóveis Verificados em Colombo e RMC</span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-serif tracking-tight leading-tight max-w-4xl mx-auto drop-shadow-md">
          Encontre o imóvel ideal <br className="hidden sm:inline" />
          <span className="text-blue-200">
            para você e sua família.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-2xl mx-auto font-sans font-medium leading-relaxed">
          Terrenos, Áreas, Casas e Oportunidades com a segurança de quem atua há mais de 9 anos no mercado.
        </p>

        {/* Main Search Bar Box - White Card with Blue Accents */}
        <div className="mt-8 lg:mt-12 bg-white rounded-2xl p-4 sm:p-6 shadow-2xl shadow-slate-950/40 max-w-5xl mx-auto text-left border border-slate-100">
          
          {/* Tabs for Negotiation Type */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 mb-5">
            <div className="flex space-x-1.5 bg-slate-100 p-1.5 rounded-xl">
              {(['Venda', 'Aluguel', 'Todos'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setPurpose(tab)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                    purpose === tab 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'text-slate-600 hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {tab === 'Venda' ? 'Comprar' : tab === 'Aluguel' ? 'Alugar' : tab}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              
              {/* Tipo de Imóvel */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Home className="w-3.5 h-3.5 text-blue-600" />
                  <span>Tipo de Imóvel</span>
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyType | 'Todos')}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors cursor-pointer"
                >
                  <option value="Todos">Todos os tipos</option>
                  <option value="Terreno">Terreno / Área / Rural</option>
                  <option value="Casa">Casa / Sobrado</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Apartamento">Apartamento</option>
                </select>
              </div>

              {/* Cidade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cidade</span>
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-medium focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors cursor-pointer"
                >
                  <option value="Todas">Todas as cidades</option>
                  <option value="Colombo">Colombo - PR</option>
                  <option value="Bocaiúva do Sul">Bocaiúva do Sul - PR</option>
                  <option value="Curitiba">Curitiba - PR</option>
                  <option value="Pinhais">Pinhais - PR</option>
                  <option value="Campina Grande do Sul">Campina Grande do Sul</option>
                  <option value="Quatro Barras">Quatro Barras - PR</option>
                  <option value="Almirante Tamandaré">Almirante Tamandaré</option>
                </select>
              </div>

              {/* Bairro */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center space-x-1">
                  <Building className="w-3.5 h-3.5 text-blue-600" />
                  <span>Bairro</span>
                </label>
                <input
                  type="text"
                  placeholder="Ex: Maracanã, Osasco..."
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm font-medium placeholder-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-colors"
                />
              </div>

            </div>

            {/* Submit Action Bar */}
            <div className="pt-2 flex justify-end border-t border-slate-100">
              <button
                type="submit"
                id="search-properties-main-btn"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-900/25 flex items-center justify-center space-x-2 transition-all transform active:scale-98"
              >
                <Search className="w-5 h-5 text-white" />
                <span>Buscar Imóveis</span>
              </button>
            </div>

          </form>

        </div>

      </div>

    </section>
  );
};
