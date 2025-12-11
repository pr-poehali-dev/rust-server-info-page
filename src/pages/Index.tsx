import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

const pveServers = [
  {
    id: '1',
    name: '#1 [PVE] DevilRust X3',
    mode: 'PVE x3',
    ip: '62.122.214.220:10000',
    description: 'Классический Rust с удвоенной скоростью сбора ресурсов. Идеально подходит для тех, кто ценит оригинальный геймплей, но хочет немного ускорить прогресс.',
    features: [
      'Скорость сбора x3',
      'Вайп 1 раз в месяц',
      'Большой набор баз для рейдов',
      'Кастомные руды',
      'Виртуальные карьеры',
      'Система экономики с внутриигровым магазином',
      'Кит наборы',
      'Продвинутое внутриигровое меню',
      'Бесплатный донат за топ или мини ивенты'
    ],
    online: '156/200'
  },
  {
    id: '2',
    name: '#2 [PVE] DevilRust X5',
    mode: 'PVE x5',
    ip: '62.122.214.220:1000',
    description: 'Сервер для команд до 3 игроков с пятикратным ускорением фарма. Динамичный геймплей и быстрое развитие для любителей командной игры.',
    features: [
      'Скорость сбора x5',
      'Вайп 1 раз в месяц',
      'Большой набор баз для рейдов',
      'Кастомные руды',
      'Виртуальные карьеры',
      'Система экономики с внутриигровым магазином',
      'Кит наборы',
      'Продвинутое внутриигровое меню',
      'Бесплатный донат за топ или мини ивенты'
    ],
    online: '142/150'
  },
  {
    id: '3',
    name: '#3 [PVE] DevilRust X8',
    mode: 'PVE x8',
    ip: '62.122.214.220:3000',
    description: 'Сервер для одиночек и пар с максимальной скоростью прогресса. Здесь можно быстро построить базу и начать рейдить уже в первый день.',
    features: [
      'Скорость сбора x8',
      'Вайп 1 раз в месяц',
      'Большой набор баз для рейдов',
      'Кастомные руды',
      'Виртуальные карьеры',
      'Система экономики с внутриигровым магазином',
      'Кит наборы',
      'Продвинутое внутриигровое меню',
      'Бесплатный донат за топ или мини ивенты'
    ],
    online: '178/200'
  },
  {
    id: '4',
    name: '#4 [PVE] DevilRust X10',
    mode: 'PVE x10',
    ip: '62.122.214.220:4000',
    description: 'Арена для PvP сражений с готовым лутом и моментальным респавном. Тренируйте навыки боя и соревнуйтесь с лучшими игроками.',
    features: [
      'Скорость сбора x10',
      'Вайп 1 раз в месяц',
      'Большой набор баз для рейдов',
      'Кастомные руды',
      'Виртуальные карьеры',
      'Система экономики с внутриигровым магазином',
      'Кит наборы',
      'Продвинутое внутриигровое меню',
      'Бесплатный донат за топ или мини ивенты'
    ],
    online: '89/100'
  },
  {
    id: '5',
    name: '#5 [PVE] DevilRust X20',
    mode: 'PVE x20',
    ip: '62.122.214.220:5000',
    description: 'Кооперативный сервер с зомби-апокалипсисом. Объединяйтесь с другими игроками, чтобы выжить против орд нежити.',
    features: [
      'Скорость сбора x20',
      'Вайп 1 раз в месяц',
      'Большой набор баз для рейдов',
      'Кастомные руды',
      'Виртуальные карьеры',
      'Система экономики с внутриигровым магазином',
      'Кит наборы',
      'Продвинутое внутриигровое меню',
      'Бесплатный донат за топ или мини ивенты'
    ],
    online: '67/100'
  },
  {
    id: '6',
    name: '#6 [PVE] DevilRust EASYBUILD',
    mode: 'PVE EasyBuild',
    ip: '62.122.214.220:6000',
    description: 'Креативный режим для строительства без ограничений. Безлимитные ресурсы, полёт и возможность создать любую постройку.',
    features: ['Упрощенное строительство', 'Больше ресурсов', 'PVE режим', 'Сохранение построек'],
    online: '34/50'
  },
  {
    id: '7',
    name: '#7 [PVE] DevilRust VANILLA',
    mode: 'PVE Vanilla',
    ip: '62.122.214.220:7000',
    description: 'Экстремально модифицированный сервер со стократным ускорением. Максимальный хаос, мгновенный фарм и эпичные рейды.',
    features: ['Ванильный опыт', 'Без модов', 'Классический геймплей', 'PVE режим'],
    online: '195/250'
  }
];

const pvpServers = [
  {
    id: '8',
    name: '#8 [PVP] DevilRust - MODDED | x2 | DUO',
    mode: 'PVP Modded x2',
    ip: '62.122.214.220:8000',
    description: 'Ролевой сервер с уникальными правилами и экономикой. Создавайте свои истории, торгуйте, стройте поселения.',
    features: ['PVP режим', 'Скорость сбора x2', 'Только DUO', 'Модифицированный'],
    online: '78/150'
  },
  {
    id: '9',
    name: '#9 [PVP] DevilRust - MODDED | x2 | NOLIM',
    mode: 'PVP Modded x2',
    ip: '62.122.214.220:9000',
    description: 'Долгоиграющий сервер с редкими вайпами. Для тех, кто любит строить большие проекты и развиваться долгосрочно.',
    features: ['PVP режим', 'Скорость сбора x2', 'Без ограничений команд', 'Модифицированный'],
    online: '123/200'
  }
];

