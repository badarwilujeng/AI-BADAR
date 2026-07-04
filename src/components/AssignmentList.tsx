'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { CheckCircle2, Clock, Check, Trash2, Expand } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  description?: string | null;
  dueDate: string;
  isCompleted: boolean;
  imageUrl?: string | null;
}

export default function AssignmentList() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignments = async () => {
    try {
      const res = await fetch('/api/assignments');
      const data = await res.json();
      setAssignments(data.assignments || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchAssignments();
    // Quick polling to reflect additions from form refresh
    const interval = setInterval(fetchAssignments, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleComplete = async (id: string, currentStatus: boolean) => {
    await fetch(`/api/assignments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isCompleted: !currentStatus }),
    });
    fetchAssignments();
  };

  const deleteAssignment = async (id: string) => {
    await fetch(`/api/assignments/${id}`, { method: 'DELETE' });
    fetchAssignments();
  };

  if (loading) {
    return <div className="p-8 text-center glass rounded-[2.5rem] mt-8 text-gray-500 font-bold animate-pulse">Memuat Tugas...</div>;
  }

  if (assignments.length === 0) {
    return (
      <div className="glass flex flex-col items-center justify-center p-16 text-center rounded-[2.5rem] mt-8">
        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-500/50 mb-6 border border-green-500/20">
          <CheckCircle2 size={48} />
        </div>
        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">Semua Tugas Selesai!</h3>
        <p className="text-gray-500 font-medium">Bagus sekali! Tidak ada tugas yang menunggu saat ini.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 mt-8 lg:mt-0">
      {assignments.map((task) => (
        <div key={task.id} className={`glass overflow-hidden rounded-[2.5rem] group transition-all duration-300 ${task.isCompleted ? 'opacity-60 scale-95' : 'hover:shadow-xl hover:-translate-y-1'}`}>
           <div className={`p-6 flex flex-col sm:flex-row gap-6 ${task.isCompleted ? 'bg-slate-100/50 dark:bg-slate-900/30' : ''}`}>
              
              {/* Image Preview */}
              {task.imageUrl && (
                <div className="relative w-full sm:w-48 h-32 flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer" onClick={() => window.open(task.imageUrl!, '_blank')}>
                   <Image src={task.imageUrl} alt={task.title} width={192} height={128} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white">
                      <Expand size={24} className="mb-1" />
                      <span className="text-[10px] font-black tracking-widest uppercase">Lihat Full</span>
                   </div>
                </div>
              )}

              {/* Task Content */}
              <div className="flex-1 flex flex-col justify-center">
                 <div className="flex items-start justify-between mb-2">
                    <h3 className={`text-xl font-black ${task.isCompleted ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h3>
                    <div className="flex gap-2">
                        <button onClick={() => toggleComplete(task.id, task.isCompleted)} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${task.isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 dark:bg-slate-700 text-gray-400 hover:bg-green-100 hover:text-green-600'}`}>
                          <Check size={16} strokeWidth={3} />
                        </button>
                        <button onClick={() => deleteAssignment(task.id)} className="w-8 h-8 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white">
                          <Trash2 size={16} />
                        </button>
                    </div>
                 </div>

                 {task.description && (
                   <p className="text-sm font-medium text-gray-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                     {task.description}
                   </p>
                 )}

                 <div className="flex items-center gap-2 mt-auto">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${task.isCompleted ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20'}`}>
                      <Clock size={14} />
                      {new Date(task.dueDate).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      ))}
    </div>
  );
}
