export default function HomeComponent({ setActiveTab }) {
  const menuGroups = [
    {
      title: "Content Tools",
      modules: [
        { 
          name: "AI Content Generation", 
          tab: "topic",
          desc: "Generate fresh, engaging content ideas tailored to your needs."
        },
        { 
          name: "URL Summarization", 
          tab: "url",
          desc: "Summarize long articles or pages instantly from any link."
        },
        { 
          name: "Article Summarization", 
          tab: "article",
          desc: "Condense long-form articles into clear, concise summaries."
        }
      ]
    },
    {
      title: "Learning & Preparation",
      modules: [
        { 
          name: "Interview Preparation", 
          tab: "interview",
          desc: "Get AI-driven round plans, topics, and resources for interviews."
        }
      ]
    },
    {
      title: "Insights & Trends",
      modules: [
        { 
          name: "Trending Topics", 
          tab: "trending",
          desc: "Stay ahead with the latest trending topics in your domain."
        }
      ]
    }
  ];

  return (
    <div className="py-6 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-yellow-400 text-transparent bg-clip-text">
          Welcome to Vidgenz
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore AI-powered tools to create, learn, and stay ahead. Choose a module to get started.
        </p>
      </div>

      {/* Module Groups */}
      <div className="space-y-12">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-l-4 border-pink-400 pl-3">
              {group.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.modules.map((mod) => (
                <div
                  key={mod.tab}
                  onClick={() => setActiveTab(mod.tab)}
                  className="p-6 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-lg hover:border-pink-400 transition duration-200 cursor-pointer group"
                >
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-pink-500">
                    {mod.name}
                  </h3>
                  <p className="mt-2 text-gray-500 text-sm">{mod.desc}</p>
                  <span className="mt-4 inline-block text-pink-500 text-sm font-medium group-hover:underline">
                    Open →
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
