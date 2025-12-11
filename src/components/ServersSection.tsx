import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<typeof pveServers[0] | null>(null);

  const handleConnect = (ip: string) => {
    const connectCommand = `connect ${ip}`;
    navigator.clipboard.writeText(connectCommand);
    toast({
      title: "Команда скопирована!",
      description: `${connectCommand} — вставьте в консоль F1`,
    });
  };

  const handleCopyIP = (ip: string) => {
    navigator.clipboard.writeText(ip);
    toast({
      title: "IP скопирован!",
      description: ip,
    });
  };

  const handleShowDetails = (server: typeof pveServers[0]) => {
    setSelectedServer(server);
    setIsDialogOpen(true);
  };

  const getDetailedDescription = (serverId: string) => {
    if (['1', '2', '3', '4', '5'].includes(serverId)) {
      return {
        title: 'Полное описание сервера',
        highlights: [
          { icon: 'Zap', text: 'Увеличенная скорость добычи ресурсов' },
          { icon: 'Users', text: 'Кастомные NPC на всех монументах' },
          { icon: 'Skull', text: 'Уникальные боссы и испытания' },
          { icon: 'Trophy', text: 'Боевой пропуск и мини-соревнования' },
          { icon: 'Gift', text: 'Ежедневные бонусы для игроков' },
          { icon: 'ShoppingCart', text: 'Продвинутая система экономики' },
          { icon: 'Store', text: 'Внутриигровой магазин' },
          { icon: 'Hammer', text: 'Большая система кастомного крафта' },
          { icon: 'Gem', text: 'Кастомные добываемые руды' },
          { icon: 'Package', text: 'Множество кит-наборов' },
          { icon: 'TrendingUp', text: 'Система прокачки навыков и престижа' },
          { icon: 'Backpack', text: 'Дополнительный рюкзак на 144 слота' },
        ],
        description: 'Сервер предлагает уникальный игровой опыт с кастомными NPC, которые добавляют сложности при PVE выживании. Встречайте боссов, участвуйте в кастомных мероприятиях с испытаниями, боевым пропуском и мини-соревнованиями.\n\nПродвинутая система экономики и внутриигровой магазин помогут упростить выживание, а большая система кастомного крафта и кастомные руды позволят воплотить любые фантазии.\n\nОсобенность сервера — система прокачки навыков и уровней престижа, дающая уникальные возможности. Ваш дополнительный рюкзак сохранит до 144 слотов лута на целый год — он не пропадет после смерти и перенесется даже после глобального вайпа!'
      };
    }
    return null;
  };

  const ServerCard = ({ server }: { server: typeof pveServers[0] }) => (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-4xl font-bold text-primary mb-2">{server.id}</div>
          <h3 className="text-lg font-semibold mb-1">{server.name}</h3>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            {server.mode}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Icon name="Server" className="w-4 h-4 text-muted-foreground" />
          <code className="bg-muted px-2 py-1 rounded text-xs flex-1">{server.ip}</code>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCopyIP(server.ip)}
            className="h-7 w-7 p-0"
          >
            <Icon name="Copy" className="w-3 h-3" />
          </Button>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => handleConnect(server.ip)}
          className="flex-1"
          size="sm"
        >
          <Icon name="Gamepad2" className="w-4 h-4 mr-2" />
          Подключиться
        </Button>
        <Button
          onClick={() => handleShowDetails(server)}
          variant="outline"
          size="sm"
        >
          <Icon name="Info" className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <section id="servers" className="py-20 bg-muted/20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 glow-text">
            Наши серверы
          </h2>
          <p className="text-muted-foreground text-lg max-w-[900px] mx-auto leading-relaxed">
            Выберите сервер по своему стилю игры. Каждый предлагает уникальный опыт.
          </p>
          <div className="mt-6 max-w-[800px] mx-auto space-y-3 text-left">
            <div className="flex gap-3 items-start">
              <span className="text-green-500 font-bold mt-1">•</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">PVE сервера</span> — игрок против окружения. Противостойте NPC, боссам и механикам мира.
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="text-red-500 font-bold mt-1">•</span>
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">PVP сервера</span> — игрок против игрока. Соревнуйтесь с другими игроками в битве за выживание.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto space-y-12">
          {/* PVE Servers Grid */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Shield" className="w-6 h-6 text-green-500" />
              PVE Серверы:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pveServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>

          {/* PVP Servers Grid */}
          <div className="animate-fade-in">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Icon name="Swords" className="w-6 h-6 text-red-500" />
              PVP Серверы
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pvpServers.map((server) => (
                <ServerCard key={server.id} server={server} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedServer?.name}</DialogTitle>
            <DialogDescription className="text-base">
              {selectedServer?.description}
            </DialogDescription>
          </DialogHeader>

          {selectedServer && getDetailedDescription(selectedServer.id) && (
            <div className="space-y-6 mt-4">
              <div>
                <h4 className="text-lg font-semibold mb-4">
                  {getDetailedDescription(selectedServer.id)?.title}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {getDetailedDescription(selectedServer.id)?.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <Icon name={highlight.icon as any} className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{highlight.text}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {getDetailedDescription(selectedServer.id)?.description}
                </p>
              </div>

              {selectedServer.features && (
                <div>
                  <h4 className="text-lg font-semibold mb-3">Особенности:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedServer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleConnect(selectedServer.ip)}
                  className="flex-1"
                >
                  <Icon name="Gamepad2" className="w-4 h-4 mr-2" />
                  Подключиться к серверу
                </Button>
              </div>
            </div>
          )}

          {selectedServer && !getDetailedDescription(selectedServer.id) && selectedServer.features && (
            <div className="space-y-6 mt-4">
              <div>
                <h4 className="text-lg font-semibold mb-3">Особенности:</h4>
                <ul className="space-y-2">
                  {selectedServer.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => handleConnect(selectedServer.ip)}
                  className="flex-1"
                >
                  <Icon name="Gamepad2" className="w-4 h-4 mr-2" />
                  Подключиться к серверу
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ServersSection;
