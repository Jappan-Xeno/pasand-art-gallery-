import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CustomerDetails, Order } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  MessageCircle,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  Phone,
  ShieldCheck,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    couponCode,
    settings,
    placeOrder,
    showToast,
  } = useStore();

  const [formData, setFormData] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerDetails>>({});
  const [completedOrder, setCompletedOrder] = useState<{
    order: Order;
    whatsappUrl: string;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const validate = () => {
    const errs: Partial<CustomerDetails> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please enter a valid 10-digit number';
    }
    if (!formData.address.trim()) errs.address = 'Delivery address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.pincode.trim() || formData.pincode.length < 5) {
      errs.pincode = 'Valid PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      showToast('Details Missing', 'Please fill in all delivery fields.', 'info');
      return;
    }

    // Place the order
    const result = placeOrder(formData);
    setCompletedOrder(result);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5D77F', '#D4AF37', '#103328', '#FFFDF7'],
      });
    } catch {}

    // On mobile devices, redirect directly to WhatsApp app URL
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobileDevice) {
      window.location.href = result.whatsappUrl;
    } else {
      window.open(result.whatsappUrl, '_blank');
    }
  };

  const handleCopySummary = () => {
    if (!completedOrder) return;
    navigator.clipboard.writeText(
      `Order #${completedOrder.order.id} at Pasand Art Gallery for ${settings.currencySymbol}${completedOrder.order.total}`
    );
    showToast('Copied', 'Order details copied to clipboard.', 'gold');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#071F18] rounded-t-3xl sm:rounded-3xl border-t-2 sm:border-2 border-[#D4AF37]/50 shadow-2xl p-5 sm:p-7 overflow-hidden max-h-[92dvh] flex flex-col">
        {/* Top Header / Close */}
        <div className="flex items-center justify-between pb-3 border-b border-[#D4AF37]/25 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-brand tracking-[0.2em] text-[#F5D77F] uppercase font-bold">
              {completedOrder ? 'Order Confirmed' : 'WhatsApp Express Order'}
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#E8D5B7] hover:text-white bg-[#04140F] border border-[#D4AF37]/30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {completedOrder ? (
          /* Success Screen with Big Mobile-Friendly WhatsApp Button */
          <div className="text-center py-5 space-y-5 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)] animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <h2 className="text-2xl font-serif-luxury font-medium text-[#FFFDF7]">
                Order Ready to Dispatch!
              </h2>
              <p className="text-xs text-[#E8D5B7]/80 mt-1 max-w-sm mx-auto">
                Reference: <strong className="text-[#F5D77F] font-mono">#{completedOrder.order.id}</strong>. Tap below to send this order directly to our WhatsApp Concierge.
              </p>
            </div>

            {/* Big Green Direct WhatsApp Button */}
            <div className="space-y-3 max-w-md mx-auto pt-2">
              <a
                href={completedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(16,185,129,0.4)] transition-all cursor-pointer animate-pulse"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                <span>OPEN WHATSAPP NOW</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <p className="text-[11px] text-emerald-400 font-medium">
                ✓ Pre-formatted royal invoice ready to send
              </p>
            </div>

            {/* Summary preview */}
            <div className="p-4 rounded-2xl bg-[#04140F] border border-[#D4AF37]/30 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between font-semibold text-[#FFFDF7] border-b border-[#D4AF37]/20 pb-2">
                <span>Customer: {completedOrder.order.customer.name}</span>
                <span className="text-[#F5D77F] font-mono">{completedOrder.order.customer.phone}</span>
              </div>
              <p className="text-[#E8D5B7]/80 truncate">
                Address: {completedOrder.order.customer.address}, {completedOrder.order.customer.city}
              </p>
              <div className="flex justify-between text-sm font-bold text-[#FFFDF7] pt-2 border-t border-[#D4AF37]/20">
                <span>Grand Total:</span>
                <span className="gold-foil-text text-base">
                  {settings.currencySymbol}
                  {completedOrder.order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Return CTA */}
            <div className="flex gap-2 max-w-md mx-auto">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-3 rounded-xl border border-[#D4AF37]/40 text-xs text-[#E8D5B7] flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl gold-foil-bg text-[#061B15] font-bold text-xs uppercase"
              >
                Done / Continue
              </button>
            </div>
          </div>
        ) : (
          /* Delivery Details Form with Sticky/Reachable WhatsApp Submit */
          <div className="overflow-y-auto flex-1 py-3 space-y-4">
            <div className="text-left">
              <h2 className="text-xl font-serif-luxury font-medium text-[#FFFDF7]">
                Delivery Address
              </h2>
              <p className="text-[11px] text-[#E8D5B7]/75">
                Fill details to send order directly to Pasand Art Gallery WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanka Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.name ? 'border-rose-500' : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                    }`}
                  />
                  {errors.name && <p className="text-[10px] text-rose-400 mt-0.5">{errors.name}</p>}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">
                    WhatsApp Mobile Number *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#E8D5B7]/60">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value.replace(/[^0-9]/g, ''),
                        })
                      }
                      placeholder="9876543210"
                      className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                        errors.phone
                          ? 'border-rose-500'
                          : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-400 mt-0.5">{errors.phone}</p>}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">
                  Complete Delivery Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House/Flat No., Street, Landmark"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                    errors.address
                      ? 'border-rose-500'
                      : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                  }`}
                />
                {errors.address && (
                  <p className="text-[10px] text-rose-400 mt-0.5">{errors.address}</p>
                )}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Mumbai"
                    className={`w-full px-2.5 sm:px-3 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.city ? 'border-rose-500' : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                    }`}
                  />
                  {errors.city && <p className="text-[10px] text-rose-400 mt-0.5">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="State"
                    className={`w-full px-2.5 sm:px-3 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.state
                        ? 'border-rose-500'
                        : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                    }`}
                  />
                  {errors.state && <p className="text-[10px] text-rose-400 mt-0.5">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-[#F5D77F] mb-1">PIN *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        pincode: e.target.value.replace(/[^0-9]/g, ''),
                      })
                    }
                    placeholder="400001"
                    className={`w-full px-2.5 sm:px-3 py-2.5 rounded-xl bg-[#04140F] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.pincode
                        ? 'border-rose-500'
                        : 'border-[#D4AF37]/40 focus:border-[#F5D77F]'
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-[10px] text-rose-400 mt-0.5">{errors.pincode}</p>
                  )}
                </div>
              </div>

              {/* Order Brief Summary */}
              <div className="p-3.5 rounded-xl bg-[#04140F] border border-[#D4AF37]/30 text-xs space-y-1.5">
                <div className="flex justify-between text-[#E8D5B7]">
                  <span>Items in Bag ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
                  <span className="font-sans">
                    {settings.currencySymbol}
                    {cartSubtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({couponCode})</span>
                    <span className="font-sans">
                      -{settings.currencySymbol}
                      {cartDiscount.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-[#E8D5B7]">
                  <span>Delivery</span>
                  <span className="text-emerald-400 font-semibold">{cartShipping === 0 ? 'FREE' : `${settings.currencySymbol}${cartShipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#FFFDF7] pt-2 border-t border-[#D4AF37]/20">
                  <span>Grand Total</span>
                  <span className="font-sans text-base text-[#F5D77F]">
                    {settings.currencySymbol}
                    {cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Primary Mobile Submit Button */}
              <button
                type="submit"
                className="w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold text-sm tracking-wider uppercase shadow-[0_10px_25px_rgba(16,185,129,0.35)] flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>SEND ORDER VIA WHATSAPP ({settings.currencySymbol}{cartTotal.toLocaleString('en-IN')})</span>
              </button>

              <p className="text-[10px] text-center text-[#E8D5B7]/60">
                🔒 Sends order details directly to Pasand Art Gallery WhatsApp ({settings.whatsappDisplayNumber})
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
