import { Button } from '@/components/ui/button';
import SteamIcon from '@/components/ui/icons/steam';
import { useEffect, useState } from 'react';

const Header = () => {
  const [user, setUser] = useState<{ nickname: string } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('steam_user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        localStorage.removeItem('steam_user');
      }
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://devilrust.ru') return;
      
      if (event.data.type === 'steam_auth_success' && event.data.user) {
        const userInfo = { nickname: event.data.user.nickname };
        localStorage.setItem('steam_user', JSON.stringify(userInfo));
        setUser(userInfo);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleAuthClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      const authWindow = window.open(
        'https://devilrust.ru/api/v1/player.login?login',
        'steam_auth',
        'width=800,height=600'
      );
      
      const checkWindow = setInterval(() => {
        if (authWindow?.closed) {
          clearInterval(checkWindow);
        }
      }, 500);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/5">
      <div className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center space-x-2 group">
          <img 
            src="https://s3.regru.cloud/img.devilrust/devilrust_logo.png" 
            alt="DevilRust" 
            className="h-8 w-auto group-hover:drop-shadow-[0_0_12px_rgba(255,68,0,0.6)] transition-all"
          />
          <span className="text-2xl font-bold tracking-wide" style={{fontFamily: 'Nunito, sans-serif', fontStyle: 'italic'}}>DEVILRUST</span>
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Главная
          </a>
          <a href="/banlist" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Банлист
          </a>
          <a href="https://devrus.gamestores.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Магазин
          </a>
          <a href="https://devilrust.ru/support/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Поддержка
          </a>
        </nav>

        <Button variant="default" size="lg" asChild className="hidden md:flex shadow-lg transition-all px-8 bg-gradient-to-r from-[#06BFFF] via-[#2A3F5F] to-[#06BFFF] steam-animate text-white border-0">
          <a 
            href={user ? "https://devilrust.ru/profile" : "https://devilrust.ru/api/v1/player.login?login"} 
            onClick={handleAuthClick}
            className="flex items-center"
          >
            <SteamIcon className="mr-3 h-28 w-28" />
            {user ? user.nickname : 'Авторизоваться'}
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
