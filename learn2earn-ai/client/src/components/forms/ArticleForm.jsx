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
    <form onSubmit={handleTextSubmit} className="space-y-4 w-full max-w-4xl mx-auto">
      <textarea
        rows="6"
        placeholder="Paste your article here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm sm:text-base resize-y"
      />
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base flex-1 sm:flex-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-3 rounded-md transition-all text-sm sm:text-base font-medium whitespace-nowrap w-full sm:w-auto"
        >
          <span className="group-hover:hidden">Summarize Article</span>
          <span className="hidden group-hover:inline">Just takes a few seconds!</span>
        </button>
      </div>
    </form>
  );
}