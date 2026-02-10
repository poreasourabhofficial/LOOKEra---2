import { Product, Outfit, UserRole, User } from '../types';

// Mock Users
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alice Founder', role: UserRole.FOUNDER, avatar: 'https://i.pravatar.cc/150?u=a' },
  { id: 'u2', name: 'Bob Employee', role: UserRole.EMPLOYEE, avatar: 'https://i.pravatar.cc/150?u=b' },
];

// Helper to generate IDs
export const generateId = (prefix: 'PROD' | 'OUTFIT') => {
  return `LOOK-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// Initial Mock Products
const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'LOOK-PROD-1001',
    name: 'Classic Beige Trench Coat',
    category: 'Outerwear',
    price: 4500,
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://amazon.com',
    description: 'A timeless beige trench coat perfect for transitional weather. Features a double-breasted front and belted waist.',
    uploadedBy: 'u1',
    isApproved: true,
    clicks: 120,
    createdAt: new Date().toISOString(),
    rating: 4.5,
    gender: 'Women'
  },
  {
    id: 'LOOK-PROD-1002',
    name: 'Slim Fit White Shirt',
    category: 'Shirts',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://myntra.com',
    description: 'Crisp white cotton shirt, essential for any formal wardrobe.',
    uploadedBy: 'u1',
    isApproved: true,
    clicks: 85,
    createdAt: new Date().toISOString(),
    rating: 4.2,
    gender: 'Men'
  },
  {
    id: 'LOOK-PROD-1003',
    name: 'Navy Chino Trousers',
    category: 'Pants',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://flipkart.com',
    description: 'Comfortable stretch chinos in a deep navy shade.',
    uploadedBy: 'u1',
    isApproved: true,
    clicks: 92,
    createdAt: new Date().toISOString(),
    rating: 4.0,
    gender: 'Men'
  },
  {
    id: 'LOOK-PROD-1004',
    name: 'Leather Chelsea Boots',
    category: 'Shoes',
    price: 3499,
    originalPrice: 4999,
    image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://amazon.com',
    description: 'Premium leather boots with elastic side panels.',
    uploadedBy: 'u1',
    isApproved: true,
    clicks: 210,
    createdAt: new Date().toISOString(),
    rating: 4.8,
    gender: 'Unisex'
  },
  {
    id: 'LOOK-PROD-1005',
    name: 'Gold Minimalist Watch',
    category: 'Accessories',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://amazon.com',
    description: 'Elegant gold-tone watch with a clean dial.',
    uploadedBy: 'u2',
    isApproved: true,
    clicks: 45,
    createdAt: new Date().toISOString(),
    rating: 4.6,
    gender: 'Unisex'
  },
  {
    id: 'LOOK-PROD-1006',
    name: 'Oversized Denim Jacket',
    category: 'Outerwear',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://myntra.com',
    description: 'Vintage wash denim jacket with an oversized fit.',
    uploadedBy: 'u2',
    isApproved: true,
    clicks: 150,
    createdAt: new Date().toISOString(),
    rating: 4.3,
    gender: 'Women'
  },
  {
    id: 'LOOK-PROD-1007',
    name: 'Black Wayfarer Sunglasses',
    category: 'Accessories',
    price: 899,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800',
    affiliateLink: 'https://amazon.com',
    description: 'Classic black sunglasses with UV protection.',
    uploadedBy: 'u1',
    isApproved: true,
    clicks: 300,
    createdAt: new Date().toISOString(),
    rating: 4.1,
    gender: 'Unisex'
  }
];

// Initial Mock Outfits
const INITIAL_OUTFITS: Outfit[] = [
  {
    id: 'LOOK-OUTFIT-2001',
    name: 'Urban Sophisticate',
    description: 'A polished look for the modern city dweller, perfect for office to evening transitions.',
    mainImage: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800',
    items: ['LOOK-PROD-1001', 'LOOK-PROD-1002', 'LOOK-PROD-1003', 'LOOK-PROD-1004'],
    totalPrice: 11197,
    uploadedBy: 'u1',
    isApproved: true,
    isTrending: true,
    category: 'Office Wear',
    gender: 'Women',
    clicks: 540,
    createdAt: new Date().toISOString()
  },
  {
    id: 'LOOK-OUTFIT-2002',
    name: 'Weekend Casual',
    description: 'Relaxed vibes for your Saturday brunch or a stroll in the park.',
    mainImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
    items: ['LOOK-PROD-1006', 'LOOK-PROD-1002', 'LOOK-PROD-1007'],
    totalPrice: 4397,
    uploadedBy: 'u2',
    isApproved: true,
    isTrending: true,
    category: 'Casual',
    gender: 'Women',
    clicks: 320,
    createdAt: new Date().toISOString()
  },
   {
    id: 'LOOK-OUTFIT-2003',
    name: 'Evening Elegance',
    description: 'Stand out at any party with this sharp and sophisticated ensemble.',
    mainImage: 'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&q=80&w=800',
    items: ['LOOK-PROD-1002', 'LOOK-PROD-1003', 'LOOK-PROD-1005'],
    totalPrice: 5697,
    uploadedBy: 'u1',
    isApproved: true,
    isTrending: false,
    category: 'Party',
    gender: 'Men',
    clicks: 180,
    createdAt: new Date().toISOString()
  }
];

// --- STORAGE SERVICE ---
const KEY_PRODUCTS = 'lookera_products';
const KEY_OUTFITS = 'lookera_outfits';

export const getProducts = (): Product[] => {
  try {
    const stored = localStorage.getItem(KEY_PRODUCTS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse products', e);
  }
  // Initialize if empty
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
};

export const saveProduct = (product: Product): Product[] => {
  const current = getProducts();
  const updated = [product, ...current];
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(updated));
  return updated;
};

export const deleteProduct = (id: string): Product[] => {
  const current = getProducts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(KEY_PRODUCTS, JSON.stringify(updated));
  return updated;
};

export const getOutfits = (): Outfit[] => {
  try {
    const stored = localStorage.getItem(KEY_OUTFITS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to parse outfits', e);
  }
  // Initialize if empty
  localStorage.setItem(KEY_OUTFITS, JSON.stringify(INITIAL_OUTFITS));
  return INITIAL_OUTFITS;
};

export const saveOutfit = (outfit: Outfit): Outfit[] => {
  const current = getOutfits();
  const updated = [outfit, ...current];
  localStorage.setItem(KEY_OUTFITS, JSON.stringify(updated));
  return updated;
};

export const deleteOutfit = (id: string): Outfit[] => {
  const current = getOutfits();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(KEY_OUTFITS, JSON.stringify(updated));
  return updated;
};

// Export initial constants for legacy support if needed, but prefer functions
export const MOCK_PRODUCTS = getProducts();
export const MOCK_OUTFITS = getOutfits();