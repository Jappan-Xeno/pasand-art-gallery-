import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useStore();

  const handleShopFestive = () => {
    setSelectedCategory('jewellery');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="relative rounded-3xl overflow-hidden border border-[#C6A15B]/40 bg-gradient-to-r from-[#123D32] via-[#0E332A] to-[#123D32] p-8 sm:p-12 shadow-2xl">
        {/* Subtle Arch watermark */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#C6A15B]" fill="currentColor">
            <path d="M50 0 C70 30 90 60 90 100 L10 100 C10 60 30 30 50 0 Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#092820]/80 border border-[#C6A15B]/40 text-[#C6A15B] text-xs font-brand tracking-[0.2em] mb-4">
            <Gift className="w-3.5 h-3.5" />
            <span>ROYAL FESTIVE PRIVILEGE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-[#FFFDF7] leading-tight mb-4">
            Embrace the Radiance of{' '}
            <span className="italic gold-gradient-text">Heritage Jewels</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E8D5B7]/80 leading-relaxed mb-6">
            Apply code <strong className="text-[#FFFDF7] tracking-wider px-2 py-0.5 rounded bg-[#092820] border border-[#C6A15B]/30 font-mono">ROYAL10</strong> at checkout for 10% privilege discount on all handcrafted Kundan sets, artisanal perfumes, and gift boxes.
          </p>

          <button
            onClick={handleShopFestive}
            className="px-6 py-3 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Royal Edit</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

