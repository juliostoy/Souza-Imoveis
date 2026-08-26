import React from 'react';
import { PlusCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

interface SellCTAProps {
  onOpenAnunciarModal: () => void;
}

export const SellCTA: React.FC<SellCTAProps> = ({ onOpenAnunciarModal }) => {
  return (
    <section id="sell-cta-section" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-blue-50/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-[#0B132B] via-blue-900 to-[#0B132B] border border-blue-500/30 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-white">
          
          <div className="max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Avaliação Gratuita & Pericial PTAM</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-serif tracking-tight leading-tight">
              Quer vender ou alugar seu imóvel em Colombo e RMC?
            </h2>

            <p className="mt-4 text-slate-200 text-sm sm:text-base leading-relaxed">
              Anuncie com a Souza & Souza. Atuamos há mais de 9 anos vendendo terrenos, casas e áreas com divulgação de alta performance e repasse garantido.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-200">
              <span className="flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Avaliação Pericial Gratuita</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Divulgação sem Custos Iniciais</span>
              </span>
              <span className="flex items-center space-x-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Atendimento de Excelência</span>
              </span>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button
              id="anunciar-cta-btn"
              onClick={onOpenAnunciarModal}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-slate-100 text-blue-900 font-extrabold text-base shadow-2xl flex items-center space-x-3 transition-all transform hover:scale-105"
            >
              <PlusCircle className="w-5 h-5 text-blue-700" />
              <span>Anuncie seu imóvel</span>
              <ArrowRight className="w-5 h-5 text-blue-700" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
