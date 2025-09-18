import express from "express";
import generateRoundContentService from "../services/generateRoundContentService.js"; // ✅ uses the updated service

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { rounds, level } = req.body;

    if (!rounds || !Array.isArray(rounds)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid payload: 'rounds' must be an array",
      });
    }

    // ✅ Extract skills/topics from rounds
    let skills = [];
    const normalizedRounds = rounds.map((r) => {
      if (typeof r === "string") return r;

      // Collect topics if present
      if (Array.isArray(r.topics)) {
        skills.push(...r.topics);
      }

      return r.roundName || String(r);
    });

    // ✅ Deduplicate and trim skills
    skills = [...new Set(skills.map((s) => s.trim()))];

    console.log("Normalized Rounds:", normalizedRounds);
    console.log("Extracted Skills:", skills);

    if (skills.length === 0) {
      return res.status(400).json({
        status: "error",
        message: "No topics/skills found in selected rounds",
      });
    }

    // ✅ Pass extracted skills to service (not round names)
    const result = await generateRoundContentService(skills, level);

    return res.status(200).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    console.error("generate-round-content error:", error);
    return res.status(500).json({
      status: "error",
      message: error.message || "Something went wrong",
    });
  }
});

export default router;
