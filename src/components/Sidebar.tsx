'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  Calendar, 
  ClipboardList, 
  CalendarDays, 
  Megaphone, 
  Settings, 
  HelpCircle, 
  GraduationCap, 
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileSidebar from './ProfileSidebar';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Profil Saya', isButton: true, icon: User },
  { name: 'Jadwal', href: '/reminders', icon: Calendar },
  { name: 'Tugas', href: '/assignments', icon: ClipboardList },
  { name: 'Kalender Akademik', href: '/academic-calendar', icon: CalendarDays },
  { name: 'Pengumuman', href: '/announcements', icon: Megaphone },
  { name: 'Pengaturan', href: '/settings', icon: Settings },
  { name: 'Bantuan', href: '/help', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <aside className="w-72 bg-sidebar border-r border-border-custom h-screen sticky top-0 flex flex-col p-6 overflow-y-auto hide-scrollbar shrink-0 justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
              Student <span className="text-indigo-600">Hub</span>
            </span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              if (item.isButton) {
                return (
                  <button
                    key={item.name}
                    onClick={() => setIsProfileOpen(true)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 font-medium group text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-4 border-transparent"
                    )}
                  >
                    <item.icon size={20} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                    {item.name}
                  </button>
                );
              }

              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.name}
                  href={item.href!}
                  className={cn(
                    "flex items-center gap-3 py-3 transition-all duration-200 font-medium group",
                    isActive 
                      ? "bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-l-4 border-indigo-600 rounded-r-2xl rounded-l-none pl-3 pr-4" 
                      : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white border-l-4 border-transparent pl-4 pr-4 rounded-2xl"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "transition-colors",
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  )} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="mt-8">
          {/* Logout */}
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-500/5 transition-all duration-200 font-medium group">
            <LogOut size={20} />
            Keluar
          </Link>
        </div>
      </aside>

      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
