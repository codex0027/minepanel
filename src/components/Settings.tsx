import React from 'react';
import { Save, Shield, Globe, Bell, Database } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Server Settings</h1>
        <p className="text-gray-500 mt-1">Configure your server instance and panel preferences.</p>
      </header>

      <div className="grid gap-6">
        <section className="p-6 rounded-2xl bg-panel-card border border-panel-border space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-panel-border">
            <Globe className="w-5 h-5 text-panel-accent" />
            <h2 className="text-xl font-bold">General Configuration</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Server Name</label>
              <input 
                type="text" 
                defaultValue="MinePanel Survival"
                className="w-full bg-black/20 border border-panel-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-panel-accent/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Server Version</label>
              <select className="w-full bg-black/20 border border-panel-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-panel-accent/50 transition-all">
                <option>Paper 1.20.4</option>
                <option>Spigot 1.20.4</option>
                <option>Forge 1.20.1</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Max Players</label>
              <input 
                type="number" 
                defaultValue="20"
                className="w-full bg-black/20 border border-panel-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-panel-accent/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Memory Allocation (GB)</label>
              <input 
                type="number" 
                defaultValue="4"
                className="w-full bg-black/20 border border-panel-border rounded-xl px-4 py-2.5 focus:outline-none focus:border-panel-accent/50 transition-all"
              />
            </div>
          </div>
        </section>

        <section className="p-6 rounded-2xl bg-panel-card border border-panel-border space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-panel-border">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold">Security & Access</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-panel-border">
              <div>
                <p className="font-semibold">Whitelist Only</p>
                <p className="text-sm text-gray-500">Only approved players can join the server.</p>
              </div>
              <div className="w-12 h-6 bg-panel-accent rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-panel-border">
              <div>
                <p className="font-semibold">Auto-Backups</p>
                <p className="text-sm text-gray-500">Create a backup of the world every 6 hours.</p>
              </div>
              <div className="w-12 h-6 bg-gray-700 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button className="px-6 py-2.5 rounded-xl border border-panel-border hover:bg-white/5 transition-all">
            Discard Changes
          </button>
          <button className="px-6 py-2.5 bg-panel-accent text-white rounded-xl font-bold hover:bg-panel-accent/80 transition-all flex items-center gap-2 shadow-lg shadow-panel-accent/20">
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};
