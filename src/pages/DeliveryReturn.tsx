import React, { useState } from 'react';
import { Truck, Package, Clock, Shield, RotateCcw, CheckCircle, AlertCircle, MapPin } from 'lucide-react';

const DeliveryReturn = () => {
  const [activeTab, setActiveTab] = useState('delivery');

  const deliveryOptions = [
    {
      name: 'Standard Delivery',
      price: '$9.99',
      time: '5-7 business days',
      description: 'Reliable delivery for most orders',
      icon: Truck,
      features: ['Tracking included', 'Signature required', 'Insurance up to $100']
    },
    {
      name: 'Express Delivery',
      price: '$19.99',
      time: '2-3 business days',
      description: 'Faster delivery for urgent orders',
      icon: Package,
      features: ['Priority handling', 'Real-time tracking', 'Insurance up to $500']
    },
    {
      name: 'Next Day Delivery',
      price: '$29.99',
      time: '1 business day',
      description: 'Get your order tomorrow',
      icon: Clock,
      features: ['Guaranteed delivery', 'SMS notifications', 'Full insurance coverage']
    },
    {
      name: 'Free Shipping',
      price: 'Free',
      time: '7-10 business days',
      description: 'Free on orders over $99',
      icon: Shield,
      features: ['No minimum weight', 'Basic tracking', 'Standard insurance']
    }
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Log into your account and select the item you want to return',
      icon: Package
    },
    {
      step: 2,
      title: 'Print Label',
      description: 'Download and print the prepaid return shipping label',
      icon: Truck
    },
    {
      step: 3,
      title: 'Package Item',
      description: 'Securely package the item in its original packaging',
      icon: Shield
    },
    {
      step: 4,
      title: 'Ship Back',
      description: 'Drop off at any authorized shipping location',
      icon: MapPin
    },
    {
      step: 5,
      title: 'Get Refund',
      description: 'Receive your refund within 5-7 business days',
      icon: CheckCircle
    }
  ];

  const faqItems = [
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with all packaging and accessories.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days, and next-day delivery is available for urgent orders.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Currently, we ship within the United States and Canada. International shipping to other countries is coming soon.'
    },
    {
      question: 'Can I track my order?',
      answer: 'Yes! You\'ll receive a tracking number via email once your order ships. You can track your package on our website or the carrier\'s website.'
    },
    {
      question: 'What if my item arrives damaged?',
      answer: 'If your item arrives damaged, please contact us within 48 hours with photos. We\'ll arrange a replacement or full refund immediately.'
    },
    {
      question: 'How do I return an item?',
      answer: 'Log into your account, go to order history, and select "Return Item". We\'ll provide a prepaid return label and instructions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Delivery & Returns</h1>
          <p className="text-xl text-blue-100 mb-8">
            Fast, reliable shipping and hassle-free returns
          </p>
          <div className="flex justify-center space-x-8 text-center">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Truck className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Fast Shipping</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <RotateCcw className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Easy Returns</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Shield className="w-8 h-8 mx-auto mb-2" />
              <p className="font-semibold">Secure Delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-lg shadow-sm p-1">
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'delivery'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Delivery Options
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'returns'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Returns & Exchanges
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'faq'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              FAQ
            </button>
          </div>
        </div>

        {/* Delivery Options */}
        {activeTab === 'delivery' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Delivery Speed</h2>
              <p className="text-gray-600 text-lg">
                We offer multiple shipping options to meet your needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {deliveryOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="text-center mb-6">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{option.name}</h3>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{option.price}</div>
                      <div className="text-gray-600 font-medium">{option.time}</div>
                    </div>
                    
                    <p className="text-gray-600 text-center mb-6">{option.description}</p>
                    
                    <div className="space-y-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Delivery Areas</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>All 50 US States</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Canada (additional fees apply)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>APO/FPO addresses</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-orange-500" />
                      <span>Alaska & Hawaii (extended delivery time)</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Orders placed before 2 PM EST ship same day</li>
                    <li>• Signature required for orders over $500</li>
                    <li>• We don't deliver on weekends or holidays</li>
                    <li>• Large items may require special delivery</li>
                    <li>• Tracking information sent via email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Returns & Exchanges */}
        {activeTab === 'returns' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Easy Returns & Exchanges</h2>
              <p className="text-gray-600 text-lg">
                30-day return policy with free return shipping
              </p>
            </div>

            {/* Return Process */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Return Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {returnSteps.map((step, index) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                        {step.step}
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-600 text-sm">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Return Policy Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">What Can Be Returned</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Unopened Items</p>
                      <p className="text-gray-600 text-sm">Items in original packaging with all accessories</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Defective Products</p>
                      <p className="text-gray-600 text-sm">Items that don't work as expected</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Wrong Item Received</p>
                      <p className="text-gray-600 text-sm">If we sent you the wrong product</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Opened Software</p>
                      <p className="text-gray-600 text-sm">May be subject to restocking fee</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Return Timeframes</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Standard Returns</span>
                    <span className="font-medium text-gray-900">30 days</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Defective Items</span>
                    <span className="font-medium text-gray-900">1 year warranty</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="text-gray-600">Holiday Purchases</span>
                    <span className="font-medium text-gray-900">Extended to Jan 31</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Refund Processing</span>
                    <span className="font-medium text-gray-900">5-7 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Exchange Information */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
              <div className="text-center">
                <RotateCcw className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Need an Exchange?</h3>
                <p className="text-green-100 mb-6">
                  Exchanges are processed faster than returns. Get your replacement item in 2-3 business days.
                </p>
                <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Exchange
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ */}
        {activeTab === 'faq' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">
                Find quick answers to common shipping and return questions
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg divide-y divide-gray-200">
              {faqItems.map((item, index) => (
                <div key={index} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>

            {/* Contact Support */}
            <div className="bg-blue-50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
              <p className="text-gray-600 mb-6">
                Our customer support team is here to help with any shipping or return questions.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Contact Support
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors font-semibold">
                  Live Chat
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryReturn;