import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function PolicyBar() {
  return (
    <div className="w-full bg-[#FFF7E8] border-y border-amber-200/60 py-3.5 px-4 text-center">
      <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2 text-xs sm:text-sm font-medium text-slate-800 flex-wrap gap-y-1">
        <RotateCcw className="w-4 h-4 text-amber-600 animate-spin-slow shrink-0" />
        <span>
          Không hài lòng, <strong className="font-semibold text-slate-900">đổi trả trong 30 ngày</strong>
        </span>
        <span className="text-gray-300 hidden sm:inline">•</span>
        <Link
          to="/policy"
          className="inline-flex items-center text-amber-700 hover:text-amber-900 font-bold hover:underline transition-colors ml-1"
        >
          <span>Xem chính sách</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>
      </div>
    </div>
  );
}
