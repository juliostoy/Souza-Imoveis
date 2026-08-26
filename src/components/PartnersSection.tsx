import React from 'react';
import { PARTNERS } from '../data/mockData';
import { Handshake } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  return (
    <section id="partners-section" className="py-12 bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-8">
          <span className="text-xs text-slate-400 font-medium uppercase tracking-widest flex items-center justify-center space-x-1.5">
            <Handshake className="w-3.5 h-3.5 text-blue-400" />
            <span>Nossos Parceiros Estratégicos</span>
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto items-center justify-center">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 hover:border-slate-700 flex flex-col items-center justify-center text-center transition-all group"
            >
              <div className="text-slate-200 font-bold text-sm font-serif group-hover:text-amber-400 transition-colors">
                {partner.name}
              </div>
              <span className="text-[11px] text-slate-500 mt-0.5">
                {partner.category}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
