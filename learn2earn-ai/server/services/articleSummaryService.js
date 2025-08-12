import axios from 'axios';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default async function summarizeArticleContent(articleText) {
  const wordCount = articleText.split(/\s+/).length;

  // 1. Load prompt template
  const promptPath = path.join(process.cwd(), 'prompts', 'summarize_article.txt');
  let basePrompt = fs.readFileSync(promptPath, 'utf-8');

  // 2. Replace placeholder
   basePrompt = basePrompt
    .replace('{{CONTENT}}', articleText)
    .replace('{{WORD_COUNT}}', wordCount);
  // BEFORE API call
    console.log('--- ARTICLE TEXT (first 1000 chars) ---');
    console.log(articleText.slice(0, 1000));

  // 3. Azure OpenAI request
  const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': process.env.AZURE_OPENAI_KEY,
  };
  const body = {
    messages: [{ role: 'user', content: basePrompt }],
    temperature: 0.5,
    max_tokens: 1500,
  };

  const response = await axios.post(endpoint, body, { headers });

  const result = response.data.choices[0].message.content;
  console.log('--- OPENAI RAW CHOICE ---');
  console.log(JSON.stringify(response.data.choices[0].message, null, 2));
  try {
    return JSON.parse(result); // Ensure it's a valid JSON
  } catch (err) {
    console.error('❌ Failed to parse JSON:', result);
    throw new Error('Invalid response from AI');
  }
}
