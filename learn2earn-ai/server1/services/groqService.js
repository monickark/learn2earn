// server/services/groqService.js
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

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
    GROQ_API_URL,
    {
      model: 'mixtral-8x7b-32768',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return {
    topic,
    content: response.data.choices[0].message.content.trim(),
  };
}
