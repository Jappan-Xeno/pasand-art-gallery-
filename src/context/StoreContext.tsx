import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Category,
  CartItem,
  Order,
  StoreSettings,
  CategoryId,
  ProductVariant,
  OrderStatus,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_SETTINGS,
  INITIAL_ORDERS,
} from '../data/mockData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'gold';
  title: string;
  message?: string;
}

interface StoreContextType {
  // Catalog State
  products: Product[];
  categories: Category[];
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (sub: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (prod: Product | null) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;

  // Cart State
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  cartShipping: number;
  cartDiscount: number;
  cartTotal: number;
  couponCode: string;
  appliedDiscountPercent: number;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Wishlist State
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders State
  orders: Order[];
  placeOrder: (customer: Order['customer']) => { order: Order; whatsappUrl: string };
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Modals & Active View State
  activeView: 'home' | 'shop' | 'categories' | 'about' | 'contact';
  setActiveView: (view: 'home' | 'shop' | 'categories' | 'about' | 'contact') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAdminLoginOpen: boolean;
  setIsAdminLoginOpen: (open: boolean) => void;
  isAdminDashboardOpen: boolean;
  setIsAdminDashboardOpen: (open: boolean) => void;
  isAccountOpen: boolean;
  setIsAccountOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // Admin Product CRUD
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Admin Category CRUD
  addCategory: (category: Category) => void;
  updateCategory: (id: CategoryId, updates: Partial<Category>) => void;
  deleteCategory: (id: CategoryId) => void;

  // Reset to initial demo data
  resetAllData: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'info' | 'gold') => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'pasand_products_v1',
  CATEGORIES: 'pasand_categories_v1',
  SETTINGS: 'pasand_settings_v1',
  CART: 'pasand_cart_v1',
  WISHLIST: 'pasand_wishlist_v1',
  ORDERS: 'pasand_orders_v1',
  ADMIN_AUTH: 'pasand_admin_auth_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Load categories
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  // Load settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  // Load cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['jewel-01'];
    } catch {
      return ['jewel-01'];
    }
  });

  // Load orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Admin Auth
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // View state
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'categories' | 'about' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Coupons
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState(0);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  const showToast = (title: string, message?: string, type: 'success' | 'info' | 'gold' = 'gold') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Helpers
  const addToCart = (product: Product, quantity = 1, variant?: ProductVariant) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          (variant ? item.selectedVariant?.id === variant.id : !item.selectedVariant)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant: variant || product.variants?.[0] }];
      }
    });

    showToast(
      'Added to Cart',
      `${product.name} ${variant ? `(${variant.name})` : ''} added to your bag.`,
      'gold'
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId))
      )
    );
    showToast('Item Removed', 'Product removed from your shopping bag.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && (!variantId || item.selectedVariant?.id === variantId)) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = Math.round((cartSubtotal * appliedDiscountPercent) / 100);
  const cartShipping =
    cartSubtotal === 0 || cartSubtotal >= settings.freeShippingThreshold
      ? 0
      : settings.standardShippingFee;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ROYAL10' || clean === 'PASAND10') {
      setCouponCode(clean);
      setAppliedDiscountPercent(10);
      showToast('Coupon Applied!', '10% Royal Welcome discount has been applied to your bag.', 'gold');
      return true;
    }
    if (clean === 'FESTIVE15') {
      setCouponCode(clean);
      setAppliedDiscountPercent(15);
      showToast('Festive Coupon Applied!', '15% Festive Celebration discount applied!', 'gold');
      return true;
    }
    showToast('Invalid Coupon', 'Please enter a valid code like ROYAL10 or FESTIVE15', 'info');
    return false;
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedDiscountPercent(0);
    showToast('Coupon Removed', 'Discount removed.', 'info');
  };

  // Wishlist Helpers
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist', 'Item removed from saved treasures.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        const prod = products.find((p) => p.id === productId);
        showToast('Saved to Wishlist', `${prod?.name || 'Item'} added to your wishlist.`, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // WhatsApp Order Flow
  const placeOrder = (customer: Order['customer']) => {
    const orderId = `PAG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer,
      items: cart.map((item) => ({
        productId: item.product.id,
        productName: item.product.name,
        variantName: item.selectedVariant?.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shipping: cartShipping,
      total: cartTotal,
      status: 'pending',
      paymentMethod: 'WhatsApp Order / COD / Bank Transfer',
      whatsappSent: true,
    };

    // Save order
    setOrders((prev) => [newOrder, ...prev]);

    // Build the royal WhatsApp message
    let messageText = `✨ *NEW ORDER — PASAND ART GALLERY* ✨\n`;
    messageText += `*Order ID:* #${orderId}\n`;
    messageText += `*Date:* ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n`;

    messageText += `👤 *CUSTOMER DETAILS:*\n`;
    messageText += `• Name: ${customer.name}\n`;
    messageText += `• Phone: ${customer.phone}\n`;
    messageText += `• Address: ${customer.address}, ${customer.city}, ${customer.state} - ${customer.pincode}\n`;
    if (customer.orderNotes) {
      messageText += `• Notes: ${customer.orderNotes}\n`;
    }
    messageText += `\n🛍️ *ITEMS ORDERED:*\n`;

    cart.forEach((item, index) => {
      messageText += `${index + 1}. *${item.product.name}*`;
      if (item.selectedVariant) {
        messageText += ` (${item.selectedVariant.name})`;
      }
      messageText += `\n   Qty: ${item.quantity} × ${settings.currencySymbol}${item.product.price.toLocaleString('en-IN')} = ${settings.currencySymbol}${(item.product.price * item.quantity).toLocaleString('en-IN')}\n`;
    });

    messageText += `\n📊 *ORDER SUMMARY:*\n`;
    messageText += `• Subtotal: ${settings.currencySymbol}${cartSubtotal.toLocaleString('en-IN')}\n`;
    if (cartDiscount > 0) {
      messageText += `• Discount (${couponCode}): -${settings.currencySymbol}${cartDiscount.toLocaleString('en-IN')}\n`;
    }
    messageText += `• Delivery: ${cartShipping === 0 ? 'FREE' : `${settings.currencySymbol}${cartShipping}`}\n`;
    messageText += `• *Grand Total: ${settings.currencySymbol}${cartTotal.toLocaleString('en-IN')}*\n\n`;
    messageText += `Please confirm my order and share payment/delivery schedule. Thank you!`;

    const encoded = encodeURIComponent(messageText);
    const cleanNumber = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    // Clear cart
    clearCart();
    setCouponCode('');
    setAppliedDiscountPercent(0);

    return { order: newOrder, whatsappUrl };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    showToast('Order Status Updated', `Order #${orderId} marked as ${status}.`, 'info');
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Store Settings Saved', 'Your store preferences have been updated.', 'gold');
  };

  // Admin Auth
  const loginAdmin = (passcode: string) => {
    // Default master passcodes: 'pasand2026' or 'admin123'
    if (passcode.trim() === 'pasand2026' || passcode.trim() === 'admin123') {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      showToast('Welcome, Administrator', 'Access granted to Pasand Art Gallery store manager.', 'gold');
      return true;
    }
    showToast('Invalid Passcode', 'Please enter the authorized store owner passcode.', 'info');
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    setIsAdminDashboardOpen(false);
    showToast('Admin Logged Out', 'You have been signed out of store management.', 'info');
  };

  // Admin CRUD for Products
  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const product: Product = { ...newProduct, id };
    setProducts((prev) => [product, ...prev]);
    showToast('Product Created', `${product.name} is now available in your catalogue.`, 'gold');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product Updated', 'Product changes saved successfully.', 'gold');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product Removed', 'Product has been deleted from the store.', 'info');
  };

  // Admin CRUD for Categories
  const addCategory = (category: Category) => {
    setCategories((prev) => [...prev, category]);
    showToast('Category Created', `${category.name} added.`, 'gold');
  };

  const updateCategory = (id: CategoryId, updates: Partial<Category>) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    showToast('Category Updated', 'Category details updated.', 'gold');
  };

  const deleteCategory = (id: CategoryId) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category Deleted', 'Category has been removed.', 'info');
  };

  const resetAllData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setSettings(INITIAL_SETTINGS);
    setOrders(INITIAL_ORDERS);
    setCart([]);
    setWishlist(['jewel-01']);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    showToast('Reset Complete', 'Demo catalog and orders restored to factory state.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        selectedSubcategory,
        setSelectedSubcategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartDiscount,
        cartTotal,
        couponCode,
        appliedDiscountPercent,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        settings,
        updateSettings,
        activeView,
        setActiveView,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAdminLoginOpen,
        setIsAdminLoginOpen,
        isAdminDashboardOpen,
        setIsAdminDashboardOpen,
        isAccountOpen,
        setIsAccountOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        resetAllData,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

