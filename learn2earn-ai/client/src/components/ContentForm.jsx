import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContentForm({ onSubmit, onSummarizeUrl, activeTab,
  setActiveTab }) {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [url, setUrl] = useState('');

  const handleTopicSubmit = (e) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, level);
    }
  };

  const handleUrlSummarize = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSummarizeUrl(url);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      >
      {/* Tabs */}
     <div className="flex bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm w-fit mx-auto">
      <button
        onClick={() => setActiveTab('topic')}
        className={`px-5 py-2 font-medium transition-colors duration-200 focus:outline-none ${
          activeTab === 'topic'
            ? 'bg-indigo-600 text-white'
            : 'text-gray-700 hover:bg-indigo-100'
        }`}
      >
        🎯 Topic-Based
      </button>
      <button
        onClick={() => setActiveTab('url')}
        className={`px-5 py-2 font-medium transition-colors duration-200 focus:outline-none ${
          activeTab === 'url'
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-blue-100'
        }`}
      >
        🔗 URL Summarization
      </button>
    </div>

      {/* Topic + Level Form */}
      {activeTab === 'topic' && (
        <form
          onSubmit={handleTopicSubmit}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="text"
            placeholder="Enter a topic (e.g., Blockchain)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 topic-input"
          />

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 level-input"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>

          <button
            type="submit"
            className="group bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-all generate-btn"
          >
             <span className="group-hover:hidden">Craft My Lesson</span>
              <span className="hidden group-hover:inline">Just takes a few seconds!</span>
          </button>
        </form>
      )}

      {/* URL Summarizer */}
      {activeTab === 'url' && (
        <form
          onSubmit={handleUrlSummarize}
          className="flex flex-col md:flex-row gap-4 items-center"
        >
          <input
            type="url"
            placeholder="Paste a URL to summarize..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="group bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all"
          >
             <span className="group-hover:hidden">Summarize URL</span>
            <span className="hidden group-hover:inline">Summarize in a blink!</span>
          </button>
        </form>
      )}
    </div>
  );
}
