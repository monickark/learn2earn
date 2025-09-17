import express from "express";
import generateRoundContentService from "../services/generateRoundContentService.js";

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

    // ✅ Support array of objects or strings
    const normalizedRounds = rounds.map((r) => {
      if (typeof r === "string") return r;
      if (r.roundName) return r.roundName;
      return String(r); // fallback to string
    });

    console.log("Normalized Rounds:", normalizedRounds);

    const result = await generateRoundContentService(normalizedRounds, level);

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
