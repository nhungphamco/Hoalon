import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { Star, Heart, ShoppingBag, Truck, RotateCcw, ShieldCheck, Ruler, Minus, Plus, ChevronRight, X } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isWishlisted } = useCart();

  const product = PRODUCTS.find((p) => p.id === parseInt(id, 10)) || PRODUCTS[0];

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 'Freesize');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const favorited = isWishlisted(product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleColorSelect = (idx) => {
    setSelectedColorIndex(idx);
  };

  const handleAddToCart = () => {
    const colorName = product.colorNames ? product.colorNames[selectedColorIndex] : 'Standard';
    addToCart(product, colorName, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs text-gray-500 mb-8 py-2">
            <Link to="/" className="hover:text-slate-900">Trang chủ</Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-slate-900">
              {product.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
          </nav>

          {/* Product Detail Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
            
            {/* Left Gallery (7 cols) */}
            <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
              
              {/* Thumbnails */}
              {product.gallery && product.gallery.length > 0 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto shrink-0 no-scrollbar">
                  {product.gallery.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(imgUrl)}
                      className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === imgUrl ? 'border-amber-500 scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={imgUrl} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image */}
              <div className="relative flex-1 aspect-4/5 rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 shadow-md">
                <img
                  src={activeImage || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-slate-900 text-amber-400 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {product.badge}
                  </span>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md shadow-md transition-all ${
                    favorited ? 'bg-rose-50 text-rose-500 scale-110' : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

            </div>

            {/* Right Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Category & Title */}
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                  {product.category}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating & Reviews */}
                <div className="flex items-center space-x-3 mt-2 text-xs">
                  <div className="flex items-center text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900">{product.rating || 4.9}</span>
                  <span className="text-gray-400">({product.reviewsCount || 120} đánh giá)</span>
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100/80 flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-slate-900">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                    Tiết kiệm {formatPrice(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Color Swatches Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 uppercase">Màu sắc:</span>
                    <span className="text-gray-500 font-medium">
                      {product.colorNames ? product.colorNames[selectedColorIndex] : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    {product.colors.map((colorHex, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleColorSelect(idx)}
                        className={`w-8 h-8 rounded-full border border-gray-300 transition-all ${
                          selectedColorIndex === idx ? 'ring-2 ring-slate-900 ring-offset-2 scale-110' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: colorHex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 uppercase">Kích cỡ:</span>
                    <button
                      onClick={() => setIsSizeGuideOpen(true)}
                      className="text-amber-600 hover:text-amber-800 font-bold flex items-center space-x-1"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Hướng dẫn chọn size</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all ${
                          selectedSize === sz
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter & CTA Buttons */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-4">
                  <span className="text-xs font-bold text-slate-900 uppercase">Số lượng:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 hover:bg-gray-200 text-gray-700"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 text-xs font-bold text-slate-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 hover:bg-gray-200 text-gray-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={handleAddToCart}
                    className="py-3.5 px-6 rounded-2xl bg-white border-2 border-slate-900 text-slate-900 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors shadow-2xs"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm vào giỏ</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:scale-102 active:scale-98 transition-all"
                  >
                    <span>Mua ngay</span>
                  </button>
                </div>
              </div>

              {/* Perks Badge List */}
              <div className="pt-4 border-t border-gray-100 space-y-2 text-xs text-gray-600">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <span>Đổi trả dễ dàng trong 30 ngày tại nhà</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <span>Miễn phí giao hàng cho đơn từ 499.000đ</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Cam kết 100% chính hãng TRENDY</span>
                </div>
              </div>

            </div>

          </div>

          {/* Detailed Tabs (Description, Specifications, Policy) */}
          <div className="mt-12 border border-gray-100 rounded-3xl p-6 sm:p-8 bg-gray-50/50 shadow-xs mb-16">
            <div className="flex border-b border-gray-200 gap-6 mb-6">
              {[
                { id: 'description', label: 'Mô tả sản phẩm' },
                { id: 'details', label: 'Thông số kỹ thuật' },
                { id: 'policy', label: 'Chính sách bảo hành & Đổi trả' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 text-xs sm:text-sm font-extrabold tracking-wider transition-colors relative ${
                    activeTab === tab.id
                      ? 'text-slate-900 border-b-2 border-amber-500'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              {activeTab === 'description' && (
                <div>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    {product.description}
                  </p>
                </div>
              )}

              {activeTab === 'details' && (
                <ul className="space-y-2 list-disc list-inside text-gray-600">
                  {product.details ? (
                    product.details.map((detail, i) => <li key={i}>{detail}</li>)
                  ) : (
                    <li>Chất liệu cao cấp thoáng khí, độ bền cao.</li>
                  )}
                </ul>
              )}

              {activeTab === 'policy' && (
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <p>• Hỗ trợ đổi trả size/mẫu trong vòng 30 ngày kể từ ngày nhận hàng.</p>
                  <p>• Sản phẩm còn nguyên tem mác, chưa qua sử dụng hoặc giặt tẩy.</p>
                  <p>• Nhân viên shiper sẽ đến tận nhà lấy hàng đổi trả hoàn toàn miễn phí.</p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <ProductGrid
              products={relatedProducts}
              title="Sản phẩm liên quan"
              subtitle="Gợi ý dành cho bạn"
            />
          )}

        </div>
      </main>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsSizeGuideOpen(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-w-lg w-full z-10 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-lg font-extrabold text-slate-900">Bảng quy đổi kích cỡ (Size Guide)</h3>
              <button onClick={() => setIsSizeGuideOpen(false)} className="p-1 text-gray-400 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-slate-900 font-bold border-b border-gray-200">
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Chiều cao (cm)</th>
                    <th className="p-2.5">Cân nặng (kg)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 font-medium">
                  <tr><td className="p-2.5 font-bold text-slate-900">S</td><td className="p-2.5">150 - 160</td><td className="p-2.5">45 - 53</td></tr>
                  <tr><td className="p-2.5 font-bold text-slate-900">M</td><td className="p-2.5">160 - 168</td><td className="p-2.5">54 - 62</td></tr>
                  <tr><td className="p-2.5 font-bold text-slate-900">L</td><td className="p-2.5">168 - 175</td><td className="p-2.5">63 - 70</td></tr>
                  <tr><td className="p-2.5 font-bold text-slate-900">XL</td><td className="p-2.5">175 - 182</td><td className="p-2.5">71 - 80</td></tr>
                  <tr><td className="p-2.5 font-bold text-slate-900">2XL</td><td className="p-2.5">182 - 190</td><td className="p-2.5">81 - 90</td></tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-gray-400 italic">
              * Nếu chỉ số nằm giữa 2 size, quý khách nên chọn size lớn hơn để mặc thoải mái.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
