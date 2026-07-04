'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, UserCircle, KeyRound, Loader2, Target, Sparkles } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function LoginPage() {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log('Attempting login with studentId:', studentId);
      const result = await signIn('credentials', {
        studentId,
        password,
        redirect: false,
      });

      console.log('Login result:', result);

      if (result?.error) {
        console.error('Login error result:', result.error);
        alert('Login gagal. Periksa kembali NIM dan password Anda.');
      } else if (result?.ok) {
        console.log('Login successful, redirecting to dashboard...');
        router.push('/dashboard');
        router.refresh();
      } else {
        console.warn('Login finished but result is unexpected:', result);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Terjadi kesalahan sistem. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 bg-dot-pattern">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Dynamic Animated Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      <div className="relative z-10 w-full max-w-md transform transition-all duration-700 ease-out">
        <div className="glass-darker p-8 md:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:shadow-indigo-500/5">
           <div className="text-center mb-10">
              <div className="relative mx-auto w-20 h-20 mb-6">
                <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl rotate-6 animate-pulse"></div>
                <div className="relative bg-gradient-to-tr from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Target className="text-white" size={38} />
                </div>
                <Sparkles className="absolute -top-2 -right-2 text-amber-400 animate-bounce" size={20} />
              </div>
              <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Back</span>
              </h1>
              <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm font-medium tracking-wide italic leading-relaxed">"Your academic journey, simplified by AI."</p>
           </div>
           
            <form onSubmit={handleLogin} className="space-y-6">
               <div className="space-y-4">
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                     <UserCircle className="text-slate-400" size={20} />
                   </div>
                   <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                      placeholder="Masukkan NIM"
                      required
                   />
                 </div>
                 
                 <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                     <KeyRound className="text-slate-400" size={20} />
                   </div>
                   <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                      placeholder="Password"
                      required
                   />
                 </div>
               </div>
               
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-[0.98] mt-4"
               >
                 {loading ? <Loader2 className="animate-spin" size={22} /> : <LogIn size={22} />}
                 Masuk
               </button>
            </form>

            <div className="mt-8 flex items-center justify-center">
              <div className="border-t border-gray-200 dark:border-slate-800 w-full"></div>
              <span className="px-4 text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">Atau Masuk Dengan</span>
              <div className="border-t border-gray-200 dark:border-slate-800 w-full"></div>
            </div>

            <button 
               onClick={() => signIn('google')}
               className="mt-6 w-full glass dark:hover:bg-slate-800/80 text-gray-700 dark:text-slate-200 font-bold py-4 px-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 group"
            >
               <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md shadow-sm">
                 <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"></path><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.859-3.048.859-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"></path><path d="M3.964 10.705a5.41 5.41 0 01-.282-1.705c0-.602.102-1.183.282-1.705V4.963H.957a8.996 8.996 0 000 8.074l3.007-2.332z" fill="#FBBC05"></path><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.443 2.048.957 4.963l3.007 2.332C4.672 5.164 6.656 3.58 9 3.58z" fill="#EA4335"></path></svg>
               </div>
               Akun Google
             </button>
          </div>
          
          <div className="mt-6 flex flex-col items-center gap-4 text-sm">
            <Link href="/forgot-password" title="Lupa kata sandi" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold transition-colors flex items-center gap-1">
             Lupa kata sandi?
            </Link>
            <div className="text-gray-500 dark:text-slate-400">
              Belum punya akun?{' '}
              <Link href="/register" title="Daftar akun baru" className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-bold transition-colors">
                Daftar sekarang
              </Link>
            </div>
          </div>
          
          <p className="text-center mt-8 text-xs text-gray-400 dark:text-slate-500 font-medium">
            Dilindungi oleh <span className="text-indigo-400 italic">Advanced Cryptography</span> & <span className="text-purple-400">AI Security</span>
          </p>
       </div>
    </div>
  );
}
