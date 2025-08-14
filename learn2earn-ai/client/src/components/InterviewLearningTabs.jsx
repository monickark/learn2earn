import { useState } from "react";
import RoundLearningContent from "./RoundLearningContent";

export default function InterviewLearningTabs({ learningContent }) {
  const rounds = Object.keys(learningContent);
  const [activeRound, setActiveRound] = useState(rounds[0] || "");

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Step 3 - Learning Content</h2>
      <div className="flex space-x-2 border-b mb-4">
        {rounds.map((round) => (
          <button
            key={round}
            onClick={() => setActiveRound(round)}
            className={`px-4 py-2 ${
              activeRound === round
                ? "border-b-2 border-indigo-600 text-indigo-600 font-semibold"
                : "text-gray-600"
            }`}
          >
            {round}
          </button>
        ))}
      </div>
      {activeRound && <RoundLearningContent content={learningContent[activeRound]} />}
    </div>
  );
}
