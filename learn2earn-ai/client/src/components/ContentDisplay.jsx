import { useState } from 'react';
import { marked } from 'marked';

export default function ContentDisplay({ content }) {
  console.log("content : ", JSON.stringify(content));
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const mcqList = content.MCQs || [];
  const tags = content.Tags || [];
  const reflections = content.ReflectionPrompts || [];
  const flashcards = content.Flashcards || [];
  console.log("mcqList : ", mcqList);
  const handleSelect = (index, option, correct) => {
    if (selectedAnswers[index]) return;
    const updated = { ...selectedAnswers, [index]: option };
    setSelectedAnswers(updated);
    if (option === correct) setScore(prev => prev + 1);
  };

  return (
    <div className="space-y-12 text-white">
      {/* Section: Lesson */}
      <section>
        <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-rose-600 text-white text-sm rounded-full mb-2">
          Level: {content.Level}
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-sm text-rose-300 italic">
          Source: <span className="font-medium">{content.Source}</span>
        </div>
      </div>
        <section className="prose prose-invert max-w-none bg-gray-800 p-6 rounded-xl">
          <div dangerouslySetInnerHTML={{ __html: marked(content.Lesson || "") }} />
        </section>
      </section>

      {/* Section: MCQs */}
      <section>
        <h2 className="text-2xl font-semibold text-rose-200 mb-4">MCQs</h2>
        {mcqList.map((mcq, i) => (
          <div key={i} className="mb-6 p-4 bg-gray-800 rounded-xl">
            <div className="font-medium mb-2">{i + 1}. {mcq.question}</div>
            <div className="space-y-2">
              {mcq.options.map((opt) => (
                <label
                  key={opt.label}
                  className={`block cursor-pointer p-2 rounded-md transition ${
                    selectedAnswers[i]
                      ? opt.label === mcq.answer
                        ? 'bg-green-500'
                        : selectedAnswers[i] === opt.label
                        ? 'bg-red-500'
                        : 'bg-gray-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <input
                    type="checkbox"
                    disabled={!!selectedAnswers[i]}
                    className="mr-2"
                    onChange={() => handleSelect(i, opt.label, mcq.answer)}
                  />
                  {opt.label}. {opt.text}
                </label>
              ))}
            </div>
            {selectedAnswers[i] && (
              <div className="text-sm text-green-300 mt-2">
                Explanation: {mcq.explanation}
              </div>
            )}
          </div>
        ))}
        <div className="text-lg text-rose-300 font-semibold mt-4">
          Score: {score} / {mcqList.length}
        </div>
        <div className="text-sm text-rose-400">
          Correct Answers Selected: {score}
        </div>
      </section>

      {/* Section: Flashcards */}
      <section>
        <h2 className="text-2xl font-semibold text-rose-200 mb-4">Flashcards</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {flashcards.map((fc, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold mb-1">Q: {fc.question}</div>
              <div className="text-rose-300">A: {fc.answer}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
