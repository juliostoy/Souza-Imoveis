import React, { useState } from 'react';
import { Property } from '../types';
import { MapPin, Navigation, Eye, X, Maximize, BedDouble, Bath } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ properties, onSelectProperty }) => {
  const [selectedPin, setSelectedPin] = useState<Property | null>(properties[0] || null);

  return (
    <div className="relative w-full h-[600px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col justify-between">
      
      {/* Map Graphic Canvas Simulation */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] bg-slate-950 opacity-80" />

      {/* Grid lines styling */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/60 to-slate-950" />

      {/* Map Control Overlay Header */}
      <div className="relative z-10 p-4 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex justify-between items-center text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <Navigation className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-bold text-white">Mapa Interativo de Imóveis</span>
          <span className="text-slate-500">|</span>
          <span>{properties.length} marcadores ativos</span>
        </div>
        <div className="text-[11px] text-slate-400">
          Clique no marcador de valor para inspecionar o imóvel
        </div>
      </div>

      {/* Pins Area */}
      <div className="relative flex-1 p-8 overflow-hidden flex items-center justify-center">
        
        {/* Map stylized background landmark shapes */}
        <div className="absolute inset-10 border border-dashed border-slate-800/80 rounded-full pointer-events-none" />
        <div className="absolute inset-24 border border-slate-800/40 rounded-full pointer-events-none" />

        {/* Dynamic Pins Grid Simulation */}
        <div className="relative w-full h-full flex flex-wrap items-center justify-around gap-6 p-4 z-10">
          {properties.map((prop, idx) => {
            const isSelected = selectedPin?.id === prop.id;
            return (
              <button
                key={prop.id}
                onClick={() => setSelectedPin(prop)}
                className={`relative group transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                  isSelected ? 'z-30 scale-110' : 'z-20'
                }`}
              >
                {/* Price Pin Badge */}
                <div className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center space-x-1 shadow-2xl border transition-all ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 scale-110 shadow-amber-500/30'
                    : 'bg-slate-900 text-white border-blue-500/50 hover:bg-blue-600'
                }`}>
                  <MapPin className="w-3.5 h-3.5" />
                  <span>
                    R$ {(prop.price / 1000000 >= 1 
                      ? `${(prop.price / 1000000).toFixed(2)} M` 
                      : `${(prop.price / 1000).toFixed(0)} mil`)}
                  </span>
                </div>

                {/* Pin stem */}
                <div className={`w-0.5 h-3 mx-auto transition-colors ${isSelected ? 'bg-amber-400' : 'bg-blue-500'}`} />
              </button>
            );
          })}
        </div>

      </div>

      {/* Property Floating Preview Card (Bottom) */}
      {selectedPin && (
        <div className="relative z-20 m-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300">
          
          <div className="flex items-center space-x-4 w-full sm:w-auto">
            <img
              src={selectedPin.images[0]}
              alt={selectedPin.title}
              className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-slate-700"
            />

            <div>
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                CÓD: {selectedPin.code} • {selectedPin.type}
              </span>
              <h4 className="text-sm font-bold text-white font-serif line-clamp-1">
                {selectedPin.title}
              </h4>
              <p className="text-xs text-slate-400">
                {selectedPin.neighborhood}, {selectedPin.city}
              </p>

              <div className="flex items-center space-x-3 mt-1 text-[11px] text-slate-300">
                <span className="flex items-center space-x-1">
                  <Maximize className="w-3 h-3 text-blue-400" />
                  <span>{selectedPin.area} m²</span>
                </span>
                <span className="flex items-center space-x-1">
                  <BedDouble className="w-3 h-3 text-blue-400" />
                  <span>{selectedPin.bedrooms} qtos</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Bath className="w-3 h-3 text-blue-400" />
                  <span>{selectedPin.bathrooms} banh.</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-800 pt-2 sm:pt-0">
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Valor</span>
              <span className="text-lg font-extrabold text-amber-400 font-sans">
                R$ {selectedPin.price.toLocaleString('pt-BR')}
              </span>
            </div>

            <button
              onClick={() => onSelectProperty(selectedPin)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-lg transition-colors"
            >
              <Eye className="w-4 h-4" />
              <span>Ver Imóvel</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
