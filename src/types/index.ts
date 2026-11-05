export type CategoryId = 'jewellery' | 'perfumes' | 'cosmetics' | 'mens-accessories' | 'lifestyle';

export interface ProductVariant {
  id: string;
  name: string; // e.g., 'Antique Gold', 'Emerald Green', '50ml', '100ml'
  colorCode?: string;
  image?: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  category: CategoryId;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  variants?: ProductVariant[];
  inStock: boolean;
  stockCount: number;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isTrending?: boolean;
  badge?: string; // e.g., 'Bestseller', 'Festive Edit', 'Limited'
}

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  subcategories: string[];
  productCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: ProductVariant;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  orderNotes?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: {
    productId: string;
    productName: string;
    variantName?: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'WhatsApp Order / COD / Bank Transfer';
  whatsappSent: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // Indian mobile number without + or with country code, e.g. "919876543210"
  whatsappDisplayNumber: string; // e.g. "+91 98765 43210"
  email: string;
  address: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  announcementText: string;
  enableAnnouncement: boolean;
}

