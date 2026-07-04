export interface Message {
  id?: string;
  sessionId?: string;
  role: 'user' | 'bot';
  content: string;
  createdAt?: string | Date;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}
