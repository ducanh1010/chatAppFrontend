// 'use client';
//
// import { useState } from 'react';
// import { MessageCircle, Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
//
// export default function AuthPage() {
//     const [isLogin, setIsLogin] = useState(true);
//     const [showPassword, setShowPassword] = useState(false);
//     const [formData, setFormData] = useState({
//         phone: '',
//         email: '',
//         username: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         confirmPassword: ''
//     });
//
//     const handleChange = (field: string, value: string) => {
//         setFormData(prev => ({ ...prev, [field]: value }));
//     };
//
//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         console.log('Form submitted:', formData);
//         // Add your API call here
//     };
//
//     return (
//         <div className="min-h-screen bg-gradient-to-r from-[#e20080] to-[#bf43d9] flex items-center justify-center p-4">
//             <div className="max-w-6xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
//                 <div className="grid md:grid-cols-2">
//                     {/* Poster Section */}
//                     <div className="hidden md:flex bg-gradient-to-br from-[#e20080] to-[#bf43d9] p-12 items-center justify-center relative overflow-hidden">
//                         <div className="absolute inset-0 opacity-10">
//                             <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
//                             <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full"></div>
//                             <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full"></div>
//                         </div>
//
//                         <div className="relative z-10 text-center text-white">
//                             <MessageCircle className="w-24 h-24 mx-auto mb-6 drop-shadow-lg" />
//                             <h2 className="text-4xl font-bold mb-4">ChatApp</h2>
//                             <p className="text-xl mb-8">Kết nối mọi người, mọi lúc, mọi nơi</p>
//
//                             <div className="space-y-4 text-left max-w-sm mx-auto">
//                                 <div className="flex items-center space-x-3">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                     <p className="text-lg">Nhắn tin thời gian thực</p>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                     <p className="text-lg">Gọi video chất lượng cao</p>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                     <p className="text-lg">Chia sẻ hình ảnh & file</p>
//                                 </div>
//                                 <div className="flex items-center space-x-3">
//                                     <div className="w-2 h-2 bg-white rounded-full"></div>
//                                     <p className="text-lg">Bảo mật end-to-end</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     {/* Form Section */}
//                     <div className="p-8 md:p-12">
//                         <div className="max-w-md mx-auto">
//                             {/* Logo for mobile */}
//                             <div className="md:hidden text-center mb-8">
//                                 <MessageCircle className="w-16 h-16 mx-auto text-[#e20080] mb-2" />
//                                 <h2 className="text-2xl font-bold bg-gradient-to-r from-[#e20080] to-[#bf43d9] bg-clip-text text-transparent">
//                                     ChatApp
//                                 </h2>
//                             </div>
//
//                             {/* Tab Switcher */}
//                             <div className="flex mb-8 bg-gray-100 rounded-lg p-1">
//                                 <button
//                                     onClick={() => setIsLogin(true)}
//                                     className={`flex-1 py-3 rounded-md font-semibold transition-all ${
//                                         isLogin
//                                             ? 'bg-white text-[#e20080] shadow-md'
//                                             : 'text-gray-600 hover:text-gray-800'
//                                     }`}
//                                 >
//                                     Đăng nhập
//                                 </button>
//                                 <button
//                                     onClick={() => setIsLogin(false)}
//                                     className={`flex-1 py-3 rounded-md font-semibold transition-all ${
//                                         !isLogin
//                                             ? 'bg-white text-[#e20080] shadow-md'
//                                             : 'text-gray-600 hover:text-gray-800'
//                                     }`}
//                                 >
//                                     Đăng ký
//                                 </button>
//                             </div>
//
//                             <form onSubmit={handleSubmit} className="space-y-4">
//                                 {isLogin ? (
//                                     // Login Form
//                                     <>
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Số điện thoại / Email
//                                             </label>
//                                             <div className="relative">
//                                                 <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type="text"
//                                                     value={formData.phone}
//                                                     onChange={(e) => handleChange('phone', e.target.value)}
//                                                     className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Nhập số điện thoại hoặc email"
//                                                 />
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Mật khẩu
//                                             </label>
//                                             <div className="relative">
//                                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type={showPassword ? 'text' : 'password'}
//                                                     value={formData.password}
//                                                     onChange={(e) => handleChange('password', e.target.value)}
//                                                     className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Nhập mật khẩu"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setShowPassword(!showPassword)}
//                                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                                 >
//                                                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                                 </button>
//                                             </div>
//                                         </div>
//
//                                         <div className="flex items-center justify-between text-sm">
//                                             <label className="flex items-center text-gray-600">
//                                                 <input type="checkbox" className="mr-2 rounded" />
//                                                 Ghi nhớ đăng nhập
//                                             </label>
//                                             <a href="#" className="text-[#e20080] hover:text-[#bf43d9]">
//                                                 Quên mật khẩu?
//                                             </a>
//                                         </div>
//
//                                         <button
//                                             type="submit"
//                                             className="w-full bg-gradient-to-r from-[#e20080] to-[#bf43d9] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
//                                         >
//                                             ĐĂNG NHẬP
//                                         </button>
//                                     </>
//                                 ) : (
//                                     // Register Form
//                                     <>
//                                         <div className="grid grid-cols-2 gap-4">
//                                             <div>
//                                                 <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                     Họ
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     value={formData.lastName}
//                                                     onChange={(e) => handleChange('lastName', e.target.value)}
//                                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Họ"
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                     Tên
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     value={formData.firstName}
//                                                     onChange={(e) => handleChange('firstName', e.target.value)}
//                                                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Tên"
//                                                 />
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Tên đăng nhập
//                                             </label>
//                                             <div className="relative">
//                                                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type="text"
//                                                     value={formData.username}
//                                                     onChange={(e) => handleChange('username', e.target.value)}
//                                                     className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Nhập tên đăng nhập"
//                                                 />
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Email
//                                             </label>
//                                             <div className="relative">
//                                                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type="email"
//                                                     value={formData.email}
//                                                     onChange={(e) => handleChange('email', e.target.value)}
//                                                     className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Nhập email"
//                                                 />
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Mật khẩu
//                                             </label>
//                                             <div className="relative">
//                                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type={showPassword ? 'text' : 'password'}
//                                                     value={formData.password}
//                                                     onChange={(e) => handleChange('password', e.target.value)}
//                                                     className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Mật khẩu (tối thiểu 6 ký tự)"
//                                                 />
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setShowPassword(!showPassword)}
//                                                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                                                 >
//                                                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                                                 </button>
//                                             </div>
//                                         </div>
//
//                                         <div>
//                                             <label className="block text-gray-700 text-sm font-medium mb-2">
//                                                 Xác nhận mật khẩu
//                                             </label>
//                                             <div className="relative">
//                                                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                                                 <input
//                                                     type={showPassword ? 'text' : 'password'}
//                                                     value={formData.confirmPassword}
//                                                     onChange={(e) => handleChange('confirmPassword', e.target.value)}
//                                                     className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e20080] focus:border-transparent transition-all text-gray-800"
//                                                     placeholder="Nhập lại mật khẩu"
//                                                 />
//                                             </div>
//                                         </div>
//
//                                         <button
//                                             type="submit"
//                                             className="w-full bg-gradient-to-r from-[#e20080] to-[#bf43d9] text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all"
//                                         >
//                                             ĐĂNG KÝ
//                                         </button>
//
//                                         <p className="text-xs text-gray-600 text-center">
//                                             Bằng việc đăng ký, bạn đã đồng ý với ChatApp về{' '}
//                                             <a href="#" className="text-[#e20080] hover:underline">
//                                                 Điều khoản dịch vụ
//                                             </a>{' '}
//                                             &{' '}
//                                             <a href="#" className="text-[#e20080] hover:underline">
//                                                 Chính sách bảo mật
//                                             </a>
//                                         </p>
//                                     </>
//                                 )}
//                             </form>
//
//                             {isLogin && (
//                                 <>
//                                     <div className="relative my-6">
//                                         <div className="absolute inset-0 flex items-center">
//                                             <div className="w-full border-t border-gray-300"></div>
//                                         </div>
//                                         <div className="relative flex justify-center text-sm">
//                                             <span className="px-4 bg-white text-gray-500">HOẶC</span>
//                                         </div>
//                                     </div>
//
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
//                                             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                                                 <path
//                                                     fill="#4267B2"
//                                                     d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
//                                                 />
//                                             </svg>
//                                             <span className="text-gray-700 font-medium">Facebook</span>
//                                         </button>
//                                         <button className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all">
//                                             <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                                                 <path
//                                                     fill="#EA4335"
//                                                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//                                                 />
//                                                 <path
//                                                     fill="#4285F4"
//                                                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//                                                 />
//                                                 <path
//                                                     fill="#FBBC05"
//                                                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
//                                                 />
//                                                 <path
//                                                     fill="#34A853"
//                                                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
//                                                 />
//                                             </svg>
//                                             <span className="text-gray-700 font-medium">Google</span>
//                                         </button>
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }