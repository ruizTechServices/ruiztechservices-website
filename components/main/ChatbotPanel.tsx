'use client';

import React, { useRef, useEffect } from "react";
import { useChat } from "@/hooks/use-chat";
import { Loader2, Send, Bot, User, AlertCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { BalanceBadge } from "@/components/sections/BalanceBadge";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MarkdownRenderer } from "@/components/chat/MarkdownRenderer";

const MODEL_OPTIONS = [
  { value: "gpt-4o", label: "OpenAI GPT-4o" },
  { value: "mistral-large-latest", label: "Mistral Large" },
  { value: "mistral-small-latest", label: "Mistral Small" }
];

export const ChatbotPanel: React.FC = () => {
  const [model, setModel] = React.useState(MODEL_OPTIONS[0].value);
  const [inputValue, setInputValue] = React.useState("");
  const [showCreditAlert, setShowCreditAlert] = React.useState(false);
  const [selectedChatId, setSelectedChatId] = React.useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, loading, error, sendMessage, activeChatId } = useChat({
    model,
    chatId: selectedChatId,
    onCreditError: () => setShowCreditAlert(true),
    onChatCreated: (id) => setSelectedChatId(id)
  });

  // Update selectedChatId if activeChatId changes internally (though we control it mostly via prop now)
  useEffect(() => {
    if (activeChatId && activeChatId !== selectedChatId) {
        setSelectedChatId(activeChatId);
    }
  }, [activeChatId]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || loading) return;

    setShowCreditAlert(false);
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex h-[600px] md:h-[700px] w-full max-w-6xl mx-auto bg-card rounded-xl shadow-xl border overflow-hidden">
      {/* Sidebar (Desktop) */}
      <div className="hidden md:block h-full border-r bg-muted/10 w-64 shrink-0">
        <ChatSidebar 
            activeChatId={selectedChatId} 
            onSelectChat={setSelectedChatId} 
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="p-4 border-b bg-muted/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden -ml-2">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-72">
                    <ChatSidebar 
                        activeChatId={selectedChatId} 
                        onSelectChat={(id) => {
                            setSelectedChatId(id);
                            setMobileMenuOpen(false);
                        }} 
                    />
                </SheetContent>
            </Sheet>

            <Bot className="h-5 w-5 text-primary" />
            <h2 className="font-semibold hidden sm:inline-block">AI Assistant</h2>
            </div>
            <div className="flex items-center gap-4">
                <BalanceBadge />
                <Select value={model} onValueChange={setModel}>
                    <SelectTrigger className="w-[140px] sm:w-[180px] h-8 text-xs">
                    <SelectValue placeholder="Select Model" />
                    </SelectTrigger>
                    <SelectContent>
                    {MODEL_OPTIONS.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 scroll-smooth" ref={scrollRef}>
            <div className="space-y-4">
            {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-20 opacity-50">
                <Bot className="h-12 w-12 mb-4" />
                <p>Start a conversation with the AI.</p>
                <p className="text-xs mt-1">Each response costs 1 credit.</p>
                </div>
            )}
            
            {messages.map((msg) => (
                <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                {msg.role === 'assistant' && (
                    <Avatar className="h-8 w-8 border shrink-0">
                    <AvatarImage src="/bot-avatar.png" />
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                )}
                
                <div
                    className={`rounded-lg px-4 py-2 max-w-[85%] sm:max-w-[75%] text-sm ${
                    msg.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground border w-full'
                    } ${msg.status === 'error' ? 'border-destructive/50 bg-destructive/10 text-destructive' : ''}`}
                >
                    {msg.role === 'assistant' ? (
                        <MarkdownRenderer content={msg.content} />
                    ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                    )}
                    
                    {msg.status === 'error' && (
                        <p className="text-xs mt-1 opacity-70">Failed to send</p>
                    )}
                </div>

                {msg.role === 'user' && (
                    <Avatar className="h-8 w-8 border shrink-0">
                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                )}
                </div>
            ))}

            {loading && (
                <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8 border shrink-0">
                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="bg-muted border rounded-lg px-4 py-2 flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                </div>
                </div>
            )}
            </div>
        </div>

        {/* Error / Alert Area */}
        {showCreditAlert && (
            <div className="px-4 py-2">
                <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle className="ml-2 text-sm font-semibold">Insufficient Credits</AlertTitle>
                    <AlertDescription className="ml-2 text-xs flex items-center gap-2 mt-1">
                        You have run out of credits. 
                        <Link href="/pricing" className="underline font-bold hover:text-white">
                            Purchase more
                        </Link> 
                        to continue.
                    </AlertDescription>
                </Alert>
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-background shrink-0">
            <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                className="flex-1 bg-transparent border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
            />
            <Button type="submit" size="icon" disabled={loading || !inputValue.trim()}>
                <Send className="h-4 w-4" />
            </Button>
            </form>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground px-1">
                <span>Model: {MODEL_OPTIONS.find(m => m.value === model)?.label}</span>
                <span>Cost: 1 Credit / Message</span>
            </div>
        </div>
      </div>
    </div>
  );
};
