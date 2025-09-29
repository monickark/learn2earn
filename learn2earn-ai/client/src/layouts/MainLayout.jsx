// src/layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import HomeComponent from "../components/HomeComponent";

export default function MainLayout({ activeTab, setActiveTab, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLabel, setUserLabel] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Close sidebar on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }

    return () => {
      document.body.classList.remove('sidebar-open');
    };
  }, [sidebarOpen]);

  useEffect(() => {
    // Fetch profile to show display name and avatar
    (async () => {
      try {
        const base = import.meta.env.VITE_API_URL || window.location.origin;
        const url = `${base.replace(/\/$/, '')}/api/profile`;
        const res = await fetch(url, { credentials: 'include' });
        const text = await res.text();
        let data;
        try { data = JSON.parse(text); } catch { data = null; }
        const guest = localStorage.getItem('guest') === 'true';
        const profile = data?.profile || {};
        const name = (profile.display_name || '').trim();
        setUserEmail(profile.email || '');
        setUserLabel(name || (guest ? 'Guest' : ''));
        setAvatarUrl(profile.avatar_url || '');
      } catch {
        const guest = localStorage.getItem('guest') === 'true';
        setUserLabel(guest ? 'Guest' : '');
        setUserEmail('');
        setAvatarUrl('');
      }
    })();
  }, []);

  return (
    <div className="flex flex-col font-openSans h-screen relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-700 text-white shadow-md">
        {/* Desktop Top Menu */}
        <div className="hidden lg:flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <div
            className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text cursor-pointer"
            onClick={() => setActiveTab("home")}
          >
            Vidgenz
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            {/* Home Button */}
            <button
              className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600 hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("home")}
            >
              <span>🏠</span>
              <span className="font-medium">Home</span>
            </button>

            {/* Topics */}
            <button
              className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === "topic"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600 hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("topic")}
            >
              <span>📈</span>
              <span className="font-medium">Topics</span>
            </button>

            {/* Summary Dropdown */}
            <div className="relative group">
              <button className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === "url" || activeTab === "article"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600 hover:shadow-lg"
              }`}>
                <span>📝</span>
                <span className="font-medium">Summary</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute z-10 hidden group-hover:block mt-1 w-48 bg-indigo-800 rounded-lg shadow-lg">
                {[
                  { key: "url", label: "🔗 URL Summary" },
                  { key: "article", label: "📰 Article Summary" },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === key
                        ? "bg-indigo-600"
                        : "hover:bg-indigo-700"
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Interview Preparation */}
            <button
              className={`px-3 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                activeTab === "interviewLearning"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-600 hover:shadow-lg"
              }`}
              onClick={() => setActiveTab("interviewLearning")}
            >
              <span>🎯</span>
              <span className="font-medium">Learning</span>
            </button>

            {/* Logout */}
            <button
              className="ml-2 px-3 py-2 rounded-lg flex items-center space-x-2 text-red-200 hover:bg-red-500/20 hover:shadow-lg transition-all duration-200"
              onClick={() => onLogout && onLogout()}
            >
              <span>🚪</span>
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden px-4 py-3 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="text-white p-2 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          <h1 className="text-xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text">Vidgenz</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Mobile Sidebar Menu (only shown when toggled) */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 p-5 flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out">
          {/* Logo */}
          <div className="flex items-center justify-between mb-8">
            <div
              className="text-xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-300 text-transparent bg-clip-text cursor-pointer"
              onClick={() => {
                setActiveTab("home");
                closeSidebar();
              }}
            >
              Vidgenz
            </div>
            {/* Mobile Close Button */}
            <button
              onClick={closeSidebar}
              className="text-white hover:text-gray-300 p-1"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 space-y-2">
            {/* Home Button */}
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                activeTab === "home"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-500 hover:shadow-lg"
              }`}
              onClick={() => {
                setActiveTab("home");
                closeSidebar();
              }}
            >
              <span>🏠</span>
              <span className="font-medium">Home</span>
            </button>

            {/* Topics */}
            <button
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                activeTab === "topic"
                  ? "bg-indigo-600 shadow-md"
                  : "hover:bg-indigo-500 hover:shadow-lg"
              }`}
              onClick={() => {
                setActiveTab("topic");
                closeSidebar();
              }}
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
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === key
                      ? "bg-indigo-600 shadow-md"
                      : "hover:bg-indigo-500 hover:shadow-lg"
                  }`}
                  onClick={() => {
                    setActiveTab(key);
                    closeSidebar();
                  }}
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
                onClick={() => {
                  setActiveTab("interviewLearning");
                  closeSidebar();
                }}
              >
                🎯 Learning
              </button>
            </div>
          </nav>

          {/* Footer actions */}
          <div className="mt-auto pt-5 border-t border-indigo-500/40">
            <button
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-500/20 hover:shadow-lg transition-all duration-200 text-red-200"
              onClick={() => { onLogout && onLogout(); closeSidebar(); }}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-auto bg-gradient-to-br from-indigo-100 to-purple-100">
          {activeTab === "home" ? (
            <HomeComponent setActiveTab={setActiveTab} />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
}
