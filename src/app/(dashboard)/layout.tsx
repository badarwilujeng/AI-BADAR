import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect('/login');

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar session={session} />
        <main className="flex-1 overflow-y-auto bg-background p-8">
           <div className="max-w-7xl mx-auto">
             {children}
           </div>
           
           {/* Footer */}
           <footer className="mt-16 pt-8 border-t border-border-custom flex items-center justify-between text-[11px] font-medium text-gray-400">
             <p>© 2024 Student Hub. All rights reserved.</p>
             <div className="flex items-center gap-6">
               <a href="#" className="hover:text-indigo-500 transition-colors">Kebijakan Privasi</a>
               <a href="#" className="hover:text-indigo-500 transition-colors">Syarat & Ketentuan</a>
             </div>
           </footer>
        </main>
      </div>
    </div>
  );
}
