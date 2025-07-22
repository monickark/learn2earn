// server/services/azureService.js
import axios from 'axios';

export default async function generateEducationalContent (topic) {
  console.log("generateEducationalContent triggered : ", topic);
  const {
  AZURE_OPENAI_KEY,
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_DEPLOYMENT_NAME,
  AZURE_OPENAI_API_VERSION
} = process.env;

  const prompt = `
Generate educational content for the topic: "${topic}"


Return the output in the following JSON format:
{
  "Lesson": "Short, engaging lesson text (max 300 words)",
  "MCQs": [
    {
      "question": "What is blockchain?",
      "options": [
        { "label": "A", "text": "A centralized ledger" },
        { "label": "B", "text": "A decentralized ledger" },
        { "label": "C", "text": "A type of cryptocurrency" },
        { "label": "D", "text": "A database owned by one company" }
      ],
      "answer": "B"
    }
  ],
  "Flashcards": [
    {
      "question": "What is blockchain?",
      "answer": "A decentralized ledger technology"
    }
  ]
}

Ensure the response is **valid JSON**, with no additional explanation or formatting.
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
    console.log("backend data : " + response.data.choices[0].message.content);
    return {
      topic,
      content: response.data.choices[0].message.content,
    };
  } catch (error) {
    console.error('❌ Azure OpenAI Error:', error?.response?.data || error.message);
    throw error;
  }
}