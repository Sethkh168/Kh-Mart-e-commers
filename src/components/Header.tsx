import React from 'react';
import { Search, ShoppingCart, Heart, User, Phone, Globe, ChevronDown, Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

const Header = () => {
  const navigate = useNavigate();
  const { cart, user, isAuthenticated, logout, searchQuery, setSearchQuery } = useStore();
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/products');
    }
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        navigate('/admin');
      } else {
        // User profile or logout
        logout();
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Topbar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-sm">
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Phone size={14} />
                <span>+1 (555) 123-4567</span>
              </div>
              <span>Free shipping on orders over $99</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
                <Globe size={14} />
                <span>EN</span>
                <ChevronDown size={12} />
              </div>
              <div className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors">
                <span>USD</span>
                <ChevronDown size={12} />
              </div>
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm">Welcome, {user?.name}</span>
                    <button 
                      onClick={() => logout()}
                      className="hover:text-blue-600 transition-colors flex items-center space-x-1"
                    >
                      <LogOut size={14} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => navigate('/auth')}
                      className="hover:text-blue-600 transition-colors"
                    >
                      Account
                    </button>
                    <button className="hover:text-blue-600 transition-colors">Wishlist</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => navigate('/')}
            >
              KH-MART
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <Search size={20} />
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Heart size={20} />
              <span className="hidden sm:inline">Wishlist</span>
            </button>
            <button 
              onClick={handleAuthAction}
              className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
            >
              <User size={20} />
              <span className="hidden sm:inline">
                {isAuthenticated ? (user?.role === 'admin' ? 'Admin' : 'Profile') : 'Account'}
              </span>
            </button>
            <button 
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors relative"
            >
              <ShoppingCart size={20} />
              <span>${cartTotal.toFixed(2)} ({cartItemCount})</span>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <Menu size={18} />
                <span 
                  onClick={() => navigate('/products')}
                >
                  All Categories
                </span>
              </button>
              <button 
                onClick={() => navigate('/products')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Products
              </button>
              <button 
                onClick={() => navigate('/promotions')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Promotions
              </button>
              <button 
                onClick={() => navigate('/stores')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Stores
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Our Contacts
              </button>
              <button 
                onClick={() => navigate('/delivery-return')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Delivery & Return
              </button>
              <button 
                onClick={() => navigate('/outlet')}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Outlet
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;