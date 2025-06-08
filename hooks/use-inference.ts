import { useState, useCallback } from 'react';

export function useOpenAIResponse() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponse = useCallback(async (input: string, options?: any) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, options }),
      });
      const data = await res.json();
      if (res.ok) setResult(data.output);
      else setError(data.error || 'Unknown error');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return { result, loading, error, fetchResponse };
}