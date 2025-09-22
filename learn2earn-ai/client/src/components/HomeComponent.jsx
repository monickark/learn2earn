import React, { memo } from 'react';

const HomeComponent = memo(function HomeComponent({ setActiveTab }) {
  const menuGroups = [
    {
      title: "Content Tools",
      modules: [
        { name: "AI Content Generation", tab: "topic", desc: "Generate fresh, engaging content ideas tailored to your needs." },
        { name: "URL Summarization", tab: "url", desc: "Summarize long articles or pages instantly from any link." },
        { name: "Article Summarization", tab: "article", desc: "Condense long-form articles into clear, concise summaries." }
      ]
    },
    {
      title: "Learning & Preparation",
      modules: [
        { name: "Interview Preparation", tab: "interviewLearning", desc: "Get AI-driven round plans, topics, and resources for interviews." }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-indigo-50">
      {/* Compact Welcome Header */}
      <div className="mb-6 text-center px-4 pt-4">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-100 text-pink-600 rounded-full mb-2">
          👋 Welcome
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          Welcome to <span className="text-pink-500">Vidgenz</span>
        </h1>
        <p className="mt-2 text-gray-700 text-sm md:text-base max-w-2xl mx-auto">
          Explore AI-powered tools to create, learn, and stay ahead. Choose a module to get started.
        </p>
      </div>

      {/* Responsive Grid Layout */}
      {menuGroups.map((group) => (
        <div key={group.title} className="mb-6 sm:mb-8 px-4">
          {/* Group Title */}
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-l-4 border-pink-400 pl-2 mb-4">
            {group.title}
          </h2>

          {/* Responsive Grid/Scrollable Modules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {group.modules.map((mod) => (
              <div
                key={mod.tab}
                onClick={() => setActiveTab(mod.tab)}
                className="p-4 sm:p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-pink-400 transition duration-200 cursor-pointer flex flex-col justify-between min-h-[140px] sm:min-h-[160px]"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-pink-500 leading-tight">
                    {mod.name}
                  </h3>
                  <p className="mt-1 text-gray-500 text-xs sm:text-sm leading-relaxed">{mod.desc}</p>
                </div>
                <span className="mt-3 inline-block text-pink-500 text-xs font-medium group-hover:underline">
                  Open →
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Bottom padding for mobile */}
      <div className="h-4 sm:h-6"></div>
    </div>
  );
});

export default HomeComponent;
