export default function HomeComponent({ setActiveTab }) {
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
    <div className="flex flex-col h-full p-4 md:p-6 bg-indigo-50">
      {/* Compact Welcome Header */}
      <div className="mb-6 text-center">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-pink-100 text-pink-600 rounded-full mb-2">
          👋 Welcome
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome to <span className="text-pink-500">Vidgenz</span>
        </h1>
        <p className="mt-2 text-gray-700 text-sm md:text-base">
          Explore AI-powered tools to create, learn, and stay ahead. Choose a module to get started.
        </p>
      </div>

      {/* Horizontal Stack Layout */}
      {menuGroups.map((group) => (
        <div key={group.title} className="mb-8">
          {/* Group Title */}
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-l-4 border-pink-400 pl-2 mb-4">
            {group.title}
          </h2>

          {/* Horizontal Scrollable Modules */}
          <div className="flex space-x-4 overflow-x-auto pb-2 scroll-smooth hide-scrollbar">
            {group.modules.map((mod) => (
              <div
                key={mod.tab}
                onClick={() => setActiveTab(mod.tab)}
                className="flex-shrink-0 w-72 p-5 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-pink-400 transition duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-pink-500">
                    {mod.name}
                  </h3>
                  <p className="mt-1 text-gray-500 text-sm">{mod.desc}</p>
                </div>
                <span className="mt-3 inline-block text-pink-500 text-xs font-medium group-hover:underline">
                  Open →
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Scrollbar Styling */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}
