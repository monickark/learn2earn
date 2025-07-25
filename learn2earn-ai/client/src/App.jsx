// src/App.jsx
import Joyride from 'react-joyride';
import { useEffect, useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import Walkthrough from './components/Walkthrough';
import TrendingTopics from './components/TrendingTopics';

export default function App() {
  const [showTour, setShowTour] = useState(false);  
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);

   useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/trending`)
      .then(res => res.json())
      .then(response => setTrendingTopics(response?.data || []))
      .catch(err => console.error("Trending fetch error", err));
  }, []);

   useEffect(() => {
    const seenTour = localStorage.getItem('seenTour');
    if (!seenTour) {
      setShowTour(true); // Show walkthrough
      localStorage.setItem('seenTour', 'true'); // Mark as seen
    }
  }, []);

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
    <>
     <Walkthrough showTour={showTour} />
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          VidGenz AI
        </h1>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-3">
        
            <ContentForm onSubmit={handleContent} />
         {loading && <p className="text-center text-indigo-600 mt-6">Generating content...</p>}
          {error && <p className="text-center text-red-600 mt-6">{error}</p>}
          
          <div className="content-display mt-8">
            {content && (
              <ContentDisplay content={content} topic={topic} />
            )}</div>
            </div>
            <div className="md:col-span-1">
            <TrendingTopics topics={trendingTopics} onClick={handleContent} />
          </div>
      </div>
    </div>
    </>
  );
}