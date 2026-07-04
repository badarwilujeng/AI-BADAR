'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Copy, FileDown, Loader2, Sparkles, ArrowLeft } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface BubbleChatProps {
  initialMessages?: any[];
  sessionId?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function BubbleChat({ initialMessages = [], sessionId: initialSessionId }: BubbleChatProps) {
  const { t } = useLanguage();
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(
    initialMessages.map((m, i) => ({
      id: m.id || String(i),
      role: (m.role === 'bot' ? 'assistant' : m.role) as 'user' | 'assistant',
      content: m.content || '',
    }))
  );
  const currentSessionId = useRef<string | undefined>(initialSessionId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          sessionId: currentSessionId.current,
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      // Capture session ID from response header if available
      const newSessionId = response.headers.get('x-session-id');
      if (newSessionId) currentSessionId.current = newSessionId;

      // Read streaming text
      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let assistantContent = '';
      const assistantId = (Date.now() + 1).toString();

      // Add empty assistant message to start
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        // Parse text stream - format is `0:"text"\n`
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (line.startsWith('0:')) {
            try {
              const text = JSON.parse(line.slice(2));
              assistantContent += text;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: assistantContent } : m))
              );
            } catch {
              // skip malformed lines
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const exportPdf = async () => {
    if (!chatRef.current) return;
    try {
      const canvas = await html2canvas(chatRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: '#f8fafc',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);
      pdf.save('chat-history.pdf');
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert(t('chat.error_pdf'));
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] w-full max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden glass shadow-2xl transition-all duration-500">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-indigo-600/90 to-purple-700/90 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="text-white/70 hover:text-white">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h2 className="text-white font-black text-xl tracking-tight leading-none">{t('chat.header')}</h2>
              <p className="text-indigo-100/70 text-[10px] font-bold mt-1.5 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                AI Assistant Student Hub
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={exportPdf}
              className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90 border border-white/5"
              title={t('chat.export')}
            >
              <FileDown size={22} />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto p-8 space-y-8 bg-transparent scrollbar-thin scrollbar-thumb-indigo-500/20"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
            <div className="w-24 h-24 bg-indigo-500/10 rounded-full flex items-center justify-center animate-bounce">
              <Sparkles size={48} className="text-indigo-500" />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 dark:text-white">{t('chat.welcome_title')}</p>
              <p className="text-gray-500 dark:text-slate-400 max-w-sm mt-3 font-medium">
                {t('chat.welcome_desc')}
              </p>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out`}
          >
            <div
              className={`group relative max-w-[85%] rounded-[2rem] p-6 sm:p-7 ${
                msg.role === 'user'
                  ? 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white rounded-tr-none shadow-xl shadow-indigo-500/20'
                  : 'bg-white/80 dark:bg-slate-900/80 dark:text-gray-100 text-gray-800 rounded-tl-none shadow-lg border border-white/50 dark:border-slate-800/50 backdrop-blur-md'
              }`}
            >
              <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-800 prose-pre:rounded-xl">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                  {msg.content}
                </ReactMarkdown>
              </div>

              {msg.role !== 'user' && (
                <button
                  onClick={() => copyText(msg.content)}
                  className="absolute -right-12 top-0 p-2.5 text-gray-400 hover:text-indigo-500 opacity-0 group-hover:opacity-100 transition-all bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:scale-110 active:scale-95"
                  title={t('chat.copy')}
                >
                  <Copy size={16} />
                </button>
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex justify-start">
            <div className="bg-white/80 dark:bg-slate-900/80 rounded-[2rem] rounded-tl-none p-6 border border-white/50 dark:border-slate-800/50 backdrop-blur-md shadow-lg">
              <div className="flex gap-2 items-center h-6">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/50 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/50 dark:bg-slate-950/50 backdrop-blur-2xl border-t border-gray-200 dark:border-slate-800">
        <form onSubmit={handleSubmit} className="relative flex items-center max-w-5xl mx-auto group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={t('chat.placeholder')}
            className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2rem] py-5 pl-8 pr-16 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/50 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 shadow-inner text-sm sm:text-base font-medium"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2.5 p-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-30 text-white rounded-full transition-all shadow-lg hover:shadow-indigo-500/30 disabled:grayscale flex items-center justify-center transform active:scale-95 group-hover:scale-105"
          >
            {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} className="ml-1" />}
          </button>
        </form>
      </div>
    </div>
  );
}
