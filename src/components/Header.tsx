import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg shadow-primary/5">
      <div className="container flex h-16 items-center justify-between">
        <a href="https://devilrust.ru" className="flex items-center space-x-2 group">
          <img 
            src="https://s3.regru.cloud/img.devilrust/devilrust_logo.png" 
            alt="DevilRust" 
            className="h-8 w-auto group-hover:drop-shadow-[0_0_12px_rgba(255,68,0,0.6)] transition-all"
          />
          <span className="text-2xl font-bold tracking-wide">DevilRust</span>
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Главная
          </a>
          <a href="https://1.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Магазин
          </a>
          <a href="https://2.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Скачать лаунчер
          </a>
          <a href="https://3.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors uppercase tracking-wider">
            Поддержка
          </a>
        </nav>

        <Button variant="default" size="sm" asChild className="hidden md:flex shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all">
          <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
            <Icon name="Download" className="mr-2 h-4 w-4" />
            Играть
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;