import React from 'react';
import { Property } from '../types';
import { PropertyCard } from './PropertyCard';
import { Heart, X, MessageSquare, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  favorites: string[];
  properties: Property[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onClose: () => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  favorites,
  properties,
  onToggleFavorite,
  onSelectProperty,
  onClose,
}) => {
  const favoriteProperties = properties.filter((p) => favorites.includes(p.id));

  const handleShareListWhatsApp = () => {
    const codes = favoriteProperties.map((p) => {
      const priceFormatted = p.purpose === 'Aluguel' && p.rentalPrice 
        ? `R$ ${p.rentalPrice.toLocaleString('pt-BR')}/mês` 
        : `R$ ${p.price.toLocaleString('pt-BR')}`;
      return `• CÓD ${p.code}: ${p.title} (${priceFormatted})`;
    }).join('\n');
    const msg = `Olá! Salvei os seguintes imóveis favoritos no site da Souza & Souza Imóveis:\n\n${codes}\n\nGostaria de mais informações e simulação.`;
    window.open(`https://wa.me/5541985246105?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full h-[85vh] flex flex-col justify-between relative shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <h3 className="text-lg font-bold text-slate-900 font-serif">
              Seus Imóveis Favoritos ({favoriteProperties.length})
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-50">
          {favoriteProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={true}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProperty={(p) => {
                    onSelectProperty(p);
                    onClose();
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-500">
              <Heart className="w-16 h-16 text-slate-300 mb-3" />
              <p className="text-base font-semibold text-slate-700">Você ainda não possui imóveis favoritos salvos.</p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                Clique no ícone de coração nos cards de imóveis para salvá-los e compará-los depois.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {favoriteProperties.length > 0 && (
          <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => favoriteProperties.forEach((p) => onToggleFavorite(p.id))}
              className="text-xs text-rose-500 hover:underline flex items-center space-x-1 font-semibold"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar Favoritos</span>
            </button>

            <button
              onClick={handleShareListWhatsApp}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enviar Lista Salva via WhatsApp</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
