// src/utils/handleContent.js

export const handleContent = async (topic, level, setContent, setError, setLoading) => {
  setLoading(true);
  setError('');
  setContent(null);

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, level }),
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
