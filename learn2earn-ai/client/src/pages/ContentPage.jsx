export default function ContentPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Generate Educational Content</h2>
      <form className="w-full max-w-md space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Enter topic" />
        <select className="w-full border p-2 rounded">
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
        <button type="submit" className="btn w-full">Generate</button>
      </form>
    </div>
  );
}