import React from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronRight, User, ShoppingBag, PhoneCall, ShieldCheck, Tag, Compass } from 'lucide-react';
import { CATEGORIES } from '../data/categories';

export default function MobileDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-400">
              TRENDY
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* User Quick Bar */}
        <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm">
              <User className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Xin chào quý khách</p>
              <Link 
                to="/login" 
                onClick={onClose} 
                className="text-sm font-semibold text-slate-900 hover:text-amber-600"
              >
                Đăng nhập / Đăng ký
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="p-4 flex-1 space-y-6">
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Danh mục sản phẩm
            </h3>
            <div className="space-y-1">
              {CATEGORIES.map(cat => (
                <Link
                  key={cat.id}
                  to={`/products?category=${encodeURIComponent(cat.name)}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium transition-colors text-sm"
                >
                  <span className="flex items-center space-x-3">
                    <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                    <span>{cat.name}</span>
                  </span>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                    {cat.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              Khám phá
            </h3>
            <div className="space-y-1">
              <Link
                to="/products"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                <span className="flex items-center space-x-3">
                  <Compass className="w-4 h-4 text-slate-700" />
                  <span>Tất cả sản phẩm</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/products?filter=bestseller"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                <span className="flex items-center space-x-3">
                  <Tag className="w-4 h-4 text-amber-500" />
                  <span>Sản phẩm Bán chạy</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/policy"
                onClick={onClose}
                className="flex items-center justify-between p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 font-medium text-sm"
              >
                <span className="flex items-center space-x-3">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Chính sách đổi trả & Giao hàng</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500 space-y-2">
          <div className="flex items-center space-x-2 text-slate-800 font-medium">
            <PhoneCall className="w-4 h-4 text-slate-900" />
            <span>Hotline hỗ trợ: 1800 6868 (Miễn phí)</span>
          </div>
          <p className="text-[11px] text-gray-400">© 2026 TRENDY Fashion Co.</p>
        </div>
      </div>
    </div>
  );
}
