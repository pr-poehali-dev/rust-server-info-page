import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const HeroSection = () => {
  const [totalPlayers, setTotalPlayers] = useState<number | null>(null);

  useEffect(() => {
    const fetchTotalPlayers = async () => {
      try {
        const serverUrls = [
          'https://rust-servers.ru/web/json-3774.json',
          'https://rust-servers.ru/web/json-3662.json',
          'https://rust-servers.ru/web/json-3671.json',
          'https://rust-servers.ru/web/json-3725.json',
          'https://rust-servers.ru/web/json-3805.json'
        ];
        
        const responses = await Promise.all(
          serverUrls.map(url => fetch(url).then(res => res.json()).catch(() => ({ players: 0 })))
        );
        
        const total = responses.reduce((sum, server) => sum + (server.players || 0), 0);
        
        setTotalPlayers(total);
      } catch (error) {
        console.error('Failed to fetch total players:', error);
        setTotalPlayers(0);
      }
    };

    fetchTotalPlayers();
    const interval = setInterval(fetchTotalPlayers, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
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

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg shadow-lg shadow-primary/50 hover:shadow-primary/70 hover:scale-105 transition-all group" asChild>
              <a href="#how-to-start">
                <Icon name="Play" className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Как начать играть
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
              <a href="#servers">
                <Icon name="Server" className="mr-2 h-5 w-5" />
                Выбрать сервер
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8">
            <div className="flex flex-col items-center p-4 rounded-lg glow-border bg-card/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary glow-text">9</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Серверов</div>
            </div>
<div className="flex flex-col items-center p-4 rounded-lg glow-border bg-card/50 backdrop-blur-sm">
              <div className="text-4xl font-bold text-primary glow-text">
                {totalPlayers !== null ? totalPlayers : '...'}
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