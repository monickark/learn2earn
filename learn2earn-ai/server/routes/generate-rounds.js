import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// POST /api/generate-rounds
router.post("/generate-rounds", async (req, res) => {
  try {
    const { jobTitle, jobDescription, yearsExperience, skills } = req.body;
    console.log("Received data:", { jobTitle, jobDescription, yearsExperience, skills });
    if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_KEY || !process.env.AZURE_OPENAI_DEPLOYMENT_NAME) {
      return res.status(500).json({ error: "Azure OpenAI API configuration is missing" });
    }

    const prompt = `
      You are an AI interview coach. Based on the following details, generate a structured set of interview rounds:

      Job Title: ${jobTitle}
      Job Description: ${jobDescription}
      Years of Experience: ${yearsExperience}
      Skills: ${skills}

      Return the output as JSON:
      [
        {
          "roundName": "Round 1: Technical Screening",
          "topics": ["Topic A", "Topic B"],
          "resources": ["https://link1.com", "https://link2.com"]
        }
      ]
    `;

    const azureUrl = `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
    console.log("Azure URL:", azureUrl);
    const response = await axios.post(
      azureUrl,
      {
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1000,
        temperature: 0.7
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.AZURE_OPENAI_KEY
        }
      }
    );
    console.log("Azure response:", response.data);
    const rawOutput = response.data?.choices?.[0]?.message?.content || "[]";
    let parsedOutput;
    console.debug("Raw output from Azure:", rawOutput);
    try {
      parsedOutput = JSON.parse(rawOutput);
    } catch {
      parsedOutput = [{ roundName: "Error parsing AI output", topics: [], resources: [] }];
    }
    console.log("Parsed output:", parsedOutput);
    res.json({
      status: "success",
      data: parsedOutput
    });

  } catch (error) {
    console.error("Azure OpenAI API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate interview rounds" });
  }
});

export default router;
