// components/interview/Step3LearningTabs.jsx
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Step3LearningTabs({ learningContent }) {
  const [activeTab, setActiveTab] = useState("lesson");

  if (!learningContent || !learningContent.content) {
    return <p className="text-gray-500 text-center">No content available.</p>;
  }

  const { topic, content } = learningContent;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Tabs */}
      <div className="flex gap-3 border-b pb-2">
        {["lesson", "mcqs", "flashcards", "reflection"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-medium ${
              activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "lesson" && (
        <div className="prose max-w-none">
          <h2 className="text-xl font-bold text-indigo-700 mb-2">
            Lesson ({content.Level})
          </h2>
          <ReactMarkdown>{content.Lesson}</ReactMarkdown>
          <p className="mt-4 text-sm text-gray-500">
            <strong>Source:</strong> {content.Source}
          </p>
        </div>
      )}

      {activeTab === "mcqs" && (
        <div className="space-y-6">
          {content.MCQs.map((q, i) => (
            <div key={i} className="p-4 border rounded-lg bg-white shadow-sm">
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>
              <ul className="space-y-1">
                {q.options.map((opt, j) => (
                  <li key={j}>
                    <span className="font-semibold">{opt.label}.</span>{" "}
                    {opt.text}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-green-700 text-sm">
                ✅ Answer: {q.answer} — {q.explanation}
              </p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "flashcards" && (
        <div className="grid md:grid-cols-2 gap-4">
          {content.Flashcards.map((card, i) => (
            <div
              key={i}
              className="p-4 border rounded-lg bg-indigo-50 shadow-sm"
            >
              <p className="font-bold">Q: {card.question}</p>
              <p className="mt-2 text-gray-700">A: {card.answer}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "reflection" && (
        <ul className="list-disc ml-6 space-y-2 text-gray-700">
          {content.ReflectionPrompts.map((prompt, i) => (
            <li key={i}>{prompt}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
