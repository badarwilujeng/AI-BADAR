import { streamText, tool, stepCountIs, type ToolSet } from 'ai';
import { google } from '@ai-sdk/google';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { aiTools } from '@/lib/ai-tools';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const userId = session.user.id;
    const { messages, sessionId } = await req.json();

    if (!messages) {
      return new Response('Messages are required', { status: 400 });
    }

    let currentSessionId = sessionId;

    // --- System Context Injection ---
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const currentDayName = days[now.getDay()];
    const currentTimeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const currentDateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

    const userProfile = await prisma.user.findUnique({ where: { id: userId } });
    const scheduleCount = await prisma.schedule.count({ where: { userId } });

    const systemInstruction = `Kamu adalah "AI Alat Bantu" - asisten virtual mahasiswa yang cerdas dan proaktif.
Identitas User: Nama: ${userProfile?.name || 'Mahasiswa'}, Jurusan: ${userProfile?.major || 'Belum diisi'}.
Konteks Waktu: Hari ini ${currentDayName}, ${currentDateStr}. Jam: ${currentTimeStr}.
Jumlah Jadwal Saat Ini: ${scheduleCount} jadwal.

KEMAMPUAN AGENTIK:
1. Kamu memiliki AKSES ke alat bantu (Tools) untuk mengelola jadwal kuliah dan profil user.
2. Jika user meminta sesuatu terkait jadwal (tambah, hapus, lihat, aktifkan, nonaktifkan), GUNAKAN tool yang tersedia. Jangan berhalusinasi.
3. Jawab dalam bahasa Indonesia yang ramah namun profesional. Gunakan format markdown yang rapi.`;

    // Ensure session exists
    if (!currentSessionId) {
      const lastMessage = messages[messages.length - 1]?.content || 'New Chat';
      const newSession = await prisma.chatSession.create({
        data: {
          userId,
          title: lastMessage.substring(0, 30) + '...',
        }
      });
      currentSessionId = newSession.id;
    }

    // Save user message (the last one)
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage && lastUserMessage.role === 'user') {
      await prisma.message.create({
        data: {
          chatSessionId: currentSessionId,
          role: 'user',
          content: lastUserMessage.content,
        }
      });
    }

    // Convert aiTools to the format expected by streamText
    const tools: ToolSet = {};
    Object.entries(aiTools).forEach(([name, definition]) => {
      tools[name] = tool({
        description: definition.description,
        parameters: definition.parameters,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        execute: async (args: any) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return await (definition as any).execute(args, { userId });
        },
      } as never);
    });

    const result = streamText({
      model: google('gemini-2.0-flash'),
      system: systemInstruction,
      messages,
      tools,
      stopWhen: stepCountIs(5),
      onFinish: async ({ text }) => {
        // Save bot response
        if (text) {
          await prisma.message.create({
            data: {
              chatSessionId: currentSessionId,
              role: 'bot',
              content: text,
            }
          });
        }
      },
    });

    return result.toTextStreamResponse({
      headers: {
        'x-session-id': currentSessionId,
      }
    });

  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    const message = error instanceof Error ? error.message : 'Internal server error';
    return new Response(JSON.stringify({ error: message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
