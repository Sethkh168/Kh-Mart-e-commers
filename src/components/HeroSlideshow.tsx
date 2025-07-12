import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'iPhone 15 Pro Max',
      subtitle: 'Titanium. So strong. So light. So Pro.',
      price: 'Starting at $1,199',
      description: 'Experience the most advanced iPhone ever with titanium design and A17 Pro chip',
      image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800',
      bgColor: 'from-blue-600 to-blue-700',
      buttonText: 'Shop iPhone'
    },
    {
      id: 2,
      title: 'MacBook Pro M3',
      subtitle: 'Mind-blowing. Head-turning.',
      price: 'Starting at $1,599',
      description: 'Supercharged by M3 Pro and M3 Max chips for extreme performance',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
      bgColor: 'from-purple-600 to-purple-700',
      buttonText: 'Shop MacBook'
    },
    {
      id: 3,
      title: 'Gaming Setup',
      subtitle: 'Level up your game',
      price: 'Complete setups from $899',
      description: 'Professional gaming gear for the ultimate competitive advantage',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      bgColor: 'from-green-600 to-green-700',
      buttonText: 'Shop Gaming'
    },
    {
      id: 4,
      title: 'Audio Excellence',
      subtitle: 'Hear every detail',
      price: 'Premium headphones from $199',
      description: 'Immerse yourself in crystal-clear sound with our premium audio collection',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      bgColor: 'from-orange-600 to-orange-700',
      buttonText: 'Shop Audio'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-96 lg:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className={`h-full bg-gradient-to-r ${slide.bgColor} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-4">{slide.title}</h2>
                    <p className="text-xl lg:text-2xl mb-2 text-opacity-90">{slide.subtitle}</p>
                    <p className="text-lg lg:text-xl mb-4 font-semibold">{slide.price}</p>
                    <p className="text-lg mb-8 text-opacity-80 max-w-md">{slide.description}</p>
                    <button className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2 text-lg">
                      <span>{slide.buttonText}</span>
                      <ArrowRight size={20} />
                    </button>
                  </div>
                  <div className="flex justify-center lg:justify-end">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-2xl shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all z-20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlideshow;