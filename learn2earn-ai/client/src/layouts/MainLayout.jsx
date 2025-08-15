// src/layouts/MainLayout.jsx
export default function MainLayout({ activeTab, setActiveTab, children }) {
  return (
    <div className="flex font-openSans h-screen">
      {/* Sidebar */}
      <div className="bg-gradient-to-b from-indigo-900 to-indigo-700 bg-opacity-90 backdrop-blur-md text-white w-64 p-5 flex flex-col shadow-xl">
        <div className="text-2xl font-extrabold mb-8 bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text"
        onClick={() => setActiveTab("home")}>
          Vidgenz
        </div>

        <nav className="flex-1 space-y-2">
          {/* Topics */}
          <button
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
              activeTab === "topic"
                ? "bg-indigo-600 shadow-md"
                : "hover:bg-indigo-500 hover:shadow-lg"
            }`}
            onClick={() => setActiveTab("topic")}
          >
            <span>📈</span>
            <span className="font-medium">Topics</span>
          </button>

          {/* Summary */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-indigo-200 px-2 mb-2 uppercase tracking-wider">
              Summary
            </div>
            {[
              { key: "url", label: "🔗 URL Summary" },
              { key: "article", label: "📰 Article Summary" },
              { key: "video", label: "🎥 Video Summary" },
              { key: "audio", label: "🎧 Audio Summary" },
            ].map(({ key, label }) => (
              <button
                key={key}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === key
                    ? "bg-indigo-600 shadow-md"
                    : "hover:bg-indigo-500 hover:shadow-lg"
                }`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Interview Preparation */}
          <div className="mt-6">
            <div className="text-xs font-semibold text-indigo-200 px-2 mb-2 uppercase tracking-wider">
              Interview Preparation
            </div>
            <button
              className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === "interviewLearning"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-500 hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("interviewLearning")}
            >
              🎯 Learning
            </button>
          </div>
        </nav>

        {/* Settings */}
        <div className="mt-auto pt-5 border-t border-indigo-500/40">
          <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-indigo-500 hover:shadow-lg transition-all duration-200">
            ⚙ Settings
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto bg-gradient-to-br from-indigo-100 to-purple-100">
        {children}
      </div>
    </div>
  );
}
