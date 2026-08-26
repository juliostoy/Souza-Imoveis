import React from 'react';
import logoImg from '../assets/images/souza_logo_png_1785843772969.jpg';

interface LogoProps {
  variant?: 'full' | 'compact' | 'white';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = '' }) => {
  const isWhite = variant === 'white';

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2.5 ${className}`}>
        <div className="relative w-11 h-11 flex items-center justify-center flex-shrink-0">
          <img 
            src={logoImg} 
            alt="Souza & Souza Imóveis" 
            referrerPolicy="no-referrer"
            className={`w-full h-full object-contain ${isWhite ? 'brightness-0 invert' : 'mix-blend-multiply'}`}
          />
        </div>
        <div className="flex flex-col">
          <span className={`text-base font-black tracking-tight leading-none font-sans ${isWhite ? 'text-white' : 'text-slate-900'}`}>
            SOUZA & SOUZA
          </span>
          <span className="text-[10px] font-bold tracking-[0.2em] text-blue-700 uppercase mt-0.5">
            IMÓVEIS
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <div className="relative h-16 w-auto flex items-center justify-center">
        <img 
          src={logoImg} 
          alt="Souza & Souza Imóveis Logo" 
          referrerPolicy="no-referrer"
          className={`h-full w-auto object-contain ${isWhite ? 'brightness-0 invert' : 'mix-blend-multiply'}`}
        />
      </div>
      <div className="text-center mt-1">
        <h2 className={`text-lg font-black tracking-tight leading-none font-sans ${isWhite ? 'text-white' : 'text-slate-900'}`}>
          SOUZA & SOUZA
        </h2>
        <div className="w-full h-[2px] bg-blue-700 my-1 rounded-full" />
        <p className={`text-[11px] font-bold tracking-[0.3em] uppercase ${isWhite ? 'text-blue-200' : 'text-slate-800'}`}>
          I M Ó V E I S
        </p>
        <p className="text-[9px] font-medium text-blue-700 tracking-wider mt-0.5">
          www.souzaimoveis.net
        </p>
      </div>
    </div>
  );
};
