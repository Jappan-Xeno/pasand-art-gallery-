import React from 'react';
import { useStore } from '../../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    products,
    toggleWishlist,
    addToCart,
    settings,
    setSelectedProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#092820] border-l border-[#C6A15B]/40 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#C6A15B]/20 flex items-center justify-between bg-[#0E332A]/70">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-[#C6A15B] fill-current" />
              <h2 className="text-lg font-serif-luxury font-medium text-[#FFFDF7]">
                Saved Treasures
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#123D32] border border-[#C6A15B]/30 text-[#E8D5B7] font-mono">
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-1.5 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="py-24 text-center space-y-3">
                <Heart className="w-12 h-12 text-[#E8D5B7]/30 mx-auto" />
                <h3 className="text-lg font-serif-luxury text-[#FFFDF7]">
                  No items in your wishlist yet
                </h3>
                <p className="text-xs text-[#E8D5B7]/70 max-w-xs mx-auto">
                  Click the heart icon on any jewellery piece, perfume, or accessory to save it here.
                </p>
              </div>
            ) : (
              wishlistProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-3.5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/25 flex gap-3.5 group hover:border-[#C6A15B]/60 transition-colors"
                >
                  <div
                    onClick={() => {
                      setSelectedProduct(prod);
                      setIsWishlistOpen(false);
                    }}
                    className="w-20 h-20 rounded-xl overflow-hidden bg-[#092820] border border-[#C6A15B]/20 shrink-0 cursor-pointer"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4
                          onClick={() => {
                            setSelectedProduct(prod);
                            setIsWishlistOpen(false);
                          }}
                          className="text-sm font-serif-luxury font-medium text-[#FFFDF7] truncate cursor-pointer hover:text-[#C6A15B]"
                        >
                          {prod.name}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="text-[#E8D5B7]/50 hover:text-rose-400 p-0.5"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#C6A15B] font-semibold mt-1">
                        {settings.currencySymbol}
                        {prod.price.toLocaleString('en-IN')}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        addToCart(prod, 1, prod.variants?.[0]);
                      }}
                      className="w-full mt-2 py-2 rounded-xl gold-gradient-bg text-[#092820] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

