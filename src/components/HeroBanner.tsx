import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

const HeroBanner = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Banner */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl overflow-hidden h-96">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="relative z-10 flex items-center h-full px-8">
                <div className="text-white max-w-md">
                  <h2 className="text-4xl font-bold mb-4">Google Pixel 7</h2>
                  <p className="text-xl mb-2">Starting at $599</p>
                  <p className="text-blue-100 mb-6">Experience the latest Android with advanced camera technology</p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <span>Pre-Order Now</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
                <div className="ml-auto">
                  <img 
                    src="https://images.pexels.com/photos/17456808/pexels-photo-17456808.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Google Pixel 7" 
                    className="w-48 h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Side Banners */}
          <div className="space-y-6">
            {/* Countdown Banner */}
            <div className="bg-orange-500 rounded-2xl p-6 text-white h-44">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Aurora Headset</h3>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">-30%</span>
              </div>
              <p className="text-orange-100 mb-4">Limited time offer</p>
              <div className="flex items-center space-x-2 text-sm">
                <Clock size={16} />
                <span>Ends in:</span>
              </div>
              <div className="flex space-x-2 mt-2">
                <div className="bg-white bg-opacity-20 rounded px-2 py-1 text-center">
                  <div className="font-bold">12</div>
                  <div className="text-xs">Days</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded px-2 py-1 text-center">
                  <div className="font-bold">05</div>
                  <div className="text-xs">Hrs</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded px-2 py-1 text-center">
                  <div className="font-bold">23</div>
                  <div className="text-xs">Min</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded px-2 py-1 text-center">
                  <div className="font-bold">45</div>
                  <div className="text-xs">Sec</div>
                </div>
              </div>
            </div>

            {/* Featured Product */}
            <div className="bg-purple-600 rounded-2xl p-6 text-white h-44">
              <h3 className="text-lg font-semibold mb-2">Pro Gaming Controller</h3>
              <p className="text-purple-100 mb-4">Wireless with haptic feedback</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">$79.99</span>
                  <span className="text-purple-200 line-through text-sm ml-2">$99.99</span>
                </div>
                <img 
                  src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=100" 
                  alt="Gaming Controller" 
                  className="w-16 h-16 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;