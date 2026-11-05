import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, X, Sparkles, ArrowRight, Star } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    products,
    setSelectedProduct,
    settings,
  } = useStore();

  const [query, setQuery] = useState('');

  const trendingQueries = ['Jhumka', 'Oud Al-Sultan', 'Kundan Choker', 'Emerald Watch', 'Lipstick', 'Bangles'];

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [query, products]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#092820] rounded-3xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden p-6">
        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 absolute left-4 text-[#C6A15B]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search jewellery, perfumes, cosmetics, accessories..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/40 text-sm text-[#FFFDF7] placeholder-[#E8D5B7]/50 focus:outline-none focus:border-[#C6A15B]"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute right-3.5 p-1.5 text-[#E8D5B7] hover:text-[#FFFDF7] rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs text-[#E8D5B7]/60 font-brand">Trending Searches:</span>
          {trendingQueries.map((t) => (
            <button
              key={t}
              onClick={() => setQuery(t)}
              className="px-2.5 py-1 rounded-full bg-[#123D32] hover:bg-[#1A4D41] border border-[#C6A15B]/25 text-xs text-[#E8D5B7] transition-colors"
            >
              {t}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="mt-6 max-h-[60vh] overflow-y-auto space-y-3">
          {query.trim() && results.length === 0 && (
            <div className="py-12 text-center text-xs text-[#E8D5B7]/70">
              No creations matching "<span className="text-[#FFFDF7]">{query}</span>". Try another phrase.
            </div>
          )}

          {results.map((prod) => (
            <div
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setIsSearchOpen(false);
              }}
              className="p-3 rounded-xl bg-[#0E332A] border border-[#C6A15B]/20 hover:border-[#C6A15B] flex items-center justify-between gap-4 cursor-pointer group transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-12 h-12 rounded-lg object-cover bg-[#092820] shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-serif-luxury font-medium text-[#FFFDF7] truncate group-hover:text-[#C6A15B]">
                    {prod.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-[#E8D5B7]/60">
                    <span>{prod.subcategory}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-[#C6A15B]">
                      <Star className="w-3 h-3 fill-current" /> {prod.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-bold font-sans text-[#FFFDF7]">
                  {settings.currencySymbol}
                  {prod.price.toLocaleString('en-IN')}
                </span>
                <ArrowRight className="w-4 h-4 text-[#C6A15B] ml-auto mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

