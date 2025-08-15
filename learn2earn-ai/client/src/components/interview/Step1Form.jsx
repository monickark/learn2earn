// components/interview/Step1Form.jsx
export default function Step1Form({ formData, setFormData, onSubmit, loading }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-indigo-700 mb-4">Interview Learning - Step 1</h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
        />
        <textarea
          placeholder="Job Description"
          className="w-full border p-2 rounded"
          rows="3"
          value={formData.jobDescription}
          onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
        />
        <input
          type="number"
          placeholder="Years of Experience"
          className="w-full border p-2 rounded"
          value={formData.yearsExperience}
          onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          className="w-full border p-2 rounded"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
        >
          {loading ? "Loading..." : "Generate Rounds"}
        </button>
      </div>
    </div>
  );
}
