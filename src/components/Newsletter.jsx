import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
          <Mail className="w-7 h-7" />
        </div>

        <div className="space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight">
            Nhận ưu đãi mới nhất
          </h2>
          <p className="text-xs sm:text-sm text-gray-300">
            Đăng ký để nhận thông tin về bộ sưu tập mới nhất cùng <strong className="text-amber-400">voucher giảm 10%</strong> cho đơn hàng đầu tiên của bạn.
          </p>
        </div>

        {subscribed ? (
          <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl max-w-md mx-auto flex items-center justify-center space-x-2 text-emerald-300 text-sm font-semibold animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Cảm ơn bạn đã đăng ký nhận tin từ TRENDY!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center max-w-md mx-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập địa chỉ email của bạn..."
              className="w-full py-3 px-5 text-sm rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-400 text-slate-950 font-extrabold text-sm uppercase tracking-wider hover:bg-amber-300 transition-all shadow-lg hover:scale-105 shrink-0"
            >
              Đăng ký
            </button>
          </form>
        )}

        <p className="text-[11px] text-gray-500">
          Chúng tôi cam kết bảo mật thông tin và không gửi spam email.
        </p>
      </div>
    </section>
  );
}
