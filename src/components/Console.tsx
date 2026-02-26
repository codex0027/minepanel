import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Trash2, Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';
import { ConsoleMessage } from '../types';

export const Console: React.FC = () => {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const [command, setCommand] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Simulating WebSocket connection
    setIsConnected(true);
    
    const initialMessages: ConsoleMessage[] = [
      { id: '1', timestamp: '12:30:01', message: 'Starting MinePanel Server v1.0.0...', type: 'info' },
      { id: '2', timestamp: '12:30:05', message: 'Loading world "Survival_World"...', type: 'info' },
      { id: '3', timestamp: '12:30:10', message: 'Server started on port 25565', type: 'success' },
      { id: '4', timestamp: '12:35:12', message: 'Can\'t keep up! Is the server overloaded?', type: 'warn' },
    ];
    setMessages(initialMessages);

    // In a real app:
    /*
    socketRef.current = new WebSocket('wss://api.codex00.dpdns.org');
    socketRef.current.onopen = () => setIsConnected(true);
    socketRef.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages(prev => [...prev, { ...msg, id: Math.random().toString() }]);
    };
    */

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    const newMsg: ConsoleMessage = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
      message: `> ${command}`,
      type: 'info',
    };

    setMessages(prev => [...prev, newMsg]);
    
    // Simulate server response
    setTimeout(() => {
      const response: ConsoleMessage = {
        id: (Date.now() + 1).toString(),
        timestamp: new Date().toLocaleTimeString([], { hour12: false }),
        message: `Command executed: ${command}`,
        type: 'success',
      };
      setMessages(prev => [...prev, response]);
    }, 500);

    setCommand('');
  };

  const clearConsole = () => setMessages([]);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-4">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-panel-accent/10 text-panel-accent">
            <TerminalIcon className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Live Console</h1>
          <div className={`flex items-center gap-2 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
            isConnected ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        <button
          onClick={clearConsole}
          className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors"
          title="Clear Console"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </header>

      <div className="flex-1 bg-black/40 border border-panel-border rounded-2xl overflow-hidden flex flex-col shadow-inner">
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-1.5 selection:bg-panel-accent/30"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-4 group"
              >
                <span className="text-gray-600 shrink-0 select-none">[{msg.timestamp}]</span>
                <span className={clsx(
                  "break-all",
                  msg.type === 'info' && "text-gray-300",
                  msg.type === 'success' && "text-emerald-400",
                  msg.type === 'warn' && "text-amber-400",
                  msg.type === 'error' && "text-rose-400 font-bold"
                )}>
                  {msg.message}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
              <ShieldAlert className="w-12 h-12 opacity-20" />
              <p>Console is empty. Waiting for logs...</p>
            </div>
          )}
        </div>

        <form 
          onSubmit={handleSendCommand}
          className="p-4 bg-panel-card border-t border-panel-border flex gap-3"
        >
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-panel-accent font-mono font-bold">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Type a command (e.g. /stop, /list)..."
              className="w-full bg-black/20 border border-panel-border rounded-xl pl-8 pr-4 py-3 text-sm font-mono focus:outline-none focus:border-panel-accent/50 focus:ring-1 focus:ring-panel-accent/50 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-panel-accent text-white rounded-xl font-bold hover:bg-panel-accent/80 transition-all flex items-center gap-2 shadow-lg shadow-panel-accent/20"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

function clsx(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
