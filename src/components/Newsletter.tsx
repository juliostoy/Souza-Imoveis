import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <section id="newsletter-section" className="py-16 bg-slate-950 border-b border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 mx-auto flex items-center justify-center text-blue-400 mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Receba imóveis exclusivos em primeira mão
          </h3>

          <p className="text-slate-400 text-sm mt-2 max-w-xl mx-auto">
            Inscreva-se na nossa curadoria semanal e seja notificado sobre oportunidades com preços abaixo da avaliação de mercado.
          </p>

          {submitted ? (
            <div className="mt-6 p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center justify-center space-x-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5" />
              <span>Cadastro realizado com sucesso! Verifique sua caixa de entrada.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Digite seu e-mail principal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-3 text-sm focus:border-blue-500 placeholder-slate-600"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center justify-center space-x-1.5 shadow-lg flex-shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Cadastrar</span>
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-500 mt-3">
            Respeitamos sua privacidade. Cancele sua inscrição quando quiser com 1 clique.
          </p>

        </div>

      </div>
    </section>
  );
};
