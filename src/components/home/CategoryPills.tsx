import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  NecklaceIcon,
  PerfumeBottleIcon,
  LipsIcon,
  WatchIcon,
  GridFourIcon,
} from '../common/CustomIcons';
import type { CategoryId } from '../../types';

export const CategoryPills: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveView } = useStore();

  const items = [
    {
      id: 'jewellery' as CategoryId,
      name: 'Jewellery',
      icon: NecklaceIcon,
    },
    {
      id: 'perfumes' as CategoryId,
      name: 'Perfumes',
      icon: PerfumeBottleIcon,
    },
    {
      id: 'cosmetics' as CategoryId,
      name: 'Cosmetics',
      icon: LipsIcon,
    },
    {
      id: 'mens-accessories' as CategoryId,
      name: "Men's Accessories",
      icon: WatchIcon,
    },
    {
      id: 'all' as const,
      name: 'All Categories',
      icon: GridFourIcon,
    },
  ];

  const handleSelect = (id: CategoryId | 'all') => {
    setSelectedCategory(id);
    if (id === 'all') {
      setActiveView('categories');
    } else {
      setActiveView('shop');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 max-w-full overflow-hidden">
      {/* 5 Circular Category Icons matching Screen 2, with rich gold styling */}
      <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar py-1 w-full max-w-full touch-pan-x">
        {items.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedCategory === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="flex flex-col items-center gap-2 shrink-0 group cursor-pointer focus:outline-none w-[62px] sm:w-20"
            >
              {/* Circular Container with Radiant Gold Aura */}
              <div
                className={`relative w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-[#F5D77F] shadow-[0_0_25px_rgba(212,175,55,0.5)] bg-gradient-to-b from-[#1C4B3D] to-[#0E3328] scale-105'
                    : 'border-2 border-[#D4AF37]/45 bg-[#0B251E] hover:border-[#F5D77F] hover:shadow-[0_0_18px_rgba(212,175,55,0.3)] hover:scale-105'
                }`}
              >
                {/* Gold inner ambient glow */}
                <div
                  className={`absolute inset-0 rounded-full transition-opacity ${
                    isSelected ? 'opacity-100 bg-[#D4AF37]/15' : 'opacity-0 group-hover:opacity-40 bg-[#D4AF37]/10'
                  }`}
                />

                <Icon
                  className={`w-6 h-6 sm:w-8 sm:h-8 transition-all ${
                    isSelected
                      ? 'text-[#FFFDF7] scale-105'
                      : 'text-[#F5D77F] group-hover:text-[#FFFDF7]'
                  }`}
                />
              </div>

              {/* Label in Gold Typography */}
              <span
                className={`text-[10px] sm:text-sm text-center leading-tight tracking-wide font-medium transition-colors truncate max-w-full ${
                  isSelected
                    ? 'text-[#F5D77F] font-semibold'
                    : 'text-[#E8D5B7] group-hover:text-[#FFFDF7]'
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
