/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'sea-bg': '#020617', // Slate 950 - Deep Sea
                'sea-glass': 'rgba(255, 255, 255, 0.05)',
                'sea-accent': '#2dd4bf',
                'turtle-green': '#10b981',
            },
            backgroundImage: {
                'sea-gradient': 'linear-gradient(to bottom, #020617, #111827, #1e293b)',
                'deep-sea': 'radial-gradient(circle at top, #1e293b, #020617)',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'swim': 'swim 20s linear infinite',
            },
            keyframes: {
                swim: {
                    '0%': { transform: 'translateX(-100%) translateY(0) rotate(5deg)' },
                    '50%': { transform: 'translateX(50vw) translateY(-20px) rotate(-5deg)' },
                    '100%': { transform: 'translateX(100vw) translateY(0) rotate(5deg)' },
                }
            }
        },
    },
    plugins: [],
}
