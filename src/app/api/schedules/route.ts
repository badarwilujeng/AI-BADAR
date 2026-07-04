import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const schedules = await prisma.schedule.findMany({
      where: { userId: session.user.id },
      orderBy: { dayOfWeek: 'asc' },
    });

    return NextResponse.json(schedules);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { courseName, dayOfWeek, startTime, endTime, reminderOffset } = body;

    const stDate = new Date(startTime);
    const offsetMs = parseInt(reminderOffset) * 60000;
    const reminderDate = new Date(stDate.getTime() - offsetMs);

    const schedule = await prisma.schedule.create({
      data: {
        userId: session.user.id,
        courseName,
        dayOfWeek: parseInt(dayOfWeek),
        startTime: stDate,
        endTime: new Date(endTime),
        reminderOffset: parseInt(reminderOffset),
        reminderTime: reminderDate,
        lastNotified: false
      }
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Schedule ID is required' }, { status: 400 });
    }

    // Verify ownership before deleting
    const schedule = await prisma.schedule.findUnique({ where: { id } });
    if (!schedule || schedule.userId !== session.user.id) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    await prisma.schedule.delete({ where: { id } });

    return NextResponse.json({ message: 'Jadwal berhasil dibatalkan' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
