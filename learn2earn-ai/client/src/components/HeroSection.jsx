import SectionHeader from "./common/SectionHeader";

export default function HeroSection({ activeTab, step }) {
  const heroContent = {
    topic: {
      badge: "🚀 Content",
      title: "Discover & Learn Any Topic Instantly",
      description: "Generate structured learning material from any topic with AI-powered content creation."
    },
    url: {
      badge: "🔗 URL Summary",
      title: "Summarize Any URL in Seconds",
      description: "Turn articles, blogs, and research papers into clear, concise summaries."
    },
    article: {
      badge: "📰 Articles",
      title: "Article Summaries Made Simple",
      description: "Get key takeaways and insights from any long-form article instantly."
    },
    interviewLearning: {
      badge: "🎯 Interview Prep",
      title: "Ace Your Interviews with AI",
      description: "Generate custom learning paths, assess your skills, and prepare with mock interviews tailored to your role."
    }
    // practice: {
    //   badge: "🧑‍💻 Practice",
    //   title: "Sharpen Your Skills with AI",
    //   description: "Solve problems, practice Q&A, and simulate interview-style questions interactively."
    // }
  };

  // Hide interview hero if not Step 1
  if (activeTab === "interviewLearning" && step !== 1) return null;

  return <SectionHeader {...heroContent[activeTab]} />;
}
