type MonitoringData = {
  result: string;
  data: {
    total: { players: number };
    servers: Array<{
      ip: string;
      port: number;
      players: number;
      playersMax: number;
    }>;
  };
};

type Listener = (data: MonitoringData | null) => void;

class MonitoringService {
  private data: MonitoringData | null = null;
  private listeners: Set<Listener> = new Set();
  private fetchInterval: number | null = null;
  private isFetching = false;

  constructor() {
    this.startAutoFetch();
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    
    if (this.data) {
      listener(this.data);
    }
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.data));
  }

  private async fetchData(): Promise<void> {
    if (this.isFetching) return;

    this.isFetching = true;
    try {
      const response = await fetch(
        'https://functions.poehali.dev/00e6cb95-28f5-49b7-b342-db4f9ae8ffd1?endpoint=monitoring',
        { cache: 'no-store' }
      );

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();

      if (data.result === 'success' && data.data) {
        this.data = data;
        this.notify();
      }
    } catch (error) {
      console.error('Failed to fetch monitoring data:', error);
      this.data = {
        result: 'error',
        data: { total: { players: 0 }, servers: [] }
      };
      this.notify();
    } finally {
      this.isFetching = false;
    }
  }

  private startAutoFetch(): void {
    this.fetchData();
    this.fetchInterval = window.setInterval(() => {
      this.fetchData();
    }, 60000);
  }

  destroy(): void {
    if (this.fetchInterval !== null) {
      clearInterval(this.fetchInterval);
      this.fetchInterval = null;
    }
    this.listeners.clear();
  }
}

export const monitoringService = new MonitoringService();