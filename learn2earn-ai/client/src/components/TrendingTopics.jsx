export default function TrendingTopics({ topics = [], onClick }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-sm">
      <h2 className="text-lg font-semibold mb-3 text-indigo-700">🔥 Trending Topics</h2>
      <ul className="space-y-2">
        {topics.map((item, idx) => (
          <li key={idx}>
            <button
              onClick={() => onClick(item.topic, 'Beginner')}
              className="text-indigo-600 hover:underline flex justify-between w-full"
            >
              <span>{item.topic}</span>
              <span className="text-gray-500 ml-2">({item.count})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
