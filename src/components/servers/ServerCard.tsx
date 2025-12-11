import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import type { Server } from './serversData';

interface ServerCardProps {
  server: Server;
  onConnect: (ip: string) => void;
  onCopyIP: (ip: string) => void;
  onShowDetails: (server: Server) => void;
}

const ServerCard = ({ server, onConnect, onCopyIP, onShowDetails }: ServerCardProps) => {
  const isPVE = server.mode.includes('PVE');
  const cardColor = isPVE ? 'from-primary/10 to-primary/5' : 'from-red-500/10 to-red-500/5';
  const borderColor = isPVE ? 'border-primary/30' : 'border-red-500/30';
  const badgeColor = isPVE ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500';
  const iconColor = isPVE ? 'text-primary' : 'text-red-500';

  return (
    <div className={`group relative overflow-hidden rounded-xl border ${borderColor} bg-gradient-to-br ${cardColor} p-6 transition-all hover:shadow-xl hover:shadow-primary/10`}>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/50 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-xl font-bold tracking-wide" style={{fontFamily: 'Nunito, sans-serif'}}>
              {server.name}
            </h3>
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${badgeColor}`}>
              {server.mode}
            </span>
          </div>
          <Icon name="Server" className={`h-8 w-8 ${iconColor} transition-transform group-hover:scale-110`} />
        </div>

        <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
          {server.description}
        </p>

        <div className="mb-4 space-y-2">
          {server.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <Icon name="Check" className={`h-4 w-4 ${iconColor}`} />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mb-4 flex items-center gap-2 rounded-lg bg-background/50 p-3 backdrop-blur-sm">
          <Icon name="Globe" className="h-4 w-4 text-muted-foreground" />
          <code className="flex-1 text-sm font-mono">{server.ip}</code>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onCopyIP(server.ip)}
            className="h-8 w-8 p-0"
          >
            <Icon name="Copy" className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Button 
            className="flex-1 font-semibold uppercase tracking-wider" 
            onClick={() => onConnect(server.ip)}
          >
            <Icon name="Rocket" className="mr-2 h-4 w-4" />
            Играть
          </Button>
          <Button 
            variant="outline" 
            className={`${borderColor} hover:bg-primary/10`}
            onClick={() => onShowDetails(server)}
          >
            <Icon name="Info" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;
