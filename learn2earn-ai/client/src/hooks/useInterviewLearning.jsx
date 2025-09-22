// hooks/useInterviewLearning.js
import { useState, useEffect } from "react";

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
  const [learningContent, setLearningContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Restore saved state on page reload
  useEffect(() => {
    const savedState = localStorage.getItem("interviewLearningState");
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setStep(parsed.step || 1);
        setFormData(parsed.formData || {});
        setRounds(parsed.rounds || []);
        setSelectedRounds(parsed.selectedRounds || []);
        setLearningContent(parsed.learningContent || []);
      } catch (e) {
        console.error("Failed to parse saved interview state", e);
      }
    }
  }, []);

  // ✅ Save state whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "interviewLearningState",
      JSON.stringify({
        step,
        formData,
        rounds,
        selectedRounds,
        learningContent,
      })
    );
  }, [step, formData, rounds, selectedRounds, learningContent]);

  // 🔹 Go to previous step without losing data
  const goBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  // 🔹 Go to next step manually (only when needed)
  const goNext = () => {
    setStep((prev) => Math.min(3, prev + 1));
  };

  const fetchInterviewRounds = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/interview/generate-rounds`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobTitle: formData.jobTitle,
            jobDescription: formData.jobDescription,
            yearsExperience: formData.yearsExperience,
            skills: formData.skills.split(",").map((s) => s.trim()),
          }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        // Handle the nested rounds structure from API
        const roundsData = result.data.rounds || result.data;
        setRounds(roundsData);
        setStep(2); // ✅ Auto-move to Step 2 only after success
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const generateRoundContent = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/generate-round-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rounds: selectedRounds }),
        }
      );

      const result = await response.json();
      if (result.status === "success") {
        setLearningContent(result.data);
        setStep(3); // ✅ Auto-move to Step 3 only after success
      } else {
        throw new Error(result.message || "Unknown error");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep, // ✅ For manual navigation
    goBack,
    goNext,
    formData,
    setFormData,
    rounds,
    selectedRounds,
    setSelectedRounds,
    learningContent,
    loading,
    error,
    fetchInterviewRounds,
    generateRoundContent,
  };
}
