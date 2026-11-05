import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryId } from '../../types';
import { ArrowRight, Sparkles, ChevronLeft } from 'lucide-react';

export const CategoriesView: React.FC = () => {
  const { categories, setSelectedCategory, setActiveView } = useStore();

  const handleSelect = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header exactly reflecting screen 3 in the screenshot */}
      <div className="flex items-center justify-between border-b border-[#C6A15B]/20 pb-4">
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-1.5 text-xs text-[#E8D5B7] hover:text-[#FFFDF7]"
        >
          <ChevronLeft className="w-5 h-5 text-[#C6A15B]" />
          <span>Home</span>
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 text-[#C6A15B] text-xs">
            <span>◆</span>
            <span className="font-brand tracking-[0.25em] uppercase text-[11px]">Collections</span>
            <span>◆</span>
          </div>
          <h1 className="text-3xl font-serif-luxury font-medium text-[#FFFDF7] mt-0.5">
            Categories
          </h1>
        </div>

        <div className="w-16" /> {/* balance spacing */}
      </div>

      {/* Vertical list of majestic category cards matching screen 3 */}
      <div className="space-y-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className="group relative rounded-3xl overflow-hidden border border-[#C6A15B]/35 hover:border-[#C6A15B] bg-[#0E332A] cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-[#C6A15B]/20"
          >
            {/* Background image & gradient */}
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#092820] via-[#092820]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#092820] via-transparent to-black/30" />
            </div>

            {/* Overlay content matching screen 3 */}
            <div className="absolute inset-0 p-6 sm:p-8 flex items-center justify-between">
              <div className="max-w-md">
                <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] group-hover:text-[#E8D5B7] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#E8D5B7]/80 mt-1.5 font-light">
                  {cat.tagline}
                </p>

                {/* Subcategories preview tags */}
                <div className="flex flex-wrap gap-1.5 mt-3 hidden sm:flex">
                  {cat.subcategories.slice(0, 3).map((sub, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-[#092820]/80 border border-[#C6A15B]/30 text-[#E8D5B7]"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Circular Gold Arrow Button */}
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-[#C6A15B]/50 bg-[#092820]/80 text-[#C6A15B] flex items-center justify-center shrink-0 group-hover:bg-[#C6A15B] group-hover:text-[#092820] group-hover:scale-110 transition-all duration-300 shadow-lg">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

