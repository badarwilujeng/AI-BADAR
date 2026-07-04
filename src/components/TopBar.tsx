'use client';

import { Search, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

export default function TopBar({ session }: { session: any }) {
  const user = session?.user;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="h-20 border-b border-border-custom bg-background/50 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between gap-8">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Cari sesuatu..." 
            className="w-full bg-gray-100 dark:bg-white/5 border border-transparent focus:border-indigo-500/30 rounded-2xl py-3 pl-12 pr-4 outline-none transition-all text-sm font-medium"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 bg-gray-200 dark:bg-white/10 px-1.5 py-0.5 rounded border border-gray-300 dark:border-white/10">
            ⌘K
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-gray-400 relative transition-all">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
        </div>

        <div className="h-8 w-px bg-border-custom mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
              {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.name || 'User'}</p>
            <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Mahasiswa</p>
          </div>
          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
        </div>
      </div>
    </header>
  );
}
