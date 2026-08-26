import React from 'react';
import { Building, Users, Award, Star } from 'lucide-react';
import { COMPANY_INFO } from '../data/mockData';

export const StatsCounter: React.FC = () => {
  const stats = [
    {
      icon: Star,
      number: '+400',
      label: 'Avaliações no Google',
    },
    {
      icon: Award,
      number: '+9 Anos',
      label: 'De Experiência',
    },
    {
      icon: Building,
      number: '+120',
      label: 'Imóveis Administrados',
    },
    {
      icon: Users,
      number: '+800',
      label: 'Clientes Satisfeitos',
    },
  ];

  return (
    <section id="stats-counter-section" className="py-14 bg-gradient-to-r from-[#0b1e36] via-[#1E90FF] to-[#0b1e36] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center hover:bg-white/20 transition-all shadow-lg"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 border border-white/30 mx-auto flex items-center justify-center text-white mb-4">
                  <StatIcon className="w-6 h-6" />
                </div>

                <div className="text-2xl sm:text-4xl font-extrabold text-white font-serif tracking-tight">
                  {stat.number}
                </div>

                <div className="text-sm sm:text-base font-bold text-blue-100 mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
