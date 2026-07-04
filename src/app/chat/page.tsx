import BubbleChat from '@/components/BubbleChat';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function ChatPage() {
  const session = await auth();

  // If not logged in, redirect away
  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background gradients for aesthetic glassy look */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] bg-purple-500/20 dark:bg-purple-600/10 rounded-full blur-3xl -z-10 animate-pulse delay-1000"></div>
      <div className="absolute -bottom-10 left-1/3 w-[35rem] h-[35rem] bg-pink-500/20 dark:bg-pink-600/10 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

      <div className="w-full relative z-10 flex flex-col max-w-5xl mx-auto h-full pt-10 pb-6">
        <BubbleChat />
      </div>
    </div>
  );
}
