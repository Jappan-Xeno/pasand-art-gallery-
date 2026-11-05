import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/common/Navbar';
import { BottomNav } from './components/common/BottomNav';
import { Footer } from './components/common/Footer';
import { HomeSearchBar } from './components/home/HomeSearchBar';
import { HeroSection } from './components/home/HeroSection';
import { CategoryPills } from './components/home/CategoryPills';
import { CuratedCollections } from './components/home/CuratedCollections';
import { TrendingProducts } from './components/home/TrendingProducts';
import { GrandWelcomeGateway } from './components/home/GrandWelcomeGateway';
import { ShopPage } from './components/shop/ShopPage';
import { CategoriesView } from './components/home/CategoriesView';
import { AboutView } from './components/home/AboutView';
import { CartDrawer } from './components/cart/CartDrawer';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { WishlistDrawer } from './components/account/WishlistDrawer';
import { SearchModal } from './components/common/SearchModal';
import { ProductDetailsModal } from './components/shop/ProductDetailsModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AccountModal } from './components/account/AccountModal';
import { ToastContainer } from './components/common/ToastContainer';
import { Sparkles } from 'lucide-react';
import type { CategoryId } from './types';

const MainLayout: React.FC = () => {
  const {
    activeView,
    selectedProduct,
    setSelectedProduct,
    setSelectedCategory,
    setActiveView,
  } = useStore();

  // First-visit Welcome Gateway showing the user's photo
  const [showWelcomeGateway, setShowWelcomeGateway] = useState<boolean>(true);

  const handleStartShopping = () => {
    setShowWelcomeGateway(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGatewayCategory = (catId: string) => {
    setSelectedCategory(catId as CategoryId);
    setActiveView('shop');
    setShowWelcomeGateway(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If visitor is on the Grand Welcome Gateway
  if (showWelcomeGateway) {
    return (
      <GrandWelcomeGateway
        onStartShopping={handleStartShopping}
        onSelectCategory={handleSelectGatewayCategory}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#04140F] text-[#FFFDF7] flex flex-col selection:bg-[#D4AF37]/40 selection:text-[#FFFDF7] relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#0B251E]/60 to-[#04140F] z-0" />

      {/* Top Royal Ribbon to toggle back to the Gateway */}
      <div className="relative z-50 bg-[#0B251E] border-b border-[#D4AF37]/30 px-4 py-1.5 flex items-center justify-between text-xs text-[#E8D5B7]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowWelcomeGateway(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#103328] border border-[#D4AF37]/50 hover:border-[#F5D77F] text-[#F5D77F] font-brand tracking-wider text-[11px] cursor-pointer transition-all shadow-sm hover:shadow-[0_0_10px_rgba(212,175,55,0.3)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Welcome Archway Portal</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-[#E8D5B7]/80">
          <span className="hidden sm:inline">✨ Royal Festive Season: Free Express Delivery on orders over ₹999</span>
        </div>
      </div>

      {/* Top Navbar */}
      <Navbar />

      {/* Main Full-Width Content Container */}
      <main className="relative z-10 flex-1 w-full pb-20 lg:pb-12">
        {activeView === 'home' && (
          <div className="w-full space-y-2 animate-in fade-in duration-300">
            {/* 1. Search Bar with Mic */}
            <HomeSearchBar />

            {/* 2. Full-Width "New Jewellery Collection" Hero Card */}
            <HeroSection />

            {/* 3. 5 Circular Category Icons */}
            <CategoryPills />

            {/* 4. "Fragrance Collection" Showcase Card */}
            <CuratedCollections />

            {/* 5. "Trending Now" Collection Grid */}
            <TrendingProducts />
          </div>
        )}

        {activeView === 'shop' && <ShopPage />}
        {activeView === 'categories' && <CategoriesView />}
        {activeView === 'about' && <AboutView />}
      </main>

      {/* Boutique Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar (Hidden on desktop) */}
      <BottomNav />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <SearchModal />
      <QuickViewModal />
      <AdminLoginModal />
      <AdminDashboard />
      <AccountModal />

      {/* Dedicated Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainLayout />
    </StoreProvider>
  );
}
