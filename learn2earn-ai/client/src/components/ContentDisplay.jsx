import { useState, memo, useMemo } from 'react';
import { marked } from 'marked';

const ContentDisplay = memo(function ContentDisplay({ content }) {
  const [activeTab, setActiveTab] = useState("Lesson");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const mcqList = useMemo(() => content?.MCQs || [], [content?.MCQs]);
  const tags = useMemo(() => content?.Tags || [], [content?.Tags]);
  const reflections = useMemo(() => content?.ReflectionPrompts || [], [content?.ReflectionPrompts]);
  const flashcards = useMemo(() => content?.Flashcards || [], [content?.Flashcards]);

  const handleSelect = (index, option, correct) => {
    if (selectedAnswers[index]) return;
    const updated = { ...selectedAnswers, [index]: option };
    setSelectedAnswers(updated);
    if (option === correct) setScore(prev => prev + 1);
  };

  return (
    <div className="space-y-8 sm:space-y-12 text-white">
      {/* Section: Lesson */}
      <section>
        <div className="mb-6">
        <div className="inline-block px-3 py-1 bg-rose-600 text-white text-xs sm:text-sm rounded-full mb-2 mt-4 sm:mt-6">
          Level: {content.Level}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span key={idx} className="bg-purple-700 text-white text-xs font-medium px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        <div className="text-xs sm:text-sm text-rose-300 italic">
          Source: <span className="font-medium">{content.Source}</span>
        </div>
      </div>
       
      </section>

        {/* Tabs */}
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-6 border-b border-gray-600 overflow-x-auto">
        {["Lesson", "MCQs", "Flashcards", "Reflections"].map(tab => ( 
          <button
            key={tab}
            className={`px-3 sm:px-4 py-2 font-medium text-xs sm:text-sm rounded-t-md transition whitespace-nowrap ${
              activeTab === tab ? "bg-gray-700 text-amber-300" : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="bg-gray-800 p-4 sm:p-6 rounded-xl space-y-4">
        {activeTab === "Lesson" && (
          <div className="prose prose-invert max-w-none bg-gray-800 p-4 sm:p-6 rounded-xl text-sm sm:text-base">
              <div dangerouslySetInnerHTML={{ __html: marked(content.Lesson || "") }} />
            </div>
        )}

      {/* Section: MCQs */}
      {activeTab === "MCQs" && (
        <div className="space-y-4 sm:space-y-6">
        {mcqList.map((mcq, i) => (
          <div key={i} className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-800 rounded-xl">
            <div className="font-medium mb-2 text-sm sm:text-base">{i + 1}. {mcq.question}</div>
            <div className="space-y-2">
              {Array.isArray(mcq.options) ? (
                mcq.options.map((opt) => (
                  <label
                    key={opt.label}
                    className={`block cursor-pointer p-2 sm:p-3 rounded-md transition text-sm sm:text-base ${
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
                <div className="text-red-400 text-sm">⚠️ Invalid options format</div>
              )}
            </div>
            {selectedAnswers[i] && (
              <div className="text-xs sm:text-sm text-green-300 mt-2">
                Explanation: {mcq.explanation}
              </div>
            )}
          </div>
        ))}

          <div className="text-base sm:text-lg text-rose-300 font-semibold mt-4">
            Score: {score} / {mcqList.length}
          </div>
          <div className="text-xs sm:text-sm text-rose-400">
            Correct Answers Selected: {score}
          </div>
      </div>
      )}

      {/* Section: Flashcards */}
      {activeTab === "Flashcards" && (
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
          {flashcards.map((fc, idx) => (
            <div key={idx} className="bg-gray-800 p-3 sm:p-4 rounded-lg">
              <div className="font-semibold mb-1 text-sm sm:text-base">Q: {fc.question}</div>
              <div className="text-rose-300 text-sm sm:text-base">A: {fc.answer}</div>
            </div>
          ))}
        </div>
      )}


        {activeTab === "Reflections" && (
          <ul className="list-disc pl-4 sm:pl-6 space-y-2 text-cyan-300 text-sm sm:text-base">
            {reflections.map((r, idx) => <li key={idx}>{r}</li>)}
          </ul>
        )}

    </div>
    </div>
  );
});

export default ContentDisplay;