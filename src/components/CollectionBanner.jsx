import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { COLLECTIONS } from '../data/banners';

export default function CollectionBanner() {
  const mainCollection = COLLECTIONS[0];
  const sideCollections = COLLECTIONS.slice(1);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Heading */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
            Collection 2026
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Khám phá bộ sưu tập
          </h2>
        </div>
        <Link
          to="/products"
          className="mt-4 sm:mt-0 inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-800 hover:text-amber-600 transition-colors group"
        >
          <span>Xem tất cả bộ sưu tập</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      {/* Grid Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Large Banner (7 cols) */}
        <div className="lg:col-span-7 relative group overflow-hidden rounded-3xl min-h-[380px] sm:min-h-[460px] shadow-lg flex flex-col justify-end p-6 sm:p-10 text-white">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${mainCollection.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

          <div className="relative z-10 space-y-3">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Bán chạy nhất
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight">
              {mainCollection.title}
            </h3>
            <p className="text-sm text-gray-200 max-w-md line-clamp-2">
              {mainCollection.description}
            </p>
            <div className="pt-2">
              <Link
                to={mainCollection.link}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm hover:bg-amber-400 transition-all duration-300 shadow-md group/btn"
              >
                <span>Xem bộ sưu tập</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Side Banners (5 cols - 2 stacked cards) */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-6">
          {sideCollections.map((col) => (
            <div
              key={col.id}
              className="relative group overflow-hidden rounded-3xl min-h-[220px] sm:min-h-[240px] shadow-md flex flex-col justify-end p-6 text-white"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${col.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              <div className="relative z-10 space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight">
                  {col.title}
                </h3>
                <p className="text-xs text-gray-200 line-clamp-1">
                  {col.description}
                </p>
                <div className="pt-1">
                  <Link
                    to={col.link}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors group/link"
                  >
                    <span>Khám phá ngay</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
