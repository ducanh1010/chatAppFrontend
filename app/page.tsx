'use client';

import React from 'react';
import { MessageCircle, Users, Zap, Shield, Globe, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
      title: "Nhắn tin nhanh chóng",
      description: "Gửi và nhận tin nhắn ngay lập tức với giao diện thân thiện"
    },
    {
      icon: <Users className="w-12 h-12 text-purple-500" />,
      title: "Kết nối mọi người",
      description: "Chat với bạn bè, gia đình và đồng nghiệp mọi lúc mọi nơi"
    },
    {
      icon: <Shield className="w-12 h-12 text-green-500" />,
      title: "Bảo mật cao",
      description: "Thông tin của bạn được mã hóa và bảo vệ an toàn"
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      title: "Siêu tốc độ",
      description: "Trải nghiệm chat mượt mà không giật lag"
    },
    {
      icon: <Globe className="w-12 h-12 text-indigo-500" />,
      title: "Đa nền tảng",
      description: "Sử dụng trên web, mobile và desktop"
    }
  ];

  const handleLogin = () => {
    window.location.href = '/login-register';
  };

  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header/Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-800">ChatApp</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                  onClick={handleLogin}
                  className="px-6 py-2 text-blue-500 font-medium hover:text-blue-600 transition-colors"
              >
                Đăng nhập
              </button>
              <button
                  onClick={handleRegister}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors shadow-md"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Kết nối mọi người
              <br />
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Mọi lúc, Mọi nơi
            </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Ứng dụng chat hiện đại giúp bạn kết nối với bạn bè, gia đình và đồng nghiệp một cách dễ dàng và an toàn.
            </p>
            <div className="flex items-center justify-center space-x-4">
              <button
                  onClick={handleRegister}
                  className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Bắt đầu ngay</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                  onClick={handleLogin}
                  className="px-8 py-4 bg-white text-gray-700 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg border-2 border-gray-200"
              >
                Đăng nhập
              </button>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="mt-16 relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-1 shadow-2xl">
              <div className="bg-white rounded-xl p-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-4xl font-bold text-gray-800">ChatApp</div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
                      <div>
                        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg inline-block">
                          Xin chào! 👋
                        </div>
                        <p className="text-xs text-gray-500 mt-1">10:30 AM</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-right">
                    <div className="flex items-start space-x-3 justify-end">
                      <div>
                        <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg inline-block">
                          Chào bạn! Bạn khỏe không?
                        </div>
                        <p className="text-xs text-gray-500 mt-1">10:31 AM</p>
                      </div>
                      <div className="w-10 h-10 bg-purple-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn ChatApp?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Chúng tôi cung cấp những tính năng tốt nhất để mang đến trải nghiệm chat hoàn hảo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-500 py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">10K+</div>
                <div className="text-xl opacity-90">Người dùng</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">1M+</div>
                <div className="text-xl opacity-90">Tin nhắn/ngày</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <div className="text-xl opacity-90">Uptime</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Sẵn sàng bắt đầu?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng ngàn người dùng đang trải nghiệm ChatApp mỗi ngày
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
                onClick={handleRegister}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl"
            >
              Tạo tài khoản miễn phí
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-xl font-bold">ChatApp</span>
                </div>
                <p className="text-gray-400">
                  Kết nối mọi người, mọi lúc mọi nơi
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Sản phẩm</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Tính năng</li>
                  <li>Bảo mật</li>
                  <li>Doanh nghiệp</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Công ty</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Về chúng tôi</li>
                  <li>Blog</li>
                  <li>Careers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Hỗ trợ</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Trung tâm trợ giúp</li>
                  <li>Liên hệ</li>
                  <li>Điều khoản</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2024 ChatApp. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
  );
}