import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PROMO_BANNER } from '../data/banners';

export default function PromotionalBanner() {
  return (
    <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl overflow-hidden min-h-[360px] sm:min-h-[420px] bg-slate-950 flex items-center justify-center p-8 sm:p-14 text-center text-white shadow-2xl">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105"
          style={{ backgroundImage: `url(${PROMO_BANNER.bgImage})` }}
        />

        {/* Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90" />

        <div className="relative z-10 max-w-2xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{PROMO_BANNER.discountText}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-none text-white">
            {PROMO_BANNER.title}
          </h2>

          <p className="text-sm sm:text-lg text-gray-300 font-medium max-w-lg mx-auto leading-relaxed">
            {PROMO_BANNER.subtitle}
          </p>

          <div className="pt-2">
            <Link
              to={PROMO_BANNER.ctaLink}
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white text-slate-900 font-extrabold text-sm uppercase tracking-wider hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>{PROMO_BANNER.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
