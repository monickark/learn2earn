// components/interview/Practice.jsx
import { useState } from "react";

export default function Practice() {
  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const startPractice = async () => {
    setStarted(true);
    // TODO: fetch first question from backend
    setQuestion("Tell me about a challenging project you worked on.");
  };

  const submitAnswer = async () => {
    // TODO: send `answer` to backend for feedback
    setFeedback("Good structure, but elaborate more on challenges faced.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {!started ? (
        <button
          onClick={startPractice}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Start Practice
        </button>
      ) : (
        <div className="space-y-4">
          <p className="font-semibold text-lg">{question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Type your answer..."
          />
          <button
            onClick={submitAnswer}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Submit Answer
          </button>

          {feedback && (
            <div className="p-4 bg-gray-50 border rounded">
              <p className="text-green-700">{feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
