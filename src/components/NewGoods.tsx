import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

const NewGoods = () => {
  const { products } = useStore();
  
  // Show latest 3 products as new goods
  const newProducts = products.slice(-3);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">New Goods</h2>
          <p className="text-gray-600">Latest arrivals in our tech collection</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Featured Banner */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl p-6 h-full text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Nothing Phone 1</h3>
                <p className="text-gray-300 mb-4">Glyph Interface Technology</p>
                <div className="mb-6">
                  <span className="text-3xl font-bold">$399</span>
                  <span className="text-gray-400 line-through text-lg ml-2">$499</span>
                </div>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                  <span>Buy Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="absolute bottom-0 right-0 opacity-20">
                <img 
                  src="https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=200" 
                  alt="Nothing Phone 1" 
                  className="w-32 h-40 object-cover"
                />
              </div>
            </div>
          </div>

          {/* New Products Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewGoods;