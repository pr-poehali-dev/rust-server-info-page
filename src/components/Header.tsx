import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <a href="https://devilrust.ru" className="flex items-center space-x-2">
          <Icon name="Flame" className="h-6 w-6 text-primary" />
          <span className="text-2xl font-bold">DevilRust</span>
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Главная
          </a>
          <a href="https://1.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Магазин
          </a>
          <a href="https://2.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Скачать лаунчер
          </a>
          <a href="https://3.ru" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Поддержка
          </a>
        </nav>

        <Button variant="default" size="sm" asChild className="hidden md:flex">
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
