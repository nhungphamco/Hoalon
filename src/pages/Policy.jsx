import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { RotateCcw, Truck, ShieldCheck, CreditCard, Store, HelpCircle } from 'lucide-react';

export default function Policy() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'return';
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (searchParams.get('tab')) {
      setActiveTab(searchParams.get('tab'));
    }
  }, [searchParams]);

  const tabs = [
    { id: 'return', label: 'Chính sách Đổi Trả 30 Ngày', icon: RotateCcw },
    { id: 'shipping', label: 'Chính sách Vận Chuyển', icon: Truck },
    { id: 'payment', label: 'Chính sách Thanh Toán', icon: CreditCard },
    { id: 'privacy', label: 'Chính sách Bảo Mật', icon: ShieldCheck },
    { id: 'stores', label: 'Hệ Thống Cửa Hàng', icon: Store },
    { id: 'faq', label: 'Câu Hỏi Thường Gặp (FAQ)', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="py-6 border-b border-gray-100 mb-8">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
              Chính sách & Hướng dẫn
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Thông tin minh bạch về quyền lợi khách hàng tại TRENDY
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Nav Tabs */}
            <aside className="lg:col-span-4 space-y-2">
              {tabs.map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all text-left ${
                      isActive
                        ? 'bg-slate-900 text-amber-400 shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <IconComp className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </aside>

            {/* Right Tab Content */}
            <div className="lg:col-span-8 p-6 sm:p-10 rounded-3xl bg-gray-50 border border-gray-100 shadow-xs space-y-4 text-sm text-gray-700">
              
              {activeTab === 'return' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <RotateCcw className="w-5 h-5 text-amber-500" />
                    <span>Chính sách đổi trả trong 30 ngày</span>
                  </h2>
                  <p className="leading-relaxed">
                    Tại TRENDY, chúng tôi mong muốn mang đến sự hài lòng tuyệt đối cho quý khách. Nếu sản phẩm không vừa size hoặc không đạt như kỳ vọng, bạn hoàn toàn có thể đổi trả miễn phí trong 30 ngày.
                  </p>
                  <div className="space-y-2 font-medium">
                    <h3 className="font-bold text-slate-900">Điều kiện đổi trả:</h3>
                    <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
                      <li>Sản phẩm còn nguyên tem mác, nhãn mác niêm phong.</li>
                      <li>Sản phẩm chưa qua sử dụng, chưa qua giặt tẩy, không có mùi lạ.</li>
                      <li>Thời gian đổi trả trong vòng 30 ngày kể từ ngày nhận hàng thành công.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-amber-500" />
                    <span>Chính sách vận chuyển & Giao nhận</span>
                  </h2>
                  <p className="leading-relaxed">
                    TRENDY hợp tác với các đơn vị vận chuyển uy tín hàng đầu Việt Nam để giao hàng tận tay khách hàng trong thời gian nhanh nhất.
                  </p>
                  <div className="space-y-2 font-medium text-xs">
                    <p>• <strong>Miễn phí vận chuyển (Freeship):</strong> Áp dụng tự động cho tất cả đơn hàng có giá trị từ 499.000đ trở lên.</p>
                    <p>• <strong>Phí vận chuyển tiêu chuẩn:</strong> 20.000đ cho đơn hàng dưới 499.000đ toàn quốc.</p>
                    <p>• <strong>Thời gian giao hàng:</strong> Nội thành TP.HCM & Hà Nội: 1 - 2 ngày. Các tỉnh thành khác: 2 - 4 ngày làm việc.</p>
                  </div>
                </div>
              )}

              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-amber-500" />
                    <span>Chính sách thanh toán</span>
                  </h2>
                  <p className="leading-relaxed text-xs">
                    Hỗ trợ đa dạng phương thức thanh toán linh hoạt và bảo mật:
                  </p>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    <li>Thanh toán khi nhận hàng (COD - Cash on Delivery).</li>
                    <li>Chuyển khoản ngân hàng qua mã QR động (VNPay / VietQR).</li>
                    <li>Thanh toán qua ví điện tử Momo, ZaloPay, ShopeePay.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    <span>Chính sách bảo mật thông tin</span>
                  </h2>
                  <p className="leading-relaxed text-xs">
                    TRENDY tôn trọng và cam kết bảo vệ thông tin cá nhân của người tiêu dùng. Mọi thông tin tài khoản, địa chỉ, số điện thoại đều được mã hóa theo tiêu chuẩn SSL cao nhất.
                  </p>
                </div>
              )}

              {activeTab === 'stores' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <Store className="w-5 h-5 text-amber-500" />
                    <span>Hệ thống cửa hàng TRENDY</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <h3 className="font-extrabold text-slate-900 text-sm mb-1">Store 1 - Q.1, TP.HCM</h3>
                      <p className="text-gray-600">123 Nguyễn Trãi, Phường Bến Thành, Quận 1</p>
                      <p className="text-amber-600 font-bold mt-2">Hotline: 0901 234 567</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-200">
                      <h3 className="font-extrabold text-slate-900 text-sm mb-1">Store 2 - Cầu Giấy, Hà Nội</h3>
                      <p className="text-gray-600">88 Cầu Giấy, Phường Quan Hoa, Quận Cầu Giấy</p>
                      <p className="text-amber-600 font-bold mt-2">Hotline: 0908 765 432</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  <h2 className="text-xl font-extrabold text-slate-900 flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-amber-500" />
                    <span>Câu hỏi thường gặp</span>
                  </h2>
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-1">Làm sao để biết size áo vừa với mình?</h4>
                      <p className="text-gray-600">Quý khách có thể xem bảng quy đổi kích cỡ trong trang chi tiết của từng sản phẩm hoặc nhắn tin trực tiếp cho shop để được tư vấn.</p>
                    </div>
                    <div className="p-3.5 bg-white rounded-xl border border-gray-200">
                      <h4 className="font-bold text-slate-900 mb-1">Thời gian đổi hàng mất bao lâu?</h4>
                      <p className="text-gray-600">Quy trình đổi hàng hoàn tất trong vòng 2-4 ngày làm việc kể từ khi nhân viên tới thu hồi hàng cũ.</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
