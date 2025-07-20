import { useState } from 'react';

export default function ContentForm({ onSubmit }) {
  const [topic, setTopic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) onSubmit(topic);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
      <input
        type="text"
        placeholder="Enter a topic (e.g. Blockchain)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full px-4 py-2 rounded border border-gray-300"
      />
      <button
        type="submit"
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Generate Content
      </button>
    </form>
  );
}
