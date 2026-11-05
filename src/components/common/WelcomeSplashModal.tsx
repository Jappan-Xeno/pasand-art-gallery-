import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Sparkles, ArrowRight, X } from 'lucide-react';

interface WelcomeSplashProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeSplashModal: React.FC<WelcomeSplashProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      {/* Container modeled directly on phone screen 1 */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[580px] sm:h-[640px] rounded-3xl overflow-hidden border border-[#C6A15B]/50 shadow-2xl flex flex-col justify-between p-6 sm:p-8 bg-[#092820]">
        {/* Background Image with Arch lighting & emerald velvet */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85"
            alt="Royal Heritage Arch"
            className="w-full h-full object-cover object-center filter brightness-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-[#092820]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#092820]/80 via-transparent to-[#092820]" />
        </div>

        {/* Indian Arch Silhouette overlay */}
        <div className="absolute inset-x-6 top-6 bottom-6 border border-[#C6A15B]/20 rounded-t-[100px] rounded-b-2xl pointer-events-none" />

        {/* Top Close Button */}
        <div className="relative z-10 flex justify-end">
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[#092820]/70 border border-[#C6A15B]/30 text-[#E8D5B7] hover:text-[#FFFDF7]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Brand Identity matching screen 1 */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4 my-auto">
          <Logo size="xl" centered={true} />

          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C6A15B] to-transparent my-2" />

          <p className="text-xs sm:text-sm text-[#E8D5B7]/90 font-light tracking-widest uppercase">
            Jewellery • Perfumes • Cosmetics
            <br />
            Accessories & More
          </p>

          <p className="text-xs text-[#E8D5B7]/60 italic max-w-xs font-serif-luxury">
            "Elegance in Every Detail."
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="relative z-10 space-y-3">
          <button
            onClick={onClose}
            className="w-full py-4 rounded-2xl gold-gradient-bg text-[#092820] font-semibold text-xs uppercase tracking-widest shadow-xl shadow-[#C6A15B]/20 flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
          >
            <span>Enter Gallery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

