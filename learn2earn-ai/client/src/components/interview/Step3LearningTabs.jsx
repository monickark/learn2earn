// components/interview/Step3LearningTabs.jsx
import { useEffect, useState } from "react";

// Icons for tabs
const TabIcons = {
  overview: "📋",
  topics: "🔍",
  studyplan: "📅",
  questions: "❓",
  mistakes: "⚠️",
  resources: "📚",
  prep: "🎯"
};

function SingleSkillTabs({ skill }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { topic, level, content } = skill;

  if (!content) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500 font-medium">No content available for this skill.</p>
          <p className="text-gray-400 text-sm mt-2">Try selecting a different skill or round.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "topics", label: "Must-Know Topics" },
    { key: "studyplan", label: "Study Plan" },
    { key: "questions", label: "Questions" },
    { key: "mistakes", label: "Mistakes to Avoid" },
    { key: "resources", label: "Resources" },
    { key: "prep", label: "Prep Guide" },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Skill Title with Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          {topic}
          <span className="ml-2 text-sm font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
            {level}
          </span>
        </h2>
      </div>

      {/* Modern Tab Navigation */}
      <div className="bg-gray-50 rounded-xl p-1 flex gap-1 overflow-x-auto scrollbar-hide mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
              activeTab === tab.key
                ? "bg-white text-indigo-700 shadow-sm border border-gray-200"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            title={tab.label}
          >
            <span>{TabIcons[tab.key]}</span>
            <span className="truncate">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content with scroll container */}
      <div className="flex-1 overflow-y-auto pr-2">
        {activeTab === "overview" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">{content.Round}</h3>
            <p className="leading-relaxed text-gray-700">{content.Overview}</p>
          </div>
        )}

        {activeTab === "topics" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Must-Know Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.MustKnowTopics?.map((t, i) => (
                <div key={i} className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                  <div className="flex items-start">
                    <span className="text-indigo-600 mr-2 mt-0.5">•</span>
                    <p className="text-gray-800">{t}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "studyplan" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Study Plan</h3>
            <div className="space-y-3">
              {content.StudyPlan?.map((step, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-indigo-700 text-sm font-medium">{i + 1}</span>
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Interview Questions</h3>
            {content.Questions?.map((q, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                    <span className="text-indigo-700 text-sm font-medium">{i + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-3">{q.question}</p>
                    <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                      <p className="text-green-800 text-sm">
                        <span className="font-medium">Sample Answer:</span> {q.sampleAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mistakes" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Mistakes to Avoid</h3>
            <div className="space-y-3">
              {content.MistakesToAvoid?.map((m, i) => (
                <div key={i} className="flex items-start p-3 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <p className="text-red-700">{m}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-indigo-700 mb-4">Recommended Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.RecommendedResources?.map((r, i) => (
                <a
                  key={i}
                  href={r.includes("http") ? r : "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors flex items-start"
                >
                  <span className="text-blue-600 mr-2">🔗</span>
                  <p className="text-blue-700 break-all">{r}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {activeTab === "prep" && (
          <div className="space-y-6">
            {/* Pre-Interview Checklist */}
            {Array.isArray(content.PreInterviewChecklist) && content.PreInterviewChecklist.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-indigo-700 mb-4">Pre-Interview Checklist</h3>
                <div className="space-y-2">
                  {content.PreInterviewChecklist.map((item, i) => (
                    <div key={i} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`checklist-${i}`} 
                        className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      />
                      <label htmlFor={`checklist-${i}`} className="ml-2 text-gray-700">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Study Plans */}
            {content.StudyPlans && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-indigo-700 mb-4">Study Plans</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {[
                    { key: "Day30", label: "30-Day Plan", icon: "📆" },
                    { key: "Day14", label: "14-Day Plan", icon: "📅" },
                    { key: "Day7", label: "7-Day Plan", icon: "🗓️" },
                    { key: "Day2", label: "Last 2 Days", icon: "⏰" },
                  ].map((p) => (
                    <div key={p.key} className="bg-indigo-50 rounded-lg border border-indigo-100 overflow-hidden">
                      <div className="bg-indigo-600 text-white px-4 py-2 flex items-center">
                        <span className="mr-2">{p.icon}</span>
                        <h4 className="font-medium">{p.label}</h4>
                      </div>
                      <div className="p-4">
                        <ol className="list-decimal ml-4 space-y-2 text-gray-700">
                          {Array.isArray(content.StudyPlans?.[p.key]) && content.StudyPlans[p.key].map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other prep sections in accordion style */}
            {[
              { key: "BehavioralStoriesGuide", title: "Behavioral Stories Guide", icon: "📝" },
              { key: "ClarifyingQuestions", title: "Clarifying Questions", icon: "🤔" },
              { key: "AskInterviewer", title: "Ask the Interviewer", icon: "💬" },
              { key: "SystemDesignTemplates", title: "System Design Templates", icon: "🏗️" },
              { key: "CodingWarmups", title: "Coding Warm-ups", icon: "💻" },
              { key: "RoleSpecificCheatSheets", title: "Role-Specific Cheat Sheets", icon: "📋" },
              { key: "CompanyResearchTemplate", title: "Company Research Template", icon: "🔍" },
              { key: "NegotiationPrep", title: "Negotiation Prep", icon: "🤝" },
              { key: "DayOfTips", title: "Day-of Tips", icon: "🌟" },
              { key: "SelfAssessmentRubric", title: "Self-Assessment Rubric", icon: "✅" },
              { key: "Last48HoursPlan", title: "Last 48 Hours Plan", icon: "⏱️" },
            ].map(({ key, title, icon }) => {
              const items = content[key];
              if (!Array.isArray(items) || items.length === 0) return null;
              
              return (
                <details key={key} className="bg-white rounded-xl shadow-sm border border-gray-100 group">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <div className="flex items-center">
                      <span className="mr-3">{icon}</span>
                      <h3 className="font-medium text-gray-800">{title}</h3>
                    </div>
                    <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t">
                    <ul className="list-disc ml-5 space-y-1 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Step3LearningTabs({ formData = {}, selectedRounds = [], learningContent }) {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  // Auto-select the first skill that has non-empty content
  useEffect(() => {
    if (Array.isArray(learningContent) && learningContent.length > 0) {
      const firstWithContent = learningContent.findIndex((item) => item && item.content && Object.keys(item.content || {}).length > 0);
      setSelectedSkillIndex(firstWithContent >= 0 ? firstWithContent : 0);
    }
  }, [learningContent]);

  if (!learningContent || !learningContent.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center p-8 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-4xl mb-3">📭</div>
          <p className="text-gray-500 font-medium">No content available.</p>
          <p className="text-gray-400 text-sm mt-2">Please go back and select different interview rounds.</p>
        </div>
      </div>
    );
  }

  const skillsArray = (formData?.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4">
      {/* Step Header with Progress Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
            <span className="text-indigo-700 text-xl">📘</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-600 text-white text-xs font-medium">3</span>
              <p className="text-sm text-indigo-600 font-medium">STEP 3 OF 3</p>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
              Learning Content for {selectedRounds?.[0]?.roundName || "Selected Round"}
            </h2>
          </div>
        </div>
        
        {/* Round Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100">
          <span className="text-indigo-600">🎯</span>
          <span className="font-medium text-indigo-700">{selectedRounds?.[0]?.roundName || "Selected Round"}</span>
        </div>
      </div>

      {/* Job Information Card - Collapsible */}
      <details className="group rounded-2xl border border-gray-200 shadow-sm bg-white overflow-hidden">
        <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
              <span className="text-white text-lg">🧾</span>
            </div>
            <div>
              <p className="text-white/80 text-xs uppercase tracking-wider">
                Job Information
              </p>
              <h3 className="text-white text-lg font-semibold">
                {formData?.jobTitle || "—"}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {formData?.yearsExperience && (
              <span className="inline-flex items-center gap-2 text-white/90 text-sm bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                ⏳ {formData.yearsExperience} yrs exp
              </span>
            )}
            <svg className="w-5 h-5 text-white transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </summary>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Skills */}
          <div className="flex items-start gap-3">
            <span className="text-indigo-600 mt-0.5">🧠</span>
            <div className="w-full">
              <p className="text-xs uppercase text-gray-500 tracking-wider">Skills</p>
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skillsArray.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">—</p>
              )}
            </div>
          </div>

          {/* Job Description */}
          {formData?.jobDescription && (
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-0.5">📝</span>
              <div>
                <p className="text-xs uppercase text-gray-500 tracking-wider">Job Description</p>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  {formData.jobDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </details>

      {/* Main Content Area with Card Design */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        {/* Mobile Skills Selector - Redesigned as Pills */}
        <div className="lg:hidden p-4 bg-gray-50 border-b">
          <h2 className="font-bold text-gray-700 mb-3">Select Skill:</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {learningContent.map((skill, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSkillIndex(idx)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedSkillIndex === idx
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {skill.topic}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row h-[60vh] sm:h-[65vh] lg:h-[70vh]">
          {/* Desktop Sidebar - Redesigned with Icons */}
          <div className="hidden lg:block w-56 xl:w-64 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4 border-b">
              <h2 className="font-bold text-gray-700 flex items-center gap-2">
                <span className="text-indigo-600">🧠</span>
                <span>Skills</span>
              </h2>
            </div>
            <ul className="p-2">
              {learningContent.map((skill, idx) => (
                <li key={idx} className="mb-1">
                  <button
                    onClick={() => setSelectedSkillIndex(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedSkillIndex === idx
                        ? "bg-indigo-100 text-indigo-800 font-medium"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center">
                      <span className={`w-2 h-2 rounded-full ${selectedSkillIndex === idx ? 'bg-indigo-600' : 'bg-gray-300'} mr-2`}></span>
                      <span>{skill.topic}</span>
                    </div>
                    {skill.level && (
                      <span className="block text-xs text-gray-500 mt-1 ml-4">{skill.level}</span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full p-4 lg:p-6 overflow-y-auto">
              <SingleSkillTabs skill={learningContent[selectedSkillIndex]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
