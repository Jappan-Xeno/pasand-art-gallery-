import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  X,
  User,
  Package,
  Calendar,
  Clock,
  Phone,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const AccountModal: React.FC = () => {
  const {
    isAccountOpen,
    setIsAccountOpen,
    orders,
    settings,
    setIsAdminLoginOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!isAccountOpen) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/50';
      case 'shipped':
        return 'bg-cyan-950 text-cyan-300 border-cyan-500/50';
      case 'processing':
        return 'bg-amber-950 text-amber-300 border-amber-500/50';
      default:
        return 'bg-slate-900 text-[#E8D5B7] border-[#C6A15B]/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#092820] rounded-3xl border border-[#C6A15B]/40 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-[#C6A15B]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#123D32] border border-[#C6A15B]/40 flex items-center justify-center text-[#C6A15B]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-serif-luxury font-medium text-[#FFFDF7]">
                Customer Account
              </h2>
              <p className="text-xs text-[#E8D5B7]/70">Track your orders & purchases</p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="p-1.5 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex gap-4 border-b border-[#C6A15B]/20 pt-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-xs uppercase tracking-wider font-brand transition-colors relative ${
              activeTab === 'orders'
                ? 'text-[#C6A15B] font-semibold'
                : 'text-[#E8D5B7]/60 hover:text-[#FFFDF7]'
            }`}
          >
            Order History ({orders.length})
            {activeTab === 'orders' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6A15B]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 text-xs uppercase tracking-wider font-brand transition-colors relative ${
              activeTab === 'profile'
                ? 'text-[#C6A15B] font-semibold'
                : 'text-[#E8D5B7]/60 hover:text-[#FFFDF7]'
            }`}
          >
            Concierge Assistance
            {activeTab === 'profile' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#C6A15B]" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <Package className="w-12 h-12 text-[#E8D5B7]/30 mx-auto" />
                  <p className="text-sm text-[#FFFDF7] font-medium">No previous orders</p>
                  <p className="text-xs text-[#E8D5B7]/60 max-w-xs mx-auto">
                    When you order through WhatsApp, your reference will be tracked here.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C6A15B]">
                              #{order.id}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#E8D5B7]/60 mt-0.5">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </div>

                        <span className="text-base font-semibold text-[#FFFDF7] font-sans">
                          {settings.currencySymbol}
                          {order.total.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="space-y-1.5 pt-2 border-t border-[#C6A15B]/15">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between text-xs text-[#E8D5B7]"
                          >
                            <span className="truncate max-w-[260px]">
                              {item.quantity}x {item.productName}
                              {item.variantName ? ` (${item.variantName})` : ''}
                            </span>
                            <span className="font-sans">
                              {settings.currencySymbol}
                              {(item.price * item.quantity).toLocaleString('en-IN')}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Customer Details */}
                      <div className="text-[11px] text-[#E8D5B7]/70 pt-2 border-t border-[#C6A15B]/15">
                        <span>Recipient: {order.customer.name} • {order.customer.city}, {order.customer.state}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs text-[#E8D5B7]/80">
              <div className="p-4 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-3">
                <h3 className="text-sm font-semibold text-[#FFFDF7]">
                  Pasand Art Gallery Client Concierge
                </h3>
                <p className="leading-relaxed">
                  Need to update your delivery address, track a live package, or request special gift presentation? Contact our concierge team anytime on WhatsApp.
                </p>

                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hi%20Pasand%20Art%20Gallery,%20I%20have%20an%20inquiry%20regarding%20my%20order.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Concierge ({settings.whatsappDisplayNumber})</span>
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-[#0E332A]/50 border border-[#C6A15B]/20 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-[#FFFDF7]">Store Administration</h4>
                  <p className="text-[11px] text-[#E8D5B7]/60">Are you the boutique shop owner?</p>
                </div>
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    setIsAdminLoginOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-[#C6A15B]/40 text-[#C6A15B] text-xs hover:bg-[#123D32]"
                >
                  Store Owner Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

