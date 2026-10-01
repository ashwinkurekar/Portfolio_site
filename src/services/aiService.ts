import { getLocalFallbackAnswer } from './aiKnowledge';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export async function askAshwinAI(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const formattedHistory = history.map((m) => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.text,
    }));

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: formattedHistory,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.reply === 'string' && data.reply.trim().length > 0) {
        return data.reply;
      }
    }
  } catch {
    // Network or server endpoint unavailable - gracefully proceed to local knowledge engine
  }

  // Guaranteed fallback powered by portfolio knowledge base
  return getLocalFallbackAnswer(message);
}
