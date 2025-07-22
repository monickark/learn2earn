import { useState } from "react";
import { parseMCQs } from "../utils/helper";

export default function ContentDisplay({ content }) {
  const mcqs = parseMCQs(content.MCQs);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleCheck = (index, value) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    mcqs.forEach((mcq, idx) => {
      if (selectedAnswers[idx] === mcq.answer) correct++;
    });
    return correct;
  };

  const totalCorrect = calculateScore();

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg space-y-10 mt-10">
      {/* LESSON */}
      <section>
        <h2 className="text-2xl font-bold text-blue-700 flex items-center gap-2">
          📘 Lesson
        </h2>
        <p className="mt-3 text-gray-800 text-lg leading-relaxed whitespace-pre-wrap">
          {content.Lesson}
        </p>
      </section>

      {/* MCQs */}
      <section>
        <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
          📝 MCQs
        </h2>
        <div className="mt-4 space-y-6">
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className="bg-purple-50 border border-purple-300 rounded-lg p-4 space-y-3"
            >
              <p className="font-semibold">
                {index + 1}. {mcq.question}
              </p>
              <div className="space-y-1 pl-4">
                {mcq.options.map((opt, i) => (
                  <label key={i} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`mcq-${index}`}
                      value={opt.label}
                      checked={selectedAnswers[index] === opt.label}
                      onChange={() => handleCheck(index, opt.label)}
                      className="form-radio text-purple-600"
                    />
                    <span>{opt.label}. {opt.text}</span>
                  </label>
                ))}
              </div>

              {selectedAnswers[index] && (
                <p
                  className={`text-sm mt-2 font-semibold ${
                    selectedAnswers[index] === mcq.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedAnswers[index] === mcq.answer
                    ? "✅ Correct answer selected"
                    : `❌ Wrong. Correct: ${mcq.answer}`}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ✅ SCORE SUMMARY */}
        <div className="mt-8 text-center bg-purple-200 p-5 rounded-lg shadow-inner">
          <p className="text-xl font-bold text-purple-800">
            🎯 Correct Answers Selected: {totalCorrect} / {mcqs.length}
          </p>
        </div>
      </section>

      {/* FLASHCARDS */}
      <section>
        <h2 className="text-2xl font-bold text-pink-700 flex items-center gap-2">
          🧠 Flashcards
        </h2>
        <div className="mt-4 space-y-4">
          {content.Flashcards.split(/\n(?=\d+\.\sQ:)/).map((flashcard, index) => (
            <div
              key={index}
              className="bg-pink-50 border border-pink-300 rounded-lg p-4"
            >
              <pre className="text-sm font-mono text-gray-900 whitespace-pre-wrap">
                {flashcard.trim()}
              </pre>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
