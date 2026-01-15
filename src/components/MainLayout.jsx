import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Outlet } from 'react-router-dom';
import Layout from './Layout';
import BottomNav from './BottomNav';
import FloatingActionButton from './FloatingActionButton';
import CreatePostModal from './CreatePostModal';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
        };
        getUser();
    }, []);

    const handleRefresh = () => {
        // Optimistically we could update the grid, but for now purely triggering a refresh mechanism
        // might be needed. DiaryGrid might need a key or a signal to refetch.
        // For simple implementation, we can reload or use a context.
        // Let's just log for now, or force window reload if simplest? 
        // Better: DiaryGrid should assume real-time or we pass a key.
        window.location.reload(); // Simple refresh for now to show new post
    };

    return (
        <Layout>
            <header className="p-6 pt-14 pb-4 flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-wide font-sans">
                        MoodCanvas
                        <span className="block text-xs text-sea-accent/80 font-medium mt-1 tracking-widest uppercase">내면의 바다</span>
                    </h1>
                </div>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut();
                    }}
                    className="text-white/60 hover:text-white transition-colors p-2"
                    aria-label="Logout"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </header>

            <main className="flex-1 p-4 pb-32 overflow-y-auto scrollbar-hide">
                <Outlet />
            </main>

            <FloatingActionButton onClick={() => setIsModalOpen(true)} />
            <BottomNav />

            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onPostCreated={handleRefresh}
            />
        </Layout>
    );
};

export default MainLayout;
