import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductVariant } from '../../types';
import {
  X,
  Heart,
  Share2,
  Star,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Sparkles,
} from 'lucide-react';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose }) => {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    setIsCartOpen,
    settings,
    products,
    setSelectedProduct,
    showToast,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specifications' | 'care'>('details');

  if (!product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariant);
    onClose();
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${product.name} — Pasand Art Gallery`,
          text: `Check out ${product.name} at Pasand Art Gallery for ${settings.currencySymbol}${product.price}`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link Copied', 'Product link copied to clipboard.', 'info');
    }
  };

  // Related products
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#092820] sm:rounded-3xl border border-[#C6A15B]/40 shadow-2xl overflow-hidden flex flex-col max-h-[100vh] sm:max-h-[92vh]">
        {/* Top Header Bar matching reference mobile screen */}
        <div className="sticky top-0 z-20 bg-[#092820]/95 backdrop-blur-md border-b border-[#C6A15B]/20 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-[#E8D5B7] hover:text-[#FFFDF7] p-1 rounded-lg"
          >
            <ChevronLeft className="w-5 h-5 text-[#C6A15B]" />
            <span className="hidden sm:inline">Back to Catalogue</span>
          </button>

          <span className="text-xs uppercase font-brand tracking-[0.25em] text-[#C6A15B] font-medium truncate max-w-[200px]">
            {product.category.replace('-', ' ')}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-2 rounded-full border transition-colors ${
                isFavorited
                  ? 'bg-[#C6A15B] text-[#092820] border-[#C6A15B]'
                  : 'bg-[#123D32]/70 text-[#FFFDF7] border-[#C6A15B]/30 hover:border-[#C6A15B]'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-[#C6A15B]/30 bg-[#123D32]/70 text-[#FFFDF7] hover:border-[#C6A15B] transition-colors"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#E8D5B7] hover:text-[#FFFDF7] transition-colors ml-1"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left: Product Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#071F19] border border-[#C6A15B]/30 group">
                <img
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />

                {/* Pagination Indicator Pill (e.g. 1/5 matching screenshot) */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-[#092820]/80 border border-[#C6A15B]/40 text-[#FFFDF7] text-xs font-mono backdrop-blur-sm">
                  {activeImageIndex + 1}/{product.images.length}
                </div>

                {/* Image Nav Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#092820]/75 border border-[#C6A15B]/30 text-[#FFFDF7] flex items-center justify-center hover:bg-[#123D32] transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#092820]/75 border border-[#C6A15B]/30 text-[#FFFDF7] flex items-center justify-center hover:bg-[#123D32] transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails list */}
              {product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        idx === activeImageIndex
                          ? 'border-[#C6A15B] scale-105 shadow-md shadow-[#C6A15B]/30'
                          : 'border-[#C6A15B]/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Details & Controls */}
            <div className="space-y-6">
              <div>
                {/* Rating badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#123D32] border border-[#C6A15B]/30 text-xs mb-3">
                  <Star className="w-3.5 h-3.5 text-[#C6A15B] fill-current" />
                  <span className="font-semibold text-[#FFFDF7]">{product.rating}</span>
                  <span className="text-[#E8D5B7]/70">({product.reviewCount} verified reviews)</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] leading-snug">
                  {product.name}
                </h1>
                {product.subtitle && (
                  <p className="text-sm text-[#E8D5B7]/80 mt-1">{product.subtitle}</p>
                )}
              </div>

              {/* Price section */}
              <div className="flex items-baseline gap-3 p-4 rounded-xl bg-[#123D32]/50 border border-[#C6A15B]/20">
                <span className="text-3xl font-bold font-sans text-[#FFFDF7]">
                  {settings.currencySymbol}
                  {product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-base text-[#E8D5B7]/50 line-through">
                    {settings.currencySymbol}
                    {product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.discountPercent > 0 && (
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase bg-amber-900/80 text-amber-200 border border-amber-600/40">
                    -{product.discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-[#E8D5B7]/90 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Trust Badges matching screen 4 */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#C6A15B]/20 text-center">
                <div className="flex flex-col items-center">
                  <Truck className="w-4 h-4 text-[#C6A15B] mb-1" />
                  <span className="text-[11px] font-semibold text-[#FFFDF7]">Free Delivery</span>
                  <span className="text-[9px] text-[#E8D5B7]/60">Above ₹{settings.freeShippingThreshold}</span>
                </div>
                <div className="flex flex-col items-center border-x border-[#C6A15B]/20">
                  <RotateCcw className="w-4 h-4 text-[#C6A15B] mb-1" />
                  <span className="text-[11px] font-semibold text-[#FFFDF7]">Easy Returns</span>
                  <span className="text-[9px] text-[#E8D5B7]/60">Within 7 days</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck className="w-4 h-4 text-[#C6A15B] mb-1" />
                  <span className="text-[11px] font-semibold text-[#FFFDF7]">Quality Assured</span>
                  <span className="text-[9px] text-[#E8D5B7]/60">Premium finish</span>
                </div>
              </div>

              {/* Color Options / Variants matching screen 4 */}
              {product.variants && product.variants.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-brand">
                      Color / Option:
                    </span>
                    <span className="text-xs text-[#FFFDF7] font-medium">
                      {selectedVariant?.name || 'Selected'}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C6A15B] bg-[#123D32] text-[#FFFDF7] shadow-md shadow-[#C6A15B]/20 ring-1 ring-[#C6A15B]'
                              : 'border-[#C6A15B]/30 bg-[#0E332A] text-[#E8D5B7] hover:border-[#C6A15B]/60'
                          }`}
                        >
                          {v.colorCode && (
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-[#FFFDF7]/30 shrink-0"
                              style={{ backgroundColor: v.colorCode }}
                            />
                          )}
                          <span>{v.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs uppercase tracking-wider text-[#C6A15B] font-brand">
                  Quantity:
                </span>
                <div className="flex items-center rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32] flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-semibold text-sm text-[#FFFDF7]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32] flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  ● In Stock ({product.stockCount} available)
                </span>
              </div>

              {/* Action Buttons matching reference screen 4:
                  Add to Cart (outline gold) + Buy Now (gold gradient) */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="py-4 px-4 rounded-2xl border-2 border-[#D4AF37] text-[#F5D77F] hover:bg-[#D4AF37] hover:text-[#061B15] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-4 px-4 rounded-2xl gold-foil-bg text-[#061B15] hover:brightness-110 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_25px_rgba(212,175,55,0.4)]"
                >
                  <Sparkles className="w-4 h-4 text-[#061B15]" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>

          {/* Details / Specifications / Care Tabs */}
          <div className="pt-6 border-t border-[#C6A15B]/20">
            <div className="flex items-center gap-6 border-b border-[#C6A15B]/20 pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs uppercase tracking-wider font-brand pb-2 transition-colors relative ${
                  activeTab === 'details'
                    ? 'text-[#C6A15B] font-semibold'
                    : 'text-[#E8D5B7]/60 hover:text-[#FFFDF7]'
                }`}
              >
                Features & Highlights
                {activeTab === 'details' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6A15B]" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('specifications')}
                className={`text-xs uppercase tracking-wider font-brand pb-2 transition-colors relative ${
                  activeTab === 'specifications'
                    ? 'text-[#C6A15B] font-semibold'
                    : 'text-[#E8D5B7]/60 hover:text-[#FFFDF7]'
                }`}
              >
                Specifications
                {activeTab === 'specifications' && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6A15B]" />
                )}
              </button>
            </div>

            <div className="pt-4 text-xs sm:text-sm text-[#E8D5B7]/80">
              {activeTab === 'details' && (
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#C6A15B] text-base leading-none">✦</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div
                      key={key}
                      className="p-2.5 rounded-lg bg-[#0E332A] border border-[#C6A15B]/20 flex justify-between"
                    >
                      <span className="text-[#E8D5B7]/60 font-medium">{key}:</span>
                      <span className="text-[#FFFDF7] text-right font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="pt-8 border-t border-[#C6A15B]/20">
              <h3 className="text-lg font-serif-luxury text-[#FFFDF7] mb-4">
                You May Also Admire
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      setActiveImageIndex(0);
                      setSelectedVariant(rel.variants?.[0]);
                    }}
                    className="p-3 rounded-xl bg-[#0E332A] border border-[#C6A15B]/25 hover:border-[#C6A15B] cursor-pointer transition-colors group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-[#092820]">
                      <img
                        src={rel.images[0]}
                        alt={rel.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <p className="text-xs font-serif-luxury font-medium text-[#FFFDF7] truncate">
                      {rel.name}
                    </p>
                    <p className="text-xs text-[#C6A15B] font-semibold mt-0.5">
                      {settings.currencySymbol}
                      {rel.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

