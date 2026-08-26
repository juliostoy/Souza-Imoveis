import React, { useState } from 'react';
import { Property } from '../types';
import { Calendar, Clock, Video, UserCheck, X, CheckCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

interface ScheduleVisitModalProps {
  property: Property;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ property, onClose }) => {
  const [visitType, setVisitType] = useState<'Presencial' | 'Online'>('Presencial');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Format date for display if available
    let formattedDate = selectedDate;
    if (selectedDate) {
      const parts = selectedDate.split('-');
      if (parts.length === 3) {
        formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }

    const msg = `Olá! Gostaria de agendar uma visita para o imóvel.

📋 *DADOS DO AGENDAMENTO:*
- *Código do Imóvel:* ${property.code}
- *Imóvel:* ${property.title}
- *Localização:* ${property.neighborhood}, ${property.city} - ${property.state}
- *Valor:* R$ ${property.price.toLocaleString('pt-BR')}

🗓 *DETALHES DA VISITA:*
- *Tipo:* Visita ${visitType}
- *Data:* ${formattedDate}
- *Horário:* ${selectedTime}

👤 *DADOS DO CLIENTE:*
- *Nome:* ${name}
- *Telefone/WhatsApp:* ${phone}

Aguardo a confirmação da visita!`;

    // Open WhatsApp with prompt
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.vendasWhatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#1E90FF] text-xs font-bold uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>Atendimento Exclusivo Souza & Souza</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
          Agendar Visita ao Imóvel
        </h3>

        <p className="text-xs text-slate-600 mt-1 mb-4">
          CÓD: <strong className="text-[#1E90FF]">{property.code}</strong> - {property.title}
        </p>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Visita Solicitada com Sucesso!</h4>
            <p className="text-xs text-slate-600">
              Redirecionando para o WhatsApp com todos os dados da sua visita (Código <strong className="text-[#1E90FF]">{property.code}</strong>, data, horário e modalidade) prontos para envio.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center space-x-1.5 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>WhatsApp Aberto com Sucesso</span>
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Visit Type Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setVisitType('Presencial')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  visitType === 'Presencial' ? 'bg-[#1E90FF] text-white shadow' : 'text-slate-600'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Visita Presencial</span>
              </button>

              <button
                type="button"
                onClick={() => setVisitType('Online')}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-colors ${
                  visitType === 'Online' ? 'bg-slate-900 text-white shadow' : 'text-slate-600'
                }`}
              >
                <Video className="w-4 h-4" />
                <span>Tour Virtual Online</span>
              </button>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Data Desejada</label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Horário Preferencial</label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
                >
                  <option value="09:00">09:00</option>
                  <option value="10:30">10:30</option>
                  <option value="14:00">14:00</option>
                  <option value="16:00">16:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Seu Nome Completo</label>
              <input
                type="text"
                required
                placeholder="Ex: Roberto Silva"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">WhatsApp / Telefone</label>
              <input
                type="tel"
                required
                placeholder="(41) 98524-6105"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors mt-2"
            >
              Confirmar Solicitacão de Visita
            </button>

          </form>
        )}

      </div>
    </div>
  );
};
