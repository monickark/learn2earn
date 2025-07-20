// server/services/azureService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION
} = process.env;

export async function generateEducationalContent(topic) {
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

  const response = await axios.post(
    `${AZURE_OPENAI_ENDPOINT}openai/deployments/${AZURE_OPENAI_DEPLOYMENT_NAME}/chat/completions?api-version=${AZURE_OPENAI_API_VERSION}`,
    {
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'api-key': AZURE_OPENAI_KEY,
      },
    }
  );

  return {
    topic,
    content: response.data.choices[0].message.content.trim(),
  };
}
