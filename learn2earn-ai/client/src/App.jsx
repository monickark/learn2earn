import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import MainContentRenderer from "./components/MainContentRenderer";
import useGenerateContent from "./hooks/useGenerateContent";
import useSummarizeUrl from "./hooks/useSummarizeUrl";
import useSummarizeArticle from "./hooks/useSummaryArticle";
import Walkthrough from "./components/Walkthrough";
import HeroSection from "./components/HeroSection";
import HomeComponent from "./components/HomeComponent";

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); 
  const [showTour, setShowTour] = useState(false);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [interviewStep, setInterviewStep] = useState(1); // ✅ track interview step

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
      {activeTab !== "home" && (
        <HeroSection activeTab={activeTab} step={interviewStep} /> // ✅ pass step here
      )}

      <div className="max-w-7xl mx-auto">
        {activeTab === "home" && <HomeComponent setActiveTab={setActiveTab} />}

        {activeTab !== "home" && (
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
            interviewStep={interviewStep}            // ✅ send to MainContentRenderer
            setInterviewStep={setInterviewStep}      // ✅ send setter too
          />
        )}
      </div>
    </MainLayout>
  );
}
