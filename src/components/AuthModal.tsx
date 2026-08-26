import React, { useState } from 'react';
import { X, User, ShieldCheck, Lock, Mail, Building2 } from 'lucide-react';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isAgent, setIsAgent] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creci, setCreci] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in zoom-in-95">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#1E90FF] text-xs font-bold uppercase tracking-wider mb-1">
          <Building2 className="w-4 h-4" />
          <span>Área Restrita</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 font-serif">
          {isAgent ? 'Portal do Corretor CRECI' : 'Entrar na Sua Conta'}
        </h3>

        <p className="text-xs text-slate-600 mt-1 mb-6">
          Acesse seus imóveis salvos, histórico de visitas e contratos ativos na Souza & Souza.
        </p>

        {loggedIn ? (
          <div className="py-8 text-center space-y-3">
            <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900">Acesso Autorizado!</h4>
            <p className="text-xs text-slate-600">Bem-vindo(a) ao painel restrito da Souza & Souza Imóveis.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Account Type Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setIsAgent(false)}
                className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                  !isAgent ? 'bg-[#1E90FF] text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cliente / Comprador
              </button>

              <button
                type="button"
                onClick={() => setIsAgent(true)}
                className={`py-2 text-xs font-bold rounded-lg transition-colors ${
                  isAgent ? 'bg-slate-900 text-white shadow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Corretor Parceiro
              </button>
            </div>

            {isAgent && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Número do CRECI</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: PR-28491"
                  value={creci}
                  onChange={(e) => setCreci(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs uppercase focus:border-[#1E90FF]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">E-mail Cadastrado</label>
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
              <label className="block text-xs font-medium text-slate-700 mb-1">Senha de Acesso</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:border-[#1E90FF]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#1E90FF] hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors mt-2"
            >
              Acessar Painel
            </button>

            <div className="text-center pt-2">
              <a href="#esqueceu" onClick={(e) => { e.preventDefault(); alert('Um link de redefinição de senha foi enviado para seu e-mail.'); }} className="text-xs text-[#1E90FF] hover:underline font-medium">
                Esqueceu a senha?
              </a>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
