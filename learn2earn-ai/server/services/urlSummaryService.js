// server/services/urlSummarizer.js
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

export default async function summarizeUrlContent(url) {
  // 1. Fetch HTML
  const { data: html } = await axios.get(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  // 2. Extract text using cheerio
  const $ = cheerio.load(html);
  let extracted = '';

  $('article, main, section, div, p').each((_, el) => {
    const text = $(el).text();
    if (text.length > 100) extracted += text + '\n\n';
  });
  console.log("extracted content length:", extracted.length);
  if (!extracted || extracted.length < 200) {
    throw new Error('Insufficient content extracted from URL');
  }

  // 3. Prepare prompt
  const promptPath = path.join(process.cwd(), 'prompts', 'summarize_url.txt');
  const basePrompt = fs.readFileSync(promptPath, 'utf-8');
  const prompt = basePrompt
    .replace('{{CONTENT}}', extracted.substring(0, 5000))
    .replace('original URL', url);

  // 4. Azure OpenAI API
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

  const response = await axios.post(endpoint, body, { headers });
  const message = response.data.choices[0].message.content;
  // console.log('✅ Summarization successful:', message);
  try {
    return message;
  } catch (err) {
    console.error('❌ Invalid JSON from OpenAI:', message);
    throw new Error('Failed to parse OpenAI response');
  }
}
