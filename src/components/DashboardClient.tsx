'use client';

import { 
  BookOpen, 
  FileText, 
  Calendar, 
  CheckCircle2, 
  UploadCloud,
  CheckCircle,
  Megaphone,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ProfileSidebar from '@/components/ProfileSidebar';

interface DashboardSession {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export default function DashboardClient({ session }: { session: DashboardSession }) {
  const userName = session.user?.name || session.user?.email.split('@')[0] || 'Badar';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPresenceModal, setShowPresenceModal] = useState(false);
  const [presenceSuccess, setPresenceSuccess] = useState(false);

  const handlePresence = () => {
    setPresenceSuccess(true);
    setTimeout(() => {
      setPresenceSuccess(false);
      setShowPresenceModal(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Dashboard Top Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left / Middle Column (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Welcome Text */}
          <div>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              Halo, {userName}! 👋
            </h1>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
              Semangat belajar hari ini!
            </p>
          </div>

          {/* 4 Stat Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <SimpleStatCard 
              icon={<BookOpen size={18} />} 
              value="8" 
              title="Mata Kuliah" 
              label="Aktif" 
              color="text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" 
            />
            <SimpleStatCard 
              icon={<FileText size={18} />} 
              value="12" 
              title="Tugas" 
              label="Belum Selesai" 
              color="text-blue-500 bg-blue-50 dark:bg-blue-500/10" 
            />
            <SimpleStatCard 
              icon={<Calendar size={18} />} 
              value="3" 
              title="Jadwal Hari Ini" 
              label="Kelas" 
              color="text-pink-500 bg-pink-50 dark:bg-pink-500/10" 
            />
            <SimpleStatCard 
              icon={<CheckCircle2 size={18} />} 
              value="92%" 
              title="Kehadiran" 
              label="Bulan Ini" 
              color="text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" 
            />
          </div>

          {/* Jadwal Hari Ini */}
          <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar size={18} className="text-indigo-600" />
                Jadwal Hari Ini
              </h3>
              <Link href="/reminders" className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Lihat semua</Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/5">
              <ScheduleRow time="09:00 - 10:40" subject="Pemrograman Web" room="Ruang A201" />
              <ScheduleRow time="11:00 - 12:40" subject="Basis Data" room="Ruang B103" />
              <ScheduleRow time="13:00 - 14:40" subject="Sistem Informasi" room="Ruang C305" />
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-white/5">
              <CheckCircle2 size={14} className="text-gray-400" />
              <span>Selesai untuk hari ini</span>
            </div>
          </div>

          {/* Tugas Mendatang */}
          <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-indigo-600" />
                Tugas Mendatang
              </h3>
              <Link href="/assignments" className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Lihat semua</Link>
            </div>

            <div className="space-y-4">
              <TaskRow title="UI/UX Landing Page" deadline="Deadline: 25 Mei 2024" badgeText="2 hari lagi" badgeColor="bg-red-500/10 text-red-500" dotColor="bg-indigo-500" />
              <TaskRow title="Laporan Basis Data" deadline="Deadline: 27 Mei 2024" badgeText="4 hari lagi" badgeColor="bg-amber-500/10 text-amber-500" dotColor="bg-amber-500" />
              <TaskRow title="Algoritma & Struktur Data" deadline="Deadline: 30 Mei 2024" badgeText="7 hari lagi" badgeColor="bg-blue-500/10 text-blue-500" dotColor="bg-blue-500" />
            </div>
          </div>

        </div>

        {/* Right Column (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Pengumuman Terbaru */}
          <div className="glass-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Megaphone size={18} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900 dark:text-white">Pengumuman Terbaru</h3>
            </div>
            
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 shadow-sm space-y-2">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">Libur Hari Raya</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Kampus akan libur pada 10-12 Mei 2024
              </p>
              <span className="text-[10px] font-medium text-gray-400 block pt-1">2 hari yang lalu</span>
            </div>

            <div className="mt-4 text-center">
              <Link href="/announcements" className="text-xs font-bold text-indigo-500 hover:text-indigo-600 transition-colors">Lihat semua pengumuman</Link>
            </div>
          </div>

          {/* Quick Access */}
          <div className="glass-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Access</h3>
            
            <div className="grid grid-cols-4 gap-3">
              <QuickAccessIconButton 
                href="/assignments" 
                color="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20" 
                icon={<UploadCloud size={18} />} 
                tooltip="Upload Tugas"
              />
              <QuickAccessIconButton 
                href="/reminders" 
                color="text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20" 
                icon={<Calendar size={18} />} 
                tooltip="Lihat Jadwal"
              />
              <button 
                onClick={() => setShowPresenceModal(true)}
                className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center text-emerald-600 dark:text-emerald-400 cursor-pointer shadow-sm mx-auto"
                title="Presensi"
              >
                <CheckCircle2 size={18} />
              </button>
              <QuickAccessIconButton 
                href="/academic-calendar" 
                color="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20" 
                icon={<Calendar size={18} />} 
                tooltip="Kalender"
              />
            </div>
          </div>

          {/* Kehadiran Bulanan */}
          <div className="glass-card p-6 rounded-[2rem] border border-gray-100 dark:border-white/5">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Kehadiran Bulanan</h3>

            {/* SVG Line Chart */}
            <div className="relative h-44 w-full mt-2">
              <svg viewBox="0 0 500 200" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines */}
                <line x1="40" y1="20" x2="480" y2="20" stroke="currentColor" className="text-gray-100 dark:text-white/5" />
                <line x1="40" y1="65" x2="480" y2="65" stroke="currentColor" className="text-gray-100 dark:text-white/5" />
                <line x1="40" y1="110" x2="480" y2="110" stroke="currentColor" className="text-gray-100 dark:text-white/5" />
                <line x1="40" y1="155" x2="480" y2="155" stroke="currentColor" className="text-gray-100 dark:text-white/5" />

                {/* Y Axis Labels */}
                <text x="15" y="25" className="fill-gray-400 text-[10px] font-bold">100%</text>
                <text x="15" y="70" className="fill-gray-400 text-[10px] font-bold">75%</text>
                <text x="15" y="115" className="fill-gray-400 text-[10px] font-bold">50%</text>
                <text x="15" y="160" className="fill-gray-400 text-[10px] font-bold">25%</text>
                <text x="15" y="195" className="fill-gray-400 text-[10px] font-bold">0%</text>

                {/* Green Line Chart path */}
                <path 
                  d="M 50 75 C 80 85, 110 95, 136 90 C 160 85, 200 45, 222 40 C 250 35, 280 120, 308 125 C 330 135, 370 95, 394 85 C 420 75, 450 50, 480 40" 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="3" 
                  strokeLinecap="round"
                />

                {/* Data points */}
                <circle cx="50" cy="75" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <circle cx="136" cy="90" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <circle cx="222" cy="40" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <circle cx="308" cy="125" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <circle cx="394" cy="85" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />
                <circle cx="480" cy="40" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" />

                {/* X Axis Labels */}
                <text x="40" y="210" className="fill-gray-400 text-[10px] font-bold">Jan</text>
                <text x="126" y="210" className="fill-gray-400 text-[10px] font-bold">Feb</text>
                <text x="212" y="210" className="fill-gray-400 text-[10px] font-bold">Mar</text>
                <text x="298" y="210" className="fill-gray-400 text-[10px] font-bold">Apr</text>
                <text x="384" y="210" className="fill-gray-400 text-[10px] font-bold">Mei</text>
                <text x="470" y="210" className="fill-gray-400 text-[10px] font-bold">Jun</text>
              </svg>
            </div>

            {/* Bottom average alert banner */}
            <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-xl p-3 flex justify-between items-center text-xs font-bold mt-4">
              <span>Rata-rata Kehadiran</span>
              <span>92%</span>
            </div>
          </div>

        </div>

      </div>

      {/* Centered Footer */}
      <footer className="mt-16 pt-8 border-t border-border-custom text-center text-xs font-medium text-gray-400">
        <p>© 2024 Student Hub. Semua hak dilindungi.</p>
      </footer>

      <ProfileSidebar isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Presensi Modal */}
      {showPresenceModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#131326] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 max-w-sm w-full relative animate-in zoom-in duration-300">
            {!presenceSuccess ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400 mx-auto">
                  <CheckCircle size={40} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Presensi Kehadiran</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Catat kehadiran Anda untuk sesi kuliah hari ini.</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-left space-y-2 border border-gray-100 dark:border-white/5">
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">Kelas Aktif saat ini:</p>
                  <p className="text-sm font-black text-gray-900 dark:text-white">Pemrograman Web</p>
                  <p className="text-[10px] text-gray-400">09:00 - 10:40 | Ruang A201</p>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowPresenceModal(false)}
                    className="flex-1 py-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 font-bold rounded-2xl transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handlePresence}
                    className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    Hadir
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-4 py-6">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">Presensi Berhasil!</h3>
                <p className="text-xs text-emerald-500 dark:text-emerald-400 font-bold uppercase tracking-wider">Kehadiran tercatat pada 09:15 WIB</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SimpleStatCard({ icon, value, title, label, color }: {
  icon: React.ReactNode; value: string; title: string; label: string; color: string
}) {
  return (
    <div className="glass-card p-5 rounded-2xl border border-gray-100 dark:border-white/5 hover:scale-[1.02] transition-all flex flex-col justify-between h-36">
      <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center shrink-0`}>
        {icon}
      </div>
      <div className="space-y-0.5 mt-4">
        <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{title}</p>
        <h4 className="text-2xl font-black text-gray-900 dark:text-white">{value}</h4>
        <p className="text-[10px] font-medium text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function ScheduleRow({ time, subject, room }: { time: string, subject: string, room: string }) {
  return (
    <div className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
      <span className="text-xs font-bold text-gray-400 w-24 shrink-0">{time}</span>
      <span className="text-sm font-black text-gray-900 dark:text-white flex-1 px-4">{subject}</span>
      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-24 text-right shrink-0">{room}</span>
    </div>
  );
}

function TaskRow({ title, deadline, badgeText, badgeColor, dotColor }: {
  title: string; deadline: string; badgeText: string; badgeColor: string; dotColor: string
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all">
      <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${dotColor} shrink-0`}></div>
        <div>
          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{title}</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">{deadline}</p>
        </div>
      </div>
      <span className={`text-[9px] font-bold px-2 py-1 rounded-lg ${badgeColor}`}>{badgeText}</span>
    </div>
  );
}

function QuickAccessIconButton({ href, color, icon, tooltip }: {
  href: string; color: string; icon: React.ReactNode; tooltip: string
}) {
  return (
    <Link href={href} className="mx-auto" title={tooltip}>
      <div className={`w-12 h-12 rounded-2xl ${color} hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center shrink-0 shadow-sm`}>
        {icon}
      </div>
    </Link>
  );
}
