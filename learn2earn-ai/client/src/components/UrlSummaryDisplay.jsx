import React from 'react';

export default function UrlSummaryDisplay({ urlSummary, url }) {
  let parsedSummary = {};

  try {
    parsedSummary = typeof urlSummary === 'string'
      ? JSON.parse(urlSummary)
      : urlSummary;
  } catch (e) {
    console.error("Failed to parse summary:", e);
  }

  const {
    Summary = 'Summary not available.',
    KeyPoints = [],
    Source = url || 'Unknown'
  } = parsedSummary;

  return (
    <div className="bg-white p-6 mt-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-indigo-800 mb-4">📰 Summary from URL</h2>

      {url && (
        <p className="text-sm text-indigo-600 mb-2 break-all">
          <span className="font-semibold">Source:</span> <a href={url} target="_blank" rel="noopener noreferrer" className="underline">{url}</a>
        </p>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">📝 Key Summary</h3>
          <p className="text-gray-800 whitespace-pre-line">{Summary || "Summary not available."}</p>
        </div>

        {KeyPoints?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700">📌 Key Points</h3>
            <ul className="list-disc list-inside text-gray-800">
              {KeyPoints.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
