// src/App.jsx
import { useEffect, useState } from 'react';
import ContentForm from './components/ContentForm';
import ContentDisplay from './components/ContentDisplay';
import UrlSummaryDisplay from './components/UrlSummaryDisplay';
import ArticleSummaryDisplay from './components/ArticleSummaryDisplay';
import Walkthrough from './components/Walkthrough';
import TrendingTopics from './components/TrendingTopics';

import useGenerateContent from './hooks/useGenerateContent';
import useSummarizeUrl from './hooks/useSummarizeUrl';
import useSummarizeArticle from './hooks/useSummaryArticle';

export default function App() {
  const [showTour, setShowTour] = useState(false);
  const [activeTab, setActiveTab] = useState('topic');

  const {
    content,
    topic,
    loading: loadingTopic,
    error: errorTopic,
    handleContent,
  } = useGenerateContent();

  const {
    urlSummary,
    url,
    loading: loadingUrl,
    error: errorUrl,
    handleUrlSummary,
  } = useSummarizeUrl();

  const {
    summary,
    loading: articleLoading,
    error: articleError,
    handleArticleSummary,
  } = useSummarizeArticle();

  const [trendingTopics, setTrendingTopics] = useState([]);

  useEffect(() => {
    if (activeTab === 'topic') {
      fetch(`${import.meta.env.VITE_API_URL}/api/trending`)
        .then((res) => res.json())
        .then((response) => setTrendingTopics(response?.data || []))
        .catch((err) => console.error('Trending fetch error', err));
    }
  }, [activeTab]);

  useEffect(() => {
    const seenTour = localStorage.getItem('seenTour');
    if (!seenTour) {
      setShowTour(true);
      localStorage.setItem('seenTour', 'true');
    }
  }, []);

  const renderDisplay = () => {
    console.log("active tab: ", articleLoading); 
    if (activeTab === 'topic') {
      if (loadingTopic) return <p className="text-center text-indigo-600 mt-6">Generating content...</p>;
      if (errorTopic) return <p className="text-center text-red-600 mt-6">{errorTopic}</p>;
      if (content) return <ContentDisplay content={content} topic={topic} />;
    } else if (activeTab === 'url') {
      if (loadingUrl) return <p className="text-center text-blue-600 mt-6">Summarizing URL...</p>;
      if (errorUrl) return <p className="text-center text-red-600 mt-6">{errorUrl}</p>;
      if (urlSummary) return <UrlSummaryDisplay urlSummary={urlSummary} url={url} />;
    } else if (activeTab === 'article') {
      if (articleLoading) return <p className="text-center text-green-600 mt-6">Summarizing Article...</p>;
      if (articleError) return <p className="text-center text-red-600 mt-6">{articleError}</p>;
      if (summary) return <ArticleSummaryDisplay summary={summary} />;
    }
    return null;
  };

  return (
    <>
      <Walkthrough showTour={showTour} />
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
        
        {/* Hero Section with Animation */}
        <style>{`
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(-20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeInUp 0.8s ease forwards;
          }
          .delay-0 { animation-delay: 0s; }
          .delay-1 { animation-delay: 0.6s; }
          .delay-2 { animation-delay: 1.2s; }
        `}</style>

        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-2 opacity-0 fade-in delay-0">
          Learn Smarter. Powered by <span className="text-indigo-600">Vidgenz</span> AI.
        </h1>
        <p className="text-center mb-2 opacity-0 fade-in delay-1">
        <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold shadow-lg animate-pulse">
          🚀 No prompt engineering needed
        </span>
      </p>
        <p className="text-center text-gray-600 mb-8 opacity-0 fade-in delay-2">
          Turn any topic, URL, or article into ready-to-learn content instantly.
        </p>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <ContentForm
              onSubmit={handleContent}
              onSummarizeUrl={handleUrlSummary}
              onSummarizeArticle={handleArticleSummary}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <div className="content-display mt-8">{renderDisplay()}</div>
          </div>

          {activeTab === 'topic' && trendingTopics.length > 0 && (
            <div className="md:col-span-1">
              <TrendingTopics topics={trendingTopics} onClick={handleContent} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
