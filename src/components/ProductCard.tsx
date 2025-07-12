import React from 'react';
import { Star, ShoppingCart, Package, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useStore();
  const navigate = useNavigate();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'HOT':
        return 'bg-red-500';
      case 'NEW':
        return 'bg-green-500';
      default:
        return 'bg-orange-500';
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer ${className}`}
      onClick={handleViewProduct}
    >
      <div className="relative p-4">
        {/* Product Tag */}
        {product.tag && (
          <div className={`absolute top-2 left-2 z-10 ${getTagColor(product.tag)} text-white text-xs px-2 py-1 rounded-full font-semibold`}>
            {product.tag}
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors">
            <Heart size={16} className="text-gray-600" />
          </button>
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProduct();
            }}
          >
            <Eye size={16} className="text-gray-600" />
          </button>
        </div>
        
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-xl mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          <p className="text-blue-600 text-sm font-medium">{product.category}</p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <Package size={16} className={product.inStock ? 'text-green-500' : 'text-red-500'} />
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              product.inStock
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>

          {/* SKU */}
          <p className="text-xs text-gray-400 text-center">{product.sku}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;