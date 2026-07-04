import { HelpCircle, Mail, MessageSquare, ShieldCheck, ChevronRight } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'Bagaimana cara mengunggah tugas di Student Hub?',
      answer: 'Anda dapat masuk ke halaman "Tugas" dari menu navigasi samping, kemudian isi form detail tugas seperti Nama Tugas, Mata Kuliah, dan Tanggal Tenggat. Anda juga bisa mengunggah file bukti tugas (seperti tangkapan layar) ke form tersebut.'
    },
    {
      question: 'Apakah alarm pengingat kelas berfungsi secara otomatis?',
      answer: 'Ya, sistem pengingat kelas akan berjalan secara otomatis. Pastikan Anda telah memberikan izin notifikasi (notification permission) pada browser Anda agar sistem dapat menampilkan push notification saat kelas akan dimulai.'
    },
    {
      question: 'Bagaimana cara mengganti kata sandi akun?',
      answer: 'Buka menu "Pengaturan" di panel navigasi samping. Pada bagian "Keamanan Akun", masukkan password saat ini beserta password baru yang ingin digunakan, lalu tekan tombol "Ubah Password".'
    },
    {
      question: 'Apakah aplikasi Student Hub mendukung Bahasa Inggris?',
      answer: 'Ya, Anda bisa mengubah preferensi bahasa melalui menu "Pengaturan" di bagian panel "Bahasa" dengan memilih bendera negara (Indonesia atau English).'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3 mb-2">
          <HelpCircle className="text-indigo-600" size={32} />
          Pusat Bantuan
        </h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Temukan jawaban untuk pertanyaan Anda atau hubungi layanan bantuan kami.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Pertanyaan Populer</h2>
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-gray-100 dark:border-white/5">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 text-xs font-black">Q</span>
                {faq.question}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium pl-7">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Hubungi Kami</h2>
          
          <div className="glass-card p-6 rounded-3xl border border-gray-100 dark:border-white/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Hubungi via Email</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">support@studenthub.ac.id</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400">Live Chat Bantuan</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Tanya Virtual Assistant</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
