import { useState, useCallback } from 'react';

export function useInference() {
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponse = useCallback(async (input: string, options: { model?: string } = {}) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const isMistral = options?.model?.startsWith('mistral');
      const endpoint = isMistral ? '/api/mistral' : '/api/inference';
      const payload = isMistral ? { input, model: options?.model } : { input, options };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
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