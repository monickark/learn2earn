// components/interview/Step3LearningTabs.jsx
import { useState } from "react";

function SingleSkillTabs({ skill }) {
  const [activeTab, setActiveTab] = useState("overview");
  const { topic, level, content } = skill;

  if (!content) {
    return <p className="text-gray-500 text-center">No content available.</p>;
  }

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "topics", label: "Must-Know Topics" },
    { key: "studyplan", label: "Study Plan" },
    { key: "questions", label: "Questions" },
    { key: "mistakes", label: "Mistakes to Avoid" },
    { key: "resources", label: "Resources" },
  ];

  return (
    <div className="space-y-6">
      {/* Skill Title */}
      <h2 className="text-xl font-bold text-indigo-700">
        {topic} ({level})
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 border-b pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg font-medium whitespace-nowrap ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && (
        <div className="prose max-w-none">
          <h3 className="text-lg font-bold mb-2">{content.Round}</h3>
          <p>{content.Overview}</p>
        </div>
      )}

      {activeTab === "topics" && (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {content.MustKnowTopics?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      )}

      {activeTab === "studyplan" && (
        <ol className="list-decimal ml-6 space-y-2 text-gray-700">
          {content.StudyPlan?.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      )}

      {activeTab === "questions" && (
        <div className="space-y-6">
          {content.Questions?.map((q, i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>
              <p className="mt-2 text-green-700 text-sm">
                ✅ {q.sampleAnswer}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "mistakes" && (
        <ul className="list-disc ml-6 space-y-2 text-red-600">
          {content.MistakesToAvoid?.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      )}

      {activeTab === "resources" && (
        <ul className="list-disc ml-6 space-y-2 text-blue-700">
          {content.RecommendedResources?.map((r, i) => (
            <li key={i}>
              <a
                href={r.includes("http") ? r : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {r}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Step3LearningTabs({ formData = {}, selectedRound = {}, learningContent }) {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(0);

  if (!learningContent || !learningContent.length) {
    return <p className="text-gray-500 text-center">No content available.</p>;
  }

  const skillsArray = (formData?.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-700 text-lg">📘</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          Step 3: Learning Content for {selectedRound?.roundName || "Selected Round"}
        </h2>
      </div>

      {/* Job Information Card (same style as Step 2) */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
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
            {formData?.yearsExperience && (
              <span className="inline-flex items-center gap-2 text-white/90 text-sm bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                ⏳ {formData.yearsExperience} yrs exp
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Skills */}
          <div className="flex items-start gap-3">
            <span className="text-indigo-600 mt-0.5">🧠</span>
            <div className="w-full">
              <p className="text-xs uppercase text-gray-500 tracking-wider">Skills</p>
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillsArray.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
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
                <p className="mt-1 text-gray-700 leading-relaxed">
                  {formData.jobDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[70vh] border rounded-lg overflow-hidden shadow">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r overflow-y-auto">
          <h2 className="px-4 py-3 font-bold text-indigo-700 border-b">Skills</h2>
          <ul className="space-y-1">
            {learningContent.map((skill, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedSkillIndex(idx)}
                  className={`w-full text-left px-4 py-2 block transition-colors ${
                    selectedSkillIndex === idx
                      ? "bg-indigo-600 text-white font-medium rounded-r-full"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {skill.topic}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-white">
          <SingleSkillTabs skill={learningContent[selectedSkillIndex]} />
        </div>
      </div>
    </div>
  );
}
