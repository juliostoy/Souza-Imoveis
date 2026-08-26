import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials-section" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#1E90FF] text-xs font-bold uppercase tracking-widest">
            3.626+ Avaliações no Google
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif mt-2">
            O que dizem nossos clientes
          </h2>
          <p className="text-xs text-slate-500 mt-1">Sua satisfação e tranquilidade são nossa prioridade na Souza & Souza</p>
        </div>

        {/* Testimonial Card Slider */}
        <div className="relative bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
          
          <Quote className="absolute top-6 right-8 w-16 h-16 text-[#1E90FF]/10" />

          <div className="flex flex-col md:flex-row items-center gap-8">
            
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-[#1E90FF] p-1 shadow-lg bg-white"
              />
            </div>

            {/* Testimonial text */}
            <div className="flex-1 text-center md:text-left">
              
              {/* Star Rating */}
              <div className="flex justify-center md:justify-start space-x-1 mb-3">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-800 text-base sm:text-lg italic font-serif leading-relaxed">
                "{current.comment}"
              </p>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <h4 className="text-slate-900 font-bold text-base">{current.name}</h4>
                <p className="text-xs text-[#1E90FF] font-bold">{current.role} • {current.city}</p>
                <span className="text-[11px] text-slate-500 block mt-0.5">{current.propertyTypeBought}</span>
              </div>

            </div>

          </div>

          {/* Carousel Controls */}
          <div className="flex justify-center md:justify-end space-x-3 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white text-slate-700 hover:text-white hover:bg-[#1E90FF] transition-colors border border-slate-200 shadow-sm"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white text-slate-700 hover:text-white hover:bg-[#1E90FF] transition-colors border border-slate-200 shadow-sm"
              aria-label="Próximo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
