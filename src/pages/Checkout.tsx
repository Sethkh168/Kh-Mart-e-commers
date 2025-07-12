import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Shield, ArrowLeft, Lock, CheckCircle, Clock, MapPin } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zipCode: yup.string().required('ZIP code is required'),
  country: yup.string().required('Country is required'),
  cardNumber: yup.string().required('Card number is required'),
  expiryDate: yup.string().required('Expiry date is required'),
  cvv: yup.string().required('CVV is required'),
  cardName: yup.string().required('Cardholder name is required'),
});

const Checkout = () => {
  const { cart, user, clearCart, addOrder } = useStore();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 99 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: any) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order = {
      id: Date.now().toString(),
      userId: user?.id || 'guest',
      items: cart,
      total,
      status: 'pending' as const,
      shippingAddress: {
        street: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },
      paymentMethod,
      createdAt: new Date(),
    };

    addOrder(order);
    clearCart();
    setIsProcessing(false);
    
    toast.success('Order placed successfully!');
    navigate('/order-confirmation', { state: { orderId: order.id } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to checkout</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Cart</span>
            </button>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  ✓
                </div>
                <span className="text-sm font-medium text-green-600">Cart</span>
              </div>
              <div className="w-8 h-0.5 bg-blue-600"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="text-sm font-medium text-blue-600">Checkout</span>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <span className="text-sm font-medium text-gray-500">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Shipping & Payment</h1>
              </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  <span>Contact Information</span>
                </h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="border-b border-gray-200 pb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  <span>Shipping Address</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      {...register('firstName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...register('lastName')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      {...register('address')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      {...register('city')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.city && (
                      <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      {...register('state')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      {...register('zipCode')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.zipCode && (
                      <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <select
                      {...register('country')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  <span>Payment Method</span>
                </h2>
                
                <div className="space-y-3 mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors">
                    <input
                      type="radio"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="text-blue-600 w-4 h-4"
                    />
                    <CreditCard size={20} className="text-gray-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                    <div className="ml-auto flex space-x-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                    </div>
                  </label>
                </div>

                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          {...register('cardNumber')}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      </div>
                      {errors.cardNumber && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        {...register('expiryDate')}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        {...register('cvv')}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        {...register('cardName')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      {errors.cardName && (
                        <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                <Lock size={20} />
                <span>{isProcessing ? 'Processing Payment...' : `Complete Order - $${total.toFixed(2)}`}</span>
              </button>
            </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center space-x-2">
                <ShoppingCart size={20} />
                <span>Order Summary</span>
              </h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.product.name}</h3>
                      <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

            {/* Security Features */}
            <div className="mt-6 p-4 bg-green-50 rounded-xl">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span>Secure Checkout</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-xs text-gray-600">256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-xs text-gray-600">PCI DSS compliant</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="text-xs text-gray-600">Money-back guarantee</span>
                </div>
              </div>
            </div>
            
            {/* Delivery Info */}
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-2 mb-2">
                <Truck className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">Delivery Info</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="text-xs text-gray-600">
                  {shipping === 0 ? 'Free delivery in 5-7 days' : 'Standard delivery in 5-7 days'}
                </span>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;