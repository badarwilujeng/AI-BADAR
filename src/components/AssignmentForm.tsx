'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Calendar, Image as ImageIcon, Loader2, Sparkles, UploadCloud, X } from 'lucide-react';

export default function AssignmentForm() {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const title = formData.get('title') as string;
      const description = formData.get('description') as string;
      const dueDate = formData.get('dueDate') as string;
      
      let imageUrl = null;

      // Upload image first if exists
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData,
        });
        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          imageUrl = uploadJson.url;
        }
      }

      // Create Assessment
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, dueDate, imageUrl }),
      });

      if (res.ok) {
        e.currentTarget.reset();
        removeImage();
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500">
          <Sparkles size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Buat Tugas</h2>
          <p className="text-sm font-medium text-gray-500">Catat tugas baru Anda.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Judul Tugas</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-3 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium"
            placeholder="Contoh: Makalah Sistem Digital"
          />
        </div>

        <div>
           <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Tenggat Waktu / Deadline</label>
           <div className="relative">
             <Calendar className="absolute left-4 top-3.5 text-gray-400" size={20} />
             <input type="datetime-local" name="dueDate" required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-2xl pl-12 pr-5 py-3 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium" />
           </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Unggah Bukti / Penjelasan Gambar</label>
          <div className="w-full border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors relative cursor-pointer group/upload">
             {!imagePreview ? (
               <>
                 <UploadCloud size={40} className="text-gray-400 group-hover/upload:text-green-500 transition-colors mb-2" />
                 <p className="text-sm font-medium text-gray-500 text-center">Klik untuk memilih gambar atau *drag-and-drop*</p>
               </>
             ) : (
               <div className="w-full relative">
                  <Image src={imagePreview} alt="Preview" width={400} height={160} className="w-full h-40 object-cover rounded-xl" />
                 <button type="button" onClick={(e) => { e.preventDefault(); removeImage(); }} className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                   <X size={16} />
                 </button>
               </div>
             )}
             <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Deskripsi (Opsional)</label>
          <textarea 
            name="description" 
            className="w-full bg-slate-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-2xl px-5 py-4 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 transition-all font-medium resize-none min-h-[100px]"
            placeholder="Catatan pengerjaan..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-2xl transition-all disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-2 shadow-xl shadow-green-500/20 hover:shadow-green-500/40 active:scale-[0.98]"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <><ImageIcon size={20} /> Simpan Tugas</>}
        </button>
      </form>
    </div>
  );
}
