// components/interview/Step3LearningTabs.jsx
import { useState } from "react";

export default function Step3LearningTabs({ learningContent }) {
  const [activeTab, setActiveTab] = useState(0);

  if (!learningContent || learningContent.length === 0) {
    return <p>No content available.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex border-b mb-4">
        {learningContent.map((round, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`px-4 py-2 ${idx === activeTab ? "border-b-2 border-indigo-600 font-bold" : ""}`}
          >
            {round.roundName}
          </button>
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-bold mb-2">{learningContent[activeTab].roundName}</h3>
        <ul className="list-disc ml-6">
          {learningContent[activeTab].topics.map((topic, i) => (
            <li key={i}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
