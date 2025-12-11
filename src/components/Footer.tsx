import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-12 bg-card/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4 group">
              <Icon name="Flame" className="h-6 w-6 text-primary group-hover:drop-shadow-[0_0_8px_rgba(255,68,0,0.8)] transition-all" />
              <span className="text-xl font-bold tracking-wide">DevilRust</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Лучшие Rust серверы в СНГ. Присоединяйтесь к тысячам игроков уже сегодня!
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">Быстрые ссылки</h3>
            <div className="space-y-2 text-sm">
              <a href="https://devilrust.ru/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Магазин
              </a>
              <a href="https://ulauncher.lol/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Скачать лаунчер
              </a>
              <a href="https://devilrust.ru/support" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Поддержка
              </a>
              <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Главный сайт
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">Социальные сети</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://vk.com/devilrustvk" target="_blank" rel="noopener noreferrer">
                  <Icon name="MessageCircle" className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://t.me/devilrust" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://devilrust.ru/" target="_blank" rel="noopener noreferrer">
                  <Icon name="Globe" className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">© 2018 DevilRust. Все права защищены.</div>
      </div>
    </footer>
  );
};

export default Footer;