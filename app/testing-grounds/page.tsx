'use client';

import { InputMain } from "@/components/main/input-main";
import { useOpenAIResponse } from '@/hooks/use-inference';
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function Home() {
  const { result, loading, error, fetchResponse } = useOpenAIResponse();

  const handleFinalSubmit = (text: string) => {
    if (text.trim()) {
      fetchResponse(text, { model: 'gpt-4.1' });
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Ask OpenAI</h1>
        <Link 
          href="/testing-grounds" 
          className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-md transition-colors"
        >
          Testing Grounds
        </Link>
        <Link 
          href="/" 
          className="text-sm bg-secondary/20 hover:bg-secondary/30 text-secondary-foreground px-3 py-1 rounded-md transition-colors"
        >
          Home
        </Link>
      </div>
      
      <div className="bg-card rounded-lg shadow-sm p-4 md:p-6">
        <InputMain onFinalSubmit={handleFinalSubmit} />
        
        <div className="mt-6">
          {loading && (
            <div className="flex items-center justify-center p-4 text-muted-foreground">
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              <span>Processing your request...</span>
            </div>
          )}
          
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 mt-4">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          
          {result && !loading && (
            <div className="bg-muted/50 rounded-md p-4 mt-4">
              <h2 className="text-sm font-medium text-muted-foreground mb-2">Response</h2>
              <div className="whitespace-pre-wrap text-foreground">{result}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
