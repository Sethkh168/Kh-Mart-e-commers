import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Search, Filter } from 'lucide-react';

const Stores = () => {
  const [selectedCity, setSelectedCity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const stores = [
    {
      id: 1,
      name: 'KH-MART Downtown',
      address: '123 Tech Street, Downtown District',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 123-4567',
      email: 'downtown@kh-mart.com',
      hours: {
        weekdays: '9:00 AM - 9:00 PM',
        saturday: '9:00 AM - 10:00 PM',
        sunday: '10:00 AM - 8:00 PM'
      },
      services: ['Tech Support', 'Product Demos', 'Repairs', 'Trade-ins'],
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 2,
      name: 'KH-MART Mall Plaza',
      address: '456 Shopping Center Blvd, Mall Plaza',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      phone: '+1 (555) 234-5678',
      email: 'mallplaza@kh-mart.com',
      hours: {
        weekdays: '10:00 AM - 9:00 PM',
        saturday: '10:00 AM - 10:00 PM',
        sunday: '11:00 AM - 7:00 PM'
      },
      services: ['Tech Support', 'Product Demos', 'Gaming Zone'],
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    },
    {
      id: 3,
      name: 'KH-MART Tech Hub',
      address: '789 Innovation Drive, Tech District',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      phone: '+1 (555) 345-6789',
      email: 'techhub@kh-mart.com',
      hours: {
        weekdays: '8:00 AM - 8:00 PM',
        saturday: '9:00 AM - 9:00 PM',
        sunday: '10:00 AM - 6:00 PM'
      },
      services: ['Tech Support', 'Product Demos', 'Repairs', 'Trade-ins', 'Business Solutions'],
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true
    },
    {
      id: 4,
      name: 'KH-MART Express',
      address: '321 Quick Stop Lane, Express Center',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      phone: '+1 (555) 456-7890',
      email: 'express@kh-mart.com',
      hours: {
        weekdays: '7:00 AM - 10:00 PM',
        saturday: '8:00 AM - 10:00 PM',
        sunday: '9:00 AM - 9:00 PM'
      },
      services: ['Quick Pickup', 'Product Demos', 'Mobile Accessories'],
      image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false
    }
  ];

  const cities = ['all', ...new Set(stores.map(store => store.city))];

  const filteredStores = stores.filter(store => {
    const matchesCity = selectedCity === 'all' || store.city === selectedCity;
    const matchesSearch = store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         store.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Store Locations</h1>
          <p className="text-xl text-blue-100 mb-8">
            Visit us in person for hands-on product experiences and expert advice
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">{stores.length} Locations</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Clock className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Extended Hours</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Phone className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Expert Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search stores by name, address, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Store Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStores.map((store) => (
            <div key={store.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden ${store.featured ? 'ring-2 ring-blue-500' : ''}`}>
              {store.featured && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  Featured Store
                </div>
              )}
              
              <div className="relative">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                    <Navigation size={20} className="text-blue-600" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{store.name}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{store.address}</p>
                      <p className="text-gray-600">{store.city}, {store.state} {store.zipCode}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <a href={`tel:${store.phone}`} className="text-blue-600 hover:text-blue-700">
                      {store.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div className="text-sm">
                      <p className="text-gray-900">Mon-Fri: {store.hours.weekdays}</p>
                      <p className="text-gray-900">Saturday: {store.hours.saturday}</p>
                      <p className="text-gray-900">Sunday: {store.hours.sunday}</p>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Services Available:</h4>
                  <div className="flex flex-wrap gap-2">
                    {store.services.map((service, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Get Directions
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                    Call Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <MapPin size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No stores found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all locations.</p>
          </div>
        )}

        {/* Store Services Info */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">What to Expect at Our Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">Get personalized advice from our tech experts</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Product Demos</h3>
              <p className="text-gray-600 text-sm">Try before you buy with hands-on demonstrations</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quick Pickup</h3>
              <p className="text-gray-600 text-sm">Order online and pick up in-store for convenience</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Repair Services</h3>
              <p className="text-gray-600 text-sm">Professional repair and maintenance services</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stores;