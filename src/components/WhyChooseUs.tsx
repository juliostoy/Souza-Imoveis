import React from 'react';
import { 
  UserCheck, 
  Award, 
  CheckCircle2, 
  Landmark, 
  Calculator, 
  FileCheck2 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: UserCheck,
      title: 'Atendimento Especializado',
      description: 'Consultores dedicados prontos para entender seu perfil e indicar as melhores opções em Colombo e Região Metropolitana.'
    },
    {
      icon: Award,
      title: 'Mais de 9 Anos de Mercado',
      description: 'Tradição, honestidade e corretores credenciados com vasto conhecimento no mercado imobiliário do Paraná.'
    },
    {
      icon: CheckCircle2,
      title: 'Imóveis Verificados',
      description: 'Cada terreno, casa ou área passa por verificação presencial e rigorosa análise de matrícula.'
    },
    {
      icon: Landmark,
      title: 'Venda, Aluguel e Administração',
      description: 'Oferecemos soluções completas para proprietários e inquilinos com total transparência e repasse garantido.'
    },
    {
      icon: Calculator,
      title: 'Avaliação Pericial (PTAM)',
      description: 'Avaliamos seu imóvel com precisão pericial para inventários, processos ou venda no preço justo.'
    },
    {
      icon: FileCheck2,
      title: 'Segurança Jurídica',
      description: 'Acompanhamento jurídico completo na elaboração e assinatura dos contratos do início ao fim.'
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-700 text-xs font-bold uppercase tracking-widest">
            Diferenciais Souza & Souza
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-2">
            Por que escolher nossa imobiliária?
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            A imobiliária que atua em Curitiba e Região Metropolitana com casas, terrenos e áreas. Vender, alugar e administrar é o nosso compromisso com você.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-50 p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-6 group-hover:scale-110 group-hover:bg-blue-700 group-hover:text-white transition-all shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-serif group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
