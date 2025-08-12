import express from 'express';
import summarizeArticleContent from '../services/articleSummaryService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  let { articleText } = req.body;
  console.log("hit server" + articleText);

  if (typeof articleText !== 'string') {
    articleText = String(articleText || '');
  }

  console.log("hit server" + articleText);
  articleText = articleText.trim();

if (!articleText || articleText.length < 100) {
    console.error('❌ Article content is too short.');
    // ✅ Better error handling
    return res.status(400).json({ error: 'Article content is too short.' });
  }

  try {
    const summary = await summarizeArticleContent(articleText);  
    console.log("summary : " + summary);

    res.json({ summary });
  } catch (err) {
    console.error('❌ Article summarization failed:', err.message);
    res.status(500).json({ error: 'Failed to summarize article.' });
  }
});

export default router;
