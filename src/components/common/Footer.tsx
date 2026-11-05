import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Shield,
  Truck,
  RotateCcw,
  Sparkles,
  Award,
} from 'lucide-react';
import { CategoryId } from '../../types';

export const Footer: React.FC = () => {
  const { settings, setSelectedCategory, setActiveView, categories } = useStore();

  const handleCategoryClick = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    setActiveView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#04140F] text-[#FFFDF7] border-t-2 border-[#D4AF37]/40 pt-16 pb-24 lg:pb-12 mt-16 relative overflow-hidden">
      {/* Decorative Gold Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#F5D77F] to-transparent shadow-[0_0_15px_#D4AF37]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Trust Pillars Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 mb-12 border-b border-[#D4AF37]/25">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#0E3328] border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F5D77F] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFDF7]">Artisan Finishes</h4>
              <p className="text-xs text-[#E8D5B7]/80">22K micro-plated craftsmanship</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#0E3328] border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F5D77F] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFDF7]">Complimentary Express</h4>
              <p className="text-xs text-[#E8D5B7]/80">On all orders above ₹{settings.freeShippingThreshold}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#0E3328] border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F5D77F] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFDF7]">Easy Returns</h4>
              <p className="text-xs text-[#E8D5B7]/80">Within 7 days of delivery</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#0E3328] border-2 border-[#D4AF37]/50 flex items-center justify-center shrink-0 text-[#F5D77F] shadow-[0_0_15px_rgba(212,175,55,0.25)]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#FFFDF7]">Verified Quality</h4>
              <p className="text-xs text-[#E8D5B7]/80">Skin safe, tarnish resistant</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-[#E8D5B7]/80 leading-relaxed max-w-sm mt-3">
              Pasand Art Gallery is a distinguished luxury Indian boutique presenting handpicked imitation jewellery, royal fragrances, velvet beauty essentials, and refined accessories for celebrated moments.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#C6A15B]">
              <Sparkles className="w-4 h-4" />
              <span>Elegance in Every Detail</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#123D32] border border-[#C6A15B]/30 flex items-center justify-center text-[#E8D5B7] hover:text-[#FFFDF7] hover:border-[#C6A15B] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-[#123D32] border border-[#C6A15B]/30 flex items-center justify-center text-[#E8D5B7] hover:text-[#FFFDF7] hover:border-[#C6A15B] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#123D32] border border-[#C6A15B]/30 flex items-center justify-center text-[#E8D5B7] hover:text-emerald-400 hover:border-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-brand tracking-[0.25em] text-[#C6A15B] uppercase mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8D5B7]/80">
              {categories.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => handleCategoryClick(c.id)}
                    className="hover:text-[#FFFDF7] hover:translate-x-1 transition-all text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleCategoryClick('all')}
                  className="hover:text-[#FFFDF7] hover:translate-x-1 transition-all text-left text-[#C6A15B]"
                >
                  View All Products →
                </button>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-brand tracking-[0.25em] text-[#C6A15B] uppercase mb-4">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8D5B7]/80">
              <li>
                <button
                  onClick={() => {
                    setActiveView('about');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-[#FFFDF7] transition-colors"
                >
                  About the House
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hi,%20I%20need%20assistance%20with%20an%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFDF7] transition-colors"
                >
                  Order Tracking via WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hi,%20I%20have%20questions%20regarding%20jewellery%20customization.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FFFDF7] transition-colors"
                >
                  Custom Jewellery Inquiry
                </a>
              </li>
              <li>
                <span className="text-[#E8D5B7]/50 cursor-not-allowed">Care & Cleaning Guide</span>
              </li>
              <li>
                <span className="text-[#E8D5B7]/50 cursor-not-allowed">Shipping & Returns Policy</span>
              </li>
            </ul>
          </div>

          {/* Boutique Concierge */}
          <div>
            <h4 className="text-xs font-brand tracking-[0.25em] text-[#C6A15B] uppercase mb-4">
              Boutique Concierge
            </h4>
            <div className="space-y-3 text-sm text-[#E8D5B7]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C6A15B] shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a
                  href={`tel:${settings.whatsappNumber}`}
                  className="text-xs hover:text-[#FFFDF7]"
                >
                  {settings.whatsappDisplayNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C6A15B] shrink-0" />
                <a
                  href={`mailto:${settings.email}`}
                  className="text-xs hover:text-[#FFFDF7] truncate"
                >
                  {settings.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20Pasand%20Art%20Gallery,%20I%20would%20like%20to%20connect%20with%20the%20concierge.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-800 text-xs transition-colors font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#C6A15B]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D5B7]/60 gap-4">
          <p>© {new Date().getFullYear()} Pasand Art Gallery. All Rights Reserved.</p>
          <p className="flex items-center gap-1.5 text-center">
            <span>Crafted with</span>
            <span className="text-[#C6A15B]">⚜</span>
            <span>for Royal Luxury & Timeless Grace</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
