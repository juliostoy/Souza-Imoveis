import React, { useState } from 'react';
import { 
  Heart, 
  MapPin, 
  Maximize, 
  BedDouble, 
  Bath, 
  Car, 
  MessageSquare, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Camera
} from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Confira este imóvel da Souza & Souza Imóveis: ${property.title} em ${property.neighborhood}, ${property.city}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link do imóvel copiado para a área de transferência!');
    }
  };

  const handleWhatsAppLead = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Olá! Gostaria de mais informações sobre o imóvel Código ${property.code}: ${property.title} - Valor R$ ${property.price.toLocaleString('pt-BR')}.`;
    window.open(`https://wa.me/5541985246105?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div 
      id={`property-card-${property.code.toLowerCase()}`}
      onClick={() => onSelectProperty(property)}
      className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-400 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Box */}
      <div className="relative h-60 bg-slate-100 overflow-hidden">
        
        {/* Active Image */}
        <img 
          src={property.images[currentImageIndex]} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30" />

        {/* Badges Bar (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className="px-2.5 py-1 rounded-md bg-blue-700 text-white text-xs font-bold shadow-sm">
            {property.purpose === 'Venda e Aluguel' ? 'Venda e Locação' : property.purpose === 'Aluguel' ? 'Aluguel' : property.purpose === 'Lançamento' ? 'Lançamento' : 'Venda'}
          </span>
          {property.badge && (
            <span className={`px-2.5 py-1 rounded-md text-xs font-bold shadow-sm ${
              property.badge === 'Exclusivo' ? 'bg-blue-900 text-white' :
              property.badge === 'Oportunidade' ? 'bg-amber-500 text-white' :
              property.badge === 'Destaque' ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-200'
            }`}>
              {property.badge}
            </span>
          )}
          <span className="px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold shadow-sm flex items-center space-x-1 border border-slate-700/50">
            <Camera className="w-3.5 h-3.5 text-blue-400" />
            <span>{property.images.length} fotos</span>
          </span>
        </div>

        {/* Action Controls (Top Right: Favorite & Share) */}
        <div className="absolute top-3 right-3 flex space-x-1.5 z-10">
          <button
            onClick={handleShare}
            className="p-2 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 backdrop-blur-md transition-colors shadow-sm"
            title="Compartilhar imóvel"
          >
            <Share2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
              isFavorite 
                ? 'bg-rose-500 text-white' 
                : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
            }`}
            title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Image Carousel Nav Buttons (Visible on hover if multiple images) */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900 z-10 shadow-md border border-slate-700/50"
              title="Foto anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-slate-900/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-900 z-10 shadow-md border border-slate-700/50"
              title="Próxima foto"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Property Code & Active Photo Index (Bottom Left/Right) */}
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
          <span className="text-[11px] font-mono tracking-wider font-semibold px-2 py-0.5 rounded bg-slate-900/80 text-amber-300 backdrop-blur-sm">
            CÓD: {property.code}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-900/80 text-slate-100 backdrop-blur-sm flex items-center space-x-1">
            <Camera className="w-3 h-3 text-blue-400" />
            <span>{currentImageIndex + 1} / {property.images.length}</span>
          </span>
        </div>

      </div>

      {/* Property Details Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Location / Endereço Line */}
          <div className="flex items-center space-x-1.5 text-slate-600 text-xs font-medium mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span className="truncate" title={property.address || `${property.neighborhood}, ${property.city}`}>
              {property.address ? `${property.address} - ${property.city}` : `${property.neighborhood}, ${property.city} - ${property.state}`}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors leading-snug">
            {property.title}
          </h3>

          {/* Price / Valor */}
          <div className="mt-2.5">
            <div className="flex items-baseline space-x-2">
              <span className="text-xl sm:text-2xl font-extrabold text-blue-900 font-sans">
                R$ {property.price.toLocaleString('pt-BR')}
              </span>
              {property.purpose === 'Aluguel' && (
                <span className="text-xs text-slate-500 font-normal">/ mês</span>
              )}
              {property.purpose === 'Temporada' && (
                <span className="text-xs text-slate-500 font-normal">/ diária</span>
              )}
            </div>
            {property.rentalPrice && (
              <p className="text-xs font-bold text-emerald-700 mt-0.5">
                Locação: R$ {property.rentalPrice.toLocaleString('pt-BR')}/mês
              </p>
            )}
          </div>

          {property.condoFee && property.condoFee > 0 && (
            <p className="text-[11px] text-slate-500 mt-0.5">
              Condomínio: R$ {property.condoFee.toLocaleString('pt-BR')}/mês
            </p>
          )}

          {/* Metrics Specs Row */}
          <div className="flex items-center gap-3 py-2 px-3 my-3 bg-slate-100/70 rounded-xl border border-slate-200/60 text-slate-800 text-xs flex-wrap">
            <div className="flex items-center space-x-1.5">
              <Maximize className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
              <strong className="font-extrabold text-slate-900">{property.area.toLocaleString('pt-BR')} m²</strong>
            </div>

            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1 text-slate-700" title={`${property.bedrooms} Quartos`}>
                <BedDouble className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                <span><strong className="text-slate-900">{property.bedrooms}</strong> {property.bedrooms === 1 ? 'quarto' : 'qts'}</span>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1 text-slate-700" title={`${property.bathrooms} Banheiros`}>
                <Bath className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                <span><strong className="text-slate-900">{property.bathrooms}</strong> {property.bathrooms === 1 ? 'banho' : 'banhos'}</span>
              </div>
            )}

            {property.parkingSpaces > 0 && (
              <div className="flex items-center space-x-1 text-slate-700" title={`${property.parkingSpaces} Vagas de Garagem`}>
                <Car className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                <span><strong className="text-slate-900">{property.parkingSpaces}</strong> {property.parkingSpaces === 1 ? 'vaga' : 'vagas'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer Action Buttons */}
        <div className="flex items-center space-x-2 pt-1">
          <button
            onClick={() => onSelectProperty(property)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-blue-50/90 hover:bg-blue-100/80 text-blue-700 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border border-blue-200/80"
          >
            <Eye className="w-3.5 h-3.5 text-blue-700" />
            <span>Ver Detalhes ({property.images.length} Fotos)</span>
          </button>

          <button
            onClick={handleWhatsAppLead}
            className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center space-x-1 shadow-sm transition-colors"
            title="Contato rápido via WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
