// utils/expandTopic.js
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

 export default async function expandTopic(topic) {
  try {
    const prompt = `Expand the following topic into a clear, full academic or technical subject name:

Input: "${topic}"

Output:`;

    const res = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that expands short or ambiguous topics into full academic or technical subjects.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.2,
    });

    const expanded = res.choices[0].message.content.trim();

    console.log(`Expanded topic: "${topic}" → "${expanded}"`);
    return expanded;
  } catch (err) {
    console.error('❌ Error expanding topic:', err.message);
    return topic; // fallback to original if something fails
  }
};
