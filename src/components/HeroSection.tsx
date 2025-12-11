import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  const [totalPlayers, setTotalPlayers] = useState<number | null>(null);
  const [displayPlayers, setDisplayPlayers] = useState<number>(0);
  const [coinRain, setCoinRain] = useState(false);

  useEffect(() => {
    const serverIds = [
      '30367639', '30367642', '30367644', '30367643', '33982243',
      '34635173', '35130037', '36442240', '30367639'
    ];

    const fetchTotalPlayers = async () => {
      let total = 0;
      
      for (const bmId of serverIds) {
        try {
          const response = await fetch(`https://api.battlemetrics.com/servers/${bmId}`);
          const data = await response.json();
          total += data.data.attributes.players || 0;
        } catch (error) {
          console.error(`Failed to fetch stats for server ${bmId}:`, error);
        }
      }
      
      setTotalPlayers(total);
    };

    fetchTotalPlayers();
    const interval = setInterval(fetchTotalPlayers, 60000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (totalPlayers === null) return;
    
    const duration = 800;
    const steps = 40;
    const increment = (totalPlayers - displayPlayers) / steps;
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayPlayers(totalPlayers);
        clearInterval(timer);
      } else {
        setDisplayPlayers(prev => Math.round(prev + increment));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [totalPlayers]);

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {coinRain && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 30 }).map((_, i) => (
            <Icon
              key={i}
              name={['Coins', 'DollarSign', 'CircleDollarSign', 'BadgeDollarSign'][i % 4] as any}
              className="absolute text-yellow-400 opacity-[0.08] coin-fall"
              style={{
                left: `${(i * 3.33) % 100}%`,
                width: `${20 + (i % 3) * 10}px`,
                height: `${20 + (i % 3) * 10}px`,
                animationDelay: `${(i % 10) * 0.3}s`,
                animationDuration: `${3 + (i % 5) * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-background" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-destructive/10 rounded-full blur-[128px]" />
      </div>
      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl glow-text">
              Добро пожаловать на
              <span className="block text-primary mt-2 drop-shadow-[0_0_25px_rgba(255,68,0,0.5)]">DevilRust</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
              9 уникальных серверов для каждого стиля игры. От хардкорного ванильного опыта до безумного модифицированного веселья.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105 transition-all group" asChild>
                <a href="#how-to-start">
                  <Icon name="Play" className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Как начать играть
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg border-primary/30 hover:border-primary hover:bg-primary/10 h-auto" asChild>
                <a href="#servers">
                  <Icon name="Server" className="mr-2 h-5 w-5" />
                  Выбрать сервер
                </a>
              </Button>
            </div>
            <Button 
              size="lg" 
              variant="default" 
              className="text-lg diamond-shine relative overflow-hidden border-0" 
              asChild
              onMouseEnter={() => setCoinRain(true)}
              onMouseLeave={() => setCoinRain(false)}
            >
              <a 
                href="https://devilrust.ru" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="relative z-10"
                onMouseEnter={() => setCoinRain(true)}
                onMouseLeave={() => setCoinRain(false)}
              >
                <div className="absolute inset-0 opacity-[0.25] pointer-events-none">
                  <Icon name="Coins" className="absolute top-2 left-4 w-7 h-7 text-yellow-300" />
                  <Icon name="DollarSign" className="absolute bottom-2 right-4 w-9 h-9 text-yellow-200" />
                  <Icon name="Gem" className="absolute top-1/2 left-1/4 -translate-y-1/2 w-6 h-6 text-amber-300" />
                  <Icon name="BadgeDollarSign" className="absolute top-3 right-8 w-8 h-8 text-yellow-400" />
                  <Icon name="CircleDollarSign" className="absolute bottom-3 left-8 w-7 h-7 text-amber-400" />
                </div>
                <Icon name="ShoppingBag" className="mr-2 h-5 w-5" />
                Донат магазин
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center p-4 rounded-lg glow-border bg-card/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary glow-text">9</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Серверов</div>
            </div>
<div className="flex flex-col items-center p-4 rounded-lg glow-border bg-card/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary glow-text transition-all duration-300">
                {totalPlayers !== null ? displayPlayers : '...'}
              </div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Игроков онлайн</div>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg glow-border bg-card/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary glow-text">24/7</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Работаем</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;