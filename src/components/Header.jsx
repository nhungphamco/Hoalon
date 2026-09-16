import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, ShoppingBag, User, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import MobileDrawer from './MobileDrawer';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  
  const { cartCount, wishlist } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  // Dynamic header styles: transparent floating mode on Home page when at top, or solid white when scrolled/other pages
  const isTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isTransparent
            ? 'bg-gradient-to-b from-black/50 via-black/25 to-transparent text-white py-4'
            : 'bg-white/95 backdrop-blur-md shadow-xs text-slate-900 py-3 border-b border-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            
            {/* Left Section: Hamburger & "Danh mục" */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all duration-200 shadow-2xs text-sm font-medium ${
                  isTransparent
                    ? 'bg-white/15 border-white/30 text-white hover:bg-white/25 backdrop-blur-md'
                    : 'bg-gray-100 border-gray-200/80 text-slate-800 hover:bg-gray-200'
                }`}
                aria-label="Mở danh mục"
              >
                <Menu className="w-4 h-4" />
                <span className="hidden sm:inline-block">Danh mục</span>
              </button>

              <Link
                to="/products"
                className={`hidden md:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  isTransparent
                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-gray-100'
                }`}
              >
                Tất cả sản phẩm
              </Link>
            </div>

            {/* Middle Section: Logo */}
            <div className="flex-1 text-center sm:flex-none">
              <Link to="/" className="inline-block group">
                <span className="text-2xl sm:text-3xl font-black tracking-widest uppercase transition-transform group-hover:scale-105 inline-block">
                  <span className={isTransparent ? 'text-white' : 'text-slate-900'}>
                    TRENDY
                  </span>
                  <span className="text-amber-500 font-extrabold text-3xl">.</span>
                </span>
              </Link>
            </div>

            {/* Right Section: Search Pill, Cart, User */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              
              {/* Search Form Pill (Desktop) */}
              <form
                onSubmit={handleSearchSubmit}
                className="hidden lg:flex items-center relative min-w-[240px] xl:min-w-[280px]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className={`w-full py-1.5 pl-10 pr-4 text-xs rounded-full border outline-none transition-all duration-200 ${
                    isTransparent
                      ? 'bg-white/15 border-white/30 text-white placeholder-white/70 focus:bg-white/25 focus:border-white'
                      : 'bg-gray-100 border-gray-200 text-slate-900 placeholder-gray-400 focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200'
                  }`}
                />
                <button
                  type="submit"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                >
                  <Search className={`w-3.5 h-3.5 ${isTransparent ? 'text-white/80' : 'text-gray-400'}`} />
                </button>
              </form>

              {/* Mobile Search Toggle Icon */}
              <button
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className={`lg:hidden p-2 rounded-full transition-colors ${
                  isTransparent ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-100 text-slate-800'
                }`}
                aria-label="Tìm kiếm"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/products?filter=wishlist"
                className={`hidden sm:flex p-2 rounded-full relative transition-colors ${
                  isTransparent ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-100 text-slate-800'
                }`}
                title="Sản phẩm yêu thích"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Icon + Badge */}
              <Link
                to="/cart"
                className={`p-2 rounded-full relative flex items-center justify-center transition-colors ${
                  isTransparent ? 'hover:bg-white/15 text-white' : 'hover:bg-gray-100 text-slate-800'
                }`}
                aria-label="Giỏ hàng"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User Login */}
              <Link
                to="/login"
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isTransparent
                    ? 'border-white/30 bg-white/15 hover:bg-white/25 text-white'
                    : 'border-slate-200 bg-gray-50 hover:bg-gray-100 text-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng nhập</span>
              </Link>
            </div>
          </div>

          {/* Mobile Collapsible Search Input */}
          {isSearchExpanded && (
            <div className="mt-3 pt-2 border-t border-white/20 lg:hidden">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  autoFocus
                  className="w-full py-2 pl-10 pr-10 text-xs rounded-full bg-white text-slate-900 border border-gray-300 focus:outline-none shadow-md"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5" />
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(false)}
                  className="absolute right-3 text-gray-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
