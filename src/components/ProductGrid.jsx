import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, title, subtitle, actionLink }) {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-100">
        <p className="text-gray-500 font-medium">Không tìm thấy sản phẩm phù hợp.</p>
      </div>
    );
  }

  return (
    <section className="py-10 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      {(title || subtitle || actionLink) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            {subtitle && (
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 block mb-1">
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {title}
              </h2>
            )}
          </div>
          {actionLink}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
