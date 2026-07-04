import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { token, email, newPassword } = await req.json();

    if (!token || !email || !newPassword) {
      return NextResponse.json(
        { message: 'Semua field harus diisi.' },
        { status: 400 }
      );
    }

    console.log('Reset attempt for:', email, 'with token:', token);
    
    // Find the token
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
        token: token,
      },
    });

    console.log('Verification token found:', verificationToken ? 'Yes' : 'No');

    if (!verificationToken) {
      return NextResponse.json(
        { message: 'Token tidak valid.' },
        { status: 400 }
      );
    }

    // Check if token expired
    if (new Date() > new Date(verificationToken.expires)) {
      await prisma.verificationToken.delete({
        where: { token: verificationToken.token },
      });
      return NextResponse.json(
        { message: 'Token sudah kedaluwarsa.' },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: 'User tidak ditemukan.' },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    try {
      // Update user password and delete token in a transaction
      await prisma.$transaction([
        prisma.user.update({
          where: { email },
          data: { password: hashedPassword },
        }),
        prisma.verificationToken.delete({
          where: {
            identifier_token: {
              identifier: email,
              token: token,
            },
          },
        }),
      ]);

      return NextResponse.json(
        { message: 'Password berhasil direset.' },
        { status: 200 }
      );
    } catch (dbError) {
      console.error('Database update error during reset:', dbError);
      return NextResponse.json(
        { message: 'Gagal memperbarui password di database.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Reset password global error:', error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan server.' },
      { status: 500 }
    );
  }
}
