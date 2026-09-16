import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../components/ProductCard';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Shipping fee calculation: Free for orders >= 499.000đ, else 20.000đ
  const shippingFee = cartItems.length === 0 ? 0 : cartTotal >= 499000 ? 0 : 20000;
  const finalTotal = Math.max(0, cartTotal + shippingFee - appliedDiscount);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TRENDY10') {
      setAppliedDiscount(Math.round(cartTotal * 0.1));
    } else if (promoCode.trim()) {
      alert('Mã giảm giá không hợp lệ. Thử dùng mã "TRENDY10"');
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Title */}
          <div className="py-6 border-b border-gray-100 mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
                Giỏ hàng của bạn
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Có <span className="font-bold text-slate-900">{cartItems.length}</span> loại sản phẩm trong giỏ
              </p>
            </div>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold hover:underline"
              >
                Xóa tất cả
              </button>
            )}
          </div>

          {orderSuccess ? (
            <div className="max-w-md mx-auto my-12 text-center p-8 bg-amber-50/50 rounded-3xl border border-amber-200 shadow-xl space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-black text-slate-900">Đặt hàng thành công!</h2>
              <p className="text-xs text-gray-600 leading-relaxed">
                Cảm ơn bạn đã tin tưởng trải nghiệm tại <strong className="text-slate-900">TRENDY</strong>. Mã đơn hàng demo của bạn là <span className="font-mono font-bold text-amber-600">#TRD202688</span>.
              </p>
              <div className="pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-wider hover:bg-amber-400 hover:text-slate-950 transition-colors shadow-md"
                >
                  <span>Tiếp tục mua sắm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-20 text-center space-y-4 bg-gray-50/50 rounded-3xl border border-gray-100 my-6">
              <div className="w-16 h-16 bg-gray-200 text-gray-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Giỏ hàng đang trống</h2>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                Bạn chưa thêm sản phẩm nào vào giỏ hàng. Hãy khám phá ngay hàng ngàn sản phẩm thời trang cao cấp tại TRENDY!
              </p>
              <div>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md hover:bg-amber-300 transition-colors"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Product Items List (8 cols) */}
              <div className="lg:col-span-8 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-gray-100 shadow-2xs hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item Thumbnail & Info */}
                    <div className="flex items-center space-x-4">
                      <Link to={`/products/${item.product.id}`} className="shrink-0 w-20 h-24 rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                        <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {item.product.category}
                        </span>
                        <Link
                          to={`/products/${item.product.id}`}
                          className="block text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <div className="flex items-center space-x-3 text-xs text-gray-500 font-medium">
                          <span>Màu: <strong className="text-slate-800">{item.color}</strong></span>
                          <span>•</span>
                          <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                        </div>
                        <p className="text-sm font-black text-slate-900 sm:hidden">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls & Total */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      
                      {/* Price Desktop */}
                      <div className="hidden sm:block text-right">
                        <span className="text-sm font-black text-slate-900 block">
                          {formatPrice(item.product.price)}
                        </span>
                        {item.product.oldPrice && (
                          <span className="text-[11px] text-gray-400 line-through block">
                            {formatPrice(item.product.oldPrice)}
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-gray-200 text-gray-700"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-gray-200 text-gray-700"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Item Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Box (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-200/80 shadow-md space-y-4">
                  <h3 className="text-base font-extrabold text-slate-900 uppercase tracking-wider pb-3 border-b border-gray-200">
                    Tóm tắt đơn hàng
                  </h3>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Mã giảm giá (ví dụ: TRENDY10)"
                      className="flex-1 py-2 px-3 text-xs rounded-xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                    >
                      Áp dụng
                    </button>
                  </form>

                  {/* Pricing Rows */}
                  <div className="space-y-2 text-xs text-gray-600 border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span>Tạm tính ({cartItems.length} món):</span>
                      <span className="font-bold text-slate-900">{formatPrice(cartTotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="flex items-center space-x-1">
                        <span>Phí vận chuyển:</span>
                        {shippingFee === 0 && <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-1.5 py-0.2 rounded">Freeship</span>}
                      </span>
                      <span className="font-bold text-slate-900">
                        {shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}
                      </span>
                    </div>

                    {appliedDiscount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Giảm giá (TRENDY10):</span>
                        <span>-{formatPrice(appliedDiscount)}</span>
                      </div>
                    )}
                  </div>

                  {/* Total Amount */}
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                    <span className="text-sm font-extrabold text-slate-900 uppercase">Tổng thanh toán:</span>
                    <span className="text-xl font-black text-rose-600">{formatPrice(finalTotal)}</span>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckoutSubmit}
                    disabled={isCheckingOut}
                    className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:scale-102 transition-all disabled:opacity-50"
                  >
                    {isCheckingOut ? (
                      <span>Đang xử lý đơn hàng...</span>
                    ) : (
                      <>
                        <span>Tiến hành thanh toán</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Trust Info */}
                  <div className="pt-2 text-[11px] text-gray-400 space-y-1 text-center">
                    <p className="flex items-center justify-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Bảo mật thông tin thanh toán 100%</span>
                    </p>
                    <p className="flex items-center justify-center space-x-1">
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                      <span>Giao hàng tận nơi toàn quốc trong 2-4 ngày</span>
                    </p>
                  </div>

                </div>
              </div>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
