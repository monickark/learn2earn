// server/services/azureService.js
import axios from 'axios';

export default async function generateEducationalContent (topic) {
  const {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION
} = process.env;

  const prompt = `
Generate educational content for the topic: "${topic}"

1. Write a short, engaging lesson (max 300 words).
2. Create 3 multiple choice questions with 4 options each. Indicate the correct answer.
3. Create 3 flashcards with a question and a short answer.

Format:
Lesson:
...

MCQs:
1. Question?
  A. Option 1
  B. Option 2
  C. Option 3
  D. Option 4
  Answer: B

...

Flashcards:
1. Q: ...
   A: ...
`;
const endpoint = `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`;
 const headers = {
    'Content-Type': 'application/json',
    'api-key': AZURE_OPENAI_KEY,
  };

  const body = {
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    max_tokens: 800,
  };

  try {

    const response = await axios.post(endpoint, body, { headers });
    return {
      topic,
      content: response.data.choices[0].message.content.trim(),
    };
  } catch (error) {
    console.error('❌ Azure OpenAI Error:', error?.response?.data || error.message);
    throw error;
  }
}