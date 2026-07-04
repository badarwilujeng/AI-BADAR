export interface Schedule {
  id?: string;
  userId?: string;
  courseName: string;
  dayOfWeek: number;
  startTime: Date | string;
  endTime: Date | string;
  reminderOffset: number;
  reminderTime?: Date | string;
  lastNotified?: boolean;
  isActive?: boolean;
}
