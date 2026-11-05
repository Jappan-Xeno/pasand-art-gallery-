import React from 'react';
import { ArrowRight, Sparkles, Gem, Flame, Palette, Watch, Download } from 'lucide-react';

interface GrandWelcomeGatewayProps {
  onStartShopping: () => void;
  onSelectCategory?: (category: string) => void;
  onInstallApp?: () => void;
  canInstall?: boolean;
}

export const GrandWelcomeGateway: React.FC<GrandWelcomeGatewayProps> = ({
  onStartShopping,
  onSelectCategory,
  onInstallApp,
  canInstall,
}) => {
  return (
    <div className="relative w-full min-h-[100dvh] h-[100dvh] overflow-hidden bg-[#04140F] flex flex-col justify-between select-none">
      {/* 1. Full Screen Background Image: Edge-to-Edge */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/pasand-welcome.jpg"
          alt="Pasand Art Gallery Royal Heritage"
          className="w-full h-full object-cover object-center"
        />

        {/* Cinematic Vignette Overlays for Maximum Contrast & Luxury */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04140F] via-[#04140F]/30 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-[#04140F]/90 pointer-events-none" />
      </div>

      {/* 2. Top Minimal Bar */}
      <div className="relative z-20 w-full px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F5D77F] animate-pulse" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-brand text-[#F5D77F] drop-shadow">
            ROYAL HERITAGE
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canInstall && (
            <button
              onClick={onInstallApp}
              className="px-3 py-1.5 rounded-full bg-[#061B15]/90 border border-[#D4AF37]/60 text-[#F5D77F] text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md cursor-pointer hover:bg-[#D4AF37] hover:text-[#061B15] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          <button
            onClick={onStartShopping}
            className="px-4 py-1.5 rounded-full gold-foil-bg text-[#061B15] font-bold text-[10px] sm:text-xs uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer shadow-md"
          >
            <span>Enter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Bottom Centered Action Hub */}
      <div className="relative z-20 w-full max-w-xl mx-auto px-4 pb-6 sm:pb-10 flex flex-col items-center text-center space-y-4">
        {/* Main CTA: START SHOPPING in Radiant Gold */}
        <div className="w-full">
          <button
            onClick={onStartShopping}
            className="w-full py-4 sm:py-5 px-6 rounded-full gold-foil-bg text-[#061B15] font-bold text-sm sm:text-base tracking-[0.2em] uppercase shadow-[0_12px_35px_rgba(212,175,55,0.5)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer animate-gold-pulse"
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B4300]" />
            <span>START SHOPPING</span>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B4300]" />
          </button>
        </div>

        {/* Category Quick Discover Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 w-full">
          {[
            { name: 'Jewellery', id: 'jewellery', icon: Gem },
            { name: 'Perfumes', id: 'perfumes', icon: Flame },
            { name: 'Cosmetics', id: 'cosmetics', icon: Palette },
            { name: "Men's", id: 'mens-accessories', icon: Watch },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (onSelectCategory) onSelectCategory(cat.id);
                  onStartShopping();
                }}
                className="px-3.5 py-1.5 rounded-full bg-[#061B15]/90 border border-[#D4AF37]/50 text-xs text-[#E8D5B7] hover:text-[#061B15] hover:bg-[#D4AF37] font-medium tracking-wide flex items-center gap-1.5 backdrop-blur-md transition-all cursor-pointer"
              >
                <Icon className="w-3.5 h-3.5 text-[#F5D77F]" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <p className="text-[10px] sm:text-xs text-[#E8D5B7]/75 tracking-wider uppercase font-light">
          Pan-India Express Delivery • 22K Gold Finish
        </p>
      </div>
    </div>
  );
};
