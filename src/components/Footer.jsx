import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Share2, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Shop Info */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-black tracking-widest text-white uppercase">
                TRENDY<span className="text-amber-400">.</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Thương hiệu thời trang ứng dụng cao cấp dành cho người Việt. Thiết kế hiện đại, chất liệu bền bỉ, đồng hành cùng bạn trong mọi khoảnh khắc cuộc sống.
            </p>
            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>123 Đường Nguyễn Trãi, Q.1, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Hotline: 1800 6868 (8:00 - 22:00)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Email: cskh@trendy.vn</span>
              </div>
            </div>
          </div>

          {/* Column 2: Về chúng tôi */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">
              Về chúng tôi
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/policy?tab=about" className="hover:text-amber-400 transition-colors">
                  Giới thiệu thương hiệu
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=stores" className="hover:text-amber-400 transition-colors">
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=contact" className="hover:text-amber-400 transition-colors">
                  Tuyển dụng & Việc làm
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=contact" className="hover:text-amber-400 transition-colors">
                  Liên hệ hợp tác
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Chính sách */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">
              Chính sách
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/policy?tab=return" className="hover:text-amber-400 transition-colors">
                  Chính sách đổi trả 30 ngày
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=shipping" className="hover:text-amber-400 transition-colors">
                  Chính sách vận chuyển & Giao nhận
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=payment" className="hover:text-amber-400 transition-colors">
                  Chính sách thanh toán
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=privacy" className="hover:text-amber-400 transition-colors">
                  Chính sách bảo mật thông tin
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hỗ trợ */}
          <div>
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 inline-block">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/policy?tab=faq" className="hover:text-amber-400 transition-colors">
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=order-tracking" className="hover:text-amber-400 transition-colors">
                  Theo dõi đơn hàng
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=size-guide" className="hover:text-amber-400 transition-colors">
                  Hướng dẫn chọn size chuẩn
                </Link>
              </li>
              <li>
                <Link to="/policy?tab=membership" className="hover:text-amber-400 transition-colors">
                  Chương trình Khách hàng thân thiết
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 TRENDY Fashion Co. Tất cả quyền được bảo lưu. Thiết kế demo frontend.</p>
          
          {/* Social Icons (SVGs) */}
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-900 text-gray-400 hover:text-amber-400 hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-900 text-gray-400 hover:text-amber-400 hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* Youtube */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-900 text-gray-400 hover:text-amber-400 hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Youtube"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-slate-900 text-gray-400 hover:text-amber-400 hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="TikTok"
            >
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
