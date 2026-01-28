'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import api from "@/app/lib/axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu.');
            return;
        }
        setError('');
        setLoading(true);


        try {
            const response = await api.post(`${API_URL}/api/consumer/login/`, {
                username,
                password,
            });

            if (response.data && response.data.access_token) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('username', username);

                alert('Đăng nhập thành công!');
                router.push('/home');
            } else {
                setError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
            }
        } catch (err: any) {
            if (err.response?.status === 401) {
                setError('Tên đăng nhập hoặc mật khẩu không đúng.');
            } else {
                setError('Lỗi kết nối. Đảm bảo Django server đang chạy trên port 8002.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <MessageCircle className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                    <h1 className="text-3xl font-bold text-gray-800">Chat App</h1>
                    <p className="text-gray-600 mt-2">Đăng nhập để tiếp tục</p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                            placeholder="Nhập tên đăng nhập"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Chưa có tài khoản?{' '}
                        <button
                            onClick={() => router.push('/register')}
                            className="text-blue-500 font-medium hover:underline"
                        >
                            Đăng ký ngay
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
