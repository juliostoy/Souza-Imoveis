import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle, Building2, Star, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [subject, setSubject] = useState('Quero Comprar um Imóvel');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div id="contact-page" className="min-h-screen bg-slate-50 text-slate-900 py-12 px-4 sm:px-6 lg:px-8 font-sans space-y-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#1E90FF] text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-1.5 mb-2">
            <Phone className="w-4 h-4" />
            <span>Atendimento Personalizado</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-slate-900">
            Fale com a Souza & Souza Imóveis
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Sua imobiliária de confiança em Colombo, Curitiba e Região Metropolitana. Atendimento via telefone, WhatsApp ou diretamente em nossa sede.
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-1 border border-emerald-100">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">WhatsApp por Setor</h4>
            
            <div className="text-xs space-y-1 pt-1">
              <div>
                <span className="text-[11px] text-slate-500 block">Vendas e Locação:</span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Vendas e Locação.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-extrabold text-emerald-600 hover:underline"
                >
                  {COMPANY_INFO.vendasPhone}
                </a>
              </div>

              <div className="pt-1">
                <span className="text-[11px] text-slate-500 block">Inquilinos e Proprietários:</span>
                <a
                  href={`https://wa.me/${COMPANY_INFO.inquilinosWhatsapp}?text=${encodeURIComponent('Olá! Gostaria de atendimento para Inquilinos e Proprietários.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-extrabold text-blue-600 hover:underline"
                >
                  {COMPANY_INFO.inquilinosPhone}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto mb-2 border border-amber-100">
              <Star className="w-5 h-5 fill-amber-500" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Avaliação no Google</h4>
            <p className="text-sm font-extrabold text-slate-900">{COMPANY_INFO.googleRating} de 5.0 ★★★★★</p>
            <span className="text-[10px] text-slate-500">{COMPANY_INFO.googleReviewsCount.toLocaleString('pt-BR')} avaliações reais</span>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E90FF] flex items-center justify-center mx-auto mb-2 border border-blue-100">
              <Mail className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Atendimento por E-mail</h4>
            <p className="text-xs text-slate-600 truncate">{COMPANY_INFO.email}</p>
            <p className="text-[10px] text-slate-500">Resposta em horário comercial</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl text-center space-y-2 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mx-auto mb-2 border border-slate-200">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-sm">Horário Comercial</h4>
            <p className="text-xs text-slate-600">Seg a Sex: 08:30–12h / 13:30–18h</p>
            <p className="text-[10px] text-[#1E90FF] font-semibold">Quarta: abre 08:00h</p>
          </div>
        </div>

        {/* Contact Form & Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm space-y-6">
            <h3 className="text-xl font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
              Envie uma Mensagem Direta
            </h3>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-slate-900">Mensagem Enviada com Sucesso!</h4>
                <p className="text-xs text-slate-600">
                  Obrigado, <strong>{name}</strong>! Nossa equipe entrará em contato via WhatsApp/Telefone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Assunto do Atendimento</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
                  >
                    <option value="Quero Comprar Casa, Terreno ou Área">Quero Comprar Casa, Terreno ou Área</option>
                    <option value="Quero Alugar um Imóvel">Quero Alugar um Imóvel</option>
                    <option value="Quero Anunciar meu Imóvel (Venda/Locação)">Quero Anunciar meu Imóvel (Venda/Locação)</option>
                    <option value="Avaliação Pericial PTAM / Perícia Judicial / Inventário">Avaliação Pericial PTAM / Perícia Judicial / Inventário</option>
                    <option value="Administração de Locações">Administração de Locações</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Seu Nome Completo</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: João da Silva"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="(41) 98524-6105"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Mensagem ou Detalhes</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Descreva o imóvel que procura ou o serviço que necessita..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>

          {/* Location Map & Detailed Opening Hours Card */}
          <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900 border-b border-slate-100 pb-3 mb-4">
                Localização & Horário Detalhado
              </h3>
              
              <div className="flex items-start space-x-3 text-xs text-slate-600 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <MapPin className="w-6 h-6 text-[#1E90FF] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-bold block text-sm mb-0.5">Souza & Souza Imóveis</strong>
                  <span>{COMPANY_INFO.address}</span>
                  <span className="block text-slate-500 text-[11px] mt-1">Maracanã, Colombo - Paraná (CEP: {COMPANY_INFO.zipCode})</span>
                </div>
              </div>

              {/* Hours List */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-[#1E90FF] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E90FF]" /> Horários de Atendimento na Sede:
                </h4>
                {COMPANY_INFO.openingHours.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-600">{item.day}</span>
                    <span className={item.hours === 'Fechado' ? 'text-rose-600 font-bold' : 'text-slate-900 font-semibold'}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative w-full h-48 bg-blue-50 rounded-2xl overflow-hidden border border-blue-200 flex items-center justify-center">
              <div className="relative z-10 text-center p-4">
                <div className="w-12 h-12 rounded-full bg-[#1E90FF] text-white flex items-center justify-center mx-auto mb-2 shadow-md">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-900 block">Souza & Souza Imóveis</span>
                <span className="text-[10px] text-[#1E90FF] font-semibold">{COMPANY_INFO.street} - Maracanã</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
