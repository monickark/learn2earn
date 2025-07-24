// src/App.jsx
import Joyride from 'react-joyride';
import { useEffect, useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';

export default function App() {
  const [showTour, setShowTour] = useState(false);  
  const [content, setContent] = useState(null);
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

   useEffect(() => {
    const seenTour = localStorage.getItem('seenTour');
    if (!seenTour) {
      setShowTour(true); // Show walkthrough
      localStorage.setItem('seenTour', 'true'); // Mark as seen
    }
  }, []);

  const steps = [
      {
        target: '.topic-input', // class in ContentForm.jsx
        content: 'Start by entering a topic you want to learn.',
      }, 
      {
        target: '.level-input', // class in ContentForm.jsx
        content: 'Choose your learning level here — Beginner, Intermediate, or Expert.',
      },
      {
        target: '.generate-btn',
        content: 'Click here to generate your personalized learning content.',
      },
      {
        target: '.content-display',
        content: 'Here you’ll see the lessons, quizzes, and flashcards.',
      },
    ];

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
    <Joyride
        steps={steps}
        run={showTour}
        showSkipButton
        continuous
        scrollToFirstStep
        styles={{ options: { zIndex: 9999 } }}
      />
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          VidGenz AI
        </h1>
            <ContentForm onSubmit={handleContent} />
         {loading && <p className="text-center text-indigo-600 mt-6">Generating content...</p>}
          {error && <p className="text-center text-red-600 mt-6">{error}</p>}
          
          <div className="content-display mt-8">
            {content && (
              <ContentDisplay content={content} topic={topic} />
            )}</div>
      </div>
    </div>
    </>
  );
}