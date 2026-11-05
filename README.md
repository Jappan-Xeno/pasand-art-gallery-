# ✨ Pasand Art Gallery — Premium Luxury E-Commerce Web Application

A royal, boutique-inspired luxury e-commerce web application crafted specifically for **Pasand Art Gallery**.

Built with modern high-performance technologies, this application delivers an unforgettable **Dark Luxury Boutique** experience inspired by regal Indian heritage, haute jewellery maisons, and international fragrance houses.

---

## 🏛️ Brand Identity & Design System

- **Palette**:
  - **Deep Emerald**: `#092820` (Dominant boutique background)
  - **Primary Emerald**: `#123D32` (Surface & cards)
  - **Antique Gold**: `#C6A15B` (Accents, borders, badges, buttons)
  - **Champagne Gold**: `#E8D5B7` (Typography & soft glows)
  - **Warm Ivory**: `#FFFDF7` (Headlines & primary text)
  - **Deep Charcoal Brown**: `#332820` (Rich shadows & depth)
- **Typography**:
  - Headings & Titles: *Cormorant Garamond* (Editorial luxury serif)
  - Brand Mark & Accents: *Cinzel* (Imperial Roman capitals)
  - Body & UI: *Plus Jakarta Sans* (Crisp modern sans-serif)

---

## 💎 Core Features

### 1. Boutique Homepage
- **Royal Navigation Bar**:
  - Gold lotus emblem logo
  - Quick links (Home, Shop All, Categories, About Us)
  - Live Search trigger
  - Wishlist counter
  - Cart counter with animated badge
  - Store Owner / Admin secure access
  - Top announcement banner with direct WhatsApp Concierge link
- **Full-Width Hero Section**:
  - Cinematic photography against dark emerald velvet
  - Dynamic multi-slide crossfade with indicator pills and directional controls
  - "Elegance in Every Detail." tagline
  - "Shop Now" and "Explore Collection" CTAs
  - Value pillars (100% Micro-Plated, 4.9★ Satisfaction, Pan-India Express WhatsApp Order)
- **Shop by Category (Circular Pills & Showcase Cards)**:
  - Circular gold-rimmed icon pills matching reference mobile screen
  - Curated cards for **Jewellery**, **Perfumes**, **Women's Cosmetics**, **Men's Accessories**, and **Lifestyle & Gifts**
  - Subtle Indian arch silhouettes and golden circular arrow interactions
- **Curated Featured Banners**:
  - Fragrance Collection Showcase (Ouds & Extrait de Parfum)
  - Royal Festive Privilege promotional banner (Code `ROYAL10` for 10% off)
- **Trending Products Grid**:
  - Image hover zoom
  - Bestseller & discount badges
  - Interactive Wishlist heart toggle
  - Quick View preview modal
  - Instant Add to Bag with toast feedback
- **The Pasand Promise (Trust Section)**:
  - Quality Products, Easy Ordering, Customer Support, Secure Shopping
- **Regal Boutique Footer**:
  - Full client care links, social channels, physical address, and instant WhatsApp chat launcher

### 2. Complete Product Catalogue
- Filter by category with item count tags
- Subcategory pill filters (e.g. Earrings & Jhumkas, Chokers, Necklaces, Ouds, Watches)
- Real-time search by name, description, and keywords
- Sort by Featured, Price (Low to High), Price (High to Low), Highest Rated, and Newest Arrivals
- Price range slider up to ₹5,000
- In-stock only filter switch
- Empty state with one-click filter reset

### 3. Dedicated Product Details Modal / Screen
- Large product image gallery with pagination dots and 1/5 indicator pill
- Product title, star rating, verified review count
- Real price with discount percentage pill and strike-through original price
- Detailed description, features bullet points, and material specifications
- Color and variant swatches with active gold ring indicator
- Quantity selector (+ / -)
- **Add to Cart** and **Buy Now** buttons
- Related products recommendations
- Native Web Share / clipboard share

### 4. Shopping Bag & WhatsApp Checkout
- Slide-out Cart Drawer with persistence across refreshes via localStorage
- Complimentary delivery milestone progress bar (unlocks at ₹999)
- Promo code application (`ROYAL10`, `FESTIVE15`)
- Full delivery address form (Name, 10-digit WhatsApp phone, Address, City, State, PIN, Order Notes)
- **WhatsApp Order Placement**:
  - Formats a comprehensive, royal message containing Order ID, Customer details, item list, prices, discounts, and total
  - Opens direct WhatsApp URL addressed to the configurable store phone number
  - Celebrates with confetti upon order completion!

### 5. Admin Dashboard (Store Owner Portal)
- Protected by master passcode (`pasand2026` or `admin123`)
- **Overview Tab**: Total products, total revenue in ₹, pending orders, fulfilled orders, recent orders table
- **Product Management**:
  - Add new products with multiple images, category, price, discount, description, stock count, and badges
  - Edit existing products inline or via modal
  - In-stock and featured toggles
  - Delete products with confirmation
- **Order Management**:
  - View all incoming customer orders
  - Filter by status (Pending, Processing, Shipped, Delivered, Cancelled)
  - Update status in real-time
  - Direct 1-click WhatsApp customer reply button
- **Store Configuration**:
  - Change Store WhatsApp Number
  - Edit announcement banner text & toggle
  - Configure free shipping minimum and delivery fee
  - Reset to demo catalogue option

---

## 🛠️ Tech Stack

- **React 19**
- **TypeScript**
- **Vite 8**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Lucide React** (Icons)
- **Canvas Confetti** (Order celebration)
- **LocalStorage State Sync** (Products, Categories, Settings, Cart, Wishlist, Orders)

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Store Owner Passcode: `pasand2026`
