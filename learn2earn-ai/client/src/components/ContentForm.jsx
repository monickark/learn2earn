// src/components/ContentForm.jsx
import { useRef, useEffect, useState } from 'react';
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

   // Highlight position state
  const [highlightStyle, setHighlightStyle] = useState({});
  const tabRefs = useRef({});

  useEffect(() => {
    const activeElement = tabRefs.current[activeTab];
    if (activeElement) {
      setHighlightStyle({
        width: `${activeElement.offsetWidth}px`,
        transform: `translateX(${activeElement.offsetLeft}px)`,
      });
    }
  }, [activeTab]);

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg space-y-6">
      {/* Tab Heading */}
      <div className="relative border-b border-gray-200 mb-4">
        <span
          className="absolute bottom-0 h-[3px] bg-indigo-600 rounded-full transition-all duration-300"
          style={highlightStyle}
        />
        <div className="flex space-x-6">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
              ref={(el) => (tabRefs.current[key] = el)}
            onClick={() => setActiveTab(key)}
             className={`relative pb-2 text-sm font-semibold transition-all duration-300 ${
              activeTab === key
                ? 'text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-indigo-600 after:rounded-full'
                : 'text-gray-500 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-indigo-400 after:rounded-full hover:after:w-full after:transition-all after:duration-300'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
        </div>
      {/* Tab Content */}
      <div className="animate-slideFade">
      {activeTab === 'topic' && <TopicForm onSubmit={onSubmit} />}
      {activeTab === 'url' && <UrlForm onSummarizeUrl={onSummarizeUrl} />}
      {activeTab === 'article' && (
        <ArticleForm onSummarizeArticle={onSummarizeArticle} />
      )}
      </div>
    </div>
  );
}
