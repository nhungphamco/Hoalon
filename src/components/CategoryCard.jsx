import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { ChevronRight } from 'lucide-react';

export default function CategoryCard() {
  return (
    <section className="py-10 sm:py-16 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
              Phân loại
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Danh mục nổi bật
            </h2>
          </div>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-bold text-slate-800 hover:text-amber-600 flex items-center space-x-1"
          >
            <span>Xem tất cả</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Grid (Desktop) / Horizontal Scroll (Mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${encodeURIComponent(cat.name)}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Container with Zoom effect */}
              <div className="relative w-full aspect-4/5 overflow-hidden bg-gray-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Subtag badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs">
                    {cat.tag}
                  </span>
                </div>

                {/* Text Bottom */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="text-base sm:text-lg font-bold group-hover:text-amber-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-300 font-medium">
                    {cat.count}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
