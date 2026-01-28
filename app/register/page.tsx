'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleRegister = async () => {
        setError('');

        // Validation
        if (!formData.username || !formData.email || !formData.firstName ||
            !formData.lastName || !formData.password || !formData.confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu không khớp!');
            return;
        }

        if (formData.password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự!');
            return;
        }

        setLoading(true);

        // Payload khớp với Django serializer
        const payload = {
            username: formData.username,
            email: formData.email,
            first_name: formData.firstName,
            last_name: formData.lastName,
            password: formData.password,
            confirm_password: formData.confirmPassword
        };

        console.log('📤 Sending payload:', payload);

        try {
            const response = await axios.post(`${API_URL}/api/consumer/register/`, payload);

            console.log('✅ Response:', response.data);

            if (response.data.token || response.data.id) {
                alert('Đăng ký thành công! Hãy đăng nhập.');
                router.push('/login');
            } else {
                setError('Đăng ký thất bại. Vui lòng thử lại.');
            }
        } catch (err: any) {
            console.error('❌ Error:', err);
            console.error('❌ Error response:', err.response?.data);

            if (err.response?.data) {
                // Lấy message lỗi đầu tiên từ Django
                const errorData = err.response.data;

                if (typeof errorData === 'string') {
                    setError(errorData);
                } else if (errorData.username) {
                    setError('Tên đăng nhập đã tồn tại.');
                } else if (errorData.email) {
                    setError('Email đã được sử dụng.');
                } else if (errorData.non_field_errors) {
                    setError(errorData.non_field_errors[0]);
                } else {
                    // Lấy lỗi đầu tiên
                    const firstError = Object.values(errorData)[0];
                    setError(Array.isArray(firstError) ? firstError[0] : String(firstError));
                }
            } else {
                setError('Lỗi kết nối. Đảm bảo Django server đang chạy.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleRegister();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <Users className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Đăng ký</h1>
                    <p className="text-gray-600 mt-2">Tạo tài khoản mới</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Tên đăng nhập *
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => handleChange('username', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Họ *
                            </label>
                            <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                                placeholder="Họ"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">
                                Tên *
                            </label>
                            <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800"
                                placeholder="Tên"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Mật khẩu *
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                            placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Xác nhận mật khẩu *
                        </label>
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
                            placeholder="Nhập lại mật khẩu"
                        />
                    </div>

                    <button
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Đã có tài khoản?{' '}
                        <button
                            onClick={() => router.push('/login')}
                            className="text-purple-500 font-medium hover:underline"
                        >
                            Đăng nhập
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}