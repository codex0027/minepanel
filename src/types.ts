export type ServerStatus = 'online' | 'offline' | 'starting' | 'stopping';

export interface ServerInfo {
  status: ServerStatus;
  cpu: number;
  memory: number;
  players: number;
  maxPlayers: number;
  uptime: string;
}

export interface ConsoleMessage {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}

export type Tab = 'dashboard' | 'console' | 'settings';
