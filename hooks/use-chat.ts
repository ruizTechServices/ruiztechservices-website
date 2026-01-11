import { useState, useCallback } from 'react';
import { AIMessage } from '@/lib/ai/types';
import { toast } from 'sonner';

export type ChatMessage = AIMessage & {
  id: string;
  status?: 'sending' | 'sent' | 'error';
};

interface UseChatOptions {
  model?: string;
  onCreditError?: () => void;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, modelOverride?: string) => {
    if (!content.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      status: 'sending'
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setError(null);

    try {
      // Prepare messages for API (exclude id and status)
      const apiMessages = [...messages, userMsg].map(({ role, content }) => ({
        role,
        content
      }));

      const model = modelOverride || options.model;
      const isMistral = model?.startsWith('mistral');
      const endpoint = isMistral ? '/api/mistral' : '/api/inference';
      
      const payload = isMistral 
        ? { messages: apiMessages, model }
        : { messages: apiMessages, options: { model } };

      const res = await fetch(endpoint, {
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
  }, [messages, options]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearMessages
  };
}
