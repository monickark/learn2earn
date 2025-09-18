// server/services/generateRoundContentService.js
import axios from "axios";
import fs from "fs";
import path from "path";

export default async function generateRoundContentService(skills, level = "Intermediate") {
  console.log("🔄 generateRoundContentService triggered with skills:", skills, "level:", level);

  const {
    AZURE_OPENAI_KEY,
    AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_DEPLOYMENT_NAME,
    AZURE_OPENAI_API_VERSION
  } = process.env;

  const endpoint = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
  const headers = {
    "Content-Type": "application/json",
    "api-key": AZURE_OPENAI_KEY,
  };

  const promptPath = path.join(process.cwd(), "prompts", "generate_round_content.txt");
  const basePrompt = fs.readFileSync(promptPath, "utf-8");

  const results = [];

  for (const skill of skills) {
    console.log(`📚 Generating content for skill: ${skill}`);

    const finalPrompt = basePrompt
      .replace(/{{TOPIC}}/g, skill)
      .replace(/{{LEVEL}}/g, level);

    const body = {
      messages: [{ role: "user", content: finalPrompt }],
      temperature: 0.7,
      max_tokens: 3500, // enough for long answers + examples
    };

    try {
      const response = await axios.post(endpoint, body, { headers });
      const raw = response.data.choices?.[0]?.message?.content;
      if (!raw) throw new Error(`Empty response for skill: ${skill}`);

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (err) {
        console.error(`❌ JSON Parsing Error for ${skill}:`, err.message);
        console.error("Raw response:\n", raw);
        parsed = { error: "Invalid JSON format returned by model" };
      }

      results.push({
        topic: skill,
        level,
        content: parsed
      });
    } catch (error) {
      console.error(`❌ Error generating content for ${skill}:`, error.message);
      results.push({
        topic: skill,
        level,
        error: "Failed to generate content"
      });
    }
  }

  return results;
}
