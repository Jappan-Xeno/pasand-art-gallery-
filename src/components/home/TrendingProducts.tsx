import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Star, Heart, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';

export const TrendingProducts: React.FC = () => {
  const {
    products,
    setActiveView,
    setSelectedCategory,
    setSelectedProduct,
    toggleWishlist,
    isInWishlist,
    addToCart,
    settings,
  } = useStore();

  const trending = products.slice(0, 8);

  const handleViewAll = () => {
    setSelectedCategory('all');
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Title row with Gold Flourishes */}
      <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#D4AF37]/25">
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] tracking-tight">
            Trending Now
          </h2>
          <p className="text-xs text-[#E8D5B7]/70 mt-0.5 hidden sm:block">
            Curated heirloom favourites and celebrated festive highlights
          </p>
        </div>

        <button
          onClick={handleViewAll}
          className="text-xs sm:text-sm font-semibold text-[#F5D77F] hover:text-[#FFFDF7] flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <span>View All Collection</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
        </button>
      </div>

      {/* Responsive Grid on Desktop / Scroll on Mobile with Rich Gold Borders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {trending.map((prod) => {
          const isFav = isInWishlist(prod.id);

          return (
            <div
              key={prod.id}
              onClick={() => setSelectedProduct(prod)}
              className="group relative rounded-2xl overflow-hidden bg-[#0C2820] border-2 border-[#D4AF37]/35 hover:border-[#F5D77F] flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.25)] hover:-translate-y-1"
            >
              {/* Product Image Area */}
              <div className="relative aspect-square w-full overflow-hidden bg-[#061B15]">
                <img
                  src={prod.images[0]}
                  alt={prod.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />

                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C2820] via-transparent to-black/20 pointer-events-none" />

                {/* Badge if available */}
                {prod.badge && (
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-brand tracking-wider font-semibold uppercase bg-[#061B15]/90 text-[#F5D77F] border border-[#D4AF37]/50 backdrop-blur-sm shadow-md">
                      {prod.badge}
                    </span>
                  </div>
                )}

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id);
                  }}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
                    isFav
                      ? 'bg-[#D4AF37] text-[#061B15] shadow-lg shadow-[#D4AF37]/40 scale-105'
                      : 'bg-[#061B15]/75 text-[#FFFDF7] hover:bg-[#D4AF37] hover:text-[#061B15] border border-[#D4AF37]/35'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Title & Price info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#F5D77F] mb-1">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold">{prod.rating}</span>
                    <span className="text-[11px] text-[#E8D5B7]/60 font-sans">
                      ({prod.reviewCount})
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-serif-luxury font-medium text-[#FFFDF7] truncate group-hover:text-[#F5D77F] transition-colors">
                    {prod.name}
                  </h3>

                  <p className="text-[11px] text-[#E8D5B7]/70 truncate mt-0.5 font-light">
                    {prod.subtitle || prod.subcategory}
                  </p>
                </div>

                {/* Price & Add to Cart Action */}
                <div className="pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base sm:text-lg font-bold font-sans text-[#FFFDF7]">
                      {settings.currencySymbol}
                      {prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice > prod.price && (
                      <span className="text-xs text-[#E8D5B7]/50 line-through">
                        {settings.currencySymbol}
                        {prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod, 1, prod.variants?.[0]);
                    }}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl gold-foil-bg text-[#061B15] font-semibold text-xs flex items-center gap-1.5 shadow-md hover:brightness-110 transition-all cursor-pointer"
                    title="Add to Shopping Bag"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
