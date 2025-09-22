import { useEffect, useState, Suspense, lazy } from "react";
import MainLayout from "./layouts/MainLayout";
import useGenerateContent from "./hooks/useGenerateContent";
import useSummarizeUrl from "./hooks/useSummarizeUrl";
import useSummarizeArticle from "./hooks/useSummaryArticle";
import Walkthrough from "./components/Walkthrough";
import HeroSection from "./components/HeroSection";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Lazy load components
const MainContentRenderer = lazy(() => import("./components/MainContentRenderer"));
const HomeComponent = lazy(() => import("./components/HomeComponent"));

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
    <ErrorBoundary>
      <MainLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        <Walkthrough showTour={showTour} />
        {activeTab !== "home" && (
          <HeroSection activeTab={activeTab} step={interviewStep} />
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingSpinner text="Loading content..." />}>
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
                interviewStep={interviewStep}
                setInterviewStep={setInterviewStep}
              />
            )}
          </Suspense>
        </div>
      </MainLayout>
    </ErrorBoundary>
  );
}
