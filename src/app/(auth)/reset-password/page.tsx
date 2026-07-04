'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2, CheckCircle, ArrowLeft } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok.');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password minimal 6 karakter.');
      setLoading(false);
      return;
    }

    try {
      console.log('Sending reset request for:', email, 'with token:', token);
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, email, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        console.error('Reset error message:', data.message);
        setError(data.message || 'Gagal reset password.');
      }
    } catch (error) {
      console.error('Reset password global fetch error:', error);
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="glass-darker p-8 rounded-[2.5rem] text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Link Tidak Valid</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Token reset password tidak ditemukan atau link tidak lengkap.
          </p>
          <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-medium">
            Minta link baru
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="glass-darker p-8 md:p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
            <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-4">
            Password berhasil direset!
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Anda akan diarahkan ke halaman login dalam beberapa detik...
          </p>
          <Link
            href="/login"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 font-medium"
          >
            Masuk sekarang
          </Link>
        </div>
      </div>
    );
  }

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
          <Link href="/forgot-password" className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 mb-6 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Kembali
          </Link>

          <div className="text-center mb-10">
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl rotate-6 animate-pulse"></div>
              <div className="relative bg-gradient-to-tr from-indigo-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Lock className="text-white" size={38} />
              </div>
            </div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
              Reset <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Password</span>
            </h1>
            <p className="text-gray-500 dark:text-slate-400 mt-3 text-sm font-medium tracking-wide italic leading-relaxed">
              Masukkan password baru untuk akun <span className="not-italic text-gray-700 dark:text-slate-300">{email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-2xl text-sm">
                {error}
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-indigo-500">
                <Lock className="text-slate-400" size={20} />
              </div>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 text-gray-900 dark:text-white rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all outline-none placeholder-gray-400"
                placeholder="Password Baru (min. 6 karakter)"
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
                placeholder="Konfirmasi Password Baru"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black py-4.5 px-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="animate-spin" size={22} /> : <Lock size={22} />}
              Reset Password
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-xs text-gray-400 dark:text-slate-500 font-medium">
          Protected by <span className="text-indigo-400 italic">Advanced Cryptography</span> & <span className="text-purple-400">AI Security</span>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="animate-spin text-indigo-500" size={40} />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
