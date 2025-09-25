// server/routes/generateContent.js
import express from 'express';
const router = express.Router();
import generateEducationalContent from '../services/generateContentService.js';
import formatResponse from '../utils/formatResponse.js';
import validateInput from '../utils/validateInput.js';
import supabase from '../utils/supabaseClient.js';

router.post('/', async (req, res) => {
  const { topic, level } = req.body;

  // Validate input
  if (!validateInput(topic) || !level || !['Beginner', 'Intermediate', 'Expert'].includes(level)) {
    return res.status(400).json({ error: 'Invalid topic or level input' });
  }

  try {
    // 1. Generate AI content
    const aiResponse = await generateEducationalContent(topic, level);
    const content = formatResponse(aiResponse);
    console.log("content generated")
    // 2. Record search history (non-critical operation, don't fail if it errors)
    try {
      // Try insert first (most new topics case)
      const { error: insertError } = await supabase
        .from('search_history')
        .insert([{
          topic,
          count: 1,
          updated_at: new Date().toISOString()
        }]);

      if (insertError && insertError.code === '23505') {
        // Topic exists, use the RPC to increment count
        const { error: incrementError } = await supabase
          .rpc('increment_search_count', { search_topic: topic });
          
        if (incrementError) {
          console.log('Search history increment error:', incrementError.message);
        } else {
          console.log("Search count incremented for existing topic");
        }
      } else if (insertError) {
        console.log('Search history insert error:', insertError.message);
      } else {
        console.log("New topic inserted into search history");
      }
    } catch (err) {
      console.log('Search history operation failed:', err.message);
    }

    // 4. Respond with generated content
    res.json({ topic, level, content });

  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

export default router;
