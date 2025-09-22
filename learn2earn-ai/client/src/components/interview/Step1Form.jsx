// components/interview/Step1Form.jsx
export default function Step1Form({ formData, setFormData, onSubmit, loading }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 max-w-2xl mx-auto">
      <h2 className="text-lg sm:text-xl font-bold text-indigo-700 mb-4">
        Interview Learning - Step 1
      </h2>

      <div className="space-y-4 sm:space-y-5">
        {/* Job Title */}
        <div>
          <input
            type="text"
            placeholder="Job Title"
            className="w-full border p-3 rounded placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.jobTitle}
            onChange={(e) =>
              setFormData({ ...formData, jobTitle: e.target.value })
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Helps us personalize interview questions for your role. Example: Frontend Developer, Data Scientist
          </p>
        </div>

        {/* Job Description */}
        <div>
          <textarea
            placeholder="Job description"
            className="w-full border p-3 rounded placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            rows="3"
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData({ ...formData, jobDescription: e.target.value })
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: A more detailed JD helps generate realistic interview rounds.
          </p>
        </div>

        {/* Years of Experience (Dropdown) */}
        <div>
          <select
            className="w-full border p-3 rounded text-gray-700 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.yearsExperience}
            onChange={(e) =>
              setFormData({ ...formData, yearsExperience: e.target.value })
            }
          >
            <option value="">Select Years of Experience</option>
            <option value="0-1">0 – 1 year (Fresher / Junior)</option>
            <option value="2-3">2 – 3 years</option>
            <option value="4-6">4 – 6 years</option>
            <option value="7-10">7 – 10 years</option>
            <option value="10+">10+ years (Senior / Lead)</option>
          </select>
        </div>

        {/* Skills */}
        <div>
          <input
            type="text"
            placeholder="Skills "
            className="w-full border p-3 rounded placeholder-gray-400 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={formData.skills}
            onChange={(e) =>
              setFormData({ ...formData, skills: e.target.value })
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Separate skills with commas. Example: React, Node.js, SQL, Problem Solving.
          </p>
        </div>

        {/* Submit */}
        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded transition-all text-sm sm:text-base font-medium disabled:opacity-50"
        >
          {loading ? "Loading..." : "Generate Rounds"}
        </button>
      </div>
    </div>
  );
}
