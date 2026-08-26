import React from 'react';
import { Search, CalendarCheck, Handshake, FileSignature } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Escolha seu imóvel',
      description: 'Navegue pelo nosso catálogo exclusivo, use os filtros avançados ou consulte nosso assistente de IA.'
    },
    {
      number: '02',
      icon: CalendarCheck,
      title: 'Agende uma visita',
      description: 'Escolha o melhor dia e horário para visita presencial acompanhada de corretor ou faça um Tour Virtual 360°.'
    },
    {
      number: '03',
      icon: Handshake,
      title: 'Negociação Transparente',
      description: 'Apresente sua proposta. Nossa equipe faz a mediação direta com o proprietário buscando o melhor acordo.'
    },
    {
      number: '04',
      icon: FileSignature,
      title: 'Assinatura do Contrato',
      description: 'Assine digitalmente sem precisar ir ao cartório e receba as chaves do seu novo imóvel com total segurança.'
    },
  ];

  return (
    <section id="how-it-works-section" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#1E90FF] text-xs font-bold uppercase tracking-widest">
            Jornada Simplificada
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mt-2">
            Como Funciona
          </h2>
          <p className="text-slate-600 text-sm mt-3">
            Em apenas 4 passos simples você realiza a conquista do seu novo imóvel.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {steps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between hover:border-[#1E90FF] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {/* Step number badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1E90FF]">
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold text-slate-300 font-serif font-mono">
                    {step.number}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-serif mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
