import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CustomerDetails, Order } from '../../types';
import confetti from 'canvas-confetti';
import {
  X,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Sparkles,
  ArrowRight,
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
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      errs.phone = 'Please provide a valid 10-digit mobile number';
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
      showToast('Form Incomplete', 'Please fill in all delivery details.', 'info');
      return;
    }

    // Place the order
    const result = placeOrder(formData);
    setCompletedOrder(result);

    // Launch celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C6A15B', '#E8D5B7', '#123D32', '#FFFDF7'],
      });
    } catch {}

    // Automatically open WhatsApp in a new tab
    window.open(result.whatsappUrl, '_blank');
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
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#092820] rounded-3xl border border-[#C6A15B]/40 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 text-[#E8D5B7] hover:text-[#FFFDF7] rounded-full hover:bg-[#123D32] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-6 overflow-y-auto flex-1">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs uppercase font-brand tracking-[0.25em] text-[#C6A15B]">
                Order Registered Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7] mt-1">
                Thank You, {completedOrder.order.customer.name}!
              </h2>
              <p className="text-sm text-[#E8D5B7]/80 mt-2 max-w-md mx-auto">
                Your order{' '}
                <strong className="text-[#FFFDF7]">#{completedOrder.order.id}</strong> has been
                logged and prepared for WhatsApp transmission to our concierge.
              </p>
            </div>

            {/* Order Card Summary */}
            <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between items-center text-xs pb-3 border-b border-[#C6A15B]/20">
                <span className="text-[#E8D5B7]/70">Order Reference</span>
                <span className="text-[#C6A15B] font-mono font-bold">
                  #{completedOrder.order.id}
                </span>
              </div>

              <div className="text-xs space-y-1.5 text-[#E8D5B7]">
                <p>
                  <strong className="text-[#FFFDF7]">Recipient:</strong>{' '}
                  {completedOrder.order.customer.name} ({completedOrder.order.customer.phone})
                </p>
                <p>
                  <strong className="text-[#FFFDF7]">Deliver to:</strong>{' '}
                  {completedOrder.order.customer.address}, {completedOrder.order.customer.city},{' '}
                  {completedOrder.order.customer.state} - {completedOrder.order.customer.pincode}
                </p>
                <p>
                  <strong className="text-[#FFFDF7]">Items ({completedOrder.order.items.length}):</strong>{' '}
                  {completedOrder.order.items.map((i) => i.productName).join(', ')}
                </p>
              </div>

              <div className="flex justify-between items-center text-base font-semibold text-[#FFFDF7] pt-3 border-t border-[#C6A15B]/20">
                <span>Grand Total:</span>
                <span className="font-sans text-xl gold-gradient-text">
                  {settings.currencySymbol}
                  {completedOrder.order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 max-w-md mx-auto">
              <a
                href={completedOrder.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Open WhatsApp & Send Order</span>
                <ExternalLink className="w-4 h-4 ml-1" />
              </a>

              <div className="flex gap-2">
                <button
                  onClick={handleCopySummary}
                  className="flex-1 py-2.5 rounded-xl border border-[#C6A15B]/30 hover:border-[#C6A15B] text-xs text-[#E8D5B7] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Reference</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs transition-opacity hover:opacity-95"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Delivery Details Form */
          <div className="overflow-y-auto flex-1 pr-1">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-brand tracking-[0.25em] text-[#C6A15B] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Boutique Order Details</span>
              </div>
              <h2 className="text-2xl font-serif-luxury font-medium text-[#FFFDF7]">
                Delivery Address & WhatsApp Checkout
              </h2>
              <p className="text-xs text-[#E8D5B7]/70 mt-1">
                Provide your destination details. Your order will be seamlessly formatted and sent to the Pasand Art Gallery boutique WhatsApp number ({settings.whatsappDisplayNumber}).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Radhika Sharma"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.name ? 'border-rose-500' : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
                </div>

                {/* Mobile Phone */}
                <div>
                  <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                    WhatsApp Phone Number *
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
                      className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                        errors.phone
                          ? 'border-rose-500'
                          : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                  Street Address, Apartment / House No. *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 402 Royal Palms, MG Road"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                    errors.address
                      ? 'border-rose-500'
                      : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.address}</p>
                )}
              </div>

              {/* City, State, PIN */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#E8D5B7] mb-1">City *</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    className={`w-full px-3 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.city ? 'border-rose-500' : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-rose-400 mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E8D5B7] mb-1">State *</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    className={`w-full px-3 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.state
                        ? 'border-rose-500'
                        : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                    }`}
                  />
                  {errors.state && <p className="text-[11px] text-rose-400 mt-1">{errors.state}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#E8D5B7] mb-1">PIN Code *</label>
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
                    className={`w-full px-3 py-2.5 rounded-xl bg-[#0E332A] border text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none ${
                      errors.pincode
                        ? 'border-rose-500'
                        : 'border-[#C6A15B]/30 focus:border-[#C6A15B]'
                    }`}
                  />
                  {errors.pincode && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>

              {/* Order Notes */}
              <div>
                <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                  Gift Message or Special Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.orderNotes}
                  onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                  placeholder="e.g. Please add royal gift wrap and handle with care."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] placeholder-[#E8D5B7]/40 focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Order Brief Summary */}
              <div className="p-4 rounded-xl bg-[#0E332A]/70 border border-[#C6A15B]/20 text-xs space-y-1.5">
                <div className="flex justify-between text-[#E8D5B7]">
                  <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
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
                  <span>{cartShipping === 0 ? 'FREE' : `${settings.currencySymbol}${cartShipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#FFFDF7] pt-2 border-t border-[#C6A15B]/20">
                  <span>Grand Total</span>
                  <span className="font-sans text-base text-[#C6A15B]">
                    {settings.currencySymbol}
                    {cartTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:opacity-95 transition-all shadow-xl shadow-[#C6A15B]/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Place Order via WhatsApp ({settings.currencySymbol}{cartTotal.toLocaleString('en-IN')})</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

