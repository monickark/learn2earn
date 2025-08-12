// src/components/forms/UrlForm.jsx
import React, { useState } from 'react';

export default function UrlForm({ onSummarizeUrl }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSummarizeUrl(url);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center"
    >
      <input
        type="url"
        placeholder="Paste a URL to summarize..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-all"
      >
        <span className="group-hover:hidden">Summarize URL</span>
        <span className="hidden group-hover:inline">Just takes a few seconds!</span>
      </button>
    </form>
  );
}
