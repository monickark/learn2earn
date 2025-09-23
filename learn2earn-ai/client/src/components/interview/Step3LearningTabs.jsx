// components/interview/Step3LearningTabs.jsx
import { useEffect, useState } from "react";

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
    { key: "prep", label: "Prep before interview" },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Skill Title */}
      <h2 className="text-lg sm:text-xl font-bold text-indigo-700">
        {topic} ({level})
      </h2>

      {/* Tabs */}
      <div className="flex gap-1 sm:gap-2 md:gap-3 border-b pb-2 overflow-x-auto scrollbar-hide max-w-full">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-2 sm:px-3 md:px-4 py-2 rounded-t-lg font-medium whitespace-nowrap text-xs sm:text-sm min-w-fit flex-shrink-0 max-w-[120px] sm:max-w-none ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            title={tab.label}
          >
            <span className="truncate block">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4 sm:mt-6">
        {activeTab === "overview" && (
          <div className="prose max-w-none text-sm sm:text-base">
            <h3 className="text-base sm:text-lg font-bold mb-3">{content.Round}</h3>
            <p className="leading-relaxed text-gray-700">{content.Overview}</p>
          </div>
        )}

        {activeTab === "topics" && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Must-Know Topics:</h3>
            <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-gray-700 text-sm sm:text-base">
              {content.MustKnowTopics?.map((t, i) => (
                <li key={i} className="leading-relaxed">{t}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "studyplan" && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Study Plan:</h3>
            <ol className="list-decimal ml-4 sm:ml-6 space-y-2 text-gray-700 text-sm sm:text-base">
              {content.StudyPlan?.map((step, i) => (
                <li key={i} className="leading-relaxed">{step}</li>
              ))}
            </ol>
          </div>
        )}

        {activeTab === "questions" && (
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Interview Questions:</h3>
            {content.Questions?.map((q, i) => (
              <div key={i} className="p-3 sm:p-4 border rounded-lg bg-gray-50 shadow-sm">
                <p className="font-medium mb-2 text-sm sm:text-base text-gray-800">
                  {i + 1}. {q.question}
                </p>
                <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-r">
                  <p className="text-green-800 text-xs sm:text-sm leading-relaxed">
                    <span className="font-medium">Sample Answer:</span> {q.sampleAnswer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "mistakes" && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Mistakes to Avoid:</h3>
            <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-red-600 text-sm sm:text-base">
              {content.MistakesToAvoid?.map((m, i) => (
                <li key={i} className="leading-relaxed">{m}</li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="space-y-3">
            <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-3">Recommended Resources:</h3>
            <ul className="list-disc ml-4 sm:ml-6 space-y-2 text-blue-700 text-sm sm:text-base">
              {content.RecommendedResources?.map((r, i) => (
                <li key={i} className="leading-relaxed">
                  <a
                    href={r.includes("http") ? r : "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline break-all text-blue-600 hover:text-blue-800"
                  >
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "prep" && (
          <div className="space-y-6">
            {/* Pre-Interview Checklist */}
            {Array.isArray(content.PreInterviewChecklist) && content.PreInterviewChecklist.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Pre-Interview Checklist</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.PreInterviewChecklist.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Study Plans */}
            {content.StudyPlans && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Study Plans</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { key: "Day30", label: "30-Day Plan" },
                    { key: "Day14", label: "14-Day Plan" },
                    { key: "Day7", label: "7-Day Plan" },
                    { key: "Day2", label: "Last 2 Days" },
                  ].map((p) => (
                    <div key={p.key} className="p-3 border rounded-lg bg-gray-50">
                      <h4 className="font-medium text-gray-800 mb-2 text-sm">{p.label}</h4>
                      <ol className="list-decimal ml-4 space-y-1 text-gray-700 text-sm">
                        {Array.isArray(content.StudyPlans?.[p.key]) && content.StudyPlans[p.key].map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Behavioral Stories Guide */}
            {Array.isArray(content.BehavioralStoriesGuide) && content.BehavioralStoriesGuide.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Behavioral Stories Guide</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.BehavioralStoriesGuide.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Clarifying Questions */}
            {Array.isArray(content.ClarifyingQuestions) && content.ClarifyingQuestions.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Clarifying Questions</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.ClarifyingQuestions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Ask the Interviewer */}
            {Array.isArray(content.AskInterviewer) && content.AskInterviewer.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Ask the Interviewer</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.AskInterviewer.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* System Design Templates */}
            {Array.isArray(content.SystemDesignTemplates) && content.SystemDesignTemplates.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">System Design Templates</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.SystemDesignTemplates.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Coding Warm-ups */}
            {Array.isArray(content.CodingWarmups) && content.CodingWarmups.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Coding Warm-ups</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.CodingWarmups.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Role-specific Cheat Sheets */}
            {Array.isArray(content.RoleSpecificCheatSheets) && content.RoleSpecificCheatSheets.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Role-Specific Cheat Sheets</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.RoleSpecificCheatSheets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Company Research Template */}
            {Array.isArray(content.CompanyResearchTemplate) && content.CompanyResearchTemplate.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Company Research Template</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.CompanyResearchTemplate.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Negotiation Prep */}
            {Array.isArray(content.NegotiationPrep) && content.NegotiationPrep.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Negotiation Prep</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.NegotiationPrep.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Day-of Tips */}
            {Array.isArray(content.DayOfTips) && content.DayOfTips.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Day-of Tips</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.DayOfTips.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Self-Assessment Rubric */}
            {Array.isArray(content.SelfAssessmentRubric) && content.SelfAssessmentRubric.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Self-Assessment Rubric</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.SelfAssessmentRubric.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Last 48 Hours Plan */}
            {Array.isArray(content.Last48HoursPlan) && content.Last48HoursPlan.length > 0 && (
              <section>
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Last 48 Hours Plan</h3>
                <ul className="list-disc ml-4 sm:ml-6 space-y-1 text-gray-700 text-sm sm:text-base">
                  {content.Last48HoursPlan.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            )}
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
    return <p className="text-gray-500 text-center">No content available.</p>;
  }

  const skillsArray = (formData?.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 px-4 no-overflow">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-700 text-base sm:text-lg">📘</span>
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          Step 3: Learning Content for {selectedRounds?.[0]?.roundName || "Selected Round"}
        </h2>
      </div>

      {/* Job Information Card (same style as Step 2) */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-4 sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-white text-base sm:text-lg">🧾</span>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider">
                  Job Information
                </p>
                <h3 className="text-white text-base sm:text-lg font-semibold">
                  {formData?.jobTitle || "—"}
                </h3>
              </div>
            </div>
            {formData?.yearsExperience && (
              <span className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm bg-white/10 border border-white/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                ⏳ {formData.yearsExperience} yrs exp
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Skills */}
          <div className="flex items-start gap-3">
            <span className="text-indigo-600 mt-0.5">🧠</span>
            <div className="w-full">
              <p className="text-xs uppercase text-gray-500 tracking-wider">Skills</p>
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-1">
                  {skillsArray.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2 sm:px-2.5 py-1 text-xs font-medium text-indigo-700"
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
                <p className="mt-1 text-gray-700 leading-relaxed text-sm sm:text-base">
                  {formData.jobDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row h-[50vh] sm:h-[60vh] lg:h-[70vh] border rounded-lg overflow-hidden shadow">
        {/* Mobile Skills Selector */}
        <div className="lg:hidden bg-gray-50 border-b p-3 sm:p-4">
          <h2 className="font-bold text-indigo-700 mb-3 text-sm">Select Skill:</h2>
          <select
            value={selectedSkillIndex}
            onChange={(e) => setSelectedSkillIndex(parseInt(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {learningContent.map((skill, idx) => (
              <option key={idx} value={idx}>
                {skill.topic}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-48 xl:w-64 bg-gray-50 border-r overflow-y-auto">
          <h2 className="px-3 xl:px-4 py-3 font-bold text-indigo-700 border-b text-sm">Skills</h2>
          <ul className="space-y-1">
            {learningContent.map((skill, idx) => (
              <li key={idx}>
                <button
                  onClick={() => setSelectedSkillIndex(idx)}
                  className={`w-full text-left px-3 xl:px-4 py-2 block transition-colors text-xs xl:text-sm ${
                    selectedSkillIndex === idx
                      ? "bg-indigo-600 text-white font-medium rounded-r-full"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <span className="truncate block">{skill.topic}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto bg-white">
          <SingleSkillTabs skill={learningContent[selectedSkillIndex]} />
        </div>
      </div>
    </div>
  );
}
