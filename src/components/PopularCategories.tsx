import React from 'react';
import { Smartphone, Laptop, Cpu, Zap, Camera, Headphones, Gamepad2, Watch } from 'lucide-react';

const PopularCategories = () => {
  const categories = [
    { icon: Smartphone, name: 'Apple iPhone', count: '245 products' },
    { icon: Laptop, name: 'Apple MacBook', count: '98 products' },
    { icon: Cpu, name: 'Motherboards', count: '156 products' },
    { icon: Zap, name: 'Drones', count: '73 products' },
    { icon: Camera, name: 'Cameras', count: '189 products' },
    { icon: Headphones, name: 'Audio', count: '267 products' },
    { icon: Gamepad2, name: 'Gaming', count: '134 products' },
    { icon: Watch, name: 'Smartwatches', count: '87 products' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Categories</h2>
          <p className="text-gray-600">Discover our most popular product categories</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="bg-gray-50 rounded-2xl p-6 text-center hover:bg-blue-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1 text-sm">{category.name}</h3>
                  <p className="text-gray-500 text-xs">{category.count}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;