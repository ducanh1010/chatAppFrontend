'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Send, LogOut, User, MessageCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8002';

interface Message {
    id?: number;
    sender: string;
    content: string;
    timestamp: string;
}

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');

        if (!storedToken || !storedUsername) {
            router.push('/login');
            return;
        }

        setToken(storedToken);
        setUsername(storedUsername);
        loadMessages(storedToken);
    }, [router]);

    const loadMessages = async (authToken: string) => {
        try {
            const response = await axios.get(`${API_URL}/api/messages/`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });
            if (Array.isArray(response.data)) {
                setMessages(response.data);
            }
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        setLoading(true);
        try {
            const response = await axios.post(
                `${API_URL}/api/messages/`,
                { content: newMessage },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const newMsg: Message = {
                ...response.data,
                sender: username,
                timestamp: new Date().toISOString(),
            };

            setMessages([...messages, newMsg]);
            setNewMessage('');
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Không thể gửi tin nhắn. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        router.push('/login');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <div className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <MessageCircle className="w-8 h-8 text-blue-500" />
                    <h1 className="text-2xl font-bold text-gray-800">Chat App</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-full">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-700">{username}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20">
                        <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Chưa có tin nhắn nào. Hãy gửi tin nhắn đầu tiên!</p>
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex ${
                                msg.sender === username ? 'justify-end' : 'justify-start'
                            }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                                    msg.sender === username
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white text-gray-800 shadow'
                                }`}
                            >
                                {msg.sender !== username && (
                                    <p className="text-xs font-semibold mb-1 text-gray-600">
                                        {msg.sender}
                                    </p>
                                )}
                                <p className="break-words">{msg.content}</p>
                                <p
                                    className={`text-xs mt-1 ${
                                        msg.sender === username ? 'text-blue-100' : 'text-gray-500'
                                    }`}
                                >
                                    {new Date(msg.timestamp).toLocaleTimeString('vi-VN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </p>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
                <div className="flex space-x-3">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Nhập tin nhắn..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={loading}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={loading || !newMessage.trim()}
                        className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                    >
                        <Send className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
}