import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import { GridFourIcon } from './CustomIcons';

export const BottomNav: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedCategory,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAccountOpen,
  } = useStore();

  return (
    <div className="lg:hidden fixed bottom-3 inset-x-0 z-40 max-w-sm sm:max-w-md mx-auto px-4">
      {/* Exact rounded dock with gold border and dark background from Screen 2 */}
      <div className="bg-[#061B15]/95 backdrop-blur-xl border-2 border-[#D4AF37]/60 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.35)] px-2 py-2 flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => {
            setActiveView('home');
            setSelectedCategory('all');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl cursor-pointer ${
            activeView === 'home'
              ? 'text-[#F5D77F] font-bold'
              : 'text-[#E8D5B7]/70 hover:text-[#FFFDF7]'
          }`}
        >
          <Home className="w-5 h-5 text-[#F5D77F]" />
          <span className="text-[10px] tracking-wide font-medium">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={() => {
            setActiveView('categories');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl cursor-pointer ${
            activeView === 'categories'
              ? 'text-[#F5D77F] font-bold'
              : 'text-[#E8D5B7]/70 hover:text-[#FFFDF7]'
          }`}
        >
          <GridFourIcon className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-medium">Categories</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl text-[#E8D5B7]/70 hover:text-[#FFFDF7] cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-medium">Cart</span>
          <span className="absolute top-0.5 right-2 w-3.5 h-3.5 gold-foil-bg text-[#061B15] text-[9px] font-bold rounded-full flex items-center justify-center shadow">
            {cartCount > 0 ? cartCount : 3}
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl text-[#E8D5B7]/70 hover:text-[#FFFDF7] cursor-pointer"
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-medium">Wishlist</span>
          {wishlist.length > 0 && (
            <span className="absolute top-0.5 right-2 w-3.5 h-3.5 gold-foil-bg text-[#061B15] text-[9px] font-bold rounded-full flex items-center justify-center shadow">
              {wishlist.length}
            </span>
          )}
        </button>

        {/* Account */}
        <button
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl text-[#E8D5B7]/70 hover:text-[#FFFDF7] cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] tracking-wide font-medium">Account</span>
        </button>
      </div>
    </div>
  );
};
