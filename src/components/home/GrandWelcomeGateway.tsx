import React from 'react';
import { ArrowRight, Sparkles, Gem, Flame, Palette, Watch } from 'lucide-react';

interface GrandWelcomeGatewayProps {
  onStartShopping: () => void;
  onSelectCategory?: (category: string) => void;
}

export const GrandWelcomeGateway: React.FC<GrandWelcomeGatewayProps> = ({
  onStartShopping,
  onSelectCategory,
}) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#04140F] flex flex-col justify-between select-none">
      {/* 1. Full Screen Background Image: Edge-to-Edge */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/pasand-welcome.jpg"
          alt="Pasand Art Gallery Royal Heritage"
          className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-1000 ease-out"
        />

        {/* Cinematic Vignette Overlays for Maximum Contrast & Luxury */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140F]/95 via-[#04140F]/20 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#04140F]/90 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-[#04140F]/15 to-[#04140F]/70 pointer-events-none" />
      </div>

      {/* 2. Top Minimal Bar */}
      <div className="relative z-20 w-full px-6 sm:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5D77F] animate-pulse" />
          <span className="text-xs uppercase tracking-[0.3em] font-brand text-[#F5D77F]/90 drop-shadow">
            ROYAL HERITAGE BOUTIQUE
          </span>
        </div>

        <button
          onClick={onStartShopping}
          className="px-5 py-2 rounded-full bg-[#061B15]/80 hover:bg-[#D4AF37] border border-[#D4AF37]/60 text-[#F5D77F] hover:text-[#061B15] font-bold text-xs uppercase tracking-widest backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-lg"
        >
          <span>Enter Store</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3. Bottom Centered Action Hub */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-4 pb-8 sm:pb-12 flex flex-col items-center text-center space-y-5">
        
        {/* Main CTA: START SHOPPING in Radiant Gold */}
        <div className="w-full max-w-md">
          <button
            onClick={onStartShopping}
            className="w-full py-4 sm:py-5 px-8 rounded-full gold-foil-bg text-[#061B15] font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-[0_15px_40px_rgba(212,175,55,0.5),0_0_25px_rgba(245,215,127,0.4)] hover:brightness-110 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer group animate-gold-pulse"
          >
            <Sparkles className="w-5 h-5 text-[#6B4300]" />
            <span>START SHOPPING</span>
            <ArrowRight className="w-5 h-5 text-[#6B4300] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Category Quick Discover Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          {[
            { name: 'Jewellery', id: 'jewellery', icon: Gem },
            { name: 'Perfumes', id: 'perfumes', icon: Flame },
            { name: 'Cosmetics', id: 'cosmetics', icon: Palette },
            { name: "Men's Accessories", id: 'mens-accessories', icon: Watch },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  onStartShopping();
                }}
                className="px-4 py-2 rounded-full bg-[#061B15]/85 hover:bg-[#D4AF37] border border-[#D4AF37]/50 text-xs text-[#E8D5B7] hover:text-[#061B15] font-medium tracking-wide flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer shadow-md hover:scale-105"
              >
                <Icon className="w-3.5 h-3.5 text-[#F5D77F]" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] sm:text-xs text-[#E8D5B7]/70 tracking-widest uppercase font-light pt-2">
          Pan-India Express Delivery • Handcrafted 22K Micro-Gold Finishes
        </p>
      </div>
    </div>
  );
};
