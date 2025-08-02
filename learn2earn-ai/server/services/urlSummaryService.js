// server/services/urlSummarizer.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default async function summarizeUrlContent(url) {
  // 1. Fetch HTML from the URL
  const { data: html } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  // 2. Extract readable text from article elements
  const $ = cheerio.load(html);
  let extracted = '';

  $('article, main, section, div, p').each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 100 && !/^\s*$/.test(text)) {
      extracted += text + '\n\n';
    }
  });

  console.log("🔍 Extracted content length:", extracted.length);

  if (!extracted || extracted.length < 200) {
    throw new Error('Insufficient content extracted from URL');
  }

  // 3. Load prompt from file
  const promptPath = path.join(process.cwd(), 'prompts', 'summarize_url.txt');
  let promptTemplate = fs.readFileSync(promptPath, 'utf-8');

  // Replace placeholders in prompt
  const prompt = promptTemplate
    .replace('{{CONTENT}}', extracted.substring(0, 5000))
    .replace('{{URL}}', url);

  // 4. Prepare Azure OpenAI API request
  const endpoint = `${process.env.AZURE_OPENAI_ENDPOINT}openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION}`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': process.env.AZURE_OPENAI_KEY,
  };
  const body = {
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.5,
    max_tokens: 1500,
  };

  // 5. Make request to Azure OpenAI
  const response = await axios.post(endpoint, body, { headers });
  const message = response.data.choices[0].message.content;

  console.log('🧠 Raw OpenAI response:', message);

  // 6. Try parsing JSON safely
  try {
    const parsed = message;
    return parsed;
  } catch (err) {
    console.error('❌ Failed to parse JSON:', err.message);
    throw new Error('Invalid JSON format from OpenAI');
  }
}
