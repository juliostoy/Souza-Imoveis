import React, { useState, useEffect } from 'react';
import { Property, FilterState, PageView, PropertyType } from './types';
import { INITIAL_PROPERTIES, TESTIMONIALS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FeaturedProperties } from './components/FeaturedProperties';
import { PropertyCard } from './components/PropertyCard';
import { BuyOrRentBanners } from './components/BuyOrRentBanners';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { StatsCounter } from './components/StatsCounter';
import { PartnersSection } from './components/PartnersSection';
import { PropertyFilterSidebar } from './components/PropertyFilterSidebar';
import { PropertyDetailPage } from './components/PropertyDetailPage';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { FavoritesModal } from './components/FavoritesModal';
import { SellCTA } from './components/SellCTA';
import { AnunciarImovelModal } from './components/AnunciarImovelModal';
import { LayoutGrid, List, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_FILTERS: FilterState = {
  purpose: 'Todos',
  type: 'Todos',
  city: '',
  neighborhood: '',
  minPrice: 0,
  maxPrice: 10000000,
  minBedrooms: 0,
  minSuites: 0,
  minBathrooms: 0,
  minParking: 0,
  minArea: 0,
  maxArea: 10000,
  code: '',
  selectedFeatures: [],
  sortBy: 'recent',
  viewMode: 'grid',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [properties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('souza_favorites');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Only preserve IDs that exist in INITIAL_PROPERTIES
          return parsed.filter((id: string) => INITIAL_PROPERTIES.some((p) => p.id === id));
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Modals state
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  const [showAnunciarModal, setShowAnunciarModal] = useState(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      const valid = favorites.filter((id) => properties.some((p) => p.id === id));
      localStorage.setItem('souza_favorites', JSON.stringify(valid));
    } catch (e) {
      console.error('Erro ao salvar favoritos:', e);
    }
  }, [favorites, properties]);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProperty]);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    if (page !== 'imovel-detalhe') {
      setSelectedProperty(null);
    }
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  const handleHeroSearch = (searchFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...searchFilters }));
    setCurrentPage('imoveis');
  };

  const handleSelectCategory = (type: PropertyType) => {
    setFilters((prev) => ({ ...prev, type }));
    setCurrentPage('imoveis');
  };

  // Filter properties logic
  const filteredProperties = properties.filter((p) => {
    if (filters.purpose !== 'Todos') {
      if (filters.purpose === 'Venda') {
        const isVenda = p.purpose === 'Venda' || p.purpose === 'Venda e Aluguel' || (p.price && p.price > 0 && p.purpose !== 'Aluguel');
        if (!isVenda) return false;
      } else if (filters.purpose === 'Aluguel') {
        const isAluguel = p.purpose === 'Aluguel' || p.purpose === 'Venda e Aluguel' || (p.rentalPrice && p.rentalPrice > 0);
        if (!isAluguel) return false;
      } else if (p.purpose !== filters.purpose) {
        return false;
      }
    }
    if (filters.type !== 'Todos' && p.type !== filters.type) return false;
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.neighborhood && !p.neighborhood.toLowerCase().includes(filters.neighborhood.toLowerCase())) return false;
    if (filters.minBedrooms > 0 && p.bedrooms < filters.minBedrooms) return false;
    if (filters.minSuites > 0 && p.suites < filters.minSuites) return false;
    if (filters.minBathrooms > 0 && p.bathrooms < filters.minBathrooms) return false;
    if (filters.minParking > 0 && p.parkingSpaces < filters.minParking) return false;
    
    const effectivePrice = filters.purpose === 'Aluguel' ? (p.rentalPrice || p.price) : p.price;
    if (filters.minPrice > 0 && effectivePrice < filters.minPrice) return false;
    if (filters.maxPrice > 0 && effectivePrice > filters.maxPrice) return false;
    if (filters.minArea > 0 && p.area < filters.minArea) return false;
    if (filters.maxArea > 0 && p.area > filters.maxArea) return false;

    if (filters.code && !p.code.toLowerCase().includes(filters.code.toLowerCase())) return false;

    if (filters.selectedFeatures && filters.selectedFeatures.length > 0) {
      const hasAllFeatures = filters.selectedFeatures.every((f) => p.features.includes(f));
      if (!hasAllFeatures) return false;
    }

    return true;
  });

  // Sort properties logic
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = filters.purpose === 'Aluguel' ? (a.rentalPrice || a.price) : a.price;
    const priceB = filters.purpose === 'Aluguel' ? (b.rentalPrice || b.price) : b.price;
    if (filters.sortBy === 'price-asc') return priceA - priceB;
    if (filters.sortBy === 'price-desc') return priceB - priceA;
    if (filters.sortBy === 'area-desc') return b.area - a.area;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950">
      
      {/* Sticky Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        favoritesCount={favorites.filter((id) => properties.some((p) => p.id === id)).length}
        onOpenFavorites={() => setShowFavoritesModal(true)}
        onOpenAnunciarModal={() => setShowAnunciarModal(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            <HeroSection
              onSearch={handleHeroSearch}
            />

            <FeaturedProperties
              properties={properties}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectProperty={handleSelectProperty}
              onViewAll={() => handleNavigate('imoveis')}
            />

            <CategoriesSection onSelectCategory={handleSelectCategory} properties={properties} />

            <BuyOrRentBanners
              onSelectBuy={() => handleHeroSearch({ purpose: 'Venda' })}
              onSelectRent={() => handleHeroSearch({ purpose: 'Aluguel' })}
            />

            <SellCTA onOpenAnunciarModal={() => setShowAnunciarModal(true)} />

            <WhyChooseUs />

            <HowItWorks />

            <StatsCounter />

            <PartnersSection />
          </>
        )}

        {/* PAGE 2: IMÓVEIS (Property Listing Page) */}
        {currentPage === 'imoveis' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            {/* Header & Controls bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-4xl font-bold text-white font-serif">
                  Catálogo de Imóveis
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Exibindo <strong className="text-amber-300 font-bold">{sortedProperties.length}</strong> de {properties.length} imóveis cadastrados.
                </p>
              </div>

              {/* View mode & Sorting controls */}
              <div className="flex flex-wrap items-center gap-3">
                
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="lg:hidden px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 flex items-center space-x-1.5"
                >
                  <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                  <span>Filtros ({sortedProperties.length})</span>
                </button>

                {/* Sorting Dropdown */}
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
                  className="bg-slate-900 border border-slate-800 text-white text-xs font-semibold rounded-xl px-3 py-2.5 focus:border-blue-500"
                >
                  <option value="recent">Mais Recentes</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="area-desc">Maior Área m²</option>
                </select>

                {/* View Mode Switches */}
                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'grid' }))}
                    className={`p-2 rounded-lg text-xs transition-colors ${
                      filters.viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização em Grade"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setFilters((prev) => ({ ...prev, viewMode: 'list' }))}
                    className={`p-2 rounded-lg text-xs transition-colors ${
                      filters.viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Visualização em Lista"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

            {/* Layout Grid: Sidebar Filters + Main Property Catalog */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Desktop Sidebar Filters */}
              <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
                <PropertyFilterSidebar
                  filters={filters}
                  onChangeFilters={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
                  onResetFilters={() => setFilters(DEFAULT_FILTERS)}
                  totalResults={sortedProperties.length}
                />
              </div>

              {/* Main Catalog View */}
              <div className="lg:col-span-3 space-y-6">
                
                {sortedProperties.length > 0 ? (
                  <div className={
                    filters.viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }>
                    {sortedProperties.map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        isFavorite={favorites.includes(property.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onSelectProperty={handleSelectProperty}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
                    <p className="text-slate-300 text-base font-semibold">Nenhum imóvel encontrado com os filtros selecionados.</p>
                    <p className="text-xs text-slate-500">Tente ajustar a faixa de preço, cidade ou limpar alguns critérios de busca.</p>
                    <button
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
                    >
                      Limpar Filtros
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* PAGE 3: IMÓVEL DETALHE */}
        {currentPage === 'imovel-detalhe' && selectedProperty && (
          <PropertyDetailPage
            property={selectedProperty}
            allProperties={properties}
            isFavorite={favorites.includes(selectedProperty.id)}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => setCurrentPage('imoveis')}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {/* PAGE 4: SOBRE */}
        {currentPage === 'sobre' && <AboutPage />}

        {/* PAGE 6: CONTATO */}
        {currentPage === 'contato' && <ContactPage />}

      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
      />

      {/* Global Modals */}
      {selectedProperty && currentPage !== 'imovel-detalhe' && (
        <PropertyDetailModal
          property={selectedProperty}
          isFavorite={favorites.includes(selectedProperty.id)}
          onToggleFavorite={handleToggleFavorite}
          onClose={() => setSelectedProperty(null)}
        />
      )}

      {showFavoritesModal && (
        <FavoritesModal
          favorites={favorites}
          properties={properties}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={handleSelectProperty}
          onClose={() => setShowFavoritesModal(false)}
        />
      )}

      {showAnunciarModal && (
        <AnunciarImovelModal
          onClose={() => setShowAnunciarModal(false)}
        />
      )}

    </div>
  );
}
