// src/components/MainContentRenderer.jsx
import ContentDisplay from "./ContentDisplay";
import UrlSummaryDisplay from "./UrlSummaryDisplay";
import ArticleSummaryDisplay from "./ArticleSummaryDisplay";
import TopicForm from "./forms/TopicForm";
import UrlForm from "./forms/UrlForm";
import ArticleForm from "./forms/ArticleForm";
import InterviewLearning from "./InterviewLearning";
import TrendingTopics from "./TrendingTopics";

export default function MainContentRenderer({
  activeTab,
  content,
  topic,
  loadingTopic,
  errorTopic,
  handleContent,
  trendingTopics,
  urlSummary,
  url,
  loadingUrl,
  errorUrl,
  handleUrlSummary,
  summary,
  articleLoading,
  articleError,
  handleArticleSummary,
}) {
  if (activeTab === "topic") {
    return (
      <>
        {/* Topic Input Form */}
        <TopicForm onSubmit={handleContent} />

        {/* Always show Trending Topics */}
        {trendingTopics.length > 0 && (
          <div className="mt-6">
            <TrendingTopics topics={trendingTopics} onClick={handleContent} />
          </div>
        )}

        {/* Loading/Error States */}
        {loadingTopic && (
          <p className="text-center text-indigo-600 mt-6">Generating content...</p>
        )}
        {errorTopic && (
          <p className="text-center text-red-600 mt-6">{errorTopic}</p>
        )}

        {/* Generated Content */}
        {content && <ContentDisplay content={content} topic={topic} />}
      </>
    );
  }

  if (activeTab === "url") {
    return (
      <>
        <UrlForm onSummarizeUrl={handleUrlSummary} />
        {loadingUrl && (
          <p className="text-center text-blue-600 mt-6">Summarizing URL...</p>
        )}
        {errorUrl && (
          <p className="text-center text-red-600 mt-6">{errorUrl}</p>
        )}
        {urlSummary && <UrlSummaryDisplay urlSummary={urlSummary} url={url} />}
      </>
    );
  }

  if (activeTab === "article") {
    return (
      <>
        <ArticleForm onSummarizeArticle={handleArticleSummary} />
        {articleLoading && (
          <p className="text-center text-green-600 mt-6">Summarizing Article...</p>
        )}
        {articleError && (
          <p className="text-center text-red-600 mt-6">{articleError}</p>
        )}
        {summary && <ArticleSummaryDisplay summary={summary} />}
      </>
    );
  }

  if (activeTab === "video") {
    return (
      <p className="text-center text-gray-600 mt-6">
        🎥 Video Summary form coming soon...
      </p>
    );
  }

  if (activeTab === "audio") {
    return (
      <p className="text-center text-gray-600 mt-6">
        🎧 Audio Summary form coming soon...
      </p>
    );
  }

  if (activeTab === "interviewLearning") {
    return <InterviewLearning />;
  }

  return null;
}
