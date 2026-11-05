import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Star, ShoppingBag, Eye, Heart } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct,
    settings,
  } = useStore();

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  const handleOpenFull = () => {
    setSelectedProduct(quickViewProduct);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#092820] rounded-2xl border border-[#C6A15B]/40 shadow-2xl p-6 overflow-hidden">
        {/* Close */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 text-[#E8D5B7] hover:text-[#FFFDF7] rounded-full hover:bg-[#123D32] transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#071F19] border border-[#C6A15B]/20">
            <img
              src={quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-brand tracking-[0.25em] text-[#C6A15B] uppercase">
                {quickViewProduct.category}
              </span>
              <h2 className="text-xl font-serif-luxury font-medium text-[#FFFDF7] mt-1">
                {quickViewProduct.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center text-[#C6A15B]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
                <span className="text-xs font-semibold text-[#FFFDF7]">
                  {quickViewProduct.rating}
                </span>
                <span className="text-[11px] text-[#E8D5B7]/60">
                  ({quickViewProduct.reviewCount})
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-sans text-[#FFFDF7]">
                {settings.currencySymbol}
                {quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span className="text-xs text-[#E8D5B7]/50 line-through">
                  {settings.currencySymbol}
                  {quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p className="text-xs text-[#E8D5B7]/80 line-clamp-3 leading-relaxed">
              {quickViewProduct.description}
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  addToCart(quickViewProduct, 1, quickViewProduct.variants?.[0]);
                  setQuickViewProduct(null);
                }}
                className="w-full py-3 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs tracking-wider uppercase hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleOpenFull}
                className="w-full py-2.5 rounded-xl border border-[#C6A15B]/40 hover:border-[#C6A15B] text-[#FFFDF7] text-xs font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-[#123D32] transition-colors cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C6A15B]" />
                <span>View Complete Details</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

