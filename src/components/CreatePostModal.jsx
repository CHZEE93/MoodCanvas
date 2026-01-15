import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen) return null;

    const handleSave = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        try {
            // Get current user UUID directly
            const { data: { user }, error: authError } = await supabase.auth.getUser();

            if (authError || !user) {
                console.error("Auth Error:", authError);
                throw new Error("User not authenticated");
            }

            // 1. Generate Image URL
            const encodedText = encodeURIComponent(text);
            const imageUrl = `https://image.pollinations.ai/prompt/${encodedText}`;

            // 2. Save to Supabase using the fetched user.id (UUID)
            const { error } = await supabase
                .from('posts')
                .insert([
                    {
                        user_id: user.id, // Explicitly using the UUID from auth.getUser()
                        content: text,
                        image_url: imageUrl,
                    },
                ]);

            if (error) throw error;

            setText(''); // Clear input
            if (onPostCreated) onPostCreated(); // Refresh list if needed
            onClose(); // Close modal
        } catch (error) {
            console.error('Error creating post:', error);
            alert('기록을 저장하는데 실패했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={!isLoading ? onClose : undefined}
            />

            {/* Modal Content */}
            <div className="relative bg-sea-bg border border-sea-accent/30 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white tracking-wide">오늘의 기록</h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="text-white/50 hover:text-white transition-colors disabled:opacity-50"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-sea-text mb-2">
                            지금 기분이 어떠신가요?
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={isLoading}
                            placeholder="당신의 생각을 적어주세요... 이를 바탕으로 이미지가 생성됩니다."
                            className="w-full h-40 bg-black/20 text-white border border-white/10 rounded-xl p-4 focus:ring-2 focus:ring-sea-accent focus:border-transparent outline-none resize-none placeholder-white/30 transition-all"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={handleSave}
                            disabled={isLoading || !text.trim()}
                            className="w-full py-3 px-4 bg-sea-accent text-sea-bg font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>추억을 만드는 중...</span>
                                </>
                            ) : (
                                <span>저장 및 이미지 생성</span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostModal;
