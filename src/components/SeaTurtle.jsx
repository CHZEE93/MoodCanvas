import React from 'react';

const SeaTurtle = () => {
    return (
        <div className="absolute top-1/3 left-0 w-96 h-96 pointer-events-none animate-swim z-0 opacity-80 mix-blend-screen">
            <img
                src="/sea_turtle.png"
                alt="Sea Turtle"
                className="w-full h-full object-contain"
                style={{
                    maskImage: 'radial-gradient(circle, black 50%, transparent 95%)',
                    WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 95%)'
                }}
            />
        </div>
    );
};

export default SeaTurtle;
