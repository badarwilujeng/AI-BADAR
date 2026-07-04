'use client';

import ReminderForm from '@/components/ReminderForm';
import AlarmToggle from '@/components/AlarmToggle';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RemindersPage() {
  const { data: session, status } = useSession();
  const { t } = useLanguage();

  if (status === 'loading') return null;
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] text-slate-800 dark:text-slate-200 p-4 md:p-10 relative overflow-hidden flex flex-col items-center">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.05] dark:opacity-[0.07] pointer-events-none"></div>
      
      {/* Background aesthetic blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[50rem] h-[50rem] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50rem] h-[50rem] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

      <div className="w-full max-w-6xl z-10 relative space-y-8">
        <header className="mb-10 text-center md:text-left flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6 flex-1 text-left">
            <Link href="/dashboard" className="w-12 h-12 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl flex items-center justify-center transition-all border border-gray-200 dark:border-slate-700 shrink-0">
              <ArrowLeft className="text-gray-600 dark:text-slate-300" size={24} />
            </Link>
            <div>
              <div className="flex items-center gap-3 justify-start mb-1">
                <span className="h-1.5 w-10 bg-indigo-600 rounded-full"></span>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400">{t('reminders.subtitle')}</span>
              </div>
              <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-300% animate-gradient-x dark:from-indigo-400 dark:to-purple-400 leading-tight">
                {t('reminders.header')}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 self-center md:self-auto">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </header>

        <div className="space-y-10">
          <AlarmToggle />
          <ReminderForm />
        </div>
      </div>
    </div>
  );
}
