'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, UserPlus, Users, MessageCircle, LogOut, UserCheck, UserX, Check, X, User } from 'lucide-react';
import api from '@/app/lib/axios';

import { Button } from "@/components/ui/button"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

interface User {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    friendship_status?: 'none' | 'pending_sent' | 'pending_received' | 'friends';
}

interface Friend {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    last_message?: string;
    unread_count?: number;
}
interface Profile {
    avatar?: string;
    bio: string;
    phone: string;
    gender: 'M' | 'F' | 'O' | 'P' | '';
    date_of_birth?: string;
    location: string;
}

export default function HomePage() {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState('');
    const [activeTab, setActiveTab] = useState<'friends' | 'search' | 'requests'|'profile'>('friends');

    const [friends, setFriends] = useState<Friend[]>([]);


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    const [pendingRequests, setPendingRequests] = useState<User[]>([]);
    const [sentRequests, setSentRequests] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            router.push('/login');
            return;
        }

        setCurrentUser(username);
        loadFriends();
        loadFriendRequests();
    }, []);

    const goToProfileTab = () => {
        router.push('/profile');
    };

    const loadFriends = async () => {
        try {
            const response = await api.get('/api/friends/list/');
            setFriends(response.data.friends || []);
        } catch (err) {
            console.error('Error loading friends:', err);
        }
    };

    const loadFriendRequests = async () => {
        try {
            const response = await api.get('/api/friends/requests/');

            setPendingRequests(response.data.received || []);
            setSentRequests(response.data.sent || []);
        } catch (err) {
            console.error('Error loading requests:', err);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsSearching(true);
        try {
            const response = await api.get('/api/consumer/search/', {
                params: {
                    q: searchQuery,
                },
            });

            setSearchResults(response.data.users || []);
        } catch (err) {
            console.error('Error searching:', err);
        } finally {
            setIsSearching(false);
        }
    };

    const sendFriendRequest = async (userId: number) => {
        try {
            await api.post('/api/friends/request/send/', {
                user_id: userId,
            });
            // Optional: reload list
            loadFriendRequests();
        } catch (err) {
            console.error('Error sending friend request:', err);
        }
    };

    const acceptFriendRequest = async (userId: number) => {
        try {
            await api.post('/api/friends/request/accept/', {
                user_id: userId,
            });

            alert('Đã chấp nhận lời mời kết bạn!');
            loadFriends();
            loadFriendRequests();
        } catch (err) {
            console.error('Error accepting request:', err);
        }
    };

    const rejectFriendRequest = async (userId: number) => {
        try {
            await api.post('/api/friends/request/reject/', {
                user_id: userId,
            });

            alert('Đã từ chối lời mời kết bạn');
            loadFriendRequests();
        } catch (err) {
            console.error('Error rejecting request:', err);
        }
    };
    const handleLogout = () => {
        localStorage.clear();
        router.push('/HomePage');
    };

    const openChat = (friendId: number) => {
        router.push(`/chat/${friendId}`);
    };
    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                        <h1 className="text-2xl font-bold text-gray-800">Chat App</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-700">Xin chào, <strong>{currentUser}</strong></span>
                        <Button
                            onClick={goToProfileTab}
                            variant="ghost"
                            className="flex items-center gap-2 justify-start text-gray-700 hover:bg-gray-100"
                        >
                            <User className="w-4 h-4" />
                            Hồ sơ
                        </Button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow-sm mb-6">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab('friends')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                                activeTab === 'friends'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <Users className="w-5 h-5" />
                            Bạn bè ({friends.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                                activeTab === 'search'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <Search className="w-5 h-5" />
                            Tìm kiếm
                        </button>
                        <button
                            onClick={() => setActiveTab('requests')}
                            className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                                activeTab === 'requests'
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <UserPlus className="w-5 h-5" />
                            Lời mời ({pendingRequests.length})
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'friends' && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-gray-600">Danh sách bạn bè</h2>
                                {friends.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        Bạn chưa có bạn bè nào. Hãy tìm kiếm và kết bạn!
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {friends.map((friend) => (
                                            <div
                                                key={friend.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        {friend.first_name[0]}{friend.last_name[0]}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">
                                                            {friend.first_name} {friend.last_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">@{friend.username}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => openChat(friend.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                                >
                                                    <MessageCircle className="w-4 h-4" />
                                                    Nhắn tin
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Search Tab */}
                        {activeTab === 'search' && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-gray-600">Tìm kiếm người dùng</h2>
                                <div className="flex gap-2 mb-6">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                        placeholder="Nhập tên hoặc username..."
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700 "
                                    />
                                    <button
                                        onClick={handleSearch}
                                        disabled={isSearching}
                                        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                                    >
                                        {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {searchResults.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.first_name[0]}{user.last_name[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        {user.first_name} {user.last_name}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">@{user.username}</p>
                                                </div>
                                            </div>
                                            {user.friendship_status === 'friends' ? (
                                                <span className="flex items-center gap-2 text-green-600 font-medium">
                          <UserCheck className="w-4 h-4" />
                          Bạn bè
                        </span>
                                            ) : user.friendship_status === 'pending_sent' ? (
                                                <span className="text-gray-500">Đã gửi lời mời</span>
                                            ) : user.friendship_status === 'pending_received' ? (
                                                <span className="text-blue-600">Đã gửi lời mời cho bạn</span>
                                            ) : (
                                                <button
                                                    onClick={() => sendFriendRequest(user.id)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                >
                                                    <UserPlus className="w-4 h-4" />
                                                    Kết bạn
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Requests Tab */}
                        {activeTab === 'requests' && (
                            <div>
                                <h2 className="text-xl font-bold mb-4 text-gray-600">Lời mời kết bạn</h2>

                                {pendingRequests.length === 0 ? (
                                    <p className="text-gray-500 text-center py-8">
                                        Không có lời mời kết bạn nào
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {pendingRequests.map((user) => (
                                            <div
                                                key={user.id}
                                                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        {user.first_name[0]}{user.last_name[0]}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800">
                                                            {user.first_name} {user.last_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">@{user.username}</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => acceptFriendRequest(user.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                        Chấp nhận
                                                    </button>
                                                    <button
                                                        onClick={() => rejectFriendRequest(user.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                                    >
                                                        <X className="w-4 h-4" />
                                                        Từ chối
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {sentRequests.length > 0 && (
                                    <>
                                        <h3 className="text-lg font-semibold mt-8 mb-4">Lời mời đã gửi</h3>
                                        <div className="space-y-3">
                                            {sentRequests.map((user) => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold">
                                                            {user.first_name[0]}{user.last_name[0]}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-gray-800">
                                                                {user.first_name} {user.last_name}
                                                            </h3>
                                                            <p className="text-sm text-gray-500">@{user.username}</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-gray-500 text-sm">Đang chờ phản hồi...</span>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}