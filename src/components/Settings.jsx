import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-white px-6 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-inner backdrop-blur-sm">
                <SettingsIcon size={40} className="text-sea-accent opacity-80" />
            </div>
            <h2 className="text-2xl font-bold mb-2 tracking-wide">Settings</h2>
            <p className="text-white/60 font-light">
                이 페이지는 현재 준비중입니다.
                <br />
                <span className="text-sm opacity-50 mt-2 block">Feature coming soon...</span>
            </p>
        </div>
    );
}
