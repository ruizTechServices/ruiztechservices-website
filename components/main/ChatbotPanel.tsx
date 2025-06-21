'use client';

import { InputMain } from "@/components/main/input-main";
import { Loader2 } from "lucide-react";
import { useInference } from '@/hooks/use-inference';
import React from "react";

/**
 * ChatbotPanel - Modular chatbot UI panel for OpenAI-style chat response.
 * Handles its own OpenAI response state and logic.
 */
const MODEL_OPTIONS = [
  { value: "gpt-4.1", label: "OpenAI GPT-4.1" },
  { value: "gpt-3.5-turbo", label: "OpenAI GPT-3.5 Turbo" },
  { value: "mistral-large-latest", label: "Mistral Large" },
  { value: "mistral-small", label: "Mistral Small" }
];

export const ChatbotPanel: React.FC = () => {
  const { result, loading, error, fetchResponse } = useInference();
  const [model, setModel] = React.useState(MODEL_OPTIONS[0].value);

  const handleFinalSubmit = (text: string) => {
    if (text.trim()) {
      fetchResponse(text, { model });
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-lg p-4 md:p-6 mx-auto my-2">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Model</label>
        <select
          className="w-full rounded-md border px-3 py-2 text-sm"
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          {MODEL_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
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
  );
};
