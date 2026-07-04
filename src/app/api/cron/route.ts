import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import webpush from '@/lib/push';

// This acts as our Webhook / Cron target that runs every minute
export async function GET() {
  try {
    const now = new Date();

    const schedules = await prisma.schedule.findMany({
      where: {
        reminderTime: { lte: now },
        lastNotified: false,
        isActive: true
      },
      include: {
        user: { include: { pushSubs: true } }
      }
    });

    for (const schedule of schedules) {
      if (!schedule.user.pushSubs.length) continue;

      const payload = JSON.stringify({
        title: 'Virtual Assistant - Waktunya Kuliah!',
        body: `Perkuliahan ${schedule.courseName} akan dimulai dalam ${schedule.reminderOffset} menit.`,
        sound: true,
      });

      for (const sub of schedule.user.pushSubs) {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth
          }
        };

        try {
          await webpush.sendNotification(pushSubscription, payload);
        } catch (e) {
          console.error('Failed to send push notification', e);
        }
      }

      await prisma.schedule.update({
        where: { id: schedule.id },
        data: { lastNotified: true } // Mark as notified
      });
    }

    return NextResponse.json({ success: true, processed: schedules.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
