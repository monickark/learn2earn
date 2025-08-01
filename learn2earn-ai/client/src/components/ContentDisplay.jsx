import { useState } from 'react';
import { marked } from 'marked';

export default function ContentDisplay({ content }) {
  const [activeTab, setActiveTab] = useState("Lesson");
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
        <div className="inline-block px-3 py-1 bg-rose-600 text-white text-sm rounded-full mb-2 mt-6">
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
       
      </section>

        {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-600">
        {["Lesson", "MCQs", "Flashcards", "Reflections"].map(tab => ( 
          <button
            key={tab}
            className={`px-4 py-2 font-medium text-sm rounded-t-md transition ${
              activeTab === tab ? "bg-gray-700 text-amber-300" : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-6 rounded-xl space-y-4">
        {activeTab === "Lesson" && (
          <div className="prose prose-invert max-w-none bg-gray-800 p-6 rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: marked(content.Lesson || "") }} />
            </div>
        )}

      {/* Section: MCQs */}
      {activeTab === "MCQs" && (
        <div className="space-y-6">
        {mcqList.map((mcq, i) => (
          <div key={i} className="mb-6 p-4 bg-gray-800 rounded-xl">
            <div className="font-medium mb-2">{i + 1}. {mcq.question}</div>
            <div className="space-y-2">
              {Array.isArray(mcq.options) ? (
                mcq.options.map((opt) => (
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
                ))
              ) : (
                <div className="text-red-400">⚠️ Invalid options format</div>
              )}
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
      </div>
      )}

      {/* Section: Flashcards */}
      {activeTab === "Flashcards" && (
        <div className="grid gap-4 md:grid-cols-2">
          {flashcards.map((fc, idx) => (
            <div key={idx} className="bg-gray-800 p-4 rounded-lg">
              <div className="font-semibold mb-1">Q: {fc.question}</div>
              <div className="text-rose-300">A: {fc.answer}</div>
            </div>
          ))}
        </div>
      )}


        {activeTab === "Reflections" && (
          <ul className="list-disc pl-6 space-y-2 text-cyan-300">
            {reflections.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        )}

    </div>
    </div>
  );
}