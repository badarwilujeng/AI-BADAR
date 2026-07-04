import { FunctionDeclaration, SchemaType } from "@google/generative-ai";

export const agentTools: { functionDeclarations: FunctionDeclaration[] } = {
  functionDeclarations: [
    {
      name: "get_student_profile",
      description: "Mendapatkan informasi profil lengkap mahasiswa yang sedang login.",
    },
    {
      name: "update_student_profile",
      description: "Memperbarui informasi profil mahasiswa seperti nama, NIM, universitas, jurusan, atau bio.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          name: { type: SchemaType.STRING, description: "Nama lengkap baru" },
          studentId: { type: SchemaType.STRING, description: "NIM Baru" },
          university: { type: SchemaType.STRING, description: "Nama Universitas Baru" },
          major: { type: SchemaType.STRING, description: "Jurusan Baru" },
          bio: { type: SchemaType.STRING, description: "Bio singkat baru" },
        },
      },
    },
    {
      name: "get_my_schedules",
      description: "Mendapatkan daftar semua jadwal kuliah dan pengingat yang dimiliki mahasiswa.",
    },
    {
      name: "add_to_schedule",
      description: "Menambahkan jadwal kuliah baru ke kalender mahasiswa.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          courseName: { type: SchemaType.STRING, description: "Nama Mata Kuliah" },
          dayOfWeek: { type: SchemaType.NUMBER, description: "Hari dalam seminggu (0=Minggu, 1=Senin, ..., 6=Sabtu)" },
          startTime: { type: SchemaType.STRING, description: "Jam mulai dalam format HH:mm (contoh: 08:30)" },
          endTime: { type: SchemaType.STRING, description: "Jam selesai dalam format HH:mm (contoh: 10:00)" },
          reminderOffset: { type: SchemaType.NUMBER, description: "Pengingat dalam menit sebelum mulai (default: 15)" },
        },
        required: ["courseName", "dayOfWeek", "startTime", "endTime"],
      },
    },
    {
      name: "remove_from_schedule",
      description: "Menghapus jadwal kuliah berdasarkan ID jadwal.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          scheduleId: { type: SchemaType.STRING, description: "ID unik jadwal yang akan dihapus" },
        },
        required: ["scheduleId"],
      },
    },
    {
      name: "set_schedule_status",
      description: "Mengaktifkan atau menonaktifkan notifikasi jadwal. Gunakan ini jika user meminta untuk menyalakan atau mematikan jadwal tertentu.",
      parameters: {
        type: SchemaType.OBJECT,
        properties: {
          scheduleId: { type: SchemaType.STRING, description: "ID unik jadwal" },
          isActive: { type: SchemaType.BOOLEAN, description: "True untuk mengaktifkan jadwal, False untuk menonaktifkan" },
        },
        required: ["scheduleId", "isActive"],
      },
    }
  ],
};
