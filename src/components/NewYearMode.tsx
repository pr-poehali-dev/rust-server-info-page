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
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[60] h-16">
      <div className="flex justify-around items-start h-full">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full animate-pulse"
            style={{
              backgroundColor: ['#ff0000', '#00ff00', '#ffff00', '#0000ff', '#ff00ff'][i % 5],
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1.5s',
              marginTop: `${Math.sin(i) * 10 + 10}px`,
            }}
          />
        ))}
      </div>
      <svg className="absolute top-0 left-0 w-full h-16" xmlns="http://www.w3.org/2000/svg">
        <path
          d={`M 0,15 ${Array.from({ length: 20 }).map((_, i) => {
            const x = (i / 19) * 100;
            const y = Math.sin(i * 0.5) * 10 + 10;
            return `L ${x}%,${y}`;
          }).join(' ')}`}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

const SantaHat = () => {
  return (
    <div className="fixed top-8 right-8 pointer-events-none z-[60] animate-bounce" style={{ animationDuration: '3s' }}>
      <div className="relative w-20 h-20">
        <div className="absolute bottom-0 w-20 h-10 bg-red-600 rounded-b-full shadow-lg" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-600 rotate-45 origin-bottom-left shadow-lg" />
        <div className="absolute -bottom-1 w-20 h-4 bg-white rounded-full shadow-md" />
        <div className="absolute top-0 right-0 w-5 h-5 bg-white rounded-full shadow-md" />
      </div>
    </div>
  );
};

export default NewYearMode;