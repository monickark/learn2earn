// server/services/azureService.js
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export default async function generateEducationalContent (topic, level) {
  console.log("generateEducationalContent triggered : ", topic, level);
  
  // Get and clean environment variables (handle case where they might have prefixes)
  let azureKey = process.env.AZURE_OPENAI_KEY;
  let azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
  let azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME;
  let azureApiVersion = process.env.AZURE_OPENAI_API_VERSION;

  // Clean up variables that might include the variable name prefix (only if they start with the exact variable name)
  if (azureKey?.startsWith('AZURE_OPENAI_KEY=')) azureKey = azureKey.slice('AZURE_OPENAI_KEY='.length);
  if (azureEndpoint?.startsWith('AZURE_OPENAI_ENDPOINT=')) azureEndpoint = azureEndpoint.slice('AZURE_OPENAI_ENDPOINT='.length);
  if (azureDeployment?.startsWith('AZURE_OPENAI_DEPLOYMENT_NAME=')) azureDeployment = azureDeployment.slice('AZURE_OPENAI_DEPLOYMENT_NAME='.length);
  if (azureApiVersion?.startsWith('AZURE_OPENAI_API_VERSION=')) azureApiVersion = azureApiVersion.slice('AZURE_OPENAI_API_VERSION='.length);

  // Validate all required environment variables
  if (!azureKey || !azureEndpoint || !azureDeployment || !azureApiVersion) {
    throw new Error('Missing required Azure OpenAI environment variables');
  }

  // Read prompt from file
  const promptPath = path.join(process.cwd(), 'prompts', 'generate_content.txt');
  const basePrompt = fs.readFileSync(promptPath, 'utf-8');

 // Replace both topic and level
  const finalPrompt = basePrompt
    .replace('{{TOPIC}}', topic)
    .replace('{{LEVEL}}', level);

  const endpoint = `${azureEndpoint}openai/deployments/${azureDeployment}/chat/completions?api-version=${azureApiVersion}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': azureKey,
  };

  const body = {
    messages: [{ role: 'user', content: finalPrompt }],
    temperature: 0.7,
    max_tokens: 3000,
  };
  try {
    const response = await axios.post(endpoint, body, { headers });

    const raw = response.data.choices?.[0]?.message?.content;
   // console.log("Raw OpenAI Response:\n", raw);

    if (!raw) {
      throw new Error("Empty response from OpenAI");
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
     console.error("JSON Parsing Error:\n", err.message);
     // console.error("Failed content:\n", raw);
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