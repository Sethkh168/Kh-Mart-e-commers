import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Order, Promotion } from '../types';

interface StoreState {
  // Products
  products: Product[];
  categories: string[];
  
  // Cart
  cart: CartItem[];
  
  // Wishlist
  wishlist: Product[];
  
  // User
  user: User | null;
  isAuthenticated: boolean;
  
  // Orders
  orders: Order[];
  
  // Promotions
  promotions: Promotion[];
  
  // UI State
  searchQuery: string;
  selectedCategory: string;
  
  // Actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  login: (user: User) => void;
  logout: () => void;
  
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  
  addOrder: (order: Order) => void;
  
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (id: string, updates: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;
}

// Mock initial products
const initialProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro Max',
    category: 'Smartphones',
    price: 1099,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 234,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300',
    images: [
      'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    inStock: true,
    tag: 'HOT',
    sku: 'SKU-001234',
    discount: 8,
    description: 'The iPhone 14 Pro Max features the most advanced Pro camera system ever, A16 Bionic chip, and a stunning 6.7-inch Super Retina XDR display with ProMotion.',
    specifications: {
      'Display': '6.7-inch Super Retina XDR',
      'Chip': 'A16 Bionic',
      'Camera': 'Pro camera system',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Battery': 'Up to 29 hours video playback'
    },
    brand: 'Apple',
    stock: 50
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    category: 'Laptops',
    price: 1199,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
    images: [
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    inStock: true,
    tag: 'NEW',
    sku: 'SKU-002345',
    discount: 14,
    description: 'The new MacBook Air with M2 chip delivers incredible performance and up to 18 hours of battery life in a fanless design.',
    specifications: {
      'Chip': 'Apple M2',
      'Display': '13.6-inch Liquid Retina',
      'Memory': '8GB, 16GB, 24GB',
      'Storage': '256GB, 512GB, 1TB, 2TB SSD',
      'Battery': 'Up to 18 hours'
    },
    brand: 'Apple',
    stock: 30
  },
  {
    id: '3',
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    price: 279,
    originalPrice: 349,
    rating: 4.7,
    reviews: 89,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    inStock: false,
    tag: '-20%',
    sku: 'SKU-003456',
    discount: 20,
    description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Up to 30-hour battery life with quick charge.',
    specifications: {
      'Type': 'Over-ear wireless',
      'Noise Canceling': 'Industry-leading',
      'Battery': 'Up to 30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Weight': '254g'
    },
    brand: 'Sony',
    stock: 0
  }
];

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      products: initialProducts,
      categories: ['Smartphones', 'Laptops', 'Audio', 'Tablets', 'Gaming', 'Accessories'],
      cart: [],
      wishlist: [],
      user: null,
      isAuthenticated: false,
      orders: [],
      promotions: [],
      searchQuery: '',
      selectedCategory: '',

      // Product actions
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Date.now().toString() }]
        })),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id)
        })),

      // Cart actions
      addToCart: (product, quantity = 1) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.product.id === product.id);
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return {
            cart: [...state.cart, { product, quantity }]
          };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.product.id !== productId)
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        })),

      clearCart: () => set({ cart: [] }),

      // Wishlist actions
      addToWishlist: (product) =>
        set((state) => {
          const isAlreadyInWishlist = state.wishlist.some((item) => item.id === product.id);
          if (isAlreadyInWishlist) return state;
          return {
            wishlist: [...state.wishlist, product]
          };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((item) => item.id !== productId)
        })),

      isInWishlist: (productId) => {
        const state = get();
        return state.wishlist.some((item) => item.id === productId);
      },

      // User actions
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false, cart: [], wishlist: [] }),

      // Search and filter
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      // Orders
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order]
        })),

      // Promotions
      addPromotion: (promotion) =>
        set((state) => ({
          promotions: [...state.promotions, { ...promotion, id: Date.now().toString() }]
        })),

      updatePromotion: (id, updates) =>
        set((state) => ({
          promotions: state.promotions.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          )
        })),

      deletePromotion: (id) =>
        set((state) => ({
          promotions: state.promotions.filter((p) => p.id !== id)
        }))
    }),
    {
      name: 'kh-mart-store'
    }
  )
);