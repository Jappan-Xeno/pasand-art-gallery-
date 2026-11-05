import React, { useState, useMemo } from 'react';
import { useStore } from '../../context/StoreContext';
import { ProductCard } from '../common/ProductCard';
import { CategoryId } from '../../types';
import {
  SlidersHorizontal,
  Search,
  X,
  Sparkles,
  ChevronDown,
  ArrowUpDown,
  Filter,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    selectedSubcategory,
    setSelectedSubcategory,
    searchQuery,
    setSearchQuery,
    settings,
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Available subcategories based on selected category
  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);
  const availableSubcategories = activeCategoryObj ? activeCategoryObj.subcategories : [];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'all' && prod.category !== selectedCategory) {
        return false;
      }
      // Subcategory filter
      if (selectedSubcategory && prod.subcategory !== selectedSubcategory) {
        return false;
      }
      // Max price filter
      if (prod.price > maxPrice) {
        return false;
      }
      // In stock filter
      if (onlyInStock && !prod.inStock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesSub = prod.subcategory.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesSub) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, selectedSubcategory, maxPrice, onlyInStock, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubcategory(null);
    setMaxPrice(5000);
    setOnlyInStock(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSubcategory !== null ||
    maxPrice < 5000 ||
    onlyInStock ||
    searchQuery.trim() !== '';

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Catalogue Title Banner */}
      <div className="text-center py-6 border-b border-[#C6A15B]/20 mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-brand tracking-[0.3em] text-[#C6A15B] uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Sovereign Collection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-luxury font-medium text-[#FFFDF7]">
          {selectedCategory === 'all'
            ? 'Complete Luxury Catalogue'
            : activeCategoryObj?.name || 'Curated Selection'}
        </h1>
        <p className="text-xs sm:text-sm text-[#E8D5B7]/80 max-w-xl mx-auto mt-2">
          {activeCategoryObj?.description ||
            'Explore fine 22K micro-plated imitation jewellery, long-lasting fragrances, and regal accessories.'}
        </p>
      </div>

      {/* Main Filter & Sort Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-[#0E332A]/70 border border-[#C6A15B]/30 backdrop-blur-md">
        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubcategory(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
              selectedCategory === 'all'
                ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                : 'bg-[#123D32] text-[#E8D5B7] hover:text-[#FFFDF7] border border-[#C6A15B]/30'
            }`}
          >
            All Pieces ({products.length})
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCategory(c.id);
                setSelectedSubcategory(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all shrink-0 cursor-pointer ${
                selectedCategory === c.id
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'bg-[#123D32] text-[#E8D5B7] hover:text-[#FFFDF7] border border-[#C6A15B]/30'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search, Sort & Filter Drawer Button */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Search */}
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter names..."
              className="w-full pl-9 pr-7 py-1.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/50 focus:outline-none focus:border-[#C6A15B]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#E8D5B7]/60 hover:text-[#FFFDF7]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="appearance-none bg-[#092820] border border-[#C6A15B]/30 rounded-xl px-3 py-1.5 pr-8 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#C6A15B] cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#C6A15B] pointer-events-none" />
          </div>

          {/* More Filters Toggle */}
          <button
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs cursor-pointer transition-colors ${
              hasActiveFilters
                ? 'bg-[#123D32] border-[#C6A15B] text-[#C6A15B]'
                : 'bg-[#092820] border-[#C6A15B]/30 text-[#E8D5B7] hover:text-[#FFFDF7]'
            }`}
            title="Toggle Detailed Filters"
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Expandable Advanced Filters Bar */}
      {isFilterDrawerOpen && (
        <div className="p-4 mb-6 rounded-2xl bg-[#092820] border border-[#C6A15B]/30 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between text-xs text-[#E8D5B7] mb-2 font-medium">
              <span>Maximum Price</span>
              <span className="text-[#C6A15B] font-bold font-sans">
                {settings.currencySymbol}
                {maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="400"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C6A15B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#E8D5B7]/50 mt-1">
              <span>₹400</span>
              <span>₹5,000</span>
            </div>
          </div>

          {/* In Stock toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="instock"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="w-4 h-4 accent-[#C6A15B] rounded cursor-pointer"
            />
            <label htmlFor="instock" className="text-xs text-[#FFFDF7] cursor-pointer">
              Show In-Stock Treasures Only
            </label>
          </div>

          {/* Reset Filters CTA */}
          <div className="flex items-center justify-end">
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#C6A15B] hover:text-[#FFFDF7] underline decoration-[#C6A15B]/40 cursor-pointer"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Subcategories Ribbon if available */}
      {availableSubcategories.length > 0 && (
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] uppercase tracking-wider text-[#C6A15B] font-brand mr-1 shrink-0">
            Style:
          </span>
          <button
            onClick={() => setSelectedSubcategory(null)}
            className={`px-3 py-1 rounded-lg text-xs transition-colors shrink-0 ${
              selectedSubcategory === null
                ? 'bg-[#123D32] text-[#FFFDF7] border border-[#C6A15B]'
                : 'text-[#E8D5B7]/70 hover:text-[#FFFDF7]'
            }`}
          >
            All Styles
          </button>
          {availableSubcategories.map((sub, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors shrink-0 ${
                selectedSubcategory === sub
                  ? 'bg-[#123D32] text-[#FFFDF7] border border-[#C6A15B]'
                  : 'text-[#E8D5B7]/70 hover:text-[#FFFDF7]'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Results Header Info */}
      <div className="flex items-center justify-between text-xs text-[#E8D5B7]/70 mb-6">
        <span>
          Showing <strong className="text-[#FFFDF7]">{filteredProducts.length}</strong> creations
        </span>
        {hasActiveFilters && (
          <span className="text-[11px] text-[#C6A15B]">Filters applied</span>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#123D32] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mx-auto mb-4">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-serif-luxury text-[#FFFDF7]">No Treasures Found</h3>
          <p className="text-xs text-[#E8D5B7]/70 mt-2 mb-6">
            We couldn't find items matching your criteria. Try adjusting your search query, category, or price range.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#092820] text-xs font-semibold uppercase tracking-wider"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

