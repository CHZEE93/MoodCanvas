import React from 'react';
import { BookOpen, Image as ImageIcon, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    // Helper to determine active state
    const isActive = (path) => {
        if (path === '/main' && location.pathname === '/main') return true;
        if (path !== '/main' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { path: '/main', label: 'Record', Icon: BookOpen },
        { path: '/main/gallery', label: 'Gallery', Icon: ImageIcon },
        { path: '/main/settings', label: 'Settings', Icon: Settings },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full flex justify-center pb-6 z-50 pointer-events-none">
            <div className="w-full max-w-md pointer-events-auto px-6 md:max-w-lg">
                <nav className="backdrop-blur-xl bg-sea-glass border border-white/10 rounded-2xl h-16 flex items-center justify-around shadow-lg transition-all duration-300 hover:bg-white/10">
                    {navItems.map(({ path, label, Icon }) => {
                        const active = isActive(path);
                        return (
                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`p-2 transition-all duration-300 flex flex-col items-center gap-1 w-1/3 relative group ${active ? 'text-white scale-110' : 'text-white/50 hover:text-white/80'
                                    }`}
                            >
                                <div className={`relative ${active ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]' : ''}`}>
                                    <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                                </div>
                                <span className={`text-[10px] font-medium tracking-wide ${active ? 'opacity-100' : 'opacity-70'}`}>
                                    {label}
                                </span>
                                {active && (
                                    <div className="absolute -bottom-2 w-1 h-1 bg-white rounded-full shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                                )}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
