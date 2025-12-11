import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-12 bg-card/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5" />
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <a href="/" className="flex items-center space-x-2 mb-4 group">
              <img 
                src="https://s3.regru.cloud/img.devilrust/devilrust_logo.png" 
                alt="DevilRust" 
                className="h-6 w-auto group-hover:drop-shadow-[0_0_8px_rgba(255,68,0,0.8)] transition-all"
              />
              <span className="text-xl font-bold tracking-wide" style={{fontFamily: 'Nunito, sans-serif', fontStyle: 'italic'}}>DevilRust</span>
            </a>
            <p className="text-sm text-muted-foreground">Лучшие Rust серверы в СНГ. Присоединяйтесь к лучшему проекту уже сегодня!</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">Быстрые ссылки</h3>
            <div className="space-y-2 text-sm">
              <a href="https://devrus.gamestores.app/" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Магазин
              </a>

              <a href="https://devrus.gamestores.app/support" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground hover:text-primary transition-colors hover:translate-x-1 transform">
                Поддержка
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">Социальные сети</h3>
            <div className="flex gap-3">
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://vk.com/devilrustvk" target="_blank" rel="noopener noreferrer">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.5 24h1c5.44 0 8.15 0 9.83-1.68C24 20.64 24 17.92 24 12.5v-1.02c0-5.4 0-8.12-1.67-9.8C20.65 0 17.93 0 12.5 0h-1C6.06 0 3.35 0 1.67 1.68 0 3.36 0 6.08 0 11.5v1.02c0 5.4 0 8.12 1.68 9.8C3.36 24 6.08 24 11.5 24Z"/>
                  </svg>
                </a>
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://t.me/devilrust" target="_blank" rel="noopener noreferrer">
                  <Icon name="Send" className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="outline" size="icon" className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all" asChild>
                <a href="https://devrus.gamestores.app/" target="_blank" rel="noopener noreferrer">
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