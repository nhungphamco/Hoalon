import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';
  const filterParam = searchParams.get('filter') || '';

  const { wishlist } = useCart();

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSize, setSelectedSize] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Special Filter Parameter
      if (filterParam === 'bestseller' && !product.isBestSeller) return false;
      if (filterParam === 'new' && !product.isNew) return false;
      if (filterParam === 'wishlist' && !wishlist.includes(product.id)) return false;

      // Price Range Filter
      if (selectedPriceRange === 'under300') {
        if (product.price >= 300000) return false;
      } else if (selectedPriceRange === '300to500') {
        if (product.price < 300000 || product.price > 500000) return false;
      } else if (selectedPriceRange === '500to800') {
        if (product.price < 500000 || product.price > 800000) return false;
      } else if (selectedPriceRange === 'over800') {
        if (product.price <= 800000) return false;
      }

      // Size Filter
      if (selectedSize !== 'All' && product.sizes) {
        if (!product.sizes.includes(selectedSize)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return b.id - a.id; // newest default
    });
  }, [selectedCategory, filterParam, selectedPriceRange, selectedSize, sortBy, wishlist]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange('All');
    setSelectedSize('All');
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Banner & Breadcrumb */}
          <div className="py-6 border-b border-gray-100 mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
              {filterParam === 'wishlist'
                ? 'Sản phẩm yêu thích'
                : selectedCategory === 'All'
                ? 'Tất cả sản phẩm'
                : `Danh mục: ${selectedCategory}`}
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Hiển thị <span className="font-bold text-slate-900">{filteredProducts.length}</span> sản phẩm phù hợp
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 shrink-0 space-y-6">
              
              {/* Header Filter Title */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                <div className="flex items-center space-x-2 text-slate-900 font-extrabold text-sm uppercase">
                  <Filter className="w-4 h-4 text-amber-500" />
                  <span>Bộ lọc tìm kiếm</span>
                </div>
                {(selectedCategory !== 'All' || selectedPriceRange !== 'All' || selectedSize !== 'All') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-amber-600 hover:text-amber-800 font-semibold flex items-center space-x-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Đặt lại</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Danh mục
                </h3>
                <div className="space-y-1">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchParams({});
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-slate-900 text-white font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    Tất cả danh mục
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        setSearchParams({ category: cat.name });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                        selectedCategory === cat.name
                          ? 'bg-slate-900 text-white font-bold'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] opacity-70">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Khoảng giá
                </h3>
                <div className="space-y-1.5 text-xs text-gray-700">
                  {[
                    { id: 'All', label: 'Tất cả mức giá' },
                    { id: 'under300', label: 'Dưới 300.000đ' },
                    { id: '300to500', label: '300.000đ - 500.000đ' },
                    { id: '500to800', label: '500.000đ - 800.000đ' },
                    { id: 'over800', label: 'Trên 800.000đ' }
                  ].map((range) => (
                    <label key={range.id} className="flex items-center space-x-2 cursor-pointer p-1 hover:text-slate-900">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range.id}
                        onChange={() => setSelectedPriceRange(range.id)}
                        className="text-amber-500 focus:ring-amber-400"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Kích cỡ (Size)
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {['All', 'S', 'M', 'L', 'XL', '2XL', 'Freesize'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        selectedSize === sz
                          ? 'bg-amber-400 text-slate-950 shadow-2xs'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {sz === 'All' ? 'Tất cả' : sz}
                    </button>
                  ))}
                </div>
              </div>

            </aside>

            {/* Main Product Area */}
            <div className="flex-1">
              
              {/* Controls Bar: Mobile Filter Toggle & Sort */}
              <div className="flex items-center justify-between bg-gray-50 p-3.5 rounded-2xl mb-6 border border-gray-100">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center space-x-2 px-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-slate-800 shadow-2xs"
                >
                  <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                  <span>Bộ lọc ({filteredProducts.length})</span>
                </button>

                <div className="flex items-center space-x-2 ml-auto">
                  <span className="text-xs text-gray-500 hidden sm:inline">Sắp xếp theo:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-white border border-gray-200 text-slate-900 text-xs font-semibold rounded-xl px-3 py-1.5 outline-none focus:ring-2 focus:ring-amber-400 cursor-pointer"
                  >
                    <option value="newest">Mới nhất</option>
                    <option value="price-asc">Giá: Thấp đến Cao</option>
                    <option value="price-desc">Giá: Cao đến Thấp</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid products={filteredProducts} />

            </div>

          </div>

        </div>
      </main>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60" onClick={() => setIsMobileFilterOpen(false)} />
          <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto ml-auto z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
                <h3 className="font-extrabold text-slate-900 text-base">Bộ lọc sản phẩm</h3>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 text-gray-400 hover:text-slate-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase text-gray-400 mb-2">Danh mục</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => { setSelectedCategory('All'); setIsMobileFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${selectedCategory === 'All' ? 'bg-slate-900 text-white' : 'text-gray-700 bg-gray-50'}`}
                  >
                    Tất cả danh mục
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.name); setIsMobileFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold ${selectedCategory === cat.name ? 'bg-slate-900 text-white' : 'text-gray-700 bg-gray-50'}`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsMobileFilterOpen(false)}
              className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl text-sm"
            >
              Áp dụng bộ lọc
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
