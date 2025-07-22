// server/services/azureService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function generateEducationalContent (topic) {
  console.log("generateEducationalContent triggered : ", topic);
  const {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION
} = process.env;

  // Read prompt from file
  const promptPath = path.join(process.cwd(), 'prompts', 'learn2earn_prompt.txt');
  const basePrompt = fs.readFileSync(promptPath, 'utf-8');

 // Insert topic into the placeholder if exists
  const finalPrompt = basePrompt.replace('{{TOPIC}}', topic);

  const endpoint = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': AZURE_OPENAI_KEY,
  };

  const body = {
    messages: [{ role: 'user', content: finalPrompt }],
    temperature: 0.7,
    max_tokens: 2000,
  };
  try {
    const response = await axios.post(endpoint, body, { headers });
    let parsed;
    try {
      parsed = JSON.parse(response.data.choices[0].message.content);
      return {
        topic,
        content: parsed,
      };
    } catch (err) {
      console.error("Invalid JSON:", response.data.choices[0].message.content);
      throw new Error("Failed to parse OpenAI response");
    }
  
} catch (error) {
  console.error("❌ JSON Parsing Error:", error.message);
  throw error;
}

}