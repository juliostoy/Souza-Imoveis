import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { ScheduleVisitModal } from './ScheduleVisitModal';
import { COMPANY_INFO } from '../data/mockData';
import { 
  Heart, 
  Share2, 
  MapPin, 
  Maximize, 
  BedDouble, 
  Bath, 
  Car, 
  Calendar, 
  Check, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Building,
  Sparkles,
  Grid,
  Images,
  Camera
} from 'lucide-react';

interface PropertyDetailModalProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard navigation for Lightbox and Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % property.images.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, property.images.length, onClose]);

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
      alert('Link do imóvel copiado!');
    }
  };

  const handleWhatsAppContact = () => {
    const msg = `Olá! Gostaria de obter mais informações sobre o imóvel CÓD ${property.code}: ${property.title} em ${property.neighborhood}, ${property.city}. Valor R$ ${property.price.toLocaleString('pt-BR')}.`;
    window.open(`https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const nextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <>
      {/* Main Property Details Modal */}
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200">
        
        <div 
          className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Sticky Header */}
          <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-center space-x-3 min-w-0">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[#1E90FF] border border-blue-200 flex-shrink-0">
                CÓD: {property.code}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate font-serif">
                {property.title}
              </h2>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Compartilhar"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorite(property.id)}
                className={`p-2 rounded-xl border transition-all ${
                  isFavorite 
                    ? 'bg-rose-500 text-white border-rose-400' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-rose-500 border-slate-200'
                }`}
                title={isFavorite ? 'Remover Favorito' : 'Adicionar aos Favoritos'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 transition-colors"
                title="Fechar (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
            
            {/* Top Section: Photo Viewer + Key Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Expandable Photo Gallery */}
              <div className="lg:col-span-7 space-y-3">
                
                {/* Main Active Image Display */}
                <div 
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer group shadow-md"
                >
                  <img 
                    src={property.images[activeImageIndex]} 
                    alt={`${property.title} - Foto ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />

                  {/* Photo Counter */}
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold">
                    {activeImageIndex + 1} / {property.images.length} fotos
                  </div>

                  {/* Expand Lightbox & Gallery Buttons */}
                  <div className="absolute top-3 right-3 flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowFullGallery(true);
                      }}
                      className="bg-slate-900/80 hover:bg-slate-900 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg backdrop-blur-md transition-all hover:scale-105 border border-slate-700"
                    >
                      <Grid className="w-3.5 h-3.5 text-[#1E90FF]" />
                      <span>Todas as Fotos ({property.images.length})</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      className="bg-white/90 hover:bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg backdrop-blur-md transition-all hover:scale-105"
                    >
                      <Maximize className="w-3.5 h-3.5 text-[#1E90FF]" />
                      <span className="hidden sm:inline">Tela Cheia</span>
                    </button>
                  </div>

                  {/* Next / Prev Image Controls */}
                  {property.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 transition-colors"
                        title="Foto Anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/70 text-white hover:bg-slate-900 transition-colors"
                        title="Próxima Foto"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Hover Callout to Expand */}
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="inline-flex items-center space-x-1.5 text-xs text-white bg-slate-900/80 px-3 py-1 rounded-full backdrop-blur-md font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-3.5 h-3.5 text-[#1E90FF]" />
                      <span>Clique na foto para ampliar em detalhes</span>
                    </span>
                  </div>
                </div>

                {/* Thumbnails Row & Full Gallery Trigger */}
                {property.images.length > 1 && (
                  <div className="space-y-2">
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
                      {property.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                            activeImageIndex === idx 
                              ? 'border-[#1E90FF] ring-2 ring-blue-400/30 scale-105' 
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`Miniatura ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0.5 right-1 text-[10px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                            #{idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setShowFullGallery(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-[#1E90FF] border border-slate-200 hover:border-blue-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all group"
                    >
                      <Grid className="w-4 h-4 text-[#1E90FF] group-hover:scale-110 transition-transform" />
                      <span>Ver todas as {property.images.length} fotos em Grade Completa</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Information & Actions */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Badges & Category */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-3 py-1 rounded-lg bg-[#1E90FF] text-white text-xs font-bold">
                    {property.purpose === 'Venda e Aluguel' ? 'Venda e Locação' : property.purpose === 'Aluguel' ? 'Aluguel' : 'Venda'}
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200">
                    {property.type}
                  </span>
                  {property.badge && (
                    <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold">
                      {property.badge}
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-medium">Valores de Investimento</p>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1E90FF] font-sans">
                    {property.rentalPrice ? 'Venda: ' : ''}R$ {property.price.toLocaleString('pt-BR')}
                    {property.purpose === 'Aluguel' && !property.rentalPrice && <span className="text-xs font-normal text-slate-600"> / mês</span>}
                  </div>
                  {property.rentalPrice && (
                    <div className="text-lg sm:text-xl font-bold text-emerald-700 font-sans mt-1">
                      Locação: R$ {property.rentalPrice.toLocaleString('pt-BR')} <span className="text-xs font-normal text-slate-600">/ mês</span>
                    </div>
                  )}
                  {property.condoFee && property.condoFee > 0 ? (
                    <p className="text-xs text-slate-600 mt-1">
                      Condomínio: <strong>R$ {property.condoFee.toLocaleString('pt-BR')}</strong>/mês
                    </p>
                  ) : null}
                </div>

                {/* Location Line */}
                <div className="flex items-start space-x-2 text-slate-700 text-xs sm:text-sm bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <MapPin className="w-4 h-4 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900">{property.neighborhood}, {property.city} - {property.state}</strong>
                    <span className="text-slate-500 text-xs">{property.address}</span>
                  </div>
                </div>

                {/* Specs Metric Cards */}
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-2.5">
                    <div className="p-2 rounded-lg bg-blue-100/70 text-[#1E90FF] flex-shrink-0">
                      <Maximize className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">Área Total</span>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">{property.area.toLocaleString('pt-BR')} m²</span>
                    </div>
                  </div>

                  {property.bedrooms > 0 && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-blue-100/70 text-[#1E90FF] flex-shrink-0">
                        <BedDouble className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block">Dormitórios</span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {property.bedrooms} {property.suites > 0 ? `(${property.suites} suíte)` : ''}
                        </span>
                      </div>
                    </div>
                  )}

                  {property.bathrooms > 0 && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-blue-100/70 text-[#1E90FF] flex-shrink-0">
                        <Bath className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block">Banheiros</span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">{property.bathrooms}</span>
                      </div>
                    </div>
                  )}

                  {property.parkingSpaces > 0 && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center space-x-2.5">
                      <div className="p-2 rounded-lg bg-blue-100/70 text-[#1E90FF] flex-shrink-0">
                        <Car className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-500 font-medium block">Vagas Garagem</span>
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900">{property.parkingSpaces}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* WhatsApp Contact Lead Button */}
                <button
                  onClick={handleWhatsAppContact}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm flex items-center justify-center space-x-2 shadow-md transition-all border border-emerald-400/30"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003L2 22l5.127-1.337c1.464.799 3.111 1.22 4.88 1.22 5.507 0 9.991-4.478 9.991-9.984 0-2.667-1.038-5.175-2.925-7.062A9.925 9.925 0 0 0 12.012 2zm0 18.257c-1.583 0-3.132-.422-4.482-1.22l-.322-.191-3.324.867.887-3.238-.21-.334a8.216 8.216 0 0 1-1.265-4.387c.002-4.551 3.708-8.256 8.261-8.256 2.206 0 4.28.859 5.838 2.418 1.558 1.559 2.416 3.633 2.415 5.839 0 4.552-3.707 8.257-8.256 8.257zm4.536-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.789.975-.145.166-.29.187-.539.062a6.793 6.793 0 0 1-2.001-1.233 7.488 7.488 0 0 1-1.385-1.723c-.145-.249-.016-.384.109-.508.113-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.203-.486-.41-.42-.56-.427l-.477-.008c-.166 0-.435.062-.663.311s-.871.851-.871 2.076c0 1.224.892 2.407 1.017 2.573.125.166 1.756 2.682 4.254 3.761.594.257 1.058.41 1.42.525.597.19 1.14.163 1.57.099.48-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
                  </svg>
                  <span>Falar no WhatsApp sobre este Imóvel</span>
                </button>

                {/* Secondary Action Buttons */}
                <div>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E90FF] border border-blue-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-[#1E90FF]" />
                    <span>Agendar Visita ao Imóvel</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Description Section */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Building className="w-4 h-4 text-[#1E90FF]" />
                <span>Sobre o Imóvel</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features Checklist Grid */}
            {property.features && property.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                  <Check className="w-4 h-4 text-[#1E90FF]" />
                  <span>Destaques e Características</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {property.features.map((feat, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium flex items-center space-x-1.5 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5 text-[#1E90FF] flex-shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer */}
          <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between text-xs text-slate-500">
            <span>Souza & Souza Imóveis &copy; Todos os direitos reservados.</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold"
            >
              Fechar Detalhes
            </button>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox Overlay for High-Res Detail Inspection */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white z-10">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-blue-600">
                {property.code}
              </span>
              <span className="text-sm font-semibold truncate max-w-md hidden sm:inline">
                {property.title}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-300 bg-white/10 px-3 py-1 rounded-full">
                Foto {activeImageIndex + 1} de {property.images.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                title="Fechar fotos (Esc)"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image */}
          <div 
            className="flex-1 flex items-center justify-center relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={property.images[activeImageIndex]} 
              alt={`${property.title} - Foto ${activeImageIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl transition-all"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-xl transition-all border border-slate-700"
                  title="Anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-xl transition-all border border-slate-700"
                  title="Próxima"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Lightbox Bottom Thumbnail Bar */}
          {property.images.length > 1 && (
            <div 
              className="flex justify-center space-x-2 overflow-x-auto py-2 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-[#1E90FF] ring-2 ring-blue-400 scale-105' 
                      : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Full Photo Gallery Grid Modal */}
      {showFullGallery && (
        <div 
          className="fixed inset-0 z-[80] bg-slate-950/90 backdrop-blur-lg flex flex-col p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowFullGallery(false)}
        >
          {/* Header */}
          <div 
            className="flex items-center justify-between text-white pb-4 mb-4 border-b border-slate-800 z-10 max-w-6xl w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                  CÓD: {property.code}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white truncate max-w-lg">
                  Galeria de Fotos — {property.title}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Exibindo todas as {property.images.length} fotos do imóvel. Clique em qualquer imagem para abrir em tela cheia.
              </p>
            </div>

            <button
              onClick={() => setShowFullGallery(false)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center space-x-2 border border-slate-700"
            >
              <X className="w-5 h-5" />
              <span className="text-xs font-bold hidden sm:inline">Fechar Galeria</span>
            </button>
          </div>

          {/* Grid View of All Photos */}
          <div 
            className="flex-1 overflow-y-auto max-w-6xl w-full mx-auto pr-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-8">
              {property.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setActiveImageIndex(idx);
                    setIsLightboxOpen(true);
                  }}
                  className="group relative h-52 sm:h-56 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <img 
                    src={img} 
                    alt={`${property.title} - Foto ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />
                  
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-mono font-bold border border-slate-700">
                    Foto #{idx + 1}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-white/90 text-slate-900 px-2.5 py-1 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1 shadow-md">
                    <Eye className="w-3.5 h-3.5 text-[#1E90FF]" />
                    <span>Ampliar</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal Nested */}
      {showScheduleModal && (
        <ScheduleVisitModal
          property={property}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </>
  );
};
