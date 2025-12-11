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
                    <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.44c-.45.45-1.03.68-1.74.68-1.01 0-1.76-.53-2.87-1.62-.81-.8-1.41-1.4-2.03-1.4-.11 0-.26.02-.44.08-.52.17-.81.53-.81 1.02 0 .85.44 1.47 1.38 1.95.4.21.59.42.59.65 0 .31-.27.56-.62.56-1.21 0-2.34-1.28-3.23-3.65-.63-1.67-.95-3.57-.95-5.65 0-.55.45-1 1-1s1 .45 1 1c0 1.63.25 3.14.73 4.38.18.47.38.88.59 1.24.09-.39.14-.8.14-1.24 0-2.21-.9-3.14-1.91-3.14-.35 0-.64.25-.64.56 0 .23.19.44.59.65.94.48 1.38 1.1 1.38 1.95 0 .49-.29.85-.81 1.02-.18.06-.33.08-.44.08-.62 0-1.22-.6-2.03-1.4-1.11-1.09-1.86-1.62-2.87-1.62-.71 0-1.29.23-1.74.68-.44.44-.66 1.08-.66 1.93 0 1.96.84 3.54 2.37 4.45.3.18.59.27.86.27.39 0 .7-.18.9-.53.14-.26.2-.56.2-.89 0-.54-.12-.99-.36-1.35.48-.21.86-.32 1.12-.32.37 0 .7.15 1 .47.29.32.43.73.43 1.2 0 .47-.14.88-.43 1.2-.3.32-.63.47-1 .47-.26 0-.64-.11-1.12-.32.24-.36.36-.81.36-1.35 0-.33-.06-.63-.2-.89-.2-.35-.51-.53-.9-.53-.27 0-.56.09-.86.27-1.53.91-2.37 2.49-2.37 4.45 0 .85.22 1.49.66 1.93z"/>
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