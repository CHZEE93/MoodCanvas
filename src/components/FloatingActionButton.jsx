import React from 'react';
import { PenTool } from 'lucide-react';

export default function FloatingActionButton({ onClick }) {
    return (
        <div className="fixed bottom-28 left-0 w-full flex justify-center z-40 pointer-events-none">
            <button onClick={onClick} className="pointer-events-auto bg-sea-accent text-sea-bg font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(45,212,191,0.4)] hover:scale-105 transition-all flex items-center gap-2 hover:shadow-[0_0_25px_rgba(45,212,191,0.6)] animate-bounce-slow">
                <PenTool size={18} strokeWidth={2.5} />
                <span className="text-sm tracking-wide">오늘 기록하기</span>
            </button>
        </div>
    );
}
