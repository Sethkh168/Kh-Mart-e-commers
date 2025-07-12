import React, { useState } from 'react';
import { Calendar, Clock, Tag, Gift, Percent, Star, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import ProductCard from '../components/ProductCard';

const Promotions = () => {
  const { products } = useStore();
  const [activeTab, setActiveTab] = useState('current');

  // Mock promotional data
  const currentPromotions = [
    {
      id: 1,
      title: 'Black Friday Mega Sale',
      description: 'Up to 70% off on selected electronics',
      discount: '70%',
      endDate: '2025-11-30',
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'seasonal',
      products: products.slice(0, 4)
    },
    {
      id: 2,
      title: 'New Year Tech Deals',
      description: 'Start the year with the latest technology',
      discount: '50%',
      endDate: '2025-01-15',
      image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'seasonal',
      products: products.slice(1, 5)
    },
    {
      id: 3,
      title: 'Student Discount Program',
      description: 'Special prices for students and educators',
      discount: '25%',
      endDate: '2025-12-31',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'ongoing',
      products: products.slice(2, 6)
    }
  ];

  const upcomingPromotions = [
    {
      id: 4,
      title: 'Summer Electronics Festival',
      description: 'Cool deals for hot summer days',
      discount: '60%',
      startDate: '2025-06-01',
      image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'seasonal'
    },
    {
      id: 5,
      title: 'Back to School Special',
      description: 'Essential tech for students',
      discount: '40%',
      startDate: '2025-08-15',
      image: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=600',
      type: 'seasonal'
    }
  ];

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) return null;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Special Promotions</h1>
          <p className="text-xl text-blue-100 mb-8">
            Discover amazing deals and exclusive offers on your favorite tech products
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Gift className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Free Gifts</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Percent className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Up to 70% Off</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Exclusive Deals</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('current')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Current Promotions
            </button>
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'upcoming'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Upcoming Deals
            </button>
          </div>
        </div>

        {/* Current Promotions */}
        {activeTab === 'current' && (
          <div className="space-y-12">
            {currentPromotions.map((promotion) => {
              const timeRemaining = getTimeRemaining(promotion.endDate);
              
              return (
                <div key={promotion.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Tag className="w-5 h-5 text-red-500" />
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {promotion.discount} OFF
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          promotion.type === 'seasonal' 
                            ? 'bg-orange-100 text-orange-600' 
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {promotion.type === 'seasonal' ? 'Limited Time' : 'Ongoing'}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">{promotion.title}</h2>
                      <p className="text-gray-600 text-lg mb-6">{promotion.description}</p>
                      
                      {timeRemaining && (
                        <div className="mb-6">
                          <p className="text-sm font-medium text-gray-700 mb-2">Time Remaining:</p>
                          <div className="flex space-x-4">
                            <div className="bg-gray-100 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-gray-900">{timeRemaining.days}</div>
                              <div className="text-sm text-gray-600">Days</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-gray-900">{timeRemaining.hours}</div>
                              <div className="text-sm text-gray-600">Hours</div>
                            </div>
                            <div className="bg-gray-100 rounded-lg p-3 text-center">
                              <div className="text-2xl font-bold text-gray-900">{timeRemaining.minutes}</div>
                              <div className="text-sm text-gray-600">Minutes</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                        <span>Shop Now</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                    
                    <div>
                      <img
                        src={promotion.image}
                        alt={promotion.title}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    </div>
                  </div>
                  
                  {promotion.products && (
                    <div className="px-8 pb-8">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Featured Products</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {promotion.products.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Upcoming Promotions */}
        {activeTab === 'upcoming' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingPromotions.map((promotion) => (
              <div key={promotion.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={promotion.image}
                  alt={promotion.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    <span className="text-sm text-gray-600">
                      Starts: {new Date(promotion.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{promotion.title}</h3>
                  <p className="text-gray-600 mb-4">{promotion.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                      Up to {promotion.discount} OFF
                    </span>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      Get Notified
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal</h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter and be the first to know about exclusive promotions
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;