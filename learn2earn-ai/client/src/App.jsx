import { useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';

export default function App() {
  const [content, setContent] = useState(null);

  const handleContent = async (topic) => {
    const res = await fetch('http://localhost:4000/api/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });

    const data = await res.json();
    console.log("return data topic: " + JSON.stringify(data.topic));
    console.log("return data content: " + JSON.stringify(data.content.content));

    const raw = data.content.content;

    setContent(raw);
  };

  return (
       <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-100 text-gray-800">
      <header className="py-8 shadow bg-white">
        <h1 className="text-4xl font-bold text-center text-indigo-800">📚 Learn2Earn AI</h1>

        <p className="text-center text-sm text-gray-600 mt-2">Generate educational content with a single prompt</p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-12">
        <ContentForm onSubmit={handleContent} />
        {content && <ContentDisplay content={content} />}
      </main>

      <footer className="mt-20 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Learn2Earn AI · Built with ❤️
      </footer>
    </div>
  );
}
