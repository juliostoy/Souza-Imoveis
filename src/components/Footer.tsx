import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { PageView } from '../types';
import { COMPANY_INFO } from '../data/mockData';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
}) => {
  return (
    <footer id="footer-main" className="bg-[#0b1e36] text-blue-100 border-t border-blue-900 font-sans">
      
      {/* Upper Footer Main Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Address */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <Logo variant="compact" />
            </div>

            <p className="text-xs text-blue-100 leading-relaxed max-w-sm">
              "{COMPANY_INFO.bio}"
            </p>

            <div className="pt-2 text-xs space-y-2.5 text-blue-100">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block font-semibold">{COMPANY_INFO.address}</strong>
                  <span className="text-blue-200 text-[11px]">Maracanã, Colombo - PR</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-bold">
                  {COMPANY_INFO.phone} (WhatsApp)
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-400" />
                <span>{COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200 font-semibold pt-1">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>{COMPANY_INFO.creci} • {COMPANY_INFO.yearsInMarket}</span>
              </div>
            </div>
          </div>

          {/* Coluna Nossos Serviços */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800 pb-2">
              Nossos Serviços
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <button onClick={() => onNavigate('imoveis')} className="text-blue-100 hover:text-white transition-colors text-left block">
                  <strong className="text-white block font-semibold">Venda de Imóveis</strong>
                  <span className="text-[11px] text-blue-200">Áreas, Terrenos, Casas e Sobrados</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('imoveis')} className="text-blue-100 hover:text-white transition-colors text-left block">
                  <strong className="text-white block font-semibold">Administração & Locação</strong>
                  <span className="text-[11px] text-blue-200">Gestão completa e repasse garantido</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="text-blue-100 hover:text-white transition-colors text-left block">
                  <strong className="text-blue-200 block font-semibold flex items-center gap-1">
                    <FileCheck className="w-3.5 h-3.5 inline text-amber-400" /> Avaliação Pericial (PTAM)
                  </strong>
                  <span className="text-[11px] text-blue-200">Mercado, Inventários e Perícias</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('imoveis')} className="text-blue-400 hover:text-blue-300 font-bold transition-colors block pt-1">
                  Ver Todos os Imóveis →
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna Horário de Funcionamento */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800 pb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" /> Horário de Atendimento
            </h4>
            <div className="bg-blue-900/40 p-3 rounded-xl border border-blue-800/60 mb-4 text-xs space-y-1.5">
              <div className="flex justify-between items-center text-white font-bold">
                <span>Seg a Sex:</span>
                <span>08:30h às 18h</span>
              </div>
              <div className="flex justify-between items-center text-blue-300 text-[11px]">
                <span>Sáb e Dom:</span>
                <span className="text-rose-300 font-semibold">Fechado</span>
              </div>
            </div>

            <a 
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=Olá,%20gostaria%20de%20atendimento.`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-md transition-all border border-emerald-400/30"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984 0 1.763.459 3.486 1.332 5.003L2 22l5.127-1.337c1.464.799 3.111 1.22 4.88 1.22 5.507 0 9.991-4.478 9.991-9.984 0-2.667-1.038-5.175-2.925-7.062A9.925 9.925 0 0 0 12.012 2zm0 18.257c-1.583 0-3.132-.422-4.482-1.22l-.322-.191-3.324.867.887-3.238-.21-.334a8.216 8.216 0 0 1-1.265-4.387c.002-4.551 3.708-8.256 8.261-8.256 2.206 0 4.28.859 5.838 2.418 1.558 1.559 2.416 3.633 2.415 5.839 0 4.552-3.707 8.257-8.256 8.257zm4.536-6.195c-.249-.125-1.472-.726-1.7-.809-.228-.083-.394-.125-.56.125-.166.249-.643.809-.789.975-.145.166-.29.187-.539.062a6.793 6.793 0 0 1-2.001-1.233 7.488 7.488 0 0 1-1.385-1.723c-.145-.249-.016-.384.109-.508.113-.112.249-.29.373-.435.125-.145.166-.249.249-.415.083-.166.042-.311-.021-.435-.062-.125-.56-1.349-.768-1.847-.203-.486-.41-.42-.56-.427l-.477-.008c-.166 0-.435.062-.663.311s-.871.851-.871 2.076c0 1.224.892 2.407 1.017 2.573.125.166 1.756 2.682 4.254 3.761.594.257 1.058.41 1.42.525.597.19 1.14.163 1.57.099.48-.071 1.472-.602 1.68-1.183.207-.581.207-1.079.145-1.183-.062-.104-.228-.166-.477-.291z"/>
              </svg>
              <span>Falar no WhatsApp</span>
            </a>
          </div>

          {/* Coluna Links Rápido & Legal */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800 pb-2">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('imoveis')} className="hover:text-white transition-colors">
                  Buscar Imóveis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sobre')} className="hover:text-white transition-colors">
                  Sobre a Souza & Souza
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contato')} className="hover:text-white transition-colors">
                  Fale Conosco / Endereço
                </button>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#08172b] border-t border-blue-900/80 py-6 px-4 sm:px-8 text-center">
        <div className="max-w-7xl mx-auto text-xs text-blue-200">
          <p>© {new Date().getFullYear()} Souza & Souza Imóveis - Todos os direitos reservados. Colombo - Paraná.</p>
        </div>
      </div>
    </footer>
  );
};
