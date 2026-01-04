import React from 'react';

export default function Layout({ children }) {
    return (
        <div className="flex justify-center w-full min-h-screen bg-sea-bg relative overflow-hidden">
            {/* Particles Background */}
            <div className="particles"></div>

            <div className="w-full md:max-w-none md:px-8 lg:px-16 min-h-screen relative flex flex-col z-10 transition-all duration-300">
                <div className="w-full max-w-md mx-auto md:max-w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
