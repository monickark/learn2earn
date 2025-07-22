// src/App.jsx
import { useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';

export default function App() {
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');

const handleContent = async (topic) => {
  const res = await fetch('http://localhost:4000/api/generate-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
 // console.log("res : ", res);
  const data = await res.json();
 // console.log("data : ", data);

  const raw = data.content.content; // ✅ Already parsed JSON object

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

  setContent(structuredContent);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          Learn2Earn AI
        </h1>
        <ContentForm onSubmit={handleContent} />
        {content && <ContentDisplay content={content} topic={topic} />}
      </div>
    </div>
  );
}
