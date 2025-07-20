// server/routes/generateContent.js
import express from 'express';
import { generateEducationalContent } from '../services/groqService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { topic } = req.body;

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  try {
    const content = await generateEducationalContent(topic);
    res.json(content);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

export default router;
