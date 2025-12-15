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
    </>
  );
};

const Snowflakes = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {Array.from({ length: 150 }).map((_, i) => {
        const startX = -20 + Math.random() * 70;
        const endX = startX + 30 + Math.random() * 60;
        const drift = (Math.random() - 0.5) * 40;
        
        return (
          <div
            key={i}
            className="snowflake absolute text-white opacity-80"
            style={{
              left: `${startX}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              fontSize: `${8 + Math.random() * 12}px`,
              '--end-x': `${endX}%`,
              '--drift': `${drift}px`,
            } as React.CSSProperties}
          >
            ❄
          </div>
        );
      })}
      <style>{`
        @keyframes snowfall {
          0% {
            transform: translate(0, -20vh) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.8;
          }
          95% {
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(var(--end-x) - var(--start-x, 0px) + var(--drift)), 120vh) rotate(720deg);
            opacity: 0;
          }
        }
        .snowflake {
          animation: snowfall linear infinite;
          --start-x: 0px;
        }
      `}</style>
    </div>
  );
};


export default NewYearMode;