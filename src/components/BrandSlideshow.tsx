import React, { useState, useEffect } from 'react';

const BrandSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const brands = [
    { name: 'Apple', logo: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Samsung', logo: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Sony', logo: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Microsoft', logo: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Google', logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Dell', logo: 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'HP', logo: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { name: 'Lenovo', logo: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=200' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(brands.length / 4));
    }, 3000);

    return () => clearInterval(timer);
  }, [brands.length]);

  const visibleBrands = brands.slice(currentSlide * 4, currentSlide * 4 + 4);

  return (
    <section className="py-8 bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Trusted Brands</h3>
          <p className="text-gray-600">Shop from the world's leading technology brands</p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex items-center justify-center space-x-12">
            {visibleBrands.map((brand, index) => (
              <div
                key={`${brand.name}-${currentSlide}-${index}`}
                className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="w-24 h-16 flex items-center justify-center bg-gray-50 rounded-lg p-2">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Slide Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(brands.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlideshow;