import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const HowToStartSection = () => {
  return (
    <section className="py-20">
      <div className="container">
        <Card className="max-w-3xl mx-auto border-primary/50 shadow-lg shadow-primary/10">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Rocket" className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Как начать играть?</CardTitle>
            <CardDescription className="text-base">
              Следуйте простым шагам, чтобы присоединиться к нашему сообществу
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold mb-1">Скачайте лаунчер</h4>
                  <p className="text-sm text-muted-foreground">
                    Перейдите на страницу загрузки и установите официальный лаунчер DevilRust
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold mb-1">Выберите сервер</h4>
                  <p className="text-sm text-muted-foreground">
                    Из списка выше выберите сервер, который соответствует вашему стилю игры
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
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
              <Button size="lg" className="flex-1" asChild>
                <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Download" className="mr-2 h-5 w-5" />
                  Скачать лаунчер
                </a>
              </Button>
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Globe" className="mr-2 h-5 w-5" />
                  Посетить сайт
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HowToStartSection;
