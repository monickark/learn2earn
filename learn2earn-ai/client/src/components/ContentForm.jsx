// src/components/ContentForm.jsx
import { useState } from 'react';
import TopicForm from './forms/TopicForm';
import UrlForm from './forms/UrlForm';
import ArticleForm from './forms/ArticleForm';

export default function ContentForm({
  onSubmit,
  onSummarizeUrl,
  onSummarizeArticle,
  activeTab,
  setActiveTab,
}) {
  const tabs = [
    { key: 'topic', label: '🎯 Topic-Based Generation' },
    { key: 'url', label: '🔗 URL Summarization' },
    { key: 'article', label: '📄 Article Summarization' },
  ];

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
      {/* Tab Heading */}
      <div className="flex justify-start space-x-4 border-b border-gray-200 mb-4">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-5 py-2 font-semibold rounded-t-md transition-all ${
              activeTab === key
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'topic' && <TopicForm onSubmit={onSubmit} />}
      {activeTab === 'url' && <UrlForm onSummarizeUrl={onSummarizeUrl} />}
      {activeTab === 'article' && (
        <ArticleForm onSummarizeArticle={onSummarizeArticle} />
      )}
    </div>
  );
}
