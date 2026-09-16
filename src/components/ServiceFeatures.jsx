import React from 'react';
import { RotateCcw, Truck, ShieldCheck, Headphones } from 'lucide-react';

const FEATURES = [
  {
    icon: RotateCcw,
    title: "Đổi trả trong 30 ngày",
    desc: "Miễn phí đổi trả tại nhà nếu không vừa size hoặc không hài lòng."
  },
  {
    icon: Truck,
    title: "Giao hàng toàn quốc",
    desc: "Đồng giá ship 20k toàn quốc, miễn phí ship cho đơn từ 499k."
  },
  {
    icon: ShieldCheck,
    title: "Thanh toán an toàn",
    desc: "Đa dạng hình thức thanh toán COD, chuyển khoản, ví điện tử."
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ chăm sóc khách hàng tư vấn nhiệt tình mọi lúc."
  }
];

export default function ServiceFeatures() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-2xl bg-white shadow-2xs hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
