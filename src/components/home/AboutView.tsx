import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from '../common/Logo';
import { Sparkles, Award, Shield, Heart, MapPin, Phone, Mail, MessageCircle, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { settings, setActiveView, setSelectedCategory } = useStore();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16 animate-in fade-in duration-300">
      {/* Hero Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Logo size="lg" centered={true} />
        <div className="inline-flex items-center gap-2 text-xs font-brand tracking-[0.3em] text-[#C6A15B] uppercase pt-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Heritage • Artistry • Elegance</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif-luxury font-medium text-[#FFFDF7] leading-tight">
          Where Regal Indian Splendor Meets Contemporary Luxury
        </h1>
        <p className="text-sm sm:text-base text-[#E8D5B7]/80 leading-relaxed font-light">
          Founded with a devotion to timeless elegance, <strong>Pasand Art Gallery</strong> is a curated sanctuary celebrating royal imitation jewellery, imperial fragrances, velvet cosmetics, and distinguished lifestyle accessories.
        </p>
      </div>

      {/* Brand Story Imagery & Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="relative rounded-3xl overflow-hidden border border-[#C6A15B]/40 shadow-2xl aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85"
            alt="Pasand Art Gallery Craftsmanship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#092820]/90 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="text-xs uppercase font-brand tracking-widest text-[#C6A15B]">
              Handcrafted Perfection
            </span>
            <p className="text-base font-serif-luxury text-[#FFFDF7] mt-1">
              "Every jewel tells an ancestral tale, polished for the modern connoisseur."
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#E8D5B7]/90 leading-relaxed font-light">
          <h2 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7]">
            The Art of the Imitation Jewel
          </h2>
          <p>
            We believe that extraordinary luxury should be joyful, accessible, and worn with effortless confidence. Each piece in our imitation jewellery collection is cast in hypoallergenic brass and copper alloys, layered with 22-karat micro-gold plating, and handset with faceted kundan, hydro crystals, and seed pearls.
          </p>
          <p>
            Beyond jewels, our boutique fragrances explore rare Cambodian agarwoods, damask rose attars, and velvety vanilla elixirs—formulated to leave an indelible impression.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedCategory('jewellery');
                setActiveView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs uppercase tracking-wider flex items-center gap-2 shadow"
            >
              <span>Explore Creations</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Pillars of Integrity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="p-6 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-3">
          <Award className="w-8 h-8 text-[#C6A15B]" />
          <h3 className="text-lg font-serif-luxury text-[#FFFDF7]">22K Micro-Finish</h3>
          <p className="text-xs text-[#E8D5B7]/70 leading-relaxed">
            Multi-layered electroplating ensures luster and tarnish resistance that mirrors solid heirloom gold.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-3">
          <Shield className="w-8 h-8 text-[#C6A15B]" />
          <h3 className="text-lg font-serif-luxury text-[#FFFDF7]">Skin-Safe & Nickel-Free</h3>
          <p className="text-xs text-[#E8D5B7]/70 leading-relaxed">
            All pieces are hypoallergenic and comfortable for sensitive skin during wedding ceremonies and gala evenings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-3">
          <Heart className="w-8 h-8 text-[#C6A15B]" />
          <h3 className="text-lg font-serif-luxury text-[#FFFDF7]">Personalized Care</h3>
          <p className="text-xs text-[#E8D5B7]/70 leading-relaxed">
            Direct concierge assistance over WhatsApp for bespoke sizing, bridal pairings, and festive gifting.
          </p>
        </div>
      </div>

      {/* Boutique Concierge Card */}
      <div className="p-8 rounded-3xl bg-[#0E332A] border border-[#C6A15B]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-serif-luxury text-[#FFFDF7]">Visit or Connect With Us</h3>
          <p className="text-xs sm:text-sm text-[#E8D5B7]/80">
            {settings.address} • Daily Concierge: 10:00 AM – 8:00 PM IST
          </p>
        </div>

        <a
          href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20Pasand%20Art%20Gallery,%20I%20would%20like%20to%20connect.`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow shrink-0"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Connect via WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

