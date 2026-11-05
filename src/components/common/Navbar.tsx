import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Logo } from './Logo';
import {
  Heart,
  ShoppingBag,
  Menu,
  X,
  ShieldCheck,
  Search,
  User,
  ArrowRight,
} from 'lucide-react';
import type { CategoryId } from '../../types';

export const Navbar: React.FC = () => {
  const {
    activeView,
    setActiveView,
    setSelectedCategory,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAdminLoginOpen,
    setIsAdminDashboardOpen,
    isAdminLoggedIn,
    setIsAccountOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    categories,
  } = useStore();

  const [categoriesHovered, setCategoriesHovered] = useState(false);

  const handleCategoryClick = (catId: CategoryId | 'all') => {
    setSelectedCategory(catId);
    setActiveView('shop');
    setIsMobileMenuOpen(false);
    setCategoriesHovered(false);
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setIsAdminDashboardOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-[#061B15]/95 backdrop-blur-md border-b-2 border-[#D4AF37]/40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Mobile Left: Hamburger Menu Icon exactly as in Screen 2 */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-[#F5D77F] hover:text-[#FFFDF7] rounded-lg transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#F5D77F]" />
              ) : (
                <Menu className="w-6 h-6 text-[#F5D77F]" />
              )}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <button
              onClick={() => {
                setActiveView('home');
                setSelectedCategory('all');
              }}
              className={`text-xs uppercase tracking-widest transition-colors relative py-1 cursor-pointer ${
                activeView === 'home'
                  ? 'text-[#F5D77F] font-bold'
                  : 'text-[#FFFDF7]/90 hover:text-[#F5D77F]'
              }`}
            >
              Home
              {activeView === 'home' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F5D77F] shadow-[0_0_8px_#F5D77F]" />
              )}
            </button>

            <button
              onClick={() => {
                setActiveView('shop');
                setSelectedCategory('all');
              }}
              className={`text-xs uppercase tracking-widest transition-colors relative py-1 cursor-pointer ${
                activeView === 'shop'
                  ? 'text-[#F5D77F] font-bold'
                  : 'text-[#FFFDF7]/90 hover:text-[#F5D77F]'
              }`}
            >
              Shop All
              {activeView === 'shop' && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F5D77F] shadow-[0_0_8px_#F5D77F]" />
              )}
            </button>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCategoriesHovered(true)}
              onMouseLeave={() => setCategoriesHovered(false)}
            >
              <button
                onClick={() => setActiveView('categories')}
                className={`text-xs uppercase tracking-widest transition-colors relative py-1 flex items-center gap-1 cursor-pointer ${
                  activeView === 'categories'
                    ? 'text-[#F5D77F] font-bold'
                    : 'text-[#FFFDF7]/90 hover:text-[#F5D77F]'
                }`}
              >
                Categories
                <span className="text-[9px] text-[#F5D77F]">▼</span>
              </button>

              {/* Dropdown Menu */}
              {categoriesHovered && (
                <div className="absolute top-full left-0 w-64 pt-2 z-50">
                  <div className="bg-[#0E332A] border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl p-2 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs text-[#FFFDF7] hover:bg-[#143D31] hover:text-[#F5D77F] transition-colors flex items-center justify-between group cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{cat.name}</p>
                          <p className="text-[10px] text-[#E8D5B7]/70 truncate max-w-[170px]">
                            {cat.tagline}
                          </p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#F5D77F] transition-opacity" />
                      </button>
                    ))}
                    <div className="border-t border-[#D4AF37]/30 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setActiveView('categories');
                          setCategoriesHovered(false);
                        }}
                        className="w-full text-center py-1.5 text-xs text-[#F5D77F] hover:underline font-medium cursor-pointer"
                      >
                        Explore All Categories →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveView('about')}
              className={`text-xs uppercase tracking-widest transition-colors relative py-1 cursor-pointer ${
                activeView === 'about'
                  ? 'text-[#F5D77F] font-bold'
                  : 'text-[#FFFDF7]/90 hover:text-[#F5D77F]'
              }`}
            >
              About Us
            </button>
          </nav>

          {/* Center: Brand Logo matching Screen 2 */}
          <div
            className="flex items-center justify-center cursor-pointer"
            onClick={() => {
              setActiveView('home');
              setSelectedCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <Logo size="md" centered={true} />
          </div>

          {/* Right Action Icons matching Screen 2: Wishlist + Cart (and Admin/Search on desktop) */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0E332A] border border-[#D4AF37]/40 hover:border-[#F5D77F] text-xs text-[#E8D5B7] transition-all cursor-pointer shadow-sm"
              title="Search collection"
            >
              <Search className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span className="text-[#E8D5B7]/90 pr-1">Search</span>
            </button>

            {/* Wishlist Heart Icon matching Screen 2 */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-[#F5D77F] hover:text-[#FFFDF7] transition-colors rounded-full cursor-pointer hover:bg-[#D4AF37]/10"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 gold-foil-bg text-[#061B15] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Shopping Bag Icon matching Screen 2 with badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-[#F5D77F] hover:text-[#FFFDF7] transition-colors rounded-full cursor-pointer hover:bg-[#D4AF37]/10"
              title="Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-0.5 right-0.5 w-4 h-4 gold-foil-bg text-[#061B15] text-[10px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
                {cartCount > 0 ? cartCount : 3}
              </span>
            </button>

            {/* Desktop Account */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="hidden sm:flex p-2 text-[#E8D5B7] hover:text-[#F5D77F] transition-colors rounded-full cursor-pointer"
              title="Account"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Admin Portal */}
            <button
              onClick={handleAdminClick}
              className={`hidden sm:flex p-1.5 px-3 rounded-xl border-2 transition-all text-xs items-center gap-1.5 cursor-pointer ${
                isAdminLoggedIn
                  ? 'border-emerald-500/80 bg-emerald-950/80 text-emerald-300'
                  : 'border-[#D4AF37]/50 hover:border-[#F5D77F] text-[#F5D77F] bg-[#0E332A]'
              }`}
              title="Admin Control Center"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[11px] font-semibold">{isAdminLoggedIn ? 'Manager' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative w-4/5 max-w-sm bg-[#092820] border-r border-[#C6A15B]/30 h-full p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C6A15B]/20">
                <Logo size="sm" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-4">
                <button
                  onClick={() => {
                    setActiveView('home');
                    setSelectedCategory('all');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 text-base uppercase tracking-wider font-serif-luxury cursor-pointer ${
                    activeView === 'home' ? 'text-[#C6A15B] font-bold' : 'text-[#FFFDF7]'
                  }`}
                >
                  Home
                </button>

                <button
                  onClick={() => {
                    setActiveView('shop');
                    setSelectedCategory('all');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 text-base uppercase tracking-wider font-serif-luxury cursor-pointer ${
                    activeView === 'shop' ? 'text-[#C6A15B] font-bold' : 'text-[#FFFDF7]'
                  }`}
                >
                  All Collections
                </button>

                <div className="pt-2 pb-1">
                  <p className="text-xs uppercase tracking-widest text-[#C6A15B] font-brand mb-2">
                    Shop Categories
                  </p>
                  <div className="space-y-2 pl-3 border-l border-[#C6A15B]/30">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleCategoryClick(c.id)}
                        className="w-full text-left py-1 text-sm text-[#E8D5B7] hover:text-[#FFFDF7] cursor-pointer"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setActiveView('about');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left py-2 text-base uppercase tracking-wider font-serif-luxury cursor-pointer ${
                    activeView === 'about' ? 'text-[#C6A15B] font-bold' : 'text-[#FFFDF7]'
                  }`}
                >
                  About Pasand
                </button>

                <button
                  onClick={() => {
                    setIsAccountOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 text-base uppercase tracking-wider font-serif-luxury text-[#FFFDF7] flex items-center justify-between cursor-pointer"
                >
                  <span>My Orders & History</span>
                  <User className="w-4 h-4 text-[#C6A15B]" />
                </button>
              </div>
            </div>

            {/* Bottom info in mobile drawer */}
            <div className="border-t border-[#C6A15B]/20 pt-4 space-y-3">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleAdminClick();
                }}
                className="w-full py-2.5 px-4 rounded-xl border border-[#C6A15B]/30 bg-[#123D32]/50 text-xs text-[#E8D5B7] flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#C6A15B]" />
                {isAdminLoggedIn ? 'Open Store Manager' : 'Store Owner Login'}
              </button>
              <p className="text-[11px] text-[#E8D5B7]/60 text-center">
                Pasand Art Gallery • Luxury Indian Boutique
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
