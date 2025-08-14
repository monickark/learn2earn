import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import MainContentRenderer from "./components/MainContentRenderer";
import useGenerateContent from "./hooks/useGenerateContent";
import useSummarizeUrl from "./hooks/useSummarizeUrl";
import useSummarizeArticle from "./hooks/useSummaryArticle";
import Walkthrough from "./components/Walkthrough";
import HeroSection from "./components/HeroSection";

export default function App() {
  const [activeTab, setActiveTab] = useState("topic");
  const [showTour, setShowTour] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);

  const { content, topic, loading: loadingTopic, error: errorTopic, handleContent } =
    useGenerateContent();
  const { urlSummary, url, loading: loadingUrl, error: errorUrl, handleUrlSummary } =
    useSummarizeUrl();
  const { summary, loading: articleLoading, error: articleError, handleArticleSummary } =
    useSummarizeArticle();

  useEffect(() => {
    if (activeTab === "topic") {
      fetch(`${import.meta.env.VITE_API_URL}/api/trending`)
        .then((res) => res.json())
        .then((response) => setTrendingTopics(response?.data || []))
        .catch((err) => console.error("Trending fetch error", err));
    }
  }, [activeTab]);

  useEffect(() => {
    if (!localStorage.getItem("seenTour")) {
      setShowTour(true);
      localStorage.setItem("seenTour", "true");
    }
  }, []);

  return (
    <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      <Walkthrough showTour={showTour} />
      <HeroSection activeTab={activeTab} />

      <div className="max-w-7xl mx-auto">
        <MainContentRenderer
          activeTab={activeTab}
          content={content}
          topic={topic}
          loadingTopic={loadingTopic}
          errorTopic={errorTopic}
          handleContent={handleContent}
          trendingTopics={trendingTopics}
          urlSummary={urlSummary}
          url={url}
          loadingUrl={loadingUrl}
          errorUrl={errorUrl}
          handleUrlSummary={handleUrlSummary}
          summary={summary}
          articleLoading={articleLoading}
          articleError={articleError}
          handleArticleSummary={handleArticleSummary}
        />
      </div>
    </MainLayout>
  );
}
