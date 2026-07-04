import { type LucideIcon } from 'lucide-react';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gemini',
    name: 'Gemini AI',
    provider: 'Google',
    icon: Sparkles,
    color: 'from-blue-500 to-indigo-600',
    description: 'Model cerdas dari Google, sangat baik untuk penalaran dan konteks luas.',
  },
  {
    id: 'gpt',
    name: 'GPT AI',
    provider: 'OpenAI',
    icon: Zap,
    color: 'from-emerald-500 to-teal-700',
    description: 'Standar industri untuk kreativitas dan akurasi instruksi.',
  },
  {
    id: 'deepseek',
    name: 'DeepSeek AI',
    provider: 'DeepSeek',
    icon: BrainCircuit,
    color: 'from-cyan-400 to-blue-600',
    description: 'Model efisien berkinerja tinggi, sangat baik untuk pemrograman.',
  },
  {
    id: 'claude',
    name: 'Claude AI',
    provider: 'Anthropic',
    icon: Wind,
    color: 'from-orange-400 to-red-600',
    description: 'Fokus pada keamanan, kejujuran, dan penulisan kreatif.',
  },
  {
    id: 'blackbox',
    name: 'Blackbox AI',
    provider: 'Blackbox',
    icon: Box,
    color: 'from-slate-700 to-black',
    description: 'Asisten coding dan pencarian teknis yang sangat cepat.',
  },
  {
    id: 'copilot',
    name: 'Copilot AI',
    provider: 'Microsoft',
    icon: Bot,
    color: 'from-indigo-400 to-blue-500',
    description: 'Terintegrasi dengan ekosistem Microsoft, ahli dalam produktivitas.',
  },
  {
    id: 'question',
    name: 'Question AI',
    provider: 'QuestionAI',
    icon: MessageSquare,
    color: 'from-pink-500 to-rose-600',
    description: 'Spesialis penyelesaian soal akademik dan penjelasan konsep.',
  },
];
