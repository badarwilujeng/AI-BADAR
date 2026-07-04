'use client';

import { useState, useEffect } from 'react';
import { Schedule } from '@/types/schedule';
import { PlusCircle, Clock, CalendarDays, Loader2, Trash2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ReminderForm() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    courseName: '',
    dayOfWeek: '1',
    startTime: '',
    endTime: '',
    reminderOffset: '15'
  });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      const res = await fetch('/api/schedules');
      if (res.ok) {
        const data = await res.json();
        setSchedules(data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const calculateUpcomingDate = (dayOfWeek: number, timeString: string) => {
    const today = new Date();
    const currentDay = today.getDay();
    const diff = (dayOfWeek + 7 - currentDay) % 7;
    const targetDate = new Date(today.getTime() + diff * 24 * 60 * 60 * 1000);
    const [h, m] = timeString.split(':');
    targetDate.setHours(parseInt(h), parseInt(m), 0, 0);
    if (diff === 0 && targetDate < today) {
        targetDate.setDate(targetDate.getDate() + 7);
    }
    return targetDate;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
        const start = calculateUpcomingDate(parseInt(form.dayOfWeek), form.startTime);
        const end = calculateUpcomingDate(parseInt(form.dayOfWeek), form.endTime);
        
        const payload = {
            ...form,
            startTime: start.toISOString(),
            endTime: end.toISOString()
        };

        const res = await fetch('/api/schedules', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            fetchSchedules();
            setForm({ courseName: '', dayOfWeek: '1', startTime: '', endTime: '', reminderOffset: '15' });
        }
    } finally {
        setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin membatalkan jadwal ini?')) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/schedules?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSchedules(prev => prev.filter(s => s.id !== id));
      } else {
        alert('Gagal membatalkan jadwal.');
      }
    } catch {
      alert('Terjadi kesalahan jaringan.');
    } finally {
      setDeletingId(null);
    }
  };

  const { t, lang } = useLanguage();
  const days = lang === 'id' 
    ? ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Form Section */}
      <div className="lg:col-span-5">
        <div className="bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 md:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 dark:bg-white/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
              <PlusCircle size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight leading-none">{t('reminders.addHeader')}</h2>
              <p className="text-gray-500 dark:text-white/40 text-[10px] font-black uppercase tracking-widest mt-1.5">{t('reminders.addSubtitle')}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">{t('reminders.courseName')}</label>
              <input 
                required 
                value={form.courseName} 
                onChange={e => setForm({...form, courseName: e.target.value})} 
                type="text" 
                placeholder="e.g. Struktur Data"
                className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-2xl py-4 px-5 outline-none transition-all font-bold shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
               <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">{t('reminders.day')}</label>
                  <select 
                    value={form.dayOfWeek} 
                    onChange={e => setForm({...form, dayOfWeek: e.target.value})} 
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-2xl py-4 px-5 outline-none transition-all font-bold shadow-inner appearance-none"
                  >
                    {days.map((d, i) => <option key={i} value={i} className="bg-white dark:bg-[#1a1a1e]">{d}</option>)}
                  </select>
               </div>
               <div className="space-y-2">
                   <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">{t('reminders.reminder')}</label>
                   <select 
                    value={form.reminderOffset} 
                    onChange={e => setForm({...form, reminderOffset: e.target.value})} 
                    className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-2xl py-4 px-5 outline-none transition-all font-bold shadow-inner appearance-none"
                   >
                     <option value="5" className="bg-white dark:bg-[#1a1a1e]">{lang === 'id' ? '5m sebelum' : '5m before'}</option>
                     <option value="15" className="bg-white dark:bg-[#1a1a1e]">{lang === 'id' ? '15m sebelum' : '15m before'}</option>
                     <option value="30" className="bg-white dark:bg-[#1a1a1e]">{lang === 'id' ? '30m sebelum' : '30m before'}</option>
                   </select>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
               <div className="space-y-2">
                 <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">{t('reminders.startTime')}</label>
                 <input 
                  required 
                  value={form.startTime} 
                  onChange={e => setForm({...form, startTime: e.target.value})} 
                  type="time" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-2xl py-4 px-5 outline-none transition-all font-bold shadow-inner"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">{t('reminders.endTime')}</label>
                 <input 
                  required 
                  value={form.endTime} 
                  onChange={e => setForm({...form, endTime: e.target.value})} 
                  type="time" 
                  className="w-full bg-black/5 dark:bg-white/5 border border-transparent focus:border-indigo-500/50 dark:focus:border-white/20 text-gray-900 dark:text-white rounded-2xl py-4 px-5 outline-none transition-all font-bold shadow-inner"
                 />
               </div>
            </div>
            
            <button 
              disabled={saving} 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-300% animate-gradient-x hover:scale-[1.02] text-white font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(79,70,229,0.3)] active:scale-95 flex justify-center items-center gap-3 text-lg mt-4"
            >
              {saving ? <Loader2 className="animate-spin" size={24} /> : <PlusCircle size={24} />}
              {t('reminders.saveBtn')}
            </button>
          </form>
        </div>
      </div>

      {/* List Section */}
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{t('reminders.listHeader')}</h2>
          <div className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 text-[10px] font-black uppercase tracking-widest">
            {schedules.length} {lang === 'id' ? 'Item' : 'Items'}
          </div>
        </div>
        
        <div className="min-h-[400px]">
          {loading ? (
              <div className="flex items-center justify-center h-64 text-indigo-500/50 transition-all">
                <Loader2 className="animate-spin" size={48} />
              </div>
          ) : schedules.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
                {schedules.map(sch => (
                  <div 
                    key={sch.id} 
                    className={`group relative p-6 rounded-[2rem] bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xl backdrop-blur-3xl hover:scale-[1.02] transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 ${deletingId === sch.id ? 'opacity-50 blur-sm' : ''}`}
                  >
                    <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0 transform group-hover:rotate-6 transition-transform">
                      <CalendarDays size={32} />
                    </div>
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <h3 className="font-black text-xl text-gray-900 dark:text-white truncate tracking-tight">{sch.courseName}</h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
                        <p className="text-sm font-bold text-gray-500 dark:text-white/40 flex items-center gap-2">
                            <Clock size={16} className="text-indigo-500" /> 
                            {days[sch.dayOfWeek]} • {new Date(sch.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(sch.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
                      <div className={`text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-[0.2em] shadow-sm ${sch.lastNotified ? 'bg-gray-100 dark:bg-white/5 text-gray-400' : 'bg-green-500/10 text-green-500 border border-green-500/20 animate-pulse'}`}>
                          {sch.lastNotified ? t('reminders.done') : t('reminders.active')}
                      </div>
                      <button
                        onClick={() => sch.id && handleDelete(sch.id)}
                        disabled={deletingId === sch.id}
                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                      >
                        {deletingId === sch.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                        {t('reminders.cancel')}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
          ) : (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400/50 bg-black/5 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-black/10 dark:border-white/10">
                 <CalendarDays size={64} className="opacity-20 mb-4 animate-bounce" />
                 <p className="font-black uppercase tracking-widest text-xs">{t('reminders.noSchedule')}</p>
              </div>
          )}
        </div>
      </div>
    </div>
  );
}
