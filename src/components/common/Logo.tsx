import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  centered?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  centered = false,
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-11 h-11',
    xl: 'w-16 h-16',
  };

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl md:text-5xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px] tracking-[0.25em]',
    md: 'text-[10px] tracking-[0.3em]',
    lg: 'text-xs tracking-[0.35em]',
    xl: 'text-sm tracking-[0.4em]',
  };

  return (
    <div
      className={`inline-flex flex-col ${centered ? 'items-center text-center' : 'items-start'} ${className} select-none group cursor-pointer`}
    >
      {/* Royal Gold Lotus Emblem */}
      <div className="relative mb-1">
        <svg
          className={`${iconSizes[size]} text-[#C6A15B] transition-transform duration-500 group-hover:scale-105`}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Outer Halo */}
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.3" strokeDasharray="2 2" />
          
          {/* Center Petal */}
          <path
            d="M32 10C30 20 28 28 32 44C36 28 34 20 32 10Z"
            fill="url(#goldGradient)"
          />
          {/* Left Inner Petal */}
          <path
            d="M32 20C26 24 20 30 22 42C26 39 30 38 32 44C31 36 31 28 32 20Z"
            fill="url(#goldGradient)"
            fillOpacity="0.9"
          />
          {/* Right Inner Petal */}
          <path
            d="M32 20C38 24 44 30 42 42C38 39 34 38 32 44C33 36 33 28 32 20Z"
            fill="url(#goldGradient)"
            fillOpacity="0.9"
          />
          {/* Far Left Petal */}
          <path
            d="M32 28C22 30 14 36 15 46C20 46 26 43 30 44C27 40 28 34 32 28Z"
            fill="url(#goldGradient)"
            fillOpacity="0.75"
          />
          {/* Far Right Petal */}
          <path
            d="M32 28C42 30 50 36 49 46C44 46 38 43 34 44C37 40 36 34 32 28Z"
            fill="url(#goldGradient)"
            fillOpacity="0.75"
          />
          {/* Base Calyx Accent */}
          <path
            d="M24 46C28 49 36 49 40 46C37 45 27 45 24 46Z"
            fill="#E8D5B7"
          />
          <circle cx="32" cy="46.5" r="1.5" fill="#FFFDF7" />

          <defs>
            <linearGradient id="goldGradient" x1="16" y1="10" x2="48" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFF9E6" />
              <stop offset="0.25" stopColor="#F5D77F" />
              <stop offset="0.6" stopColor="#D4AF37" />
              <stop offset="0.85" stopColor="#996515" />
              <stop offset="1" stopColor="#F5D77F" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col items-center">
        <span
          className={`font-serif-luxury font-medium tracking-wide text-[#FFFDF7] leading-tight ${titleSizes[size]} group-hover:text-[#F5D77F] transition-colors`}
        >
          Pasand
        </span>
        {showSubtitle && (
          <span
            className={`font-brand uppercase text-[#F5D77F] font-medium mt-0.5 flex items-center gap-1.5 ${subtitleSizes[size]}`}
          >
            <span className="w-2 h-[1px] bg-[#D4AF37] inline-block"></span>
            ART GALLERY
            <span className="w-2 h-[1px] bg-[#D4AF37] inline-block"></span>
          </span>
        )}
      </div>
    </div>
  );
};

