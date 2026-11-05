import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Truck,
  Tag,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    settings,
    couponCode,
    appliedDiscountPercent,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
    setActiveView,
    setSelectedCategory,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartOpen) return null;

  // Free shipping calculation
  const amountNeededForFreeShipping = Math.max(
    0,
    settings.freeShippingThreshold - cartSubtotal
  );
  const freeShippingProgress = Math.min(
    100,
    (cartSubtotal / settings.freeShippingThreshold) * 100
  );

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleContinueShopping = () => {
    setIsCartOpen(false);
    setActiveView('shop');
    setSelectedCategory('all');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#092820] border-l border-[#C6A15B]/40 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#C6A15B]/20 flex items-center justify-between bg-[#0E332A]/70">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C6A15B]" />
              <h2 className="text-lg font-serif-luxury font-medium text-[#FFFDF7]">
                Your Shopping Bag
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#123D32] border border-[#C6A15B]/30 text-[#E8D5B7] font-mono">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Milestone Indicator */}
          {cart.length > 0 && (
            <div className="px-6 py-3 bg-[#123D32]/80 border-b border-[#C6A15B]/20 text-xs">
              <div className="flex items-center justify-between text-[#E8D5B7] mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#C6A15B]" />
                  {amountNeededForFreeShipping === 0 ? (
                    <span className="text-emerald-300 font-semibold">
                      🎉 Complimentary Express Delivery Unlocked!
                    </span>
                  ) : (
                    <span>
                      Add{' '}
                      <strong className="text-[#FFFDF7]">
                        {settings.currencySymbol}
                        {amountNeededForFreeShipping.toLocaleString('en-IN')}
                      </strong>{' '}
                      more for FREE Delivery
                    </span>
                  )}
                </span>
                <span className="font-mono text-[11px] text-[#C6A15B]">
                  {Math.round(freeShippingProgress)}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#092820] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C6A15B] to-[#E8D5B7] transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#123D32] border border-[#C6A15B]/30 flex items-center justify-center text-[#C6A15B] mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif-luxury text-[#FFFDF7]">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-[#E8D5B7]/70 max-w-xs mx-auto">
                  Discover exquisite jewellery, fine fragrances, and luxury accessories curated for you.
                </p>
                <button
                  onClick={handleContinueShopping}
                  className="px-6 py-2.5 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs uppercase tracking-wider shadow"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                  className="p-3.5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/25 flex gap-3.5 group hover:border-[#C6A15B]/60 transition-colors"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#092820] border border-[#C6A15B]/20 shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-serif-luxury font-medium text-[#FFFDF7] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.selectedVariant?.id)
                          }
                          className="text-[#E8D5B7]/50 hover:text-rose-400 p-0.5 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedVariant && (
                        <p className="text-[11px] text-[#C6A15B] mt-0.5 flex items-center gap-1">
                          <span>Option:</span>
                          <span className="text-[#FFFDF7]">{item.selectedVariant.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#C6A15B]/15">
                      <div className="flex items-center rounded-lg bg-[#092820] border border-[#C6A15B]/30 p-0.5">
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity - 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-6 h-6 rounded text-[#E8D5B7] hover:text-[#FFFDF7] flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-[#FFFDF7]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartQuantity(
                              item.product.id,
                              item.quantity + 1,
                              item.selectedVariant?.id
                            )
                          }
                          className="w-6 h-6 rounded text-[#E8D5B7] hover:text-[#FFFDF7] flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-semibold text-[#FFFDF7] font-sans">
                        {settings.currencySymbol}
                        {(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#C6A15B]/30 bg-[#0E332A]/90 backdrop-blur-md space-y-4">
              {/* Promo Code Input */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. ROYAL10)"
                    disabled={appliedDiscountPercent > 0}
                    className="w-full pl-8 pr-3 py-2 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] uppercase placeholder-[#E8D5B7]/40 focus:outline-none focus:border-[#C6A15B] disabled:opacity-60"
                  />
                </div>
                {appliedDiscountPercent > 0 ? (
                  <button
                    onClick={removeCoupon}
                    className="px-3 py-2 rounded-xl border border-rose-500/40 text-rose-300 text-xs hover:bg-rose-950/40"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      applyCoupon(inputCoupon);
                      setInputCoupon('');
                    }}
                    className="px-3.5 py-2 rounded-xl border border-[#C6A15B]/40 text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#092820] text-xs font-medium transition-colors"
                  >
                    Apply
                  </button>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#E8D5B7]/80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#FFFDF7] font-sans font-medium">
                    {settings.currencySymbol}
                    {cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({couponCode})</span>
                    <span className="font-sans font-medium">
                      -{settings.currencySymbol}
                      {cartDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-sans font-medium text-[#FFFDF7]">
                    {cartShipping === 0 ? (
                      <span className="text-emerald-400 uppercase text-[11px] font-semibold">
                        FREE
                      </span>
                    ) : (
                      `${settings.currencySymbol}${cartShipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-semibold text-[#FFFDF7] pt-2 border-t border-[#C6A15B]/20">
                  <span className="font-serif-luxury text-lg">Total</span>
                  <span className="font-sans text-xl gold-gradient-text">
                    {settings.currencySymbol}
                    {cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Proceed to WhatsApp Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-4 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-xl shadow-[#C6A15B]/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-[#E8D5B7]/60">
                🔒 Direct confirmation via Pasand Art Gallery Concierge on WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

