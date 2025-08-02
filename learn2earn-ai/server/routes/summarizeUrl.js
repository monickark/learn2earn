// server/routes/summarizeUrl.js
import express from 'express';
import summarizeUrlContent from '../services/urlSummaryService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { url } = req.body;

  // ✅ Better URL validation
  const isValidUrl = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/.test(url);
  if (!url || !isValidUrl) {
    return res.status(400).json({ error: 'Invalid URL format' });
  }

  try {
    console.log(`🔗 Summarizing URL: ${url}`);
    const summary = await summarizeUrlContent(url);
    if (!summary || typeof summary !== 'string' || summary.trim().length === 0) {
      return res.status(204).json({ message: 'No summary generated.' });
    }
    res.status(200).json({ summary });
  } catch (error) {
    console.error('❌ Summarization failed:', error.message);
    res.status(500).json({ error: error.message || 'Summarization failed' });
  }
});

export default router;
