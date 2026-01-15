import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import DiaryCard from './DiaryCard';
import DiaryCardSkeleton from './DiaryCardSkeleton';

export default function DiaryGrid() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return; // Should not happen in protected route, but safety check

                const { data, error } = await supabase
                    .from('posts')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching posts:', error);
                } else {
                    setPosts(data || []);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-2 pb-8">
                {Array.from({ length: 10 }).map((_, index) => (
                    <DiaryCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            // Empty state
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                <p className="text-white text-lg font-light mb-2">아직 기록된 추억이 없습니다.</p>
                <p className="text-sm text-sea-accent">펜 버튼을 눌러 첫 번째 기록을 남겨보세요.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-2 pb-8">
            {posts.map(post => (
                <DiaryCard key={post.id} {...post} />
            ))}
        </div>
    );
}
