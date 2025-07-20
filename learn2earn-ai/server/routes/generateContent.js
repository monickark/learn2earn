// server/routes/generateContent.js
import express from 'express';
const router = express.Router();
import generateEducationalContent from '../services/azureService.js';
import formatResponse from '../utils/formatResponse.js';
import validateInput from '../utils/validateInput.js';


router.post('/', async (req, res) => {
  const { topic } = req.body; 
  if (!validateInput(topic)) {
     return res.status(400).json({ error: 'Invalid topic input' });
  }

  try {
    const aiResponse = await generateEducationalContent(topic);
    const content = formatResponse(aiResponse);
    res.json({ topic, content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

export default router;
