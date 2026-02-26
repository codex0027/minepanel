import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Square, RotateCcw, Cpu, HardDrive, Users, Activity } from 'lucide-react';
import { ServerInfo, ServerStatus } from '../types';
import { serverApi } from '../api/client';

export const Dashboard: React.FC = () => {
  const [serverInfo, setServerInfo] = useState<ServerInfo>({
    status: 'online',
    cpu: 12,
    memory: 45,
    players: 8,
    maxPlayers: 20,
    uptime: '2d 4h 12m',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: 'start' | 'stop' | 'restart') => {
    setIsLoading(true);
    try {
      // In a real app, we'd call the API
      // await serverApi[action]();
      
      // Simulating state change
      if (action === 'stop') setServerInfo(prev => ({ ...prev, status: 'offline' }));
      if (action === 'start') setServerInfo(prev => ({ ...prev, status: 'online' }));
      if (action === 'restart') {
        setServerInfo(prev => ({ ...prev, status: 'starting' }));
        setTimeout(() => setServerInfo(prev => ({ ...prev, status: 'online' })), 2000);
      }
    } catch (error) {
      console.error('Action failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = [
    { label: 'CPU Usage', value: `${serverInfo.cpu}%`, icon: Cpu, color: 'text-blue-400' },
    { label: 'Memory', value: `${serverInfo.memory}%`, icon: HardDrive, color: 'text-purple-400' },
    { label: 'Players', value: `${serverInfo.players}/${serverInfo.maxPlayers}`, icon: Users, color: 'text-emerald-400' },
    { label: 'Uptime', value: serverInfo.uptime, icon: Activity, color: 'text-amber-400' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Server Dashboard</h1>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </div>
          </div>
          <p className="text-gray-500">Manage your Minecraft server instance in real-time.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleAction('start')}
            disabled={isLoading || serverInfo.status === 'online'}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-4 h-4" />
            <span className="font-semibold">Start</span>
          </button>
          <button
            onClick={() => handleAction('stop')}
            disabled={isLoading || serverInfo.status === 'offline'}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Square className="w-4 h-4" />
            <span className="font-semibold">Stop</span>
          </button>
          <button
            onClick={() => handleAction('restart')}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl hover:bg-amber-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="font-semibold">Restart</span>
          </button>
        </div>
      </header>

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl border flex items-center justify-between ${
          serverInfo.status === 'online' 
            ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/5 border-rose-500/20 text-rose-400'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full animate-pulse ${
            serverInfo.status === 'online' ? 'bg-emerald-500' : 'bg-rose-500'
          }`} />
          <span className="text-lg font-bold uppercase tracking-widest">
            Server is {serverInfo.status}
          </span>
        </div>
        <div className="text-sm opacity-60 font-mono">
          IP: play.minepanel.io:25565
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-panel-card border border-panel-border hover:border-panel-accent/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Placeholder / More Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-panel-card border border-panel-border">
          <h3 className="text-lg font-bold mb-6">Resource Usage</h3>
          <div className="h-64 flex items-end gap-2 px-4">
            {[40, 65, 45, 80, 55, 70, 40, 60, 85, 50, 45, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05 }}
                className="flex-1 bg-panel-accent/20 border-t-2 border-panel-accent rounded-t-sm"
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500 font-mono">
            <span>12:00</span>
            <span>12:15</span>
            <span>12:30</span>
            <span>12:45</span>
            <span>13:00</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-panel-card border border-panel-border">
          <h3 className="text-lg font-bold mb-6">Recent Events</h3>
          <div className="space-y-4">
            {[
              { time: '12:45', msg: 'Player "Steve" joined', type: 'join' },
              { time: '12:40', msg: 'Backup completed', type: 'system' },
              { time: '12:30', msg: 'Server started successfully', type: 'system' },
              { time: '12:25', msg: 'Player "Alex" left', type: 'leave' },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-gray-500 font-mono shrink-0">{event.time}</span>
                <span className="text-gray-300">{event.msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
