// src/App.jsx
import { useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';

export default function App() {
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const handleContent = async (newTopic, newLevel) => {
  setLoading(true);
    setError('');
    setContent(null); // Clear previous content

    try{
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/generate-content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: newTopic , level: newLevel}),
      });

      if (!res.ok) throw new Error('Failed to fetch content');

    // console.log("res : ", res);
      const data = await res.json();
    // console.log("data : ", data);

      const raw = data?.content?.content; // ✅ Already parsed JSON object

      if (!raw) throw new Error('Invalid response format');

    // console.log("raw : ", raw);
      const structuredContent = {
        Level: raw.Level || '',
        Tags: raw.Tags || [],
        Source: raw.Source || '',
        Lesson: raw.Lesson || '',
        MCQs: raw.MCQs || '',
        Flashcards: raw.Flashcards || '',
        ReflectionPrompts: raw.ReflectionPrompts || [],
      };
      setTopic(topic);
      setContent(structuredContent);
  } catch (err) {
      console.error(err);
      setError('Something went wrong while generating content.');
    } finally {
      setLoading(false);
    }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          VidGenz AI
        </h1>
        <ContentForm onSubmit={handleContent} />

         {loading && <p className="text-center text-indigo-600 mt-6">Generating content...</p>}
        {error && <p className="text-center text-red-600 mt-6">{error}</p>}

        {content && <ContentDisplay content={content} topic={topic} />}
      </div>
    </div>
  );
}
