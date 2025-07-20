export default function ContentDisplay({ content }) {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <section>
        <h2 className="text-xl font-semibold mb-2">Lesson</h2>
        <p className="whitespace-pre-wrap">{content.Lesson}</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">MCQs</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto whitespace-pre-wrap">{content.MCQs}</pre>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2">Flashcards</h2>
        <pre className="bg-gray-100 p-3 rounded overflow-auto whitespace-pre-wrap">{content.Flashcards}</pre>
      </section>
    </div>
  );
}
