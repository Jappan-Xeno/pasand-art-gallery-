import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CategoryId } from '../../types';

export const CuratedCollections: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleNavigate = (cat: CategoryId) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Featured Fragrance Banner with Rich Gold Styling */}
      <div
        onClick={() => handleNavigate('perfumes')}
        className="group relative rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 hover:border-[#F5D77F] bg-gradient-to-r from-[#24130D] via-[#1A2E25] to-[#0A261E] min-h-[120px] sm:min-h-[140px] flex items-center justify-between p-5 sm:p-7 cursor-pointer shadow-[0_10px_35px_-5px_rgba(0,0,0,0.7),0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
      >
        {/* Left Side: Perfume bottle with cherry blossom floral ambiance */}
        <div className="flex items-center gap-4 sm:gap-7 min-w-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shrink-0 bg-[#061B15] shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=85"
              alt="Fragrance Collection"
              className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
            />
            {/* Warm golden-rose ambient glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/25 to-rose-400/15 pointer-events-none" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-brand tracking-[0.25em] text-[#F5D77F] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Royal Artisanal Flacons</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] leading-tight group-hover:text-[#F5D77F] transition-colors">
              Fragrance Collection
            </h3>
            <p className="text-xs sm:text-sm text-[#E8D5B7]/90 line-clamp-1 font-light">
              Premium Extrait de Parfum & Rare Ouds for Him & Her
            </p>
          </div>
        </div>

        {/* Right Side: Circular Gold Arrow Button */}
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#D4AF37] gold-foil-bg text-[#061B15] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:brightness-110 transition-all shadow-[0_5px_20px_rgba(212,175,55,0.4)] ml-4">
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-[#061B15]" />
        </div>
      </div>
    </div>
  );
};
