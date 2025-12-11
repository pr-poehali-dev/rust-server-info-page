import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

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
  },
  {
    id: '6',
    name: '#6 [PVE] DevilRust EASYBUILD',
    mode: 'PVE EasyBuild',
    ip: '62.122.214.220:6000',
    description: 'Креативный режим для строительства без ограничений. Безлимитные ресурсы, полёт и возможность создать любую постройку.',
    features: ['Упрощенное строительство', 'Больше ресурсов', 'PVE режим', 'Сохранение построек']
  },
  {
    id: '7',
    name: '#7 [PVE] DevilRust VANILLA',
    mode: 'PVE Vanilla',
    ip: '62.122.214.220:7000',
    description: 'Экстремально модифицированный сервер со стократным ускорением. Максимальный хаос, мгновенный фарм и эпичные рейды.',
    features: ['Ванильный опыт', 'Без модов', 'Классический геймплей', 'PVE режим']
  }
];

const pvpServers = [
  {
    id: '8',
    name: '#8 [PVP] DevilRust - MODDED | x2 | DUO',
    mode: 'PVP Modded x2',
    ip: '62.122.214.220:8000',
    description: 'Ролевой сервер с уникальными правилами и экономикой. Создавайте свои истории, торгуйте, стройте поселения.',
    features: ['PVP режим', 'Скорость сбора x2', 'Только DUO', 'Модифицированный']
  },
  {
    id: '9',
    name: '#9 [PVP] DevilRust - MODDED | x2 | NOLIM',
    mode: 'PVP Modded x2',
    ip: '62.122.214.220:9000',
    description: 'Долгоиграющий сервер с редкими вайпами. Для тех, кто любит строить большие проекты и развиваться долгосрочно.',
    features: ['PVP режим', 'Скорость сбора x2', 'Без ограничений команд', 'Модифицированный']
  }
];

const ServersSection = () => {
  const { toast } = useToast();

  const handleConnect = (ip: string) => {
    const connectCommand = `connect ${ip}`;
    navigator.clipboard.writeText(connectCommand);
    toast({
      title: "Команда скопирована!",
      description: `${connectCommand} — вставьте в консоль F1`,
    });
  };

  return (
    <section id="servers" className="py-20 bg-muted/20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 glow-text">
            Наши серверы
          </h2>
          <p className="text-muted-foreground text-lg max-w-[900px] mx-auto">Выберите сервер по своему стилю игры. Каждый предлагает уникальный опыт. 
PVE сервера - Означают «игрок против окружения», в этом режиме игрок противостоит окружению: NPC, боссам, механикам мира.
PVP сервера - Означают «игрок против игрока», в этом режиме игроки соревнуются друг с другом и друг против друга.</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/50 shadow-lg shadow-green-500/20">
              <Icon name="Shield" className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">PVE Серверы:</h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {pveServers.map((server, index) => (
              <AccordionItem
                key={server.id}
                value={server.id}
                className="game-card rounded-lg overflow-hidden hover:border-green-500/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-green-500/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 font-bold text-xl">
                      {server.id}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{server.name}</h3>
                      <p className="text-sm text-muted-foreground">{server.mode}</p>
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

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all" onClick={() => handleConnect(server.ip)}>
                        <Icon name="Gamepad2" className="mr-2 h-4 w-4" />
                        Подключиться
                      </Button>
                      <Button variant="outline" className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
                        <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                          <Icon name="Info" className="mr-2 h-4 w-4" />
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
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-destructive/20 border border-destructive/50 shadow-lg shadow-destructive/20">
              <Icon name="Swords" className="h-5 w-5 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold">PVP Серверы</h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {pvpServers.map((server, index) => (
              <AccordionItem
                key={server.id}
                value={server.id}
                className="game-card rounded-lg overflow-hidden hover:border-destructive/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-destructive/5 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-destructive/20 text-destructive font-bold text-xl">
                      {server.id}
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{server.name}</h3>
                      <p className="text-sm text-muted-foreground">{server.mode}</p>
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

                    <div className="pt-4 flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all" onClick={() => handleConnect(server.ip)}>
                        <Icon name="Gamepad2" className="mr-2 h-4 w-4" />
                        Подключиться
                      </Button>
                      <Button variant="outline" className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10" asChild>
                        <a href="https://devilrust.ru" target="_blank" rel="noopener noreferrer">
                          <Icon name="Info" className="mr-2 h-4 w-4" />
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
  );
};

export default ServersSection;