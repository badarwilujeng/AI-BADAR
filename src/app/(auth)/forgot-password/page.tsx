'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Loader2, ArrowLeft, KeyRound } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
      alert('Terjadi kesalahan. Silakan coba lagi.');
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
          <Link href="/login" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Kembali ke login
          </Link>

          <div className="text-center mb-10">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl rotate-6 animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <KeyRound className="text-white" size={38} />
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Lupa <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Kata Sandi</span>
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm font-medium tracking-wide italic leading-relaxed">
              Masukkan email Anda untuk menerima link reset password.
            </p>
          </div>

          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <Mail className="text-green-600 dark:text-green-400" size={32} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email Terkirim!</h2>
              <p className="text-gray-600 dark:text-slate-400">
                Link reset password telah dikirim ke email Anda. Silakan periksa kotak masuk (dan folder spam).
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                  <Mail className="text-slate-400" size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                  placeholder="email@domain.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                {loading ? <Loader2 className="animate-spin" size={22} /> : <Mail size={22} />}
                Kirim Link Reset
              </button>
            </form>
          )}
        </div>

        <p className="text-center mt-8 text-xs text-gray-400 dark:text-slate-500 font-medium">
          Protected by <span className="text-indigo-400 italic">Advanced Cryptography</span> & <span className="text-purple-400">AI Security</span>
        </p>
      </div>
    </div>
  );
}
