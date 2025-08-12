// src/hooks/useSummarizeArticle.js
import { useState } from 'react';

export default function useSummarizeArticle() {
  const [summary, setArticleSummary] = useState(null);
  const [articleLoading, setArticleLoading] = useState(true);
  const [articleError, setArticleError] = useState('');

  const handleArticleSummary = async (textContent) => {
    setArticleLoading(true);
    setArticleError('');
    setArticleSummary(null);

  let finalText = (textContent || '').trim(); // now guaranteed string

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/summarize-article`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleText: finalText }),
      });

      if (!res.ok) {
        const errorData = await res.text();
        console.error('❌ API Error Response:', errorData);
        throw new Error('Failed to summarize article');
      }

      const data = await res.json();
      if (!data.summary || typeof data.summary !== 'object') {
        throw new Error('Invalid summary format received');
      }

      setArticleSummary(data.summary);
    } catch (err) {
      console.error(err);
      setArticleError('Something went wrong while summarizing the article.');
    } finally {
      setArticleLoading(false);
    }
  };

  return { summary, articleLoading, articleError, handleArticleSummary };
}
