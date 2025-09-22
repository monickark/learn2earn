// components/interview/Step2RoundsSelection.jsx
export default function Step2RoundsSelection({
  formData = {},
  rounds,
  selectedRounds,
  setSelectedRounds,
  onSubmit,
  loading
}) {
  const toggleSelection = (round) => {
    if (selectedRounds.includes(round)) {
      setSelectedRounds(selectedRounds.filter((r) => r !== round));
    } else {
      setSelectedRounds([...selectedRounds, round]);
    }
  };

  const skillsArray = (formData?.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 px-4">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-700 text-base sm:text-lg">🎯</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          Step 2: Select Interview Rounds
        </h2>
      </div>

      {/* Job Information Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Job Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-600">Role:</span>
            <span className="ml-2 text-gray-900">{formData.jobTitle || "Not specified"}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Experience:</span>
            <span className="ml-2 text-gray-900">{formData.yearsExperience || "Not specified"}</span>
          </div>
          {skillsArray.length > 0 && (
            <div className="sm:col-span-2">
              <span className="font-medium text-gray-600">Skills:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {skillsArray.map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rounds List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {Array.isArray(rounds) && rounds.length > 0 ? (
          rounds.map((round, idx) => {
            const selected = selectedRounds.includes(round);
            return (
              <button
                type="button"
                key={idx}
                onClick={() => toggleSelection(round)}
                className={`group text-left rounded-xl border p-4 sm:p-5 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transform ${
                  selected
                    ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-[1.02] shadow-lg"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm sm:text-base mb-2">
                      {round.roundName || round.name || `Round ${idx + 1}`}
                    </h4>
                    
                    {/* Topics */}
                    {round.topics && round.topics.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium opacity-80 mb-1">Topics:</p>
                        <div className="flex flex-wrap gap-1">
                          {round.topics.map((topic, topicIdx) => (
                            <span 
                              key={topicIdx}
                              className={`text-xs px-2 py-1 rounded-full ${
                                selected 
                                  ? 'bg-white/20 text-white' 
                                  : 'bg-indigo-100 text-indigo-700'
                              }`}
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Resources */}
                    {round.resources && round.resources.length > 0 && (
                      <div className="mb-2">
                        <p className="text-xs font-medium opacity-80 mb-1">Resources:</p>
                        <div className="space-y-1">
                          {round.resources.slice(0, 2).map((resource, resourceIdx) => (
                            <a
                              key={resourceIdx}
                              href={resource}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-xs block hover:underline break-all ${
                                selected ? 'text-white/80' : 'text-indigo-600'
                              }`}
                              onClick={(e) => e.stopPropagation()}
                              title={resource}
                            >
                              {resource.length > 50 ? `${resource.substring(0, 50)}...` : resource}
                            </a>
                          ))}
                          {round.resources.length > 2 && (
                            <p className={`text-xs ${selected ? 'text-white/60' : 'text-gray-500'}`}>
                              +{round.resources.length - 2} more resources
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Fallback description if no topics/resources */}
                    {(!round.topics || round.topics.length === 0) && (!round.resources || round.resources.length === 0) && (
                      <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                        {round.description || "Interview round details will be provided here."}
                      </p>
                    )}
                  </div>
                  
                  <div className={`ml-3 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    selected ? "border-white" : "border-gray-300"
                  }`}>
                    {selected && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">No rounds available.</p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={loading || selectedRounds.length === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.01] text-sm sm:text-base font-medium"
        >
          {loading ? "Loading..." : `Fetch Learning Content (${selectedRounds.length} selected)`}
        </button>
      </div>
    </div>
  );
}
