import React from 'react';

export default function DiaryCard({ created_at, content, image_url }) {
    // Format date: YYYY.MM.DD
    const dateObj = new Date(created_at);
    const dateStr = `${dateObj.getFullYear()}.${String(dateObj.getMonth() + 1).padStart(2, '0')}.${String(dateObj.getDate()).padStart(2, '0')}`;

    return (
        <div className="bg-sea-glass border border-white/5 rounded-2xl overflow-hidden shadow-sm backdrop-blur-md flex flex-col gap-3 p-3 transition-transform hover:-translate-y-1 h-full">
            <div className="w-full aspect-square bg-slate-900/40 rounded-xl overflow-hidden relative group">
                {image_url ? (
                    <img src={image_url} alt="Mood" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20 text-xs flex-col gap-2">
                        <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                            ?
                        </div>
                    </div>
                )}
            </div>
            <div className="px-1 pb-1">
                <span className="text-[10px] text-sea-accent font-medium uppercase tracking-wider block mb-1.5 opacity-80">{dateStr}</span>
                <p className="text-xs text-white/90 line-clamp-3 leading-relaxed font-light break-words">
                    {content}
                </p>
            </div>
        </div>
    );
}
