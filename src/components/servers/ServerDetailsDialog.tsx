import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import type { Server } from './serversData';
import { getDetailedDescription } from './serversData';

interface ServerDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  server: Server | null;
  onConnect: (ip: string) => void;
  onCopyIP: (ip: string) => void;
}

const ServerDetailsDialog = ({ isOpen, onClose, server, onConnect, onCopyIP }: ServerDetailsDialogProps) => {
  if (!server) return null;

  const detailedInfo = getDetailedDescription(server.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{server.name}</DialogTitle>
          <DialogDescription className="text-base">
            {server.description}
          </DialogDescription>
        </DialogHeader>

        {detailedInfo && (
          <div className="space-y-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">{detailedInfo.title}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {detailedInfo.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Icon name={highlight.icon as any} className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{highlight.text}</span>
                  </div>
                ))}
              </div>
              {detailedInfo.description && (
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {detailedInfo.description}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="space-y-4 mt-6 pt-6 border-t">
          <div className="flex items-center gap-3 rounded-lg bg-background/50 p-4">
            <Icon name="Globe" className="h-5 w-5 text-muted-foreground" />
            <code className="flex-1 font-mono text-sm">{server.ip}</code>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onCopyIP(server.ip)}
            >
              <Icon name="Copy" className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Основные особенности:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {server.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm">
                  <Icon name="Check" className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full font-semibold uppercase tracking-wider" 
            size="lg"
            onClick={() => {
              onConnect(server.ip);
              onClose();
            }}
          >
            <Icon name="Rocket" className="mr-2 h-5 w-5" />
            Подключиться к серверу
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServerDetailsDialog;
