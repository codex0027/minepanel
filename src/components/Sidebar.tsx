import React from 'react';
import { LayoutDashboard, Terminal, Settings, Menu, X, Server } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Tab } from '../types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'console' as Tab, label: 'Console', icon: Terminal },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -300 }}
        className={cn(
          "fixed top-0 left-0 bottom-0 w-64 bg-panel-card border-r border-panel-border z-50 flex flex-col transition-all duration-300 lg:translate-x-0",
          !isOpen && "lg:w-20"
        )}
      >
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-panel-accent flex items-center justify-center shadow-lg shadow-panel-accent/20">
            <Server className="text-white w-6 h-6" />
          </div>
          <AnimatePresence mode="wait">
            {(isOpen || window.innerWidth >= 1024) && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className={cn("font-bold text-xl tracking-tight", !isOpen && "lg:hidden")}
              >
                MinePanel
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive 
                    ? "bg-panel-accent/10 text-panel-accent" 
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-100"
                )}
              >
                <Icon className={cn("w-5 h-5 shrink-0", isActive && "text-panel-accent")} />
                <AnimatePresence mode="wait">
                  {(isOpen || window.innerWidth >= 1024) && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className={cn("font-medium", !isOpen && "lg:hidden")}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 w-1 h-6 bg-panel-accent rounded-r-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-panel-border">
          <div className={cn("flex items-center gap-3 px-2", !isOpen && "lg:justify-center")}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-panel-accent to-purple-500 shrink-0" />
            {(isOpen || window.innerWidth >= 1024) && (
              <div className={cn("flex flex-col min-w-0", !isOpen && "lg:hidden")}>
                <span className="text-sm font-semibold truncate">Admin User</span>
                <span className="text-xs text-gray-500 truncate">admin@minepanel.io</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};
