import React from 'react';

const DiaryCardSkeleton = () => {
    return (
        <div className="bg-sea-glass border border-white/5 rounded-2xl overflow-hidden shadow-sm backdrop-blur-md flex flex-col gap-3 p-3 h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-slate-800/50 rounded-xl" />

            {/* Content Placeholder */}
            <div className="px-1 pb-1 space-y-2">
                <div className="h-3 w-20 bg-sea-accent/20 rounded" />
                <div className="space-y-1">
                    <div className="h-2 w-full bg-white/10 rounded" />
                    <div className="h-2 w-3/4 bg-white/10 rounded" />
                    <div className="h-2 w-5/6 bg-white/10 rounded" />
                </div>
            </div>
        </div>
    );
};

export default DiaryCardSkeleton;
