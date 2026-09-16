import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function formatPrice(amount) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCart();
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const favorited = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedColor = product.colorNames ? product.colorNames[selectedColorIndex] : null;
    const selectedSize = product.sizes ? product.sizes[0] : null;
    addToCart(product, selectedColor, selectedSize, 1);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl border border-gray-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full overflow-hidden transform hover:-translate-y-1.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-4/5 overflow-hidden bg-gray-50">
        <Link to={`/products/${product.id}`} className="block w-full h-full">
          <img
            src={isHovered && product.gallery && product.gallery[1] ? product.gallery[1] : product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Badge (Top Left) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-2xs ${
                product.badge.includes('%') || product.badge.toLowerCase().includes('sale')
                  ? 'bg-rose-500 text-white'
                  : product.badge === 'Bán chạy'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-900 text-white'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Heart Wishlist Icon (Top Right) */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            favorited
              ? 'bg-rose-50 text-rose-500 shadow-md scale-110'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-rose-500 shadow-xs'
          }`}
          aria-label="Thêm vào yêu thích"
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Quick View Link overlay on hover */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900/90 hover:bg-slate-900 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 backdrop-blur-xs shadow-lg hover:bg-amber-500 hover:text-slate-950 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Thêm vào giỏ</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
            <span className="font-semibold text-gray-500">{product.category}</span>
            {product.rating && (
              <div className="flex items-center space-x-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/products/${product.id}`}
            className="block text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>
        </div>

        <div>
          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1.5 my-2">
              {product.colors.map((colorHex, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColorIndex(idx);
                  }}
                  className={`w-4 h-4 rounded-full border border-gray-300 transition-all ${
                    selectedColorIndex === idx ? 'ring-2 ring-slate-900 ring-offset-1 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: colorHex }}
                  title={product.colorNames ? product.colorNames[idx] : ''}
                />
              ))}
            </div>
          )}

          {/* Price Block */}
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-base sm:text-lg font-black text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
