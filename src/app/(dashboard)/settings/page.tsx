'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Globe, 
  Lock, 
  ShieldCheck,
  CheckCircle2,
  Loader2,
  Laptop
} from 'lucide-react';

export default function SettingsPage() {
  const [theme, setThemeState] = useState<string>('system');
  const { lang, setLang } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      setThemeState(saved); // eslint-disable-line react-hooks/set-state-in-effect
    } else {
      setThemeState('system');
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Password baru dan konfirmasi tidak cocok.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (res.ok) {
        setSuccess(true);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        setError(data.message || 'Gagal mengubah password');
      }
    } catch {
      setError('Terjadi kesalahan jaringan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2">
          <SettingsIcon className="text-indigo-500" size={32} />
          Pengaturan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Sesuaikan preferensi aplikasi dan keamanan akun Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Tampilan & Bahasa */}
        <div className="space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Sun size={20} className="text-amber-500" />
              Tampilan
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === 'light' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-white/10 hover:border-indigo-500/50'
                }`}
              >
                <Sun size={24} className="mb-2 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Terang</span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === 'dark' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-white/10 hover:border-indigo-500/50'
                }`}
              >
                <Moon size={24} className="mb-2 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Gelap</span>
              </button>
              
              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
                  theme === 'system' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-200 dark:border-white/10 hover:border-indigo-500/50'
                }`}
              >
                <Laptop size={24} className="mb-2 text-gray-700 dark:text-gray-300" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Sistem</span>
              </button>
            </div>
          </div>

          <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/10">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Globe size={20} className="text-emerald-500" />
              Bahasa
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setLang('id')}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 ${
                  lang === 'id' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-gray-200 dark:border-white/10 hover:border-emerald-500/50'
                }`}
              >
                <span className="text-xl">🇮🇩</span>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Indonesia</span>
              </button>
              
              <button
                onClick={() => setLang('en')}
                className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-2 ${
                  lang === 'en' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10' : 'border-gray-200 dark:border-white/10 hover:border-emerald-500/50'
                }`}
              >
                <span className="text-xl">🇬🇧</span>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">English</span>
              </button>
            </div>
          </div>
        </div>

        {/* Keamanan */}
        <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <ShieldCheck size={20} className="text-purple-500" />
            Keamanan Akun
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} className="text-purple-500" /> Password Saat Ini
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-purple-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-sm shadow-sm"
                />
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} className="text-indigo-500" /> Password Baru
                </label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-sm shadow-sm"
                />
             </div>

             <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                  <Lock size={14} className="text-indigo-500" /> Konfirmasi Password Baru
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-medium text-sm shadow-sm"
                />
             </div>

             {error && (
               <div className="text-xs font-bold text-red-500 mt-2 bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-200 dark:border-red-500/20">
                 {error}
               </div>
             )}

             <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] text-white font-black py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Ubah Password'}
              </button>

              {success && (
                <div className="flex items-center justify-center gap-2 mt-4 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 py-3 rounded-xl border border-green-200 dark:border-green-500/20 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 size={18} />
                  <span className="font-black text-xs uppercase tracking-widest">Password berhasil diubah!</span>
                </div>
              )}
          </form>
        </div>
      </div>
    </div>
  );
}
