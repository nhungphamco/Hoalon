import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      setSuccessMsg('Đăng nhập thành công! Đang chuyển hướng...');
    } else {
      setSuccessMsg('Đăng ký tài khoản thành công!');
    }
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Header />

      <main className="flex-1 pt-24 pb-16 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
          
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-black tracking-widest text-slate-900 uppercase">
                TRENDY<span className="text-amber-500">.</span>
              </span>
            </Link>
            <h1 className="text-xl font-extrabold text-slate-900">
              {activeTab === 'login' ? 'Chào mừng bạn trở lại' : 'Tạo tài khoản TRENDY'}
            </h1>
            <p className="text-xs text-gray-400">
              Trải nghiệm mua sắm thời trang cao cấp & cá nhân hóa
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => { setActiveTab('login'); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-900 shadow-2xs' : 'text-gray-500 hover:text-slate-900'
              }`}
            >
              Đăng nhập
            </button>
            <button
              onClick={() => { setActiveTab('register'); setSuccessMsg(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                activeTab === 'register' ? 'bg-white text-slate-900 shadow-2xs' : 'text-gray-500 hover:text-slate-900'
              }`}
            >
              Đăng ký
            </button>
          </div>

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-xl flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {activeTab === 'register' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-800">Họ và tên</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className="w-full py-2.5 pl-10 pr-4 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Địa chỉ Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full py-2.5 pl-10 pr-4 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800">Mật khẩu</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2.5 pl-10 pr-4 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white"
                />
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Remember & Forgot Password */}
            {activeTab === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="text-amber-500 rounded focus:ring-amber-400"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="#" className="text-amber-600 font-bold hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 transition-all hover:scale-101"
            >
              <span>{activeTab === 'login' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="pt-4 border-t border-gray-100 text-center space-y-3">
            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold">Hoặc đăng nhập với</p>
            <div className="flex gap-3">
              <button className="flex-1 py-2 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 hover:bg-gray-50 flex items-center justify-center space-x-2">
                <span>Google</span>
              </button>
              <button className="flex-1 py-2 px-3 border border-gray-200 rounded-xl text-xs font-semibold text-slate-800 hover:bg-gray-50 flex items-center justify-center space-x-2">
                <span>Facebook</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
