import { useState } from 'react';

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
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
      {/* Tabs */}
      <div className="flex space-x-4 border-b border-gray-200 mb-2">
        <button
          onClick={() => setActiveTab('topic')}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'topic'
              ? 'border-b-4 border-indigo-600 text-indigo-700'
              : 'text-gray-700 hover:text-indigo-600'
          }`}
        >
          🎯 Topic-Based Generation
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`pb-2 px-4 font-semibold ${
            activeTab === 'url'
              ? 'border-b-4 border-blue-600 text-blue-700'
              : 'text-gray-700 hover:text-indigo-600'
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
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md transition-all generate-btn"
          >
            Generate Content
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all"
          >
            Summarize URL
          </button>
        </form>
      )}
    </div>
  );
}
