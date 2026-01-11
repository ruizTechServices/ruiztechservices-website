import { useState, useCallback, useEffect } from 'react';
import { AIMessage } from '@/lib/ai/types';
import { toast } from 'sonner';

export type ChatMessage = AIMessage & {
  id: string;
  status?: 'sending' | 'sent' | 'error';
};

interface UseChatOptions {
  model?: string;
  chatId?: string | null;
  onCreditError?: () => void;
  onChatCreated?: (chatId: string) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(options.chatId || null);

  // Sync activeChatId with props if it changes (e.g. navigation)
  useEffect(() => {
    if (options.chatId !== undefined) {
        setActiveChatId(options.chatId);
    }
  }, [options.chatId]);

  // Load chat history when activeChatId changes
  useEffect(() => {
    if (!activeChatId) {
        setMessages([]);
        return;
    }

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/chats/${activeChatId}`);
            if (!res.ok) throw new Error('Failed to load chat history');
            const data = await res.json();
            
            // Map DB messages to ChatMessage type
            const history: ChatMessage[] = data.messages.map((m: any) => ({
                id: m.id,
                role: m.role,
                content: m.content,
                status: 'sent'
            }));
            setMessages(history);
        } catch (err) {
            console.error(err);
            toast.error('Could not load chat history');
        } finally {
            setLoading(false);
        }
    };

    fetchHistory();
  }, [activeChatId]);

  const sendMessage = useCallback(async (content: string, modelOverride?: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(), // Temp ID
      role: 'user',
      content,
      status: 'sending'
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      const model = modelOverride || options.model || 'gpt-4o';
      
      const payload = {
        message: content,
        model,
        chatId: activeChatId
      };

      const res = await fetch('/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
            options.onCreditError?.();
            throw new Error(data.error || 'Insufficient credits');
        }
        throw new Error(data.error || 'Failed to generate response');
      }

      // If a new chat was created, update state and notify
      if (data.chatId && data.chatId !== activeChatId) {
        setActiveChatId(data.chatId);
        options.onChatCreated?.(data.chatId);
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.output,
        status: 'sent'
      };

      setMessages(prev => {
        // Update the user message to sent status
        const next = prev.map(m => m.id === userMsg.id ? { ...m, status: 'sent' as const } : m);
        return [...next, assistantMsg];
      });

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(msg);
      toast.error(msg);
      
      // Mark user message as error
      setMessages(prev => prev.map(m => 
        m.id === userMsg.id ? { ...m, status: 'error' as const } : m
      ));
    } finally {
      setLoading(false);
    }
  }, [activeChatId, options]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
    setActiveChatId(null);
  }, []);

  return {
    messages,
    loading,
    error,
    activeChatId,
    sendMessage,
    clearMessages
  };
}
