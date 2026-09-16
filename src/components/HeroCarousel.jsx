import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '../data/banners';

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full h-[520px] sm:h-[560px] lg:h-[620px] bg-slate-900 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-10000 ease-out"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            />

            {/* Gradient Overlay for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

            {/* Slide Content */}
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center relative z-20 pt-16">
              <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
                
                {/* Badge Tag */}
                <div className="inline-flex items-center space-x-2 bg-amber-500/90 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none drop-shadow-md">
                  <span className="block text-white">{slide.titleTop}</span>
                  <span className="block text-amber-400 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
                    {slide.titleBottom}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg lg:text-xl font-medium text-gray-200 uppercase tracking-widest leading-relaxed max-w-lg">
                  <span className="block">{slide.subtitleTop}</span>
                  <span className="block text-amber-200/90">{slide.subtitleBottom}</span>
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <Link
                    to={slide.ctaLink}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-slate-900 font-extrabold text-sm sm:text-base uppercase tracking-wider hover:bg-amber-400 hover:text-slate-950 transition-all duration-300 shadow-xl hover:shadow-amber-400/20 hover:scale-105 active:scale-95"
                  >
                    {slide.ctaText}
                  </Link>
                </div>

                {/* Side Artist / Ambassador Overlay (Inspired by reference photo) */}
                {slide.sideModels && slide.sideModels.length > 0 && (
                  <div className="pt-4 flex flex-wrap gap-4 text-xs text-white/80">
                    {slide.sideModels.map((model, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        <span className="italic text-amber-200 font-medium">Nghệ sĩ: {model.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Banner trước"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-md border border-white/20 transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Banner tiếp theo"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 ${
              currentIndex === index
                ? 'w-8 h-2.5 bg-amber-400 rounded-full'
                : 'w-2.5 h-2.5 bg-white/50 hover:bg-white rounded-full'
            }`}
            aria-label={`Chuyển đến slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
