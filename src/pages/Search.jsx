import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';
import { PRODUCTS } from '../data/products';
import { Search as SearchIcon } from 'lucide-react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="py-6 border-b border-gray-100 mb-8 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <SearchIcon className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kết quả tìm kiếm cho: <span className="text-amber-600">"{query}"</span>
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Tìm thấy <strong className="text-slate-900">{searchResults.length}</strong> sản phẩm phù hợp
              </p>
            </div>
          </div>

          <ProductGrid products={searchResults} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
