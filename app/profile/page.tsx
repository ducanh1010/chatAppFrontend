'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Save, User as UserIcon } from 'lucide-react';
import api from '@/app/lib/axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

interface Profile {
    avatar?: string;
    bio: string;
    phone: string;
    gender: 'M' | 'F' | 'O' | 'P' | '';
    date_of_birth?: string;
    location: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profile, setProfile] = useState<Profile>({
        avatar: '',
        bio: '',
        phone: '',
        gender: '',
        date_of_birth: '',
        location: ''
    });

    const [avatarPreview, setAvatarPreview] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            router.push('/login');
            return;
        }

        setCurrentUser(username);
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get('/api/profile/cprofile/');
            const data = res.data;
                setProfile({
                    avatar: data.avatar || '',
                    bio: data.bio || '',
                    phone: data.phone || '',
                    gender: data.gender || '',
                    date_of_birth: data.date_of_birth || '',
                    location: data.location || ''
                });
                if (data.avatar) {
                    setAvatarPreview(data.avatar);
                }
        } catch (err) {
            console.error('Error loading profile:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const token = localStorage.getItem('access_token');
            const formData = new FormData();

            // Add avatar if changed
            const avatarInput = document.getElementById('avatar-input') as HTMLInputElement;
            if (avatarInput?.files?.[0]) {
                formData.append('avatar', avatarInput.files[0]);
            }

            // Add other fields
            formData.append('bio', profile.bio);
            formData.append('phone', profile.phone);
            if (profile.gender) formData.append('gender', profile.gender);
            if (profile.date_of_birth) formData.append('date_of_birth', profile.date_of_birth);
            formData.append('location', profile.location);

            await api.put('/api/profile/cprofile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

                alert('Cập nhật hồ sơ thành công!');
                loadProfile();
        } catch (err) {
            console.error('Error updating profile:', err);
            alert('Có lỗi xảy ra khi cập nhật hồ sơ');
        } finally {
            setSaving(false);
        }
    };

    const handleInputChange = (field: keyof Profile, value: string) => {
        setProfile(prev => ({ ...prev, [field]: value }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-gray-600">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/home')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-gray-600" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">Hồ sơ của tôi</h1>
                    </div>
                    <span className="text-gray-700">@{currentUser}</span>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <form onSubmit={handleSubmit}>
                        {/* Avatar Section */}
                        <div className="flex flex-col items-center mb-8">
                            <div className="relative">
                                {avatarPreview ? (
                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                                    />
                                ) : (
                                    <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-gray-200">
                                        {currentUser[0]?.toUpperCase()}
                                    </div>
                                )}
                                <label
                                    htmlFor="avatar-input"
                                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                                >
                                    <Camera className="w-5 h-5" />
                                </label>
                                <input
                                    id="avatar-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500 mt-2">Click vào biểu tượng camera để thay đổi ảnh đại diện</p>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-6">
                            {/* Bio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tiểu sử
                                </label>
                                <textarea
                                    value={profile.bio}
                                    onChange={(e) => handleInputChange('bio', e.target.value)}
                                    rows={4}
                                    placeholder="Viết vài dòng về bản thân..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    value={profile.phone}
                                    onChange={(e) => handleInputChange('phone', e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Giới tính
                                </label>
                                <select
                                    value={profile.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                >
                                    <option value="">Chọn giới tính</option>
                                    <option value="M">Nam</option>
                                    <option value="F">Nữ</option>
                                    <option value="O">Khác</option>
                                    <option value="P">Không muốn tiết lộ</option>
                                </select>
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ngày sinh
                                </label>
                                <input
                                    type="date"
                                    value={profile.date_of_birth}
                                    onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Địa chỉ
                                </label>
                                <input
                                    type="text"
                                    value={profile.location}
                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                    placeholder="Nhập địa chỉ"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                            >
                                <Save className="w-5 h-5" />
                                {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push('/home')}
                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}