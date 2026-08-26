import React, { useState } from 'react';
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
  Phone, 
  MessageSquare, 
  Calendar, 
  Check, 
  ArrowLeft, 
  Video, 
  Compass, 
  UserCheck, 
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Eye,
  X
} from 'lucide-react';

interface PropertyDetailPageProps {
  property: Property;
  allProperties: Property[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onSelectProperty: (property: Property) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  property,
  allProperties,
  isFavorite,
  onToggleFavorite,
  onBack,
  onSelectProperty,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'fotos' | 'tour' | 'video' | 'mapa'>('fotos');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadMessage, setLeadMessage] = useState(`Olá, gostaria de agendar uma visita e obter mais informações sobre o imóvel Código ${property.code}.`);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.type === property.type || p.city === property.city))
    .slice(0, 3);

  const handleShare = () => {
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

  const handleDirectWhatsApp = () => {
    const msg = `Olá! Tenho interesse no imóvel CÓD ${property.code}: ${property.title} (${property.neighborhood}, ${property.city}). Valor R$ ${property.price.toLocaleString('pt-BR')}.`;
    window.open(`https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setTimeout(() => {
      setLeadSubmitted(false);
    }, 4000);
  };

  return (
    <div id="property-detail-page" className="min-h-screen bg-slate-50 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 font-semibold text-xs border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#1E90FF]" />
            <span>Voltar para a Busca</span>
          </button>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-md bg-blue-50 text-[#1E90FF] border border-blue-200">
              CÓDIGO: {property.code}
            </span>
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm"
              title="Compartilhar"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 rounded-xl border transition-all ${
                isFavorite 
                  ? 'bg-rose-500 text-white border-rose-400' 
                  : 'bg-white hover:bg-slate-100 text-slate-700 hover:text-rose-500 border-slate-200 shadow-sm'
              }`}
              title={isFavorite ? 'Favoritado' : 'Adicionar aos Favoritos'}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title & Header info */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-md bg-[#1E90FF] text-white text-xs font-bold">
              {property.purpose === 'Venda e Aluguel' ? 'Venda e Locação' : property.purpose === 'Aluguel' ? 'Aluguel' : 'Venda'}
            </span>
            <span className="px-3 py-1 rounded-md bg-slate-200 text-slate-800 text-xs font-semibold">
              {property.type}
            </span>
            {property.badge && (
              <span className="px-3 py-1 rounded-md bg-slate-900 text-white text-xs font-bold">
                {property.badge}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            {property.title}
          </h1>

          <div className="flex items-center space-x-2 text-slate-600 text-xs sm:text-sm mt-2">
            <MapPin className="w-4 h-4 text-[#1E90FF] flex-shrink-0" />
            <span>{property.address} - {property.neighborhood}, {property.city} - {property.state} (CEP: {property.zipCode || '83408-424'})</span>
          </div>
        </div>

        {/* Media Gallery Selector Tabs & Main Viewer */}
        <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md p-4 sm:p-6 space-y-4">
          
          <div className="flex space-x-2 border-b border-slate-100 pb-3">
            <button
              onClick={() => setActiveTab('fotos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'fotos' ? 'bg-[#1E90FF] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Galeria de Fotos ({property.images.length})
            </button>
            <button
              onClick={() => setActiveTab('tour')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                activeTab === 'tour' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Tour Virtual 360°</span>
            </button>
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all ${
                activeTab === 'video' ? 'bg-blue-800 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>Vídeo HD</span>
            </button>
          </div>

          {/* Main Media Display */}
          <div className="relative h-[380px] sm:h-[500px] bg-slate-900 rounded-2xl overflow-hidden group">
            {activeTab === 'fotos' && (
              <>
                <img
                  src={property.images[activeImageIndex]}
                  alt={property.title}
                  onClick={() => setIsLightboxOpen(true)}
                  className="w-full h-full object-cover object-center cursor-pointer group-hover:scale-105 transition-transform duration-500"
                />

                <button
                  onClick={() => setIsLightboxOpen(true)}
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-slate-900 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-lg backdrop-blur-md transition-all group-hover:scale-105"
                >
                  <Maximize className="w-3.5 h-3.5 text-[#1E90FF]" />
                  <span>Ver em Tela Cheia</span>
                </button>
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-950"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}

            {activeTab === 'tour' && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-center p-8 text-white">
                <Compass className="w-16 h-16 text-[#1E90FF] animate-spin-slow mb-4" />
                <h3 className="text-xl font-bold text-white font-serif">Navegação Virtual 360° Interativa</h3>
                <p className="text-xs text-slate-300 max-w-md mt-2 mb-6">
                  Explore todos os cômodos deste imóvel em alta resolução como se estivesse presencialmente no local.
                </p>
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="px-6 py-3 rounded-xl bg-[#1E90FF] text-white font-bold text-xs shadow-lg"
                >
                  Iniciar Tour com Corretor Online
                </button>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-center p-8 text-white">
                <Video className="w-16 h-16 text-[#1E90FF] mb-4" />
                <h3 className="text-xl font-bold text-white font-serif">Vídeo Apresentação em HD</h3>
                <p className="text-xs text-slate-300 max-w-md mt-2 mb-6">
                  Assista à apresentação detalhada dos diferenciais acompanhada pela equipe da Souza & Souza.
                </p>
                <button
                  onClick={handleDirectWhatsApp}
                  className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-lg"
                >
                  Solicitar Vídeo via WhatsApp
                </button>
              </div>
            )}
          </div>

          {/* Thumbnails Row */}
          {activeTab === 'fotos' && (
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === idx ? 'border-[#1E90FF] scale-105' : 'border-slate-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Content Main Columns: Left Details vs Right Lead Contact Box */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Details Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Price & Specs Key Bar */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6">
              
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-500 uppercase tracking-wider block">Valores de Investimento</span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#1E90FF] font-sans">
                    {property.rentalPrice ? 'Venda: ' : ''}R$ {property.price.toLocaleString('pt-BR')}
                    {property.purpose === 'Aluguel' && !property.rentalPrice && <span className="text-sm text-slate-600"> / mês</span>}
                  </div>
                  {property.rentalPrice && (
                    <div className="text-xl sm:text-2xl font-bold text-emerald-700 font-sans mt-1">
                      Locação: R$ {property.rentalPrice.toLocaleString('pt-BR')} <span className="text-xs text-slate-600 font-normal">/ mês</span>
                    </div>
                  )}
                </div>

                <div className="text-right text-xs text-slate-600 space-y-1">
                  {property.condoFee && (
                    <p>Condomínio: <strong className="text-slate-900">R$ {property.condoFee.toLocaleString('pt-BR')}</strong> / mês</p>
                  )}
                  {property.iptuAnnual && (
                    <p>IPTU Anual: <strong className="text-slate-900">R$ {property.iptuAnnual.toLocaleString('pt-BR')}</strong></p>
                  )}
                </div>
              </div>

              {/* Specs Box - Grid de Métricas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                  <div className="p-2.5 rounded-xl bg-blue-100 text-[#1E90FF] flex-shrink-0">
                    <Maximize className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-medium block">Área</span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900">{property.area.toLocaleString('pt-BR')} m²</span>
                  </div>
                </div>

                {property.bedrooms > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-[#1E90FF] flex-shrink-0">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Quartos</span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">
                        {property.bedrooms} {property.suites > 0 ? `(${property.suites} suíte)` : ''}
                      </span>
                    </div>
                  </div>
                )}

                {property.bathrooms > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-[#1E90FF] flex-shrink-0">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Banheiros</span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">{property.bathrooms}</span>
                    </div>
                  </div>
                )}

                {property.parkingSpaces > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-[#1E90FF] flex-shrink-0">
                      <Car className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Vagas</span>
                      <span className="text-sm sm:text-base font-extrabold text-slate-900">{property.parkingSpaces}</span>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Description Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
                Descrição do Imóvel
              </h3>
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities Tags */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-4">
              <h3 className="text-xl font-bold text-slate-900 font-serif border-b border-slate-100 pb-3">
                Diferenciais & Infraestrutura
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-800"
                  >
                    <Check className="w-4 h-4 text-[#1E90FF] flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Lead Contact Column */}
          <div className="space-y-6">
            
            {/* Broker Info & Contact Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-6 sticky top-28">
              
              <div className="flex items-center space-x-4 border-b border-slate-100 pb-4">
                <img
                  src={property.broker.avatar}
                  alt={property.broker.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#1E90FF]"
                />
                <div>
                  <span className="text-[10px] text-[#1E90FF] font-bold uppercase tracking-wider block">Corretor Souza & Souza</span>
                  <h4 className="text-base font-bold text-slate-900">{property.broker.name}</h4>
                  <p className="text-xs text-slate-500">CRECI: {property.broker.creci}</p>
                </div>
              </div>

              {/* Direct Quick Action CTAs */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowScheduleModal(true)}
                  className="w-full py-3.5 px-4 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-colors"
                >
                  <Calendar className="w-4 h-4 text-white" />
                  <span>Agendar Visita ao Imóvel</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Falar Direto no WhatsApp</span>
                </button>
              </div>

              {/* Lead Contact Form */}
              <div className="pt-4 border-t border-slate-100">
                <h5 className="text-xs font-bold text-slate-800 mb-3">Envie uma Mensagem Direta</h5>

                {leadSubmitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs text-center space-y-1">
                    <Check className="w-5 h-5 mx-auto text-emerald-600" />
                    <span>Solicitação enviada com sucesso!</span>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp (41) 98524-6105"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
                    />

                    <textarea
                      rows={3}
                      value={leadMessage}
                      onChange={(e) => setLeadMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
                    />

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-800 shadow-sm"
                    >
                      Enviar Mensagem
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>

        </div>

        {/* Similar Properties Section */}
        {similarProperties.length > 0 && (
          <div className="pt-12 border-t border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 font-serif mb-6">
              Imóveis Semelhantes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onSelectProperty(sim)}
                  className="bg-white border border-slate-200 rounded-2xl overflow-hidden p-4 cursor-pointer hover:border-[#1E90FF] shadow-sm hover:shadow-md transition-all flex items-center space-x-4"
                >
                  <img src={sim.images[0]} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div>
                    <span className="text-[10px] text-[#1E90FF] font-mono font-semibold">CÓD: {sim.code}</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{sim.title}</h4>
                    <span className="text-sm font-extrabold text-[#1E90FF] block mt-1">
                      R$ {sim.price.toLocaleString('pt-BR')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Schedule Visit Modal */}
      {showScheduleModal && (
        <ScheduleVisitModal
          property={property}
          onClose={() => setShowScheduleModal(false)}
        />
      )}

      {/* Fullscreen Lightbox Overlay */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-[70] bg-black/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
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
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div 
            className="flex-1 flex items-center justify-center relative my-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={property.images[activeImageIndex]} 
              alt=""
              className="max-h-[80vh] max-w-full object-contain rounded-lg shadow-2xl"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-xl transition-all border border-slate-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % property.images.length)}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white shadow-xl transition-all border border-slate-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

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

    </div>
  );
};
