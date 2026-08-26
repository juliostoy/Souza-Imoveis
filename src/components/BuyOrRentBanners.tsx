import React from 'react';
import { ShoppingBag, KeyRound, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface BuyOrRentBannersProps {
  onSelectBuy: () => void;
  onSelectRent: () => void;
}

export const BuyOrRentBanners: React.FC<BuyOrRentBannersProps> = ({ onSelectBuy, onSelectRent }) => {
  return (
    <section id="buy-or-rent-section" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card Comprar */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-sm group hover:border-blue-400 hover:shadow-xl transition-all">
            
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/50 transition-all" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-6 shadow-sm">
                <ShoppingBag className="w-6 h-6" />
              </div>

              <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
                Para Compradores
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-2 mb-4">
                Compre seu terreno ou casa com segurança
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                A Souza & Souza é especialista em casas, terrenos e áreas em Colombo e Região Metropolitana. Análise rigorosa de matrículas e assessoria jurídica completa.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Análise completa de matrículas e documentação</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Atendimento transparente e mais de 9 anos de tradição</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={onSelectBuy}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Quero Comprar Imóvel</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Card Alugar */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 p-8 sm:p-10 flex flex-col justify-between shadow-sm group hover:border-blue-400 hover:shadow-xl transition-all">
            
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl group-hover:bg-blue-200/50 transition-all" />

            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-6 shadow-sm">
                <KeyRound className="w-6 h-6" />
              </div>

              <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
                Para Inquilinos & Proprietários
              </span>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif mt-2 mb-4">
                Locação e Administração de Imóveis
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                Alugamos e administramos seu imóvel com máxima pontualidade, vistoria detalhada e tranquilidade para o proprietário e inquilino.
              </p>

              <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Análise de crédito ágil para locação sem fiador</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Gestão completa de aluguel e vistoria fotográfica</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200">
              <button
                onClick={onSelectRent}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md"
              >
                <span>Buscar Aluguel / Administrar</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
