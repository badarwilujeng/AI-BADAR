'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1 p-1 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl shadow-sm">
      <button
        onClick={() => setLang('id')}
        className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all duration-300 ${
          lang === 'id' 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
            : 'text-gray-500 dark:text-white/40 hover:text-indigo-500'
        }`}
      >
        ID
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded-xl text-[10px] font-black transition-all duration-300 ${
          lang === 'en' 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
            : 'text-gray-500 dark:text-white/40 hover:text-indigo-500'
        }`}
      >
        EN
      </button>
      <div className="ml-1 p-1.5 text-indigo-500/50">
        <Languages size={14} />
      </div>
    </div>
  );
}
