// src/App.jsx
import { useEffect, useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import Walkthrough from './components/Walkthrough';
import TrendingTopics from './components/TrendingTopics';
import UrlSummaryDisplay from './components/UrlSummaryDisplay';

export default function App() {
  const [showTour, setShowTour] = useState(false);  
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [activeTab, setActiveTab] = useState('topic');
  const [urlSummary, setUrlSummary] = useState(null);
  const [url, setUrl] = useState('');

  
    // Fetch trending topics
  useEffect(() => {
    if (activeTab === 'topic') {
      fetch(`${import.meta.env.VITE_API_URL}/api/trending`)
        .then(res => res.json())
        .then(response => setTrendingTopics(response?.data || []))
        .catch(err => console.error("Trending fetch error", err));
    }
  }, [activeTab]);

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
    setTopic(newTopic);

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
      setContent(structuredContent);
  } catch (err) {
      console.error(err);
      setError('Something went wrong while generating content.');
    } finally {
      setLoading(false);
    }
};

// URL summarization
  const handleUrlSummary = async (link) => {
    setLoading(true);
    setError('');
    setContent(null);
    setUrlSummary(null);
    setUrl(link);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/summarize-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: link }),
      });
      console.log("activeTab : ", activeTab);
      // Check if response is valid
    if (!res.ok) {
      const errorData = await res.text();
      console.error('❌ API Error Response:', errorData);
      throw new Error('Failed to summarize URL');
    } 
     // Try parsing JSON safely
    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.error('❌ JSON Parse Error:', jsonErr);
      throw new Error('Invalid response format from server');
    }

    if (!data.summary || typeof data.summary !== 'string') {
      console.warn('⚠️ No summary field or wrong format:', data);
      throw new Error('No valid summary returned');
    }

    console.log("summary : ", data.summary);
    // Store summary content
    setUrlSummary(data.summary);

    } catch (err) {
      console.error(err);
      setError('Something went wrong while summarizing URL.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
     <Walkthrough showTour={showTour} />
        <div className="min-h-screen bg-gradient-to-br from-[#e0ecf8] via-[#f0e7fc] to-[#fff1f6] p-6">
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-indigo-800 mb-3"> Bite-Sized Learning. Big Impact by{' '}
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
                 Vidgenz 
              </span> AI.</h3>
            <p className="text-lg text-gray-700">Got a few minutes? Drop a topic or URL and let AI teach you something new.</p>
            <p className="mt-2 text-sm text-gray-500">No sign up required. Paste a topic or URL and get learning!</p>
          </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="md:col-span-3">
        
            <ContentForm onSubmit={handleContent} 
            onSummarizeUrl={handleUrlSummary}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        />
         {loading && <p className="text-center text-indigo-600 mt-6">Generating content...</p>}
          {error && <p className="text-center text-red-600 mt-6">{error}</p>}
          
           <div className="content-display mt-8">
              {content && activeTab === 'topic' && (
                <ContentDisplay content={content} topic={topic} />
              )}
              {urlSummary && activeTab === 'url' && (
                <UrlSummaryDisplay urlSummary={urlSummary} url={url} />
              )}
            </div>
          </div>
            {activeTab === 'topic' && trendingTopics.length > 0 && (
            <div className="md:col-span-1">
            <TrendingTopics topics={trendingTopics} onClick={handleContent} />
          </div>
            )}
      </div>
    </div>
    </>
  );
}