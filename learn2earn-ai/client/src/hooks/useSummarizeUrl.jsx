// src/hooks/useSummarizeUrl.js
import { useState } from 'react';

export default function useSummarizeUrl() {
  const [urlSummary, setUrlSummary] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUrlSummary = async (link) => {
    setLoading(true);
    setError('');
    setUrlSummary(null);
    setUrl(link);

    try {
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const res = await fetch(`${base}/api/summarize-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to summarize URL: ${errorData}`);
      }

      const data = await res.json();
      if (!data.summary || typeof data.summary !== 'string') {
        throw new Error('No valid summary returned');
      }

      setUrlSummary(data.summary);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while summarizing URL.');
    } finally {
      setLoading(false);
    }
  };

  return { urlSummary, url, loading, error, handleUrlSummary };
}
