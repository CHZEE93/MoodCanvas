import React, { useState } from 'react';
import SeaTurtle from '../components/SeaTurtle';
import { supabase } from '../lib/supabaseClient';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: formData.password,
            });
            if (error) throw error;
            // Successful login will be handled by the onAuthStateChange in App.jsx
        } catch (error) {
            alert('로그인 오류: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-sea-gradient flex flex-col items-center justify-center p-6 text-white">
            {/* Background Animation */}
            <div className="particles absolute inset-0 z-0 pointer-events-none"></div>
            <SeaTurtle />

            {/* Central Content */}
            <div className="z-10 flex flex-col items-center text-center space-y-6 mb-10 animate-fade-in-up">
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold tracking-tighter drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">
                        MoodCanvas
                    </h1>
                    <p className="text-xl font-light text-teal-100/80 tracking-widest uppercase">
                        내면의 바다
                    </p>
                </div>

                <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                    감정의 바다로 빠져보세요.<br />
                    깊은 바다 속 나만의 기록을 남겨보세요.
                </p>
            </div>

            {/* Login Form */}
            <div className="z-10 w-full max-w-sm space-y-4 animate-fade-in-up delay-200 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">이메일</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">비밀번호</label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-4 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? '로그인 중...' : '로그인'}
                    </button>
                </form>

                <div className="text-center pt-4 border-t border-white/10 mt-6">
                    <p className="text-sm text-teal-100/60 mb-3">계정이 없으신가요?</p>
                    <a
                        href="/signup"
                        className="inline-block w-full py-3 px-4 rounded-xl border border-white/20 hover:bg-white/5 text-teal-300 hover:text-white transition-all text-sm font-medium"
                    >
                        회원가입
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
