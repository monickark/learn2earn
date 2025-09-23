export default function ArticleSummaryDisplay({ summary }) {
  if (!summary) return null;

  const { Title, Summary, KeyPoints, Source } = summary;

  return (
    <div className="bg-gray-800 text-white p-4 sm:p-6 md:p-8 rounded-xl space-y-4 sm:space-y-6 mt-4">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-amber-400">📰 Article Summary</h2>
      {Title && (
        <div className="text-base sm:text-lg font-semibold text-white">
          📌 {Title}
        </div>
      )}

      {/* Summary */}
      {Summary && (
        <div className="text-gray-200 text-sm sm:text-base leading-relaxed">
          📝 {Summary}
        </div>
      )}

      {/* Key Points */}
      {Array.isArray(KeyPoints) && KeyPoints.length > 0 && (
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-cyan-400">🔑 Key Points</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base">
            {KeyPoints.map((point, idx) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Source */}
      {Source && (
        <div className="text-xs sm:text-sm text-gray-400 break-all">
          🔗 Source: <a href={Source} target="_blank" rel="noopener noreferrer" className="underline text-blue-400">{Source}</a>
        </div>
      )}
    </div>
  );
}
