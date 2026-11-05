import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, Category, OrderStatus, CategoryId } from '../../types';
import { Logo } from '../common/Logo';
import {
  X,
  Package,
  ShoppingBag,
  Layers,
  Settings,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  LogOut,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Eye,
  Save,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminDashboardOpen,
    setIsAdminDashboardOpen,
    products,
    categories,
    orders,
    settings,
    updateSettings,
    updateOrderStatus,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
    resetAllData,
    logoutAdmin,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'categories' | 'settings'>('overview');

  // Products filtering & modal
  const [productSearch, setProductSearch] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Category modal
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Orders filtering
  const [orderStatusFilter, setOrderStatusFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<string | null>(null);

  // Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    subtitle: '',
    category: 'jewellery' as CategoryId,
    subcategory: '',
    price: 599,
    originalPrice: 799,
    discountPercent: 25,
    images: '',
    description: '',
    features: '',
    stockCount: 20,
    inStock: true,
    isFeatured: false,
    isTrending: false,
    badge: 'Bestseller',
  });

  // Category Form State
  const [catForm, setCatForm] = useState({
    id: 'new-cat' as CategoryId,
    name: '',
    tagline: '',
    description: '',
    image: '',
    subcategories: '',
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  if (!isAdminDashboardOpen) return null;

  // Overview calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing');
  const completedOrders = orders.filter((o) => o.status === 'delivered');

  const openAddProductModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      subtitle: '',
      category: 'jewellery',
      subcategory: 'Earrings & Jhumkas',
      price: 599,
      originalPrice: 799,
      discountPercent: 25,
      images: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85',
      description: 'Handcrafted luxury piece with 22K micro-gold plating and premium finish.',
      features: '22K Gold Finish\nHypoallergenic\nSkin Friendly',
      stockCount: 20,
      inStock: true,
      isFeatured: true,
      isTrending: true,
      badge: 'Bestseller',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (prod: Product) => {
    setEditingProduct(prod);
    setProdForm({
      name: prod.name,
      subtitle: prod.subtitle || '',
      category: prod.category,
      subcategory: prod.subcategory,
      price: prod.price,
      originalPrice: prod.originalPrice,
      discountPercent: prod.discountPercent,
      images: prod.images.join('\n'),
      description: prod.description,
      features: prod.features.join('\n'),
      stockCount: prod.stockCount,
      inStock: prod.inStock,
      isFeatured: !!prod.isFeatured,
      isTrending: !!prod.isTrending,
      badge: prod.badge || '',
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imageList = prodForm.images
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const featureList = prodForm.features
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: prodForm.name,
      subtitle: prodForm.subtitle,
      category: prodForm.category,
      subcategory: prodForm.subcategory,
      price: Number(prodForm.price),
      originalPrice: Number(prodForm.originalPrice),
      discountPercent: Math.round(
        ((prodForm.originalPrice - prodForm.price) / prodForm.originalPrice) * 100
      ),
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewCount: editingProduct ? editingProduct.reviewCount : 12,
      images: imageList.length > 0 ? imageList : ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'],
      description: prodForm.description,
      features: featureList.length > 0 ? featureList : ['Handcrafted luxury finish', 'Skin safe'],
      specifications: editingProduct ? editingProduct.specifications : { 'Finish': '22K Gold Finish' },
      stockCount: Number(prodForm.stockCount),
      inStock: prodForm.inStock,
      isFeatured: prodForm.isFeatured,
      isTrending: prodForm.isTrending,
      badge: prodForm.badge,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsProductModalOpen(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#071F19] text-[#FFFDF7] flex flex-col overflow-hidden animate-in fade-in duration-200">
      {/* Admin Top Navigation */}
      <div className="bg-[#092820] border-b border-[#C6A15B]/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo size="sm" showSubtitle={false} />
          <div className="h-6 w-[1px] bg-[#C6A15B]/30 hidden sm:block" />
          <span className="text-xs uppercase font-brand tracking-[0.2em] text-[#C6A15B] hidden sm:inline-block">
            Store Owner Control Center
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={resetAllData}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-500/30 text-amber-300 text-xs hover:bg-amber-950/40"
            title="Reset store to demo catalogue"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/30 text-rose-300 text-xs hover:bg-rose-950/40"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={() => setIsAdminDashboardOpen(false)}
            className="p-2 rounded-xl text-[#E8D5B7] hover:text-[#FFFDF7] hover:bg-[#123D32]"
            title="Return to Storefront"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Admin Sidebar */}
        <div className="w-56 bg-[#092820]/90 border-r border-[#C6A15B]/25 p-4 flex flex-col justify-between hidden md:flex">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview'
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'text-[#E8D5B7] hover:bg-[#123D32] hover:text-[#FFFDF7]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                activeTab === 'products'
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'text-[#E8D5B7] hover:bg-[#123D32] hover:text-[#FFFDF7]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                activeTab === 'orders'
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'text-[#E8D5B7] hover:bg-[#123D32] hover:text-[#FFFDF7]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                activeTab === 'categories'
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'text-[#E8D5B7] hover:bg-[#123D32] hover:text-[#FFFDF7]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Categories ({categories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                activeTab === 'settings'
                  ? 'gold-gradient-bg text-[#092820] font-semibold shadow'
                  : 'text-[#E8D5B7] hover:bg-[#123D32] hover:text-[#FFFDF7]'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Store Configuration</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#0E332A] border border-[#C6A15B]/20 text-[11px] text-[#E8D5B7]/70">
            <p className="font-semibold text-[#FFFDF7]">Active WhatsApp:</p>
            <p className="font-mono text-[#C6A15B] truncate mt-0.5">{settings.whatsappDisplayNumber}</p>
          </div>
        </div>

        {/* Mobile Submenu Toolbar */}
        <div className="md:hidden flex items-center gap-1 p-2 bg-[#092820] border-b border-[#C6A15B]/20 overflow-x-auto w-full no-scrollbar">
          {(['overview', 'products', 'orders', 'categories', 'settings'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'gold-gradient-bg text-[#092820] font-bold'
                  : 'text-[#E8D5B7] bg-[#0E332A]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-serif-luxury text-[#FFFDF7]">Dashboard Overview</h2>
                <p className="text-xs text-[#E8D5B7]/70">
                  Real-time activity and revenue summary for Pasand Art Gallery
                </p>
              </div>

              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30">
                  <span className="text-xs text-[#E8D5B7]/70 font-medium">Total Revenue</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#FFFDF7] mt-1">
                    {settings.currencySymbol}
                    {totalRevenue.toLocaleString('en-IN')}
                  </h3>
                  <p className="text-[10px] text-[#C6A15B] mt-1">From {orders.length} placed orders</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30">
                  <span className="text-xs text-[#E8D5B7]/70 font-medium">Total Products</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-[#FFFDF7] mt-1">
                    {products.length}
                  </h3>
                  <p className="text-[10px] text-emerald-400 mt-1">
                    {products.filter((p) => p.inStock).length} actively in stock
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30">
                  <span className="text-xs text-[#E8D5B7]/70 font-medium">Pending Orders</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-amber-300 mt-1">
                    {pendingOrders.length}
                  </h3>
                  <p className="text-[10px] text-[#E8D5B7]/70 mt-1">Requires WhatsApp verification</p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30">
                  <span className="text-xs text-[#E8D5B7]/70 font-medium">Completed Deliveries</span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-sans text-emerald-400 mt-1">
                    {completedOrders.length}
                  </h3>
                  <p className="text-[10px] text-emerald-300 mt-1">Fulfilled successfully</p>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="p-6 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-serif-luxury text-[#FFFDF7]">Recent Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-[#C6A15B] hover:underline"
                  >
                    Manage All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#C6A15B]/20 text-[#E8D5B7]/70">
                        <th className="pb-3 font-semibold">Order ID</th>
                        <th className="pb-3 font-semibold">Customer</th>
                        <th className="pb-3 font-semibold">Items</th>
                        <th className="pb-3 font-semibold">Total</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold text-right">Direct WhatsApp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C6A15B]/15">
                      {orders.slice(0, 5).map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#123D32]/40 transition-colors">
                          <td className="py-3 font-mono font-bold text-[#C6A15B]">#{ord.id}</td>
                          <td className="py-3 text-[#FFFDF7]">
                            <p className="font-medium">{ord.customer.name}</p>
                            <p className="text-[10px] text-[#E8D5B7]/60">{ord.customer.phone}</p>
                          </td>
                          <td className="py-3 text-[#E8D5B7]/80 truncate max-w-[200px]">
                            {ord.items.map((i) => `${i.quantity}x ${i.productName}`).join(', ')}
                          </td>
                          <td className="py-3 font-semibold text-[#FFFDF7] font-sans">
                            {settings.currencySymbol}
                            {ord.total.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
                                ord.status === 'delivered'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                  : ord.status === 'shipped'
                                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500/40'
                                  : 'bg-amber-950 text-amber-300 border-amber-500/40'
                              }`}
                            >
                              {ord.status}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <a
                              href={`https://wa.me/${ord.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                ord.customer.name
                              )},%20regarding%20your%20order%20%23${ord.id}%20from%20Pasand%20Art%20Gallery...`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Message</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-serif-luxury text-[#FFFDF7]">Product Catalogue</h2>
                  <p className="text-xs text-[#E8D5B7]/70">
                    Add, modify pricing, upload images, manage inventory and stock levels
                  </p>
                </div>

                <button
                  onClick={openAddProductModal}
                  className="px-4 py-2.5 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs tracking-wider uppercase flex items-center gap-2 shadow"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Product Search & Filter Bar */}
              <div className="relative max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#C6A15B]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter by product name or category..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Products Table */}
              <div className="rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-[#092820] text-[#E8D5B7]/70 border-b border-[#C6A15B]/20">
                        <th className="p-3.5">Creation</th>
                        <th className="p-3.5">Category</th>
                        <th className="p-3.5">Price</th>
                        <th className="p-3.5">Discount</th>
                        <th className="p-3.5">Stock</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#C6A15B]/15">
                      {products
                        .filter(
                          (p) =>
                            p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                            p.category.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((prod) => (
                          <tr key={prod.id} className="hover:bg-[#123D32]/40 transition-colors">
                            <td className="p-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  className="w-10 h-10 rounded-lg object-cover bg-[#092820] shrink-0"
                                />
                                <div>
                                  <p className="font-serif-luxury font-medium text-sm text-[#FFFDF7]">
                                    {prod.name}
                                  </p>
                                  <p className="text-[10px] text-[#E8D5B7]/60">ID: {prod.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-3.5 capitalize text-[#E8D5B7]">
                              {prod.category.replace('-', ' ')}
                            </td>
                            <td className="p-3.5 font-sans font-semibold text-[#FFFDF7]">
                              {settings.currencySymbol}
                              {prod.price.toLocaleString('en-IN')}
                            </td>
                            <td className="p-3.5 text-amber-300 font-semibold">
                              {prod.discountPercent > 0 ? `${prod.discountPercent}%` : '—'}
                            </td>
                            <td className="p-3.5 font-mono">{prod.stockCount} units</td>
                            <td className="p-3.5">
                              <button
                                onClick={() =>
                                  updateProduct(prod.id, { inStock: !prod.inStock })
                                }
                                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${
                                  prod.inStock
                                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                                    : 'bg-rose-950 text-rose-300 border-rose-500/40'
                                }`}
                              >
                                {prod.inStock ? 'In Stock' : 'Out of Stock'}
                              </button>
                            </td>
                            <td className="p-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => openEditProductModal(prod)}
                                  className="p-1.5 rounded-lg border border-[#C6A15B]/30 hover:border-[#C6A15B] text-[#E8D5B7] hover:text-[#FFFDF7]"
                                  title="Edit Product"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                                      deleteProduct(prod.id);
                                    }
                                  }}
                                  className="p-1.5 rounded-lg border border-rose-500/30 hover:border-rose-500 text-rose-400 hover:text-rose-200"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-serif-luxury text-[#FFFDF7]">Order Management</h2>
                <p className="text-xs text-[#E8D5B7]/70">
                  Track client orders, update processing status, and coordinate dispatch
                </p>
              </div>

              {/* Status Filter Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs capitalize transition-colors ${
                        orderStatusFilter === st
                          ? 'gold-gradient-bg text-[#092820] font-semibold'
                          : 'bg-[#0E332A] text-[#E8D5B7] border border-[#C6A15B]/30'
                      }`}
                    >
                      {st} ({st === 'all' ? orders.length : orders.filter((o) => o.status === st).length})
                    </button>
                  )
                )}
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {orders
                  .filter((o) => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                  .map((order) => (
                    <div
                      key={order.id}
                      className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-4"
                    >
                      {/* Order Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#C6A15B]/20">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#C6A15B]">
                              #{order.id}
                            </span>
                            <span className="text-xs text-[#E8D5B7]/60">
                              Placed on{' '}
                              {new Date(order.createdAt).toLocaleString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          <p className="text-xs text-[#FFFDF7] mt-1 font-medium">
                            Customer: {order.customer.name} (Phone: {order.customer.phone})
                          </p>
                        </div>

                        {/* Status Updater */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[#E8D5B7]/70">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value as OrderStatus)
                            }
                            className="bg-[#092820] border border-[#C6A15B]/40 rounded-xl px-3 py-1.5 text-xs text-[#FFFDF7] focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <a
                            href={`https://wa.me/${order.customer.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                              order.customer.name
                            )},%20this%20is%20Pasand%20Art%20Gallery%20regarding%20your%20order%20%23${order.id}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs flex items-center gap-1.5"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      {/* Items Ordered Table */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-wider">
                            Ordered Pieces
                          </span>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-2 rounded-xl bg-[#092820]/60 border border-[#C6A15B]/15 text-xs"
                              >
                                <img
                                  src={item.image}
                                  alt={item.productName}
                                  className="w-10 h-10 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-[#FFFDF7] truncate">
                                    {item.productName}
                                  </p>
                                  <p className="text-[11px] text-[#E8D5B7]/60">
                                    {item.variantName ? `Option: ${item.variantName} • ` : ''}
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <span className="font-sans font-semibold text-[#FFFDF7]">
                                  {settings.currencySymbol}
                                  {(item.price * item.quantity).toLocaleString('en-IN')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Delivery Address & Notes */}
                        <div className="space-y-2">
                          <span className="text-xs text-[#C6A15B] font-semibold uppercase tracking-wider">
                            Delivery Destination
                          </span>
                          <div className="p-3 rounded-xl bg-[#092820]/60 border border-[#C6A15B]/15 text-xs text-[#E8D5B7] space-y-1">
                            <p>
                              <strong className="text-[#FFFDF7]">Address:</strong> {order.customer.address}
                            </p>
                            <p>
                              <strong className="text-[#FFFDF7]">City / State / PIN:</strong>{' '}
                              {order.customer.city}, {order.customer.state} - {order.customer.pincode}
                            </p>
                            {order.customer.orderNotes && (
                              <p className="text-amber-300">
                                <strong className="text-[#FFFDF7]">Order Notes:</strong> {order.customer.orderNotes}
                              </p>
                            )}
                            <div className="pt-2 border-t border-[#C6A15B]/15 flex justify-between font-bold text-sm text-[#FFFDF7]">
                              <span>Order Total:</span>
                              <span className="text-[#C6A15B] font-sans">
                                {settings.currencySymbol}
                                {order.total.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-serif-luxury text-[#FFFDF7]">Store Categories</h2>
                <p className="text-xs text-[#E8D5B7]/70">
                  Organize boutique departments, taglines and showcase cover photography
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 flex gap-4"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-24 h-24 rounded-xl object-cover shrink-0 border border-[#C6A15B]/20"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-serif-luxury text-[#FFFDF7] font-semibold">
                          {cat.name}
                        </h3>
                        <p className="text-xs text-[#C6A15B] mt-0.5">{cat.tagline}</p>
                        <p className="text-xs text-[#E8D5B7]/70 mt-1 line-clamp-2">
                          {cat.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-[#E8D5B7]/60">
                        <span>
                          {products.filter((p) => p.category === cat.id).length} products assigned
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: STORE CONFIGURATION */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <h2 className="text-2xl font-serif-luxury text-[#FFFDF7]">Store Configuration</h2>
                <p className="text-xs text-[#E8D5B7]/70">
                  Configure WhatsApp destination number, free delivery threshold, and announcement banner
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-4">
                  <h3 className="text-sm font-semibold text-[#FFFDF7] border-b border-[#C6A15B]/20 pb-2">
                    WhatsApp Concierge Settings
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                      Store WhatsApp Number (with country code, e.g. 919876543210) *
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-mono focus:outline-none focus:border-[#C6A15B]"
                    />
                    <p className="text-[11px] text-[#E8D5B7]/60 mt-1">
                      Customer orders are sent to this WhatsApp number.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                      WhatsApp Display Format
                    </label>
                    <input
                      type="text"
                      value={settingsForm.whatsappDisplayNumber}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, whatsappDisplayNumber: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-4">
                  <h3 className="text-sm font-semibold text-[#FFFDF7] border-b border-[#C6A15B]/20 pb-2">
                    Announcement Banner
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                      Top Header Announcement Text
                    </label>
                    <input
                      type="text"
                      value={settingsForm.announcementText}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, announcementText: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] focus:outline-none focus:border-[#C6A15B]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="enableAnn"
                      checked={settingsForm.enableAnnouncement}
                      onChange={(e) =>
                        setSettingsForm({ ...settingsForm, enableAnnouncement: e.target.checked })
                      }
                      className="w-4 h-4 accent-[#C6A15B] rounded cursor-pointer"
                    />
                    <label htmlFor="enableAnn" className="text-xs text-[#FFFDF7] cursor-pointer">
                      Enable Announcement Ribbon
                    </label>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#0E332A] border border-[#C6A15B]/30 space-y-4">
                  <h3 className="text-sm font-semibold text-[#FFFDF7] border-b border-[#C6A15B]/20 pb-2">
                    Shipping & Delivery Thresholds
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                        Free Delivery Minimum (₹)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.freeShippingThreshold}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            freeShippingThreshold: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#E8D5B7] mb-1">
                        Standard Delivery Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={settingsForm.standardShippingFee}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            standardShippingFee: Number(e.target.value),
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#092820] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-sans"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Configuration</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#092820] rounded-3xl border border-[#C6A15B]/40 shadow-2xl p-6 sm:p-8 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-[#C6A15B]/20">
              <h3 className="text-xl font-serif-luxury text-[#FFFDF7]">
                {editingProduct ? 'Edit Product Creation' : 'Add New Product to Store'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1.5 rounded-lg text-[#E8D5B7] hover:text-[#FFFDF7]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    placeholder="e.g. Royal Emerald Choker"
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Category *</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value as CategoryId })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Subcategory / Style</label>
                  <input
                    type="text"
                    value={prodForm.subcategory}
                    onChange={(e) => setProdForm({ ...prodForm, subcategory: e.target.value })}
                    placeholder="e.g. Earrings & Jhumkas"
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={prodForm.badge}
                    onChange={(e) => setProdForm({ ...prodForm, badge: e.target.value })}
                    placeholder="e.g. Bestseller, Festive Edit"
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={prodForm.originalPrice}
                    onChange={(e) => setProdForm({ ...prodForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#E8D5B7] mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={prodForm.stockCount}
                    onChange={(e) => setProdForm({ ...prodForm, stockCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#E8D5B7] mb-1">
                  Product Image URLs (One URL per line) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={prodForm.images}
                  onChange={(e) => setProdForm({ ...prodForm, images: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs text-[#E8D5B7] mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  placeholder="Describe the royal craftsmanship, stones, and occasion wear..."
                  className="w-full px-3 py-2 rounded-xl bg-[#0E332A] border border-[#C6A15B]/30 text-xs text-[#FFFDF7]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-[#FFFDF7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.inStock}
                    onChange={(e) => setProdForm({ ...prodForm, inStock: e.target.checked })}
                    className="accent-[#C6A15B] rounded"
                  />
                  <span>Mark as In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#FFFDF7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isFeatured}
                    onChange={(e) => setProdForm({ ...prodForm, isFeatured: e.target.checked })}
                    className="accent-[#C6A15B] rounded"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-[#FFFDF7] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodForm.isTrending}
                    onChange={(e) => setProdForm({ ...prodForm, isTrending: e.target.checked })}
                    className="accent-[#C6A15B] rounded"
                  />
                  <span>Trending Section</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#C6A15B]/20 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-[#C6A15B]/30 text-xs text-[#E8D5B7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl gold-gradient-bg text-[#092820] font-semibold text-xs tracking-wider uppercase shadow"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

