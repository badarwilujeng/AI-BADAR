import { z } from 'zod';
import { agentHandlers } from './agent-handlers';

export const aiTools = {
  get_student_profile: {
    description: 'Mendapatkan informasi profil lengkap mahasiswa yang sedang login.',
    parameters: z.object({}),
    execute: async (_args: Record<string, never>, { userId }: { userId: string }) => {
      return await agentHandlers.get_student_profile(userId);
    },
  },
  update_student_profile: {
    description: 'Memperbarui informasi profil mahasiswa seperti nama, NIM, universitas, jurusan, atau bio.',
    parameters: z.object({
      name: z.string().optional().describe('Nama lengkap baru'),
      studentId: z.string().optional().describe('NIM Baru'),
      university: z.string().optional().describe('Nama Universitas Baru'),
      major: z.string().optional().describe('Jurusan Baru'),
      bio: z.string().optional().describe('Bio singkat baru'),
    }),
    execute: async (args: { name?: string; studentId?: string; university?: string; major?: string; bio?: string }, { userId }: { userId: string }) => {
      return await agentHandlers.update_student_profile(userId, args);
    },
  },
  get_my_schedules: {
    description: 'Mendapatkan daftar semua jadwal kuliah dan pengingat yang dimiliki mahasiswa.',
    parameters: z.object({}),
    execute: async (_args: Record<string, never>, { userId }: { userId: string }) => {
      return await agentHandlers.get_my_schedules(userId);
    },
  },
  add_to_schedule: {
    description: 'Menambahkan jadwal kuliah baru ke kalender mahasiswa.',
    parameters: z.object({
      courseName: z.string().describe('Nama Mata Kuliah'),
      dayOfWeek: z.number().describe('Hari dalam seminggu (0=Minggu, 1=Senin, ..., 6=Sabtu)'),
      startTime: z.string().describe('Jam mulai dalam format HH:mm (contoh: 08:30)'),
      endTime: z.string().describe('Jam selesai dalam format HH:mm (contoh: 10:00)'),
      reminderOffset: z.number().optional().default(15).describe('Pengingat dalam menit sebelum mulai'),
    }),
    execute: async (args: { courseName: string; dayOfWeek: number; startTime: string; endTime: string; reminderOffset?: number }, { userId }: { userId: string }) => {
      return await agentHandlers.add_to_schedule(userId, args);
    },
  },
  remove_from_schedule: {
    description: 'Menghapus jadwal kuliah berdasarkan ID jadwal.',
    parameters: z.object({
      scheduleId: z.string().describe('ID unik jadwal yang akan dihapus'),
    }),
    execute: async (args: { scheduleId: string }, { userId }: { userId: string }) => {
      return await agentHandlers.remove_from_schedule(userId, args);
    },
  },
  set_schedule_status: {
    description: 'Mengaktifkan atau menonaktifkan notifikasi jadwal.',
    parameters: z.object({
      scheduleId: z.string().describe('ID unik jadwal'),
      isActive: z.boolean().describe('True untuk mengaktifkan jadwal, False untuk menonaktifkan'),
    }),
    execute: async (args: { scheduleId: string; isActive: boolean }, { userId }: { userId: string }) => {
      return await agentHandlers.set_schedule_status(userId, args);
    },
  },
};
