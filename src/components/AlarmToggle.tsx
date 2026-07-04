'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AlarmToggle() {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<string>('default');
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAudio(new Audio('/alarm.mp3'));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);
      
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
        
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'PLAY_ALARM') {
            audio?.play().catch(console.error);
          } else if (event.data && event.data.type === 'STOP_ALARM') {
            audio?.pause();
            if (audio) audio.currentTime = 0;
          }
        });
      }
      
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          setIsSubscribed(!!sub);
        });
      });
    }
  }, [audio]);

  const toggleSubscription = async () => {
    if (permission !== 'granted') {
      const perm = await Notification.requestPermission();
      setPermission(perm);
      if (perm !== 'granted') return;
    }

    const reg = await navigator.serviceWorker.ready;
    
    if (isSubscribed) {
      const sub = await reg.pushManager.getSubscription();
      await sub?.unsubscribe();
      setIsSubscribed(false);
    } else {
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      });
      await fetch('/api/web-push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      });
      setIsSubscribed(true);
    }
  };

  const testAlarm = () => {
    if (audio) {
      audio.play().catch(() => alert(t('reminders.browserPolicy')));
      setTimeout(() => { audio.pause(); audio.currentTime = 0; }, 3000);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-8 bg-white/70 dark:bg-white/5 rounded-[2.5rem] border border-black/5 dark:border-white/10 shadow-2xl backdrop-blur-3xl items-center justify-between relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-white/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="text-center lg:text-left z-10">
         <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
            <div className={`p-2 rounded-xl ${isSubscribed ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
              {isSubscribed ? <Bell size={24} className="animate-bounce" /> : <BellOff size={24} />}
            </div>
            <h3 className="text-gray-900 dark:text-white font-black text-xl tracking-tight leading-none uppercase">{t('reminders.alarmHeader')}</h3>
         </div>
         <p className="text-gray-500 dark:text-white/40 text-sm font-bold max-w-sm">{t('reminders.alarmDesc')}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto z-10">
        <button 
          onClick={testAlarm}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest bg-purple-500/10 text-purple-600 border border-purple-500/20 hover:bg-purple-500 hover:text-white transition-all active:scale-95 shadow-lg shadow-purple-500/5 group/btn"
        >
          <Volume2 size={18} className="group-hover/btn:scale-125 transition-transform" />
          {t('reminders.testAlarm')}
        </button>
        <button 
          onClick={toggleSubscription}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl transition-all active:scale-95 border ${
            isSubscribed 
              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400 shadow-green-500/20' 
              : 'bg-indigo-600 text-white border-indigo-400 shadow-indigo-600/20'
          }`}
        >
          {isSubscribed ? (
            <>
              <Bell size={18} />
              {t('reminders.activeNotif')}
            </>
          ) : (
            <>
              <BellOff size={18} />
              {t('reminders.enableNotif')}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
