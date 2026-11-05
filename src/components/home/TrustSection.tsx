import React from 'react';
import { ShieldCheck, Truck, Headphones, MessageSquareQuote } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Quality Products',
      subtitle: '22K micro-gold plated finishes, skin-friendly alloys and verified craftsmanship.',
    },
    {
      icon: Truck,
      title: 'Easy Ordering',
      subtitle: 'Seamless WhatsApp-assisted checkout with direct concierge order confirmation.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      subtitle: 'Dedicated boutique assistance for sizing, styling, and post-purchase care.',
    },
    {
      icon: MessageSquareQuote,
      title: 'Secure Shopping',
      subtitle: 'Zero fake payment traps. Direct transparent communication with the gallery.',
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h3 className="text-2xl sm:text-3xl font-serif-luxury font-medium text-[#FFFDF7]">
          The Pasand Promise
        </h3>
        <p className="text-xs sm:text-sm text-[#E8D5B7]/70 mt-2">
          Grounded in Indian boutique traditions, trusted by connoisseurs across India.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {pillars.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-2xl bg-[#0E332A]/70 border border-[#C6A15B]/25 hover:border-[#C6A15B]/50 transition-all text-center flex flex-col items-center"
            >
              <div className="w-12 h-12 rounded-full bg-[#123D32] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B] mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-[#FFFDF7] mb-2">{item.title}</h4>
              <p className="text-xs text-[#E8D5B7]/80 leading-relaxed">{item.subtitle}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

