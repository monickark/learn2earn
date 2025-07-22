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
  const result = response.data.choices[0].message.content;
  console.log("🔹 Raw AI Output:\n", result);

  const parsed = JSON.parse(result); // <--- likely to fail if response is not valid JSON

  return {
    topic,
    content: parsed,
  };
} catch (error) {
  console.error("❌ JSON Parsing Error:", error.message);
  throw error;
}

}