export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  inStock: boolean;
  tag?: string;
  sku: string;
  discount?: number;
  description: string;
  specifications: Record<string, string>;
  brand: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: Date;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  productIds?: string[];
  categoryIds?: string[];
  type: 'percentage' | 'fixed' | 'bogo';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  productCount: number;
}