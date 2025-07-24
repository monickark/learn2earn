// server/services/azureService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function generateEducationalContent (topic, level) {
  console.log("generateEducationalContent triggered : ", topic, level);
  const {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION
} = process.env;

  // Read prompt from file
  const promptPath = path.join(process.cwd(), 'prompts', 'generate_content.txt');
  const basePrompt = fs.readFileSync(promptPath, 'utf-8');

 // Replace both topic and level
  const finalPrompt = basePrompt
    .replace('{{TOPIC}}', topic)
    .replace('{{LEVEL}}', level);

  const endpoint = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': AZURE_OPENAI_KEY,
  };

  const body = {
    messages: [{ role: 'user', content: finalPrompt }],
    temperature: 0.7,
    max_tokens: 3000,
  };
  try {
    const response = await axios.post(endpoint, body, { headers });

    const raw = response.data.choices?.[0]?.message?.content;
    console.log("Raw OpenAI Response:\n", raw);

    if (!raw) {
      throw new Error("Empty response from OpenAI");
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error("JSON Parsing Error:\n", err.message);
      console.error("Failed content:\n", raw);
      throw new Error("Failed to parse OpenAI response");
    }
      return {
        topic,
        content: parsed,
      };
  
} catch (error) {
  console.error("JSON Parsing Error:", error.message);
  throw error;
}

}