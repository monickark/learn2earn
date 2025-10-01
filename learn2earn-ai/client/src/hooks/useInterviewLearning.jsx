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

  // ✅ Clear saved state on mount and check for demo user
  useEffect(() => {
    localStorage.removeItem("interviewLearningState");
    
    // Check if user is a demo user and populate form data
    const checkDemoUser = async () => {
      try {
        const base = import.meta.env.VITE_API_URL || window.location.origin;
        const url = `${base.replace(/\/$/, '')}/api/auth/session`;
        const res = await fetch(url, { credentials: 'include' });
        const data = await res.json();
        
        if (data?.user?.demo || localStorage.getItem('demo') === 'true') {
          // Populate with sample data for demo users
          setFormData({
            jobTitle: "Frontend Engineer",
            jobDescription: "We are looking for a Frontend Engineer experienced with React, TypeScript, state management, performance optimization, and accessibility. Familiarity with REST APIs, testing frameworks, and CI/CD is a plus.",
            yearsExperience: "4-6",
            skills: "React, TypeScript, JavaScript, Web Performance, Accessibility, CSS, Testing"
          });
        }
      } catch (error) {
        // If session check fails, fallback to localStorage
        if (localStorage.getItem('demo') === 'true') {
          setFormData({
            jobTitle: "Frontend Engineer",
            jobDescription: "We are looking for a Frontend Engineer experienced with React, TypeScript, state management, performance optimization, and accessibility. Familiarity with REST APIs, testing frameworks, and CI/CD is a plus.",
            yearsExperience: "4-6",
            skills: "React, TypeScript, JavaScript, Web Performance, Accessibility, CSS, Testing"
          });
        }
      }
    };

    checkDemoUser();
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
