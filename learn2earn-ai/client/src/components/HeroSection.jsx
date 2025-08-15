// src/components/HeroSection.jsx
export default function HeroSection({ activeTab, step }) {
  const heroContent = {
    topic: {
      title: "Discover & Learn Any Topic Instantly",
      badge: "🚀 No prompt engineering needed",
      description:
        "Generate structured learning material from any topic with AI-powered content creation."
    },
    url: {
      title: "Summarize Any URL in Seconds",
      badge: "🔗 Extract insights instantly",
      description:
        "Turn articles, blogs, and research papers into clear, concise summaries."
    },
    article: {
      title: "Article Summaries Made Simple",
      badge: "📰 Read less, understand more",
      description:
        "Get key takeaways and insights from any long-form article instantly."
    },
    video: {
      title: "Video Summary (Coming Soon)",
      badge: "🎥 Save hours of watching",
      description:
        "Summarize educational or informational videos without missing the key points."
    },
    audio: {
      title: "Audio Summary (Coming Soon)",
      badge: "🎧 Listen smarter",
      description:
        "Get summaries from podcasts, interviews, and audio lectures."
    },
    interviewLearning: {
      title: "Ace Your Interviews with AI",
      badge: "🎯 Learn, practice, succeed",
      description:
        "Generate custom learning paths, assess your skills, and prepare with mock interviews tailored to your role."
    }
  };  
console.log("HeroSection activeTab:", activeTab, "step:", step);
  // Only show interview hero on Step 1
  if (activeTab === "interviewLearning" && step !== 1) {
    return null;
  }

  const { title, badge, description } =
    heroContent[activeTab] || heroContent["topic"];

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-2">
        {title}
      </h1>
      <p className="text-center mb-2">
        <span className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold shadow-lg animate-pulse">
          {badge}
        </span>
      </p>
      <p className="text-center text-gray-600 mb-8">{description}</p>
    </div>
  );
}
