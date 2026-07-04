'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LogIn, Mail, Lock, User, UserCircle, Loader2 } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function RegisterPage() {
  const [studentId, setStudentId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Registrasi berhasil! Silakan login.');
        router.push('/login');
      } else {
        alert(data.message || 'Registrasi gagal.');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Terjadi kesalahan saat registrasi.');
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
                <User className="text-white" size={38} />
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Buat <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Akun</span>
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm font-medium tracking-wide italic leading-relaxed">
              "Mulai perjalanan akademikmu dengan AI."
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <UserCircle className="text-slate-400" size={20} />
              </div>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                placeholder="NIM"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <User className="text-slate-400" size={20} />
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                placeholder="Nama Lengkap"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Mail className="text-slate-400" size={20} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                placeholder="Email"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Lock className="text-slate-400" size={20} />
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

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Lock className="text-slate-400" size={20} />
              </div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                placeholder="Konfirmasi Password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-[0.98] mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={22} /> : <User className="animate-pulse" size={22} />}
              Daftar
            </button>
          </form>

          <p className="text-center mt-6 text-sm text-gray-600 dark:text-slate-400 font-medium">
            Sudah punya akun?{' '}
            <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-bold transition-all hover:underline decoration-2 underline-offset-4">
              Masuk di sini
            </Link>
          </p>
        </div>

        <p className="text-center mt-8 text-xs text-gray-400 dark:text-slate-500 font-medium">
          Protected by <span className="text-indigo-400 italic">Advanced Cryptography</span> & <span className="text-purple-400">AI Security</span>
        </p>
      </div>
    </div>
  );
}
