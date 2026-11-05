import React from 'react';

// Exact Indian Choker / Necklace Icon from Screen 2
export const NecklaceIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Choker curve */}
    <path d="M4.5 7.5C6.5 13.5 17.5 13.5 19.5 7.5" />
    <path d="M6 9C8 14 16 14 18 9" strokeWidth="1.2" />
    {/* Suspended gem drops */}
    <circle cx="12" cy="15.5" r="1.2" fill="currentColor" />
    <circle cx="9" cy="14.5" r="1" fill="currentColor" />
    <circle cx="15" cy="14.5" r="1" fill="currentColor" />
    <circle cx="6.8" cy="12.5" r="0.8" fill="currentColor" />
    <circle cx="17.2" cy="12.5" r="0.8" fill="currentColor" />
    <path d="M12 13V14.3" />
    <path d="M9 12.5V13.5" />
    <path d="M15 12.5V13.5" />
  </svg>
);

// Exact Perfume Bottle Icon from Screen 2
export const PerfumeBottleIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Cap */}
    <rect x="9.5" y="3" width="5" height="3" rx="0.8" />
    {/* Neck */}
    <path d="M11 6V8H13V6" />
    {/* Body */}
    <rect x="6" y="8" width="12" height="13" rx="2.5" />
    {/* Inner label */}
    <rect x="8.5" y="11.5" width="7" height="6" rx="1" strokeWidth="1.2" />
  </svg>
);

// Exact Lips Icon from Screen 2
export const LipsIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Upper lip with cupid's bow */}
    <path d="M3 12C5.5 9.5 9 10 12 11.5C15 10 18.5 9.5 21 12C18 13.5 15 13 12 13.5C9 13 6 13.5 3 12Z" />
    {/* Lower lip */}
    <path d="M3.5 12.5C6 16.5 18 16.5 20.5 12.5" />
    {/* Mouth parting line */}
    <path d="M4 12.2C8 13.8 16 13.8 20 12.2" strokeWidth="1.2" />
  </svg>
);

// Exact Wristwatch Icon from Screen 2
export const WatchIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Round Dial */}
    <circle cx="12" cy="12" r="6" />
    {/* Watch Hands */}
    <polyline points="12 9.5 12 12 13.5 13.5" strokeWidth="1.3" />
    {/* Crown */}
    <path d="M18 11.5V12.5" strokeWidth="2" />
    {/* Top Strap */}
    <path d="M9 6V2.5H15V6" />
    {/* Bottom Strap */}
    <path d="M9 18V21.5H15V18" />
  </svg>
);

// Exact 4-Squares Grid Icon from Screen 2
export const GridFourIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
);

