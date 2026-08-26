import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Home, 
  Building, 
  Trees, 
  Store, 
  MessageSquare, 
  Copy, 
  Check, 
  Car, 
  Bed, 
  Bath, 
  Maximize2, 
  Sparkles,
  ChevronLeft
} from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface AnunciarImovelModalProps {
  onClose: () => void;
}

type PropertyCategory = 'casa' | 'apartamento' | 'terreno' | 'comercial' | 'chacara';

export const AnunciarImovelModal: React.FC<AnunciarImovelModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState<PropertyCategory>('casa');
  const [purpose, setPurpose] = useState<'Venda' | 'Aluguel' | 'Venda e Aluguel'>('Venda');
  
  // Specific specs
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [parkingSpaces, setParkingSpaces] = useState('2');
  const [hasSuite, setHasSuite] = useState(false);
  const [hasBalcony, setHasBalcony] = useState(false);
  const [isFurnished, setIsFurnished] = useState(false);

  // Terreno specs
  const [landArea, setLandArea] = useState('');
  const [landType, setLandType] = useState('Plano');
  const [hasAsphalt, setHasAsphalt] = useState(true);
  const [hasWaterPower, setHasWaterPower] = useState(true);
  const [isDeeded, setIsDeeded] = useState(true); // Escriturado / Registrado
  const [isWalled, setIsWalled] = useState(false);

  // Common details
  const [city, setCity] = useState('Colombo');
  const [neighborhood, setNeighborhood] = useState('');
  const [expectedPrice, setExpectedPrice] = useState('');
  const [description, setDescription] = useState('');

  // Owner info
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [copied, setCopied] = useState(false);

  // Category labels and icons
  const categoryOptions: { id: PropertyCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'casa', label: 'Casa', icon: Home },
    { id: 'apartamento', label: 'Apartamento', icon: Building },
    { id: 'terreno', label: 'Terreno / Lote', icon: Trees },
    { id: 'comercial', label: 'Comercial / Galpão', icon: Store },
    { id: 'chacara', label: 'Chácara / Sítio', icon: Trees },
  ];

  // Helper to construct WhatsApp message text
  const generateWhatsAppMessage = () => {
    let msg = `Olá, equipe *${COMPANY_INFO.name}*!\n`;
    msg += `Tenho interesse em anunciar/vender meu imóvel com vocês. Seguem as informações:\n\n`;

    const catName = categoryOptions.find(c => c.id === category)?.label || category;
    msg += `📌 *Tipo de Imóvel:* ${catName}\n`;
    msg += `💼 *Finalidade:* ${purpose}\n`;
    if (city || neighborhood) {
      msg += `📍 *Localização:* ${neighborhood ? neighborhood + ', ' : ''}${city || 'Colombo'} - PR\n`;
    }
    if (expectedPrice) {
      msg += `💰 *Valor Pretendido:* R$ ${expectedPrice}\n`;
    }

    if (category === 'casa' || category === 'apartamento') {
      msg += `🛏️ *Quartos:* ${bedrooms}\n`;
      msg += `🚿 *Banheiros:* ${bathrooms}\n`;
      msg += `🚗 *Vagas de Garagem:* ${parkingSpaces}\n`;
      const extras = [];
      if (hasSuite) extras.push('Possui Suíte');
      if (hasBalcony) extras.push('Possui Sacada/Varanda');
      if (isFurnished) extras.push('Mobiliado');
      if (extras.length > 0) {
        msg += `✨ *Destaques:* ${extras.join(', ')}\n`;
      }
    } else if (category === 'terreno') {
      if (landArea) msg += `📐 *Área Aproximada:* ${landArea} m²\n`;
      msg += `🏔️ *Topografia/Perfil:* ${landType}\n`;
      const landExtras = [];
      if (hasAsphalt) landExtras.push('Rua Asfaltada');
      if (hasWaterPower) landExtras.push('Água e Luz');
      if (isDeeded) landExtras.push('Escriturado/Registrado');
      if (isWalled) landExtras.push('Murado');
      if (landExtras.length > 0) {
        msg += `⚡ *Infraestrutura:* ${landExtras.join(', ')}\n`;
      }
    } else {
      if (landArea) msg += `📐 *Área Aproximada:* ${landArea} m²\n`;
    }

    if (description.trim()) {
      msg += `📝 *Descrição do Proprietário:* ${description.trim()}\n`;
    }

    msg += `\n👤 *Proprietário:* ${ownerName || 'Não informado'}\n`;
    if (ownerPhone) msg += `📞 *Contato/WhatsApp:* ${ownerPhone}\n`;

    msg += `\nAguardo o contato para agendarmos a avaliação gratuita!`;

    return msg;
  };

  const handleOpenWhatsApp = () => {
    const rawText = generateWhatsAppMessage();
    const encodedText = encodeURIComponent(rawText);
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = () => {
    const text = generateWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-5 sm:p-8 relative shadow-2xl animate-in zoom-in-95 my-auto max-h-[92vh] overflow-y-auto text-slate-900">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-2 text-[#1E90FF] text-xs font-bold uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4 text-[#1E90FF]" />
          <span>Anuncie seu Imóvel</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
          Venda ou Alugue com a Souza & Souza
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 mt-1 mb-6 leading-relaxed">
          Preencha os detalhes do seu imóvel. Geramos automaticamente um resumo completo pronto para enviar ao nosso WhatsApp de avaliação de mercado.
        </p>

        {/* Wizard Steps Bar */}
        <div className="flex items-center justify-between mb-8 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setStep(1)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              step === 1 ? 'bg-[#1E90FF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-black">1</span>
            <span>Tipo e Dados</span>
          </button>

          <button
            onClick={() => setStep(2)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              step === 2 ? 'bg-[#1E90FF] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-black">2</span>
            <span>Detalhes & Proprietário</span>
          </button>

          <button
            onClick={() => setStep(3)}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 ${
              step === 3 ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center font-black">3</span>
            <span>Anunciar WhatsApp</span>
          </button>
        </div>

        {/* STEP 1: Select Property Type & Basic Info */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Category selection grid */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Selecione o Tipo do seu Imóvel:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {categoryOptions.map((opt) => {
                  const IconComp = opt.icon;
                  const isSelected = category === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCategory(opt.id)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col items-center text-center space-y-2 transition-all ${
                        isSelected
                          ? 'border-[#1E90FF] bg-blue-50/90 text-[#1E90FF] shadow-md ring-2 ring-blue-400/30 font-bold'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#1E90FF] text-white' : 'bg-slate-200 text-slate-700'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Purpose: Venda vs Aluguel */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Pretensão do Negócio:
              </label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                {(['Venda', 'Aluguel', 'Venda e Aluguel'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPurpose(p)}
                    className={`py-2 text-xs font-bold rounded-xl transition-all ${
                      purpose === p
                        ? 'bg-[#1E90FF] text-white shadow'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Location fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cidade</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Colombo, Curitiba..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bairro</label>
                <input
                  type="text"
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  placeholder="Ex: Maracanã, Osasco, Atuba..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Valor Pretendido de Venda/Locação (R$)</label>
              <input
                type="text"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(e.target.value)}
                placeholder="Ex: 450.000 (ou insira 'A avaliar')"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-3.5 rounded-2xl bg-[#1E90FF] hover:bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95"
            >
              <span>Próximo Passo: Especificações</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

        {/* STEP 2: Type Specific Fields (Casa/Apto vs Terreno) & Owner Info */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* IF CASA OR APARTAMENTO */}
            {(category === 'casa' || category === 'apartamento') && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-[#1E90FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Home className="w-4 h-4" />
                  <span>Características da {category === 'casa' ? 'Casa' : 'Apartamento'}</span>
                </h4>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5 text-blue-600" /> Quartos
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-2.5 py-2 text-xs font-bold"
                    >
                      <option value="1">1 Quarto</option>
                      <option value="2">2 Quartos</option>
                      <option value="3">3 Quartos</option>
                      <option value="4">4 Quartos</option>
                      <option value="5+">5+ Quartos</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5 text-blue-600" /> Banheiros
                    </label>
                    <select
                      value={bathrooms}
                      onChange={(e) => setBathrooms(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-2.5 py-2 text-xs font-bold"
                    >
                      <option value="1">1 Banheiro</option>
                      <option value="2">2 Banheiros</option>
                      <option value="3">3 Banheiros</option>
                      <option value="4+">4+ Banheiros</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Car className="w-3.5 h-3.5 text-blue-600" /> Vagas
                    </label>
                    <select
                      value={parkingSpaces}
                      onChange={(e) => setParkingSpaces(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-2.5 py-2 text-xs font-bold"
                    >
                      <option value="Sem vaga">Sem vaga</option>
                      <option value="1">1 Vaga</option>
                      <option value="2">2 Vagas</option>
                      <option value="3">3 Vagas</option>
                      <option value="4+">4+ Vagas</option>
                    </select>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex flex-wrap gap-3 pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasSuite}
                      onChange={(e) => setHasSuite(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Possui Suíte</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasBalcony}
                      onChange={(e) => setHasBalcony(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Possui Varanda / Sacada</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isFurnished}
                      onChange={(e) => setIsFurnished(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Mobiliado / Semimobiliado</span>
                  </label>
                </div>
              </div>
            )}

            {/* IF TERRENO */}
            {category === 'terreno' && (
              <div className="space-y-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-xs font-bold text-[#1E90FF] uppercase tracking-wider flex items-center gap-1.5">
                  <Trees className="w-4 h-4" />
                  <span>Especificações do Terreno / Lote</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-blue-600" /> Área Aproximada (m²)
                    </label>
                    <input
                      type="text"
                      value={landArea}
                      onChange={(e) => setLandArea(e.target.value)}
                      placeholder="Ex: 360 m², 1.000 m²..."
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Topografia / Perfil</label>
                    <select
                      value={landType}
                      onChange={(e) => setLandType(e.target.value)}
                      className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs font-medium"
                    >
                      <option value="Plano">Plano</option>
                      <option value="Aclive">Aclive (Subida)</option>
                      <option value="Declive">Declive (Caída)</option>
                      <option value="Esquina">Terreno de Esquina</option>
                      <option value="Lote em Condomínio">Lote em Condomínio Fechado</option>
                      <option value="Área Industrial / Comercial">Área Comercial / Industrial</option>
                    </select>
                  </div>
                </div>

                {/* Infraestrutura Checkboxes */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasAsphalt}
                      onChange={(e) => setHasAsphalt(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Rua Asfaltada</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={hasWaterPower}
                      onChange={(e) => setHasWaterPower(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Rede de Água e Energia</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isDeeded}
                      onChange={(e) => setIsDeeded(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Escriturado / Matrícula OK</span>
                  </label>

                  <label className="flex items-center space-x-2 text-xs text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isWalled}
                      onChange={(e) => setIsWalled(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <span>Terreno Murado / Cercado</span>
                  </label>
                </div>
              </div>
            )}

            {/* IF OTHER (Comercial / Chacara) */}
            {(category === 'comercial' || category === 'chacara') && (
              <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Área Aproximada (m²)
                </label>
                <input
                  type="text"
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value)}
                  placeholder="Ex: 500 m², 20.000 m²..."
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs font-medium"
                />
              </div>
            )}

            {/* Property Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Descrição do Imóvel / Observações
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Conte um pouco sobre os pontos fortes do seu imóvel (ex: edícula nos fundos, recém-reformado, aceita carro como parte de pagamento, etc...)"
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl p-3 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Owner Details */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Dados de Contato do Proprietário
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Ex: João da Silva"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Seu WhatsApp / Telefone</label>
                  <input
                    type="tel"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    placeholder="(41) 98524-6105"
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-200 flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Voltar</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center space-x-2"
              >
                <span>Ver Resumo e Enviar WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STEP 3: WhatsApp Prompt Preview & Direct Contact */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in">
            
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-xs flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-emerald-950">Seu anúncio está pronto!</p>
                <p className="text-emerald-800 mt-0.5">
                  Montamos um resumo formatado para o nosso corretor de plantão na Souza & Souza Imóveis. Clique no botão abaixo para abrir diretamente no seu WhatsApp!
                </p>
              </div>
            </div>

            {/* Message Preview Box */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Prévia da Mensagem Formatada:
                </label>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl text-xs font-mono whitespace-pre-line leading-relaxed max-h-56 overflow-y-auto border border-slate-800 select-all shadow-inner">
                {generateWhatsAppMessage()}
              </div>
            </div>

            {/* Direct WhatsApp Call to Action */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm flex items-center justify-center space-x-2.5 shadow-xl transition-all transform hover:scale-[1.01] active:scale-98"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>ANUNCIAR AGORA VIA WHATSAPP</span>
              </button>

              <p className="text-[11px] text-center text-slate-500">
                Ou se preferir, ligue diretamente para o número <strong>{COMPANY_INFO.phone}</strong>.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center space-x-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Editar Informações</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Fechar
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
