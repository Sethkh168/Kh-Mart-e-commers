import React, { useState, useMemo } from 'react';
import { Percent, Clock, Star, Filter, Grid, List, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const Outlet = () => {
  const { products } = useStore();
  const [sortBy, setSortBy] = useState('discount');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Create outlet products with discounts
  const outletProducts = useMemo(() => {
    return products.map(product => ({
      ...product,
      originalPrice: product.originalPrice || product.price * 1.3,
      discount: Math.floor(Math.random() * 50) + 20, // 20-70% discount
      outletReason: ['Clearance', 'Overstock', 'Display Model', 'Last Season'][Math.floor(Math.random() * 4)]
    })).filter(product => product.discount >= 20);
  }, [products]);

  const categories = ['all', ...new Set(outletProducts.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    let filtered = outletProducts;

    // Filter by category
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return (b.discount || 0) - (a.discount || 0);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [outletProducts, filterCategory, priceRange, sortBy]);

  const totalSavings = filteredProducts.reduce((sum, product) => {
    return sum + ((product.originalPrice || product.price) - product.price);
  }, 0);

  const outletCategories = [
    {
      name: 'Clearance Sale',
      description: 'End of line products at amazing prices',
      discount: 'Up to 70% off',
      color: 'red',
      count: outletProducts.filter(p => p.outletReason === 'Clearance').length
    },
    {
      name: 'Overstock Items',
      description: 'Excess inventory at reduced prices',
      discount: 'Up to 50% off',
      color: 'blue',
      count: outletProducts.filter(p => p.outletReason === 'Overstock').length
    },
    {
      name: 'Display Models',
      description: 'Gently used display units',
      discount: 'Up to 40% off',
      color: 'green',
      count: outletProducts.filter(p => p.outletReason === 'Display Model').length
    },
    {
      name: 'Previous Season',
      description: 'Last season models still great quality',
      discount: 'Up to 60% off',
      color: 'purple',
      count: outletProducts.filter(p => p.outletReason === 'Last Season').length
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-600 border-red-200',
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">KH-MART Outlet</h1>
          <p className="text-xl text-red-100 mb-8">
            Incredible deals on quality tech products - Limited time offers!
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Percent className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Up to 70% Off</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Limited Time</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Quality Guaranteed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Outlet Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Outlet Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {outletCategories.map((category, index) => (
              <div key={index} className={`border-2 rounded-2xl p-6 text-center hover:shadow-lg transition-all ${getColorClasses(category.color)}`}>
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-sm mb-3 opacity-80">{category.description}</p>
                <div className="text-xl font-bold mb-2">{category.discount}</div>
                <div className="text-sm opacity-70">{category.count} items available</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 mb-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl font-bold">{filteredProducts.length}</div>
              <div className="text-green-100">Outlet Items</div>
            </div>
            <div>
              <div className="text-3xl font-bold">${totalSavings.toFixed(0)}</div>
              <div className="text-green-100">Total Savings Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold">
                {Math.round(filteredProducts.reduce((sum, p) => sum + (p.discount || 0), 0) / filteredProducts.length)}%
              </div>
              <div className="text-green-100">Average Discount</div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="discount">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-4">
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <div className="flex space-x-4">
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max="1000"
                step="50"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Tag size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No outlet items found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more products.</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} className={viewMode === 'list' ? 'flex' : ''} />
                {/* Outlet Badge */}
                <div className="absolute top-2 left-2 z-20">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    OUTLET
                  </div>
                </div>
                {/* Discount Badge */}
                <div className="absolute top-2 right-2 z-20">
                  <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    -{product.discount}%
                  </div>
                </div>
                {/* Reason Badge */}
                <div className="absolute top-10 left-2 z-20">
                  <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded font-medium">
                    {product.outletReason}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Outlet Information */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Shop Our Outlet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Massive Savings</h3>
              <p className="text-gray-600 text-sm">Save up to 70% on quality tech products from top brands</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">All outlet items come with our standard warranty and return policy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Limited Time</h3>
              <p className="text-gray-600 text-sm">Outlet deals are available while supplies last - don't miss out!</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Get Outlet Alerts</h2>
          <p className="text-red-100 mb-6">
            Be the first to know when new outlet deals become available
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-red-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Outlet;