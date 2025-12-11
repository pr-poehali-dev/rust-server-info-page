import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HowToStartSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="container relative z-10">
        <Card className="max-w-3xl mx-auto glow-border bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shadow-lg shadow-primary/30">
                <Icon name="Rocket" className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl glow-text">Как начать играть?</CardTitle>
            <CardDescription className="text-base">
              Следуйте простым шагам, чтобы присоединиться к нашему сообществу
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg shadow-primary/50">
                  1
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold mb-1">Купите игру в Steam или скачайте Лаунчер</h4>
                  <p className="text-sm text-muted-foreground">
                    Мы не поддерживаем пиратство и советуем купить игру на площадке STEAM, во избежании проблем с подключением к нашим серверам.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg shadow-primary/50">
                  2
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold mb-1">Выберите сервер</h4>
                  <p className="text-sm text-muted-foreground">
                    Из списка выше выберите сервер, который соответствует вашему стилю игры
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-lg bg-muted/20 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg shadow-primary/50">
                  3
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold mb-1">Подключитесь и играйте</h4>
                  <p className="text-sm text-muted-foreground">
                    Запустите игру через лаунчер и начните своё приключение на DevilRust!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 shadow-lg shadow-primary/40 hover:shadow-primary/60 transition-all" asChild>
                <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Download" className="mr-2 h-5 w-5" />
                  Скачать лаунчер
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
                <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">Посетить Донат магазин</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowToStartSection;