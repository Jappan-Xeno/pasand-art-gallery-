import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import { Heart, Star, ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setSelectedProduct,
    settings,
  } = useStore();

  const isFavorited = isInWishlist(product.id);

  const handleCardClick = () => {
    if (onOpenDetails) {
      onOpenDetails(product);
    } else {
      setSelectedProduct(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, product.variants?.[0]);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative rounded-2xl overflow-hidden bg-[#0E332A] border border-[#C6A15B]/25 hover:border-[#C6A15B]/70 transition-all duration-300 hover:shadow-2xl hover:shadow-[#C6A15B]/15 flex flex-col cursor-pointer"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#092820]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
          loading="lazy"
        />

        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#092820]/70 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-brand tracking-wider font-semibold uppercase bg-[#092820]/90 text-[#C6A15B] border border-[#C6A15B]/40 backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          {product.discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-amber-900/90 text-[#FFFDF7] border border-amber-600/40">
              -{product.discountPercent}%
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={handleToggleFav}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
            isFavorited
              ? 'bg-[#C6A15B] text-[#092820] shadow-md'
              : 'bg-[#092820]/75 text-[#FFFDF7] hover:bg-[#C6A15B] hover:text-[#092820] border border-[#C6A15B]/30'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick View Button */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleQuickView}
            className="w-full py-2 rounded-xl bg-[#092820]/90 border border-[#C6A15B]/50 hover:border-[#C6A15B] text-[#FFFDF7] text-xs font-medium tracking-wide flex items-center justify-center gap-1.5 backdrop-blur-md hover:bg-[#123D32] transition-colors shadow-lg cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-[#C6A15B]" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-[#C6A15B]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#FFFDF7]">
              {product.rating}
            </span>
            <span className="text-[11px] text-[#E8D5B7]/60">
              ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 className="text-base sm:text-lg font-serif-luxury font-medium text-[#FFFDF7] group-hover:text-[#E8D5B7] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subtitle / Subcategory */}
          <p className="text-xs text-[#E8D5B7]/70 mt-0.5 line-clamp-1">
            {product.subtitle || product.subcategory}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="mt-4 pt-3 border-t border-[#C6A15B]/15 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-semibold text-[#FFFDF7] font-sans">
                {settings.currencySymbol}
                {product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-[#E8D5B7]/50 line-through">
                  {settings.currencySymbol}
                  {product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Icon Button */}
          <button
            onClick={handleAddToCart}
            className="p-2 sm:px-3 sm:py-2 rounded-xl gold-gradient-bg text-[#092820] hover:opacity-90 transition-all font-medium text-xs flex items-center gap-1.5 shadow cursor-pointer"
            title="Add to Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

