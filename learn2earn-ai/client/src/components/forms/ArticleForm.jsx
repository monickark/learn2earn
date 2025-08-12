// src/components/forms/ArticleForm.jsx
import React, { useState } from 'react';

export default function ArticleForm({ onSummarizeArticle }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSummarizeArticle( text );
    }
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileText = event.target.result;
      setText(fileText);
      onSummarizeArticle( fileText );
    };
    reader.readAsText(uploadedFile);
  };

  return (
    <form onSubmit={handleTextSubmit} className="space-y-4">
      <textarea
        rows="6"
        placeholder="Paste your article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
      />
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition-all"
        >
          <span className="group-hover:hidden">Summarize Article</span>
          <span className="hidden group-hover:inline">Just takes a few seconds!</span>
        </button>
      </div>
    </form>
  );
}