const Index = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
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

      <section className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-background to-background" />
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Добро пожаловать на
                <span className="block text-primary mt-2">DevilRust Servers</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl">
                9 уникальных серверов для каждого стиля игры. От хардкорного ванильного опыта до безумного модифицированного веселья.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg" asChild>
                <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
                  <Icon name="Download" className="mr-2 h-5 w-5" />
                  Скачать лаунчер
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-lg" asChild>
                <a href="#servers">
                  <Icon name="Server" className="mr-2 h-5 w-5" />
                  Выбрать сервер
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary">9</div>
                <div className="text-sm text-muted-foreground">Серверов</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Игроков онлайн</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-4xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Работаем</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servers" className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Наши серверы
            </h2>
            <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
              Выберите сервер по своему стилю игры. Каждый предлагает уникальный опыт.
            </p>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/50">
                <Icon name="Shield" className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold">PVE Серверы</h3>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {pveServers.map((server, index) => (
                <AccordionItem
                  key={server.id}
                  value={server.id}
                  className="border border-border rounded-lg overflow-hidden bg-card hover:border-green-500/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-bold text-xl">
                          {server.id}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold">{server.name}</h3>
                          <p className="text-sm text-muted-foreground">{server.mode}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-medium">{server.online}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {server.description}
                      </p>

                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-green-500/30">
                        <Icon name="Globe" className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">IP-адрес сервера:</div>
                          <code className="text-sm font-mono text-foreground select-all">{server.ip}</code>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(server.ip)}
                          className="flex-shrink-0"
                        >
                          <Icon name="Copy" className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {server.features.map((feature, idx) => {
                          let icon = 'CheckCircle2';
                          if (feature.includes('экономики') || feature.includes('магазином')) icon = 'ShoppingCart';
                          else if (feature.includes('донат') || feature.includes('топ')) icon = 'Gift';
                          else if (feature.includes('карьеры')) icon = 'Pickaxe';
                          else if (feature.includes('руды')) icon = 'Gem';
                          else if (feature.includes('меню')) icon = 'Settings';
                          else if (feature.includes('Кит')) icon = 'Package';
                          else if (feature.includes('Вайп')) icon = 'Calendar';
                          else if (feature.includes('рейдов')) icon = 'Castle';
                          
                          return (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Icon name={icon} className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex gap-3">
                        <Button className="flex-1" asChild>
                          <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
                            <Icon name="Gamepad2" className="mr-2 h-4 w-4" />
                            Подключиться
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                            Подробнее
                          </a>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/50">
                <Icon name="Swords" className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold">PVP Серверы</h3>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-4">
              {pvpServers.map((server, index) => (
                <AccordionItem
                  key={server.id}
                  value={server.id}
                  className="border border-border rounded-lg overflow-hidden bg-card hover:border-destructive/50 transition-colors"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 text-destructive font-bold text-xl">
                          {server.id}
                        </div>
                        <div className="text-left">
                          <h3 className="text-xl font-bold">{server.name}</h3>
                          <p className="text-sm text-muted-foreground">{server.mode}</p>
                        </div>
                      </div>
                      <div className="hidden sm:flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="font-medium">{server.online}</span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="pt-4 space-y-4">
                      <p className="text-muted-foreground leading-relaxed">
                        {server.description}
                      </p>

                      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-destructive/30">
                        <Icon name="Globe" className="h-5 w-5 text-destructive flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-xs text-muted-foreground mb-1">IP-адрес сервера:</div>
                          <code className="text-sm font-mono text-foreground select-all">{server.ip}</code>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => navigator.clipboard.writeText(server.ip)}
                          className="flex-shrink-0"
                        >
                          <Icon name="Copy" className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {server.features.map((feature, idx) => {
                          let icon = 'CheckCircle2';
                          if (feature.includes('PVP')) icon = 'Swords';
                          else if (feature.includes('DUO')) icon = 'Users';
                          else if (feature.includes('NOLIM') || feature.includes('ограничений')) icon = 'Infinity';
                          else if (feature.includes('Модифицированный')) icon = 'Wrench';
                          else if (feature.includes('Скорость')) icon = 'Zap';
                          
                          return (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Icon name={icon} className="h-4 w-4 text-destructive flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="pt-4 flex gap-3">
                        <Button className="flex-1" asChild>
                          <a href="https://2.ru" target="_blank" rel="noopener noreferrer">
                            <Icon name="Gamepad2" className="mr-2 h-4 w-4" />
                            Подключиться
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                            Подробнее
                          </a>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

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

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-8 right-8 z-50 shadow-lg"
          aria-label="Наверх"
        >
          <Icon name="ArrowUp" className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
};

export default Index;