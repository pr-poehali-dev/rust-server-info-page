import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { pveServers, pvpServers, type SortType, type FilterType, type Server } from './servers/serversData';
import ServerCard from './servers/ServerCard';
import ServerDetailsDialog from './servers/ServerDetailsDialog';

const ServersSection = () => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [sortBy, setSortBy] = useState<SortType>('number');
  const [filterBy, setFilterBy] = useState<FilterType>('all');

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

  const handleShowDetails = (server: Server) => {
    setSelectedServer(server);
    setIsDialogOpen(true);
  };

  const extractRate = (mode: string): number => {
    const match = mode.match(/x(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  const allServers = [...pveServers, ...pvpServers];
  
  const filteredServers = allServers.filter(server => {
    if (filterBy === 'all') return true;
    if (filterBy === 'pve') return server.mode.includes('PVE');
    if (filterBy === 'pvp') return server.mode.includes('PVP');
    return true;
  });

  const sortedServers = [...filteredServers].sort((a, b) => {
    if (sortBy === 'number') return parseInt(a.id) - parseInt(b.id);
    if (sortBy === 'rate-asc') return extractRate(a.mode) - extractRate(b.mode);
    if (sortBy === 'rate-desc') return extractRate(b.mode) - extractRate(a.mode);
    return 0;
  });

  return (
    <section id="servers" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,68,0,0.1),transparent_50%)]" />
      <div className="container relative z-10">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wide" style={{fontFamily: 'Nunito, sans-serif', fontStyle: 'italic'}}>
            Наши серверы
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите сервер, который подходит именно вам. От классического геймплея до экстремальных модификаций.
          </p>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Фильтр:</span>
            <Select value={filterBy} onValueChange={(value) => setFilterBy(value as FilterType)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Все серверы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все серверы</SelectItem>
                <SelectItem value="pve">PVE</SelectItem>
                <SelectItem value="pvp">PVP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Сортировка:</span>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="По номеру" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="number">По номеру</SelectItem>
                <SelectItem value="rate-asc">По рейту (возр.)</SelectItem>
                <SelectItem value="rate-desc">По рейту (убыв.)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedServers.map((server) => (
            <ServerCard
              key={server.id}
              server={server}
              onConnect={handleConnect}
              onCopyIP={handleCopyIP}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>
      </div>

      <ServerDetailsDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        server={selectedServer}
        onConnect={handleConnect}
        onCopyIP={handleCopyIP}
      />
    </section>
  );
};

export default ServersSection;
