'use client';

import React, { useState, useEffect } from 'react';
import { User, School, IdCard, BookOpen, Phone, MessageSquare, Save, Loader2, CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProfileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileSidebar({ isOpen, onClose }: ProfileSidebarProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    university: '',
    major: '',
    bio: '',
    phoneNumber: ''
  });

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/user/profile');
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.name || '',
          email: data.email || '',
          studentId: data.studentId || '',
          university: data.university || '',
          major: data.major || '',
          bio: data.bio || '',
          phoneNumber: data.phoneNumber || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchProfile(); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-full sm:w-[480px] bg-slate-50 dark:bg-[#0a0a0c] shadow-2xl z-50 transform transition-transform duration-500 ease-in-out border-r border-gray-200 dark:border-white/10 flex flex-col overflow-hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Aesthetic Background */}
        <div className="absolute top-0 right-[-10%] w-[300px] h-[300px] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>

        {/* Header */}
        <div className="p-6 md:p-8 flex items-center justify-between border-b border-gray-200 dark:border-white/10 glass z-10 sticky top-0">
          <div>
             <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
               {t('profile.header')}
             </h2>
             <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">{t('profile.subtitle')}</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-indigo-500/20">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-50">
              <Loader2 className="animate-spin text-indigo-500" size={32} />
              <p className="text-sm font-bold tracking-widest text-gray-500 uppercase">Memuat Data...</p>
            </div>
          ) : (
            <div className="space-y-8 pb-10">
              
              {/* Profile Card Header */}
              <div className="bg-white/70 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl backdrop-blur-md">
                <div className="h-20 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
                <div className="px-6 pb-6 -mt-10 flex flex-col items-center">
                  <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg border-4 border-white dark:border-[#0a0a0c]">
                     {formData.name ? formData.name.charAt(0).toUpperCase() : <User size={32} />}
                  </div>
                  <h3 className="text-xl font-black mt-3 text-gray-900 dark:text-white capitalize">{formData.name || 'Mahasiswa'}</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-indigo-500 mt-1">{formData.major || t('profile.major')}</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <User size={14} className="text-indigo-500" /> {t('profile.name')}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 dark:focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm shadow-sm"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2 truncate">
                          <IdCard size={14} className="text-purple-500 shrink-0" /> {t('profile.studentId')}
                        </label>
                        <input
                          type="text"
                          value={formData.studentId}
                          onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                          className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm shadow-sm"
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2 truncate">
                          <Phone size={14} className="text-indigo-500 shrink-0" /> {t('profile.phone')}
                        </label>
                        <input
                          type="text"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm shadow-sm"
                        />
                     </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <School size={14} className="text-purple-500" /> {t('profile.university')}
                    </label>
                    <input
                      type="text"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm shadow-sm"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <BookOpen size={14} className="text-indigo-500" /> {t('profile.major')}
                    </label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all font-bold text-sm shadow-sm"
                    />
                 </div>

                 <div className="space-y-3">
                    <label className="text-xs font-black text-gray-400 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare size={14} className="text-purple-500" /> {t('profile.bio')}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-transparent focus:border-indigo-500/50 text-gray-900 dark:text-white rounded-xl py-3 px-4 outline-none transition-all resize-none font-medium text-sm shadow-sm"
                    />
                 </div>

                 <div className="pt-4 flex flex-col gap-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-300% animate-gradient-x hover:scale-[1.02] text-white font-black py-4 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                      {saving ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> {t('profile.saveBtn')}</>}
                    </button>
                    
                    {success && (
                      <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 py-3 rounded-xl border border-green-200 dark:border-green-500/20 animate-in fade-in zoom-in duration-300">
                        <CheckCircle2 size={18} />
                        <span className="font-black text-xs uppercase tracking-widest">{t('profile.saved')}</span>
                      </div>
                    )}
                 </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
