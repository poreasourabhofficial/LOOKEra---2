export enum UserRole {
  FOUNDER = 'FOUNDER',
  EMPLOYEE = 'EMPLOYEE',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string; // LOOK-PROD-XXXX
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  affiliateLink: string;
  description: string;
  rating?: number;
  reviews?: number;
  uploadedBy: string; // User ID
  isApproved: boolean;
  clicks: number;
  createdAt: string;
  gender?: 'Men' | 'Women' | 'Unisex'; // Added for better filtering
}

export interface OutfitItem {
  productId: string;
  position: { x: number; y: number }; // For hotspots
}

export interface Outfit {
  id: string; // LOOK-OUTFIT-XXXX
  name: string;
  description: string;
  mainImage: string;
  items: string[]; // Array of Product IDs
  totalPrice: number;
  uploadedBy: string; // User ID
  isApproved: boolean;
  isTrending: boolean;
  category: 'Casual' | 'Formal' | 'Party' | 'Travel' | 'Festive' | 'Office Wear';
  gender: 'Men' | 'Women' | 'Unisex';
  clicks: number;
  createdAt: string;
}

export interface AnalyticsData {
  totalViews: number;
  totalClicks: number;
  topProducts: Product[];
  topOutfits: Outfit[];
}