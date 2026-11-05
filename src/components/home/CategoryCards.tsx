import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CategoryId } from '../../types';

export const CategoryCards: React.FC = () => {
  const { categories, setSelectedCategory, setActiveView } = useStore();

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-[#C6A15B]/20">
        <div>
          <div className="flex items-center gap-2 text-xs font-brand tracking-[0.3em] text-[#C6A15B] uppercase mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Boutiques</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-luxury font-medium text-[#FFFDF7]">
            Shop by Category
          </h2>
        </div>
        <p className="text-sm text-[#E8D5B7]/70 mt-2 sm:mt-0 max-w-sm">
          Immerse yourself in our distinct collections crafted with Indian heritage and contemporary luxury.
        </p>
      </div>

      {/* Category Grid - matching the reference phone screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="group relative rounded-2xl overflow-hidden border border-[#C6A15B]/30 hover:border-[#C6A15B] bg-[#0E332A] cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-[#C6A15B]/15"
          >
            {/* Background Image with Zoom & Dark Gradient */}
            <div className="relative h-48 sm:h-56 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              {/* Luxury Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-[#092820]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#092820]/90 via-[#092820]/50 to-transparent" />
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              {/* Subcategories tags */}
              <div className="flex flex-wrap gap-1.5 opacity-90">
                {cat.subcategories.slice(0, 3).map((sub, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#092820]/80 border border-[#C6A15B]/30 text-[#E8D5B7]"
                  >
                    {sub}
                  </span>
                ))}
              </div>

              {/* Title & Arrow matching reference mockup */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] group-hover:text-[#E8D5B7] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#E8D5B7]/80 mt-1 line-clamp-1 max-w-md">
                    {cat.tagline}
                  </p>
                </div>

                {/* Circular Gold Arrow Button */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#C6A15B]/40 bg-[#123D32]/80 text-[#C6A15B] flex items-center justify-center shrink-0 group-hover:bg-[#C6A15B] group-hover:text-[#092820] group-hover:scale-110 transition-all duration-300 shadow-md">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

