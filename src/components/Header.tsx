import { Button } from '@/components/ui/button';
import SteamIcon from '@/components/ui/icons/steam';
import Icon from '@/components/ui/icon';
import { useEffect, useState } from 'react';
import authConfig from '@/data/authorization.json';

const Header = () => {
  const [user, setUser] = useState<{ nickname: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authToken = urlParams.get('auth_token');
      
      if (authToken) {
        try {
          const response = await fetch('https://functions.poehali.dev/1209b0b2-d734-418e-8549-797b75d1f0db', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: authToken })
          });
          
          if (response.ok) {
            const data = await response.json();
            if (data.authenticated) {
              const userInfo = { 
                nickname: data.nickname,
                steamId: data.steamId
              };
              localStorage.setItem('steam_user', JSON.stringify(userInfo));
              setUser(userInfo);
              window.history.replaceState({}, '', window.location.pathname);
            }
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }

      const userData = localStorage.getItem('steam_user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          localStorage.removeItem('steam_user');
        }
      }
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://devilrust.ru') return;
      
      if (event.data.type === 'steam_auth_success' && event.data.token) {
        window.location.href = `${window.location.origin}?auth_token=${event.data.token}`;
      }
    };

    checkAuth();
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
      <div className="container flex h-16 items-center justify-between my-2">
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
          <a href="https://wiki.devilrust.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Wiki
          </a>
          <a href="https://devrus.gamestores.app/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Магазин
          </a>
          <a href="https://devilrust.ru/support/" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Поддержка
          </a>
        </nav>

{user ? (
          <Button variant="default" size="lg" asChild className="hidden md:flex shadow-lg transition-all px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white border-0">
            <a 
              href="https://devilrust.ru/profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <Icon name="User" className="mr-2 h-5 w-5" />
              Профиль
            </a>
          </Button>
        ) : (
          <div className="hidden md:flex flex-col items-center gap-2">
            {authConfig.showAuthButton && (
              <Button variant="default" size="lg" asChild className="shadow-lg transition-all px-8 bg-gradient-to-r from-[#06BFFF] via-[#2A3F5F] to-[#06BFFF] steam-animate text-white border-0">
                <a 
                  href="https://devilrust.ru/api/v1/player.login?login" 
                  onClick={handleAuthClick}
                  className="flex items-center"
                >
                  <SteamIcon className="mr-3 h-28 w-28" />
                  Авторизоваться
                </a>
              </Button>
            )}
            {authConfig.showAlreadyAuthorizedLink && (
              <a 
                href="https://devilrust.ru/profile" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                Уже авторизованы?
              </a>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;