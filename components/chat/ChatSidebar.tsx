'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, MessageSquare, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Chat } from '@/lib/db/chats';
import { toast } from 'sonner';

interface ChatSidebarProps {
  activeChatId: string | null;
  onSelectChat: (chatId: string | null) => void;
}

export function ChatSidebar({ activeChatId, onSelectChat }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchChats = async () => {
    try {
      const res = await fetch('/api/chats');
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats);
      }
    } catch (error) {
      console.error('Failed to fetch chats', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [activeChatId]); // Refresh when active chat changes (e.g. new chat created)

  const handleDeleteChat = async (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this chat?')) return;

    try {
      const res = await fetch(`/api/chats/${chatId}`, { method: 'DELETE' });
      if (res.ok) {
        setChats(prev => prev.filter(c => c.id !== chatId));
        if (activeChatId === chatId) {
          onSelectChat(null);
        }
        toast.success('Chat deleted');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast.error('Failed to delete chat');
    }
  };

  return (
    <div className="flex flex-col h-full border-r bg-muted/10 w-64 shrink-0">
      <div className="p-4 border-b">
        <Button 
          onClick={() => onSelectChat(null)} 
          className="w-full justify-start gap-2" 
          variant="secondary"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center p-4">
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </div>
          ) : chats.length === 0 ? (
            <div className="text-center p-4 text-sm text-muted-foreground">
              No chat history
            </div>
          ) : (
            chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  "group flex items-center justify-between p-2 rounded-md cursor-pointer text-sm transition-colors hover:bg-muted",
                  activeChatId === chat.id ? "bg-muted font-medium" : "text-muted-foreground"
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <MessageSquare className="h-4 w-4 shrink-0" />
                  <span className="truncate">{chat.title || 'Untitled Chat'}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleDeleteChat(e, chat.id)}
                >
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
