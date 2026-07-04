import AssignmentForm from '@/components/AssignmentForm';
import AssignmentList from '@/components/AssignmentList';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0c] p-6 md:p-12 relative overflow-hidden bg-dot-pattern">
       {/* Background Ambience */}
       <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
       <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>

       <div className="max-w-6xl mx-auto space-y-12 relative z-10">
         {/* Header */}
         <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 glass p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-4">
               <Link href="/dashboard" className="w-12 h-12 bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl flex items-center justify-center transition-all border border-gray-200 dark:border-slate-700">
                  <ArrowLeft className="text-gray-600 dark:text-slate-300" size={24} />
               </Link>
               <div>
                  <h1 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
                    Task <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Board</span>
                    <Sparkles className="text-purple-400" size={24} />
                  </h1>
                  <p className="text-gray-500 dark:text-slate-400 mt-1 font-medium">Atur & Unggah Bukti Tugas Anda.</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <ThemeToggle />
            </div>
         </header>

         <div className="grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 w-full sticky top-8">
               <AssignmentForm />
            </div>
            
            <div className="lg:col-span-7 w-full">
               <AssignmentList />
            </div>
         </div>
       </div>
    </div>
  );
}
