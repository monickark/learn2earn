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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Step Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-indigo-100 flex items-center justify-center">
          <span className="text-indigo-700 text-lg">🎯</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
          Step 2: Select Interview Rounds
        </h2>
      </div>

      {/* Job Information Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                <span className="text-white text-lg">🧾</span>
              </div>
              <div>
                <p className="text-white/80 text-xs uppercase tracking-wider">
                  Job Information
                </p>
                <h3 className="text-white text-lg font-semibold">
                  {formData?.jobTitle || "—"}
                </h3>
              </div>
            </div>
            {formData?.yearsExperience && (
              <span className="inline-flex items-center gap-2 text-white/90 text-sm bg-white/10 border border-white/20 px-3 py-1.5 rounded-full">
                ⏳ {formData.yearsExperience} yrs exp
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Skills */}
          <div className="flex items-start gap-3">
            <span className="text-indigo-600 mt-0.5">🧠</span>
            <div className="w-full">
              <p className="text-xs uppercase text-gray-500 tracking-wider">Skills</p>
              {skillsArray.length > 0 ? (
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillsArray.map((skill, i) => (
                    <span
                      key={`${skill}-${i}`}
                      className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-700"
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

          {/* Description */}
          {formData?.jobDescription && (
            <div className="flex items-start gap-3">
              <span className="text-indigo-600 mt-0.5">📝</span>
              <div>
                <p className="text-xs uppercase text-gray-500 tracking-wider">Job Description</p>
                <p className="mt-1 text-gray-700 leading-relaxed">
                  {formData.jobDescription}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rounds List */}
      <div className="grid md:grid-cols-2 gap-5">
        {Array.isArray(rounds) && rounds.length > 0 ? (
          rounds.map((round, idx) => {
            const selected = selectedRounds.includes(round);
            return (
              <button
                type="button"
                key={idx}
                onClick={() => toggleSelection(round)}
                className={`group text-left rounded-xl border p-5 shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transform ${
                  selected
                    ? "border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white scale-[1.02] shadow-lg"
                    : "bg-white hover:bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <h4
                    className={`font-semibold ${
                      selected ? "text-white" : "text-gray-900 group-hover:text-indigo-700"
                    }`}
                  >
                    {round.roundName}
                  </h4>
                  <span
                    className={`inline-flex h-6 min-w-[1.5rem] items-center justify-center rounded-full text-xs font-semibold transition-all duration-200 ${
                      selected
                        ? "bg-white text-indigo-600"
                        : "bg-gray-100 text-gray-700 group-hover:bg-indigo-100"
                    }`}
                  >
                    {selected ? "✓" : "+"}
                  </span>
                </div>

                {/* Topics as chips */}
                {Array.isArray(round.topics) && round.topics.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {round.topics.map((topic, i) => (
                      <span
                        key={`${topic}-${i}`}
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${
                          selected
                            ? "border-white bg-white/20 text-white"
                            : "border-gray-200 bg-gray-50 text-gray-700"
                        }`}
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Resources */}
                {Array.isArray(round.resources) && round.resources.length > 0 && (
                  <div className="mt-3">
                    <p
                      className={`text-xs uppercase tracking-wider mb-1 ${
                        selected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      Resources
                    </p>
                    <ul className="space-y-1">
                      {round.resources.map((res, i) => (
                        <li key={i} className="truncate">
                          <a
                            href={res}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm break-all ${
                              selected
                                ? "text-white hover:underline"
                                : "text-indigo-700 hover:underline"
                            }`}
                          >
                            {res}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </button>
            );
          })
        ) : (
          <p className="text-gray-500">No rounds available.</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="sticky bottom-4">
        <button
          onClick={onSubmit}
          disabled={loading || selectedRounds.length === 0}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-4 rounded-xl shadow-md transition-transform duration-200 hover:scale-[1.01]"
        >
          {loading ? "Loading..." : "Fetch Learning Content"}
        </button>
      </div>
    </div>
  );
}
