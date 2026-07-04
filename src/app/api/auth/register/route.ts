import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { studentId, name, email, password } = await req.json();

    if (!studentId || !name || !email || !password) {
      return NextResponse.json(
        { message: 'Semua field harus diisi.' },
        { status: 400 }
      );
    }

    // Check if studentId already exists
    const existingStudent = await prisma.user.findUnique({
      where: { studentId },
    });

    if (existingStudent) {
      return NextResponse.json(
        { message: 'NIM sudah terdaftar.' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar.' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await prisma.user.create({
      data: {
        studentId,
        name,
        email,
        password: hashedPassword,
        role: 'student',
      },
    });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'Registrasi berhasil', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
