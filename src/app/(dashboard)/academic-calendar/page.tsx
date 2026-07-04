import { CalendarDays, MapPin, Clock, CalendarRange, Info } from 'lucide-react';

export default function AcademicCalendarPage() {
  const events = [
    {
      date: '15 - 26 Juni 2026',
      title: 'Ujian Akhir Semester (UAS) Genap',
      status: 'Mendatang',
      statusColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      desc: 'Pelaksanaan ujian akhir semester genap tahun ajaran 2025/2026 sesuai jadwal masing-masing fakultas.'
    },
    {
      date: '3 Juli 2026',
      title: 'Batas Akhir Unggah Nilai UAS',
      status: 'Mendatang',
      statusColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
      desc: 'Batas akhir bagi dosen pengampu untuk mengunggah nilai mata kuliah ke portal SIAKAD.'
    },
    {
      date: '6 Juli - 21 Agustus 2026',
      title: 'Libur Semester Genap',
      status: 'Mendatang',
      statusColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      desc: 'Masa libur akademik bagi seluruh mahasiswa aktif pasca berakhirnya semester genap.'
    },
    {
      date: '3 - 14 Agustus 2026',
      title: 'Registrasi & Pembayaran UKT Semester Ganjil',
      status: 'Mendatang',
      statusColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      desc: 'Periode pembayaran Uang Kuliah Tunggal (UKT) dan registrasi administratif untuk semester ganjil 2026/2027.'
    },
    {
      date: '18 - 25 Agustus 2026',
      title: 'Pengisian KRS Semester Ganjil',
      status: 'Mendatang',
      statusColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      desc: 'Pengisian Kartu Rencana Studi (KRS) secara online untuk menentukan mata kuliah yang akan diambil.'
    },
    {
      date: '31 Agustus 2026',
      title: 'Awal Perkuliahan Semester Ganjil 2026/2027',
      status: 'Mendatang',
      statusColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      desc: 'Hari pertama perkuliahan aktif untuk semester ganjil tahun ajaran baru.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2">
          <CalendarDays className="text-indigo-600" size={32} />
          Kalender Akademik
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Daftar jadwal penting perkuliahan, libur, dan administrasi akademik.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline list */}
        <div className="lg:col-span-2 glass-card p-6 md:p-8 rounded-[2.5rem] space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <CalendarRange size={20} className="text-indigo-600" />
            Agenda Terdekat
          </h2>

          <div className="relative border-l border-gray-100 dark:border-white/5 pl-6 ml-3 space-y-8">
            {events.map((event, index) => (
              <div key={index} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[35px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-4 border-indigo-600 z-10 shadow-sm" />
                
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">{event.date}</span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase ${event.statusColor}`}>
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">{event.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info panel */}
        <div className="space-y-6">
          <div className="glass-card p-6 md:p-8 rounded-[2.5rem] bg-indigo-50/30 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30">
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Info size={18} className="text-indigo-600" />
              Catatan Penting
            </h3>
            <ul className="space-y-3 text-xs text-gray-600 dark:text-gray-400 font-medium list-disc pl-4 leading-relaxed">
              <li>Pastikan pembayaran UKT diselesaikan sebelum periode registrasi berakhir untuk menghindari status non-aktif.</li>
              <li>Konsultasikan rencana studi Anda kepada Dosen Wali sebelum mengisi KRS.</li>
              <li>Perubahan jadwal ujian akan diumumkan secara terpisah oleh pihak Biro Administrasi Akademik (BAA).</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}
