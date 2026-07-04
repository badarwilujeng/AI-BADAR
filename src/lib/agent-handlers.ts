import prisma from "@/lib/prisma";

/**
 * Menghitung tanggal yang akan datang berdasarkan hari dalam seminggu dan string waktu.
 */
function calculateUpcomingDate(dayOfWeek: number, timeString: string) {
  const today = new Date();
  const currentDay = today.getDay(); // 0=Sunday, 1=Monday...
  const diff = (dayOfWeek + 7 - currentDay) % 7;
  const targetDate = new Date(today.getTime() + diff * 24 * 60 * 60 * 1000);
  const [h, m] = timeString.split(':');
  targetDate.setHours(parseInt(h), parseInt(m), 0, 0);
  
  // Jika hari sama tapi jam sudah lewat, geser ke minggu depan
  if (diff === 0 && targetDate < today) {
    targetDate.setDate(targetDate.getDate() + 7);
  }
  return targetDate;
}

export const agentHandlers = {
  get_student_profile: async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        studentId: true,
        university: true,
        major: true,
        bio: true,
        phoneNumber: true,
      }
    });
  },

  update_student_profile: async (userId: string, data: { name?: string; studentId?: string; university?: string; major?: string; bio?: string }) => {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        studentId: data.studentId,
        university: data.university,
        major: data.major,
        bio: data.bio,
      }
    });
  },

  get_my_schedules: async (userId: string) => {
    return await prisma.schedule.findMany({
      where: { userId: userId },
      orderBy: { dayOfWeek: 'asc' }
    });
  },

  add_to_schedule: async (userId: string, data: { courseName: string; dayOfWeek: number; startTime: string; endTime: string; reminderOffset?: number }) => {
    const { courseName, dayOfWeek, startTime, endTime, reminderOffset = 15 } = data;
    
    const stDate = calculateUpcomingDate(dayOfWeek, startTime);
    const enDate = calculateUpcomingDate(dayOfWeek, endTime);
    
    const offsetMs = reminderOffset * 60000;
    const reminderDate = new Date(stDate.getTime() - offsetMs);

    return await prisma.schedule.create({
      data: {
        userId,
        courseName,
        dayOfWeek,
        startTime: stDate,
        endTime: enDate,
        reminderOffset,
        reminderTime: reminderDate,
      }
    });
  },

  remove_from_schedule: async (userId: string, data: { scheduleId: string }) => {
    const { scheduleId } = data;
    
    // Verify ownership
    const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule || schedule.userId !== userId) {
      throw new Error("Jadwal tidak ditemukan atau Anda tidak memiliki akses.");
    }

    return await prisma.schedule.delete({ where: { id: scheduleId } });
  },

  set_schedule_status: async (userId: string, data: { scheduleId: string; isActive: boolean }) => {
    const { scheduleId, isActive } = data;
    
    // Verify ownership
    const schedule = await prisma.schedule.findUnique({ where: { id: scheduleId } });
    if (!schedule || schedule.userId !== userId) {
      throw new Error("Jadwal tidak ditemukan atau Anda tidak memiliki akses.");
    }

    return await prisma.schedule.update({
      where: { id: scheduleId },
      data: { isActive }
    });
  }
};
