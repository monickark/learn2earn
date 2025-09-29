import { useState } from "react";

export default function useGenerateRoundContent() {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoundContent = async (selectedRounds, level = "Intermediate") => {
    setLoading(true);
    setError("");
    setContent([]);

    try {
      const base = import.meta.env.VITE_API_URL || window.location.origin;
      const res = await fetch(
        `${base}/api/generate-round-content`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedRounds, level }),
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch round content: ${res.status}`);
      }

      const data = await res.json();

      if (!data?.success || !Array.isArray(data.data)) {
        throw new Error("Invalid response format from server");
      }

      // `data.data` should be an array of round objects
      setContent(data.data);
    } catch (err) {
      console.error("❌ Error in useGenerateRoundContent:", err);
      setError("Failed to fetch round-based content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { content, loading, error, handleRoundContent };
}
