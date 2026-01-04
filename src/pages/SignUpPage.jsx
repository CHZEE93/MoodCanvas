import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SeaTurtle from '../components/SeaTurtle';
import { supabase } from '../lib/supabaseClient';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.nickname,
                    },
                },
            });

            if (error) throw error;

            alert('Registration successful! Please check your email to verify your account.');
            navigate('/');
        } catch (error) {
            alert('Error signing up: ' + error.message);
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
                    <h1 className="text-4xl font-bold tracking-tighter drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-400">
                        Join MoodCanvas
                    </h1>
                    <p className="text-lg font-light text-teal-100/80 tracking-widest uppercase">
                        Begin Your Journey
                    </p>
                </div>
            </div>

            {/* Sign Up Form */}
            <div className="z-10 w-full max-w-sm space-y-4 animate-fade-in-up delay-200 bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
                <form onSubmit={handleSignUp} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">Email</label>
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
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">Nickname</label>
                        <input
                            type="text"
                            name="nickname"
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            placeholder="How should we call you?"
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-teal-100 mb-1 pl-1">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            required
                            minLength={6}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-6 bg-gradient-to-r from-teal-400 to-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-teal-500/30 hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center pt-2">
                    <p className="text-sm text-teal-100/60">
                        Already have an account?{' '}
                        <Link to="/" className="text-teal-300 hover:text-white font-medium transition-colors hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
