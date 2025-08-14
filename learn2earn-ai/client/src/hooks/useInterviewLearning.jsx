import { useState } from "react";

export default function useInterviewLearning() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    yearsExperience: "",
    skills: "",
  });
  const [rounds, setRounds] = useState([]);
  const [selectedRounds, setSelectedRounds] = useState([]);
  const [learningContent, setLearningContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Generate possible interview rounds
  const fetchInterviewRounds = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview/rounds`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setRounds(data.rounds || []);
      setStep(2);
    } catch (err) {
      setError("Failed to fetch interview rounds.");
    }
    setLoading(false);
  };

  // Step 2: Fetch learning content for selected rounds
  const fetchLearningContent = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/interview/learning`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, rounds: selectedRounds }),
      });
      const data = await res.json();
      setLearningContent(data || {});
      setStep(3);
    } catch (err) {
      setError("Failed to fetch learning content.");
    }
    setLoading(false);
  };

  return {
    step,
    formData,
    setFormData,
    rounds,
    selectedRounds,
    setSelectedRounds,
    learningContent,
    loading,
    error,
    fetchInterviewRounds,
    fetchLearningContent,
  };
}
