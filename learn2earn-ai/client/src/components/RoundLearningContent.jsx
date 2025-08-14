export default function RoundLearningContent({ content }) {
  return (
    <div className="prose max-w-none">
      {Array.isArray(content) ? (
        <ul className="list-disc pl-5">
          {content.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>{content}</p>
      )}
    </div>
  );
}
