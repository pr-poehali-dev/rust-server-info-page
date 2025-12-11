import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-border/40 py-12 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Flame" className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">DevilRust</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Лучшие Rust серверы в СНГ. Присоединяйтесь к тысячам игроков уже сегодня!
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Быстрые ссылки</h3>
            <div className="space-y-2 text-sm">
              <a href="https://1.ru" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Магазин
              </a>
              <a href="https://2.ru" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Скачать лаунчер
              </a>
              <a href="https://3.ru" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Поддержка
              </a>
              <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors">
                Главный сайт
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Социальные сети</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" asChild>
                <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Youtube" className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Globe" className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © 2024 DevilRust. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
