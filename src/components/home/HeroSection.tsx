import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CategoryId } from '../../types';

interface HeroCardItem {
  id: string;
  badge: string;
  titleLines: string[];
  subtitle: string;
  ctaText: string;
  category: CategoryId;
  image: string;
}

const HERO_CARDS: HeroCardItem[] = [
  {
    id: 'hero-1',
    badge: 'ROYAL HERITAGE EDIT',
    titleLines: ['New', 'Jewellery', 'Collection'],
    subtitle: 'Exquisite 22K micro-gold plated Kundan chokers, temple jhumkas, and bridal sets for celebratory occasions.',
    ctaText: 'Shop Now',
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hero-2',
    badge: 'IMPERIAL FRAGRANCE',
    titleLines: ['Artisanal', 'Ouds &', 'Perfumes'],
    subtitle: 'Precious Cambodian agarwood, velvety Kashmiri rose, and French vanilla extraits with 14+ hours sillage.',
    ctaText: 'Explore Perfumes',
    category: 'perfumes',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
  },
  {
    id: 'hero-3',
    badge: 'FESTIVE PRIVILEGE',
    titleLines: ['Heritage', 'Temple', 'Creations'],
    subtitle: 'Nakshi peacock kada bangles, chandbali earrings, and antique gold ornaments with precious hydro emeralds.',
    ctaText: 'Discover Jewellery',
    category: 'jewellery',
    image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1200&q=85',
  },
];

export const HeroSection: React.FC = () => {
  const { setActiveView, setSelectedCategory } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CARDS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = HERO_CARDS[activeIndex];

  const handleCtaClick = () => {
    setSelectedCategory(current.category);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      {/* Full-width Grand Luxury Card with Rich Gold Border */}
      <div className="relative w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 hover:border-[#F5D77F] bg-gradient-to-r from-[#071F18] via-[#0E3328] to-[#08241C] shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.2)] min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] flex items-center transition-all duration-300">
        
        {/* Right Side: High Resolution Product Imagery on Emerald Velvet */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] sm:w-[50%] lg:w-[48%] overflow-hidden">
          {HERO_CARDS.map((card, idx) => (
            <div
              key={card.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <img
                src={card.image}
                alt={card.titleLines.join(' ')}
                className="w-full h-full object-cover object-center"
              />
              {/* Rich Emerald & Gold Light Vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#071F18] via-[#071F18]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071F18]/90 via-transparent to-black/20" />
            </div>
          ))}
        </div>

        {/* Left Side: Editorial Typography & Gold CTA */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-[65%] sm:max-w-[55%] flex flex-col justify-between h-full space-y-4 sm:space-y-6">
          <div>
            {/* Gold Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#061B15]/90 border border-[#D4AF37]/60 text-[#F5D77F] text-[10px] sm:text-xs font-brand tracking-[0.25em] mb-3 backdrop-blur-md shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{current.badge}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif-luxury font-medium text-[#FFFDF7] leading-[1.08] tracking-tight">
              {current.titleLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base text-[#E8D5B7]/90 mt-2 sm:mt-3 line-clamp-2 leading-relaxed font-light max-w-md">
              {current.subtitle}
            </p>
          </div>

          <div>
            {/* Pill CTA button in Radiant Gold */}
            <button
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full gold-foil-bg text-[#061B15] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_8px_25px_rgba(212,175,55,0.4)] hover:brightness-110 transition-all cursor-pointer group"
            >
              <span>{current.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#061B15] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3 Pagination Indicator Dots at bottom center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-[#061B15]/80 px-3 py-1.5 rounded-full border border-[#D4AF37]/30 backdrop-blur-sm">
          {HERO_CARDS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                dotIdx === activeIndex
                  ? 'w-6 h-2 bg-[#F5D77F] shadow-sm shadow-[#F5D77F]'
                  : 'w-2 h-2 bg-[#E8D5B7]/40 hover:bg-[#F5D77F]/70'
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
