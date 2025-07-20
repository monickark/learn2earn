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

      // Split the string into sections
  const lessonMatch = raw.match(/Lesson:\s*([\s\S]*?)MCQs:/);
  const mcqsMatch = raw.match(/MCQs:\s*([\s\S]*?)Flashcards:/);
  const flashcardsMatch = raw.match(/Flashcards:\s*([\s\S]*)/);

  const structuredContent = {
    Lesson: lessonMatch ? lessonMatch[1].trim() : '',
    MCQs: mcqsMatch ? mcqsMatch[1].trim() : '',
    Flashcards: flashcardsMatch ? flashcardsMatch[1].trim() : '',
  };


    setContent(structuredContent);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Learn2Earn AI</h1>
      <ContentForm onSubmit={handleContent} />
      {content && <ContentDisplay content={content} />}
    </div>
  );
}
