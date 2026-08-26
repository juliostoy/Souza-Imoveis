import React, { useState } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Heart, 
  User, 
  PlusCircle, 
  Menu, 
  X, 
  Star,
  MapPin
} from 'lucide-react';
import { PageView } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { Logo } from './Logo';

interface HeaderProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenAnunciarModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
  onOpenAnunciarModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { label: string; page: PageView }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Imóveis', page: 'imoveis' },
    { label: 'Sobre Nós', page: 'sobre' },
    { label: 'Contato', page: 'contato' },
  ];

  return (
    <header id="header-main" className="sticky top-0 z-40 bg-white/98 backdrop-blur-md border-b border-slate-200 text-slate-900 shadow-sm transition-all">
      {/* Top Bar - Deep Midnight Navy Theme */}
      <div className="bg-[#0B132B] text-white text-xs py-2 px-4 sm:px-8 shadow-inner hidden sm:block">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{COMPANY_INFO.name}</span>
              <span className="opacity-40">|</span>
              <span className="text-amber-400 font-medium">{COMPANY_INFO.creci}</span>
            </span>

            <span className="hidden xl:inline text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-amber-400 inline" /> Colombo, Curitiba e Região Metropolitana
            </span>
          </div>

          <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-xs">
            {/* Vendas e Locação */}
            <a 
              href={`https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Vendas e Locação.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 group"
              title="Atendimento Vendas e Locação"
            >
              <span className="text-slate-300 font-medium group-hover:text-emerald-300 transition-colors">Vendas e locação:</span>
              <span className="inline-flex items-center space-x-1 bg-emerald-600 group-hover:bg-emerald-500 text-white font-extrabold px-2.5 py-1 rounded-md shadow-sm transition-all">
                <MessageSquare className="w-3 h-3 fill-current text-emerald-100 group-hover:scale-110 transition-transform" />
                <span>{COMPANY_INFO.vendasPhone}</span>
              </span>
            </a>

            {/* Inquilinos e Proprietários */}
            <a 
              href={`https://wa.me/${COMPANY_INFO.inquilinosWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Inquilinos e Proprietários.')}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 group"
              title="Atendimento Inquilinos e Proprietários"
            >
              <span className="text-slate-300 font-medium group-hover:text-blue-300 transition-colors">Inquilinos e Proprietários:</span>
              <span className="inline-flex items-center space-x-1 bg-blue-600 group-hover:bg-blue-500 text-white font-extrabold px-2.5 py-1 rounded-md shadow-sm transition-all">
                <MessageSquare className="w-3 h-3 fill-current text-blue-100 group-hover:scale-110 transition-transform" />
                <span>{COMPANY_INFO.inquilinosPhone}</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button 
          id="logo-button"
          onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
          className="flex items-center space-x-3 text-left group focus:outline-none hover:opacity-95 transition-opacity"
        >
          <Logo variant="compact" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                id={`nav-item-${item.page}`}
                onClick={() => onNavigate(item.page)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive 
                    ? 'text-blue-700 bg-blue-50/80 border-b-2 border-blue-600 font-bold' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons & Quick Controls */}
        <div className="hidden md:flex items-center space-x-3">
          
          {/* Anunciar Imóvel Button */}
          <button
            id="header-anunciar-btn"
            onClick={onOpenAnunciarModal}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs shadow-md transition-all transform active:scale-95 border border-amber-300"
            title="Anuncie seu imóvel com a Souza & Souza"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>ANUNCIAR IMÓVEL</span>
          </button>

          {/* Favorites Button */}
          <button
            id="favorites-drawer-btn"
            onClick={onOpenFavorites}
            className="relative px-3 py-2 rounded-xl bg-slate-100 text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors border border-slate-200 flex items-center space-x-1.5 text-xs font-bold"
            title="Seus Imóveis Favoritos"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            <span>Favoritos</span>
            <span className="px-1.5 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm min-w-[18px]">
              {favoritesCount}
            </span>
          </button>

          {/* Direct Catalog Link */}
          <button
            id="header-ver-imoveis-btn"
            onClick={() => onNavigate('imoveis')}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white shadow-md shadow-blue-900/15 transition-all transform active:scale-95"
          >
            <span>Ver Imóveis</span>
          </button>

        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            id="mobile-favorites-btn"
            onClick={onOpenFavorites}
            className="relative px-2.5 py-2 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 flex items-center space-x-1.5 text-xs font-bold"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
            <span>Favoritos</span>
            <span className="px-1.5 py-0.2 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-100 text-slate-800 hover:text-[#1E90FF] focus:outline-none border border-slate-200"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex items-center space-x-2 bg-slate-900 text-white p-3 rounded-xl text-xs border border-slate-800 font-medium">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400 flex-shrink-0" />
            <span><strong>{COMPANY_INFO.googleRating} estrelas</strong> • {COMPANY_INFO.googleReviewsCount.toLocaleString('pt-BR')} avaliações no Google</span>
          </div>

          <div className="space-y-1 border-b border-slate-100 pb-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  currentPage === item.page 
                    ? 'bg-blue-50 text-blue-700 font-bold' 
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={() => { onOpenAnunciarModal(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 text-sm font-black shadow-md border border-amber-300"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              <span>ANUNCIAR IMÓVEL</span>
            </button>

            <button
              onClick={() => { onNavigate('imoveis'); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-sm font-bold shadow-md"
            >
              <span>Ver Imóveis Disponíveis</span>
            </button>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Atendimento via WhatsApp:</p>

              <a 
                href={`https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Vendas e Locação.')}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 text-xs font-bold"
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
                  <span>Vendas e Locação</span>
                </div>
                <span className="text-emerald-700 font-black">{COMPANY_INFO.vendasPhone}</span>
              </a>

              <a 
                href={`https://wa.me/${COMPANY_INFO.inquilinosWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Inquilinos e Proprietários.')}`}
                target="_blank" 
                rel="noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-blue-50 text-blue-950 border border-blue-200 text-xs font-bold"
              >
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-blue-600 fill-blue-600/20" />
                  <span>Inquilinos e Proprietários</span>
                </div>
                <span className="text-blue-700 font-black">{COMPANY_INFO.inquilinosPhone}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
