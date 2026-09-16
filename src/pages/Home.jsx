import React from 'react';
import Header from '../components/Header';
import HeroCarousel from '../components/HeroCarousel';
import PolicyBar from '../components/PolicyBar';
import CollectionBanner from '../components/CollectionBanner';
import CategoryCard from '../components/CategoryCard';
import ProductGrid from '../components/ProductGrid';
import PromotionalBanner from '../components/PromotionalBanner';
import ServiceFeatures from '../components/ServiceFeatures';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

import { PRODUCTS } from '../data/products';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 8);
  const newArrivals = PRODUCTS.filter(p => p.isNew || !p.isBestSeller).slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* 2. Hero Banner */}
        <HeroCarousel />

        {/* 3. Policy Bar */}
        <PolicyBar />

        {/* 4. Featured Collections */}
        <CollectionBanner />

        {/* 5. Categories */}
        <CategoryCard />

        {/* 6. Section Sản phẩm bán chạy */}
        <ProductGrid
          products={bestSellers}
          title="Sản phẩm bán chạy"
          subtitle="Hot Trending"
          actionLink={
            <Link
              to="/products?filter=bestseller"
              className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
            >
              <span>Xem tất cả sản phẩm bán chạy</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        {/* 8. Promotional Banner */}
        <PromotionalBanner />

        {/* 7. Section Sản phẩm mới */}
        <ProductGrid
          products={newArrivals}
          title="Hàng mới về"
          subtitle="New Arrivals 2026"
          actionLink={
            <Link
              to="/products?filter=new"
              className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors"
            >
              <span>Xem tất cả sản phẩm mới</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />

        {/* 9. Section Cam kết dịch vụ */}
        <ServiceFeatures />

        {/* 10. Newsletter */}
        <Newsletter />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
