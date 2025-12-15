import { useState, useEffect } from 'react';

interface NewYearConfig {
  enabled: boolean;
  snowflakes: boolean;
  lights: boolean;
  santa: boolean;
}

const NewYearMode = () => {
  const [config, setConfig] = useState<NewYearConfig | null>(null);

  useEffect(() => {
    fetch('/data/newyear.json')
      .then(res => res.json())
      .then(data => setConfig(data))
      .catch(() => setConfig(null));
  }, []);

  if (!config?.enabled) return null;

  return (
    <>
      {config.snowflakes && <Snowflakes />}
      {config.lights && <ChristmasLights />}
      {config.santa && <SantaHat />}
    </>
  );
};

const Snowflakes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 50 }).map((_, i) => (
        <div
          key={i}
          className="snowflake absolute text-white opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            fontSize: `${10 + Math.random() * 10}px`,
          }}
        >
          ❄
        </div>
      ))}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0;
          }
        }
        .snowflake {
          animation: snowfall linear infinite;
        }
      `}</style>
    </div>
  );
};

const ChristmasLights = () => {
  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[60] h-32 overflow-hidden">
      <img 
        src="https://cdn.poehali.dev/files/vecteezy_christmas-tree-branches-with-lights-garland_23865915.jpg"
        alt="Christmas garland"
        className="w-full h-full object-cover object-top"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
        }}
      />
    </div>
  );
};

const SantaHat = () => {
  return (
    <div className="fixed top-8 right-8 pointer-events-none z-[60] animate-bounce" style={{ animationDuration: '3s' }}>
      <svg width="80" height="100" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#991b1b', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        <path 
          d="M 15 85 Q 15 70, 25 60 L 40 25 L 55 60 Q 65 70, 65 85 Z" 
          fill="url(#redGradient)"
          filter="url(#shadow)"
        />
        
        <ellipse cx="40" cy="85" rx="32" ry="8" fill="white" filter="url(#shadow)" />
        
        <path 
          d="M 25 60 Q 30 55, 35 58 Q 38 60, 40 58 Q 42 60, 45 58 Q 50 55, 55 60" 
          fill="white" 
          opacity="0.6"
        />
        
        <circle cx="62" cy="28" r="10" fill="white" filter="url(#shadow)" />
        <circle cx="62" cy="28" r="7" fill="#f3f4f6" />
        
        <ellipse cx="30" cy="70" rx="8" ry="12" fill="#b91c1c" opacity="0.3" />
        <ellipse cx="50" cy="70" rx="8" ry="12" fill="#991b1b" opacity="0.3" />
      </svg>
    </div>
  );
};

export default NewYearMode;