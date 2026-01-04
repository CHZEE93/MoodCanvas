import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return;

                const { data, error } = await supabase
                    .from('posts')
                    .select('id, image_url, created_at')
                    .eq('user_id', user.id)
                    .neq('image_url', null) // Only fetch posts with images
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching gallery:', error);
                } else {
                    setImages(data || []);
                }
            } catch (error) {
                console.error('Unexpected error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-2 pb-24">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
                ))}
            </div>
        );
    }

    if (images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-60 min-h-[50vh]">
                <p className="text-white text-lg font-light mb-2">No images yet.</p>
                <p className="text-sm text-sea-accent">Create a log to see your gallery grow.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 pb-24">
            {images.map(img => (
                <div key={img.id} className="aspect-square rounded-2xl overflow-hidden bg-black/20 shadow-lg border border-white/10 group relative">
                    <img
                        src={img.image_url}
                        alt="Gallery"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white/80 text-xs font-mono">
                            {new Date(img.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
