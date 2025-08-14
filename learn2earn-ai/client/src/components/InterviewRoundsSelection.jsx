export default function InterviewRoundsSelection({ rounds, selectedRounds, setSelectedRounds, onSubmit, loading }) {
  const toggleRound = (round) => {
    if (selectedRounds.includes(round)) {
      setSelectedRounds(selectedRounds.filter(r => r !== round));
    } else {
      setSelectedRounds([...selectedRounds, round]);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Step 2 - Select Rounds</h2>
      <div className="space-y-2">
        {rounds.map((round, idx) => (
          <div
            key={idx}
            onClick={() => toggleRound(round)}
            className={`p-3 rounded border cursor-pointer ${
              selectedRounds.includes(round) ? "bg-indigo-100 border-indigo-500" : "bg-gray-50"
            }`}
          >
            {round}
          </div>
        ))}
      </div>
      <button
        onClick={onSubmit}
        disabled={loading || selectedRounds.length === 0}
        className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        {loading ? "Loading..." : "Generate Learning Content"}
      </button>
    </div>
  );
}
