// src/hooks/useGenerateContent.js
import { useState } from 'react';

export default function useGenerateContent() {
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContent = async (newTopic, newLevel) => {
    setLoading(true);
    setError('');
    setContent(null);
    setTopic(newTopic);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: newTopic, level: newLevel }),
      });

      if (!res.ok) throw new Error('Failed to fetch content');

      const data = await res.json();
      const raw = data?.content?.content;

      if (!raw) throw new Error('Invalid response format');

      const structuredContent = {
        Level: raw.Level || '',
        Tags: raw.Tags || [],
        Source: raw.Source || '',
        Lesson: raw.Lesson || '',
        MCQs: raw.MCQs || '',
        Flashcards: raw.Flashcards || '',
        ReflectionPrompts: raw.ReflectionPrompts || [],
      };

      setContent(structuredContent);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while generating content.');
    } finally {
      setLoading(false);
    }
  };

  return { content, topic, loading, error, handleContent };
}
 