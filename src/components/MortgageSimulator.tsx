import React, { useState } from 'react';
import { Calculator, DollarSign, Landmark, ArrowRight } from 'lucide-react';

interface MortgageSimulatorProps {
  propertyPrice: number;
}

export const MortgageSimulator: React.FC<MortgageSimulatorProps> = ({ propertyPrice }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20% de entrada
  const [termYears, setTermYears] = useState<number>(30); // 30 anos (360 meses)
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(9.5); // 9.5% ao ano (taxa média Caixa)

  const downPaymentValue = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentValue;
  const totalMonths = termYears * 12;

  // Calculo aproximado Sistema SAC (primeira parcela)
  const monthlyInterest = annualInterestRate / 12 / 100;
  const monthlyAmortization = loanAmount / totalMonths;
  const firstInstallment = monthlyAmortization + (loanAmount * monthlyInterest);
  const lastInstallment = monthlyAmortization + (monthlyAmortization * monthlyInterest);

  return (
    <div id="mortgage-simulator-box" className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md space-y-5">
      
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
        <Landmark className="w-5 h-5 text-[#1E90FF]" />
        <h3 className="font-extrabold text-slate-900 text-base font-serif">
          Simulador de Financiamento Imobiliário
        </h3>
      </div>

      <p className="text-xs text-slate-600">
        Simule as condições de crédito imobiliário com apoio e assessoria gratuita da Souza & Souza Imóveis.
      </p>

      {/* Input Controls Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Entrada % */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Entrada ({downPaymentPercent}%)
          </label>
          <select
            value={downPaymentPercent}
            onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
          >
            <option value={10}>10% (R$ {(propertyPrice * 0.1).toLocaleString('pt-BR')})</option>
            <option value={20}>20% (R$ {(propertyPrice * 0.2).toLocaleString('pt-BR')})</option>
            <option value={30}>30% (R$ {(propertyPrice * 0.3).toLocaleString('pt-BR')})</option>
            <option value={50}>50% (R$ {(propertyPrice * 0.5).toLocaleString('pt-BR')})</option>
          </select>
        </div>

        {/* Prazo Anos */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Prazo de Pagamento
          </label>
          <select
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
          >
            <option value={10}>10 Anos (120 meses)</option>
            <option value={15}>15 Anos (180 meses)</option>
            <option value={20}>20 Anos (240 meses)</option>
            <option value={30}>30 Anos (360 meses)</option>

          </select>
        </div>

        {/* Taxa de Juros a.a. */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Taxa Estimada a.a.
          </label>
          <select
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(Number(e.target.value))}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3 py-2 text-xs focus:border-[#1E90FF]"
          >
            <option value={8.5}>8,5% a.a. (Caixa/SFH)</option>
            <option value={9.5}>9,5% a.a. (Média do mercado)</option>
            <option value={10.5}>10,5% a.a. (SFI)</option>
          </select>
        </div>

      </div>

      {/* Calculated Results Banner */}
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <span className="text-[11px] text-slate-600 block">Valor Financiado</span>
          <span className="text-sm font-bold text-slate-900">
            R$ {loanAmount.toLocaleString('pt-BR')}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-600 block">Primeira Parcela (SAC)</span>
          <span className="text-base font-extrabold text-[#1E90FF]">
            R$ {Math.round(firstInstallment).toLocaleString('pt-BR')}
          </span>
        </div>

        <div>
          <span className="text-[11px] text-slate-600 block">Última Parcela (SAC)</span>
          <span className="text-sm font-bold text-emerald-600">
            R$ {Math.round(lastInstallment).toLocaleString('pt-BR')}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-500 text-center">
        *Valores aproximados para simulação de crédito. Sujeito à aprovação bancária e análise cadastral pela instituição financeira.
      </div>

    </div>
  );
};
