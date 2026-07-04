import { Megaphone, Calendar } from 'lucide-react';

export default function AnnouncementsPage() {
  const announcements = [
    {
      title: 'Libur Hari Raya',
      desc: 'Kampus akan libur pada 10-12 Mei 2024 dalam rangka memperingati Hari Raya. Seluruh aktivitas perkuliahan ditiadakan dan akan kembali aktif pada tanggal 13 Mei 2024.',
      date: '10 Mei 2024',
      timeAgo: '2 hari yang lalu',
      category: 'Akademik',
      catColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Pendaftaran Beasiswa Prestasi Semester Genap',
      desc: 'Dibuka pendaftaran beasiswa prestasi akademik semester genap tahun ajaran 2025/2026. Persiapkan berkas transkrip nilai, sertifikat prestasi, dan surat rekomendasi Dosen Wali.',
      date: '08 Juni 2026',
      timeAgo: '3 hari yang lalu',
      category: 'Beasiswa',
      catColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Pemeliharaan Sistem SIAKAD',
      desc: 'Sistem Informasi Akademik (SIAKAD) akan mengalami pemeliharaan rutin pada Sabtu, 20 Juni pukul 22:00 WIB s.d Minggu, 21 Juni pukul 06:00 WIB. Layanan pengisian KRS sementara tidak tersedia.',
      date: '01 Juni 2026',
      timeAgo: '1 minggu yang lalu',
      category: 'Sistem',
      catColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2">
          <Megaphone className="text-indigo-600" size={32} />
          Pengumuman
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Berita terbaru dan pengumuman resmi seputar aktivitas akademik kampus.
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((ann, idx) => (
          <div key={idx} className="glass-card p-6 md:p-8 rounded-[2.5rem] hover:scale-[1.01] transition-all duration-300 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider ${ann.catColor}`}>
                  {ann.category}
                </span>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                  <Calendar size={12} />
                  {ann.date}
                </span>
              </div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">{ann.timeAgo}</span>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {ann.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
              {ann.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
