import React, { useState } from 'react';
import { Building2, Award, ShieldCheck, Users, Target, Heart, Sparkles, MapPin, Phone, Star, FileCheck, Key, Home, Navigation, ExternalLink, Copy, Check, Compass } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const mapEmbedUrl = "https://maps.google.com/maps?q=Estr.+Da+Ribeira,+145+-+Maracan%C3%A3,+Colombo+-+PR,+83408-424&t=&z=16&ie=UTF8&iwloc=&output=embed";
  const mapDirectionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Estr.+Da+Ribeira,+145+-+Maracan%C3%A3,+Colombo+-+PR,+83408-424";

  const pillars = [
    {
      icon: Home,
      title: 'Venda de Terrenos, Áreas & Casas',
      subtitle: 'Foco no mercado de Colombo e Região Metropolitana',
      text: 'Atuamos fortemente na comercialização de terrenos urbanos e industriais, grandes áreas para desenvolvimento e investimento, casas e sobrados. (Nota: não focamos em apartamentos e lançamentos, salvo em ocasiões especiais).'
    },
    {
      icon: Key,
      title: 'Administração de Imóveis e Locações',
      subtitle: 'Tranquilidade e segurança para proprietários',
      text: 'Oferecemos gestão completa de locação de imóveis residenciais e comerciais. Realizamos vistorias fotográficas rigorosas, triagem cadastral criteriosa e garantimos a pontualidade do seu repasse mensal.'
    },
    {
      icon: FileCheck,
      title: 'Avaliação Pericial & Judicial (PTAM)',
      subtitle: 'Laudos técnicos oficiales e periciais',
      text: 'Elaboramos Pareceres Técnicos de Avaliação Mercadológica (PTAM) tanto para o mercado de compra/venda/locação quanto para Perícias Judiciais (Inventários, Processos Judiciais, Partilha de Bens, Execuções e Vistorias de Conformidade).'
    },
    {
      icon: Star,
      title: 'Excelência Reconhecida no Google',
      subtitle: 'Mais de 400 avaliações de clientes satisfeitos',
      text: 'Construímos uma trajetória pautada pela honestidade, agilidade e transparência. Somos orgulhosamente a imobiliária mais avaliada e bem cotada de Colombo e região com nota 4.8 no Google.'
    }
  ];

  return (
    <div id="about-page" className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans space-y-16">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded-full text-[#1E90FF] text-xs font-bold uppercase tracking-wider shadow-sm">
            <Building2 className="w-4 h-4" />
            <span>Há mais de 9 Anos no Mercado Imobiliário</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif leading-tight text-slate-900">
            Souza & Souza Imóveis
          </h1>

          <p className="text-[#1E90FF] text-lg sm:text-xl font-medium italic max-w-2xl mx-auto">
            "{COMPANY_INFO.bio}"
          </p>

          {/* Badge Grid Stats */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs font-medium">
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-sm">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span><strong className="text-slate-900 text-sm">4.8 / 5.0</strong> (+400 avaliações)</span>
            </div>

            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-sm">
              <MapPin className="w-5 h-5 text-[#1E90FF]" />
              <span>Colombo, Curitiba e Região Metropolitana</span>
            </div>

            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-xl flex items-center space-x-2 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>{COMPANY_INFO.creci}</span>
            </div>
          </div>
        </div>

        {/* Pillars / Services Grid */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-slate-900">
              Nossas Especialidades e Atuação
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Entenda por que somos a imobiliária mais completa para você Vender, Alugar e Administrar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 hover:border-[#1E90FF] p-8 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E90FF]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-serif">{item.title}</h3>
                    <span className="text-xs text-[#1E90FF] font-semibold block">{item.subtitle}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location & Contact Section */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <span className="text-[#1E90FF] text-xs font-bold uppercase tracking-wider">
                Venha nos visitar
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
                Nossa Sede em Colombo - PR
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Estamos estrategicamente localizados no bairro Maracanã, em Colombo, prontos para oferecer o melhor suporte imobiliário da Região Metropolitana de Curitiba.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <MapPin className="w-5 h-5 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Endereço Completo:</strong>
                    <span className="text-slate-600">{COMPANY_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">Telefone & WhatsApp:</strong>
                    <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:underline font-bold">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Table */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-slate-900 font-serif flex items-center space-x-2 border-b border-slate-200 pb-3">
                <span>Horários de Funcionamento</span>
              </h3>
              <div className="space-y-2 text-xs">
                {COMPANY_INFO.openingHours.map((item, idx) => (
                  <div key={idx} className={`flex justify-between py-1.5 px-2 rounded ${item.day === 'Quarta-feira' ? 'bg-blue-50/80 border border-blue-200' : ''}`}>
                    <span className="font-medium text-slate-700">{item.day}</span>
                    <span className={item.hours === 'Fechado' ? 'text-rose-600 font-bold' : 'text-[#1E90FF] font-semibold'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Section */}
        <div id="google-maps-location" className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full text-[#1E90FF] text-xs font-bold uppercase tracking-wider mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Localização Interativa</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <span>Google Maps - Nossa Sede</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Utilize o mapa interativo abaixo para visualizar nossa localização exata e traçar sua rota até a Souza & Souza Imóveis.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleCopyAddress}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center space-x-2 transition-colors border border-slate-200"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-600 font-bold">Endereço Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-600" />
                    <span>Copiar Endereço</span>
                  </>
                )}
              </button>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white text-xs font-bold flex items-center space-x-2 shadow-md transition-all hover:shadow-lg"
              >
                <Navigation className="w-4 h-4" />
                <span>Como Chegar (Rota no Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full h-[450px] sm:h-[500px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <iframe
              title="Google Maps Location - Souza & Souza Imóveis"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-2xl"
            />
          </div>

          {/* Map Footnote & Address Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E90FF] flex items-center justify-center flex-shrink-0 font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-slate-900 block font-semibold">Souza & Souza Imóveis</strong>
                <span className="text-slate-600">{COMPANY_INFO.address}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-slate-500 text-[11px] self-end sm:self-center">
              <span>Bairro Maracanã • Colombo - PR</span>
              <span>•</span>
              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#1E90FF] hover:underline font-semibold flex items-center space-x-1"
              >
                <span>Abrir no Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
